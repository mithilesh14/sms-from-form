import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntent } from '@/contexts/IntentContext';

export function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { mode } = useIntent();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/residence', label: t('nav.residence') },
    { href: '/explore', label: t('nav.explore', 'Explore') },
    { href: '/virtual-tour', label: t('nav.virtualTour', '360° Tour') },
    { href: '/own-in-mauritius', label: t('nav.ownInMauritius', 'Own in Mauritius') },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          isScrolled ? "glass-panel" : "bg-transparent"
        )}
      >
        <div className="container-editorial py-5 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group relative z-10">
              <span className="font-serif text-xl sm:text-2xl text-foreground">
                <span className="font-light italic">The</span>{' '}
                <span className="font-medium">Verso</span>
              </span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-6">
              {mode && (
                <span className="hidden sm:block text-caption text-accent/70">
                  {mode === 'live' ? t('gateway.live', 'Live') : mode === 'invest' ? t('gateway.invest', 'Invest') : t('gateway.escape', 'Escape')}
                </span>
              )}

              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors min-h-[48px]"
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="text-caption">{i18n.language.toUpperCase()}</span>
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-10 min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="w-6 flex flex-col gap-1.5">
                  <motion.span
                    className="block h-px bg-foreground origin-center"
                    animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="block h-px bg-foreground origin-center"
                    animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 grain-overlay"
            style={{ background: 'hsl(42 50% 96% / 0.98)' }}
          >
            <div className="h-full flex flex-col justify-center container-editorial relative z-10">
              <nav className="space-y-1 sm:space-y-2">
                {navLinks.map((link, index) => (
                  <div key={link.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 80, opacity: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl py-1.5 transition-all duration-500",
                          location.pathname === link.href
                            ? "text-foreground"
                            : "text-muted-foreground/40 hover:text-foreground hover:translate-x-4"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16 sm:mt-20"
              >
                <div className="divider-editorial mb-8" />
                <div className="flex items-center gap-8">
                  <a
                    href="mailto:residences@theverso.mu"
                    className="text-caption text-muted-foreground hover:text-foreground transition-colors"
                  >
                    residences@theverso.mu
                  </a>
                  <a
                    href="tel:+2305555100"
                    className="text-caption text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +230 555 0100
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
