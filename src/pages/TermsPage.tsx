import React from 'react';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface TermsPageProps {
  onNavigate?: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate = () => {} }) => {
  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-16">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Terms of Engagement"
        prevSection={{ title: 'Privacy Policy', path: '/privacy' }}
        nextSection={{ title: 'Contact & Inquiries', path: '/contact' }}
        breadcrumbs={[{ title: 'Terms of Engagement' }]}
        onNavigate={onNavigate}
      />
      <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-2xl border border-[#E6DDD5] shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#B05A28]">
            Legal & Operational Guidelines
          </span>
          <h1 className="text-3xl font-extrabold text-[#111111] mt-2">
            Terms of Engagement & Use
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            AOS Foundation · Registered Non-Profit Operations
          </p>
        </div>

        <div className="space-y-6 text-xs text-[#404040] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[#111111]">1. General Overview</h2>
            <p>
              By accessing the AOS Foundation digital platform, you agree to interact with our resources in accordance with respectful, non-profit community standards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[#111111]">2. Brand Identity & Logo Protection</h2>
            <p>
              The official AOS Foundation logo, burnt copper brandmark, emblem, and content remain the intellectual property of AOS Foundation. Unauthorized recreation, commercial redistribution, or deceptive reproduction without written consent is prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[#111111]">3. Non-Commercial Intent & Donations</h2>
            <p>
              All donations and material sponsorships are deployed strictly in furtherance of charitable education support and community empowerment. AOS Foundation issues formal distribution acknowledgment records for all confirmed partnerships.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[#111111]">4. Photography & Child Dignity Rights</h2>
            <p>
              All photographs featured on this website are protected under our Child Safeguarding Policy. They may not be scraped, copied, downloaded, or re-published on external sites for commercial or defamatory purposes.
            </p>
          </section>
        </div>
      </div>
      </div>

      {/* Bottom Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Terms of Engagement"
        prevSection={{ title: 'Privacy Policy', path: '/privacy' }}
        nextSection={{ title: 'Contact & Inquiries', path: '/contact' }}
        onNavigate={onNavigate}
        isBottom
      />
    </div>
  );
};
