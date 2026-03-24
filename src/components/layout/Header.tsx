import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const leftLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/residence', label: t('nav.residence') },
    { href: '/gallery', label: t('nav.gallery') },
  ];

  const rightLinks = [
    { href: '/explore', label: t('nav.explore', 'Availability') },
    { href: '/own-in-mauritius', label: t('nav.ownInMauritius', 'Own in Mauritius') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const allLinks = [
    ...leftLinks,
    { href: '/virtual-tour', label: t('nav.virtualTour', '360° Tour') },
    ...rightLinks,
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border/20"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-14 lg:px-20">
          <div className="flex items-center justify-between h-[72px] sm:h-[80px]">
            {/* Left nav links — desktop */}
            <nav className="hidden lg:flex items-center gap-8 flex-1">
              {leftLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-[11px] tracking-[0.18em] uppercase font-normal transition-colors duration-500 link-underline",
                    location.pathname === link.href
                      ? "text-foreground"
                      : isScrolled ? "text-foreground/60 hover:text-foreground" : "text-white/60 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Center logo */}
            <Link to="/" className="relative z-10 flex flex-col items-center shrink-0">
              <span className={cn(
                "text-[22px] sm:text-[26px] tracking-[0.35em] uppercase font-sans font-semibold transition-colors duration-700",
                isScrolled ? "text-foreground" : "text-white"
              )}>
                MONT CHOISY
              </span>
              <span className={cn(
                "text-[8px] tracking-[0.5em] uppercase font-normal mt-0.5 transition-colors duration-700",
                isScrolled ? "text-muted-foreground" : "text-white/40"
              )}>
                Oceanfront Living
              </span>
            </Link>

            {/* Right nav links — desktop */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-end">
              {rightLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-[11px] tracking-[0.18em] uppercase font-normal transition-colors duration-500 link-underline",
                    location.pathname === link.href
                      ? "text-foreground"
                      : isScrolled ? "text-foreground/60 hover:text-foreground" : "text-white/60 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Language + hamburger */}
              <div className="flex items-center gap-4 ml-4">
                <button
                  onClick={toggleLanguage}
                  className={cn(
                    "flex items-center gap-1.5 transition-colors min-h-[48px]",
                    isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/50 hover:text-white"
                  )}
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span className="text-[10px] tracking-[0.15em] uppercase">{i18n.language === 'en' ? 'FR' : 'EN'}</span>
                </button>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                  <div className="w-6 flex flex-col gap-1.5">
                    <motion.span
                      className={cn("block h-px origin-center", isScrolled ? "bg-foreground" : "bg-white")}
                      animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className={cn("block h-px origin-center", isScrolled ? "bg-foreground" : "bg-white")}
                      animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </button>
              </div>
            </nav>

            {/* Mobile: lang + hamburger */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={toggleLanguage}
                className={cn(
                  "flex items-center gap-1.5 transition-colors min-h-[48px]",
                  isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/50 hover:text-white"
                )}
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="text-[10px] tracking-[0.15em] uppercase">{i18n.language === 'en' ? 'FR' : 'EN'}</span>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="w-6 flex flex-col gap-1.5">
                  <motion.span
                    className={cn("block h-px origin-center", isScrolled ? "bg-foreground" : "bg-white")}
                    animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className={cn("block h-px origin-center", isScrolled ? "bg-foreground" : "bg-white")}
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
                {allLinks.map((link, index) => (
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
                    href="mailto:residences@montchoisy.mu"
                    className="text-caption text-muted-foreground hover:text-foreground transition-colors"
                  >
                    residences@montchoisy.mu
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