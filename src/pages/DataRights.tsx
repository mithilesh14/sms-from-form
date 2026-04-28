import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/ChapterSection';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const REQUEST_TYPES = [
  { id: 'access', label: 'Access My Data', desc: 'Request a copy of all personal data we hold about you.' },
  { id: 'correction', label: 'Correct My Data', desc: 'Request correction of inaccurate or incomplete personal data.' },
  { id: 'deletion', label: 'Delete My Data', desc: 'Request erasure of your personal data from our systems.' },
  { id: 'export', label: 'Export My Data', desc: 'Receive your personal data in a portable, machine-readable format.' },
  { id: 'objection', label: 'Object to Processing', desc: 'Object to the processing of your personal data for specific purposes.' },
];

export default function DataRights() {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    requestType: 'access',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('data_rights_requests').insert({
        requester_name: formState.name,
        requester_email: formState.email,
        request_type: formState.requestType,
        description: formState.description || null,
      });
      if (error) throw error;

      // Log consent for the data rights request itself
      await supabase.from('consent_logs').insert({
        consent_type: 'data_rights_request',
        consent_given: true,
        consent_details: { request_type: formState.requestType } as any,
        visitor_email: formState.email,
        visitor_name: formState.name,
        user_agent: navigator.userAgent,
      });

      setSubmitted(true);
    } catch {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-secondary">
        <div className="container-editorial">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground"
          >
            {t('dataRights.title', 'Your Data Rights')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground mt-4 max-w-2xl text-lg font-light"
          >
            {t('dataRights.subtitle', 'Under the Mauritius Data Protection Act 2017, you have the right to access, correct, delete, and export your personal data. Submit a request below and we will respond within 30 days.')}
          </motion.p>
        </div>
      </section>

      <section className="section-gap-sm">
        <div className="container-editorial max-w-3xl">
          {submitted ? (
            <FadeIn>
              <div className="text-center py-20">
                <div className="divider-editorial mx-auto mb-8" />
                <h3 className="font-serif text-title text-foreground mb-4">Request Received</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We have received your data rights request. Our Data Protection Officer will process your request and respond within 30 days as required by the Mauritius Data Protection Act 2017.
                </p>
                <p className="text-sm text-muted-foreground/60 mt-6">
                  Reference will be sent to {formState.email}
                </p>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Request Type */}
                <div>
                  <label className="text-caption text-muted-foreground mb-5 block">
                    Type of Request
                  </label>
                  <div className="space-y-3">
                    {REQUEST_TYPES.map(rt => (
                      <button
                        key={rt.id}
                        type="button"
                        onClick={() => setFormState(s => ({ ...s, requestType: rt.id }))}
                        className={`w-full text-left p-4 border transition-all duration-500 ${
                          formState.requestType === rt.id
                            ? 'bg-foreground/5 border-foreground/30'
                            : 'bg-transparent border-border hover:border-foreground/20'
                        }`}
                      >
                        <p className="text-sm text-foreground font-medium">{rt.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{rt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact info */}
                <div className="grid md:grid-cols-2 gap-8">
                  <input
                    type="text"
                    value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    required
                    placeholder="Full Name"
                    className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors duration-500"
                  />
                  <input
                    type="email"
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    required
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors duration-500"
                  />
                </div>

                <textarea
                  value={formState.description}
                  onChange={e => setFormState(s => ({ ...s, description: e.target.value }))}
                  rows={3}
                  placeholder="Additional details about your request (optional)"
                  className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors duration-500 resize-none"
                />

                {/* Consent checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    id="data-rights-consent"
                    className="mt-1 h-4 w-4 border-border accent-accent"
                  />
                  <label htmlFor="data-rights-consent" className="text-xs text-muted-foreground leading-relaxed">
                    I confirm that I am the data subject or authorized representative, and I understand that Trou aux Biches will need to verify my identity before processing this request, in accordance with the Mauritius Data Protection Act 2017.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-premium inline-flex items-center gap-3 px-14 py-5"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
                </button>
              </form>
            </FadeIn>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
