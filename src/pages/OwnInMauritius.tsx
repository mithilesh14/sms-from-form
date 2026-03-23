import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FadeIn, TextReveal } from '@/components/ChapterSection';
import { Shield, Globe, TrendingUp, Home, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIntent } from '@/contexts/IntentContext';

const benefits = [
  {
    icon: Shield,
    title: 'Permanent Residency',
    description: 'Property purchases above €500,000 qualify for a permanent residency permit for the buyer and their family.',
  },
  {
    icon: Globe,
    title: 'Foreign Ownership',
    description: 'Under the PDS (Property Development Scheme), non-citizens can freely own freehold property in Mauritius.',
  },
  {
    icon: TrendingUp,
    title: 'Zero Capital Gains Tax',
    description: 'Mauritius does not levy capital gains tax, making it one of the most attractive jurisdictions for property investment.',
  },
  {
    icon: Home,
    title: 'No Inheritance Tax',
    description: 'Your investment is protected across generations — Mauritius has no inheritance or estate duty taxes.',
  },
];

const process = [
  { step: '01', title: 'Initial Consultation', description: 'Private discussion to understand your goals and present suitable residences.' },
  { step: '02', title: 'Reservation Agreement', description: 'Secure your chosen residence with a reservation deposit and formal agreement.' },
  { step: '03', title: 'Due Diligence', description: 'Our legal team guides you through property verification and regulatory approvals.' },
  { step: '04', title: 'Completion & Residency', description: 'Finalize ownership and begin your residency permit application.' },
];

export default function OwnInMauritius() {
  const { t } = useTranslation();
  const { mode } = useIntent();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center ken-burns"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1920&auto=format&fit=crop&q=80)',
          }}
        />
        <div className="overlay-cinematic absolute inset-0" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24">
          <div className="container-editorial">
            <FadeIn>
              <p className="text-caption text-foreground/50 mb-4">
                {t('own.subtitle', 'International Ownership')}
              </p>
            </FadeIn>
            <TextReveal className="font-serif text-display text-foreground max-w-4xl">
              {t('own.title', 'Own in Mauritius')}
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-gap">
        <div className="container-narrow text-center">
          <FadeIn>
            <p className="font-serif text-title text-foreground leading-relaxed">
              {t('own.intro', 'Mauritius offers one of the world\'s most attractive frameworks for international property ownership — combining freehold rights, tax efficiency, and a pathway to residency in paradise.')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-gap-sm bg-secondary/50">
        <div className="container-editorial">
          <FadeIn>
            <p className="text-caption text-accent mb-6">{t('own.benefitsLabel', 'Key Advantages')}</p>
          </FadeIn>
          <TextReveal className="font-serif text-headline text-foreground mb-16 max-w-3xl">
            {t('own.benefitsTitle', 'A jurisdiction designed for global citizens')}
          </TextReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-card border border-border/30 p-8 group hover:border-accent/30 transition-all duration-500">
                  <benefit.icon className="h-6 w-6 text-accent mb-5" />
                  <h3 className="font-serif text-xl text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Numbers */}
      <section className="section-gap">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <p className="text-caption text-accent mb-6">{t('own.investLabel', 'Investment Snapshot')}</p>
              </FadeIn>
              <TextReveal className="font-serif text-headline text-foreground mb-8">
                {t('own.investTitle', 'Numbers that speak for themselves')}
              </TextReveal>
              <FadeIn delay={0.2}>
                <p className="text-body-lg text-muted-foreground">
                  {t('own.investDescription', 'The Mauritius property market has demonstrated consistent growth, driven by political stability, a robust legal framework, and increasing demand from international buyers.')}
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.3}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { n: '7-9%', l: 'Annual Rental Yield' },
                  { n: '0%', l: 'Capital Gains Tax' },
                  { n: '15%', l: 'Flat Income Tax' },
                  { n: '€500K', l: 'Residency Threshold' },
                  { n: '12%', l: 'Avg. Annual Appreciation' },
                  { n: '0%', l: 'Inheritance Tax' },
                ].map((stat, i) => (
                  <div key={i} className="border border-border/30 p-5 text-center">
                    <span className="number-display text-3xl text-accent">{stat.n}</span>
                    <p className="text-caption text-muted-foreground mt-2">{stat.l}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-gap-sm bg-secondary/50">
        <div className="container-editorial">
          <FadeIn>
            <p className="text-caption text-accent mb-6">{t('own.processLabel', 'The Journey')}</p>
          </FadeIn>
          <TextReveal className="font-serif text-headline text-foreground mb-16 max-w-3xl">
            {t('own.processTitle', 'From inquiry to ownership')}
          </TextReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative">
                  <span className="number-display text-5xl text-accent/20">{step.step}</span>
                  <h4 className="font-serif text-lg text-foreground mt-2 mb-3">{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section-gap">
        <div className="container-editorial">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <FadeIn>
                <p className="text-caption text-accent mb-6">PDS Scheme</p>
              </FadeIn>
              <TextReveal className="font-serif text-title text-foreground mb-6">
                Property Development Scheme
              </TextReveal>
              <FadeIn delay={0.2}>
                <div className="space-y-4">
                  {[
                    'Freehold ownership for non-citizens',
                    'No minimum residency requirement',
                    'Permanent residency permit for purchases ≥ €500,000',
                    'Full repatriation of funds on resale',
                    'Properties can be rented for income',
                    'Family members included in residency permit',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="left">
              <div className="aspect-editorial overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"
                  alt="Mauritius coast"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 sm:py-36 bg-secondary/50">
        <div className="container-editorial text-center">
          <FadeIn>
            <p className="text-caption text-accent mb-6">Private Consultation</p>
          </FadeIn>
          <TextReveal className="font-serif text-headline text-foreground mx-auto max-w-3xl mb-10">
            Ready to own your piece of paradise?
          </TextReveal>
          <FadeIn delay={0.3}>
            <Link
              to="/contact"
              className="btn-premium inline-flex items-center gap-3 px-12 py-5"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="h-4 w-4 relative z-10" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
