

# Transparent Header Over 360° Hero

## What I See
The header currently has a solid cream/white background (`bg-background` / `bg-background/95`) that sits above the 360° panorama, creating a visible break. The panorama starts below the header at `pt-[70px] lg:pt-[91px]`. The user wants the Verso-style effect where the hero image/panorama extends edge-to-edge behind a transparent header.

## Changes

### `src/components/layout/Header.tsx`
- **Default state** (not scrolled): `bg-transparent` with white text for logo, nav links, and language toggle. Remove bottom border line when transparent.
- **Scrolled state**: Keep current solid `bg-background shadow-sm` with dark text (`text-foreground`).
- Add `isScrolled` conditional to all text elements — white when transparent, dark when scrolled.
- The logo "MONT CHOISY" and "Oceanfront Living" switch between white and dark based on scroll.

### `src/pages/Index.tsx`
- Remove `pt-[70px] lg:pt-[91px]` from the hero section so the 360° panorama fills the full viewport behind the header.
- Keep the overlay text padding adjusted so it doesn't hide behind the header area.

This is a focused, two-file change. No routes or pages are removed.

