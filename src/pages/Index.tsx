import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OryamHeader } from '@/components/oryam/OryamHeader';
import { OryamFooter } from '@/components/oryam/OryamFooter';
import { ScrollProgress } from '@/components/oryam/ScrollProgress';
import { Reveal } from '@/components/oryam/Reveal';
import { RESIDENCES } from '@/data/residences';

import heroPool         from '@/assets/oryam/hero-pool.webp';
import poolLoungers     from '@/assets/oryam/common/02-pool-loungers.webp';
import buildingShot     from '@/assets/oryam/common/03-building.webp';
import gardenShot       from '@/assets/oryam/common/04-garden.webp';
import entranceShot     from '@/assets/oryam/common/05-entrance.webp';
import settingFlametrees from '@/assets/oryam/setting-flametrees.webp';



export default function Index() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSubmitted(true); };

  const HERO_FACTS = [
    { num: '3',     label: t('oryam.hero.facts.residences') },
    { num: '€520k', label: t('oryam.hero.facts.starting') },
    { num: 'IRS',   label: t('oryam.hero.facts.residency') },
    { num: t('oryam.hero.facts.ready') === 'Prêt à Habiter' ? 'Maintenant' : 'Now', label: t('oryam.hero.facts.ready') },
  ];
  const KEY_NUMBERS_I18N = [
    { num: '3',     label: t('oryam.keyNumbers.n1') },
    { num: '15%',   label: t('oryam.keyNumbers.n2') },
    { num: '€0',    label: t('oryam.keyNumbers.n3') },
    { num: '12 hr', label: t('oryam.keyNumbers.n4') },
  ];
  const REASONS_I18N = [
    { n: '01', title: t('oryam.why.r1.title'), body: t('oryam.why.r1.body') },
    { n: '02', title: t('oryam.why.r2.title'), body: t('oryam.why.r2.body') },
    { n: '03', title: t('oryam.why.r3.title'), body: t('oryam.why.r3.body') },
    { n: '04', title: t('oryam.why.r4.title'), body: t('oryam.why.r4.body') },
  ];


  return (
    <div id="top" className="bg-ivory text-ink">
      <ScrollProgress />
      <OryamHeader variant="over-dark" />

      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative w-full h-[100dvh] min-h-[640px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroPool}
            alt="The Oryam residences and infinity pool, Trou aux Biches, Mauritius"
            data-slot="hero-bg"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover ken-burns"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(11,23,36,0.65) 0%, rgba(11,23,36,0.35) 28%, rgba(11,23,36,0.20) 50%, rgba(11,23,36,0.60) 78%, rgba(11,23,36,0.92) 100%)' }}
          />
        </div>

        <div className="relative z-10 h-full px-6 sm:px-10 lg:px-16 flex flex-col justify-end pb-16 sm:pb-20 lg:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7 xl:col-span-6">
              <Reveal>
                <p className="eyebrow-light inline-flex items-center gap-4 mb-7" style={{ textShadow: '0 1px 12px hsl(var(--night) / 0.55)' }}>
                  <span aria-hidden className="block w-10 h-px bg-gold" />
                  {t('oryam.hero.eyebrow')}
                </p>

                <h1
                  className="text-display text-ivory mb-8"
                  style={{ textShadow: '0 1px 2px hsl(var(--night) / 0.45), 0 2px 24px hsl(var(--night) / 0.55)' }}
                >
                  <span className="block">{t('oryam.hero.title_l1')}</span>
                  <span className="block ml-[0.22em]">{t('oryam.hero.title_l2')}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-ivory/80 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
                  {t('oryam.hero.lede')}
                </p>
              </Reveal>
              <Reveal delay={0.36}>
                <div className="flex flex-wrap items-center gap-4">
                  <a href="#residences" className="btn-primary" style={{ background: '#A88842', borderColor: '#A88842' }}>
                    {t('oryam.hero.cta_view')} <span aria-hidden>→</span>
                  </a>
                  <a href="#intro" className="btn-ghost-light">↓ &nbsp; {t('oryam.hero.cta_story')}</a>
                </div>
              </Reveal>
            </div>

            <div className="hidden lg:block lg:col-span-4 lg:col-start-9">
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
            <Reveal><p className="eyebrow mb-8">{t('oryam.intro.eyebrow')}</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 text-ink mb-10">
                {t('oryam.intro.title_l1')}<br />{t('oryam.intro.title_l2')}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-ink-soft text-base sm:text-lg leading-[1.85]">
                {t('oryam.intro.body')}
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
              <Reveal><p className="eyebrow mb-6">{t('oryam.residences.eyebrow')}</p></Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-h1 text-ink">
                  {t('oryam.residences.title_l1')}<br />{t('oryam.residences.title_l2')}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="lg:col-span-5 lg:pt-4">
              <p className="text-ink-soft text-base sm:text-lg leading-[1.85]">
                {t('oryam.residences.body')}
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-8">
            {RESIDENCES.map((r, i) => {
              const rt = (k: string) => t(`oryam.residencesData.${r.slug}.${k}`);
              return (
              <Reveal key={r.slug} delay={i * 0.12} className="flex">
                <Link
                  to={`/residences/${r.slug}`}
                  className="group flex flex-col w-full bg-ivory"
                >
                  <div className={r.featured ? 'border-t-2 border-gold relative' : 'border-t border-hair relative'}>
                    {r.featured && (
                      <span className="absolute -top-3 left-6 bg-gold text-ivory text-[10px] tracking-[0.24em] uppercase font-medium px-3 py-1.5">
                        {t('oryam.residences.featured')}
                      </span>
                    )}
                    <div className="overflow-hidden aspect-[4/5] relative">
                      <img
                        src={r.cover}
                        alt={`${rt('name')}, ${rt('spec')}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
                      <span className="absolute bottom-5 left-5 right-5 text-ivory text-[10px] tracking-[0.28em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        {t('oryam.residences.explore')}
                      </span>
                    </div>
                    <div className="p-7">
                      <p className="eyebrow mb-3">{rt('type')}</p>
                      <h3 className="text-h3 text-ink mb-3">{rt('name')}</h3>
                      <p className="text-[11px] tracking-[0.2em] uppercase text-ink-mute mb-5">{rt('spec')}</p>
                      <p className="text-ink-soft text-[15px] leading-[1.75] mb-6 min-h-[120px]">{rt('blurb')}</p>

                      <div className="flex flex-wrap gap-2 mb-7">
                        {[t('oryam.residences.tag_irs'), t('oryam.residences.tag_rental'), t('oryam.residences.tag_ready')].map(tag => (
                          <span key={tag} className="text-[10px] tracking-[0.18em] uppercase text-gold-deep border border-gold/40 px-3 py-1.5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-hair pt-5">
                        <span className="font-serif italic text-[22px] text-ink" style={{ fontWeight: 400 }}>{rt('price')}</span>
                        <span className="text-gold-deep text-[11px] tracking-[0.24em] uppercase font-medium group-hover:text-ink transition-colors inline-flex items-center gap-2">
                          {t('oryam.residences.view360')} <span aria-hidden>→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4. KEY NUMBERS BAR ──────────────────────────────── */}
      <section className="bg-night section-pad">
        <div className="container-x">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {KEY_NUMBERS_I18N.map((k, i) => (
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
            <Reveal><p className="eyebrow mb-6">{t('oryam.ownership.eyebrow')}</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 text-ink">
                {t('oryam.ownership.title_l1')}<br />{t('oryam.ownership.title_l2')}
              </h2>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
            <Reveal>
              <div className="w-12 h-px bg-gold mb-7" />
              <p className="eyebrow mb-5">{t('oryam.ownership.irs.eyebrow')}</p>
              <h3 className="text-h2 text-ink mb-7">{t('oryam.ownership.irs.title')}</h3>
              <p className="text-ink-soft text-[15px] leading-[1.85] mb-5">{t('oryam.ownership.irs.p1')}</p>
              <p className="text-ink-soft text-[15px] leading-[1.85] mb-8">{t('oryam.ownership.irs.p2')}</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold">{t('oryam.ownership.irs.tag')}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="w-12 h-px bg-gold mb-7" />
              <p className="eyebrow mb-5">{t('oryam.ownership.rental.eyebrow')}</p>
              <h3 className="text-h2 text-ink mb-7">{t('oryam.ownership.rental.title')}</h3>
              <p className="text-ink-soft text-[15px] leading-[1.85] mb-5">{t('oryam.ownership.rental.p1')}</p>
              <p className="text-ink-soft text-[15px] leading-[1.85] mb-8">{t('oryam.ownership.rental.p2')}</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold">{t('oryam.ownership.rental.tag')}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 6. THE BUILDING & GROUNDS ────────────────────────── */}
      <section className="bg-ivory section-pad">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12 lg:mb-16">
            <div className="lg:col-span-6">
              <Reveal><p className="eyebrow mb-5">{t('oryam.grounds.eyebrow')}</p></Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-h1 text-ink">
                  {t('oryam.grounds.title_l1')}<br />{t('oryam.grounds.title_l2')}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="lg:col-span-6 lg:pt-4">
              <p className="text-ink-soft text-base sm:text-lg leading-[1.85]">
                {t('oryam.grounds.body')}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            <Reveal className="col-span-12 md:col-span-8">
              <div className="aspect-[16/10] overflow-hidden group">
                <img src={poolLoungers} alt="Residents' pool with sun loungers and tropical garden"
                     loading="lazy" decoding="async"
                     className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="col-span-12 md:col-span-4">
              <div className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden group">
                <img src={buildingShot} alt="The Oryam building exterior"
                     loading="lazy" decoding="async"
                     className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" />
              </div>
            </Reveal>
            <Reveal delay={0.15} className="col-span-6 md:col-span-4">
              <div className="aspect-[4/3] overflow-hidden group">
                <img src={gardenShot} alt="Landscaped gardens at Oryam"
                     loading="lazy" decoding="async"
                     className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="col-span-6 md:col-span-8">
              <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden group">
                <img src={entranceShot} alt="Entrance and architecture"
                     loading="lazy" decoding="async"
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
            <Reveal><p className="eyebrow mb-6">{t('oryam.why.eyebrow')}</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 text-ink">
                {t('oryam.why.title_l1')}<br />{t('oryam.why.title_l2')}
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-14 lg:gap-y-20">
            {REASONS_I18N.map((r, i) => (
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
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(15,22,32,0.45) 0%, rgba(15,22,32,0.65) 100%)' }} />
        </div>
        <div className="relative z-10 container-x py-24 lg:py-32 text-center">
          <Reveal><p className="eyebrow-light mb-7">{t('oryam.setting.eyebrow')}</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-h1 text-ivory mb-10 max-w-3xl mx-auto">
              {t('oryam.setting.title_l1')}<br />{t('oryam.setting.title_l2')}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ivory/80 text-base sm:text-lg leading-[1.85] max-w-[560px] mx-auto">
              {t('oryam.setting.body')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── 9. CONTACT ──────────────────────────────────────── */}
      <section id="contact" className="bg-ivory section-pad">
        <div className="container-x">
          <Reveal><p className="eyebrow mb-6">{t('oryam.contact.eyebrow')}</p></Reveal>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <Reveal delay={0.08}>
                <h2 className="text-h1 text-ink mb-8">
                  {t('oryam.contact.title_l1')}<br />{t('oryam.contact.title_l2')}<br />{t('oryam.contact.title_l3')}
                </h2>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-ink-soft text-[15px] leading-[1.85] mb-12 max-w-md">
                  {t('oryam.contact.body')}
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <dl className="space-y-0 max-w-md">
                  {[
                    [t('oryam.contact.label_response'), t('oryam.contact.val_response')],
                    [t('oryam.contact.label_conf'),     t('oryam.contact.val_conf')],
                    [t('oryam.contact.label_loc'),      t('oryam.contact.val_loc')],
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
                  <label htmlFor="name">{t('oryam.contact.f_name')}</label>
                  <input id="name" name="name" type="text" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="email">{t('oryam.contact.f_email')}</label>
                  <input id="email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="message">{t('oryam.contact.f_message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t('oryam.contact.f_message_ph')}
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
                  {submitted ? <>{t('oryam.contact.sent')} <span aria-hidden>✓</span></> : <>{t('oryam.contact.send')} <span aria-hidden>→</span></>}
                </button>

                <p className="text-[10px] tracking-[0.3em] uppercase text-gold pt-2">
                  {t('oryam.contact.footnote')}
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
