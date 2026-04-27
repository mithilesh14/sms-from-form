import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Hide header entirely on Paradise gateway
  if (location.pathname === '/') return null;

  const pagesWithDarkHero = ['/home', '/residence', '/own-in-mauritius'];
  const hasDarkHero = pagesWithDarkHero.includes(location.pathname);
  const useLight = hasDarkHero && !isScrolled;

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

  const navLinks = [
    { href: '/home', label: 'Lifestyle' },
    { href: '/residence', label: 'Residences' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  const linkClass = (href: string) =>
    cn(
      'text-[12px] tracking-[0.18em] uppercase font-sans font-light transition-colors duration-300 whitespace-nowrap',
      useLight
        ? location.pathname === href ? 'text-offwhite' : 'text-offwhite/65 hover:text-offwhite'
        : location.pathname === href ? 'text-ocean' : 'text-ocean/60 hover:text-ocean'
    );

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-offwhite/85 backdrop-blur-xl border-b border-gold/20'
            : 'bg-transparent'
        )}
      >
        <div className="w-full px-6 sm:px-10 lg:px-14">
          <div className="flex items-center justify-between h-[70px] lg:h-[84px]">
            {/* Wordmark */}
            <Link to="/home" className="shrink-0">
              <span
                className={cn(
                  'text-[15px] sm:text-[16px] tracking-[0.32em] uppercase font-sans font-medium transition-colors duration-500',
                  useLight ? 'text-offwhite' : 'text-ocean'
                )}
              >
                Mont Choisy
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map(link => (
                <Link key={link.href} to={link.href} className={linkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-coral text-offwhite px-6 py-3 text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-coral/85 transition-colors duration-300"
              >
                Enquire
              </Link>
            </nav>

            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden touch-target flex items-center justify-center"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="w-6 flex flex-col gap-[5px]">
                <span className={cn('block h-px transition-colors duration-500', useLight ? 'bg-offwhite' : 'bg-ocean')} />
                <span className={cn('block h-px w-4 transition-colors duration-500', useLight ? 'bg-offwhite' : 'bg-ocean')} />
                <span className={cn('block h-px transition-colors duration-500', useLight ? 'bg-offwhite' : 'bg-ocean')} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-ocean text-offwhite"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-6 sm:right-10 touch-target flex items-center justify-center z-10"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-offwhite" />
            </button>

            <div className="h-full flex flex-col justify-center px-10 sm:px-16">
              <nav className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block font-serif italic text-4xl sm:text-5xl py-2 text-offwhite hover:text-coral transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: navLinks.length * 0.05 }}
                  className="pt-8"
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="inline-block bg-coral text-offwhite px-8 py-4 text-[12px] tracking-[0.25em] uppercase"
                  >
                    Enquire
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
