import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { OryamHeader } from '@/components/oryam/OryamHeader';
import { OryamFooter } from '@/components/oryam/OryamFooter';
import { ScrollProgress } from '@/components/oryam/ScrollProgress';
import { Reveal } from '@/components/oryam/Reveal';
import { findResidence, RESIDENCES } from '@/data/residences';

export default function ResidenceDetail() {
  const { slug } = useParams();
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

  const others = RESIDENCES.filter(r => r.slug !== residence.slug);

  return (
    <div className="bg-ivory text-ink min-h-screen">
      <ScrollProgress />
      <OryamHeader variant="over-dark" />

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative w-full h-[88dvh] min-h-[600px] overflow-hidden">
        <img
          src={residence.cover}
          alt={`${residence.name} — ${residence.spec}`}
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
              <span aria-hidden>←</span> Back to the collection
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow-light mb-5">{residence.type} · ORYAM · MONT CHOISY</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-display text-ivory mb-6 max-w-4xl">{residence.name}</h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-ivory/85 text-base sm:text-lg max-w-xl mb-8">{residence.tagline}</p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-ivory/80 text-[11px] tracking-[0.24em] uppercase">
              <span>{residence.beds} Bedrooms</span>
              <span className="w-px h-3 bg-ivory/40" />
              <span>{residence.baths} Bathrooms</span>
              <span className="w-px h-3 bg-ivory/40" />
              <span>{residence.area} m²</span>
              <span className="w-px h-3 bg-ivory/40" />
              <span className="font-serif italic text-[18px] tracking-normal text-ivory normal-case">{residence.price}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── DESCRIPTION ─────────────────────────────────────────── */}
      <section className="bg-ivory section-pad">
        <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal><p className="eyebrow mb-6">THE RESIDENCE</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 text-ink">
                {residence.name}.<br />In detail.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-7">
            <p className="text-ink-soft text-base sm:text-lg leading-[1.85] mb-10">
              {residence.description}
            </p>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-0 max-w-lg">
              {[
                ['BEDROOMS',   `${residence.beds}`],
                ['BATHROOMS',  `${residence.baths}`],
                ['INTERIOR',   `${residence.area} m²`],
                ['STATUS',     'Move-in ready'],
                ['SCHEME',     'IRS — freehold'],
                ['RESIDENCY',  'Permit included'],
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

      {/* ─── 360° VIRTUAL TOUR — placeholder ─────────────────────── */}
      <section className="bg-bone section-pad">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-12 lg:mb-16">
            <div className="lg:col-span-7">
              <Reveal><p className="eyebrow mb-5">VIRTUAL WALKTHROUGH</p></Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-h1 text-ink">
                  Step inside —<br />a 360° tour.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="lg:col-span-5 lg:pt-4">
              <p className="text-ink-soft text-[15px] leading-[1.85]">
                A full immersive walkthrough of {residence.name}, room by room.
                Drag, look up, look out — explore the residence as if you were standing inside it.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div
              className="relative w-full overflow-hidden border border-hair"
              style={{ aspectRatio: '16 / 9', background: 'hsl(var(--ink))' }}
            >
              {/* dim cover image as backdrop */}
              <img
                src={residence.gallery[0].src}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-ink/40" />

              {/* Placeholder content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 border border-ivory/40 rounded-full flex items-center justify-center mb-7">
                  <span className="text-ivory/80 text-[20px] font-serif italic">360°</span>
                </div>
                <p className="eyebrow-light mb-4">VIRTUAL TOUR · COMING SOON</p>
                <h3 className="text-h2 text-ivory max-w-xl mb-5">
                  {residence.name} — fully immersive
                </h3>
                <p className="text-ivory/70 text-[14px] max-w-md leading-[1.85] mb-7">
                  Our 360° capture for this residence is being prepared. In the meantime,
                  the photo gallery below shows every room in detail.
                </p>
                <a href="#gallery" className="btn-ghost-light">
                  ↓ &nbsp; See the gallery
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
            <Reveal><p className="eyebrow mb-5">GALLERY</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 text-ink">{residence.gallery.length} views.</h2>
            </Reveal>
          </div>

          {/* Editorial mosaic */}
          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            {residence.gallery.map((g, i) => {
              // rhythm: large / small / small / large / small / small / large / large
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
                      alt={g.caption}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors duration-500" />
                    <span className="absolute left-4 bottom-4 right-4 text-ivory text-[10px] tracking-[0.24em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      {g.caption}
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
          <Reveal><p className="eyebrow-light mb-6">PRIVATE ENQUIRY</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-h1 text-ivory mb-7 max-w-3xl mx-auto">
              Interested in {residence.name}?<br />Speak with us directly.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ivory/75 text-base max-w-xl mx-auto mb-10 leading-[1.85]">
              Every conversation is private and personal. A member of our team will
              respond within 24 hours to arrange a call at your convenience.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link to="/#contact" className="btn-ghost-light">
              Make a Private Enquiry &nbsp;→
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── OTHER RESIDENCES ────────────────────────────────────── */}
      <section className="bg-bone section-pad">
        <div className="container-x">
          <div className="mb-12 lg:mb-16">
            <Reveal><p className="eyebrow mb-5">ALSO IN THE COLLECTION</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 text-ink">Two other residences.</h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {others.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.12}>
                <Link to={`/residences/${r.slug}`} className="group block bg-ivory border-t border-hair">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={r.cover}
                      alt={r.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-7 flex items-end justify-between gap-6">
                    <div>
                      <p className="eyebrow mb-2">{r.type}</p>
                      <h3 className="text-h3 text-ink mb-2">{r.name}</h3>
                      <p className="text-[11px] tracking-[0.2em] uppercase text-ink-mute">{r.spec}</p>
                    </div>
                    <span className="text-gold-deep text-[11px] tracking-[0.24em] uppercase whitespace-nowrap inline-flex items-center gap-2 group-hover:text-ink transition-colors">
                      View <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
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
              alt={residence.gallery[lightbox].caption}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <figcaption className="mt-5 text-ivory/80 text-[11px] tracking-[0.28em] uppercase text-center">
              {residence.gallery[lightbox].caption}
              <span className="text-ivory/50 ml-3">{lightbox + 1} / {residence.gallery.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
