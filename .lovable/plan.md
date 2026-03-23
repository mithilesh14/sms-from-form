

# The Verso Mauritius — Complete Redesign

## Vision

A cinematic, immersive luxury real estate experience inspired by Aman Resorts (serene minimalism, video-driven), Olson Kundig (bold typography over full-bleed imagery), and Conran & Partners (editorial storytelling). The site tells a story rather than listing properties — positioning The Verso as a private lifestyle destination in Mauritius.

---

## Site Architecture

```text
/                    → Intent Gateway + Cinematic Home (story scroll)
/residence           → The Vision (architecture, lifestyle chapters)
/explore             → Interactive Building Explorer (clickable floors/units)
/virtual-tour        → 360° Immersive Apartment Walkthrough
/own-in-mauritius    → Foreign Ownership & Residency Guide
/gallery             → Full-bleed Visual Gallery
/contact             → Inquiry / Private Consultation
```

---

## Design System

**Palette**: Refined from current — deep charcoal `#1a1a1a`, warm sand `#f5f0eb`, burnished gold accent `#b8965a`, ocean teal `#2d6b6b`, pure white text on dark.

**Typography**: Keep Cormorant Garamond (serif, display) + Outfit (sans, body). Ultra-light weights for captions, medium for emphasis.

**Motifs**: Horizontal reveal lines, parallax layering, cinematic letterboxing (black bars on hero), slow Ken Burns zoom on images.

---

## Page-by-Page Plan

### 1. Intent Gateway (Fullscreen Entry)
- Fullscreen dark overlay on a slow-moving background video/image
- Three elegant choices: **Live** · **Invest** · **Escape**
- Each word animates on hover with a subtle image preview
- Selection sets a `mode` context (lifestyle vs. investment) that adapts content throughout
- Minimal — just the logo, the three words, and a language toggle
- Stored in state/context so subsequent pages adapt

### 2. Home Page (Cinematic Story Scroll)
- **Video Hero**: Fullscreen background video (Mauritius aerial/ocean — using a high-quality stock video URL or placeholder), letterboxed with subtle overlay. Logo centered. Scroll indicator at bottom.
- **Chapter 1 — "The Island"**: Horizontal scroll or parallax section with large Mauritius landscape imagery, minimal poetic text about the island lifestyle. Fade-in text reveals.
- **Chapter 2 — "The Architecture"**: Full-bleed architectural renders/photos with text overlays. Numbers appear (32 residences, 8 floors, etc.) with animated counting.
- **Chapter 3 — "The Living"**: Focus on moments — morning light through windows, infinity pool at sunset, private terrace dining. Not feature lists. Mood-driven imagery with one-line captions.
- **Lifestyle/Investment Toggle**: Sticky toggle in corner. In lifestyle mode, content emphasizes experience. In investment mode, shows ROI data, rental yields, capital appreciation.
- **CTA Section**: "Begin Your Journey" — minimal form or link to contact.

### 3. Interactive Building Explorer (`/explore`)
- SVG or CSS-rendered building cross-section (8-floor building silhouette)
- Clickable floors that expand to show unit layouts
- Each unit shows: orientation/view direction, sunlight hours indicator, floor plan thumbnail, price range
- Hover effects reveal unit details in a side panel
- Filter by: number of bedrooms, view type (ocean/mountain/garden), price range
- Click a unit to go to its 360° tour or inquiry

### 4. 360° Virtual Tour (Enhanced)
- Keep existing React Three Fiber panorama viewer
- Add room-to-room navigation with hotspot dots
- Add ambient sound toggle (ocean waves, nature)
- Fullscreen mode with minimal UI overlay
- Scene transitions with fade effects

### 5. Own in Mauritius (`/own-in-mauritius`)
- Premium editorial layout explaining:
  - Foreign ownership eligibility (IRS/PDS scheme)
  - Residency permit benefits (€500k+ purchase = permanent residency)
  - Tax advantages (no capital gains tax, no inheritance tax)
  - Investment returns and rental yield data
- Presented as clean infographic-style cards, not dense text
- Adapts based on lifestyle/investment mode toggle
- CTA to schedule a private consultation

### 6. Header Redesign
- Ultra-minimal: Logo left, hamburger menu right (always, even desktop)
- Full-screen overlay menu (like Aman) with large serif navigation links
- Transparent on hero sections, subtle glass on scroll
- Lifestyle/Investment mode indicator

### 7. Footer Redesign
- Minimal dark footer with logo, essential links, and a "Private Consultation" CTA
- Social links, legal, language toggle

---

## Technical Approach

### Files to Create
- `src/contexts/IntentContext.tsx` — Lifestyle/Investment mode state
- `src/pages/IntentGateway.tsx` — Fullscreen entry screen
- `src/pages/Explore.tsx` — Building explorer
- `src/pages/OwnInMauritius.tsx` — Ownership guide
- `src/components/BuildingExplorer.tsx` — Interactive SVG building
- `src/components/ChapterSection.tsx` — Reusable story chapter component
- `src/components/ModeToggle.tsx` — Lifestyle/Investment toggle

### Files to Heavily Rewrite
- `src/pages/Index.tsx` — Complete redesign as cinematic story scroll
- `src/components/layout/Header.tsx` — Aman-style minimal header with fullscreen menu
- `src/components/layout/Footer.tsx` — Minimal redesign
- `src/index.css` — Updated design tokens, new utility classes
- `src/i18n/locales/en.ts` — All new copy for Mauritius context
- `src/i18n/locales/fr.ts` — French translations
- `src/App.tsx` — New routes, IntentContext wrapper

### Files to Update
- `src/pages/VirtualTour.tsx` — Enhanced with ambient sound, fullscreen
- `src/pages/Residence.tsx` — Rewritten as "The Vision" architectural story
- `src/pages/Contact.tsx` — Simplified, premium inquiry form
- `index.html` — Updated meta for Mauritius positioning

### Implementation Order
Due to the scale, this should be done in 4-5 phases:
1. **Design system + Intent Gateway + Header** — Foundation
2. **Home page cinematic scroll** — Hero experience
3. **Building Explorer + Own in Mauritius** — Key differentiators
4. **Virtual Tour enhancements + Gallery** — Immersive features
5. **Content polish + responsive QA** — Final pass

---

## Key Interactions
- Smooth scroll-triggered animations (framer-motion `useScroll` + `useTransform`)
- Parallax image layers at different scroll speeds
- Text reveals with clip-path or overflow-hidden + translateY
- Building explorer hover/click with animated panel transitions
- Mode toggle that cross-fades content sections
- Optional ambient audio (muted by default, user-activated)

