import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Bed, Bath, Maximize, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Units = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: t('gallery.all') },
    { id: 'sale', label: t('units.forSale') },
    { id: 'short', label: t('units.shortTerm') },
    { id: 'long', label: t('units.longTerm') },
  ];

  const units = [
    {
      id: 1,
      type: 'sale',
      badge: t('units.forSale'),
      name: 'Penthouse Suite A',
      location: 'Floor 32 · Corner Unit',
      description: 'Expansive living with floor-to-ceiling windows and private terrace overlooking the city skyline.',
      price: '$2,450,000',
      beds: 3,
      baths: 3.5,
      sqft: 3200,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      type: 'sale',
      badge: t('units.forSale'),
      name: 'Residence 2102',
      location: 'Floor 21 · City View',
      description: 'Elegant two-bedroom with open layout and stunning sunset views.',
      price: '$1,150,000',
      beds: 2,
      baths: 2,
      sqft: 1520,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      type: 'short',
      badge: t('units.shortTerm'),
      name: 'Executive Suite 2401',
      location: 'Floor 24 · City View',
      description: 'Fully furnished luxury suite perfect for extended business stays or vacation.',
      price: '$450/night',
      beds: 2,
      baths: 2,
      sqft: 1450,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      type: 'short',
      badge: t('units.shortTerm'),
      name: 'Studio 1204',
      location: 'Floor 12 · Park View',
      description: 'Cozy studio with modern amenities, ideal for solo travelers or couples.',
      price: '$280/night',
      beds: 1,
      baths: 1,
      sqft: 680,
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 5,
      type: 'long',
      badge: t('units.longTerm'),
      name: 'Signature Residence 1802',
      location: 'Floor 18 · Park View',
      description: 'Elegant two-bedroom with premium finishes and dedicated parking space.',
      price: '$5,200/mo',
      beds: 2,
      baths: 2,
      sqft: 1680,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 6,
      type: 'long',
      badge: t('units.longTerm'),
      name: 'Suite 1506',
      location: 'Floor 15 · West Facing',
      description: 'Bright one-bedroom with home office space and beautiful sunset exposure.',
      price: '$3,800/mo',
      beds: 1,
      baths: 1,
      sqft: 920,
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const filteredUnits = activeFilter === 'all' 
    ? units 
    : units.filter(u => u.type === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 bg-secondary">
        <div className="container-editorial">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-caption text-accent mb-3 sm:mb-4 block"
          >
            {t('units.subtitle')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-headline text-foreground mb-6 sm:mb-8"
          >
            {t('units.title')}
          </motion.h1>

          {/* Filters - Scrollable on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "text-caption px-4 sm:px-6 py-2.5 sm:py-3 border transition-all duration-500 whitespace-nowrap flex-shrink-0 min-h-[44px]",
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground active:bg-muted"
                )}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Units Grid */}
      <section className="section-gap">
        <div className="container-editorial">
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredUnits.map((unit, index) => (
                <motion.div
                  key={unit.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <Link to="/contact" className="group block bg-card hover:bg-secondary active:bg-secondary transition-colors duration-500">
                    <div className="relative overflow-hidden">
                      <div className="aspect-[4/3] img-zoom">
                        <img
                          src={unit.image}
                          alt={unit.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-caption bg-accent text-accent-foreground px-2.5 py-1 sm:px-3 sm:py-1.5">
                        {unit.badge}
                      </span>
                    </div>

                    <div className="p-4 sm:p-6">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2">{unit.location}</p>
                      <h3 className="font-serif text-lg sm:text-xl text-foreground mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300">
                        {unit.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                        {unit.description}
                      </p>
                      <p className="font-serif text-lg sm:text-xl text-accent mb-3 sm:mb-4">{unit.price}</p>

                      <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground pt-3 sm:pt-4 border-t border-border">
                        <span className="flex items-center gap-1.5 sm:gap-2">
                          <Bed className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          {unit.beds} {t('common.rooms')}
                        </span>
                        <span className="flex items-center gap-1.5 sm:gap-2">
                          <Bath className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          {unit.baths} {t('common.baths')}
                        </span>
                        <span className="flex items-center gap-1.5 sm:gap-2">
                          <Maximize className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          {unit.sqft.toLocaleString()} {t('units.details.sqft')}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 sm:mt-16 md:mt-20"
          >
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              {t('contact.description')}
            </p>
            <Link 
              to="/contact"
              className="btn-premium inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 w-full sm:w-auto justify-center"
            >
              <span>{t('units.cta')}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Units;
