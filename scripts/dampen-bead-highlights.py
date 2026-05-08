"""
Dampen specular highlights on bead photos. Saturation-aware so the
bead's actual colour is preserved while the bright low-saturation
"white" reflections get pulled down toward the bead's body tone.

A specular highlight on a glossy sphere is, photometrically:
  - very high V (brightness)
  - very low S (saturation) — colour gets washed out at the highlight
This script targets exactly that combination. Pixels that are bright
AND desaturated are blended toward the bead's median saturated colour.
Pixels that are bright AND colourful (e.g. the vibrant body of citrine)
are left alone.

Usage:
    python scripts/dampen-bead-highlights.py            # process all
    python scripts/dampen-bead-highlights.py --only amethyst,garnet
    python scripts/dampen-bead-highlights.py --restore  # undo
"""

import argparse
import shutil
import sys
from pathlib import Path

import numpy as np
from PIL import Image

STONES_DIR = Path(__file__).resolve().parent.parent / "public" / "stones"
BACKUP_DIR = STONES_DIR / "_pre-tone-backup"


def dampen(im: Image.Image) -> Image.Image:
    if im.mode != "RGBA":
        im = im.convert("RGBA")
    arr = np.array(im).astype(np.float32)
    rgb = arr[:, :, :3]
    alpha = arr[:, :, 3]

    mx = rgb.max(axis=2)
    mn = rgb.min(axis=2)
    V = mx / 255.0
    S = np.where(mx > 0, (mx - mn) / np.where(mx > 0, mx, 1), 0)
    whiteness = V * (1 - S)

    opaque = alpha > 200
    if opaque.sum() == 0:
        return im

    # Decide treatment based on the stone's intrinsic colour. Naturally
    # white/pale stones (moonstone, clear quartz) have a high fraction
    # of high-whiteness pixels on the bead body itself — we don't want
    # to "fix" them by darkening, just stop them from being pure white.
    # Coloured stones get the targeted highlight-blend treatment.
    fraction_white = (whiteness[opaque] > 0.45).mean()
    is_white_stone = fraction_white > 0.5

    if is_white_stone:
        # Mild ceiling: clamp the brightest pixels so no patch reaches
        # pure white, but preserve the overall light tone of the stone.
        CEILING = 200
        peak = mx[:, :, None]
        scale = np.where(peak > CEILING, CEILING / np.maximum(peak, 1), 1.0)
        new_rgb = rgb * scale
        new_rgb = np.clip(new_rgb, 0, 255)
    else:
        # Coloured stone: blend high-whiteness pixels toward a slightly-
        # brighter version of the bead's body colour so highlights stay
        # visible but no longer read as white.
        not_highlight = whiteness < 0.4
        body_mask = opaque & not_highlight
        if body_mask.sum() < 100:
            body_mask = opaque
        body_color = np.median(rgb[body_mask], axis=0)

        blend = np.clip((whiteness - 0.55) / 0.30, 0, 1)
        blend_3 = blend[:, :, None]
        body_broadcast = np.broadcast_to(body_color, rgb.shape)
        target = np.minimum(body_broadcast * 1.4, 220)
        new_rgb = rgb * (1 - blend_3) + target * blend_3
        new_rgb = np.clip(new_rgb, 0, 255)

    out = np.zeros_like(arr)
    out[:, :, :3] = new_rgb
    out[:, :, 3] = alpha
    return Image.fromarray(out.astype(np.uint8), mode="RGBA")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", help="Comma-separated slugs", default=None)
    parser.add_argument("--restore", action="store_true", help="Restore from backup")
    args = parser.parse_args()

    if args.restore:
        if not BACKUP_DIR.exists():
            print("No backup directory found.")
            return 1
        for src in BACKUP_DIR.glob("*.png"):
            shutil.copy(src, STONES_DIR / src.name)
            print(f"  restored {src.name}")
        print("Done. Originals restored.")
        return 0

    BACKUP_DIR.mkdir(exist_ok=True)
    targets = sorted(STONES_DIR.glob("*.png"))
    if args.only:
        wanted = set(args.only.split(","))
        targets = [p for p in targets if p.stem in wanted]

    for i, path in enumerate(targets, 1):
        backup_path = BACKUP_DIR / path.name
        if not backup_path.exists():
            shutil.copy(path, backup_path)
        # Always start from the backup so re-runs don't compound
        im = Image.open(backup_path)
        out = dampen(im)
        out.save(path, "PNG", optimize=True)
        print(f"[{i:>2}/{len(targets)}] {path.name:35} done")

    print(f"\nDone. {len(targets)} files re-processed. Run with --restore to undo.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
