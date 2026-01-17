import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { href: '/residence', label: t('nav.residence') },
    { href: '/units', label: t('nav.units') },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Top decorative line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      
      {/* Main Footer Content */}
      <div className="container-editorial py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-8">
              <span className="font-serif text-4xl">
                <span className="font-light italic">The</span>
                {' '}
                <span className="font-medium">Verso</span>
              </span>
            </Link>
            
            <p className="text-primary-foreground/60 text-lg font-light leading-relaxed max-w-md mb-10">
              {t('footer.tagline')}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 border border-primary-foreground/20 flex items-center justify-center 
                             text-primary-foreground/60 hover:text-accent hover:border-accent transition-colors duration-500"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-caption text-primary-foreground/40 mb-8">Navigation</h4>
            <nav className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 
                             inline-flex items-center gap-2 group text-sm"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 
                                           group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 
                                           transition-all duration-300" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-caption text-primary-foreground/40 mb-8">{t('nav.contact')}</h4>
            <div className="space-y-4 text-sm text-primary-foreground/70">
              <p>{t('contact.info.address')}</p>
              <p>{t('contact.info.city')}</p>
              <div className="pt-4">
                <a 
                  href={`tel:${t('contact.info.phone')}`}
                  className="block hover:text-primary-foreground transition-colors"
                >
                  {t('contact.info.phone')}
                </a>
                <a 
                  href={`mailto:${t('contact.info.email')}`}
                  className="block hover:text-primary-foreground transition-colors"
                >
                  {t('contact.info.email')}
                </a>
              </div>
              <p className="pt-4 text-primary-foreground/50">{t('contact.info.hours')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-editorial py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} The Verso. {t('footer.copyright')}
          </p>
          <div className="flex gap-8 text-xs text-primary-foreground/40">
            <Link to="/privacy" className="hover:text-primary-foreground/70 transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-primary-foreground/70 transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}