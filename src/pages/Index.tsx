import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn, TextReveal } from '@/components/ChapterSection';
import { PanoramaViewer } from '@/components/PanoramaViewer';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ═══ 360° HERO ═══ */}
      <section className="relative h-dvh">
        <motion.img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&auto=format&fit=crop&q=80"
          alt="Luxury apartment interior"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 20, ease: 'easeOut' }}
        />

        {/* Overlay text */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="text-center"
          >
            <p className="text-[11px] tracking-[0.4em] uppercase text-white/60 mb-4 font-light">
              Grand Baie · Mauritius
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] drop-shadow-lg">
              Welcome to<br />Mont Choisy
            </h1>
            <p className="text-[13px] sm:text-[15px] text-white/70 mt-5 tracking-wide font-light">
              Oceanfront Living Redefined
            </p>
          </motion.div>
        </div>

        {/* Bottom gradient for readability */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/60 to-transparent pointer-events-none z-[5]" />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">{t('hero.scrollText', 'Scroll to Explore')}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="h-4 w-4 text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ INTRO TAGLINE ═══ */}
      <section className="py-24 sm:py-32 lg:py-44 bg-background">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-8 font-normal">Now Available</p>
          </FadeIn>
          <TextReveal className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] text-foreground leading-[1.15] mb-8">
            {t('hero.title')}
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 font-light">
              {t('hero.subtitle')}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[13px] tracking-[0.06em] text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors duration-300"
            >
              Schedule A Tour
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══ RESIDENCE CARDS ═══ */}
      <section className="pb-24 sm:pb-32 lg:pb-44 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
            {[
              {
                title: 'Short-Term Rentals',
                subtitle: 'Light-filled living spaces.',
                desc: 'Fully furnished apartments perfect for holiday stays, from a few nights to several weeks.',
                img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop&q=80',
                link: '/explore',
              },
              {
                title: 'Long-Term Rentals',
                subtitle: 'Thoughtfully designed details.',
                desc: 'Spacious residences with premium finishes, ideal for extended living with ocean views.',
                img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80',
                link: '/explore',
              },
              {
                title: 'Buy Your Residence',
                subtitle: 'Oceanfront ownership.',
                desc: 'Select units available for purchase, offering freehold ownership and Mauritius residency benefits.',
                img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
                link: '/own-in-mauritius',
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <Link to={card.link} className="group block">
                  <div className="overflow-hidden aspect-[3/4] mb-5">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-[12px] tracking-[0.2em] uppercase text-muted-foreground mb-2">{card.title}</h3>
                  <p className="font-serif text-xl sm:text-2xl text-foreground mb-2">{card.subtitle}</p>
                  <p className="text-[14px] text-muted-foreground leading-relaxed font-light">{card.desc}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FULL-BLEED LIFESTYLE IMAGE ═══ */}
      <FadeIn>
        <div className="w-full aspect-[21/9] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&auto=format&fit=crop&q=80"
            alt="Tropical oceanfront pool and terrace"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </FadeIn>

      {/* ═══ THE BUILDING ═══ */}
      <section className="py-24 sm:py-32 lg:py-44 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6">{t('chapter1.label')}</p>
              </FadeIn>
              <TextReveal className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.1] mb-8">
                {t('chapter1.title')}
              </TextReveal>
              <FadeIn delay={0.2}>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light mb-10 max-w-lg">
                  {t('chapter1.description')}
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <Link
                  to="/residence"
                  className="inline-flex items-center gap-2 text-[13px] tracking-[0.06em] text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors duration-300"
                >
                  Explore the Residences
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </FadeIn>
            </div>
            <FadeIn direction="left">
              <div className="overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&auto=format&fit=crop&q=80"
                  alt="Mont Choisy architecture"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="py-16 sm:py-24 border-y border-border/50 bg-secondary/30">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: '32', label: t('stats.residences') },
              { number: '8', label: t('stats.floors') },
              { number: '450+', label: t('stats.terraceSize') },
              { number: '2026', label: t('stats.completion') },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="text-center">
                  <span className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground font-light italic">{stat.number}</span>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mt-3">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LIFESTYLE GRID ═══ */}
      <section className="py-24 sm:py-32 lg:py-44 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="text-center mb-16">
            <FadeIn>
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6">{t('chapter3.label')}</p>
            </FadeIn>
            <TextReveal className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.1] max-w-3xl mx-auto">
              {t('chapter3.title')}
            </TextReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
            {[
              { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80', label: t('chapter3.moment1') },
              { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80', label: t('chapter3.moment2') },
              { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&auto=format&fit=crop&q=80', label: t('chapter3.moment3') },
            ].map((img, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="overflow-hidden aspect-[3/4] group">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-[12px] tracking-[0.15em] uppercase text-muted-foreground mt-4">{img.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LIFESTYLE + INVESTMENT COMBINED ═══ */}
      <section className="py-24 sm:py-32 lg:py-44 border-t border-border/50" style={{ background: 'hsl(40 40% 94%)' }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <FadeIn>
              <div className="overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80"
                  alt="Mont Choisy residence"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>
            <div>
              <FadeIn>
                <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6">
                  {t('lifestyle.label')}
                </p>
              </FadeIn>
              <TextReveal className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.1] mb-8">
                {t('lifestyle.title')}
              </TextReveal>
              <FadeIn delay={0.2}>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light mb-10 max-w-lg">
                  {t('lifestyle.description')}
                </p>
              </FadeIn>

              {/* Investment stats inline */}
              <FadeIn delay={0.25}>
                <div className="flex flex-wrap gap-10 mb-10">
                  {[
                    { n: '7-9%', l: t('invest.yield') },
                    { n: '15%', l: t('invest.appreciation') },
                    { n: '€0', l: t('invest.tax') },
                  ].map((stat, i) => (
                    <div key={i}>
                      <span className="font-serif text-3xl sm:text-4xl text-accent italic">{stat.n}</span>
                      <p className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground mt-2">{stat.l}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <Link
                  to="/own-in-mauritius"
                  className="inline-flex items-center gap-2 text-[13px] tracking-[0.06em] text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors duration-300"
                >
                  {t('invest.cta')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-28 sm:py-36 lg:py-48 bg-background">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6">{t('cta.label')}</p>
          </FadeIn>
          <TextReveal className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.1] mb-10">
            {t('cta.title')}
          </TextReveal>
          <FadeIn delay={0.3}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-4 text-[12px] tracking-[0.15em] uppercase hover:bg-accent transition-colors duration-500"
            >
              {t('cta.button')}
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
