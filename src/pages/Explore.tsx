import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BuildingExplorer } from '@/components/BuildingExplorer';
import { FadeIn, TextReveal } from '@/components/ChapterSection';

export default function Explore() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="container-editorial">
          <FadeIn>
            <p className="text-caption text-accent mb-4">
              {t('explore.subtitle', 'Interactive Explorer')}
            </p>
          </FadeIn>
          <TextReveal className="font-serif text-headline text-foreground mb-6">
            {t('explore.title', 'Find Your Residence')}
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-body-lg text-muted-foreground max-w-2xl">
              {t('explore.description', 'Navigate the building floor by floor. Click any floor to reveal available residences, then select a unit to explore its details, views, and sunlight.')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Explorer */}
      <section className="section-gap-sm">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <BuildingExplorer />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
