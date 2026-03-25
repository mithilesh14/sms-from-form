

# Fix: Panorama Still Traps Scroll on Mobile

## Root Cause

On touch devices, **both** pointer events and touch events fire. The `onPointerDown`/`onPointerMove` handlers unconditionally set `isDragging = true` and consume the gesture — they have no scroll disambiguation. This overrides the touch handler logic that correctly detects vertical swipes and lets the page scroll.

## Solution — `src/components/PanoramaViewer.tsx`

**Skip pointer events when touch is the input source.** Pointer events include a `pointerType` property (`"mouse"`, `"touch"`, `"pen"`). We simply ignore pointer events where `pointerType === "touch"` so the touch-specific handlers (which already have the scroll-vs-pan disambiguation) are the sole controllers on mobile.

Changes:
- `onPointerDown`: early return if `e.pointerType === "touch"`
- `onPointerMove`: early return if `e.pointerType === "touch"`

This is a ~2-line change. Desktop mouse behavior stays identical; mobile touch is handled exclusively by the touch handlers with proper scroll disambiguation.

