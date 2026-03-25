import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn, TextReveal } from '@/components/ChapterSection';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function Contact() {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'purchase',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_inquiries').insert({
        name: formState.name,
        email: formState.email,
        phone: formState.phone || null,
        message: formState.message,
        subject: formState.interest,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch {
      toast.error(t('common.error', 'An error occurred'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const interests = [
    { id: 'purchase', label: t('contact.form.interestOptions.purchase', 'Purchase') },
    { id: 'shortTerm', label: t('contact.form.interestOptions.shortTerm', 'Short Stay') },
    { id: 'longTerm', label: t('contact.form.interestOptions.longTerm', 'Long Lease') },
    { id: 'tour', label: t('contact.form.interestOptions.tour', 'Private Viewing') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero — warm editorial */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden grain-overlay">
        <div
          className="absolute inset-0 bg-cover bg-center ken-burns"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=80)',
          }}
        />
        <div className="overlay-cinematic absolute inset-0" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-16">
          <div className="container-editorial">
            <FadeIn>
              <p className="text-caption text-white/40 mb-4">{t('contact.subtitle', 'Private Consultation')}</p>
            </FadeIn>
            <TextReveal className="font-serif text-display text-white">
              {t('contact.title', 'Begin Your Journey')}
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-gap">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-5 gap-16 lg:gap-28">
            {/* Left — Info */}
            <div className="lg:col-span-2">
              <FadeIn>
                <p className="text-body-lg text-muted-foreground mb-14">
                  {t('contact.description', 'Our team is available for private consultations, property viewings, and investment guidance. We look forward to welcoming you.')}
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="space-y-10 mb-14">
                  {[
                    { icon: MapPin, label: t('contact.info.city', 'Grand Baie, Mauritius'), sub: t('contact.info.address', 'Coastal Road') },
                    { icon: Phone, label: t('contact.info.phone', '+230 555 0100'), sub: t('contact.info.hours', 'By Appointment') },
                    { icon: Mail, label: t('contact.info.email', 'residences@montchoisy.mu'), sub: '' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-5">
                      <div className="w-11 h-11 border border-border/30 flex items-center justify-center shrink-0">
                        <item.icon className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-foreground text-sm">{item.label}</p>
                        {item.sub && <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="divider-editorial" />
              </FadeIn>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <FadeIn>
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="divider-editorial mb-10" />
                    <h3 className="font-serif text-title text-foreground mb-5">Thank you</h3>
                    <p className="text-muted-foreground max-w-md">
                      {t('contact.success', 'Our team will be in touch within 24 hours.')}
                    </p>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn delay={0.3}>
                  <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Interest */}
                    <div>
                      <label className="text-caption text-muted-foreground mb-5 block">
                        {t('contact.form.interest', 'I\'m interested in')}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {interests.map(opt => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setFormState(s => ({ ...s, interest: opt.id }))}
                            className={`text-caption px-6 py-3 border transition-all duration-500 ${
                              formState.interest === opt.id
                                ? 'bg-foreground text-background border-foreground'
                                : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Fields */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <input
                        type="text"
                        value={formState.name}
                        onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                        required
                        placeholder={t('contact.form.name', 'Full Name')}
                        className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors duration-500"
                      />
                      <input
                        type="email"
                        value={formState.email}
                        onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                        required
                        placeholder={t('contact.form.email', 'Email Address')}
                        className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors duration-500"
                      />
                    </div>

                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                      placeholder={t('contact.form.phone', 'Phone Number')}
                      className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors duration-500"
                    />

                    <textarea
                      value={formState.message}
                      onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                      required
                      rows={4}
                      placeholder={t('contact.form.message', 'Tell us about your vision')}
                      className="w-full bg-transparent border-b border-border py-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors duration-500 resize-none"
                    />

                    {/* Consent checkbox — DPA 2017 compliance */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        required
                        id="contact-consent"
                        className="mt-1 h-4 w-4 border-border accent-accent"
                      />
                      <label htmlFor="contact-consent" className="text-xs text-muted-foreground leading-relaxed">
                        {t('contact.form.consent', 'I consent to Mont Choisy collecting and processing my personal data for the purpose of responding to this inquiry, in accordance with the Privacy Policy and the Mauritius Data Protection Act 2017. I understand I can withdraw my consent at any time.')}
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-premium inline-flex items-center gap-3 px-14 py-5"
                    >
                      <span>{isSubmitting ? t('contact.form.sending', 'Sending...') : t('contact.form.submit', 'Send Inquiry')}</span>
                      <ArrowRight className="h-4 w-4 relative z-10" />
                    </button>
                  </form>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
