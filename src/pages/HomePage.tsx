import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Backpack,
  CheckCircle2,
  Users,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { DataStore } from '../services/store';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { YouTubeSection } from '../components/common/YouTubeSection';
import { formatWhatsAppUrl, formatDate } from '../utils';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [showSafeguarding, setShowSafeguarding] = useState(false);
  const [content, setContent] = useState(() => DataStore.getSiteContent());
  const [programmes, setProgrammes] = useState(() => DataStore.getProgrammes());
  const [stats, setStats] = useState(() => DataStore.getImpactStats());
  const [gallery, setGallery] = useState(() => DataStore.getGallery(true, true).slice(0, 3));
  const [news, setNews] = useState(() => DataStore.getNewsPosts().filter((n) => n.published).slice(0, 2));

  React.useEffect(() => {
    const handleUpdate = () => {
      setContent(DataStore.getSiteContent());
      setProgrammes(DataStore.getProgrammes());
      setStats(DataStore.getImpactStats());
      setGallery(DataStore.getGallery(true, true).slice(0, 3));
      setNews(DataStore.getNewsPosts().filter((n) => n.published).slice(0, 2));
    };

    window.addEventListener('aos_store_updated', handleUpdate);
    return () => window.removeEventListener('aos_store_updated', handleUpdate);
  }, []);

  const whatsappHero = formatWhatsAppUrl(
    '08168779732',
    'Hello AOS Foundation, I would like to support your educational materials initiatives.'
  );

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION WITH HOVERING RIGHT-HAND SIDE VISUAL */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FCFAF7] via-[#F8F5F1] to-[#FCFAF7] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#E6DDD5]">
        {/* Subtle decorative grid canvas */}
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#B05A28_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Ambient atmospheric copper glow on right side */}
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#B05A28]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF3EE] border border-[#E6DDD5] text-xs font-semibold text-[#8F431E]">
                <span className="w-2 h-2 rounded-full bg-[#B05A28] animate-pulse" />
                <span>AOS Foundation · Field Educational Material Initiative</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-[1.12]">
                {content.heroHeadline}
              </h1>

              <p className="text-lg sm:text-xl text-[#404040] leading-relaxed max-w-2xl font-normal">
                {content.heroSubheadline}
              </p>

              {/* CTAs: Support, Partner, Volunteer */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => onNavigate('/donate')}
                  className="px-6 py-3.5 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  <span>Support Our Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('/contact')}
                  className="px-5 py-3.5 rounded-md bg-white hover:bg-[#F3EAE2] text-[#111111] font-semibold text-sm border border-[#E6DDD5] shadow-xs transition-colors cursor-pointer"
                >
                  Partner With Us
                </button>

                <button
                  onClick={() => onNavigate('/volunteer')}
                  className="px-4 py-3.5 rounded-md text-xs uppercase tracking-wider font-bold text-[#8F431E] hover:text-[#B05A28] hover:bg-[#F3EAE2] transition-colors cursor-pointer"
                >
                  Volunteer
                </button>
              </div>
            </div>

            {/* Right Column: Hovering Elevated Hero Visual with Continuous Motion */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none group">
                {/* Floating Ambient Aura with Continuous Breathing Motion */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#B05A28]/25 via-[#8F431E]/15 to-transparent blur-xl group-hover:opacity-100 opacity-70 transition-opacity duration-500 pointer-events-none animate-aura-breath" />

                {/* Main Showcase Card with Smooth Hovering & Motion */}
                <div className="relative rounded-2xl overflow-hidden bg-white border-2 border-white/80 shadow-[0_20px_50px_rgba(176,90,40,0.18)] hover:shadow-[0_30px_60px_rgba(176,90,40,0.28)] transition-all duration-300 ease-out animate-hero-motion">
                  {/* Authentic Outreach Photograph */}
                  <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[#F3EAE2]">
                    <img
                      src="https://i.ibb.co/XfPxFrVP/IMG-20240113-WA0008.jpg"
                      alt="AOS Foundation outreach with students and essential learning materials"
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Bottom gradient scrim for caption */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Bottom Image Overlay Caption */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-bold leading-snug drop-shadow-xs">
                        AOS Foundation Field Distribution
                      </p>
                      <p className="text-xs text-white/80 mt-0.5">
                        Delivering backpacks, exercise books, uniforms and learning essentials directly to pupils.
                      </p>
                    </div>
                  </div>

                  {/* Integrated Materials Checklist Footer */}
                  <div className="p-4 sm:p-5 bg-white border-t border-[#E6DDD5] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                        Essential Supplies Pack
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-[#262626]">
                      <div className="p-2 rounded-md bg-[#FCFAF7] border border-[#E6DDD5] flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-[#B05A28]" />
                        <span>Notebooks</span>
                      </div>
                      <div className="p-2 rounded-md bg-[#FCFAF7] border border-[#E6DDD5] flex items-center gap-2">
                        <Backpack className="w-3.5 h-3.5 text-[#B05A28]" />
                        <span>School Bags</span>
                      </div>
                      <div className="p-2 rounded-md bg-[#FCFAF7] border border-[#E6DDD5] flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#B05A28]">👟</span>
                        <span>Shoes & Socks</span>
                      </div>
                      <div className="p-2 rounded-md bg-[#FCFAF7] border border-[#E6DDD5] flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#B05A28]">👕</span>
                        <span>School Uniforms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE CHALLENGE & 3. OUR RESPONSE */}
      <section id="focus-programmes" className="py-16 sm:py-24 bg-white border-b border-[#E6DDD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: The Challenge Statement */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-[#B05A28]">
                01 · The Reality
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] leading-tight">
                {content.theProblemHeadline}
              </h2>
              <div className="space-y-4 text-base text-[#404040] leading-relaxed">
                <p>
                  In communities where public tuition is legally free, educational opportunities should be open to all. Yet hundreds of children are turned away at school gates or drop out in silence because their parents cannot afford basic physical requirements.
                </p>
                <p>
                  A child cannot comfortably write without exercise books. A child feels profound humiliation walking miles barefoot or wearing shredded garments while classmates wear neat uniforms. These tangible material gaps create severe learning exclusion.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#FAF3EE] border-l-4 border-[#B05A28] text-xs text-[#8F431E] leading-relaxed">
                <p className="font-semibold mb-1">Our Dignity Commitment:</p>
                AOS Foundation strictly rejects poverty-pornography. Every child receives new, high-grade materials with respect and encouragement, never as an object of pity.
              </div>
            </div>

            {/* Right: Our Concrete Response (The 5 Essentials) */}
            <div className="lg:col-span-6">
              <div className="bg-[#FCFAF7] rounded-xl border border-[#E6DDD5] p-6 sm:p-8 space-y-6 shadow-xs">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#8F431E] mb-1">
                    02 · Our Direct Response
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111]">
                    Bridging the Non-Tuition Gap
                  </h3>
                  <p className="text-sm text-[#525252] mt-1">
                    We supply the exact materials that keep children in school:
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: 'Exercise Books & Notebooks',
                      desc: 'Ensures students have proper stationery to take notes, complete assignments, and participate actively in class.',
                    },
                    {
                      name: 'Durable School Bags',
                      desc: 'Protects books and writing supplies from rain, dust, and long daily walks to school.',
                    },
                    {
                      name: 'Shoes & Socks',
                      desc: 'Protects feet from injury and infection while meeting school uniform dress regulations.',
                    },
                    {
                      name: 'Clean School Uniforms',
                      desc: 'Eliminates stigma and fosters equality, belonging, and pride in the school environment.',
                    },
                    {
                      name: 'Writing Materials & Tools',
                      desc: 'Pencils, pens, erasers, sharpeners, and mathematical sets required for daily examinations.',
                    },
                  ].map((item, idx) => (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-lg bg-white border border-[#E6DDD5] flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#F3EAE2] text-[#B05A28] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#111111]">{item.name}</h4>
                        <p className="text-xs text-[#525252] mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROGRAMME AREAS */}
      <section className="py-16 sm:py-24 bg-[#FCFAF7] border-b border-[#E6DDD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-1">
                Strategic Focus
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111]">
                Our Three Core Programme Areas
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/programmes')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8F431E] hover:text-[#B05A28] transition-colors self-start md:self-end"
            >
              <span>View All Programmes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programmes.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-xl border border-[#E6DDD5] overflow-hidden flex flex-col hover:border-[#B05A28]/50 hover:shadow-md transition-all duration-200 group"
              >
                <ImageWithFallback
                  src={prog.coverImage}
                  alt={prog.title}
                  category={prog.category}
                  aspectRatio="video"
                />

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#8F431E] font-medium mb-2">
                      <span>{prog.category}</span>
                      <span className="font-mono text-[11px] text-[#737373]">{prog.status}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#B05A28] transition-colors leading-snug">
                      {prog.title}
                    </h3>

                    <p className="text-xs text-[#525252] mt-2 line-clamp-3 leading-relaxed">
                      {prog.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E6DDD5] flex items-center justify-between">
                    <span className="text-[11px] text-[#737373] font-medium">
                      {prog.materialsIncluded.length} key components
                    </span>
                    <button
                      onClick={() => onNavigate(`/programmes/${prog.slug}`)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#B05A28] hover:text-[#8F431E] transition-colors cursor-pointer"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. IMPACT & EVIDENCE (Zero Fabricated Numbers) */}
      <section id="impact-statistics" className="py-16 bg-white border-b border-[#E6DDD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-1">
              Accountability & Metrics
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
              Documented Scope & Verification Standard
            </h2>
            <p className="text-sm text-[#525252] mt-2">
              AOS Foundation adheres to an honest data policy: we never publish fabricated statistics. All numbers represent verified records or open CMS entries ready for field updates.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="p-6 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] relative overflow-hidden"
              >
                <div className="text-xs font-semibold text-[#8F431E] uppercase tracking-wider mb-2">
                  {stat.label}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-mono tabular-nums">
                  {stat.value}
                </div>
                {stat.unit && (
                  <span className="text-xs font-medium text-[#737373] mt-1 block">
                    {stat.unit}
                  </span>
                )}
                <div className="mt-4 pt-3 border-t border-[#E6DDD5] text-[11px] text-[#525252] flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      stat.isVerified ? 'bg-emerald-500' : 'bg-amber-400'
                    }`}
                  />
                  <span className="truncate">{stat.verificationNote}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. IMPACT & EVIDENCE */}
      {/* 6. REAL PROGRAMME PHOTOGRAPHS / GALLERY PREVIEW */}
      <section id="field-gallery" className="py-16 bg-white border-b border-[#E6DDD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-1">
                Visual Documentation
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                Field Photography & Evidence
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {/* Optional Child Safeguarding Toggle Button */}
              <button
                type="button"
                onClick={() => setShowSafeguarding(!showSafeguarding)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
                  showSafeguarding
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-[#E6DDD5] text-[#525252] hover:text-[#111111] hover:border-[#B05A28]/50'
                }`}
                title="Toggle child safeguarding verification badges across photos"
              >
                <ShieldCheck className={`w-3.5 h-3.5 ${showSafeguarding ? 'text-emerald-600' : 'text-[#8F431E]'}`} />
                <span>Safeguarding: {showSafeguarding ? 'Visible' : 'Hidden'}</span>
              </button>
              <button
                onClick={() => onNavigate('/gallery')}
                className="text-xs font-bold uppercase tracking-wider text-[#8F431E] hover:text-[#B05A28] transition-colors"
              >
                Full Gallery Archive →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="bg-[#FCFAF7] rounded-xl border border-[#E6DDD5] overflow-hidden flex flex-col group hover:border-[#B05A28]/40 transition-colors"
              >
                <ImageWithFallback
                  src={item.url}
                  alt={item.caption}
                  category={item.category}
                  aspectRatio="video"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs font-medium text-[#262626] leading-relaxed">
                    {item.caption}
                  </p>
                  <div className="mt-3 pt-2 border-t border-[#E6DDD5] flex items-center justify-between text-[11px] text-[#737373]">
                    <span>{item.category}</span>
                    {showSafeguarding && (
                      <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1 font-medium">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Safeguarding Cleared</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. YOUTUBE FIELD VIDEO DOCUMENTARIES & OFFICIAL CHANNEL */}
      <YouTubeSection />

      {/* 8. LEADERSHIP & FIELD STEWARDS SPOTLIGHT */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E6DDD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-[#FCFAF7] border border-[#E6DDD5] flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3EE] border border-[#E6DDD5] text-xs font-semibold text-[#8F431E]">
                <Users className="w-3.5 h-3.5 text-[#B05A28]" />
                <span>Our Leadership & Stewards</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                Driven by Local Educators & Community Advocates
              </h2>
              <p className="text-sm text-[#525252] leading-relaxed">
                Meet the passionate team coordinating public school assessments, material packaging, verified distribution, and transparent donor stewardship across Nigeria.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('/team')}
                className="px-6 py-3.5 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Meet Our Dedicated Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/volunteer')}
                className="px-5 py-3.5 rounded-md bg-white hover:bg-[#F3EAE2] text-[#111111] text-xs font-bold border border-[#E6DDD5] transition-colors cursor-pointer"
              >
                Join Volunteer Registry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. HOW YOU CAN HELP: 4 CLEAR PATHWAYS */}
      <section id="partner-pathways" className="py-16 sm:py-24 bg-[#FCFAF7] border-b border-[#E6DDD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#B05A28]">
              Get Involved
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111]">
              Four Direct Pathways to Partner
            </h2>
            <p className="text-sm text-[#525252]">
              Whether as an individual donor, community volunteer, or corporate sponsor, your contribution reaches children directly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Donate / Support',
                desc: 'Support material procurement: notebooks, bags, shoes, uniforms, and educational supplies.',
                action: 'Support Now',
                route: '/donate',
                accent: 'bg-[#B05A28]',
              },
              {
                title: 'Corporate Partner',
                desc: 'Partner with AOS Foundation for CSR initiatives, bulk material donations, and school adoptions.',
                action: 'Partner With Us',
                route: '/contact',
                accent: 'bg-[#8F431E]',
              },
              {
                title: 'Volunteer',
                desc: 'Join our field team for kit distributions, student mentoring, logistics, and outreach coordination.',
                action: 'Join Volunteer Registry',
                route: '/volunteer',
                accent: 'bg-[#111111]',
              },
              {
                title: 'Sponsor a School',
                desc: 'Directly adopt a primary school class or community to provide full educational kit packages.',
                action: 'Discuss Sponsorship',
                route: '/contact',
                accent: 'bg-[#B05A28]',
              },
            ].map((pathway) => (
              <div
                key={pathway.title}
                className="bg-white rounded-xl border border-[#E6DDD5] p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#B05A28]" />
                  <h3 className="text-lg font-bold text-[#111111]">{pathway.title}</h3>
                  <p className="text-xs text-[#525252] leading-relaxed">{pathway.desc}</p>
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => onNavigate(pathway.route)}
                    className="w-full py-2.5 px-3 rounded-md bg-[#FAF3EE] hover:bg-[#B05A28] text-[#8F431E] hover:text-white font-bold text-xs uppercase tracking-wider transition-colors text-center cursor-pointer"
                  >
                    {pathway.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TRANSPARENCY & SAFEGUARDING SPOTLIGHT */}
      <section id="safeguarding-spotlight" className="py-14 bg-white border-b border-[#E6DDD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#FAF3EE] to-white border border-[#E6DDD5] flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                <ShieldAlert className="w-4 h-4 text-[#B05A28]" />
                <span>Institutional Governance & Child Safeguarding</span>
              </div>
              <h3 className="text-2xl font-bold text-[#111111]">
                Protected Children, Auditable Operations
              </h3>
              <p className="text-xs sm:text-sm text-[#404040] leading-relaxed">
                Working with children demands unwavering ethics. AOS Foundation operates under a strict Child Safeguarding Policy, requiring verified parental consent for field photography, zero disclosure of private family details, and transparent governance documentation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('/safeguarding')}
                className="px-5 py-2.5 rounded-md bg-white hover:bg-[#F3EAE2] text-[#111111] text-xs font-bold border border-[#E6DDD5] transition-colors"
              >
                Safeguarding Policy
              </button>
              <button
                onClick={() => onNavigate('/reports')}
                className="px-5 py-2.5 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold transition-colors"
              >
                Transparency Reports
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 11. LATEST UPDATES / NEWS */}
      <section id="news-dispatches" className="py-16 bg-[#FCFAF7] border-b border-[#E6DDD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-1">
                News & Dispatches
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                Field Updates & Educational Insights
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/news')}
              className="text-xs font-bold uppercase tracking-wider text-[#8F431E] hover:text-[#B05A28] transition-colors"
            >
              All Articles →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#E6DDD5] p-6 sm:p-8 flex flex-col justify-between hover:border-[#B05A28]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#8F431E] font-medium">
                    <span>{item.category}</span>
                    <span>·</span>
                    <span className="text-[#737373]">{formatDate(item.publishedAt)}</span>
                  </div>
                  <h3
                    onClick={() => onNavigate(`/news/${item.slug}`)}
                    className="text-xl font-bold text-[#111111] hover:text-[#B05A28] cursor-pointer transition-colors leading-snug"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#525252] leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
                <div className="pt-6 border-t border-[#E6DDD5] mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-[#737373]">By {item.author}</span>
                  <button
                    onClick={() => onNavigate(`/news/${item.slug}`)}
                    className="text-xs font-bold text-[#B05A28] hover:text-[#8F431E] transition-colors cursor-pointer"
                  >
                    Read Story →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 & 12. FINAL CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-br from-[#111111] via-[#1c1917] to-[#111111] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#B05A28]/20 border border-[#B05A28]/40 text-xs font-semibold text-[#D4A992] uppercase tracking-wider">
            Direct & Dignified Impact
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Help Ensure No Child Leaves School for Lack of a Notebook or Shoes.
          </h2>

          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Every notebook, uniform, and bag provided translates directly into uninterrupted school attendance, restored confidence, and equal opportunity.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/donate')}
              className="px-7 py-3.5 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all duration-200 cursor-pointer"
            >
              Support Our Work
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-colors cursor-pointer"
            >
              Inquire About Partnership
            </button>
            <a
              href={whatsappHero}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-md bg-transparent hover:bg-white/5 text-[#D4A992] hover:text-white font-semibold text-xs tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              <span>WhatsApp: 08168779732</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
