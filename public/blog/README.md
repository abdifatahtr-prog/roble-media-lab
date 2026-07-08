# Blog images

Screenshots and images used in blog posts live here. Reference them from an
`.mdx` file with a leading `/blog/` path, e.g. `/blog/after-current-site.png`.

Use the `<Figure>` and `<BeforeAfter>` components (see `components/post-media.tsx`)
inside a post. They show a tidy "Screenshot coming" placeholder if a referenced
file is missing, so a post never looks broken while images are being gathered.

## Keep images light (mobile matters)

Full-page browser captures are huge (several MB) and slow on mobile. Before
adding one, resize and crop it. Quick way with Pillow:

```python
from PIL import Image
im = Image.open("raw.png").convert("RGB")
w, h = im.size
im = im.resize((1000, round(h * 1000 / w)), Image.LANCZOS)  # 1000px wide
im = im.crop((0, 0, 1000, 1100))                            # top region only
im.save("out.png", optimize=True)
```

For a `<BeforeAfter>` pair, crop both to the same top region so the heroes line
up. The current before/after shots here were made this way (~450 KB each).
