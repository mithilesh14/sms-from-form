import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Building2, Star, Shield, ChevronRight } from 'lucide-react';
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
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const unitTypes = [
    {
      type: t('units.forSale'),
      title: 'Penthouse Collection',
      subtitle: 'Own your sanctuary',
      price: 'From $1.2M',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
      link: '/units?type=sale',
    },
    {
      type: t('units.shortTerm'),
      title: 'Furnished Suites',
      subtitle: 'Flexible stays',
      price: 'From $350/night',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
      link: '/units?type=short',
    },
    {
      type: t('units.longTerm'),
      title: 'Signature Residences',
      subtitle: 'Annual leases',
      price: 'From $4,500/mo',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      link: '/units?type=long',
    },
  ];

  const features = [
    { 
      icon: Building2, 
      title: t('residence.features.architecture'),
      desc: t('residence.features.architectureDesc')
    },
    { 
      icon: Star, 
      title: t('residence.features.views'),
      desc: t('residence.features.viewsDesc')
    },
    { 
      icon: Shield, 
      title: t('residence.features.service'),
      desc: t('residence.features.serviceDesc')
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Full viewport cinematic opening
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&auto=format&fit=crop&q=80)',
            }}
          />
        </motion.div>
        
        <div className="overlay-cinematic absolute inset-0" />
        
        <motion.div 
          style={{ opacity: heroOpacity, y: textY }}
          className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32"
        >
          <div className="container-editorial">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-6"
            >
              <span className="text-caption text-white/60">
                Minneapolis, Minnesota
              </span>
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="font-serif text-display text-white mb-8"
              >
                {t('hero.title')}
              </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl text-white/70 max-w-xl font-light leading-relaxed mb-12"
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                to="/units"
                className="btn-premium inline-flex items-center justify-center gap-3 px-8 py-4"
              >
                <span>{t('hero.explore')}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <Link 
                to="/contact"
                className="btn-outline-premium inline-flex items-center justify-center gap-3 px-8 py-4 text-white border-white/30 hover:bg-white hover:text-foreground"
              >
                <span>{t('hero.schedule')}</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
        >
          <span className="text-caption text-white/40">{t('hero.scrollText')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4 text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BUILDING INTRODUCTION - Editorial text section
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-gap bg-background">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-caption text-accent mb-6 block">
                {t('residence.subtitle')}
              </span>
              <h2 className="text-headline text-foreground mb-8">
                {t('residence.title')}
              </h2>
              <div className="divider-editorial" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pt-8"
            >
              <p className="text-body-lg text-muted-foreground mb-12">
                {t('residence.description')}
              </p>
              
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    className="flex items-start gap-5 group"
                  >
                    <div className="w-12 h-12 border border-border flex items-center justify-center 
                                    group-hover:border-accent group-hover:bg-accent/5 transition-all duration-500">
                      <feature.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BUILDING HERO IMAGE - Full bleed visual
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="aspect-[21/9] relative overflow-hidden"
        >
          <div className="img-zoom w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&auto=format&fit=crop&q=80"
              alt="The Verso Building"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          UNIT TYPES - Three pillars of offerings
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-gap bg-background">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-caption text-accent mb-6 block">
              {t('units.subtitle')}
            </span>
            <h2 className="text-headline text-foreground">
              {t('units.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {unitTypes.map((unit, index) => (
              <motion.div
                key={unit.type}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
              >
                <Link to={unit.link} className="group block">
                  <div className="relative overflow-hidden mb-6">
                    <div className="aspect-editorial img-zoom">
                      <img
                        src={unit.image}
                        alt={unit.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 
                                    transition-colors duration-700 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 border border-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      >
                        <ArrowRight className="h-6 w-6 text-white" />
                      </motion.div>
                    </div>
                  </div>
                  
                  <span className="text-caption text-accent mb-3 block">
                    {unit.type}
                  </span>
                  <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-accent transition-colors duration-500">
                    {unit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {unit.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg text-foreground">
                      {unit.price}
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent 
                                             group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          GALLERY TEASER
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-gap-sm bg-secondary">
        <div className="container-editorial">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-caption text-accent mb-4 block">
                {t('gallery.subtitle')}
              </span>
              <h2 className="text-title text-foreground">
                {t('gallery.title')}
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/gallery" 
                className="link-underline text-caption text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('common.viewAll')}
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&auto=format&fit=crop&q=80',
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="img-zoom aspect-square"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&auto=format&fit=crop&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-primary/80" />
        
        <div className="container-editorial relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-caption text-accent mb-6 block">
              {t('nav.bookTour')}
            </span>
            <h2 className="text-headline text-primary-foreground mb-8">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-primary-foreground/70 mb-12 font-light">
              {t('contact.subtitle')}
            </p>
            <Link 
              to="/contact"
              className="btn-outline-premium inline-flex items-center gap-3 px-10 py-5 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground hover:text-primary"
            >
              <span>{t('hero.schedule')}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;