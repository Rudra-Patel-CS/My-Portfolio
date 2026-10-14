import cv2
import numpy as np

img = cv2.imread('public/profile_cutout.png', cv2.IMREAD_UNCHANGED)
h, w = img.shape[:2]
b, g, r, a = cv2.split(img)

# The wall shadow behind left ear/neck/shoulder:
# x is between 0 and 380, y between 150 and 450
# In that zone:
# Face/ear is at x > 360 (or skin color: r > 150, g > 100, b > 80, r > b + 30)
# Suit is dark: r < 60, g < 60, b < 70
# Shadow is greyish: r between 100 and 190, g between 110 and 200, b between 130 and 220
for y in range(0, int(h * 0.70)):
    for x in range(0, int(w * 0.40)):
        rv, gv, bv = int(r[y, x]), int(g[y, x]), int(b[y, x])
        is_skin = (rv > 130 and gv > 85 and bv > 65 and rv > bv + 25)
        is_dark_suit = (rv < 70 and gv < 70 and bv < 85)
        is_shirt = (rv > 215 and gv > 215 and bv > 215)
        if not (is_skin or is_dark_suit or is_shirt):
            a[y, x] = 0

a_smooth = cv2.GaussianBlur(a, (3, 3), 0)
clean = cv2.merge([b, g, r, a_smooth])
cv2.imwrite('public/profile_cutout.png', clean)
print("Perfect cutout saved!")
