

# Mobile 360° Panorama Improvements

## Changes

### `src/components/PanoramaViewer.tsx`
- Add **pinch-to-zoom** via tracking two-finger touch distance changes, mapping to `targetFov`
- Update `onTouchStart` to detect two-finger gestures and store initial pinch distance
- Update `onTouchMove` to calculate pinch delta and adjust zoom accordingly
- Prevent single-finger drag from firing during pinch

### `src/pages/Index.tsx`
- Change hero section from `h-screen` to `h-dvh` (dynamic viewport height) so the panorama properly fills mobile browsers when the address bar toggles

### `src/pages/VirtualTour.tsx`
- Update `min-h-[60vh]` references if needed to use `dvh` units for consistency

