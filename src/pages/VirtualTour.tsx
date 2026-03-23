import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PanoramaViewer } from "@/components/PanoramaViewer";

const panoramaScenes = [
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=4096&auto=format&fit=crop&q=90",
    label: "Living Room"
  },
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=4096&auto=format&fit=crop&q=90",
    label: "Kitchen"
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=4096&auto=format&fit=crop&q=90",
    label: "Master Suite"
  },
  {
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=4096&auto=format&fit=crop&q=90",
    label: "Bathroom"
  },
  {
    url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=4096&auto=format&fit=crop&q=90",
    label: "Rooftop Terrace"
  }
];

export default function VirtualTour() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-secondary">
        <div className="container-editorial">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-caption text-accent mb-4 block"
          >
            {t("virtualTour.subtitle", "IMMERSIVE EXPERIENCE")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground mb-6"
          >
            {t("virtualTour.title", "360° Virtual Tour")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground max-w-2xl text-base md:text-lg"
          >
            {t("virtualTour.description", "Explore our luxury residences from every angle. Click and drag to look around, scroll to zoom in and out.")}
          </motion.p>
        </div>
      </section>

      <section className="section-gap">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <PanoramaViewer images={panoramaScenes} />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
