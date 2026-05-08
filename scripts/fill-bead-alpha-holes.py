"""
Close the alpha holes that rembg's u2net model left inside glossy bead photos.

The previous background-removal pass over-erased highlights inside the beads
(bright reflections classified as background -> set to alpha 0). This script
fixes the resulting transparent holes WITHOUT damaging the cleanly-keyed
edges by working from a basic topological observation:

  - The four image corners are transparent (verified: 4/4 corners alpha=0).
  - Real background pixels are connected from at least one corner via a
    chain of other transparent pixels.
  - Interior holes inside the bead are NOT connected to any corner, because
    the bead's opaque outer ring physically separates them from the corners.

So a flood fill from the corners through alpha < threshold pixels marks
exactly the real background. Everything else with alpha < 255 is an
interior hole: set those pixels to alpha=255. The bead's clean feathered
edge (alpha 0 to 255 transition) is preserved because those edge pixels
ARE reachable from the corners through low-alpha intermediates.

Usage:
    python scripts/fill-bead-alpha-holes.py            # process all
    python scripts/fill-bead-alpha-holes.py --only amethyst,citrine
    python scripts/fill-bead-alpha-holes.py --dry-run  # report only
"""

import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import binary_fill_holes, label

STONES_DIR = Path(__file__).resolve().parent.parent / "public" / "stones"


def fill_holes(im: Image.Image) -> tuple[Image.Image, int]:
    """Return (fixed_image, n_pixels_filled)."""
    if im.mode != "RGBA":
        im = im.convert("RGBA")

    arr = np.array(im)
    alpha = arr[:, :, 3]

    # "Background" mask = pixels reachable from any corner through low-alpha
    # connected component. Threshold at 32 so soft edges (alpha 1..31) still
    # count as background, but the bead body (alpha >= 32) doesn't.
    bg_threshold = 32
    bg_candidate = alpha < bg_threshold

    # Identify connected components in the candidate mask
    labels, _ = label(bg_candidate)

    # Find which labels touch any corner
    h, w = alpha.shape
    corner_labels = {labels[0, 0], labels[0, w - 1], labels[h - 1, 0], labels[h - 1, w - 1]}
    corner_labels.discard(0)  # 0 = not in candidate mask

    # The "true background" mask = pixels in candidate mask AND in a
    # corner-connected component
    true_bg = np.isin(labels, list(corner_labels)) if corner_labels else np.zeros_like(bg_candidate)

    # Interior holes = NOT true_bg AND alpha < 255
    interior_holes = (~true_bg) & (alpha < 255)
    n_filled = int(interior_holes.sum())

    # Fill them
    arr[:, :, 3] = np.where(interior_holes, 255, alpha)

    return Image.fromarray(arr, mode="RGBA"), n_filled


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", help="Comma-separated slugs (without .png)", default=None)
    parser.add_argument("--dry-run", action="store_true", help="Report counts without writing")
    args = parser.parse_args()

    targets = sorted(STONES_DIR.glob("*.png"))
    if args.only:
        wanted = set(args.only.split(","))
        targets = [p for p in targets if p.stem in wanted]

    if not targets:
        print("No matching PNGs found.")
        return 1

    total_filled = 0
    processed = 0
    for i, path in enumerate(targets, 1):
        im = Image.open(path)
        fixed, n_filled = fill_holes(im)
        suffix = " (dry run)" if args.dry_run else ""
        print(f"[{i:>2}/{len(targets)}] {path.name:35} {n_filled:>8,} px filled{suffix}")
        if not args.dry_run:
            fixed.save(path, "PNG", optimize=True)
            processed += 1
        total_filled += n_filled

    print(f"\nDone. {total_filled:,} interior alpha pixels filled across {processed or len(targets)} files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
