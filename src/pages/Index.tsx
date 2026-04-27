import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { OryamHeader } from '@/components/oryam/OryamHeader';
import { OryamFooter } from '@/components/oryam/OryamFooter';
import { ScrollProgress } from '@/components/oryam/ScrollProgress';
import { Reveal } from '@/components/oryam/Reveal';
import { RESIDENCES } from '@/data/residences';

import heroPool         from '@/assets/oryam/common/01-pool.jpg';
import poolLoungers     from '@/assets/oryam/common/02-pool-loungers.jpg';
import buildingShot     from '@/assets/oryam/common/03-building.jpg';
import gardenShot       from '@/assets/oryam/common/04-garden.jpg';
import entranceShot     from '@/assets/oryam/common/05-entrance.jpg';
import settingFlametrees from '@/assets/oryam/setting-flametrees.jpg';

const HERO_FACTS = [
  { num: '3',     label: 'Residences in the Collection' },
  { num: '€520k', label: 'Starting Price' },
  { num: 'IRS',   label: 'Residency Included' },
  { num: 'Now',   label: 'Ready to Move In' },
];


const KEY_NUMBERS = [
  { num: '3',     label: 'Residences in the collection' },
  { num: '15%',   label: 'Flat income tax in Mauritius' },
  { num: '€0',    label: 'Inheritance and capital gains tax' },
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
    title: 'Mont Choisy. The address that holds value.',
    body: 'Mont Choisy is one of the most protected and celebrated stretches of the north coast — a fifteen-minute walk to the beach, ten minutes to Grand Baie\'s restaurants. Quality property at this address rarely comes back to market.',
  },
  {
    n: '03',
    title: 'Ownership without restriction.',
    body: 'IRS classification gives non-Mauritian buyers identical property rights to locals. Freehold title. No ownership time limits. No restrictions on resale. You own it as completely as anything you own at home.',
  },
  {
    n: '04',
    title: 'An exit as strong as the entry.',
    body: 'Demand for quality residences in Mauritius consistently outpaces supply. Oryam owners who choose to sell benefit from a liquid international buyer market and an asset that has never compromised on quality.',
  },
];

export default function Index() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div id="top" className="bg-ivory text-ink">
      <ScrollProgress />
      <OryamHeader variant="over-dark" />

      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative w-full h-[100dvh] min-h-[640px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroPool}
            alt="The Oryam residences and infinity pool, Mont Choisy, Mauritius"
            data-slot="hero-bg"
            className="w-full h-full object-cover ken-burns"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(15,22,32,0.30) 0%, rgba(15,22,32,0.10) 35%, rgba(15,22,32,0.55) 78%, rgba(15,22,32,0.85) 100%)' }}
          />
        </div>

        <div className="relative z-10 h-full container-x flex flex-col justify-end pb-16 sm:pb-20 lg:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <Reveal><p className="eyebrow-light mb-6">ORYAM · MONT CHOISY · MAURITIUS</p></Reveal>
              <Reveal delay={0.12}>
                <h1 className="text-display text-ivory mb-8">
                  A quieter way<br />to own Mauritius.
                </h1>
              </Reveal>
              <Reveal delay={0.24}>
                <p className="text-ivory/80 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
                  A private collection of three residences in Mont Choisy, Grand Baie.
                  Furnished, freehold, IRS-eligible — with Mauritian residency from €500,000.
                </p>
              </Reveal>
              <Reveal delay={0.36}>
                <div className="flex flex-wrap items-center gap-4">
                  <a href="#residences" className="btn-primary" style={{ background: '#A88842', borderColor: '#A88842' }}>
                    View the Residences <span aria-hidden>→</span>
                  </a>
                  <a href="#intro" className="btn-ghost-light">↓ &nbsp; The story</a>
                </div>
              </Reveal>
            </div>

            <div className="hidden lg:block lg:col-span-4">
              <Reveal delay={0.5}>
                <div className="bg-ivory/8 backdrop-blur-md border border-ivory/20 px-7 py-6">
                  {HERO_FACTS.map((f, i) => (
                    <div
                      key={f.label}
                      className={'flex items-baseline justify-between py-3 ' + (i !== HERO_FACTS.length - 1 ? 'border-b border-ivory/15' : '')}
                    >
                      <span className="font-serif italic text-ivory text-[28px] leading-none" style={{ fontWeight: 300 }}>{f.num}</span>
                      <span className="text-[10px] tracking-[0.28em] uppercase text-ivory/65 ml-6 text-right">{f.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. INTRO ────────────────────────────────────────── */}
      <section id="intro" className="bg-ivory section-pad">
        <div className="container-x">
          <div className="max-w-[680px] mx-auto text-center">
            <Reveal><p className="eyebrow mb-8">THE PROPERTY</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 text-ink mb-10">
                Not a development.<br />A private address.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-ink-soft text-base sm:text-lg leading-[1.85]">
                Oryam is a collection of just three apartments in Mont Choisy — one of the most coveted neighbourhoods on the north coast of Mauritius. Each residence is complete, furnished to specification, and immediately available. There are no more being built. There is no waiting list. There are simply three exceptional homes, in the right place, with your name on one of them.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-14 flex justify-center">
                <div className="w-px h-16 bg-gold/40" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 3. THE RESIDENCES ───────────────────────────────── */}
      <section id="residences" className="bg-bone section-pad">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16 lg:mb-20">
            <div className="lg:col-span-7">
              <Reveal><p className="eyebrow mb-6">THE RESIDENCES</p></Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-h1 text-ink">
                  Three exceptional homes.<br />One quiet address.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="lg:col-span-5 lg:pt-4">
              <p className="text-ink-soft text-base sm:text-lg leading-[1.85]">
                Each Oryam residence is fully furnished and available under Mauritius's IRS scheme — granting full ownership and a Resident Permit for you and your family upon purchase.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-8">
            {RESIDENCES.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.12} className="flex">
                <Link
                  to={`/residences/${r.slug}`}
                  className="group flex flex-col w-full bg-ivory"
                >
                  <div className={r.featured ? 'border-t-2 border-gold relative' : 'border-t border-hair relative'}>
                    {r.featured && (
                      <span className="absolute -top-3 left-6 bg-gold text-ivory text-[10px] tracking-[0.24em] uppercase font-medium px-3 py-1.5">
                        Most Sought After
                      </span>
                    )}
                    <div className="overflow-hidden aspect-[4/5] relative">
                      <img
                        src={r.cover}
                        alt={`${r.name} — ${r.spec}`}
                        className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
                      <span className="absolute bottom-5 left-5 right-5 text-ivory text-[10px] tracking-[0.28em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        Explore the residence →
                      </span>
                    </div>
                    <div className="p-7">
                      <p className="eyebrow mb-3">{r.type}</p>
                      <h3 className="text-h3 text-ink mb-3">{r.name}</h3>
                      <p className="text-[11px] tracking-[0.2em] uppercase text-ink-mute mb-5">{r.spec}</p>
                      <p className="text-ink-soft text-[15px] leading-[1.75] mb-6 min-h-[120px]">{r.blurb}</p>

                      <div className="flex flex-wrap gap-2 mb-7">
                        {['IRS Eligible', 'Rental Programme', 'Move-In Ready'].map(t => (
                          <span key={t} className="text-[10px] tracking-[0.18em] uppercase text-gold-deep border border-gold/40 px-3 py-1.5">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-hair pt-5">
                        <span className="font-serif italic text-[22px] text-ink" style={{ fontWeight: 400 }}>{r.price}</span>
                        <span className="text-gold-deep text-[11px] tracking-[0.24em] uppercase font-medium group-hover:text-ink transition-colors inline-flex items-center gap-2">
                          View &amp; 360° <span aria-hidden>→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

                    <div className="flex items-center justify-between border-t border-hair pt-5">
                      <span className="font-serif italic text-[22px] text-ink" style={{ fontWeight: 400 }}>{r.price}</span>
                      <a
                        href="#contact"
                        className="text-gold-deep text-[11px] tracking-[0.24em] uppercase font-medium hover:text-ink transition-colors inline-flex items-center gap-2"
                      >
                        Enquire <span aria-hidden>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. KEY NUMBERS BAR ──────────────────────────────── */}
      <section className="bg-night section-pad">
        <div className="container-x">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {KEY_NUMBERS.map((k, i) => (
              <Reveal
                key={k.label}
                delay={i * 0.1}
                className={
                  'px-6 py-8 text-center ' +
                  (i % 2 === 1 ? 'border-l border-ivory/15 ' : '') +
                  (i >= 2 ? 'border-t border-ivory/15 lg:border-t-0 ' : '') +
                  (i !== 0 && i !== 2 ? 'lg:border-l lg:border-ivory/15 ' : '') +
                  (i === 2 ? 'lg:border-l lg:border-ivory/15 ' : '')
                }
              >
                <div className="text-num text-gold mb-3">{k.num}</div>
                <div className="text-ivory/60 text-[12px] sm:text-[13px] leading-relaxed max-w-[220px] mx-auto">{k.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. OWNERSHIP ────────────────────────────────────── */}
      <section id="ownership" className="bg-ivory section-pad">
        <div className="container-x">
          <div className="max-w-3xl mb-16 lg:mb-20">
            <Reveal><p className="eyebrow mb-6">OWNERSHIP AT ORYAM</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 text-ink">
                You own it. You live in it.<br />It works for you.
              </h2>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
            <Reveal>
              <div className="w-12 h-px bg-gold mb-7" />
              <p className="eyebrow mb-5">MAURITIUS IRS SCHEME</p>
              <h3 className="text-h2 text-ink mb-7">Your purchase comes with a residency permit.</h3>
              <p className="text-ink-soft text-[15px] leading-[1.85] mb-5">
                Every Oryam residence is classified under Mauritius's Integrated Resort Scheme (IRS). When you complete your purchase, you and your entire family automatically receive a Mauritian Resident Permit — with no quota, no lengthy process, no uncertainty.
              </p>
              <p className="text-ink-soft text-[15px] leading-[1.85] mb-8">
                You gain the legal right to live, work, and retire in one of the world's most politically stable and tax-efficient nations. 15% flat income tax. No inheritance tax. No capital gains tax. Full freehold ownership — the same rights as a Mauritian citizen.
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Included with every residence</p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="w-12 h-px bg-gold mb-7" />
              <p className="eyebrow mb-5">MANAGED RENTAL PROGRAMME</p>
              <h3 className="text-h2 text-ink mb-7">When you're not here, your apartment earns.</h3>
              <p className="text-ink-soft text-[15px] leading-[1.85] mb-5">
                Our fully managed rental programme means your residence is never idle. When you are not in residence, we handle everything — marketing, bookings, guest management, housekeeping, and maintenance — and deposit rental income directly to your account.
              </p>
              <p className="text-ink-soft text-[15px] leading-[1.85] mb-8">
                You block the dates you want the apartment to yourself. We handle the rest. Many owners find the programme covers their carrying costs entirely. It is the most intelligent way to own a second home anywhere in the world.
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Fully managed · Zero landlord effort</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 6. THE BUILDING & GROUNDS ────────────────────────── */}
      <section className="bg-ivory section-pad">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12 lg:mb-16">
            <div className="lg:col-span-6">
              <Reveal><p className="eyebrow mb-5">THE BUILDING &amp; GROUNDS</p></Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-h1 text-ink">
                  A quiet building.<br />A garden you walk into.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="lg:col-span-6 lg:pt-4">
              <p className="text-ink-soft text-base sm:text-lg leading-[1.85]">
                Two low blocks set in landscaped gardens of mature flame trees and palms.
                A residents-only pool, secure parking, and a single private entrance.
                Designed to feel like a home, not a complex.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            <Reveal className="col-span-12 md:col-span-8">
              <div className="aspect-[16/10] overflow-hidden group">
                <img src={poolLoungers} alt="Residents' pool with sun loungers and tropical garden"
                     className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="col-span-12 md:col-span-4">
              <div className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden group">
                <img src={buildingShot} alt="The Oryam building exterior"
                     className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" />
              </div>
            </Reveal>
            <Reveal delay={0.15} className="col-span-6 md:col-span-4">
              <div className="aspect-[4/3] overflow-hidden group">
                <img src={gardenShot} alt="Landscaped gardens at Oryam"
                     className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="col-span-6 md:col-span-8">
              <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden group">
                <img src={entranceShot} alt="Entrance and architecture"
                     className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 7. WHY ORYAM ────────────────────────────────────── */}
      <section id="why" className="bg-bone section-pad">
        <div className="container-x">
          <div className="max-w-3xl mb-16 lg:mb-20">
            <Reveal><p className="eyebrow mb-6">WHY ORYAM</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 text-ink">
                Four reasons this is the most<br />intelligent second home you can own.
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-14 lg:gap-y-20">
            {REASONS.map((r, i) => (
              <Reveal key={r.n} delay={(i % 2) * 0.12}>
                <div className="text-num text-gold mb-5">{r.n}</div>
                <h3 className="text-h3 text-ink mb-5">{r.title}</h3>
                <p className="text-ink-soft text-[15px] leading-[1.85] max-w-md">{r.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. THE SETTING ──────────────────────────────────── */}
      <section className="relative w-full min-h-[80dvh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={settingFlametrees}
            alt="Flame trees in bloom at the entrance to the Oryam residences"
            data-slot="setting-bg"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(15,22,32,0.45) 0%, rgba(15,22,32,0.65) 100%)' }} />
        </div>
        <div className="relative z-10 container-x py-24 lg:py-32 text-center">
          <Reveal><p className="eyebrow-light mb-7">THE SETTING</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-h1 text-ivory mb-10 max-w-3xl mx-auto">
              Mont Choisy. Grand Baie.<br />Northern Mauritius.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ivory/80 text-base sm:text-lg leading-[1.85] max-w-[560px] mx-auto">
              300 days of sunshine. A protected turquoise lagoon a short walk away. Ten minutes from Grand Baie's restaurants and marina. 45 minutes from the international airport, with direct connections to Paris, London, Frankfurt and Zurich. The location is exceptional. That is precisely why these are the last three available.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── 9. CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="bg-ivory section-pad">
        <div className="container-x">
          <Reveal><p className="eyebrow mb-6">PRIVATE ENQUIRY</p></Reveal>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <Reveal delay={0.08}>
                <h2 className="text-h1 text-ink mb-8">
                  Three residences.<br />No open days.<br />By appointment only.
                </h2>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-ink-soft text-[15px] leading-[1.85] mb-12 max-w-md">
                  Oryam is not a development. We do not hold open days or distribute brochures on request. Every conversation is private, personal, and focused entirely on what you are looking for. A member of our team will respond within 24 hours to arrange a call at your convenience.
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <dl className="space-y-0 max-w-md">
                  {[
                    ['RESPONSE TIME',   'Within 24 hours, always'],
                    ['CONFIDENTIALITY', 'All enquiries are strictly private'],
                    ['LOCATION',        'Mont Choisy, Grand Baie, Mauritius'],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[150px_1fr] gap-6 items-baseline border-t border-hair py-5">
                      <dt className="text-[10px] tracking-[0.3em] uppercase text-gold">{k}</dt>
                      <dd className="text-ink-soft text-[14px]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal delay={0.18}>
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
                      ? { background: '#1F4D3A', borderColor: '#1F4D3A', color: '#F8F4EC' }
                      : { background: '#A88842', borderColor: '#A88842', color: '#F8F4EC' }
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
