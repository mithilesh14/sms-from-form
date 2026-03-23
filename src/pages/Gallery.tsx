import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn, TextReveal } from '@/components/ChapterSection';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80', alt: 'Penthouse living room', category: 'interiors' },
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80', alt: 'Kitchen with marble island', category: 'interiors' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80', alt: 'Master suite', category: 'interiors' },
  { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80', alt: 'Building at dusk', category: 'exterior' },
  { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80', alt: 'Rooftop terrace', category: 'amenities' },
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=80', alt: 'Designer bathroom', category: 'interiors' },
  { src: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1200&auto=format&fit=crop&q=80', alt: 'Mauritius coastline', category: 'views' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80', alt: 'Beach at sunset', category: 'views' },
  { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop&q=80', alt: 'Open living space', category: 'interiors' },
  { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&auto=format&fit=crop&q=80', alt: 'Infinity pool', category: 'amenities' },
  { src: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&auto=format&fit=crop&q=80', alt: 'Private balcony', category: 'views' },
  { src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80', alt: 'Study with ocean view', category: 'interiors' },
];

export default function Gallery() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: t('gallery.categories.all', 'All') },
    { id: 'interiors', label: t('gallery.categories.interiors', 'Interiors') },
    { id: 'exterior', label: t('gallery.categories.exterior', 'Exterior') },
    { id: 'amenities', label: t('gallery.categories.amenities', 'Amenities') },
    { id: 'views', label: t('gallery.categories.views', 'Views') },
  ];

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const navigateLightbox = (dir: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      dir === 'prev'
        ? (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
        : (lightboxIndex + 1) % filteredImages.length
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-36 pb-10 md:pt-44 md:pb-14">
        <div className="container-editorial">
          <FadeIn>
            <p className="text-caption text-accent mb-8">{t('gallery.subtitle', 'Visual Journey')}</p>
          </FadeIn>
          <TextReveal className="font-serif text-headline text-foreground mb-10">
            {t('gallery.title', 'Visual Journey')}
          </TextReveal>

          {/* Filters */}
          <FadeIn delay={0.3}>
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-caption px-6 py-3 border transition-all duration-500 ${
                    activeCategory === cat.id
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Masonry-style Grid */}
      <section className="section-gap-sm">
        <div className="container-editorial">
          <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                  onClick={() => setLightboxIndex(index)}
                  className="cursor-pointer group break-inside-avoid img-zoom"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-[1.8s] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-caption text-white/80">{image.alt}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center grain-overlay"
            style={{ background: 'hsl(20 25% 12% / 0.95)' }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={e => { e.stopPropagation(); navigateLightbox('prev'); }}
              className="absolute left-6 text-white/30 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <motion.img
              key={filteredImages[lightboxIndex].src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain relative z-10"
              onClick={e => e.stopPropagation()}
            />

            <button
              onClick={e => { e.stopPropagation(); navigateLightbox('next'); }}
              className="absolute right-6 text-white/30 hover:text-white transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 text-caption relative z-10">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
