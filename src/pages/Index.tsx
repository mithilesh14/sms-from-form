import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, Calendar, Home, Building2, Star, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const propertyTypes = [
    {
      icon: Calendar,
      title: t('nav.shortTerm'),
      description: 'Curated stays for memorable experiences. Perfect for discerning travelers.',
      link: '/short-term',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
      tag: 'From $250/night',
    },
    {
      icon: Home,
      title: t('nav.longTerm'),
      description: 'Make our exceptional residences your sanctuary. Flexible lease terms.',
      link: '/long-term',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
      tag: 'From $3,500/mo',
    },
    {
      icon: Building2,
      title: t('nav.forSale'),
      description: 'Own a piece of architectural excellence. Investment-grade properties.',
      link: '/for-sale',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=80',
      tag: 'From $850K',
    },
  ];

  const features = [
    { icon: Sparkles, title: 'Premium Finishes', desc: 'Handcrafted details throughout' },
    { icon: MapPin, title: 'Prime Locations', desc: 'Carefully selected neighborhoods' },
    { icon: Star, title: 'White-Glove Service', desc: 'Concierge at your fingertips' },
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&auto=format&fit=crop&q=80',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&auto=format&fit=crop&q=80)',
            }}
          />
        </motion.div>
        
        <div className="hero-overlay absolute inset-0" />
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-5 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-white/70 
                           border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
              Luxury Residences
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-[0.95]"
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-earth-charcoal hover:bg-white/90 rounded-none px-10 py-7 text-sm 
                         tracking-widest uppercase font-medium transition-all duration-300"
            >
              <Link to="/residences" className="flex items-center gap-3">
                {t('hero.exploreButton')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white 
                         rounded-none px-10 py-7 text-sm tracking-widest uppercase font-medium"
            >
              <Link to="/contact">
                {t('hero.bookTourButton')}
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3 text-white/60"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          INTRO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-background relative">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
                About TerraLuxe
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-[1.1]">
                Where Nature Meets
                <span className="text-primary"> Refined Living</span>
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  We believe that extraordinary living spaces should harmonize with their 
                  natural surroundings. Each TerraLuxe property is thoughtfully designed 
                  to bring the outside in.
                </p>
                <p>
                  Our collection of residences represents the pinnacle of sustainable luxury—
                  where organic materials, natural light, and timeless architecture create 
                  spaces that nurture both body and soul.
                </p>
              </div>
              
              <div className="mt-10 flex gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="flex flex-col items-start"
                  >
                    <feature.icon className="h-5 w-5 text-primary mb-2" />
                    <h4 className="text-sm font-medium text-foreground">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80"
                  alt="Luxury interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary/10 -z-10" />
                <div className="absolute -top-8 -right-8 w-32 h-32 border border-primary/20 -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROPERTY TYPES SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-secondary/50 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="container-xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
              Our Collection
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              {t('properties.title')}
            </h2>
            <div className="divider-organic mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('properties.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {propertyTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link to={type.link} className="group block h-full">
                  <div className="relative h-full bg-card overflow-hidden">
                    {/* Image */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={type.image}
                        alt={type.title}
                        className="w-full h-full object-cover transition-transform duration-700 
                                   group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-earth-charcoal/80 
                                      via-earth-charcoal/20 to-transparent" />
                      
                      {/* Tag */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-block text-xs tracking-wider text-white/90 
                                         bg-earth-charcoal/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          {type.tag}
                        </span>
                      </div>
                      
                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <type.icon className="h-5 w-5 text-white/80" />
                          <h3 className="font-serif text-2xl text-white">
                            {type.title}
                          </h3>
                        </div>
                        <p className="text-white/70 text-sm mb-4 line-clamp-2">
                          {type.description}
                        </p>
                        <span className="inline-flex items-center text-sm text-white font-medium 
                                         group-hover:text-primary transition-colors duration-300">
                          {t('properties.viewDetails')}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 
                                                 group-hover:translate-x-2" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          GALLERY PREVIEW
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-background">
        <div className="container-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">
                Visual Journey
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                Spaces That <span className="italic">Inspire</span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Button 
                asChild 
                variant="outline" 
                className="rounded-none border-foreground/20 hover:border-primary hover:text-primary"
              >
                <Link to="/gallery" className="flex items-center gap-2">
                  View Full Gallery
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`image-zoom ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <div className={`relative ${index === 0 ? 'aspect-square' : 'aspect-square'} 
                                 overflow-hidden bg-muted`}>
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&auto=format&fit=crop&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-earth-charcoal/70" />
        
        <div className="container-xl relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-primary mb-6 block">
              Begin Your Journey
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
              {t('tour.title')}
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              {t('tour.subtitle')}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none 
                         px-12 py-7 text-sm tracking-widest uppercase"
            >
              <Link to="/contact" className="flex items-center gap-3">
                {t('nav.bookTour')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;