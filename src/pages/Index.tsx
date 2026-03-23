import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn, TextReveal } from '@/components/ChapterSection';
import { ModeToggle } from '@/components/ModeToggle';
import { useIntent } from '@/contexts/IntentContext';
import { useRef } from 'react';

const Index = () => {
  const { t } = useTranslation();
  const { mode } = useIntent();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const isInvest = mode === 'invest';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ModeToggle />

      {/* ═══ VIDEO HERO ═══ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center ken-burns"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=80)',
            }}
          />
        </motion.div>

        {/* Letterbox bars */}
        <div className="absolute top-0 left-0 right-0 h-[6vh] bg-background z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[6vh] bg-background z-10" />

        <div className="overlay-cinematic absolute inset-0 z-[1]" />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-[2] h-full flex flex-col justify-end pb-[12vh]"
        >
          <div className="container-editorial">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-caption text-foreground/50 mb-6"
            >
              {t('hero.location', 'Île Maurice · Indian Ocean')}
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className="font-serif text-display text-foreground mb-6"
              >
                {t('hero.title')}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-lg sm:text-xl text-foreground/60 max-w-lg font-light leading-relaxed mb-10"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex items-center gap-6"
            >
              <Link
                to="/explore"
                className="btn-premium inline-flex items-center gap-3 px-10 py-4"
              >
                <span>{t('hero.explore', 'Explore Residences')}</span>
                <ArrowRight className="h-4 w-4 relative z-10" />
              </Link>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
          >
            <span className="text-caption text-foreground/30">{t('hero.scrollText', 'Discover')}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="h-4 w-4 text-foreground/30" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ CHAPTER 1: THE ISLAND ═══ */}
      <section className="section-gap">
        <div className="container-editorial">
          <FadeIn>
            <p className="text-caption text-accent mb-6">{t('chapter1.label', 'Chapter One')}</p>
          </FadeIn>
          <TextReveal className="font-serif text-headline text-foreground max-w-4xl mb-12">
            {t('chapter1.title', 'Where the Indian Ocean whispers to the shore')}
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-body-lg text-muted-foreground max-w-2xl mb-16">
              {t('chapter1.description', 'Mauritius is not merely an island — it is a feeling. A luminous fragment of paradise where turquoise lagoons meet volcanic peaks, and every sunset writes a new poem across the sky.')}
            </p>
          </FadeIn>
        </div>

        {/* Full-bleed image */}
        <FadeIn className="px-5 sm:px-0">
          <div className="w-full aspect-cinema overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1920&auto=format&fit=crop&q=80"
              alt="Mauritius coastline"
              className="w-full h-full object-cover ken-burns"
              loading="lazy"
            />
          </div>
        </FadeIn>

        {/* Stats row */}
        <div className="container-editorial mt-20 sm:mt-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: '330', label: t('stats.sunnyDays', 'Days of Sunshine') },
              { number: '26°', label: t('stats.avgTemp', 'Average Temperature') },
              { number: '#1', label: t('stats.africaRank', 'In Africa for Quality of Life') },
              { number: '0%', label: t('stats.capitalGains', 'Capital Gains Tax') },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center md:text-left">
                  <span className="number-display text-5xl sm:text-6xl text-accent">{stat.number}</span>
                  <p className="text-caption text-muted-foreground mt-3">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CHAPTER 2: THE ARCHITECTURE ═══ */}
      <section className="section-gap bg-secondary/50">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <p className="text-caption text-accent mb-6">{t('chapter2.label', 'Chapter Two')}</p>
              </FadeIn>
              <TextReveal className="font-serif text-headline text-foreground mb-8">
                {t('chapter2.title', 'Architecture born from the landscape')}
              </TextReveal>
              <FadeIn delay={0.2}>
                <p className="text-body-lg text-muted-foreground mb-8">
                  {t('chapter2.description', 'Thirty-two residences across eight floors, designed to frame the ocean and dissolve the boundary between interior and horizon. Every line, every material, responds to the light and air of the Indian Ocean.')}
                </p>
              </FadeIn>

              {/* Animated numbers */}
              <FadeIn delay={0.3}>
                <div className="flex gap-12 mt-8">
                  {[
                    { n: '32', l: t('chapter2.residences', 'Residences') },
                    { n: '8', l: t('chapter2.floors', 'Floors') },
                    { n: '∞', l: t('chapter2.views', 'Ocean Views') },
                  ].map((item, i) => (
                    <div key={i}>
                      <span className="number-display text-4xl text-foreground">{item.n}</span>
                      <p className="text-caption text-muted-foreground mt-2">{item.l}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="left">
              <div className="aspect-editorial overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&auto=format&fit=crop&q=80"
                  alt="Architectural vision"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ CHAPTER 3: THE LIVING ═══ */}
      <section className="section-gap">
        <div className="container-editorial mb-16">
          <FadeIn>
            <p className="text-caption text-accent mb-6">{t('chapter3.label', 'Chapter Three')}</p>
          </FadeIn>
          <TextReveal className="font-serif text-headline text-foreground max-w-3xl mb-8">
            {t('chapter3.title', 'Moments, not features')}
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-body-lg text-muted-foreground max-w-xl">
              {t('chapter3.description', 'Morning light flooding through floor-to-ceiling glass. The infinity pool merging with the horizon. A private terrace dinner as the Indian Ocean turns gold.')}
            </p>
          </FadeIn>
        </div>

        {/* Mood image grid */}
        <div className="container-editorial">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80',
                caption: t('chapter3.moment1', 'Morning Light'),
              },
              {
                src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80',
                caption: t('chapter3.moment2', 'Infinity Edge'),
              },
              {
                src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80',
                caption: t('chapter3.moment3', 'Terrace Dining'),
              },
            ].map((img, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="group img-zoom aspect-editorial relative">
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-caption text-foreground">{img.caption}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INVESTMENT / LIFESTYLE ADAPTIVE SECTION ═══ */}
      <section className="section-gap bg-secondary/50">
        <div className="container-editorial text-center">
          <FadeIn>
            <p className="text-caption text-accent mb-6">
              {isInvest ? t('invest.label', 'Investment Opportunity') : t('lifestyle.label', 'A Life Unlike Any Other')}
            </p>
          </FadeIn>
          <TextReveal className="font-serif text-headline text-foreground mx-auto max-w-3xl mb-12">
            {isInvest
              ? t('invest.title', 'An asset class of its own')
              : t('lifestyle.title', 'Where every day feels like the first')
            }
          </TextReveal>

          {isInvest ? (
            <FadeIn delay={0.2}>
              <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                {[
                  { n: '7-9%', l: t('invest.yield', 'Annual Rental Yield') },
                  { n: '15%', l: t('invest.appreciation', '5-Year Appreciation') },
                  { n: '€0', l: t('invest.tax', 'Capital Gains Tax') },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <span className="number-display text-4xl sm:text-5xl text-accent">{stat.n}</span>
                    <p className="text-caption text-muted-foreground mt-3">{stat.l}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={0.2}>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                {t('lifestyle.description', 'Wake to the sound of waves. Spend afternoons between the pool and the reef. Watch the sun dissolve into the Indian Ocean from your private terrace. This is not a holiday — this is home.')}
              </p>
            </FadeIn>
          )}

          <FadeIn delay={0.4}>
            <div className="mt-12">
              <Link
                to={isInvest ? '/own-in-mauritius' : '/explore'}
                className="btn-outline-premium inline-flex items-center gap-3 px-10 py-4 text-foreground border-foreground/30"
              >
                <span>{isInvest ? t('invest.cta', 'Investment Details') : t('lifestyle.cta', 'Explore the Residences')}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-28 sm:py-36">
        <div className="container-editorial text-center">
          <FadeIn>
            <span className="text-caption text-accent mb-6 block">{t('cta.label', 'Your Island Awaits')}</span>
          </FadeIn>
          <TextReveal className="font-serif text-display text-foreground mx-auto max-w-4xl mb-10">
            {t('cta.title', 'The Verso')}
          </TextReveal>
          <FadeIn delay={0.3}>
            <Link
              to="/contact"
              className="btn-premium inline-flex items-center gap-3 px-12 py-5"
            >
              <span>{t('cta.button', 'Schedule a Private Viewing')}</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
