import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// ─── Image slots (swap via Dropbox; keep data-slot attributes) ───
const IMG = {
  hero: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=2400&auto=format&fit=crop&q=85',
  ocean: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1600&auto=format&fit=crop&q=85',
  culture: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=1600&auto=format&fit=crop&q=85',
  pace: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&auto=format&fit=crop&q=85',
  gallery: [
    'https://images.unsplash.com/photo-1583248369069-9d91f1640fe6?w=900&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=900&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=900&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=900&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1502209524164-acea936639a2?w=900&auto=format&fit=crop&q=85',
  ],
  galleryCaptions: [
    'Lagoon Mornings',
    'Reef at Golden Hour',
    'Trade Winds',
    'Frangipani',
    'Sega Nights',
    'Creole Table',
    'Sail to Île aux Cerfs',
  ],
  apartments: [
    {
      slot: 'apt-card-1',
      name: 'Lagoon Suite',
      size: '142 m²',
      price: 'From €620,000',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85',
    },
    {
      slot: 'apt-card-2',
      name: 'Beachfront Residence',
      size: '186 m²',
      price: 'From €890,000',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=85',
    },
    {
      slot: 'apt-card-3',
      name: 'Penthouse',
      size: '240 m²',
      price: 'From €1,450,000',
      img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=85',
    },
  ],
};

// ─── Scroll progress bar ───
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-px z-[70] bg-gradient-to-r from-coral to-gold"
    />
  );
}

// ─── Pillar section ───
function Pillar({
  label,
  title,
  body,
  img,
  slot,
  reverse,
  dark,
}: {
  label: string;
  title: string;
  body: string;
  img: string;
  slot: string;
  reverse?: boolean;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], reverse ? [80, -40] : [-80, 40]);

  return (
    <section
      ref={ref}
      className={dark ? 'section-dark' : 'section-light'}
    >
      <div className="container-editorial py-24 sm:py-32 lg:py-40">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <motion.div style={{ x }} className="overflow-hidden">
            <img
              data-slot={slot}
              src={img}
              alt={title}
              className="w-full h-full object-cover aspect-[4/5]"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="label-gold mb-6">{label}</p>
            <h2 className="text-display-md mb-8 max-w-md">{title}</h2>
            <p className={`font-sans font-light text-base sm:text-lg leading-[1.9] max-w-md mb-10 ${dark ? 'text-offwhite/75' : 'text-ocean/75'}`}>
              {body}
            </p>
            <Link
              to="/home"
              className={`inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase border-b pb-1 transition-colors duration-300 ${
                dark
                  ? 'text-offwhite border-offwhite/40 hover:text-coral hover:border-coral'
                  : 'text-ocean border-ocean/40 hover:text-coral hover:border-coral'
              }`}
            >
              Discover <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen bg-sand">
      <ScrollProgress />
      <Header />

      {/* ═══ 1. HERO ═══ */}
      <section className="relative h-dvh w-full overflow-hidden bg-ocean">
        <img
          data-slot="hero-bg"
          src={IMG.hero}
          alt="Turquoise lagoon meeting white sand at Mont Choisy"
          className="absolute inset-0 w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 vignette" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-offwhite px-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="label-gold mb-8"
          >
            Mont Choisy · Mauritius
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="text-display-xl text-offwhite max-w-5xl"
          >
            Where the Indian Ocean
            <br />
            becomes your backyard
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] tracking-[0.35em] uppercase text-offwhite/60">Scroll</span>
            <div className="scroll-cue" />
          </motion.div>
        </div>
      </section>

      {/* ═══ 2. LIFESTYLE INTRO ═══ */}
      <section className="section-dark py-32 sm:py-44 lg:py-56">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="divider-gold mb-16 origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="font-serif italic text-2xl sm:text-3xl lg:text-[2.4rem] leading-[1.5] text-offwhite/90"
          >
            Turquoise lagoons at first light. Trade winds carrying the scent of frangipani.
            Sunsets that bleed coral over coral. Here, the day finds its own slow rhythm —
            and somehow you find yours.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="divider-gold mt-16 origin-center"
          />
        </div>
      </section>

      {/* ═══ 3. THE EXPERIENCE — 3 PILLARS ═══ */}
      <Pillar
        label="The Ocean"
        title="A reef on your doorstep."
        body="Step from your terrace into water so clear the morning sun reaches the seabed. Sail at dawn, dive among parrotfish, watch the sky turn molten as the day folds into the lagoon."
        img={IMG.ocean}
        slot="lifestyle-ocean"
      />
      <Pillar
        label="The Culture"
        title="The island, on a plate."
        body="Stroll Grand Baie's morning markets for green mango and saffron. Sit at a roadside table for a Creole rougaille. Let sega drums find you on a Friday night — Mauritius lives through its senses."
        img={IMG.culture}
        slot="lifestyle-culture"
        reverse
        dark
      />
      <Pillar
        label="The Pace"
        title="Unhurried, on purpose."
        body="A long coffee on the terrace. A book in a hammock. The afternoon that asks nothing of you. This is the rhythm Mont Choisy is built around — the luxury of time, made yours."
        img={IMG.pace}
        slot="lifestyle-pace"
      />

      {/* ═══ 4. LIFESTYLE GALLERY (horizontal scroll) ═══ */}
      <section className="section-light py-24 sm:py-32 overflow-hidden">
        <div className="container-editorial mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="label-gold mb-4">A Sense of Place</p>
            <h2 className="text-display-md max-w-xl">Fragments of an island.</h2>
          </div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-ocean/50 hidden sm:block">
            scroll to explore →
          </p>
        </div>
        <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <div className="flex gap-5 lg:gap-7 px-6 sm:px-10 lg:px-14 pb-4">
            {IMG.gallery.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1 }}
                className="shrink-0 w-[78vw] sm:w-[42vw] lg:w-[28vw] snap-center"
              >
                <div className="overflow-hidden aspect-[3/4] mb-4">
                  <img
                    data-slot={`gallery-${i + 1}`}
                    src={src}
                    alt={IMG.galleryCaptions[i]}
                    className="w-full h-full object-cover transition-transform duration-[1.4s] hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <p className="label-gold">{IMG.galleryCaptions[i]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. THE RESIDENCES ═══ */}
      <section className="section-light pt-12 pb-24 sm:pb-32 lg:pb-40">
        <div className="container-editorial">
          <div className="text-center mb-16 sm:mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="label-gold mb-6"
            >
              The Residences
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="text-display-md max-w-3xl mx-auto"
            >
              Your private address on the edge of paradise.
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
            {IMG.apartments.map((apt, i) => (
              <motion.div
                key={apt.slot}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
              >
                <Link to="/residence" className="card-residence group block aspect-[3/4] relative">
                  <img
                    data-slot={apt.slot}
                    src={apt.img}
                    alt={apt.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 via-ocean/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-offwhite">
                    <p className="label-gold mb-3">{apt.size}</p>
                    <h3 className="font-serif italic text-2xl sm:text-3xl mb-2">{apt.name}</h3>
                    <p className="text-[13px] font-sans font-light text-offwhite/80 mb-4">{apt.price}</p>
                    <span className="inline-block text-[11px] tracking-[0.25em] uppercase text-coral opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-b border-coral pb-1">
                      Discover →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-[13px] text-ocean/60 font-sans font-light mt-14 tracking-wide">
            All residences are beachfront, managed, and ready to move in.
          </p>
        </div>
      </section>

      {/* ═══ 6. WHY MAURITIUS ═══ */}
      <section className="section-light py-24 sm:py-32 lg:py-40 border-t border-gold/20">
        <div className="container-editorial">
          <div className="text-center mb-16">
            <p className="label-gold mb-6">Why Mauritius</p>
            <h2 className="text-display-md max-w-2xl mx-auto">A place built for the life you've imagined.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 max-w-4xl mx-auto">
            {[
              { n: '300+', l: 'sunny days a year' },
              { n: '15 min', l: 'to Grand Baie' },
              { n: 'IRS', l: 'full ownership for non-citizens' },
              { n: 'World-class', l: 'snorkeling on your doorstep' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="text-center sm:text-left"
              >
                <p className="font-serif italic text-5xl sm:text-6xl lg:text-7xl text-ocean leading-none mb-4">
                  {stat.n}
                </p>
                <p className="text-[12px] tracking-[0.22em] uppercase text-ocean/60 font-sans">{stat.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. ENQUIRY ═══ */}
      <section className="section-dark py-24 sm:py-32 lg:py-40">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-center mb-16"
          >
            <p className="label-gold mb-6">Enquire</p>
            <h2 className="text-display-md text-offwhite">Begin your Mauritian story.</h2>
          </motion.div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const subject = encodeURIComponent('Mont Choisy enquiry');
              const body = encodeURIComponent(
                `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || '—'}\n\n${data.get('message')}`
              );
              window.location.href = `mailto:residences@montchoisy.mu?subject=${subject}&body=${body}`;
            }}
            className="space-y-8 max-w-xl mx-auto"
          >
            <input name="name" required placeholder="Your name" className="input-underline" />
            <input name="email" type="email" required placeholder="Email address" className="input-underline" />
            <input name="phone" placeholder="Phone (optional)" className="input-underline" />
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Tell us about the life you're imagining"
              className="input-underline resize-none"
            />

            <div className="text-center pt-6">
              <button type="submit" className="btn-coral touch-target">
                <span>Send Enquiry</span>
              </button>
              <p className="label-gold mt-8">We respond within 24 hours</p>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
