import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { href: '/residence', label: 'Projects' },
  { href: '/explore', label: 'Explore' },
  { href: '/own-in-mauritius', label: 'About' },
  { href: '/gallery', label: 'Blog' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const useLight = isHome && !isScrolled;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const linkCls = (href: string) =>
    cn(
      'text-[13px] font-medium tracking-wide transition-colors duration-300',
      useLight
        ? location.pathname === href ? 'text-white' : 'text-white/80 hover:text-white'
        : location.pathname === href ? 'text-navy' : 'text-ink-muted hover:text-navy'
    );

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="container-x">
          <div className="flex items-center justify-between h-[72px] lg:h-[84px]">
            {/* Wordmark */}
            <Link to="/" className="shrink-0 flex flex-col leading-none">
              <span className={cn(
                'font-serif text-[22px] sm:text-[26px] tracking-[0.02em] font-medium transition-colors duration-300',
                useLight ? 'text-white' : 'text-navy'
              )}>
                Mont Choisy
              </span>
              <span className={cn(
                'text-[9px] tracking-[0.32em] uppercase font-medium mt-0.5 transition-colors duration-300',
                useLight ? 'text-white/60' : 'text-teal'
              )}>
                Mauritius
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-9">
              {NAV.map(l => (
                <Link key={l.href} to={l.href} className={linkCls(l.href)}>
                  {l.label}
                </Link>
              ))}
              <button
                className={cn(
                  'flex items-center gap-1 text-[13px] font-medium transition-colors',
                  useLight ? 'text-white/80 hover:text-white' : 'text-ink-muted hover:text-navy'
                )}
              >
                EUR <ChevronDown className="h-3 w-3" />
              </button>
              <Link
                to="/contact"
                className={cn(
                  'inline-flex items-center px-6 py-3 text-[12px] tracking-[0.14em] uppercase font-medium border-2 transition-all duration-300',
                  useLight
                    ? 'border-white text-white hover:bg-white hover:text-navy'
                    : 'border-navy text-navy hover:bg-navy hover:text-white'
                )}
              >
                Contact
              </Link>
            </nav>

            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden touch-target flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu className={cn('h-6 w-6', useLight ? 'text-white' : 'text-navy')} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-navy text-white"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-6 touch-target flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <div className="h-full flex flex-col justify-center px-10">
              <nav className="space-y-3">
                {[{ href: '/', label: 'Home' }, ...NAV].map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link
                      to={l.href}
                      onClick={() => setIsOpen(false)}
                      className="block font-serif text-4xl sm:text-5xl py-2 text-white hover:text-teal-soft transition-colors"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="pt-8"
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="inline-block bg-teal text-white px-8 py-4 text-[12px] tracking-[0.14em] uppercase font-medium"
                  >
                    Contact us
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
