import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Terms() {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("terms.acceptance.title"),
      content: t("terms.acceptance.content")
    },
    {
      title: t("terms.services.title"),
      content: t("terms.services.content")
    },
    {
      title: t("terms.bookings.title"),
      content: t("terms.bookings.content")
    },
    {
      title: t("terms.liability.title"),
      content: t("terms.liability.content")
    },
    {
      title: t("terms.changes.title"),
      content: t("terms.changes.content")
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-secondary">
        <div className="container-editorial">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-6xl text-foreground"
          >
            {t('footer.termsOfService')}
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-gap">
        <div className="container-editorial max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mb-12 text-lg"
          >
            {t('terms.intro')}
          </motion.p>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-t border-border mt-16 pt-8"
          >
            <p className="text-sm text-muted-foreground">
              {t('terms.lastUpdated')}: January 2025
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
