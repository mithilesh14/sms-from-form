import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '#residences', label: 'Residences' },
  { href: '#ownership',  label: 'Ownership' },
  { href: '#why',        label: 'Why Oryam' },
];

export function OryamHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-500',
        scrolled
          ? 'bg-ocean/95 backdrop-blur-sm border-b border-gold/20'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="container-x">
        <div className="flex items-center justify-between h-[72px] lg:h-[84px]">
          <a
            href="#top"
            className="font-serif italic text-cream text-[22px] sm:text-[26px]"
            style={{ letterSpacing: '0.18em', fontStyle: 'italic', fontWeight: 300 }}
          >
            ORYAM
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-cream/80 hover:text-gold text-[12px] font-normal tracking-[0.18em] uppercase transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center px-7 py-3 text-[11px] tracking-[0.24em] uppercase font-normal border border-gold bg-gold text-ocean hover:bg-transparent hover:text-gold transition-all duration-400"
            >
              Private Enquiry
            </a>
          </nav>

          {/* Mobile: logo + Enquire only */}
          <a
            href="#contact"
            className="lg:hidden inline-flex items-center px-5 py-2.5 text-[10px] tracking-[0.22em] uppercase font-normal border border-gold bg-gold text-ocean"
          >
            Enquire
          </a>
        </div>
      </div>
    </header>
  );
}
