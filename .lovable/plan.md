

# Comprehensive Fix & Elevation Plan

## Issues to Address

### 1. Remove the Lifestyle/Investment Toggle (ModeToggle)
The toggle currently switches between "Lifestyle" and "Investment" mode but only changes one small section on the homepage (the investment/lifestyle block at the bottom). It adds confusion and visual clutter without meaningful impact. **Remove it entirely** along with the IntentGateway page and IntentContext. The homepage should present both lifestyle and investment content naturally within the scroll narrative rather than hiding one behind a toggle.

### 2. Fix Header Alignment
The current header has decorative lines (`w-8 h-px`) flanking the logo that push nav links out of alignment and create visual imbalance. The right side has more items (Availability, Own in Mauritius, Book A Tour, language, hamburger) than the left (Home, The Residences, Gallery), causing asymmetry.
- Remove decorative lines
- Shorten labels: "Own in Mauritius" becomes "Ownership", "Book A Tour" becomes "Contact"
- Use `flex-1` containers on both sides for true centering
- Remove the always-visible hamburger on desktop (keep it mobile-only)

### 3. Add Hero Overlay Text
The 360° hero is currently a blank beige loading screen with no text. Add a cinematic text overlay with a welcome message and scroll indicator:
- "Welcome to Mont Choisy" in large serif
- "Oceanfront Living, Grand Baie, Mauritius" subtitle
- Animated scroll-down indicator
- Semi-transparent gradient at bottom for readability
- All `pointer-events-none` so panorama interaction works

### 4. Replace All Images with Mauritius-Specific Content
Every Unsplash image across all pages currently shows generic interiors. Replace with tropical luxury real estate imagery: oceanfront villas, tropical modern architecture, infinity pools overlooking the Indian Ocean, lush tropical gardens, and Mauritius coastal views.

### 5. Elevate Premium Feel
- Increase section spacing for more breathing room
- Add parallax scroll effects on key images
- Make stats numbers larger and more dramatic
- Improve the residence cards with hover overlays showing a brief description
- Add subtle background texture variations between sections

### 6. Make All Forms Fully Functional
The Contact form already saves to `contact_inquiries` in the database. Verify and ensure:
- Contact form works end-to-end (it does based on code review)
- Data Rights form saves to `data_rights_requests` (needs verification)
- Cookie consent logs to `consent_logs`
- All form submissions appear in the CRM admin panel
- Add a toast notification on successful submission

### 7. Sync French Translations
Ensure all new content added to `en.ts` is mirrored in `fr.ts` with proper French translations, including the hero overlay text, updated section labels, and any new copy.

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/ModeToggle.tsx` | **Delete** |
| `src/contexts/IntentContext.tsx` | **Delete** |
| `src/pages/IntentGateway.tsx` | **Delete** |
| `src/pages/Index.tsx` | Remove ModeToggle/IntentContext imports, remove toggle section, add hero overlay text, replace images, merge lifestyle+investment content, add parallax |
| `src/components/layout/Header.tsx` | Remove decorative lines, fix alignment, shorten labels, hide hamburger on desktop |
| `src/App.tsx` | Remove IntentProvider wrapper, remove `/welcome` route |
| `src/pages/Explore.tsx` | Remove ModeToggle import |
| `src/pages/OwnInMauritius.tsx` | Remove IntentContext usage |
| `src/pages/Gallery.tsx` | Replace images with Mauritius content |
| `src/pages/Residence.tsx` | Replace images |
| `src/pages/VirtualTour.tsx` | Replace images |
| `src/pages/Contact.tsx` | Replace hero image, verify form works |
| `src/pages/DataRights.tsx` | Verify form saves correctly |
| `src/i18n/locales/en.ts` | Add hero overlay translations, update content |
| `src/i18n/locales/fr.ts` | Full sync with English content |
| `src/index.css` | Minor refinements for premium spacing |

---

## Technical Details

- The database already has the necessary tables (`contact_inquiries`, `consent_logs`, `data_rights_requests`, `audit_logs`) with RLS policies allowing anonymous inserts
- The Contact form already inserts into `contact_inquiries` and logs consent -- this is functional
- The Admin CRM at `/admin` already queries all these tables and displays them in tabs
- Removing IntentContext is safe since it's only used in Index.tsx (one section), Explore.tsx (just the import), OwnInMauritius.tsx (unused variable), and ModeToggle.tsx (being deleted)
- The 360° PanoramaViewer uses React Three Fiber and already supports `showControls={false}` mode for the hero

