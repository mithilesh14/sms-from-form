import { useIntent } from '@/contexts/IntentContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ModeToggle() {
  const { mode, setMode } = useIntent();
  const { t } = useTranslation();

  const isInvest = mode === 'invest';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="fixed bottom-8 right-8 z-30 bg-white/80 backdrop-blur-xl shadow-lg border border-border px-1 py-1 flex gap-0.5"
    >
      <button
        onClick={() => setMode('escape')}
        className={cn(
          "text-caption px-4 py-2.5 transition-all duration-300",
          !isInvest ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
        )}
      >
        {t('mode.lifestyle', 'Lifestyle')}
      </button>
      <button
        onClick={() => setMode('invest')}
        className={cn(
          "text-caption px-4 py-2.5 transition-all duration-300",
          isInvest ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-primary"
        )}
      >
        {t('mode.investment', 'Investment')}
      </button>
    </motion.div>
  );
}
