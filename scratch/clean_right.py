import cv2
import numpy as np

img = cv2.imread('public/profile_cutout.png', cv2.IMREAD_UNCHANGED)
h, w = img.shape[:2]
b, g, r, a = cv2.split(img)

# On viewer's right: x between w*0.55 and w*0.85, y between h*0.20 and h*0.65
for y in range(0, int(h * 0.70)):
    for x in range(int(w * 0.55), w):
        rv, gv, bv = int(r[y, x]), int(g[y, x]), int(b[y, x])
        is_skin = (rv > 130 and gv > 85 and bv > 65 and rv > bv + 20)
        is_dark_suit = (rv < 70 and gv < 70 and bv < 85)
        is_shirt = (rv > 215 and gv > 215 and bv > 215)
        if not (is_skin or is_dark_suit or is_shirt):
            a[y, x] = 0

a_smooth = cv2.GaussianBlur(a, (3, 3), 0)
clean = cv2.merge([b, g, r, a_smooth])
cv2.imwrite('public/profile_cutout.png', clean)
print("Finished cleaning right side shadow!")
