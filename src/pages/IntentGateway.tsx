import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useIntent, IntentMode } from '@/contexts/IntentContext';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState } from 'react';

const intentImages: Record<string, string> = {
  live: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=80',
  invest: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&auto=format&fit=crop&q=80',
  escape: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&auto=format&fit=crop&q=80',
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

  const intents: { key: IntentMode; label: string }[] = [
    { key: 'live', label: t('gateway.live', 'Live') },
    { key: 'invest', label: t('gateway.invest', 'Invest') },
    { key: 'escape', label: t('gateway.escape', 'Escape') },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background image that changes on hover */}
      {Object.entries(intentImages).map(([key, url]) => (
        <motion.div
          key={key}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${url})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredIntent === key ? 0.5 : 0 }}
          transition={{ duration: 0.8 }}
        />
      ))}

      {/* Default warm background when nothing hovered */}
      <div className="absolute inset-0 bg-[hsl(38,35%,95%)]" style={{ zIndex: hoveredIntent ? -1 : 0 }} />

      {/* Light warm overlay */}
      <div className="absolute inset-0 bg-white/40" />

      {/* Language toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={toggleLanguage}
        className="absolute top-8 right-8 z-10 flex items-center gap-2 text-primary/60 hover:text-primary transition-colors min-h-[48px]"
      >
        <Globe className="h-4 w-4" />
        <span className="text-caption">{i18n.language === 'en' ? 'FR' : 'EN'}</span>
      </motion.button>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-16 sm:mb-24"
        >
          <span className="font-serif text-3xl sm:text-4xl text-primary">
            <span className="font-light italic">The</span>{' '}
            <span className="font-medium">Verso</span>
          </span>
          <p className="text-caption text-primary/50 mt-3 text-center">
            {t('gateway.subtitle', 'Mauritius')}
          </p>
        </motion.div>

        {/* Intent choices */}
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-16 md:gap-24">
          {intents.map((intent, index) => (
            <motion.button
              key={intent.key}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.15 }}
              onMouseEnter={() => setHoveredIntent(intent.key)}
              onMouseLeave={() => setHoveredIntent(null)}
              onClick={() => handleSelect(intent.key)}
              className="group relative"
            >
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-primary/40 
                             hover:text-primary transition-colors duration-700 cursor-pointer italic">
                {intent.label}
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 h-px bg-accent"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Skip link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => handleSelect('escape')}
          className="absolute bottom-12 text-caption text-primary/30 hover:text-primary/60 transition-colors"
        >
          {t('gateway.skip', 'Enter Site')}
        </motion.button>
      </div>
    </div>
  );
}
