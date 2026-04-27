# Oryam — Single-Page Rebuild

A complete reset to a one-page luxury site for **Oryam** (3 beachfront residences, Mont Choisy). All copy, palette, fonts, and section structure follow the brief verbatim. The Mauritius lifestyle stays in exactly two places (hero line + Section 7). Everything else sells the apartment, the ownership, the financial logic.

---

## Scope

**Brand rename:** "Mont Choisy" → **Oryam** across the homepage, header, footer, `<title>`, meta description, and favicon wordmark. (Other pages keep working but are deprioritized — the homepage is the product.)

**Routing:** `/` becomes the new single-page Oryam site. Existing routes (`/residence`, `/contact`, `/admin`, etc.) remain mounted but are no longer linked from the new header/footer. All in-page CTAs scroll to anchors (`#residences`, `#intro`, `#ownership`, `#why`, `#contact`).

---

## Design system rewrite (`src/index.css` + `tailwind.config.ts`)

**Palette (exact hex from brief):**
```
--ocean:  #0B1724    --sand:  #F3EDE2    --cream: #F8F3EC
--gold:   #A8883A    --coral: #B8502E
--muted:  rgba(248,243,236,0.5)
--line:   rgba(168,136,58,0.2)
```

**Fonts (Google Fonts):** Cormorant Garamond (300, 300italic, 400italic, 600italic) for headlines; Jost (200, 300, 400, 500) for body/UI. Replace the current Inter+Cormorant import.

**Global rules:**
- No rounded corners anywhere (`--radius: 0`), no shadows, no gradients (except hero overlay).
- Sections alternate ocean → sand → ocean.
- 1px gold horizontal lines as section separators.
- Max content width 1280px, 80px+ vertical section padding on desktop.
- Eyebrow util: `.eyebrow` → 11–12px, `tracking-[0.3em]`, uppercase, gold.

---

## New components

**`src/components/oryam/ScrollProgress.tsx`** — fixed top 2px gold bar tracking `scrollY / (scrollHeight - innerHeight)`.

**`src/components/oryam/Reveal.tsx`** — IntersectionObserver wrapper: opacity 0→1, translateY 24px→0, 0.7s ease, optional stagger delay prop (used at 0.12s steps for grids).

**`src/components/oryam/OryamHeader.tsx`** — fixed top bar. Transparent over hero, `#0B1724` at 95% opacity + bottom gold line on scroll. Left: `ORYAM` (Cormorant, tracking 0.18em). Right desktop: `Residences · Ownership · Why Oryam` + gold-filled `Private Enquiry` button. Mobile: logo + Enquire button only (no hamburger).

**`src/components/oryam/OryamFooter.tsx`** — single row: wordmark / nav links / copyright + legal note (verbatim from brief).

---

## Homepage rewrite — `src/pages/Index.tsx`

Rebuilt from scratch as one file composing 9 sections. **Copy used verbatim — no rewrites.**

1. **Hero** — full viewport (`100dvh`), Unsplash beachfront image with Ken Burns, dark bottom-left → centre gradient. Bottom-left: gold eyebrow `ORYAM · MONT CHOISY · MAURITIUS`, two-line italic headline, sub-headline, two CTAs (gold filled `View the Residences →`, ghost `↓ The story`). Bottom-right: vertical stack of 4 facts (`3` / `€500k` / `IRS` / `Now`) separated by gold lines, number in Cormorant italic, label gold all-caps below.

2. **Intro** (ocean) — centred, max-width 640px, `THE PROPERTY` label, "Not a development. A private address." headline, body verbatim.

3. **The Residences** (sand, `id="residences"`) — header row (label + headline left, intro right), then 3-column grid of apartment cards. Each card: full-bleed image (zoom to 1.04 on hover, 0.6s ease), gold type label, italic name, spec line, description, 3 outlined tags, italic price, coral `Enquire →` link scrolling to `#contact`. **The Indigo** card has thin gold top border + `MOST SOUGHT AFTER` gold badge.

4. **Key Numbers Bar** (ocean) — 4 columns separated by gold vertical lines: `3 / 15% / €0 / 12 hr` with labels. No section heading.

5. **Ownership** (ocean, `id="ownership"`) — gold label, headline, then 2 columns (IRS Scheme / Managed Rental). Each column: short gold rule, gold small-caps label, column headline, body, tiny gold footer note.

6. **Why Oryam** (sand, `id="why"`) — label, headline, 2×2 grid of 4 numbered reasons (`01–04`), each with italic headline + body. Numbers in large Cormorant italic gold.

7. **The Setting** — full-bleed Unsplash beachfront image, dark overlay, centred text overlay (gold label, large italic headline, max-width 520px body). The single lifestyle moment.

8. **Contact** (ocean, `id="contact"`) — 2 columns. Left: headline, body, three label/value detail rows. Right: form with underline-only inputs (name, email, message textarea with the specified placeholder), gold filled `Send Enquiry →` button, tiny gold note below. On submit: `preventDefault`, swap button to `Enquiry Received ✓` in dark green, no reload. (No backend wiring in this pass — pure UX state. Hookup to Lovable Cloud can be a follow-up if wanted.)

9. **Footer** — very dark, three elements in one row, legal text verbatim.

---

## Behaviour & polish

- Smooth scroll on all anchor links (CSS `scroll-behavior: smooth`, already present).
- All headings + body blocks wrapped in `<Reveal>` with stagger on grid children.
- Card image hover: `transform: scale(1.04); transition: 0.6s ease`.
- Form input focus: underline slides in from centre (pseudo-element with `transform: scaleX(0)` → `scaleX(1)`, `transform-origin: center`).
- Nav CTA hover: fills gold.
- `prefers-reduced-motion`: disable Ken Burns and reveal animations (already covered in CSS).

---

## `index.html`

- `<title>` → "Oryam — Beachfront Residences, Mont Choisy, Mauritius"
- meta description → "A private collection of three beachfront residences at Mont Choisy, Grand Baie. IRS ownership. From €500,000."
- Update Google Fonts `<link>` to Cormorant Garamond + Jost.

---

## Out of scope this pass

- Wiring the contact form to the database/email (UX state only). Easy to add after.
- Refactoring the other routes (`/residence`, `/explore`, etc.) to the new look — they stay functional but unlinked from the new homepage.
- Real photography — Unsplash placeholders with descriptive alt text and `data-slot` attributes (`hero-bg`, `card-coral`, `card-indigo`, `card-horizon`, `setting-bg`) so the client can swap one-for-one.

---

## Files touched

- **Edit:** `src/index.css`, `tailwind.config.ts`, `index.html`, `src/pages/Index.tsx`
- **Create:** `src/components/oryam/OryamHeader.tsx`, `OryamFooter.tsx`, `ScrollProgress.tsx`, `Reveal.tsx`
- **Memory:** update `mem://identity/project-scope` and `mem://style/aesthetic-direction` to reflect Oryam brand + new palette/typography.
