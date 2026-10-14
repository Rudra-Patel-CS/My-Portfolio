import cv2
import numpy as np

# Load original high-res image
img = cv2.imread('public/profile.jpg')
orig_h, orig_w = img.shape[:2]

target_w = 600
scale = target_w / float(orig_w)
target_h = int(orig_h * scale)
small_img = cv2.resize(img, (target_w, target_h), interpolation=cv2.INTER_AREA)

mask = np.zeros(small_img.shape[:2], np.uint8)
bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)

# Precise person rectangle: left padding 75 to avoid the left shadow pillar!
rect = (75, 10, target_w - 150, target_h - 12)

# Pass 1
cv2.grabCut(small_img, mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)

# Definite background in outer border areas
mask[:, 0:70] = cv2.GC_BGD
mask[:, target_w - 60:target_w] = cv2.GC_BGD
mask[0:int(target_h * 0.12), :] = cv2.GC_BGD

# Pass 2 with mask
cv2.grabCut(small_img, mask, rect, bgdModel, fgdModel, 4, cv2.GC_INIT_WITH_MASK)

# Binary mask
small_mask = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype('uint8')

# Morphological clean up
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
small_mask = cv2.morphologyEx(small_mask, cv2.MORPH_CLOSE, kernel)

# Upscale to original
full_mask = cv2.resize(small_mask, (orig_w, orig_h), interpolation=cv2.INTER_LINEAR)
full_mask = cv2.GaussianBlur(full_mask, (11, 11), 0)

# Soft gradient fade at bottom waistline
fade_start = int(orig_h * 0.88)
for y in range(fade_start, orig_h):
    factor = (orig_h - y) / float(orig_h - fade_start)
    full_mask[y, :] = (full_mask[y, :].astype(np.float32) * factor).astype(np.uint8)

# Combine BGR with Alpha
b, g, r = cv2.split(img)
rgba = cv2.merge([b, g, r, full_mask])

cv2.imwrite('public/profile_cutout.png', rgba)
print("Saved perfect profile_cutout.png!")
