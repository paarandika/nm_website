"""Generate a simplified skyline for small or low-power devices.

The drawing is ~2850 straight-line paths, most of them window mullions a few units
across. At a 375px viewport one viewBox unit is roughly half a pixel, so anything under
a handful of units cannot resolve on screen - it costs DOM nodes, bytes, and (because
`#sky.run path` animates every path) one CSS animation each, while contributing nothing
visible. This drops paths whose bounding box is below a threshold and prunes any group
left empty, keeping every landmark so the composition is unchanged.

Two attributes also go:
  style="--x:N"    written on every path, but nothing reads it - only var(--gx), set on
                   the parent group from JS, drives the draw stagger. pathLength stays:
                   both tiers run the same draw animation, lite just has fewer paths.

    python tools/build-skyline-lite.py --stats        # compare thresholds
    python tools/build-skyline-lite.py --threshold 8  # write the asset
"""
import argparse
import re

SRC = 'assets/colombo-skyline.svg'
OUT = 'assets/colombo-skyline-lite.svg'

PATH_EL = re.compile(r'<path\b[^>]*></path>')
D_ATTR = re.compile(r'\sd="([^"]+)"')
X_VAR = re.compile(r'\sstyle="--x:[^"]*"')
PATH_LEN = re.compile(r'\spathLength="1"')
EMPTY_G = re.compile(r'<g\b[^>]*>\s*</g>')
LANDMARK = re.compile(r'data-depth="3"')
TOKEN = re.compile(r'([MmLlHhVvZz])|(-?\d*\.?\d+)')


def extent(d):
    """Largest bbox side of a path. This artwork uses only M/L/H/V/Z - no curves."""
    x = y = start_x = start_y = 0.0
    xs, ys, nums = [], [], []
    cmd = None

    def flush():
        nonlocal x, y, start_x, start_y
        if cmd in 'Mm':
            for i in range(0, len(nums) - 1, 2):
                x, y = (nums[i], nums[i + 1]) if cmd == 'M' else (x + nums[i], y + nums[i + 1])
                if i == 0:
                    start_x, start_y = x, y
                xs.append(x)
                ys.append(y)
        elif cmd in 'Ll':
            for i in range(0, len(nums) - 1, 2):
                x, y = (nums[i], nums[i + 1]) if cmd == 'L' else (x + nums[i], y + nums[i + 1])
                xs.append(x)
                ys.append(y)
        elif cmd in 'Hh':
            for v in nums:
                x = v if cmd == 'H' else x + v
                xs.append(x)
                ys.append(y)
        elif cmd in 'Vv':
            for v in nums:
                y = v if cmd == 'V' else y + v
                xs.append(x)
                ys.append(y)
        elif cmd in 'Zz':
            x, y = start_x, start_y
        nums.clear()

    for m in TOKEN.finditer(d):
        if m.group(1):
            if cmd:
                flush()
            cmd = m.group(1)
            if cmd in 'Zz':
                flush()
                cmd = None
        else:
            nums.append(float(m.group(2)))
    if cmd:
        flush()
    if not xs:
        return 0.0
    return max(max(xs) - min(xs), max(ys) - min(ys))


def build(src, threshold):
    kept = dropped = 0

    def keep_or_drop(m):
        nonlocal kept, dropped
        el = m.group(0)
        d = D_ATTR.search(el)
        if not d or extent(d.group(1)) < threshold:
            dropped += 1
            return ''
        kept += 1
        # pathLength is kept: both tiers run the same stroke-dash draw, the lite one
        # simply has fewer paths to animate. Only the dead --x property is stripped.
        return X_VAR.sub('', el)

    out = PATH_EL.sub(keep_or_drop, src)
    while True:
        pruned, n = EMPTY_G.subn('', out)
        if not n:
            break
        out = pruned
    return out, kept, dropped


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--threshold', type=float, default=8.0,
                    help='drop paths whose largest bbox side is under this many viewBox units')
    ap.add_argument('--stats', action='store_true', help='compare thresholds without writing')
    ap.add_argument('--clean-source', action='store_true',
                    help='strip the dead --x custom property from the full asset in place '
                         '(keeps pathLength, which the animated tier needs)')
    args = ap.parse_args()
    src = open(SRC, encoding='utf-8').read()
    base = len(PATH_EL.findall(src))

    if args.clean_source:
        cleaned, n = X_VAR.subn('', src)
        open(SRC, 'w', encoding='utf-8').write(cleaned)
        print('stripped %d --x declarations' % n)
        print('%s %.0f KB -> %.0f KB' % (SRC, len(src.encode()) / 1024, len(cleaned.encode()) / 1024))
        return

    if args.stats:
        print('%7s %7s %7s %9s  %s' % ('thresh', 'paths', 'kept%', 'raw KB', 'landmarks'))
        print('%7s %7d %6.1f%% %8.1fK  %d'
              % ('source', base, 100.0, len(src.encode()) / 1024, len(LANDMARK.findall(src))))
        for t in (0, 3, 5, 8, 12, 16, 24):
            out, kept, _ = build(src, t)
            print('%7g %7d %6.1f%% %8.1fK  %d'
                  % (t, kept, 100.0 * kept / base, len(out.encode()) / 1024,
                     len(LANDMARK.findall(out))))
        return

    out, kept, dropped = build(src, args.threshold)
    open(OUT, 'w', encoding='utf-8').write(out)
    print('threshold %g: kept %d, dropped %d of %d paths' % (args.threshold, kept, dropped, base))
    print('%s %.0f KB -> %s %.0f KB'
          % (SRC, len(src.encode()) / 1024, OUT, len(out.encode()) / 1024))


if __name__ == '__main__':
    main()
