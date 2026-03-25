import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn, TextReveal } from '@/components/ChapterSection';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const Residence = () => {
  const { t } = useTranslation();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Cinematic Hero */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center ken-burns"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&auto=format&fit=crop&q=80)',
          }}
        />
        <div className="overlay-cinematic absolute inset-0 z-[1]" />

        <div className="relative z-[2] h-full flex flex-col justify-end pb-[12vh]">
          <div className="container-editorial">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-caption text-white/50 mb-6"
            >
              {t('residence.subtitle', 'The Vision')}
            </motion.p>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className="font-serif text-display text-foreground max-w-4xl"
              >
                {t('residence.title', 'The Architectural Vision')}
              </motion.h1>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-gap">
        <div className="container-narrow text-center">
          <FadeIn>
            <div className="divider-editorial mx-auto mb-10" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="font-serif text-title text-foreground leading-relaxed">
              {t('residence.description', 'A dialogue between land and sea. Mont Choisy rises with purpose, its architecture shaped by the rhythms of island life and the purity of natural light.')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Parallax Image + Text */}
      <section ref={parallaxRef} className="relative h-[80vh] overflow-hidden">
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&auto=format&fit=crop&q=80"
            alt="Architecture detail"
            className="w-full h-[120%] object-cover"
          />
        </motion.div>
        <div className="hero-overlay-premium absolute inset-0" />
        <div className="relative z-10 h-full flex items-end pb-16 md:pb-24">
          <div className="container-editorial">
            <FadeIn>
              <p className="text-caption text-foreground/60 mb-4">Design Principles</p>
            </FadeIn>
            <TextReveal className="font-serif text-headline text-foreground max-w-2xl">
              Every line responds to the light
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Materials & Craft */}
      <section className="section-gap">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <p className="text-caption text-accent mb-6">Materials & Craft</p>
              </FadeIn>
              <TextReveal className="font-serif text-headline text-foreground mb-8">
                Honest materials, timeless expression
              </TextReveal>
              <FadeIn delay={0.2}>
                <p className="text-body-lg text-muted-foreground mb-6">
                  Local basalt stone, sustainably sourced tropical hardwoods, and hand-finished concrete unite to create spaces that are simultaneously monumental and intimate.
                </p>
                <p className="text-body-lg text-muted-foreground">
                  Each residence features floor-to-ceiling glazing that frames the Indian Ocean as a living artwork, blurring the threshold between architecture and nature.
                </p>
              </FadeIn>
            </div>
            <FadeIn direction="left">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-editorial overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80"
                    alt="Material detail"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="aspect-editorial overflow-hidden mt-12">
                  <img
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop&q=80"
                    alt="Interior light"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="section-gap bg-secondary/50">
        <div className="container-editorial text-center">
          <FadeIn>
            <p className="text-caption text-accent mb-6">Shared Spaces</p>
          </FadeIn>
          <TextReveal className="font-serif text-headline text-foreground mx-auto max-w-3xl mb-16">
            Where private meets communal
          </TextReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Infinity Pool', desc: 'Oceanfront, 25m lap pool' },
              { name: 'Wellness Spa', desc: 'Treatment rooms & sauna' },
              { name: 'Private Cinema', desc: '20-seat screening room' },
              { name: 'Concierge', desc: '24/7 personal service' },
              { name: 'Wine Cellar', desc: 'Climate-controlled vault' },
              { name: 'Fitness Studio', desc: 'Technogym equipped' },
              { name: 'Zen Garden', desc: 'Tropical meditation space' },
              { name: 'Secure Parking', desc: 'Underground, EV charging' },
            ].map((amenity, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="py-6 border-t border-border/30">
                  <h4 className="font-serif text-lg text-foreground mb-2">{amenity.name}</h4>
                  <p className="text-xs text-muted-foreground">{amenity.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Full bleed image */}
      <section className="relative h-[50vh] sm:h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&auto=format&fit=crop&q=80)',
          }}
        />
      </section>

      {/* CTA */}
      <section className="py-28 sm:py-36">
        <div className="container-editorial text-center">
          <FadeIn>
            <p className="text-caption text-accent mb-6">Explore Further</p>
          </FadeIn>
          <TextReveal className="font-serif text-headline text-foreground mx-auto max-w-3xl mb-10">
            Discover your residence
          </TextReveal>
          <FadeIn delay={0.3}>
            <Link
              to="/explore"
              className="btn-premium inline-flex items-center gap-3 px-12 py-5"
            >
              <span>Interactive Building Explorer</span>
              <ArrowRight className="h-4 w-4 relative z-10" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Residence;
