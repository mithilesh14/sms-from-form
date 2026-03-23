import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PanoramaViewer } from '@/components/PanoramaViewer';
import { FadeIn, TextReveal } from '@/components/ChapterSection';
import { useState, useRef } from 'react';
import { Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

const panoramaScenes = [
  { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=4096&auto=format&fit=crop&q=90', label: 'Living Room' },
  { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=4096&auto=format&fit=crop&q=90', label: 'Kitchen' },
  { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=4096&auto=format&fit=crop&q=90', label: 'Master Suite' },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=4096&auto=format&fit=crop&q=90', label: 'Grand Hall' },
  { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=4096&auto=format&fit=crop&q=90', label: 'Rooftop' },
];

export default function VirtualTour() {
  const { t } = useTranslation();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [ambientSound, setAmbientSound] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://cdn.freesound.org/previews/527/527604_2744307-lq.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    if (ambientSound) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setAmbientSound(!ambientSound);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-36 pb-10 md:pt-44 md:pb-14">
        <div className="container-editorial">
          <FadeIn>
            <p className="text-caption text-accent mb-8">
              {t('virtualTour.subtitle', 'Immersive Experience')}
            </p>
          </FadeIn>
          <TextReveal className="font-serif text-headline text-foreground mb-8">
            {t('virtualTour.title', '360° Virtual Tour')}
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-body-lg text-muted-foreground max-w-2xl">
              {t('virtualTour.description', 'Step inside our residences. Drag to look around, scroll to zoom. Toggle ambient sound for the full experience.')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Viewer */}
      <section className="section-gap-sm">
        <div className="container-wide">
          <motion.div
            ref={viewerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <PanoramaViewer images={panoramaScenes} />

            {/* Ambient controls */}
            <div className="absolute top-4 right-4 flex gap-2 z-20">
              <button
                onClick={toggleSound}
                className="w-11 h-11 glass-panel flex items-center justify-center hover:bg-background/80 transition-all"
                aria-label={ambientSound ? 'Mute' : 'Play ambient sound'}
              >
                {ambientSound ? (
                  <Volume2 className="h-4 w-4 text-accent" />
                ) : (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              <button
                onClick={toggleFullscreen}
                className="w-11 h-11 glass-panel flex items-center justify-center hover:bg-background/80 transition-all"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4 text-foreground" />
                ) : (
                  <Maximize className="h-4 w-4 text-foreground" />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
