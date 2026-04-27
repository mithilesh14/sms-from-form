import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PARADISE_BG =
  'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=2400&auto=format&fit=crop&q=85';

export default function Paradise() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(() => navigate('/home'), 650);
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-ocean">
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0">
        <img
          data-slot="paradise-bg"
          src={PARADISE_BG}
          alt="Turquoise lagoon and white beach in Mauritius"
          className="w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 vignette" />
        <div className="absolute inset-0 grain-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 text-center text-offwhite">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="label-gold mb-8"
        >
          Mauritius · Indian Ocean
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-display-xl text-offwhite max-w-5xl"
        >
          Welcome to
          <br />
          Paradise
        </motion.h1>

        <div className="my-10 w-24 h-px bg-gold/70 origin-center draw-line" />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="font-sans font-light text-base sm:text-lg text-offwhite/85 max-w-xl leading-[1.9] mb-12"
        >
          A private collection of oceanfront residences at Mont Choisy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <button
            onClick={handleEnter}
            className="btn-coral touch-target"
            aria-label="Enter the Mont Choisy experience"
          >
            <span>Enter</span>
          </button>
        </motion.div>

        {/* Bottom wordmark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <span className="text-[11px] tracking-[0.4em] uppercase text-offwhite/50 font-sans">
            Mont Choisy
          </span>
        </motion.div>
      </div>

      {/* Page-out fade */}
      <AnimatePresence>
        {leaving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-ocean pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
