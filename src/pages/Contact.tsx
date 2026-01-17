import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";

export default function Contact() {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormState({ name: "", email: "", phone: "", message: "", interest: "general" });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: t("contact.callUs"),
      value: "+1 (612) 555-0100",
      href: "tel:+16125550100"
    },
    {
      icon: Mail,
      label: t("contact.emailUs"),
      value: "residences@theverso.com",
      href: "mailto:residences@theverso.com"
    },
    {
      icon: MapPin,
      label: t("contact.visitUs"),
      value: "801 Marquette Ave, Minneapolis, MN 55402",
      href: "https://maps.google.com"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&auto=format&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container-editorial relative">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-caption text-accent mb-4 block"
          >
            {t('contact.subtitle')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground"
          >
            {t('contact.title')}
          </motion.h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-gap">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-12"
            >
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  {t('contact.getInTouch')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t('contact.description')}
                </p>
              </div>

              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.icon === MapPin ? "_blank" : undefined}
                    rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="group flex items-start gap-5"
                  >
                    <div className="w-14 h-14 border border-border flex items-center justify-center 
                                    group-hover:border-accent group-hover:bg-accent/5 transition-all duration-500">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <span className="text-caption text-muted-foreground block mb-1">
                        {item.label}
                      </span>
                      <span className="text-foreground group-hover:text-accent transition-colors duration-300">
                        {item.value}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Office Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="border-t border-border pt-8"
              >
                <h3 className="text-caption text-accent mb-4">{t('contact.officeHours')}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('contact.weekdays')}</span>
                    <span className="text-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('contact.saturday')}</span>
                    <span className="text-foreground">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('contact.sunday')}</span>
                    <span className="text-foreground">{t('contact.byAppointment')}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Interest Selection */}
                <div>
                  <label className="text-caption text-muted-foreground mb-4 block">
                    {t('contact.interest')}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {['general', 'sale', 'short', 'long'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormState(s => ({ ...s, interest: option }))}
                        className={`px-5 py-3 text-sm border transition-all duration-500 ${
                          formState.interest === option
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
                        }`}
                      >
                        {option === 'general' && t('contact.generalInquiry')}
                        {option === 'sale' && t('units.forSale')}
                        {option === 'short' && t('units.shortTerm')}
                        {option === 'long' && t('units.longTerm')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                      required
                      className="w-full bg-transparent border-b border-border py-4 text-foreground 
                                 placeholder:text-muted-foreground focus:outline-none focus:border-accent 
                                 transition-colors duration-500"
                      placeholder={t('contact.form.name')}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                      required
                      className="w-full bg-transparent border-b border-border py-4 text-foreground 
                                 placeholder:text-muted-foreground focus:outline-none focus:border-accent 
                                 transition-colors duration-500"
                      placeholder={t('contact.form.email')}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState(s => ({ ...s, phone: e.target.value }))}
                    className="w-full bg-transparent border-b border-border py-4 text-foreground 
                               placeholder:text-muted-foreground focus:outline-none focus:border-accent 
                               transition-colors duration-500"
                    placeholder={t('contact.form.phone')}
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                    required
                    rows={5}
                    className="w-full bg-transparent border-b border-border py-4 text-foreground 
                               placeholder:text-muted-foreground focus:outline-none focus:border-accent 
                               transition-colors duration-500 resize-none"
                    placeholder={t('contact.form.message')}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-premium w-full md:w-auto inline-flex items-center justify-center gap-3 px-12 py-5"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <>
                      <span>{t('contact.form.submit')}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
