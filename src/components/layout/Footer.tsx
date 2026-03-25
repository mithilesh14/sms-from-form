import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground grain-overlay relative">
      {/* CTA Band */}
      <div className="container-editorial py-24 sm:py-32 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-caption text-primary-foreground/40 mb-8 tracking-[0.3em]">
            {t('footer.ctaLabel', 'Private Consultation')}
          </p>
          <h2 className="font-serif text-headline text-primary-foreground mb-10">
            {t('footer.ctaTitle', 'Begin Your Journey')}
          </h2>
          <Link
            to="/contact"
            className="relative border border-primary-foreground/20 bg-transparent font-light tracking-[0.15em] uppercase text-[10.5px]
                       min-h-[52px] px-12 py-4 inline-flex items-center gap-3
                       text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-700"
          >
            <span>{t('footer.ctaButton', 'Get in Touch')}</span>
          </Link>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 relative z-10">
        <div className="container-editorial py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/" className="text-[18px] tracking-[0.3em] uppercase font-sans font-semibold text-primary-foreground">
            MONT CHOISY
          </Link>

          <div className="flex flex-wrap justify-center gap-8 text-caption text-primary-foreground/40">
            <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-primary-foreground transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to="/data-rights" className="hover:text-primary-foreground transition-colors">
              Data Rights
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-[10px] text-primary-foreground/20 tracking-wider">
              © {new Date().getFullYear()} Mont Choisy. {t('footer.copyright')}
            </p>
            <Link to="/admin" className="text-[10px] text-primary-foreground/10 hover:text-primary-foreground/30 transition-colors tracking-wider">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}