

# Fix Scroll-Past-Panorama (Mobile + Desktop)

## Problem
The panorama's `onTouchMove` and `onWheel` handlers call `preventDefault()` unconditionally, trapping users on the panorama — they can't scroll past it on mobile (touch) or desktop (wheel).

## Solution — Single file change: `src/components/PanoramaViewer.tsx`

### Touch (mobile)
- Add a `touchIntent` ref: starts `'undecided'` on each `touchstart`
- On first movement in `touchmove`, compare `|dx|` vs `|dy|`:
  - Horizontal dominant → `'pan'`, preventDefault, rotate panorama
  - Vertical dominant → `'scroll'`, do nothing (browser scrolls page)
- Pinch gestures always preventDefault (zoom)

### Wheel (desktop)
- Remove `e.preventDefault()` from the wheel handler entirely
- Instead, only zoom when user holds **Ctrl/Cmd + scroll** (standard map/embed convention)
- Plain scroll passes through to page scroll

This is the standard disambiguation pattern used by Google Maps embeds and carousels.

