import cv2
import numpy as np

img = cv2.imread('public/profile.jpg')
h, w = img.shape[:2]

mask = np.zeros(img.shape[:2], np.uint8)
bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)

# Bounding box containing Rudra
rect = (35, 12, w - 70, h - 15)

# First grabCut pass
cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 6, cv2.GC_INIT_WITH_RECT)

# Refine definite background (corners)
mask[0:30, 0:90] = cv2.GC_BGD
mask[0:30, w-90:w] = cv2.GC_BGD
mask[h-100:h, 0:35] = cv2.GC_BGD

# Definite foreground (center face & chest)
cv2.circle(mask, (int(w * 0.5), int(h * 0.3)), 45, cv2.GC_FGD, -1)
cv2.circle(mask, (int(w * 0.5), int(h * 0.6)), 65, cv2.GC_FGD, -1)

# Second pass
cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 4, cv2.GC_INIT_WITH_MASK)

# Create smooth alpha channel
mask2 = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype('uint8')

# Feather edges softly
mask2_blur = cv2.GaussianBlur(mask2, (7, 7), 0)

# Merge BGR + Alpha
b, g, r = cv2.split(img)
rgba = cv2.merge([b, g, r, mask2_blur])

cv2.imwrite('public/profile_nobg.png', rgba)
print("Saved public/profile_nobg.png successfully!")
