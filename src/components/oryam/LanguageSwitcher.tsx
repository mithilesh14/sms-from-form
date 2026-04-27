import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface Props {
  /** Color context — true when sitting over a dark image hero */
  onDark?: boolean;
  className?: string;
}

/** Minimal EN / FR pill switcher matching Oryam typography. */
export function LanguageSwitcher({ onDark = false, className }: Props) {
  const { i18n } = useTranslation();
  const current = (i18n.language || 'en').slice(0, 2).toLowerCase();

  const change = (lng: 'en' | 'fr') => {
    if (lng === current) return;
    i18n.changeLanguage(lng);
    try { localStorage.setItem('language', lng); } catch { /* ignore */ }
  };

  const base = 'text-[11px] tracking-[0.24em] uppercase font-normal transition-colors duration-300 px-1';
  const active   = onDark ? 'text-ivory' : 'text-ink';
  const inactive = onDark ? 'text-ivory/45 hover:text-ivory/85' : 'text-ink-mute hover:text-ink';

  return (
    <div
      className={cn('inline-flex items-center gap-1.5', className)}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => change('en')}
        aria-pressed={current === 'en'}
        className={cn(base, current === 'en' ? active : inactive)}
      >
        EN
      </button>
      <span className={onDark ? 'text-ivory/35' : 'text-ink-mute/50'}>·</span>
      <button
        type="button"
        onClick={() => change('fr')}
        aria-pressed={current === 'fr'}
        className={cn(base, current === 'fr' ? active : inactive)}
      >
        FR
      </button>
    </div>
  );
}
