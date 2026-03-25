

# Replace Hero with Cinematic Static Luxury Image

## What changes
Replace the 360° `PanoramaViewer` in the hero section with a full-bleed static image of a luxury apartment interior, using a slow Ken Burns zoom animation for a cinematic feel.

## Image
Use a high-quality Unsplash luxury interior with light tones, e.g.:
`https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&auto=format&fit=crop&q=80`
(bright, modern luxury living room with neutral/light palette, large windows, elegant furnishings)

Backup options to evaluate:
- `photo-1616486338812-3dadae4b4ace` — light modern living room
- `photo-1618221195710-dd6b41faaea6` — minimal luxury with cream tones

## Changes — `src/pages/Index.tsx`

1. Remove `PanoramaViewer` import
2. Replace the hero `<section>` contents: swap `<PanoramaViewer>` for a full-bleed `<img>` with:
   - `object-cover` filling the viewport
   - Framer Motion slow Ken Burns animation (scale 1 → 1.08 over ~20s)
3. Keep all existing overlay text, scroll indicator, and bottom gradient unchanged

Single file change, ~15 lines modified.

