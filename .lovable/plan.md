## Change

Swap the dark scrim behind the hero eyebrow + headline for **cream (#F8F3EC) blocks with ocean (#0B1724) text**, tying the hero into the site's alternating ocean/sand/cream rhythm.

## Italics note

The headline `<h1>` already uses `text-display`, which is Cormorant Garamond italic 300 — so it's italic by default. The eyebrow ("ORYAM · TROU AUX BICHES · MAURICE") is uppercase + 0.3em letter-spaced; italicizing letterspaced uppercase reads poorly, so we keep it upright but give it the same cream block treatment for consistency.

## Edits — `src/pages/Index.tsx` only

Replace the dark `rgba(11,23,36,0.55)` backgrounds and `text-ivory` on the eyebrow + h1 spans with:

- Eyebrow span: `background: #F8F3EC; color: #0B1724;` (px-3 py-1.5, unchanged)
- Headline `<h1>`: drop `text-ivory`, add inline `color: #0B1724`
- Each headline `<span>` (line 1 and line 2): `background: #F8F3EC` with `box-decoration-break: clone` so multi-line text wraps cleanly

Lede paragraph and CTA buttons stay as they are (light text over the gradient).

## Out of scope

Header, facts card, lede, CTAs, gradient overlay — unchanged.
