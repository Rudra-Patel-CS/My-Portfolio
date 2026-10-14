import cv2
import numpy as np

# Load the cutout
img = cv2.imread('public/profile_cutout.png', cv2.IMREAD_UNCHANGED)
h, w = img.shape[:2]

# On the viewer's left side of the neck/head:
# Let's inspect where the shadow is: x < w * 0.43, y between h*0.25 and h*0.60
b, g, r, a = cv2.split(img)

# In the shadow region, background wall was grey (r ~ 130-180, g ~ 140-190, b ~ 150-200) and person's blazer is dark navy (r < 60, g < 60, b < 70) and skin is warm (r > 160, r > b + 25)
for y in range(int(h * 0.20), int(h * 0.60)):
    for x in range(0, int(w * 0.42)):
        # If it's the wall shadow (greyish, low saturation, not dark like suit, not warm like skin)
        rv, gv, bv = int(r[y, x]), int(g[y, x]), int(b[y, x])
        if bv > 110 and gv > 100 and rv > 90 and abs(bv - gv) < 35 and (rv - bv) < 15:
            a[y, x] = 0

# Also clean any top-left / top-right stray pixels
a[0:int(h * 0.15), 0:int(w * 0.35)] = 0
a[0:int(h * 0.15), int(w * 0.65):w] = 0

# Smooth alpha edge
a_smooth = cv2.GaussianBlur(a, (5, 5), 0)

clean_rgba = cv2.merge([b, g, r, a_smooth])
cv2.imwrite('public/profile_cutout.png', clean_rgba)
print("Cleaned public/profile_cutout.png successfully!")
