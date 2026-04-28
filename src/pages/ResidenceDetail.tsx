import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { OryamHeader } from '@/components/oryam/OryamHeader';
import { OryamFooter } from '@/components/oryam/OryamFooter';
import { ScrollProgress } from '@/components/oryam/ScrollProgress';
import { Reveal } from '@/components/oryam/Reveal';
import { findResidence, RESIDENCES } from '@/data/residences';

export default function ResidenceDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const residence = findResidence(slug ?? '');
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  // Lightbox keyboard
  useEffect(() => {
    if (lightbox === null || !residence) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(i => (i! + 1) % residence.gallery.length);
      if (e.key === 'ArrowLeft')  setLightbox(i => (i! - 1 + residence.gallery.length) % residence.gallery.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, residence]);

  if (!residence) return <Navigate to="/" replace />;

  // Translated residence content (falls back to data file for safety)
  const rt = (k: string) => t(`oryam.residencesData.${residence.slug}.${k}`);
  const name = rt('name') as string;
  const type = rt('type') as string;
  const tagline = rt('tagline') as string;
  const spec = rt('spec') as string;
  const price = rt('price') as string;
  const description = rt('description') as string;
  const captions = t(`oryam.residencesData.${residence.slug}.captions`, { returnObjects: true }) as string[];

  const others = RESIDENCES.filter(r => r.slug !== residence.slug);

  return (
    <div className="bg-ivory text-ink min-h-screen">
      <ScrollProgress />
      <OryamHeader variant="over-dark" />

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative w-full h-[88dvh] min-h-[600px] overflow-hidden">
        <img
          src={residence.cover}
          alt={`${name}, ${spec}`}
          className="absolute inset-0 w-full h-full object-cover ken-burns"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(15,22,32,0.50) 0%, rgba(15,22,32,0.18) 35%, rgba(15,22,32,0.55) 78%, rgba(15,22,32,0.85) 100%)',
          }}
        />

        <div className="relative z-10 h-full container-x flex flex-col justify-end pb-16 sm:pb-20 lg:pb-24">
          <Reveal>
            <Link
              to="/#residences"
              className="text-ivory/70 hover:text-ivory text-[11px] tracking-[0.28em] uppercase mb-8 inline-flex items-center gap-2 transition-colors"
            >
              {t('oryam.nav.back_long')}
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow-light mb-5">{type} · ORYAM · TROU AUX BICHES</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-display text-ivory mb-6 max-w-4xl">{name}</h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-ivory/85 text-base sm:text-lg max-w-xl mb-8">{tagline}</p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-ivory/80 text-[11px] tracking-[0.24em] uppercase">
              <span>{residence.beds} {t('oryam.detail.bedrooms')}</span>
              <span className="w-px h-3 bg-ivory/40" />
              <span>{residence.baths} {t('oryam.detail.bathrooms')}</span>
              <span className="w-px h-3 bg-ivory/40" />
              <span>{residence.area} m²</span>
              <span className="w-px h-3 bg-ivory/40" />
              <span className="font-serif italic text-[18px] tracking-normal text-ivory normal-case">{price}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── DESCRIPTION ─────────────────────────────────────────── */}
      <section className="bg-ivory section-pad">
        <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal><p className="eyebrow mb-6">{t('oryam.detail.eyebrow_residence')}</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 text-ink">
                {name}.<br />{t('oryam.detail.in_detail')}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-7">
            <p className="text-ink-soft text-base sm:text-lg leading-[1.85] mb-10">
              {description}
            </p>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-0 max-w-lg">
              {[
                [t('oryam.detail.bedrooms'),  `${residence.beds}`],
                [t('oryam.detail.bathrooms'), `${residence.baths}`],
                [t('oryam.detail.interior'),  `${residence.area} m²`],
                [t('oryam.detail.status'),    t('oryam.detail.status_value')],
                [t('oryam.detail.scheme'),    t('oryam.detail.scheme_value')],
                [t('oryam.detail.residency'), t('oryam.detail.residency_value')],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-hair py-5">
                  <dt className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">{k}</dt>
                  <dd className="font-serif italic text-[22px] text-ink leading-none">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ─── 360° VIRTUAL TOUR, placeholder ─────────────────────── */}
      <section className="bg-bone section-pad">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12 lg:mb-16">
            <div className="lg:col-span-7">
              <Reveal><p className="eyebrow mb-5">{t('oryam.detail.tour_eyebrow')}</p></Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-h1 text-ink">
                  {t('oryam.detail.tour_title_l1')}<br />{t('oryam.detail.tour_title_l2')}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="lg:col-span-5 lg:pt-4">
              <p className="text-ink-soft text-[15px] leading-[1.85]">
                {t('oryam.detail.tour_body', { name })}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div
              className="relative w-full overflow-hidden border border-hair"
              style={{ aspectRatio: '16 / 9', background: 'hsl(var(--ink))' }}
            >
              <img
                src={residence.gallery[0].src}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-ink/40" />

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 border border-ivory/40 rounded-full flex items-center justify-center mb-7">
                  <span className="text-ivory/80 text-[20px] font-serif italic">360°</span>
                </div>
                <p className="eyebrow-light mb-4">{t('oryam.detail.tour_soon_eyebrow')}</p>
                <h3 className="text-h2 text-ivory max-w-xl mb-5">
                  {t('oryam.detail.tour_soon_title', { name })}
                </h3>
                <p className="text-ivory/70 text-[14px] max-w-md leading-[1.85] mb-7">
                  {t('oryam.detail.tour_soon_body')}
                </p>
                <a href="#gallery" className="btn-ghost-light">
                  {t('oryam.detail.tour_see_gallery')}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── GALLERY ─────────────────────────────────────────────── */}
      <section id="gallery" className="bg-ivory section-pad">
        <div className="container-x">
          <div className="mb-12 lg:mb-16 max-w-3xl">
            <Reveal><p className="eyebrow mb-5">{t('oryam.detail.gallery_eyebrow')}</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 text-ink">
                {t('oryam.detail.gallery_count', { count: residence.gallery.length })}
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            {residence.gallery.map((g, i) => {
              const caption = (Array.isArray(captions) && captions[i]) || g.caption;
              const span =
                i % 7 === 0 ? 'col-span-12 md:col-span-8 aspect-[16/10]' :
                i % 7 === 1 ? 'col-span-6  md:col-span-4 aspect-[4/5]'  :
                i % 7 === 2 ? 'col-span-6  md:col-span-4 aspect-[4/5]'  :
                i % 7 === 3 ? 'col-span-12 md:col-span-8 aspect-[16/10]' :
                i % 7 === 4 ? 'col-span-6  md:col-span-6 aspect-[4/3]'  :
                i % 7 === 5 ? 'col-span-6  md:col-span-6 aspect-[4/3]'  :
                              'col-span-12 aspect-[21/9]';
              return (
                <Reveal key={g.src + i} delay={(i % 4) * 0.06} className={span}>
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    className="group relative w-full h-full overflow-hidden block"
                  >
                    <img
                      src={g.src}
                      alt={caption}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors duration-500" />
                    <span className="absolute left-4 bottom-4 right-4 text-ivory text-[10px] tracking-[0.24em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      {caption}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────── */}
      <section className="bg-night section-pad">
        <div className="container-x text-center">
          <Reveal><p className="eyebrow-light mb-6">{t('oryam.detail.cta_eyebrow')}</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-h1 text-ivory mb-7 max-w-3xl mx-auto">
              {t('oryam.detail.cta_title_l1', { name })}<br />{t('oryam.detail.cta_title_l2')}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ivory/75 text-base max-w-xl mx-auto mb-10 leading-[1.85]">
              {t('oryam.detail.cta_body')}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link to="/#contact" className="btn-ghost-light">
              {t('oryam.detail.cta_button')}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── OTHER RESIDENCES ────────────────────────────────────── */}
      <section className="bg-bone section-pad">
        <div className="container-x">
          <div className="mb-12 lg:mb-16">
            <Reveal><p className="eyebrow mb-5">{t('oryam.detail.others_eyebrow')}</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 text-ink">{t('oryam.detail.others_title')}</h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {others.map((r, i) => {
              const ortName = t(`oryam.residencesData.${r.slug}.name`) as string;
              const ortType = t(`oryam.residencesData.${r.slug}.type`) as string;
              const ortSpec = t(`oryam.residencesData.${r.slug}.spec`) as string;
              return (
                <Reveal key={r.slug} delay={i * 0.12}>
                  <Link to={`/residences/${r.slug}`} className="group block bg-ivory border-t border-hair">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={r.cover}
                        alt={ortName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-7 flex items-end justify-between gap-6">
                      <div>
                        <p className="eyebrow mb-2">{ortType}</p>
                        <h3 className="text-h3 text-ink mb-2">{ortName}</h3>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-ink-mute">{ortSpec}</p>
                      </div>
                      <span className="text-gold-deep text-[11px] tracking-[0.24em] uppercase whitespace-nowrap inline-flex items-center gap-2 group-hover:text-ink transition-colors">
                        {t('oryam.detail.others_view')}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <OryamFooter />

      {/* ─── LIGHTBOX ────────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-night/95 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center text-ivory border border-ivory/40 hover:bg-ivory hover:text-ink transition-colors text-xl"
            aria-label="Close"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox(i => (i! - 1 + residence.gallery.length) % residence.gallery.length); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-ivory border border-ivory/30 hover:bg-ivory hover:text-ink transition-colors"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightbox(i => (i! + 1) % residence.gallery.length); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-ivory border border-ivory/30 hover:bg-ivory hover:text-ink transition-colors"
            aria-label="Next"
          >
            →
          </button>

          <figure className="max-w-[1280px] max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={residence.gallery[lightbox].src}
              alt={(Array.isArray(captions) && captions[lightbox]) || residence.gallery[lightbox].caption}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <figcaption className="mt-5 text-ivory/80 text-[11px] tracking-[0.28em] uppercase text-center">
              {(Array.isArray(captions) && captions[lightbox]) || residence.gallery[lightbox].caption}
              <span className="text-ivory/50 ml-3">{lightbox + 1} / {residence.gallery.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
