import React, { useRef, useEffect, useState } from 'react';
import { TrendingUp, Check, BarChart3, Layout, Clock, DollarSign, Award, ArrowUpRight, Phone, Mail, MapPin, Star, Instagram, Linkedin, Facebook, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import { Marquee } from '../components/ui/marquee';
import { SALES, BOOK_STRATEGY_CALL_URL } from '../constants';
import reviews from '../data/reviews.json';
import { cn } from '../lib/utils';
import { Review } from '../types';
// Image imports removed - now handled in constants.ts
import headshotImg from '../assets/selfie.jpg';
import heroBg from '../assets/hero.avif';
import sellersBg from '../assets/sellers.avif';
import pathBg from '../assets/path.avif';
import homeBg from '../assets/home.avif';

const SOCIAL_LINKS = {
  zillow: 'https://www.zillow.com/profile/sebastianstreetrlty',
  instagram: 'https://www.instagram.com/sebtherealtor_/#',
  linkedin: 'https://www.linkedin.com/in/sebastian-street-665259238/',
  facebook: 'https://www.facebook.com/sebastian.street.92798/'
} as const;

const HEADSHOT_SRC = headshotImg;

const REVIEWS: Review[] = reviews;

const ZillowLogo = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-hidden="true"
  >
    <path
      d="M3 16.5L13 6.5l4 4-8 8h10v3H3v-3z"
      fill="#0f62ff"
    />
    <path
      d="M21 9l-8-8-4 4 8 8H7v3h14V9z"
      fill="#00A5FF"
      opacity="0.85"
    />
  </svg>
);

const SOCIAL_PROOF_ITEMS = [
  {
    id: 'zillow',
    highlight: 'Zillow',
    rest: ' Premier Agent',
    accentClass: 'text-sky-400',
    detailClass: 'text-slate-400',
    detail: '5.0 ★ rating · 3,233 team reviews'
  },
  {
    id: 'realtor',
    highlight: 'Realtor.com',
    rest: ' Featured',
    accentClass: 'text-rose-500',
    detailClass: 'text-slate-400',
    detail: 'Orange County home marketing'
  },
  {
    id: 'google',
    highlight: 'Google',
    rest: ' Verified',
    accentClass: 'text-emerald-400',
    detailClass: 'text-slate-400',
    detail: 'Real seller conversations, no bots'
  },
  {
    id: 'ehomes',
    highlight: 'eHomes',
    rest: ' Orange County',
    accentClass: 'text-orange-400',
    detailClass: 'text-slate-400',
    detail: 'Trusted local brokerage support'
  },
  {
    id: 'redfin',
    highlight: 'Redfin',
    rest: ' Partner Agent',
    accentClass: 'text-red-400',
    detailClass: 'text-slate-400',
    detail: 'Verified reviews across SoCal listings'
  },
  {
    id: 'coverage',
    highlight: 'OC · IE · LA',
    rest: '',
    accentClass: 'text-white',
    detailClass: 'text-slate-400',
    detail: 'Newport Beach · Irvine · Chino · Long Beach'
  }
] as const;

const AnimatedStat = ({
  end,
  duration = 2000,
  label,
  prefix = "",
  suffix = "",
  staticValue
}: {
  end?: number;
  duration?: number;
  label: string;
  prefix?: string;
  suffix?: string;
  staticValue?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated && end !== undefined) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="bg-[#050505] p-6 rounded-xl border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.4)] flex flex-col justify-center h-full">
      <div className="text-3xl font-bold text-white mb-1">
        {staticValue ? staticValue : `${prefix}${count.toLocaleString()}${suffix}`}
      </div>
      <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">{label}</div>
    </div>
  );
};

const AnimatedSpan = ({
  end,
  duration = 2000,
  decimals = 0,
  suffix = ""
}: {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const display = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref} className="tabular-nums inline-block">
      {display}{suffix}
    </span>
  );
};

const SellerAuthority: React.FC = () => {
  const reviewScrollRef = useRef<HTMLDivElement>(null);
  // salesImages array removed

  useEffect(() => {
    const title = 'Sebastian Street Realtor® | Sell Your Orange County Home';
    const description =
      'Work with Sebastian Street, top Orange County and Inland Empire Realtor®, to sell your home for maximum value using data-driven pricing, eHomes marketing, and concierge prep.';
    const keywords =
      'Orange County realtor, Irvine realtor, Newport Beach realtor, sell your home, Orange County homes for sale, maximum home value, Inland Empire listing agent, Huntington Beach realtor, Chino realtor, data-driven pricing, eHomes Orange County';

    document.title = title;

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let meta = document.head.querySelector<HTMLMetaElement>(selector);
      if (!meta) {
        meta = document.createElement('meta');
        Object.entries(attributes).forEach(([key, value]) => meta!.setAttribute(key, value));
        document.head.appendChild(meta);
      } else {
        Object.entries(attributes).forEach(([key, value]) => meta!.setAttribute(key, value));
      }
      return meta;
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: headshotImg });

    const existingSchema = document.getElementById('sebastian-schema');
    if (existingSchema) {
      existingSchema.remove();
    }

    const schemaTag = document.createElement('script');
    schemaTag.type = 'application/ld+json';
    schemaTag.id = 'sebastian-schema';
    schemaTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: 'Sebastian Street',
      image: headshotImg,
      description,
      areaServed: ['Orange County', 'Inland Empire', 'Los Angeles County'],
      telephone: '(626) 632-2559',
      email: 'sebastian@diamondstreetrealty.com',
      url: 'https://www.zillow.com/profile/sebastianstreetrlty',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '11760 Central Ave Suite 125',
        addressLocality: 'Chino',
        addressRegion: 'CA',
        postalCode: '91710'
      },
      sameAs: [
        SOCIAL_LINKS.zillow,
        SOCIAL_LINKS.linkedin,
        SOCIAL_LINKS.facebook,
        SOCIAL_LINKS.instagram
      ]
    });
    document.head.appendChild(schemaTag);

    return () => {
      const schemaCleanup = document.getElementById('sebastian-schema');
      if (schemaCleanup) schemaCleanup.remove();
    };
  }, []);

  const handleReviewScroll = (direction: 'left' | 'right') => {
    const container = reviewScrollRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLDivElement>('[data-review-card]');
    const scrollAmount = (card?.offsetWidth ?? 320) + 24;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-[#F5F5F2] selection:bg-[#d4af37]/30 selection:text-[#050505]">
      {/* SEO Meta */}
      <div className="hidden">
        <title>Sell Your Orange County Home | Sebastian Street, Realtor</title>
        <meta name="description" content="Get a custom home value report and sell your Orange County home for maximum value. Sebastian Street provides data-driven pricing, strategic marketing, and hands-on support." />
      </div>

      {/* Navbar / Header */}
      <nav className="absolute top-0 w-full z-50 border-b border-white/10 bg-[#050505]/70 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-[0.05em] text-white">Sebastian Street</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400">Realtor® | DRE #02208742</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#track-record" className="hover:text-white transition-colors">Track Record</a>
            <a href="#process" className="hover:text-white transition-colors">Process</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <a href={BOOK_STRATEGY_CALL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Book Strategy Call</a>
            <a href="#contact" className="text-yellow-500 hover:text-yellow-400 transition-colors">Get Home Value</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden parallax-bg" style={{ backgroundImage: `url(${heroBg})` }}>
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-[#050505]/60 z-0"></div>
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-transparent to-transparent opacity-80 z-0"></div>
        <div className="absolute top-10 right-0 w-2/3 h-full bg-gradient-to-l from-[#1a1a1a] via-transparent to-transparent opacity-70 z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="w-full flex justify-center mb-8">
              <div className="w-full sm:w-auto inline-flex flex-wrap items-center justify-center gap-2 border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#f7d78d] px-4 py-2 rounded-2xl text-[0.6rem] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                <Award size={12} className="hidden sm:inline" />
                <span className="tracking-[0.15em] sm:tracking-[0.4em]">Listing Agent · Orange County & Inland Empire</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-medium leading-tight mb-8 tracking-tight text-white">
              Sell Your Home for <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">Maximum Value</span> — With Less Stress.
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white max-w-2xl mx-auto leading-relaxed font-light mb-10 px-1">
              Don't leave money on the table. I combine data-driven pricing, hands-on home prep, and "Showcase" marketing to get you the highest possible return in today's shifting market.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#contact" className="w-full sm:w-auto text-center bg-gradient-to-r from-[#d4af37] to-[#b88d2c] text-[#050505] px-8 py-4 rounded-lg font-bold hover:brightness-110 transition-all text-lg shadow-[0_0_25px_rgba(212,175,55,0.35)]">
                Get Your Free Home Value Report
              </a>
              <a href="#contact" className="w-full sm:w-auto border border-white/15 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/5 transition-colors text-lg flex items-center justify-center gap-2">
                <Home size={18} /> CalHFA Dream for All
              </a>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-gray-400 text-center">
              <div className="flex text-[#d4af37] justify-center">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <span className="font-medium text-gray-300">
                <span className="text-white font-bold"><AnimatedSpan end={5.0} decimals={1} duration={1000} /></span> Rating
                (<span className="text-white font-bold"><AnimatedSpan end={3233} duration={2000} /></span> Verified Team Reviews)
              </span>
              <span className="hidden sm:inline text-gray-600">•</span>
              <span className="text-gray-300">
                <span className="text-white font-bold"><AnimatedSpan end={25} duration={1500} suffix="+" /></span> Years Team Experience
              </span>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-4 text-sm font-semibold">
              <a href={SOCIAL_LINKS.zillow} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#d4af37] transition-colors">Zillow</a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#d4af37] transition-colors">LinkedIn</a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#d4af37] transition-colors">Facebook</a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#d4af37] transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Strip */}
      <Marquee
        pauseOnHover
        speed={50}
        className="border-y border-white/10 bg-[#0B0B0D]/80 backdrop-blur-sm py-0"
        aria-label="Sebastian Street credibility marquee"
      >
        {SOCIAL_PROOF_ITEMS.map((item) => (
          <div key={item.id} className="flex flex-col items-center text-center gap-1 py-5">
            <span className="text-[0.6rem] md:text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gray-300">
              <span className={`${item.accentClass}`}>{item.highlight}</span>
              {item.rest}
            </span>
            <span className={cn('text-[0.58rem] md:text-xs font-medium text-gray-400', item.detailClass)}>{item.detail}</span>
          </div>
        ))}
      </Marquee>

      {/* Why Sellers Choose Sebastian */}
      <section className="py-24 relative parallax-bg" style={{ backgroundImage: `url(${sellersBg})` }}>
        <div className="absolute inset-0 bg-[#050505]/70 z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4">Why Sellers Choose Sebastian</h2>
            <p className="text-gray-400 text-lg">
              Selling a home is more than putting a sign in the yard. It requires a strategic, active approach to marketing and negotiation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-[#0B0B0D]/80 backdrop-blur-sm border border-white/10 hover:border-[#d4af37]/60 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-[#141414] flex items-center justify-center mb-6 group-hover:bg-[#d4af37]/15 group-hover:text-[#d4af37] transition-colors">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Data-Driven Pricing</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I don't guess. I analyze hyper-local market trends to position your home at a price that generates urgency and multiple offers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B0B0D]/80 backdrop-blur-sm border border-white/10 hover:border-[#d4af37]/60 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-[#141414] flex items-center justify-center mb-6 group-hover:bg-[#d4af37]/15 group-hover:text-[#d4af37] transition-colors">
                <Layout size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Strategic Marketing</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Professional photography, 3D tours, and premium placement to get more eyes on your property than the competition.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B0B0D]/80 backdrop-blur-sm border border-white/10 hover:border-[#d4af37]/60 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-[#141414] flex items-center justify-center mb-6 group-hover:bg-[#d4af37]/15 group-hover:text-[#d4af37] transition-colors">
                <Check size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hands-On Prep</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                From staging advice to minor repairs, I project manage the preparation to ensure your home shines on day one.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B0B0D]/80 backdrop-blur-sm border border-white/10 hover:border-[#d4af37]/60 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-[#141414] flex items-center justify-center mb-6 group-hover:bg-[#d4af37]/15 group-hover:text-[#d4af37] transition-colors">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Strong Negotiation</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I negotiate like your future depends on it—because it does. I fight to protect your equity at every turn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Track Record & Markets */}
      <section id="track-record" className="py-24 bg-[#0b0b0d] border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-6">Proven Results Across the Region</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Whether you're selling a luxury estate in Newport Beach or a family home in Chino, my process delivers consistent results. I understand the nuances of both the Orange County and Inland Empire markets.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <AnimatedStat end={418} label="Team Sales Last 12 Months" />
                <AnimatedStat end={5091} label="Total Team Sales" />
                <AnimatedStat staticValue="$10k - $8.5M" label="Price Range" />
                <AnimatedStat end={695} prefix="$" suffix="k" label="Average Price" />
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">Newport Beach</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">Irvine</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">Huntington Beach</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">Chino</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">Ontario</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">San Dimas</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">Long Beach</span>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#221f1b] to-[#0a0907] rounded-2xl opacity-40 blur-2xl"></div>
                <div className="relative bg-[#050505] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-serif font-bold text-white">Recent Activity</h3>
                    <a
                      href={SOCIAL_LINKS.zillow}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#d4af37] flex items-center gap-1 hover:text-white transition-colors"
                    >
                      View All <ArrowUpRight size={12} />
                    </a>
                  </div>
                  <div className="divide-y divide-white/5">
                    {SALES.slice(0, 4).map((sale, index) => (
                      <div key={sale.id} className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                        <div className="w-16 h-12 bg-[#141414] rounded overflow-hidden flex-shrink-0">
                          <img src={sale.image} alt={sale.city} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-bold text-white truncate">{sale.city}, CA</span>
                            <span className="text-xs font-bold text-[#d4af37] bg-[#d4af37]/15 px-1.5 py-0.5 rounded">{sale.formattedPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500 truncate">{sale.address}</span>
                            <span className="text-xs text-slate-500">{sale.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 relative parallax-bg" style={{ backgroundImage: `url(${pathBg})` }}>
        <div className="absolute inset-0 bg-[#050505]/70 z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4">Your Path to Sold</h2>
            <p className="text-gray-400 text-lg">A simple, transparent process designed to reduce stress and maximize your profit.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"></div>

            {[
              { step: "01", title: "Strategy Session", desc: "We meet to discuss your goals, timeline, and home value. No pressure, just a clear game plan." },
              { step: "02", title: "Prep & Launch", desc: "I manage the photos, staging advice, and marketing materials. We launch with a bang." },
              { step: "03", title: "Show & Negotiate", desc: "I handle all showings and negotiate offers fiercely to get you the best terms possible." },
              { step: "04", title: "Closing", desc: "I guide you through inspections and escrow paperwork until the money is in your bank." }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 text-center group">
                <div className="w-16 h-16 mx-auto bg-[#0b0b0d] border-4 border-[#050505] rounded-full flex items-center justify-center text-xl font-bold text-[#d4af37] shadow-[0_6px_25px_rgba(0,0,0,0.5)] mb-6 group-hover:bg-[#d4af37] group-hover:text-[#050505] transition-colors">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 bg-[#0f0f11] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">What Clients Are Saying</h2>
            <div className="flex gap-3 justify-center md:justify-end">
              <button
                type="button"
                aria-label="Scroll reviews left"
                onClick={() => handleReviewScroll('left')}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#d4af37] transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Scroll reviews right"
                onClick={() => handleReviewScroll('right')}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#d4af37] transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="relative">
            <div
              ref={reviewScrollRef}
              className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none' }}
            >
              {REVIEWS.map((review) => (
                <div
                  key={review.id}
                  data-review-card
                  className="min-w-[85vw] sm:min-w-[320px] md:min-w-[360px] bg-[#101012] p-6 sm:p-8 rounded-2xl shadow-lg border border-white/10 flex flex-col snap-center"
                >
                  <div className="flex text-[#d4af37] mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="sm:h-4 sm:w-4" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-semibold uppercase tracking-[0.3em] mb-2">{review.date}</p>
                  {review.transaction && (
                    <p className="text-sm font-semibold text-gray-300 mb-3 leading-snug">{review.transaction}</p>
                  )}
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6 flex-grow italic">"{review.text}"</p>
                  <div>
                    <div className="font-bold text-white text-sm sm:text-base">{review.author}</div>
                    <p className="text-[11px] text-gray-400">Highly likely to recommend · 5.0 ★</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#0f0f11] to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#0f0f11] to-transparent"></div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">Swipe or use the arrows to read more reviews.</p>
        </div>
      </section>

      {/* Primary CTA & Lead Form */}
      <section id="contact" className="py-24 relative overflow-hidden parallax-bg" style={{ backgroundImage: `url(${homeBg})` }}>
        <div className="absolute inset-0 bg-[#050505]/70 z-0"></div>
        {/* Carbon texture removed/replaced with parallax */}
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-[#0b0b0d]/85 backdrop-blur-md rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col lg:flex-row max-w-6xl mx-auto">
            <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 bg-[#d4af37]/10 text-[#d4af37] rounded text-xs font-bold uppercase tracking-[0.4em] mb-6 w-fit">
                Free Home Valuation
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-medium text-white mb-8">
                What is Your Home <br /><span className="text-[#d4af37]">Really</span> Worth?
              </h2>

              <div className="flex items-center gap-6 p-8 bg-[#050505]/60 rounded-xl border border-white/10 mb-8">
                <img
                  src={HEADSHOT_SRC}
                  alt="Sebastian Street professional headshot"
                  className="w-24 h-24 rounded-full object-cover border border-white/20"
                />
                <div>
                  <div className="text-white font-bold text-lg uppercase tracking-wide">Sebastian Street</div>
                  <div className="text-sm text-gray-400">Your Local Expert · Top Zillow Premier Agent</div>
                  <div className="text-xs text-gray-500 mt-1">eHomes | 5.0★ · 3,233 team reviews</div>
                </div>
              </div>

              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Automated estimates can be off by tens of thousands. Get a comprehensive, human-generated report that accounts for your home's unique upgrades and the latest market shifts.
              </p>

              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center flex-shrink-0"><Check size={14} /></div>
                  100% Free & No Obligation
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center flex-shrink-0"><Check size={14} /></div>
                  Confidential Strategy Assessment
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center flex-shrink-0"><Check size={14} /></div>
                  Delivered within 24 Hours
                </li>
              </ul>
            </div>

            <div className="lg:w-1/2 bg-[#050505] p-8 lg:p-12 border-l border-white/5">
              <LeadForm variant="dark" title="Request Your Report" subtitle="Enter your details below to get started." />
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA - Buyer Focus */}
      <section className="py-20 bg-[#050505] border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl font-serif font-medium text-white mb-4">Not selling right now?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            If you're looking to buy in Orange County or the Inland Empire, I can help you find the perfect home at the right price.
          </p>
          <a href={SOCIAL_LINKS.zillow} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white border-b border-white pb-0.5 hover:text-[#d4af37] hover:border-[#d4af37] transition-colors">
            Start Your Home Search <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#040404] border-t border-white/10 pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-2xl font-serif font-bold text-white mb-4">Sebastian Street</h4>
              <p className="text-gray-400 leading-relaxed mb-4 max-w-xl">
                Dedicated to providing exceptional service and data-driven results for home sellers and buyers across Southern California.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-semibold">
                <a href={SOCIAL_LINKS.zillow} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#d4af37] transition-colors underline decoration-slate-600/50">Zillow</a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#d4af37] transition-colors underline decoration-slate-600/50">LinkedIn</a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#d4af37] transition-colors underline decoration-slate-600/50">Facebook</a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#d4af37] transition-colors underline decoration-slate-600/50">Instagram</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Contact</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-1 text-[#d4af37] flex-shrink-0" />
                  <span>11760 Central Ave Suite 125,<br />Chino, CA 91710</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-[#d4af37] flex-shrink-0" />
                  <a href="tel:6266322559" className="hover:text-white">(626) 632-2559</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-[#d4af37] flex-shrink-0" />
                  <a href="mailto:sebastian@diamondstreetrealty.com" className="hover:text-white">sebastian@diamondstreetrealty.com</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>DRE #02208742</li>
                <li>
                  <span className="block text-white mb-1">Brokerage</span>
                  Realtor® | Member of eHomes Orange County
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Sebastian Street Real Estate. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <Home size={12} /> Equal Housing Opportunity
            </div>
          </div>
          <p className="text-center mt-6 text-[10px] text-gray-600/70">
            <a href="https://quicklaunchweb.us" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors">Website by QuickLaunchWeb</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SellerAuthority;
