import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn, TextReveal } from '@/components/ChapterSection';
import { ModeToggle } from '@/components/ModeToggle';
import { PanoramaViewer } from '@/components/PanoramaViewer';
import { useIntent } from '@/contexts/IntentContext';
import { useRef } from 'react';

const heroScenes = [
  { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=4096&auto=format&fit=crop&q=90', label: 'Living Room' },
  { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=4096&auto=format&fit=crop&q=90', label: 'Kitchen' },
  { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=4096&auto=format&fit=crop&q=90', label: 'Master Suite' },
];

const Index = () => {
  const { t } = useTranslation();
  const { mode } = useIntent();
  const isInvest = mode === 'invest';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ModeToggle />

      {/* ═══ 360° HERO — Immersive Panorama ═══ */}
      <section className="relative h-screen overflow-hidden">
        <PanoramaViewer images={heroScenes} />

        {/* Overlay text on panorama */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="h-full flex flex-col justify-end pb-[12vh]">
            <div className="container-editorial pointer-events-auto">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-caption text-white/50 mb-6"
              >
                {t('hero.location')}
              </motion.p>

              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 130 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.4, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  className="font-serif text-display text-white mb-6 max-w-5xl drop-shadow-lg"
                >
                  {t('hero.title')}
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
                className="text-lg sm:text-xl text-white/70 max-w-lg font-light leading-relaxed mb-10 drop-shadow-md"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-3 py-4 px-10 bg-white/90 text-foreground text-[10.5px] tracking-[0.15em] uppercase font-normal
                             hover:bg-white transition-all duration-500 backdrop-blur-sm"
                >
                  <span>{t('hero.explore')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-caption text-white/30">{t('hero.scrollText')}</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <ArrowDown className="h-3.5 w-3.5 text-white/30" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CHAPTER 1: THE BUILDING ═══ */}
      <section className="section-gap">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-0">
            <div className="lg:col-span-5 lg:pt-24">
              <FadeIn>
                <p className="text-caption text-accent mb-8">{t('chapter1.label')}</p>
              </FadeIn>
              <TextReveal className="font-serif text-headline text-foreground mb-10">
                {t('chapter1.title')}
              </TextReveal>
              <FadeIn delay={0.2}>
                <p className="text-body-lg text-muted-foreground mb-12 max-w-md">
                  {t('chapter1.description')}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="divider-editorial" />
              </FadeIn>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <FadeIn direction="left">
                <div className="aspect-portrait overflow-hidden img-zoom">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&auto=format&fit=crop&q=80"
                    alt="Mont Choisy exterior architecture"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="container-editorial mt-24 sm:mt-32">
          <div className="hr-diamond" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            {[
              { number: '32', label: t('stats.residences') },
              { number: '8', label: t('stats.floors') },
              { number: '450+', label: t('stats.terraceSize') },
              { number: '2026', label: t('stats.completion') },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center">
                  <span className="number-display text-5xl sm:text-6xl lg:text-7xl text-accent">{stat.number}</span>
                  <p className="text-caption text-muted-foreground mt-4">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FULL-BLEED IMAGE ═══ */}
      <FadeIn>
        <div className="w-full aspect-cinema overflow-hidden grain-overlay relative">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&auto=format&fit=crop&q=80"
            alt="Mont Choisy residence interior"
            className="w-full h-full object-cover ken-burns"
            loading="lazy"
          />
          <div className="hero-overlay-premium absolute inset-0" />
          <div className="absolute bottom-8 sm:bottom-12 left-0 right-0 z-10">
            <div className="container-editorial">
              <p className="text-caption text-white/40">{t('chapter2.label')}</p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ═══ CHAPTER 2: THE RESIDENCES ═══ */}
      <section className="section-gap">
        <div className="container-editorial">
          <div className="indent-editorial max-w-3xl">
            <TextReveal className="font-serif text-headline text-foreground mb-10">
              {t('chapter2.title')}
            </TextReveal>
            <FadeIn delay={0.2}>
              <p className="text-body-lg text-muted-foreground mb-12">{t('chapter2.description')}</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex gap-16 border-t border-border pt-8">
                {[
                  { n: '1–4', l: t('chapter2.bedrooms') },
                  { n: '850–3,200', l: t('chapter2.sizes') },
                  { n: '∞', l: t('chapter2.views') },
                ].map((item, i) => (
                  <div key={i}>
                    <span className="number-display text-4xl lg:text-5xl text-foreground">{item.n}</span>
                    <p className="text-caption text-muted-foreground mt-3">{item.l}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ CHAPTER 3: THE LIFESTYLE ═══ */}
      <section className="section-warm section-gap grain-overlay relative">
        <div className="container-editorial relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16">
            <div>
              <FadeIn>
                <p className="text-caption text-accent mb-8">{t('chapter3.label')}</p>
              </FadeIn>
              <TextReveal className="font-serif text-headline text-foreground mb-8">
                {t('chapter3.title')}
              </TextReveal>
            </div>
            <div className="lg:pt-20">
              <FadeIn delay={0.2}>
                <p className="text-body-lg text-muted-foreground">{t('chapter3.description')}</p>
              </FadeIn>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              { src: 'https://images.unsplash.com/photo-1572331165267-854da2b021b1?w=800&auto=format&fit=crop&q=80', label: t('chapter3.moment1') },
              { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80', label: t('chapter3.moment2'), offset: true },
              { src: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80', label: t('chapter3.moment3') },
            ].map((img, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className={img.offset ? 'lg:mt-20' : i === 2 ? 'col-span-2 lg:col-span-1 lg:-mt-8' : ''}>
                  <div className="aspect-editorial overflow-hidden img-zoom">
                    <img src={img.src} alt={img.label} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <p className="text-caption text-muted-foreground mt-4">{img.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INVESTMENT / LIFESTYLE ═══ */}
      <section className="section-gap">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <FadeIn>
                <p className="text-caption text-accent mb-8">
                  {isInvest ? t('invest.label') : t('lifestyle.label')}
                </p>
              </FadeIn>
              <TextReveal className="font-serif text-headline text-foreground mb-10">
                {isInvest ? t('invest.title') : t('lifestyle.title')}
              </TextReveal>

              {isInvest ? (
                <FadeIn delay={0.2}>
                  <div className="flex flex-wrap gap-12 mt-8">
                    {[
                      { n: '7-9%', l: t('invest.yield') },
                      { n: '15%', l: t('invest.appreciation') },
                      { n: '€0', l: t('invest.tax') },
                    ].map((stat, i) => (
                      <div key={i}>
                        <span className="number-display text-4xl sm:text-5xl text-accent">{stat.n}</span>
                        <p className="text-caption text-muted-foreground mt-3">{stat.l}</p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              ) : (
                <FadeIn delay={0.2}>
                  <p className="text-body-lg text-muted-foreground max-w-xl">{t('lifestyle.description')}</p>
                </FadeIn>
              )}

              <FadeIn delay={0.4}>
                <div className="mt-12">
                  <Link
                    to={isInvest ? '/own-in-mauritius' : '/explore'}
                    className="btn-outline-premium inline-flex items-center gap-3 py-4 text-foreground"
                  >
                    <span>{isInvest ? t('invest.cta') : t('lifestyle.cta')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-5">
              <FadeIn direction="left">
                <div className="aspect-portrait overflow-hidden img-zoom">
                  <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80"
                    alt="Mont Choisy residence"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-32 sm:py-44 grain-overlay relative">
        <div className="container-editorial text-center relative z-10">
          <FadeIn>
            <span className="text-caption text-accent mb-8 block">{t('cta.label')}</span>
          </FadeIn>
          <TextReveal className="font-serif text-display text-foreground mx-auto max-w-4xl mb-12">
            {t('cta.title')}
          </TextReveal>
          <FadeIn delay={0.3}>
            <Link to="/contact" className="btn-premium inline-flex items-center gap-3 px-14 py-5">
              <span>{t('cta.button')}</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;