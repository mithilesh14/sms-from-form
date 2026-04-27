# Mont Choisy — Complete Reimagining + Paradise Entry Page

A full ground-up redesign that sells the Mauritian lifestyle first, apartments second. Editorial luxury travel magazine meets cinematic landing page (Aman / Six Senses / Dunton references).

This pass introduces a new cinematic **"Welcome to Paradise"** entry page at `/` and moves the main homepage to `/home`. Visitors are emotionally transported before browsing residences.

---

## 1. Routing changes — `src/App.tsx`

- `/` → new `Paradise` page (cinematic gateway)
- `/home` → existing/redesigned `Index` page (the lifestyle homepage)
- All other routes unchanged

---

## 2. New page — `src/pages/Paradise.tsx`

A single full-screen cinematic experience. No header, no footer, no scroll.

- Full-bleed background: turquoise lagoon + white beach (Unsplash placeholder, slot `paradise-bg`)
- Slow Ken Burns zoom (scale 1 → 1.08 / 25s)
- Soft dark vignette gradient for legibility
- Subtle ambient overlay (optional grain texture already in CSS)
- Centered content stack (staggered fade-up on load):
  - Tiny gold label: `MAURITIUS · INDIAN OCEAN`
  - Giant italic Cormorant headline (2 lines, ~52px mobile / ~104px desktop): *"Welcome to / Paradise"*
  - Thin gold divider line (animated draw-in)
  - One-line DM Sans subtitle: *"A private collection of oceanfront residences at Mont Choisy"*
  - Coral CTA button: **"Enter"** → routes to `/home`
- Faint bottom caption: `MONT CHOISY` wordmark
- Respects `prefers-reduced-motion` (disables Ken Burns + stagger)

The button uses `react-router` `Link` to `/home` with a 600ms fade-out page transition (overlay div fades in over the viewport, navigation triggers, new page mounts).

---

## 3. Design system overhaul — `src/index.css` + `tailwind.config.ts`

Replace the warm-ivory palette with the new sensory palette:
- `--ocean-night: 209 53% 11%` (#0D1B2A)
- `--warm-sand: 41 47% 89%` (#F2E8D5)
- `--coral: 14 64% 53%` (#D4603A)
- `--lagoon: 188 39% 48%` (#4A9BAB)
- `--gold: 44 53% 54%` (#C9A84C)
- `--off-white: 41 56% 95%` (#FAF6EF)

Mapped semantics: `background` → warm sand, `foreground` → ocean night, `accent` → coral, `ring` → gold.

Fonts: load **DM Sans (300, 400, 500)** alongside **Cormorant Garamond (300i, 400i, 600)**. Body becomes DM Sans 300, line-height 1.9.

New utilities:
- `.section-dark` / `.section-light`
- `.label-gold` (uppercase 11px / 0.3em / gold)
- `.divider-gold` (1px hairline gold)
- `.input-underline` (animates from center on focus)
- `.scroll-progress` (1px coral→gold bar driven by Framer `useScroll`)

Tailwind colors extended with `ocean`, `sand`, `coral`, `lagoon`, `gold`, `offwhite`.

---

## 4. Header redesign — `src/components/layout/Header.tsx`

Hidden on `/` (Paradise page). On `/home` and elsewhere:
- Left: small "MONT CHOISY" wordmark
- Right: 4 ghost links (Lifestyle · Residences · Gallery · Contact) + one solid coral **"Enquire"** button
- Transparent over dark hero; on scroll → off-white background with thin gold border
- Mobile: existing fullscreen overlay menu, restyled with new palette

---

## 5. Homepage rebuild — `src/pages/Index.tsx` (now at `/home`)

Eight sections, alternating dark/light, with named image slots for Dropbox swap.

1. **Hero** — full-bleed lagoon (slot `hero-bg`), Ken Burns, italic headline *"Where the Indian Ocean / becomes your backyard"*, gold label, animated scroll line.
2. **Lifestyle Intro** (dark) — centered poetic 2–3 sentence paragraph, gold rules above + below.
3. **The Experience** — 3 alternating asymmetric pillars (Ocean / Culture / Pace), image slides in from outer edge. Slots: `lifestyle-ocean`, `lifestyle-culture`, `lifestyle-pace`.
4. **Lifestyle Gallery** — horizontal-scroll strip of 7 portrait images with subtle parallax. Slots: `gallery-1`…`gallery-7`. Mobile: native swipe + snap.
5. **The Residences** — headline "Your private address on the edge of paradise", 3 editorial cards (image + name/size/price overlay), hover scale + coral border + "Discover" fade-in. Slots: `apt-card-1`…`apt-card-3`. Tagline below.
6. **Why Mauritius** (light) — 2×2 grid of stat tiles (no icons): "300+ sunny days", "15 min to Grand Baie", "IRS — full ownership for non-citizens", "World-class snorkeling on your doorstep".
7. **Enquiry** (dark) — italic headline *"Begin your Mauritian story"*, underline-only inputs (Name, Email, Phone optional, Message), coral "Send Enquiry" button, gold "We respond within 24 hours". Frontend-only in this pass (button currently opens `mailto:`); backend wiring is a flagged follow-up.
8. **Footer** — inherits new palette from existing global Footer; minor color tweaks only.

---

## 6. Motion & accessibility
- Framer `useScroll` → 1px coral/gold progress bar at top of viewport
- `whileInView` for section heading fade-ups
- Hero text staggered fade-up (0.2s gap per line)
- Pillar images slide 60px from outer edge
- Gallery parallax via `useTransform`
- All animations gated by `@media (prefers-reduced-motion: reduce)` (transforms disabled)

## 7. Responsive
- All sections stack below `md`
- Hero scales 52px → 96px+ between mobile and desktop
- Tap targets ≥ 44px

## 8. Image slot naming
Each `<img>` carries a `data-slot="..."` attribute matching the names above so client photography swaps in cleanly.

---

## Files changed
- `src/App.tsx` — add `/` Paradise route, move homepage to `/home`
- `src/pages/Paradise.tsx` — **new** cinematic gateway
- `src/index.css` — new palette, fonts, utilities
- `tailwind.config.ts` — color/font extensions
- `src/components/layout/Header.tsx` — minimal top bar, hidden on `/`
- `src/pages/Index.tsx` — full rewrite, 8 sections
- `index.html` — meta description updated to lifestyle-first wording

## Out of scope (this pass)
- Other routes (`/residence`, `/explore`, `/gallery`, etc.) keep working and inherit the new palette; deeper redesigns can follow.
- Backend wiring of the enquiry form to an `enquiries` table — flagged for a follow-up.
