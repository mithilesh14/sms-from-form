import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = 'mc_cookie_consent';

export function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // always on
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const logConsent = async (given: boolean, details: CookiePreferences) => {
    try {
      await supabase.from('consent_logs').insert({
        consent_type: 'cookie',
        consent_given: given,
        consent_details: details as any,
        user_agent: navigator.userAgent,
      });
    } catch {
      // Silent fail — don't block UX
    }
  };

  const handleAcceptAll = () => {
    const all = { essential: true, analytics: true, marketing: true };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(all));
    logConsent(true, all);
    setVisible(false);
  };

  const handleRejectAll = () => {
    const minimal = { essential: true, analytics: false, marketing: false };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(minimal));
    logConsent(false, minimal);
    setVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
    logConsent(preferences.analytics || preferences.marketing, preferences);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
        >
          <div className="max-w-2xl mx-auto bg-card border border-border/40 shadow-lg p-6 sm:p-8">
            {!showCustomize ? (
              <>
                <h3 className="font-serif text-lg text-foreground mb-2">
                  {t('cookies.title', 'We value your privacy')}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {t('cookies.description', 'We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or reject non-essential cookies.')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="btn-premium px-8 py-3 text-[10px]"
                  >
                    <span>{t('cookies.acceptAll', 'Accept All')}</span>
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="btn-outline-premium px-8 py-3 text-[10px] text-foreground"
                  >
                    {t('cookies.rejectAll', 'Reject Non-Essential')}
                  </button>
                  <button
                    onClick={() => setShowCustomize(true)}
                    className="text-[10.5px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors px-4 py-3"
                  >
                    {t('cookies.customize', 'Customize')}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-serif text-lg text-foreground mb-4">
                  {t('cookies.customizeTitle', 'Cookie Preferences')}
                </h3>
                <div className="space-y-4 mb-6">
                  {/* Essential — always on */}
                  <div className="flex items-center justify-between py-3 border-b border-border/30">
                    <div>
                      <p className="text-sm text-foreground font-medium">{t('cookies.essential', 'Essential Cookies')}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t('cookies.essentialDesc', 'Required for the website to function. Cannot be disabled.')}</p>
                    </div>
                    <div className="w-10 h-5 bg-accent/30 rounded-full flex items-center justify-end px-0.5 opacity-60">
                      <div className="w-4 h-4 bg-accent rounded-full" />
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-center justify-between py-3 border-b border-border/30">
                    <div>
                      <p className="text-sm text-foreground font-medium">{t('cookies.analytics', 'Analytics Cookies')}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t('cookies.analyticsDesc', 'Help us understand how visitors interact with our website.')}</p>
                    </div>
                    <button
                      onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                      className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors duration-300 ${preferences.analytics ? 'bg-accent/30 justify-end' : 'bg-muted justify-start'}`}
                    >
                      <div className={`w-4 h-4 rounded-full transition-colors duration-300 ${preferences.analytics ? 'bg-accent' : 'bg-muted-foreground/40'}`} />
                    </button>
                  </div>

                  {/* Marketing */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm text-foreground font-medium">{t('cookies.marketing', 'Marketing Cookies')}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{t('cookies.marketingDesc', 'Used to deliver relevant advertisements and track campaign performance.')}</p>
                    </div>
                    <button
                      onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                      className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors duration-300 ${preferences.marketing ? 'bg-accent/30 justify-end' : 'bg-muted justify-start'}`}
                    >
                      <div className={`w-4 h-4 rounded-full transition-colors duration-300 ${preferences.marketing ? 'bg-accent' : 'bg-muted-foreground/40'}`} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleSavePreferences}
                    className="btn-premium px-8 py-3 text-[10px]"
                  >
                    <span>{t('cookies.savePreferences', 'Save Preferences')}</span>
                  </button>
                  <button
                    onClick={() => setShowCustomize(false)}
                    className="text-[10.5px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors px-4 py-3"
                  >
                    {t('cookies.back', 'Back')}
                  </button>
                </div>
              </>
            )}

            <p className="text-[10px] text-muted-foreground/60 mt-4">
              {t('cookies.learnMore', 'Learn more in our')}{' '}
              <a href="/privacy" className="underline hover:text-foreground transition-colors">
                {t('cookies.privacyLink', 'Privacy Policy')}
              </a>
              {' · '}
              {t('cookies.dpaNotice', 'Compliant with the Mauritius Data Protection Act 2017')}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
