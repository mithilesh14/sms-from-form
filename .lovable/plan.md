## What's wrong

I baked "three apartments / three residences total" into the copy in many places. The reality: **three layouts** (B-11, B-22, Penthouse), **multiple units of each**. I'll strip every false-quantity claim and reframe everything around layouts + limited availability, without quoting any unit count.

The B-22 copy (`Three bedrooms`, `Three full bedrooms`) is correct — that's bedrooms, not units — and stays.

## Fixes

### 1. EN locale (`src/i18n/locales/en.ts`)

- **`hero.lede`** → "A private residence at Mont Choisy, Grand Baie. Two- and three-bedroom apartments and a penthouse — fully fitted, freehold, IRS-eligible — with Mauritian residency from €500,000."
- **`hero.facts.residences`** label → "Apartment Layouts" (so the `3` tile reads as "3 · Apartment Layouts", which is true).
- **`intro.body`** → "Oryam is a private residence at Mont Choisy — one of the most coveted neighbourhoods on the north coast of Mauritius. Three carefully considered layouts: a bright two-bedroom, a generous three-bedroom, and a single rooftop penthouse. Each apartment is delivered fully fitted, available under the IRS scheme, and ready for immediate occupation. Availability is limited and managed by appointment."
- **`residences.title_l1`** → "Three layouts." **`title_l2`** → "One quiet address." **`body`** → "Each Oryam apartment is delivered fully fitted — kitchen, bathrooms and built-in joinery complete — and available under Mauritius's IRS scheme, granting full freehold ownership and a Resident Permit for you and your family upon purchase. Several units of each layout are currently offered."
- **`keyNumbers.n1`** → "Apartment layouts in the residence" (keeps the `3` honest).
- **`setting.body`** → drop "the last three available". Replace ending with: "The location is exceptional. Availability at this address is limited — and managed by private appointment."
- **`contact.title_l1` / `_l2` / `_l3`** → "By appointment only." / "No open days." / "Strictly private." (removes the literal "Three residences." line).
- **`detail.others_title`** → "The other layouts." (was "Two other residences.")

### 2. FR locale (`src/i18n/locales/fr.ts`) — same fixes, mirrored

- `hero.lede` → "Une adresse privée à Mont Choisy, Grand Baie. Appartements de deux et trois chambres et un penthouse — entièrement équipés, en pleine propriété, éligibles IRS — avec résidence mauricienne à partir de 500 000 €."
- `hero.facts.residences` → "Typologies d'appartements"
- `intro.body` → "Oryam est une adresse privée à Mont Choisy — l'un des quartiers les plus prisés de la côte nord de Maurice. Trois typologies pensées avec soin : un deux-chambres lumineux, un trois-chambres généreux, et un penthouse unique en toiture. Chaque appartement est livré entièrement équipé, disponible sous le régime IRS et prêt à habiter. La disponibilité est limitée et gérée sur rendez-vous."
- `residences.title_l1` → "Trois typologies." `title_l2` → "Une adresse discrète." `body` → "Chaque appartement Oryam est livré entièrement équipé… Plusieurs unités de chaque typologie sont actuellement proposées."
- `keyNumbers.n1` → "Typologies d'appartements dans la résidence"
- `setting.body` → ending becomes "L'emplacement est exceptionnel. La disponibilité à cette adresse est limitée — et gérée sur rendez-vous privé."
- `contact.title_l1` / `_l2` / `_l3` → "Sur rendez-vous uniquement." / "Pas de portes ouvertes." / "Strictement privé."
- `detail.others_title` → "Les autres typologies."

### 3. Memory

Update `mem://index.md` Core to make the rule unmissable: "THREE LAYOUTS, MULTIPLE UNITS each. Never claim a total apartment count. Don't say 'only three' / 'just three'." (I tried to write this in plan mode and it was rejected, so I'll do it on approval.)

### Out of scope

- No layout, design, image, or routing changes.
- No edits to `src/pages/Index.tsx` or `ResidenceDetail.tsx` — they already pull every affected string through `t()`. Only the dictionaries change (plus the two `num: '3'` tile labels are corrected via the locale label change).
- B-22 copy that mentions "three bedrooms" stays (correct).

### Files touched

- `src/i18n/locales/en.ts`
- `src/i18n/locales/fr.ts`
- `mem://index.md`
