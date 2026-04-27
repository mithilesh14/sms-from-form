## Goal

Make the entire site truly bilingual (EN / FR). Right now the language switcher exists, the dictionary keys exist, and the data-driven arrays use them — but most of the visible page text is still hardcoded English, and per-residence content (names, descriptions, gallery captions) isn't translated at all.

## What's still hardcoded

**Homepage (`src/pages/Index.tsx`)** — every hero/intro/residences/ownership/grounds/why/setting/contact heading, paragraph and form label.

**Residence Detail (`src/pages/ResidenceDetail.tsx`)** — 100% English (back link, hero meta labels, "In detail.", spec list keys, 360° section, gallery heading, CTA, "Also in the collection").

**Residence data (`src/data/residences.ts`)** — `name`, `tagline`, `blurb`, `description`, `type`, gallery `caption`. None of these are translated.

## Plan

### 1. Locales — add per-residence content + missing detail keys

In `src/i18n/locales/en.ts` and `fr.ts`, add an `oryam.residencesData` block keyed by slug:

```
residencesData: {
  b11: { type, name, tagline, blurb, description,
         captions: ['…', '…', …8] },
  b22: { … },
  penthouse: { … },
}
```

EN keeps the current copy. FR gets a proper translation (e.g. *The Coral* → *Le Corail*, *The Indigo* → *L'Indigo*, *The Horizon* → *L'Horizon*; `From €520,000` → `À partir de 520 000 €`; spec strings localized: `2 Chambres · 2 Salles de bain · 110 m²`).

Also add a small `oryam.detail.back_long` ("← Back to the collection" / "← Retour à la collection") plus any existing `oryam.detail.*` keys we haven't wired.

### 2. Wire homepage (`src/pages/Index.tsx`)

Replace every hardcoded string with a `t('oryam.…')` call:
- Hero eyebrow, h1, lede, two CTA buttons.
- Intro section (eyebrow, h2, body).
- Residences section heading + body + featured tag + tags ("IRS Eligible", "Rental Programme", "Move-In Ready") + "Explore the residence →" + "View & 360°".
- Ownership section (h2 + both columns).
- Building & Grounds (eyebrow, h2, body).
- Why Oryam heading.
- The Setting (eyebrow, h2, body).
- Contact (h2, body, three meta rows, form labels, placeholder, button text — pending / sent — footnote).

For the residence cards, pull `name / blurb / type / spec / price` from `t('oryam.residencesData.<slug>.…')` instead of the data file. The `RESIDENCES` constant continues to provide images, slug, beds/baths, featured flag.

### 3. Wire `ResidenceDetail.tsx`

Add `useTranslation`. Translate every static label:
- Back link, hero eyebrow (`{type} · ORYAM · MONT CHOISY`), beds/baths/m² labels.
- "THE RESIDENCE / In detail." block + the 6-row spec dl (BEDROOMS / BATHROOMS / INTERIOR / STATUS / SCHEME / RESIDENCY and their values).
- 360° section eyebrow, title, body (with `{{name}}` interpolation), placeholder eyebrow / title / body / "See the gallery" button.
- Gallery heading ("{{count}} views.").
- CTA eyebrow / title / body / button.
- "Also in the collection" eyebrow + title.

Use translated `name / tagline / description / type / spec / price` from the dictionary, and translated gallery captions (`captions[i]`).

### 4. Sanity check

- French `Intl`-style price format (thin-space + `€` after the number).
- Confirm `LanguageSwitcher` already persists choice (it does — i18next default).
- No layout regressions: French strings tend to be ~15 % longer; existing typography handles that, no width changes needed.

### Out of scope

- No backend, no Supabase changes.
- No new pages, no design changes.
- 360° viewer stays a placeholder (per existing scope).

## Files touched

- `src/i18n/locales/en.ts` — add `residencesData` block + any missing detail keys.
- `src/i18n/locales/fr.ts` — same, fully translated.
- `src/pages/Index.tsx` — replace ~40 hardcoded strings with `t(…)`.
- `src/pages/ResidenceDetail.tsx` — add `useTranslation`, replace ~25 hardcoded strings.

No other files need to change.
