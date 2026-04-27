import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '#residences', label: 'Residences' },
  { href: '#ownership',  label: 'Ownership' },
  { href: '#why',        label: 'Why Oryam' },
];

interface Props { variant?: 'over-light' | 'over-dark'; }

export function OryamHeader({ variant = 'over-dark' }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onDark = !scrolled && variant === 'over-dark';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'bg-ivory/95 backdrop-blur-sm border-b border-hair' : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="container-x">
        <div className="flex items-center justify-between h-[68px] lg:h-[80px]">
          <a
            href="#top"
            className={cn(
              'font-serif text-[22px] sm:text-[26px] transition-colors duration-300',
              onDark ? 'text-ivory' : 'text-ink'
            )}
            style={{ letterSpacing: '0.18em', fontWeight: 400, fontStyle: 'normal' }}
          >
            ORYAM
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  'text-[12px] font-normal tracking-[0.22em] uppercase transition-colors duration-300',
                  onDark ? 'text-ivory/85 hover:text-ivory' : 'text-ink-soft hover:text-ink'
                )}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className={cn(
                'inline-flex items-center px-7 py-3 text-[11px] tracking-[0.24em] uppercase font-normal border transition-all duration-400',
                onDark
                  ? 'border-ivory text-ivory hover:bg-ivory hover:text-ink'
                  : 'border-ink text-ink hover:bg-ink hover:text-ivory'
              )}
            >
              Private Enquiry
            </a>
          </nav>

          <a
            href="#contact"
            className={cn(
              'lg:hidden inline-flex items-center px-5 py-2.5 text-[10px] tracking-[0.22em] uppercase font-normal border',
              onDark ? 'border-ivory text-ivory' : 'border-ink text-ink'
            )}
          >
            Enquire
          </a>
        </div>
      </div>
    </header>
  );
}
