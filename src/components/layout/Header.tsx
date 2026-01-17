import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/residence', label: t('nav.residence') },
    { href: '/units', label: t('nav.units') },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          isScrolled 
            ? "bg-background/95 backdrop-blur-xl py-4" 
            : "bg-transparent py-6"
        )}
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="group relative"
            >
              <motion.span 
                className={cn(
                  "font-serif text-2xl md:text-3xl tracking-tight transition-colors duration-500",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                <span className="font-light italic">The</span>
                {' '}
                <span className="font-medium">Verso</span>
              </motion.span>
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-px transition-all duration-500 group-hover:w-full",
                isScrolled ? "bg-accent" : "bg-white/50"
              )} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-caption relative py-2 transition-all duration-500",
                    isActive(link.href) 
                      ? isScrolled ? "text-foreground" : "text-white"
                      : isScrolled 
                        ? "text-muted-foreground hover:text-foreground" 
                        : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                  <motion.span 
                    className={cn(
                      "absolute bottom-0 left-0 h-px",
                      isScrolled ? "bg-accent" : "bg-white"
                    )}
                    initial={false}
                    animate={{ width: isActive(link.href) ? '100%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-8">
              <button
                onClick={toggleLanguage}
                className={cn(
                  "flex items-center gap-2 text-caption transition-all duration-500 group",
                  isScrolled 
                    ? "text-muted-foreground hover:text-foreground" 
                    : "text-white/70 hover:text-white"
                )}
              >
                <Globe className="h-4 w-4" />
                <span className="relative">
                  {i18n.language.toUpperCase()}
                  <span className={cn(
                    "absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full",
                    isScrolled ? "bg-foreground" : "bg-white"
                  )} />
                </span>
              </button>
              
              <Link 
                to="/contact"
                className={cn(
                  "btn-outline-premium px-6 py-3 transition-all duration-500",
                  isScrolled 
                    ? "text-foreground border-foreground/30 hover:bg-primary hover:text-primary-foreground hover:border-primary" 
                    : "text-white border-white/40 hover:bg-white hover:text-foreground hover:border-white"
                )}
              >
                {t('nav.bookTour')}
              </Link>
            </div>

            {/* Mobile Menu Button - Touch friendly */}
            <button
              className={cn(
                "lg:hidden p-3 -mr-3 transition-colors duration-500 min-h-[48px] min-w-[48px] flex items-center justify-center",
                isScrolled ? "text-foreground" : "text-white"
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary"
            />
            
            {/* Content */}
            <div className="relative h-full flex flex-col justify-center px-6 sm:px-8 safe-area-inset">
              <nav className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block font-serif text-3xl sm:text-4xl md:text-5xl py-3 transition-colors duration-300 min-h-[52px]",
                        isActive(link.href) 
                          ? "text-primary-foreground" 
                          : "text-primary-foreground/60 hover:text-primary-foreground active:text-primary-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8 sm:mt-12 flex items-center gap-6"
              >
                <button 
                  onClick={toggleLanguage} 
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground active:text-primary-foreground transition-colors min-h-[48px] py-2"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-sm tracking-wider">{i18n.language === 'en' ? 'Français' : 'English'}</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}