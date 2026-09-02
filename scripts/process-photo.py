# -*- coding: utf-8 -*-
"""
Turn a client-supplied photo into a web-ready WebP for public/images/.

    python scripts/process-photo.py <source> <out-name> [--width 1700]

Most of the source photography for this site arrives as messaging-app exports
at 600-1000px rather than as camera originals, so the resize is Lanczos with an
unsharp mask scaled to the upscale factor. That recovers apparent edge acuity;
it cannot recover detail that was never in the file. If a photo still looks soft
full-bleed, the fix is the original, not a bigger number here.
"""
import argparse
import os
import sys

try:
    from PIL import Image, ImageFilter
except ImportError:
    sys.exit("Pillow is required: pip install Pillow")

OUT_DIR = os.path.join("public", "images")
QUALITY = 82


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("source")
    ap.add_argument("out_name", help="filename without extension, e.g. chino-theatre")
    ap.add_argument("--width", type=int, default=1700)
    ap.add_argument("--quality", type=int, default=QUALITY)
    args = ap.parse_args()

    im = Image.open(args.source).convert("RGB")
    src_w, src_h = im.size

    target_w = min(args.width, src_w * 3)          # refuse absurd upscales
    factor = target_w / float(src_w)
    target_h = int(round(src_h * factor))
    im = im.resize((target_w, target_h), Image.LANCZOS)

    # Sharpen in proportion to how far the image was stretched. A 1.0x resize
    # gets almost nothing; a 3x upscale gets the full amount. Overshooting here
    # produces halos on skylines, which read as "cheap" faster than softness.
    if factor > 1.0:
        amount = int(min(150, 60 * (factor - 1.0) + 40))
        im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=amount, threshold=3))

    os.makedirs(OUT_DIR, exist_ok=True)
    out = os.path.join(OUT_DIR, args.out_name + ".webp")
    im.save(out, "WEBP", quality=args.quality, method=6)

    print("%s  %dx%d -> %dx%d  (%.2fx)  %.0f KB"
          % (out, src_w, src_h, target_w, target_h, factor,
             os.path.getsize(out) / 1024.0))


if __name__ == "__main__":
    main()
