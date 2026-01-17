import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Building2, Star, Shield, Waves, Users, Car, Coffee, PawPrint } from 'lucide-react';

const Residence = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '32', label: 'Floors' },
    { value: '156', label: 'Residences' },
    { value: '2024', label: 'Established' },
    { value: '24/7', label: 'Concierge' },
  ];

  const amenities = [
    { icon: Waves, name: t('amenities.list.pool') },
    { icon: Star, name: t('amenities.list.fitness') },
    { icon: Users, name: t('amenities.list.lounge') },
    { icon: Coffee, name: t('amenities.list.theater') },
    { icon: Building2, name: t('amenities.list.business') },
    { icon: Car, name: t('amenities.list.parking') },
    { icon: Shield, name: t('amenities.list.concierge') },
    { icon: PawPrint, name: t('amenities.list.pets') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&auto=format&fit=crop&q=80)',
          }}
        />
        <div className="overlay-cinematic absolute inset-0" />
        
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24">
          <div className="container-editorial">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-caption text-white/60 mb-4 block"
            >
              {t('residence.subtitle')}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-5xl md:text-7xl text-white"
            >
              {t('residence.title')}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-12">
        <div className="container-editorial">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="font-serif text-4xl md:text-5xl text-primary-foreground mb-2 number-display">
                  {stat.value}
                </p>
                <p className="text-caption text-primary-foreground/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section-gap">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif text-foreground leading-relaxed text-center"
          >
            {t('residence.description')}
          </motion.p>
        </div>
      </section>

      {/* Feature Images */}
      <section className="section-gap-sm bg-secondary">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-[4/5] img-zoom"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80"
                alt="Interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="aspect-[4/5] img-zoom"
            >
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80"
                alt="Kitchen"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="section-gap">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-caption text-accent mb-4 block">
              {t('amenities.subtitle')}
            </span>
            <h2 className="text-headline text-foreground">
              {t('amenities.title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 border border-border flex items-center justify-center
                                group-hover:border-accent group-hover:bg-accent/5 transition-all duration-500">
                  <amenity.icon className="h-6 w-6 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <p className="text-sm text-foreground">{amenity.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <section className="relative h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&auto=format&fit=crop&q=80)',
          }}
        />
      </section>

      <Footer />
    </div>
  );
};

export default Residence;