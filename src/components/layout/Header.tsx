import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/residences', label: t('nav.residences') },
    { href: '/for-sale', label: t('nav.forSale') },
    { href: '/rentals', label: t('nav.rentals') },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground">
      <div className="container-luxury">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl tracking-wider">
            LUXE RESIDENCES
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="nav-link text-sm tracking-wide uppercase hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm hover:text-accent transition-colors"
            >
              <Globe className="h-4 w-4" />
              {i18n.language.toUpperCase()}
            </button>
            <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link to="/book-tour">{t('nav.bookTour')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 pb-6" : "max-h-0"
        )}>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm tracking-wide uppercase hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-primary-foreground/20">
              <button onClick={toggleLanguage} className="flex items-center gap-1 text-sm">
                <Globe className="h-4 w-4" />
                {i18n.language.toUpperCase()}
              </button>
              <Button asChild size="sm" className="bg-accent text-accent-foreground">
                <Link to="/book-tour">{t('nav.bookTour')}</Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
