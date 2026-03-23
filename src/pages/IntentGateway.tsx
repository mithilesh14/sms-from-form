import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useIntent, IntentMode } from '@/contexts/IntentContext';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState } from 'react';

const intentImages: Record<string, string> = {
  live: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&auto=format&fit=crop&q=80',
  invest: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&auto=format&fit=crop&q=80',
  escape: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&auto=format&fit=crop&q=80',
};

export default function IntentGateway() {
  const { setMode } = useIntent();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [hoveredIntent, setHoveredIntent] = useState<string | null>(null);

  const handleSelect = (mode: IntentMode) => {
    setMode(mode);
    navigate('/');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const intents: { key: IntentMode; label: string; subtitle: string }[] = [
    { key: 'live', label: t('gateway.live'), subtitle: t('gateway.liveSubtitle', 'Make it your home') },
    { key: 'invest', label: t('gateway.invest'), subtitle: t('gateway.investSubtitle', 'Build your portfolio') },
    { key: 'escape', label: t('gateway.escape'), subtitle: t('gateway.escapeSubtitle', 'Discover the lifestyle') },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden grain-overlay">
      {/* Background images that crossfade */}
      {Object.entries(intentImages).map(([key, url]) => (
        <motion.div
          key={key}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${url})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredIntent === key ? 0.45 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}

      {/* Default warm base */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: 'linear-gradient(135deg, hsl(42 50% 96%) 0%, hsl(38 35% 91%) 100%)',
          opacity: hoveredIntent ? 0 : 1,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/30" />

      {/* Language toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={toggleLanguage}
        className="absolute top-8 right-8 z-10 flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors min-h-[48px]"
      >
        <Globe className="h-4 w-4" />
        <span className="text-caption">{i18n.language === 'en' ? 'FR' : 'EN'}</span>
      </motion.button>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-20 sm:mb-28"
        >
          <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground">
            <span className="font-light italic">The</span>{' '}
            <span className="font-medium">Verso</span>
          </span>
          <p className="text-caption text-foreground/35 mt-4 text-center tracking-[0.3em]">
            {t('gateway.subtitle')}
          </p>
        </motion.div>

        {/* Intent choices */}
        <div className="flex flex-col sm:flex-row items-center gap-12 sm:gap-20 md:gap-28">
          {intents.map((intent, index) => (
            <motion.button
              key={intent.key}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 + index * 0.15 }}
              onMouseEnter={() => setHoveredIntent(intent.key)}
              onMouseLeave={() => setHoveredIntent(null)}
              onClick={() => handleSelect(intent.key)}
              className="group relative text-center"
            >
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground/30 
                             group-hover:text-foreground transition-colors duration-700 cursor-pointer italic block">
                {intent.label}
              </span>
              <span className="text-caption text-foreground/0 group-hover:text-foreground/40 transition-all duration-500 mt-3 block">
                {intent.subtitle}
              </span>
              <motion.span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-accent"
                initial={{ width: 0 }}
                whileHover={{ width: '60%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Skip link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          onClick={() => handleSelect('escape')}
          className="absolute bottom-12 text-caption text-foreground/20 hover:text-foreground/50 transition-colors duration-500 tracking-[0.3em]"
        >
          {t('gateway.skip')}
        </motion.button>
      </div>
    </div>
  );
}
