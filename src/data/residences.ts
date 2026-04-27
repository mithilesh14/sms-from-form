// ─── Oryam — three apartment layouts (B-11, B-22, Penthouse), multiple units of each ─
// One source of truth for the home grid and the detail pages.


import b11_01 from '@/assets/oryam/b11/01-living-pano.jpg';
import b11_02 from '@/assets/oryam/b11/02-kitchen.jpg';
import b11_03 from '@/assets/oryam/b11/03-dining.jpg';
import b11_04 from '@/assets/oryam/b11/04-bedroom.jpg';
import b11_05 from '@/assets/oryam/b11/05-bathroom.jpg';
import b11_06 from '@/assets/oryam/b11/06-terrace.jpg';
import b11_07 from '@/assets/oryam/b11/07-view-pano.jpg';
import b11_08 from '@/assets/oryam/b11/08-detail.jpg';

import b22_01 from '@/assets/oryam/b22/01-living-pano.jpg';
import b22_02 from '@/assets/oryam/b22/02-kitchen.jpg';
import b22_03 from '@/assets/oryam/b22/03-dining.jpg';
import b22_04 from '@/assets/oryam/b22/04-bedroom.jpg';
import b22_05 from '@/assets/oryam/b22/05-bathroom.jpg';
import b22_06 from '@/assets/oryam/b22/06-second-bedroom.jpg';
import b22_07 from '@/assets/oryam/b22/07-terrace-pano.jpg';
import b22_08 from '@/assets/oryam/b22/08-view-pano.jpg';

import ph_01 from '@/assets/oryam/penthouse/01-living.jpg';
import ph_02 from '@/assets/oryam/penthouse/02-living-wide.jpg';
import ph_03 from '@/assets/oryam/penthouse/03-kitchen-pano.jpg';
import ph_04 from '@/assets/oryam/penthouse/04-bedroom.jpg';
import ph_05 from '@/assets/oryam/penthouse/05-bathroom.jpg';
import ph_06 from '@/assets/oryam/penthouse/06-terrace-pano.jpg';
import ph_07 from '@/assets/oryam/penthouse/07-rooftop.jpg';
import ph_08 from '@/assets/oryam/penthouse/08-detail.jpg';

export interface Residence {
  slug: 'b11' | 'b22' | 'penthouse';
  type: string;          // small label
  name: string;          // display name
  tagline: string;       // sub-headline used on detail page
  spec: string;          // bed/bath/m²
  beds: number;
  baths: number;
  area: number;          // m²
  price: string;
  description: string;   // long-form, for detail page
  blurb: string;         // short, for home grid
  featured?: boolean;
  cover: string;
  gallery: { src: string; caption: string }[];
}

export const RESIDENCES: Residence[] = [
  {
    slug: 'b11',
    type: 'Apartment B-11',
    name: 'The Coral',
    tagline: 'A bright two-bedroom on the garden side.',
    spec: '2 Bedrooms · 2 Bathrooms · 110 m²',
    beds: 2,
    baths: 2,
    area: 110,
    price: 'From €520,000',
    blurb:
      'A bright two-bedroom apartment with open-plan living, oak joinery and a private terrace overlooking the gardens. Steps from the residents\' pool, moments from Mont Choisy beach.',
    description:
      'Apartment B-11 is the most sought-after of the two-bedroom layouts. Open-plan living and dining flow onto a private terrace facing the gardens, with the residents\' pool a short walk away. Oak joinery in the kitchen, full-height sliding doors, and an architectural simplicity that lets the light do the work. Delivered fully fitted — kitchen, bathrooms and built-in wardrobes complete — and ready for you to furnish to your own taste.',
    cover: b11_01,
    gallery: [
      { src: b11_01, caption: 'Open-plan living and dining' },
      { src: b11_02, caption: 'Kitchen with oak joinery and Sharp / Electrolux appliances' },
      { src: b11_03, caption: 'Dining area opening to the terrace' },
      { src: b11_04, caption: 'Master bedroom with garden view' },
      { src: b11_05, caption: 'Master bathroom in stone and oak' },
      { src: b11_06, caption: 'Private terrace overlooking the gardens' },
      { src: b11_07, caption: 'Garden and tree-line view from the terrace' },
      { src: b11_08, caption: 'Material detail — oak, stone, brushed steel' },
    ],
  },
  {
    slug: 'b22',
    type: 'Apartment B-22',
    name: 'The Indigo',
    tagline: 'Three bedrooms, full chef\'s kitchen, wraparound terrace.',
    spec: '3 Bedrooms · 3 Bathrooms · 155 m²',
    beds: 3,
    baths: 3,
    area: 155,
    price: 'From €720,000',
    blurb:
      'Three generous bedrooms, a full chef\'s kitchen, and a wraparound terrace catching the trade winds. The most considered family layout in the building.',
    description:
      'Apartment B-22 is the most generous of the standard floors. Three full bedrooms — each with its own bathroom — sit either side of an open living and dining space that gives directly onto a wraparound terrace catching the prevailing trade winds. The kitchen is full-height, fully fitted, and built around a central island. The proportions feel less like an apartment and more like a single-storey home, lifted into the canopy of the flame trees.',
    cover: b22_01,
    gallery: [
      { src: b22_01, caption: 'Living and dining — wide-angle view' },
      { src: b22_02, caption: 'Full chef\'s kitchen with central island' },
      { src: b22_03, caption: 'Dining beside the terrace doors' },
      { src: b22_04, caption: 'Master bedroom' },
      { src: b22_05, caption: 'Master en-suite' },
      { src: b22_06, caption: 'Second bedroom' },
      { src: b22_07, caption: 'Wraparound terrace — panoramic view' },
      { src: b22_08, caption: 'Outlook over the gardens and flame trees' },
    ],
  },
  {
    slug: 'penthouse',
    type: 'The Penthouse · A',
    name: 'The Horizon',
    tagline: 'The entire top floor. One residence. Limited in every sense.',
    spec: '4 Bedrooms · 4 Bathrooms · 220 m²',
    beds: 4,
    baths: 4,
    area: 220,
    price: 'From €980,000',
    featured: true,
    blurb:
      'The entire top floor. A 100 m² rooftop terrace, ocean glimpses across the rooftops, and a level of finish that has no equal in the building.',
    description:
      'The Penthouse occupies the entire upper level of Block A. Four bedrooms, four bathrooms, a double-height living space, and a 100 m² wraparound terrace that wraps the building from north to west — catching sunrise over the gardens and sunset across the rooftops toward the lagoon. There is no second penthouse. There is no equivalent in the building. It is the residence the architect designed last and held back.',
    cover: ph_02,
    gallery: [
      { src: ph_02, caption: 'Living room — full ceiling height' },
      { src: ph_01, caption: 'Living and dining — sliding glass to the terrace' },
      { src: ph_03, caption: 'Open kitchen — panoramic view' },
      { src: ph_04, caption: 'Master bedroom suite' },
      { src: ph_05, caption: 'Penthouse bathroom in travertine' },
      { src: ph_06, caption: 'Wraparound terrace — flame tree canopy' },
      { src: ph_07, caption: 'Upper terrace — ocean glimpses across the rooftops' },
      { src: ph_08, caption: 'Architectural detail' },
    ],
  },
];

export const findResidence = (slug: string) =>
  RESIDENCES.find(r => r.slug === slug);
