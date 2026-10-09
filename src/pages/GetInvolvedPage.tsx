import React from 'react';
import { HeartHandshake, Briefcase, Users, PackageCheck, ArrowRight, Phone } from 'lucide-react';
import { formatWhatsAppUrl } from '../utils';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface GetInvolvedPageProps {
  onNavigate: (path: string) => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({ onNavigate }) => {
  const whatsappUrl = formatWhatsAppUrl(
    '08168779732',
    'Hello AOS Foundation, I would like to explore how I can get involved with your educational initiatives.'
  );

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-20">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Get Involved Pathways"
        prevSection={{ title: 'Field Photo Archive', path: '/gallery' }}
        nextSection={{ title: 'Support Our Work & Donate', path: '/donate' }}
        breadcrumbs={[{ title: 'Get Involved Pathways' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <section className="bg-white border-b border-[#E6DDD5] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B05A28]">
            <span>Community Participation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Four Ways You Can Make an Immediate Difference
          </h1>
          <p className="text-base sm:text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed">
            Whether providing material resources, partnering as an institution, offering your time, or sponsoring an entire school class, your support transforms children’s educational trajectory.
          </p>
        </div>
      </section>

      {/* The 4 Pathways */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pathway 1: DONATE */}
          <div className="bg-white rounded-2xl border border-[#E6DDD5] p-8 flex flex-col justify-between hover:border-[#B05A28]/50 hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF3EE] text-[#B05A28] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                Pathway 01 · Individual & Group Giving
              </span>
              <h2 className="text-2xl font-bold text-[#111111]">Donate / Material Support</h2>
              <p className="text-sm text-[#525252] leading-relaxed">
                Support the procurement of tangible materials: notebooks, durable backpacks, sturdy school shoes, clean uniforms, and socks. We facilitate both financial sponsorship of student kits and direct material contributions.
              </p>
            </div>
            <div className="pt-6 border-t border-[#E6DDD5] mt-6">
              <button
                onClick={() => onNavigate('/donate')}
                className="w-full py-3 px-4 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Support Our Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Pathway 2: PARTNER */}
          <div className="bg-white rounded-2xl border border-[#E6DDD5] p-8 flex flex-col justify-between hover:border-[#8F431E]/50 hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF3EE] text-[#8F431E] flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                Pathway 02 · Corporate & Institutional
              </span>
              <h2 className="text-2xl font-bold text-[#111111]">Corporate & NGO Partnership</h2>
              <p className="text-sm text-[#525252] leading-relaxed">
                Designed for businesses, developmental organisations, and donor institutions seeking auditable CSR execution. Partner with AOS Foundation for targeted community education outreaches with full documentation.
              </p>
            </div>
            <div className="pt-6 border-t border-[#E6DDD5] mt-6">
              <button
                onClick={() => onNavigate('/contact')}
                className="w-full py-3 px-4 rounded-md bg-white hover:bg-[#F3EAE2] text-[#111111] text-xs font-bold uppercase tracking-wider border border-[#E6DDD5] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Inquire About Partnership</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Pathway 3: VOLUNTEER */}
          <div className="bg-white rounded-2xl border border-[#E6DDD5] p-8 flex flex-col justify-between hover:border-[#111111]/40 hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FCFAF7] text-[#111111] border border-[#E6DDD5] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                Pathway 03 · Community Action
              </span>
              <h2 className="text-2xl font-bold text-[#111111]">Volunteer Your Skills</h2>
              <p className="text-sm text-[#525252] leading-relaxed">
                Offer your time in field distribution, student mentorship, packaging logistics, media documentation, or community liaison. Our volunteer network operates across multiple states.
              </p>
            </div>
            <div className="pt-6 border-t border-[#E6DDD5] mt-6">
              <button
                onClick={() => onNavigate('/volunteer')}
                className="w-full py-3 px-4 rounded-md bg-[#111111] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Join Volunteer Network</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Pathway 4: SPONSOR A COMMUNITY OR CLASS */}
          <div className="bg-white rounded-2xl border border-[#E6DDD5] p-8 flex flex-col justify-between hover:border-[#B05A28]/50 hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF3EE] text-[#B05A28] flex items-center justify-center">
                <PackageCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                Pathway 04 · Targeted Sponsorship
              </span>
              <h2 className="text-2xl font-bold text-[#111111]">Sponsor a School or Cohort</h2>
              <p className="text-sm text-[#525252] leading-relaxed">
                Commit to providing an entire primary school class or community cohort with complete educational kits (notebooks, bags, shoes, uniforms) for an entire academic session.
              </p>
            </div>
            <div className="pt-6 border-t border-[#E6DDD5] mt-6">
              <button
                onClick={() => onNavigate('/contact')}
                className="w-full py-3 px-4 rounded-md bg-[#FAF3EE] hover:bg-[#B05A28] text-[#8F431E] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Discuss Cohort Sponsorship</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Immediate Coordination */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#B05A28] to-[#8F431E] text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Have Questions on How to Support?</h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-lg">
              Speak directly with an AOS Foundation coordinator via WhatsApp or direct telephone.
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-md bg-white text-[#8F431E] hover:bg-[#FCFAF7] font-bold text-xs uppercase tracking-wider transition-colors whitespace-nowrap shadow-sm"
          >
            WhatsApp 08168779732
          </a>
        </div>
      </section>

      {/* Bottom Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Get Involved Pathways"
        prevSection={{ title: 'Field Photo Archive', path: '/gallery' }}
        nextSection={{ title: 'Support Our Work & Donate', path: '/donate' }}
        onNavigate={onNavigate}
        isBottom
      />
    </div>
  );
};
