import { useState, FormEvent } from 'react';
import { OryamHeader } from '@/components/oryam/OryamHeader';
import { OryamFooter } from '@/components/oryam/OryamFooter';
import { ScrollProgress } from '@/components/oryam/ScrollProgress';
import { Reveal } from '@/components/oryam/Reveal';

const HERO_IMG     = 'https://images.unsplash.com/photo-1540541338537-1220059be25b?w=2000&q=85';
const SETTING_IMG  = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&q=85';
const CARD_CORAL   = 'https://images.unsplash.com/photo-1618219740975-d40978bb7378?w=1400&q=85';
const CARD_INDIGO  = 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1400&q=85';
const CARD_HORIZON = 'https://images.unsplash.com/photo-1564540583246-934409427776?w=1400&q=85';

const HERO_FACTS = [
  { num: '3',     label: 'Only Three Residences' },
  { num: '€500k', label: 'Starting Price' },
  { num: 'IRS',   label: 'Residency Included' },
  { num: 'Now',   label: 'Ready to Move In' },
];

const RESIDENCES = [
  {
    slot: 'card-coral',
    image: CARD_CORAL,
    type: 'Residence One',
    name: 'The Coral',
    spec: '2 Bedrooms · 2 Bathrooms · 110 m²',
    desc: 'An elegant two-bedroom apartment opening directly onto the lagoon. Wraparound terrace, open-plan living, premium stone finishes. Shared infinity pool and private beach access.',
    price: 'From €520,000',
    featured: false,
  },
  {
    slot: 'card-indigo',
    image: CARD_INDIGO,
    type: 'Residence Two',
    name: 'The Indigo',
    spec: '3 Bedrooms · 3 Bathrooms · 155 m²',
    desc: 'Three bedrooms, each with ocean or garden outlook. Floor-to-ceiling glass opens onto a private terrace with plunge pool. For those who do not compromise on space, light, or the quality of silence.',
    price: 'From €720,000',
    featured: true,
  },
  {
    slot: 'card-horizon',
    image: CARD_HORIZON,
    type: 'The Penthouse',
    name: 'The Horizon',
    spec: '4 Bedrooms · 4 Bathrooms · 220 m²',
    desc: 'The entire top floor. Panoramic Indian Ocean views from every room. Rooftop terrace with private pool. A level of finish that has no equal on the island. One residence. Limited in every sense.',
    price: 'From €980,000',
    featured: false,
  },
];

const KEY_NUMBERS = [
  { num: '3',     label: 'Residences in the collection' },
  { num: '15%',   label: 'Flat income tax in Mauritius' },
  { num: '€0',    label: 'Inheritance tax. Zero capital gains tax.' },
  { num: '12 hr', label: 'Direct flight from major European cities' },
];

const REASONS = [
  {
    n: '01',
    title: 'Ready now. No off-plan risk.',
    body: 'Every residence is complete, furnished, and available for immediate occupation. No construction delays. No developer risk. You sign, you receive keys, you arrive. It is that straightforward.',
  },
  {
    n: '02',
    title: 'Beachfront that cannot be recreated.',
    body: 'Mont Choisy is one of the most protected and celebrated beaches on the north coast of Mauritius. This type of direct beachfront ownership with international property rights at this price point does not come up again once it is gone.',
  },
  {
    n: '03',
    title: 'Ownership without restriction.',
    body: 'IRS classification gives non-Mauritian buyers identical property rights to locals. Freehold title. No ownership time limits. No restrictions on resale. You own it as completely as anything you own at home.',
  },
  {
    n: '04',
    title: 'An exit as strong as the entry.',
    body: 'Demand for quality beachfront property in Mauritius consistently outpaces supply. Oryam owners who choose to sell benefit from a liquid international buyer market and an asset that has never compromised on quality.',
  },
];

export default function Index() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="top" className="bg-ocean text-cream">
      <ScrollProgress />
      <OryamHeader />

      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative w-full h-[100dvh] min-h-[640px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Aerial view of the turquoise lagoon at Mont Choisy, Mauritius"
            data-slot="hero-bg"
            className="w-full h-full object-cover ken-burns"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(11,23,36,0.85) 0%, rgba(11,23,36,0.45) 45%, rgba(11,23,36,0.15) 100%)' }}
          />
        </div>

        {/* Bottom-left content */}
        <div className="relative z-10 h-full container-x flex flex-col justify-end pb-16 sm:pb-20 lg:pb-28">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow mb-6">ORYAM · MONT CHOISY · MAURITIUS</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="text-display text-cream mb-8">
                Where the Indian Ocean<br />
                becomes your address.
              </h1>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="text-cream/70 text-base sm:text-lg max-w-lg mb-10 leading-relaxed">
                Three beachfront residences. Ready to move in.<br />
                IRS status — full ownership and Mauritian residency from €500,000.
              </p>
            </Reveal>
            <Reveal delay={0.36}>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#residences" className="btn-gold">
                  View the Residences <span aria-hidden>→</span>
                </a>
                <a href="#intro" className="btn-ghost-light group">
                  <span className="inline-block w-6 h-px bg-cream/60 group-hover:bg-gold mr-1 transition-colors" />
                  The story
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom-right facts (desktop only) */}
        <div className="hidden lg:block absolute right-12 bottom-28 z-10">
          <div className="flex flex-col">
            {HERO_FACTS.map((f, i) => (
              <Reveal
                key={f.label}
                delay={0.5 + i * 0.1}
                className={'py-5 ' + (i !== HERO_FACTS.length - 1 ? 'border-b border-gold/30' : '')}
              >
                <div className="text-num text-cream leading-none">{f.num}</div>
                <div className="eyebrow mt-2">{f.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. INTRO ────────────────────────────────────────── */}
      <section id="intro" className="bg-ocean section-pad border-t border-gold/20">
        <div className="container-x">
          <div className="max-w-[640px] mx-auto text-center">
            <Reveal><p className="eyebrow mb-8">THE PROPERTY</p></Reveal>
            <Reveal delay={0.12}>
              <h2 className="text-h2 text-cream mb-10">
                Not a development.<br />A private address.
              </h2>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="text-cream/65 text-base sm:text-lg leading-[1.8]">
                Oryam is a collection of just three beachfront apartments at Mont Choisy — one of the most coveted stretches of coastline in the north of Mauritius. Each residence is complete, furnished to specification, and immediately available. There are no more being built. There is no waiting list. There are simply three exceptional homes, on the Indian Ocean, with your name on one of them.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 3. THE RESIDENCES ───────────────────────────────── */}
      <section id="residences" className="bg-sand text-ocean section-pad border-t border-gold/20">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 lg:mb-20">
            <div>
              <Reveal><p className="eyebrow mb-6">THE RESIDENCES</p></Reveal>
              <Reveal delay={0.12}>
                <h2 className="text-h2 text-ocean">
                  Three exceptional homes.<br />One extraordinary address.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.24} className="lg:pt-4">
              <p className="text-ocean/70 text-base sm:text-lg leading-[1.8] max-w-lg">
                Each Oryam residence is beachfront, fully furnished, and available under Mauritius's IRS scheme — granting full ownership and a Resident Permit for you and your family upon purchase.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-8">
            {RESIDENCES.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.12} className="flex flex-col">
                <div className={r.featured ? 'border-t border-gold pt-6 relative' : 'pt-6 relative'}>
                  {r.featured && (
                    <span className="absolute -top-3 left-0 bg-gold text-ocean text-[10px] tracking-[0.24em] uppercase font-medium px-3 py-1.5">
                      Most Sought After
                    </span>
                  )}
                  <div className="overflow-hidden mb-7 aspect-[4/5]">
                    <img
                      src={r.image}
                      alt={`${r.name} — ${r.spec}`}
                      data-slot={r.slot}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                    />
                  </div>
                  <p className="eyebrow mb-3">{r.type}</p>
                  <h3 className="text-h3 text-ocean mb-3">{r.name}</h3>
                  <p className="text-[12px] tracking-[0.18em] uppercase text-ocean/55 mb-5">{r.spec}</p>
                  <p className="text-ocean/70 text-[15px] leading-[1.75] mb-6">{r.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-7">
                    {['IRS Eligible', 'Rental Programme', 'Move-In Ready'].map(t => (
                      <span key={t} className="text-[10px] tracking-[0.18em] uppercase text-gold border border-gold/40 px-3 py-1.5">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-gold/30 pt-5 mt-auto">
                    <span className="text-h3 text-ocean">{r.price}</span>
                    <a
                      href="#contact"
                      className="text-coral text-[12px] tracking-[0.24em] uppercase font-normal hover:text-ocean transition-colors inline-flex items-center gap-2"
                    >
                      Enquire <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. KEY NUMBERS BAR ──────────────────────────────── */}
      <section className="bg-ocean section-pad border-t border-gold/20">
        <div className="container-x">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {KEY_NUMBERS.map((k, i) => (
              <Reveal
                key={k.label}
                delay={i * 0.1}
                className={
                  'px-6 py-8 text-center ' +
                  (i !== 0 ? 'lg:border-l border-gold/30 ' : '') +
                  (i % 2 === 1 ? 'border-l border-gold/30 lg:border-l ' : '')
                }
              >
                <div className="text-num text-gold mb-3">{k.num}</div>
                <div className="text-cream/60 text-[12px] sm:text-[13px] leading-relaxed max-w-[220px] mx-auto">{k.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. OWNERSHIP ────────────────────────────────────── */}
      <section id="ownership" className="bg-ocean section-pad border-t border-gold/20">
        <div className="container-x">
          <div className="max-w-3xl mb-16 lg:mb-20">
            <Reveal><p className="eyebrow mb-6">OWNERSHIP AT ORYAM</p></Reveal>
            <Reveal delay={0.12}>
              <h2 className="text-h2 text-cream">
                You own it. You live in it.<br />It works for you.
              </h2>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
            {/* IRS */}
            <Reveal>
              <div className="w-12 h-px bg-gold mb-7" />
              <p className="eyebrow mb-5">MAURITIUS IRS SCHEME</p>
              <h3 className="text-h3 text-cream mb-7">Your purchase comes with a residency permit.</h3>
              <p className="text-cream/65 text-[15px] leading-[1.85] mb-5">
                Every Oryam residence is classified under Mauritius's Integrated Resort Scheme (IRS). When you complete your purchase, you and your entire family automatically receive a Mauritian Resident Permit — with no quota, no lengthy process, no uncertainty.
              </p>
              <p className="text-cream/65 text-[15px] leading-[1.85] mb-8">
                You gain the legal right to live, work, and retire in one of the world's most politically stable and tax-efficient nations. 15% flat income tax. No inheritance tax. No capital gains tax. Full freehold ownership — the same rights as a Mauritian citizen.
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Included with every residence</p>
            </Reveal>

            {/* Rental */}
            <Reveal delay={0.18}>
              <div className="w-12 h-px bg-gold mb-7" />
              <p className="eyebrow mb-5">MANAGED RENTAL PROGRAMME</p>
              <h3 className="text-h3 text-cream mb-7">When you're not here, your apartment earns.</h3>
              <p className="text-cream/65 text-[15px] leading-[1.85] mb-5">
                Our fully managed rental programme means your residence is never idle. When you are not in residence, we handle everything — marketing, bookings, guest management, housekeeping, and maintenance — and deposit rental income directly to your account.
              </p>
              <p className="text-cream/65 text-[15px] leading-[1.85] mb-8">
                You block the dates you want the apartment to yourself. We handle the rest. Many owners find the programme covers their carrying costs entirely. It is the most intelligent way to own a second home anywhere in the world.
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Fully managed · Zero landlord effort</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 6. WHY ORYAM ────────────────────────────────────── */}
      <section id="why" className="bg-sand text-ocean section-pad border-t border-gold/20">
        <div className="container-x">
          <div className="max-w-3xl mb-16 lg:mb-20">
            <Reveal><p className="eyebrow mb-6">WHY ORYAM</p></Reveal>
            <Reveal delay={0.12}>
              <h2 className="text-h2 text-ocean">
                Four reasons this is the most<br />intelligent second home you can own.
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-14 lg:gap-y-20">
            {REASONS.map((r, i) => (
              <Reveal key={r.n} delay={(i % 2) * 0.12}>
                <div className="text-num text-gold mb-5">{r.n}</div>
                <h3 className="text-h3 text-ocean mb-5">{r.title}</h3>
                <p className="text-ocean/70 text-[15px] leading-[1.85] max-w-md">{r.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. THE SETTING ──────────────────────────────────── */}
      <section className="relative w-full min-h-[80dvh] flex items-center overflow-hidden border-t border-gold/20">
        <div className="absolute inset-0">
          <img
            src={SETTING_IMG}
            alt="Golden hour over Mont Choisy beach"
            data-slot="setting-bg"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ocean/65" />
        </div>
        <div className="relative z-10 container-x py-24 lg:py-32 text-center">
          <Reveal><p className="eyebrow mb-7">THE SETTING</p></Reveal>
          <Reveal delay={0.12}>
            <h2 className="text-h2 text-cream mb-10 max-w-3xl mx-auto">
              Mont Choisy. Grand Baie.<br />Northern Mauritius.
            </h2>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="text-cream/75 text-base sm:text-lg leading-[1.85] max-w-[520px] mx-auto">
              300 days of sunshine. A protected turquoise lagoon. 15 minutes from Grand Baie's restaurants and marina. 45 minutes from the international airport, with direct connections to Paris, London, Frankfurt, and Zurich. The location is exceptional. That is precisely why these are the last three available.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── 8. CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="bg-ocean section-pad border-t border-gold/20">
        <div className="container-x">
          <Reveal><p className="eyebrow mb-6">PRIVATE ENQUIRY</p></Reveal>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <Reveal delay={0.1}>
                <h2 className="text-h2 text-cream mb-8">
                  Three residences.<br />No open days.<br />By appointment only.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-cream/65 text-[15px] leading-[1.85] mb-12 max-w-md">
                  Oryam is not a development. We do not hold open days or distribute brochures on request. Every conversation is private, personal, and focused entirely on what you are looking for. A member of our team will respond within 24 hours to arrange a call at your convenience.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <dl className="space-y-5 max-w-md">
                  {[
                    ['RESPONSE TIME',   'Within 24 hours, always'],
                    ['CONFIDENTIALITY', 'All enquiries are strictly private'],
                    ['LOCATION',        'Mont Choisy, Grand Baie, Mauritius'],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[140px_1fr] gap-6 items-baseline border-t border-gold/20 pt-5">
                      <dt className="text-[10px] tracking-[0.3em] uppercase text-gold">{k}</dt>
                      <dd className="text-cream/70 text-[14px]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <form onSubmit={onSubmit} className="space-y-9">
                <div className="field">
                  <label htmlFor="name">Your Name</label>
                  <input id="name" name="name" type="text" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Which residence interests you? Any questions about IRS, the rental programme, or the purchase process?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="inline-flex items-center justify-center gap-2 px-9 py-4 text-[12px] tracking-[0.24em] uppercase font-normal border transition-all duration-500"
                  style={
                    submitted
                      ? { background: '#1F4D3A', borderColor: '#1F4D3A', color: '#F8F3EC' }
                      : { background: '#A8883A', borderColor: '#A8883A', color: '#0B1724' }
                  }
                >
                  {submitted ? <>Enquiry Received <span aria-hidden>✓</span></> : <>Send Enquiry <span aria-hidden>→</span></>}
                </button>

                <p className="text-[10px] tracking-[0.3em] uppercase text-gold pt-2">
                  We respond within 24 hours · Strictly confidential
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <OryamFooter />
    </div>
  );
}
