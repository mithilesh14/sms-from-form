import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/residences', label: t('nav.residences') },
    { href: '/short-term', label: t('nav.shortTerm') },
    { href: '/long-term', label: t('nav.longTerm') },
    { href: '/for-sale', label: t('nav.forSale') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-background/95 backdrop-blur-lg border-b border-border/50 py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className={cn(
              "font-serif text-2xl md:text-3xl tracking-wide transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-white"
            )}
          >
            <span className="font-light">Terra</span>
            <span className="font-semibold">Luxe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm tracking-widest uppercase transition-all duration-300 relative",
                  isActive(link.href) 
                    ? isScrolled ? "text-primary" : "text-white"
                    : isScrolled 
                      ? "text-foreground/70 hover:text-primary" 
                      : "text-white/80 hover:text-white",
                  isActive(link.href) && "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-current"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              onClick={toggleLanguage}
              className={cn(
                "flex items-center gap-2 text-sm tracking-wide transition-colors",
                isScrolled ? "text-foreground/70 hover:text-primary" : "text-white/80 hover:text-white"
              )}
            >
              <Globe className="h-4 w-4" />
              {i18n.language.toUpperCase()}
            </button>
            
            <Button 
              asChild 
              className={cn(
                "rounded-none px-6 transition-all duration-300",
                isScrolled 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-white text-earth-charcoal hover:bg-white/90"
              )}
            >
              <Link to="/contact" className="flex items-center gap-2">
                {t('nav.bookTour')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <nav className="container-xl py-8 flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "text-lg tracking-wide transition-colors",
                      isActive(link.href) ? "text-primary" : "text-foreground/70 hover:text-primary"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="flex items-center gap-6 pt-6 border-t border-border"
              >
                <button 
                  onClick={toggleLanguage} 
                  className="flex items-center gap-2 text-sm text-foreground/70"
                >
                  <Globe className="h-4 w-4" />
                  {i18n.language.toUpperCase()}
                </button>
                
                <Button asChild className="btn-terra rounded-none">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    {t('nav.bookTour')}
                  </Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}