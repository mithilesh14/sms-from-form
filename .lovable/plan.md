## Goal

The eyebrow ("ORYAM · TROU AUX BICHES · MAURICE") and the headline ("Une autre façon de posséder à Maurice.") sit over the brightest part of the pool image and lose contrast. Make them readable without breaking the editorial, no-box aesthetic.

## Approach

Two complementary changes in `src/pages/Index.tsx`, hero section only:

### 1. Strengthen the global hero gradient (subtle, image-wide)

Current overlay is too light at the top (0.30 → 0.10 → 0.55 → 0.85). Adjust to keep the image visible but ground the text:

```text
linear-gradient(180deg,
  rgba(11,23,36,0.55) 0%,
  rgba(11,23,36,0.25) 30%,
  rgba(11,23,36,0.55) 70%,
  rgba(11,23,36,0.92) 100%)
```

Uses the brand `ocean` (#0B1724) instead of #0F1620 for color consistency.

### 2. Add a soft localized scrim behind the text column only

Rather than a hard "background color box" (which would feel like a UI card and break the editorial tone), wrap the left text column in a radial/linear vignette that fades into the image. Implemented as a `::before` pseudo-via inline `style` on the text wrapper, or a sibling absolutely-positioned div:

```tsx
<div className="lg:col-span-7 xl:col-span-6 relative">
  {/* soft scrim — only behind the text, fades to transparent on the right */}
  <div
    aria-hidden
    className="absolute -inset-x-6 -inset-y-4 lg:-inset-x-10 -z-10 pointer-events-none"
    style={{
      background:
        'linear-gradient(90deg, rgba(11,23,36,0.55) 0%, rgba(11,23,36,0.45) 55%, rgba(11,23,36,0) 100%)',
    }}
  />
  <Reveal>...eyebrow / h1 / lede / CTAs...</Reveal>
</div>
```

Notes:
- No border, no rounded corners, no visible edge — pure tonal wash, consistent with the "no cards, no shadows" memory rule.
- Fades to fully transparent on the right so the pool image still reads.
- Sits behind the text (`-z-10` within the relative wrapper) but above the image (parent `z-10`).
- Does not touch the right-side facts card.

### 3. Slight text shadow on h1 + eyebrow (defensive)

Add `text-shadow: 0 1px 24px rgba(11,23,36,0.45)` via inline style on the `<h1>` and the eyebrow `<p>` so any pixel that escapes the scrim still has separation. Very soft, no visible glow.

## Files

- `src/pages/Index.tsx` — hero `<section>` only (overlay gradient + text wrapper + h1/eyebrow style). No other sections, no CSS file changes, no new components.

## Out of scope

- Other pages' heroes (OwnInMauritius, ResidenceDetail) — only fix the homepage as requested.
- Replacing the hero image.
- Changing typography sizes or the facts card.
