export function OryamFooter() {
  return (
    <footer className="bg-ocean text-cream border-t border-gold/20">
      <div className="container-x py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div
            className="font-serif italic text-cream text-[20px]"
            style={{ letterSpacing: '0.18em', fontWeight: 300 }}
          >
            ORYAM·
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] tracking-[0.24em] uppercase text-cream/70">
            <a href="#residences" className="hover:text-gold transition-colors">Residences</a>
            <span className="text-gold/40">·</span>
            <a href="#ownership"  className="hover:text-gold transition-colors">Ownership</a>
            <span className="text-gold/40">·</span>
            <a href="#why"        className="hover:text-gold transition-colors">Why Oryam</a>
            <span className="text-gold/40">·</span>
            <a href="#contact"    className="hover:text-gold transition-colors">Enquire</a>
          </nav>

          <div className="text-[11px] leading-relaxed text-cream/45 md:text-right max-w-sm">
            © 2025 Oryam Residences, Mauritius. All rights reserved.<br />
            Prices are indicative and subject to availability. IRS eligibility subject to Mauritian government approval.
          </div>
        </div>
      </div>
    </footer>
  );
}
