import React from 'react';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface PrivacyPageProps {
  onNavigate?: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate = () => {} }) => {
  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-16">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Privacy Policy"
        prevSection={{ title: 'Frequently Asked Questions', path: '/faq' }}
        nextSection={{ title: 'Terms of Engagement', path: '/terms' }}
        breadcrumbs={[{ title: 'Privacy Policy' }]}
        onNavigate={onNavigate}
      />
      <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-2xl border border-[#E6DDD5] shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#B05A28]">
            Legal & Data Protection
          </span>
          <h1 className="text-3xl font-extrabold text-[#111111] mt-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#737373] mt-1">
            Last Updated: March 2026 · AOS Foundation Non-Profit Privacy Standard
          </p>
        </div>

        <div className="space-y-6 text-xs text-[#404040] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[#111111]">1. Commitment to Privacy</h2>
            <p>
              AOS Foundation is committed to protecting the privacy of all website visitors, donors, volunteers, community partners, and beneficiaries. This policy governs how we collect, store, and utilize information gathered through this web platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[#111111]">2. Information We Collect</h2>
            <p>
              We collect information strictly necessary to coordinate non-profit operations:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Donor & Sponsor Inquiries: Name, email address, phone number, organisation, and pledge details.</li>
              <li>Volunteer Applications: Full name, contact details, city/state, availability, and areas of interest.</li>
              <li>Contact Inquiries: Messages, organization names, and correspondence records.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[#111111]">3. Non-Disclosure & Anti-Spam</h2>
            <p>
              We will never sell, rent, or trade your personal information to commercial third parties, marketers, or external databases. Your details are accessed strictly by authorized foundation coordinators for direct correspondence regarding your inquiries.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[#111111]">4. Child Privacy Safeguards</h2>
            <p>
              Under our Child Safeguarding Policy, we never publicly disclose identifiable contact data, home addresses, or sensitive welfare details of children benefiting from educational packs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[#111111]">5. Contact Us</h2>
            <p>
              For data privacy requests or inquiries, contact us directly at <a href="mailto:contact@aosfoundation.org" className="text-[#B05A28] underline">contact@aosfoundation.org</a> or call 08168779732.
            </p>
          </section>
        </div>
      </div>
      </div>

      {/* Bottom Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Privacy Policy"
        prevSection={{ title: 'Frequently Asked Questions', path: '/faq' }}
        nextSection={{ title: 'Terms of Engagement', path: '/terms' }}
        onNavigate={onNavigate}
        isBottom
      />
    </div>
  );
};
