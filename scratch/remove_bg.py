from rembg import remove
from PIL import Image

input_path = 'public/profile.jpg'
output_path = 'public/profile_nobg.png'

print(f"Loading {input_path}...")
input_image = Image.open(input_path)
print("Removing background...")
output_image = remove(input_image)
print(f"Saving to {output_path}...")
output_image.save(output_path, format="PNG")
print("Done!")
