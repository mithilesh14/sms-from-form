import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-background border-t border-border/30">
      {/* CTA Band */}
      <div className="container-editorial py-20 sm:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-caption text-accent mb-6">{t('footer.ctaLabel', 'Private Consultation')}</p>
          <h2 className="font-serif text-headline text-foreground mb-8">
            {t('footer.ctaTitle', 'Begin Your Journey')}
          </h2>
          <Link
            to="/contact"
            className="btn-outline-premium inline-flex items-center gap-3 px-10 py-4 text-foreground border-foreground/30"
          >
            <span>{t('footer.ctaButton', 'Get in Touch')}</span>
          </Link>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/20">
        <div className="container-editorial py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/" className="font-serif text-lg text-foreground">
            <span className="font-light italic">The</span>{' '}
            <span className="font-medium">Verso</span>
            <span className="text-caption text-muted-foreground ml-3">Mauritius</span>
          </Link>

          <div className="flex flex-wrap justify-center gap-8 text-caption text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              {t('footer.terms')}
            </Link>
          </div>

          <p className="text-[10px] text-muted-foreground/50 tracking-wider">
            © {new Date().getFullYear()} The Verso. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
