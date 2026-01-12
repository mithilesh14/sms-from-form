import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4">LUXE RESIDENCES</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Experience exceptional living in our luxury residences, designed for those who appreciate the finer things in life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4 text-accent">{t('footer.quickLinks')}</h4>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link to="/residences" className="hover:text-accent transition-colors">{t('nav.residences')}</Link>
              <Link to="/for-sale" className="hover:text-accent transition-colors">{t('nav.forSale')}</Link>
              <Link to="/rentals" className="hover:text-accent transition-colors">{t('nav.rentals')}</Link>
              <Link to="/gallery" className="hover:text-accent transition-colors">{t('nav.gallery')}</Link>
              <Link to="/contact" className="hover:text-accent transition-colors">{t('nav.contact')}</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4 text-accent">{t('footer.contactInfo')}</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <a href="mailto:info@luxeresidences.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                info@luxeresidences.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                +1 (234) 567-890
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Luxury Avenue<br />City, State 12345</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium mb-4 text-accent">{t('footer.newsletter')}</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">{t('footer.newsletterText')}</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 px-3 py-2 text-sm bg-primary-foreground/10 border border-primary-foreground/20 rounded focus:outline-none focus:border-accent"
              />
              <button type="submit" className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded hover:bg-accent/90 transition-colors">
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Luxe Residences. {t('footer.allRightsReserved')}</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-accent transition-colors">{t('footer.privacyPolicy')}</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">{t('footer.termsOfService')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
