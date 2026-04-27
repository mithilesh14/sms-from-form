import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bed, Bath, Maximize2, MapPin, ArrowRight, ShieldCheck, Hammer, Compass, Handshake } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// ─── Image slots (data-slot for Dropbox swap) ───
const HERO_BG = 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=2400&auto=format&fit=crop&q=85';

const PROJECTS = [
  {
    slot: 'project-1',
    name: 'eQ Residences',
    location: 'Pointe aux Canonniers',
    type: '2-Bedroom Apartment',
    beds: 2, baths: 2, m2: 108,
    price: 'From €387,000',
    desc: 'Luxury living and strong investment potential, 1 km from the beach and 3 km from Mont Choisy Le Golf.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85',
    tag: 'Available for foreigners',
  },
  {
    slot: 'project-2',
    name: 'The Essence',
    location: 'Trou aux Biches',
    type: '3-Bedroom PDS Apartment',
    beds: 3, baths: 3, m2: 145,
    price: 'From €620,000',
    desc: 'A 3-bedroom PDS apartment a few steps from one of the most glorious beaches in the north.',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=85',
    tag: 'PDS · Foreigner ownership',
  },
  {
    slot: 'project-3',
    name: 'La Pirogue Residences',
    location: 'Black River',
    type: '4-Bedroom Penthouse',
    beds: 4, baths: 4, m2: 388,
    price: 'From €1,950,000',
    desc: 'Authentic living with bohemian allure on the magnificent west coast of Mauritius.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=85',
    tag: 'PDS · Foreigner ownership',
  },
  {
    slot: 'project-4',
    name: 'Gemstone Villas',
    location: 'Trou aux Biches',
    type: '4-Bedroom Villa',
    beds: 4, baths: 4, m2: 812,
    price: 'From €2,560,000',
    desc: 'A bespoke collection of villas in a picturesque locale in the north of Mauritius.',
    img: 'https://images.unsplash.com/photo-1613553474179-e1eda3ea5734?w=1200&auto=format&fit=crop&q=85',
    tag: 'Available for foreigners',
  },
];

const PILLARS = [
  { icon: ShieldCheck, text: 'Over 15 years of completed projects make us the most trusted developer on the island.' },
  { icon: Hammer,      text: 'From the architecture down to the smallest finish, every detail is the result of a search for excellence.' },
  { icon: Compass,     text: 'We hand-pick the most beautiful sites to guarantee an unmatched lifestyle and investment potential.' },
  { icon: Handshake,   text: 'We accompany you from the first visit to the handover, with a smooth, transparent experience.' },
];

const ARTICLES = [
  {
    cat: 'Investment',
    title: 'Understanding payment plans and bank loans for property buyers in Mauritius',
    excerpt: 'Investing in property is a significant decision. In Mauritius, a stable economy, investor-friendly policies and a range of quality developments make it an attractive market.',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&auto=format&fit=crop&q=85',
  },
  {
    cat: 'Lifestyle',
    title: 'Why Mauritius is the top emerging destination for luxury travel in 2025',
    excerpt: 'Once a well-kept secret among discerning travellers, Mauritius is now making a confident return to centre stage as one of the world\'s most sought-after destinations.',
    img: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=900&auto=format&fit=crop&q=85',
  },
  {
    cat: 'Investment',
    title: 'Mauritian beachfront properties: where do you find the best ROI?',
    excerpt: 'Mauritius is not only a tropical paradise but a prime location for property investment, with idyllic settings and political stability.',
    img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&auto=format&fit=crop&q=85',
  },
];

const REGIONS = ['North', 'Centre', 'West'];
const CATEGORIES = ['All categories', 'Villa', 'Penthouse', 'Apartment', 'Office'];

const Index = () => {
  const [activeRegion, setActiveRegion] = useState('North');
  const [category, setCategory] = useState(CATEGORIES[0]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ═══ 1. HERO ═══ */}
      <section className="relative h-dvh min-h-[680px] w-full overflow-hidden bg-navy">
        <img
          data-slot="hero-bg"
          src={HERO_BG}
          alt="Aerial view of turquoise lagoon and white beach in Mauritius"
          className="absolute inset-0 w-full h-full object-cover ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/35 via-navy/15 to-navy/65" />

        <div className="relative z-10 h-full container-x flex flex-col items-center justify-center text-center text-white pt-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="eyebrow-light mb-6"
          >
            Mont Choisy · Mauritius
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-h1 text-white max-w-5xl mb-6"
          >
            Authentic & Timeless
            <br />
            <span className="italic font-light text-white/95">Luxury · Heritage · Oceanfront Living</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="text-base sm:text-lg text-white/85 max-w-2xl leading-[1.7] mb-12 font-light"
          >
            Mont Choisy doesn't just build properties — we craft exceptional living spaces in Mauritius.
            Our expertise is your guarantee of a serene investment and a daily life that feels like a dream.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="w-full max-w-4xl"
          >
            {/* Region pills */}
            <div className="flex justify-center gap-3 mb-5 flex-wrap">
              {REGIONS.map(r => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  data-active={activeRegion === r}
                  className="search-pill touch-target"
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Category + search */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-sm p-3">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="flex-1 bg-transparent text-white px-4 py-3 outline-none text-[14px] [&>option]:text-navy"
              >
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <Link
                to="/explore"
                className="bg-navy hover:bg-teal transition-colors text-white px-8 py-3 inline-flex items-center justify-center gap-2 text-[13px] tracking-[0.12em] uppercase font-medium"
              >
                <Search className="h-4 w-4" /> Search
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 2. INTRO ═══ */}
      <section className="section-pad bg-white">
        <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Mont Choisy</p>
            <h2 className="text-h2 text-navy mb-2">The leader of luxury real estate</h2>
            <p className="text-h3 text-ink-muted font-light italic">in Mauritius</p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg text-ink leading-[1.75] mb-6">
              We make acquiring a luxury property in Mauritius simple. Our expert advisors help you find the perfect home,
              tailored to your lifestyle or your investment objectives.
            </p>
            <Link to="/own-in-mauritius" className="btn-ghost-dark touch-target">
              Discover Mont Choisy <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Pillars */}
        <div className="container-x mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {PILLARS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-white p-8 lg:p-10 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center mb-6">
                <p.icon className="h-5 w-5 text-teal" strokeWidth={1.5} />
              </div>
              <p className="text-[15px] text-ink leading-[1.7]">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ 3. PROJECTS GRID ═══ */}
      <section className="section-pad bg-cream">
        <div className="container-x">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow mb-3">Our Real Estate Gems</p>
              <h2 className="text-h2 text-navy">Best Investment Opportunities</h2>
            </div>
            <Link to="/explore" className="btn-ghost-dark touch-target self-start sm:self-end">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.slot}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link to="/residence" className="project-card h-full">
                  <div className="img-wrap">
                    <img data-slot={p.slot} src={p.img} alt={`${p.name} — ${p.location}`} loading="lazy" />
                    <span className="absolute top-3 left-3 bg-white/95 text-navy text-[10px] tracking-[0.14em] uppercase font-medium px-3 py-1.5">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="flex items-center gap-1.5 text-[12px] text-ink-muted mb-2 tracking-wide">
                      <MapPin className="h-3.5 w-3.5 text-teal" /> {p.location}
                    </p>
                    <h3 className="font-serif text-[22px] text-navy leading-tight mb-1">{p.name}</h3>
                    <p className="text-[13px] text-ink-muted mb-4">{p.type}</p>

                    <div className="flex items-center gap-4 text-[12px] text-ink mb-4 pb-4 border-b border-border">
                      <span className="inline-flex items-center gap-1.5"><Bed className="h-3.5 w-3.5 text-teal" />{p.beds}</span>
                      <span className="inline-flex items-center gap-1.5"><Bath className="h-3.5 w-3.5 text-teal" />{p.baths}</span>
                      <span className="inline-flex items-center gap-1.5"><Maximize2 className="h-3.5 w-3.5 text-teal" />{p.m2} m²</span>
                    </div>

                    <p className="text-[13px] text-ink-muted leading-[1.6] mb-5 line-clamp-3">{p.desc}</p>

                    <div className="mt-auto pt-2 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-ink-muted mb-1">Starting at</p>
                        <p className="font-serif text-[20px] text-teal font-medium">{p.price}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-navy" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. FEATURED PROJECT (cinematic banner) ═══ */}
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-navy">
        <img
          data-slot="featured-bg"
          src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=2400&auto=format&fit=crop&q=85"
          alt="Beachfront residence"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/40 to-transparent" />
        <div className="relative z-10 h-full container-x flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-xl text-white"
          >
            <p className="eyebrow-light mb-4">Now Selling</p>
            <h2 className="text-h2 text-white mb-5">Mont Choisy Le Parc</h2>
            <p className="text-base sm:text-lg text-white/85 leading-[1.75] mb-8 font-light">
              Beachfront residences with private gardens, a clubhouse, and direct access to one of Mauritius'
              finest white-sand beaches. Limited availability for foreign buyers under PDS.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/residence" className="btn-primary touch-target">Discover the project</Link>
              <Link to="/contact" className="btn-outline touch-target">Schedule a visit</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 5. WHY MAURITIUS — stats ═══ */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Why Mauritius</p>
            <h2 className="text-h2 text-navy max-w-2xl mx-auto">A place built for the life you've imagined.</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 max-w-5xl mx-auto">
            {[
              { n: '300+', l: 'sunny days a year' },
              { n: '15 min', l: 'to Grand Baie' },
              { n: 'PDS', l: 'foreign ownership scheme' },
              { n: '7–9%', l: 'rental yield potential' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-serif text-5xl sm:text-6xl text-navy mb-3">{s.n}</p>
                <p className="text-[12px] tracking-[0.2em] uppercase text-ink-muted">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. ARTICLES ═══ */}
      <section className="section-pad bg-cream">
        <div className="container-x">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow mb-3">Mont Choisy</p>
              <h2 className="text-h2 text-navy">Our Selection of Articles</h2>
            </div>
            <Link to="/gallery" className="btn-ghost-dark touch-target self-start sm:self-end">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.map((a, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-white overflow-hidden group cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    data-slot={`article-${i + 1}`}
                    src={a.img}
                    alt={a.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p className="eyebrow mb-3 text-[11px]">{a.cat}</p>
                  <h3 className="font-serif text-[22px] text-navy leading-tight mb-3 group-hover:text-teal transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-[14px] text-ink-muted leading-[1.65] mb-4 line-clamp-3">{a.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.12em] uppercase text-teal font-medium">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. CTA STRIP ═══ */}
      <section className="bg-navy text-white">
        <div className="container-x py-20 lg:py-28 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow-light mb-3">Begin the conversation</p>
            <h2 className="text-h2 text-white">Find your address in Mauritius.</h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="text-white/75 mb-6 leading-[1.7] font-light">
              Our team responds within 24 hours with a curated shortlist of properties matched to your goals.
            </p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/contact" className="btn-primary touch-target">Contact us</Link>
              <Link to="/explore" className="btn-outline touch-target">Browse projects</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
