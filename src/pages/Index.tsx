import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Bed, Bath, Maximize, Home, Waves, Dumbbell, Shield } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useRef } from 'react';

const Index = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const units = [
    {
      id: 1,
      type: 'sale',
      badge: t('units.forSale'),
      name: 'Penthouse Suite A',
      location: 'Floor 32 · Corner Unit',
      description: 'Expansive living with floor-to-ceiling windows and private terrace overlooking the city.',
      price: '$2,450,000',
      beds: 3,
      baths: 3.5,
      sqft: 3200,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      type: 'short',
      badge: t('units.shortTerm'),
      name: 'Executive Suite',
      location: 'Floor 24 · City View',
      description: 'Fully furnished luxury suite perfect for extended business stays.',
      price: '$450/night',
      beds: 2,
      baths: 2,
      sqft: 1450,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      type: 'long',
      badge: t('units.longTerm'),
      name: 'Signature Residence',
      location: 'Floor 18 · Park View',
      description: 'Elegant two-bedroom with premium finishes and dedicated parking.',
      price: '$5,200/mo',
      beds: 2,
      baths: 2,
      sqft: 1680,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const spaces = [
    {
      title: t('spaces.livingRooms'),
      description: t('spaces.livingRoomsDesc'),
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: t('spaces.kitchens'),
      description: t('spaces.kitchensDesc'),
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: t('spaces.bedrooms'),
      description: t('spaces.bedroomsDesc'),
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: t('spaces.bathrooms'),
      description: t('spaces.bathroomsDesc'),
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const amenities = [
    { icon: Waves, title: t('amenities.pool'), desc: t('amenities.poolDesc') },
    { icon: Dumbbell, title: t('amenities.fitness'), desc: t('amenities.fitnessDesc') },
    { icon: Shield, title: t('amenities.concierge'), desc: t('amenities.conciergeDesc') },
    { icon: Home, title: t('amenities.lounge'), desc: t('amenities.loungeDesc') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&auto=format&fit=crop&q=80)',
            }}
          />
        </motion.div>
        
        <div className="overlay-cinematic absolute inset-0" />
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-center"
        >
          <div className="container-editorial">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-caption text-white/60 mb-6 block"
            >
              Minneapolis, Minnesota
            </motion.span>
            
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="font-serif text-display text-white mb-8"
              >
                {t('hero.title')}
              </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-lg md:text-xl text-white/70 max-w-xl font-light leading-relaxed mb-12"
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <Link 
                to="/units"
                className="btn-premium inline-flex items-center justify-center gap-3 px-10 py-5"
              >
                <span>{t('hero.browseListing')}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURES SECTION - Three Pillars
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-gap bg-secondary">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-headline text-foreground mb-4">
              {t('features.title')}
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏠', title: t('features.location'), desc: t('features.locationDesc') },
              { icon: '🏢', title: t('features.propertyType'), desc: t('features.propertyTypeDesc') },
              { icon: '✨', title: t('features.amenities'), desc: t('features.amenitiesDesc') },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center p-8 border border-border bg-background hover:bg-card transition-colors duration-500"
              >
                <span className="text-4xl mb-6 block">{feature.icon}</span>
                <h3 className="font-serif text-2xl text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          NUMBERED PROCESS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-gap bg-background">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="number-display text-8xl text-accent/20">01</span>
              <h3 className="font-serif text-title text-foreground mt-4 mb-4">
                {t('process.step1.title')}
              </h3>
              <p className="text-muted-foreground font-light mb-6">
                {t('process.step1.description')}
              </p>
              <Link to="/contact" className="link-underline text-caption text-foreground">
                {t('common.learnMore')}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="img-zoom aspect-[4/3]"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
                alt="Inquire"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="img-zoom aspect-[4/3] lg:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80"
                alt="Tour"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:order-2"
            >
              <span className="number-display text-8xl text-accent/20">02</span>
              <h3 className="font-serif text-title text-foreground mt-4 mb-4">
                {t('process.step2.title')}
              </h3>
              <p className="text-muted-foreground font-light mb-6">
                {t('process.step2.description')}
              </p>
              <Link to="/contact" className="link-underline text-caption text-foreground">
                {t('nav.bookTour')}
              </Link>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="number-display text-8xl text-accent/20">03</span>
              <h3 className="font-serif text-title text-foreground mt-4 mb-4">
                {t('process.step3.title')}
              </h3>
              <p className="text-muted-foreground font-light mb-6">
                {t('process.step3.description')}
              </p>
              <Link to="/units" className="link-underline text-caption text-foreground">
                {t('hero.browseListing')}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="img-zoom aspect-[4/3]"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80"
                alt="Move In"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          RECENT LISTINGS - Card Grid
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-gap bg-secondary">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <span className="text-caption text-accent mb-4 block">{t('units.subtitle')}</span>
              <h2 className="text-headline text-foreground">{t('units.recentListing')}</h2>
            </div>
            <Link to="/units" className="link-underline text-caption text-muted-foreground hover:text-foreground hidden md:block">
              {t('common.viewAll')}
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {units.map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to="/contact" className="group block bg-background">
                  <div className="relative overflow-hidden">
                    <div className="aspect-[4/3] img-zoom">
                      <img
                        src={unit.image}
                        alt={unit.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="absolute top-4 left-4 text-caption bg-accent text-accent-foreground px-3 py-1.5">
                      {unit.badge}
                    </span>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">{unit.location}</p>
                    <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                      {unit.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {unit.description}
                    </p>
                    <p className="font-serif text-xl text-accent mb-4">{unit.price}</p>

                    <div className="flex gap-6 text-sm text-muted-foreground pt-4 border-t border-border">
                      <span className="flex items-center gap-2">
                        <Bed className="h-4 w-4" />
                        {unit.beds} {t('common.rooms')}
                      </span>
                      <span className="flex items-center gap-2">
                        <Bath className="h-4 w-4" />
                        {unit.baths} {t('common.baths')}
                      </span>
                      <span className="flex items-center gap-2">
                        <Maximize className="h-4 w-4" />
                        {unit.sqft.toLocaleString()} {t('units.details.sqft')}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link to="/units" className="btn-outline-premium inline-flex items-center gap-3 px-8 py-4">
              <span>{t('common.viewAll')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          INTERIOR SPACES SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-gap bg-background">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-caption text-accent mb-4 block">{t('spaces.subtitle')}</span>
            <h2 className="text-headline text-foreground mb-4">{t('spaces.title')}</h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              {t('spaces.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {spaces.map((space, index) => (
              <motion.div
                key={space.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden"
              >
                <div className="aspect-[16/10] img-zoom">
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div>
                    <h3 className="font-serif text-2xl text-white mb-2">{space.title}</h3>
                    <p className="text-white/80 text-sm">{space.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          POOL & AMENITIES SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative">
        <div className="aspect-[21/9] relative overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1920&auto=format&fit=crop&q=80"
            alt="Pool"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="text-caption text-white/60 mb-4 block">{t('amenities.subtitle')}</span>
              <h2 className="text-headline text-white">{t('amenities.poolTitle')}</h2>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-gap-sm bg-primary text-primary-foreground">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <amenity.icon className="h-8 w-8 mx-auto mb-4 text-accent" />
                <h3 className="font-serif text-xl mb-2">{amenity.title}</h3>
                <p className="text-sm text-primary-foreground/70">{amenity.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-gap bg-background">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-caption text-accent mb-6 block">{t('cta.subtitle')}</span>
            <h2 className="text-headline text-foreground mb-8">{t('cta.title')}</h2>
            <p className="text-body-lg text-muted-foreground mb-12">{t('cta.description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-premium inline-flex items-center justify-center gap-3 px-10 py-5">
                <span>{t('nav.bookTour')}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/units" className="btn-outline-premium inline-flex items-center justify-center gap-3 px-10 py-5">
                <span>{t('hero.browseListing')}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
