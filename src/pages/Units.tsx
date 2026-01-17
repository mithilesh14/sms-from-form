import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Bed, Bath, Maximize, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Units = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get('type') || 'all';

  const filters = [
    { id: 'all', label: 'All Units' },
    { id: 'sale', label: t('units.forSale') },
    { id: 'short', label: t('units.shortTerm') },
    { id: 'long', label: t('units.longTerm') },
  ];

  const units = [
    {
      id: 1,
      name: 'Penthouse A',
      type: 'sale',
      floor: 32,
      beds: 3,
      baths: 3.5,
      sqft: 3200,
      price: '$2,450,000',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Suite 2401',
      type: 'short',
      floor: 24,
      beds: 2,
      baths: 2,
      sqft: 1450,
      price: '$450/night',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Residence 1802',
      type: 'long',
      floor: 18,
      beds: 2,
      baths: 2,
      sqft: 1680,
      price: '$5,200/mo',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      name: 'Studio 1204',
      type: 'short',
      floor: 12,
      beds: 1,
      baths: 1,
      sqft: 680,
      price: '$280/night',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 5,
      name: 'Residence 2102',
      type: 'sale',
      floor: 21,
      beds: 2,
      baths: 2,
      sqft: 1520,
      price: '$1,150,000',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 6,
      name: 'Suite 1506',
      type: 'long',
      floor: 15,
      beds: 1,
      baths: 1,
      sqft: 920,
      price: '$3,800/mo',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const filteredUnits = activeFilter === 'all' 
    ? units 
    : units.filter(u => u.type === activeFilter);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'sale': return t('units.forSale');
      case 'short': return t('units.shortTerm');
      case 'long': return t('units.longTerm');
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-secondary">
        <div className="container-editorial">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-caption text-accent mb-4 block"
          >
            {t('units.subtitle')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl text-foreground mb-12"
          >
            {t('units.title')}
          </motion.h1>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSearchParams(filter.id === 'all' ? {} : { type: filter.id })}
                className={cn(
                  "text-caption px-6 py-3 border transition-all duration-500",
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUnits.map((unit, index) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                layout
              >
                <Link to="/contact" className="group block">
                  <div className="relative overflow-hidden mb-5">
                    <div className="aspect-[4/3] img-zoom">
                      <img
                        src={unit.image}
                        alt={unit.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <span className="absolute top-4 left-4 text-caption bg-background/90 backdrop-blur-sm px-3 py-1.5">
                      {getTypeLabel(unit.type)}
                    </span>
                  </div>

                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-serif text-xl text-foreground group-hover:text-accent transition-colors duration-500">
                        {unit.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t('units.details.floor')} {unit.floor}
                      </p>
                    </div>
                    <p className="font-serif text-lg text-accent">
                      {unit.price}
                    </p>
                  </div>

                  <div className="flex gap-6 text-sm text-muted-foreground pt-4 border-t border-border">
                    <span className="flex items-center gap-2">
                      <Bed className="h-4 w-4" />
                      {unit.beds} {t('common.beds')}
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
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <p className="text-muted-foreground mb-6">
              {t('contact.subtitle')}
            </p>
            <Link 
              to="/contact"
              className="btn-premium inline-flex items-center gap-3 px-10 py-5"
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