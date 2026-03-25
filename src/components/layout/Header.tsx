import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
    { href: '/', label: 'Home' },
    { href: '/residence', label: 'Residences' },
    { href: '/gallery', label: 'Gallery' },
  ];

  const rightLinks = [
    { href: '/explore', label: 'Availability' },
    { href: '/own-in-mauritius', label: 'Ownership' },
    { href: '/contact', label: 'Contact' },
  ];

  const allLinks = [
    ...leftLinks,
    { href: '/virtual-tour', label: '360° Tour' },
    ...rightLinks,
  ];

  const navLinkClass = (href: string) =>
    cn(
      "text-[13px] tracking-[0.04em] font-normal transition-colors duration-300 relative pb-0.5 whitespace-nowrap",
      isScrolled
        ? (location.pathname === href ? "text-foreground border-b border-foreground" : "text-muted-foreground hover:text-foreground")
        : (location.pathname === href ? "text-white border-b border-white" : "text-white/70 hover:text-white")
    );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "bg-background shadow-sm" : "bg-transparent"
        )}
      >
        <div className="w-full px-6 sm:px-10 lg:px-14">
          <div className="flex items-center justify-between h-[70px] lg:h-[90px]">

            {/* Left nav — desktop */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-10 flex-1">
              {leftLinks.map(link => (
                <Link key={link.href} to={link.href} className={navLinkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Center logo */}
            <Link to="/" className="relative z-10 flex flex-col items-center shrink-0">
              <span className={cn(
                "text-[20px] sm:text-[24px] lg:text-[28px] tracking-[0.25em] uppercase font-semibold font-sans transition-colors duration-500",
                isScrolled ? "text-foreground" : "text-white"
              )}>
                MONT CHOISY
              </span>
              <span className={cn(
                "text-[8px] sm:text-[9px] tracking-[0.35em] uppercase font-normal mt-0.5 transition-colors duration-500",
                isScrolled ? "text-muted-foreground" : "text-white/60"
              )}>
                Oceanfront Living
              </span>
            </Link>

            {/* Right nav — desktop */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-10 flex-1 justify-end">
              {rightLinks.map(link => (
                <Link key={link.href} to={link.href} className={navLinkClass(link.href)}>
                  {link.label}
                </Link>
              ))}

              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className={cn(
                  "flex items-center gap-1.5 transition-colors min-h-[44px] ml-2",
                  isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"
                )}
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="text-[12px] tracking-[0.08em]">{i18n.language === 'en' ? 'FR' : 'EN'}</span>
              </button>
            </nav>

            {/* Mobile: lang + hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className={cn(
                  "flex items-center gap-1 transition-colors min-h-[44px]",
                  isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"
                )}
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="text-[12px]">{i18n.language === 'en' ? 'FR' : 'EN'}</span>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="w-6 flex flex-col gap-[5px]">
                  <span className={cn("block h-[2px] rounded-full transition-colors duration-500", isScrolled ? "bg-foreground" : "bg-white")} />
                  <span className={cn("block h-[2px] rounded-full w-4 transition-colors duration-500", isScrolled ? "bg-foreground" : "bg-white")} />
                  <span className={cn("block h-[2px] rounded-full transition-colors duration-500", isScrolled ? "bg-foreground" : "bg-white")} />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-border/50" />
      </header>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-6 sm:right-10 min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>

            <div className="h-full flex flex-col justify-center px-10 sm:px-16 lg:px-24">
              <nav className="space-y-1">
                {allLinks.map((link, index) => (
                  <div key={link.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 60, opacity: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl py-2 transition-all duration-300",
                          location.pathname === link.href
                            ? "text-foreground"
                            : "text-muted-foreground/50 hover:text-foreground hover:translate-x-3"
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
                transition={{ delay: 0.4 }}
                className="mt-14"
              >
                <div className="h-px bg-border mb-6" />
                <div className="flex items-center gap-6 text-[13px] text-muted-foreground">
                  <a href="mailto:residences@montchoisy.mu" className="hover:text-foreground transition-colors">
                    residences@montchoisy.mu
                  </a>
                  <a href="tel:+2305555100" className="hover:text-foreground transition-colors">
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
