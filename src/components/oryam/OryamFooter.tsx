import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export function OryamFooter() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const anchor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <footer className="bg-night text-ivory">
      <div className="container-x py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="font-serif text-[22px] text-ivory" style={{ letterSpacing: '0.18em', fontWeight: 400 }}>
            ORYAM
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] tracking-[0.24em] uppercase text-ivory/70">
            <a href={anchor('residences')} className="hover:text-gold transition-colors">{t('oryam.nav.residences')}</a>
            <span className="text-gold/40">·</span>
            <a href={anchor('ownership')}  className="hover:text-gold transition-colors">{t('oryam.nav.ownership')}</a>
            <span className="text-gold/40">·</span>
            <a href={anchor('why')}        className="hover:text-gold transition-colors">{t('oryam.nav.why')}</a>
            <span className="text-gold/40">·</span>
            <a href={anchor('contact')}    className="hover:text-gold transition-colors">{t('oryam.nav.enquireShort')}</a>
          </nav>

          <div className="text-[11px] leading-relaxed text-ivory/50 md:text-right max-w-sm">
            {t('oryam.footer.copy')}<br />
            {t('oryam.footer.legal')}

            <div className="mt-5 pt-5 border-t border-ivory/10 flex md:justify-end">
              <Link
                to="/admin"
                className="text-[10px] tracking-[0.24em] uppercase text-ivory/45 hover:text-gold transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
