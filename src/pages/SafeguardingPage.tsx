import React from 'react';
import { ShieldCheck, Lock, Eye, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { formatWhatsAppUrl } from '../utils';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface SafeguardingPageProps {
  onNavigate: (path: string) => void;
}

export const SafeguardingPage: React.FC<SafeguardingPageProps> = ({ onNavigate }) => {
  const whatsappSafeguarding = formatWhatsAppUrl(
    '08168779732',
    'Hello AOS Foundation Safeguarding Focal Point, I wish to submit a safeguarding or child protection inquiry.'
  );

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-24">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Child Safeguarding"
        prevSection={{ title: 'Transparency Reports', path: '/reports' }}
        nextSection={{ title: 'Frequently Asked Questions', path: '/faq' }}
        breadcrumbs={[{ title: 'Child Safeguarding Policy' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <section className="bg-white border-b border-[#E6DDD5] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-3">
            <span>Institutional Commitment</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Child Safeguarding & Protection Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] leading-relaxed">
            Because AOS Foundation works directly with vulnerable children and young pupils, we enforce absolute standards of child safety, dignity, and visual confidentiality.
          </p>
          <div className="mt-4 inline-block px-3 py-1 rounded-md bg-[#FAF3EE] border border-[#E6DDD5] text-xs font-mono text-[#8F431E]">
            Status: AOS Foundation Operational Framework (Awaiting Periodic Board Ratification)
          </div>
        </div>
      </section>

      {/* Main Principles */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        {/* Core Commitments */}
        <div className="bg-white rounded-2xl border border-[#E6DDD5] p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#B05A28]" />
            <h2 className="text-xl font-bold text-[#111111]">
              Core Safeguarding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#404040] leading-relaxed">
            <div className="p-4 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-2">
              <h3 className="font-bold text-[#111111] text-sm">Best Interests of the Child</h3>
              <p>
                In every decision, distribution, outreach, and engagement, the physical safety, emotional well-being, and dignity of the child remain paramount.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-2">
              <h3 className="font-bold text-[#111111] text-sm">Zero Tolerance for Exploitation</h3>
              <p>
                We maintain zero tolerance for any form of physical abuse, emotional harassment, neglect, or exploitative behavior by volunteers, staff, or contractors.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-2">
              <h3 className="font-bold text-[#111111] text-sm">Informed Guardian Consent</h3>
              <p>
                No child is photographed, interviewed, or documented without prior informed consent from their parents, legal guardians, or authorized school administration.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-2">
              <h3 className="font-bold text-[#111111] text-sm">No Poverty Exploitation</h3>
              <p>
                We strictly reject sensationalized "poverty porn". Children are portrayed as capable, dignified individuals receiving educational tools that are rightfully theirs.
              </p>
            </div>
          </div>
        </div>

        {/* Responsible Image Management & Privacy */}
        <div className="bg-white rounded-2xl border border-[#E6DDD5] p-6 sm:p-10 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-[#B05A28]" />
            <h2 className="text-xl font-bold text-[#111111]">
              Child Privacy & Responsible Image Protocols
            </h2>
          </div>

          <p className="text-xs text-[#525252] leading-relaxed">
            To safeguard children from online exploitation or localized embarrassment, AOS Foundation enforces strict guidelines across all public media channels:
          </p>

          <ul className="space-y-2.5 text-xs text-[#262626]">
            {[
              'Never publishing residential addresses, specific home locations, or family vulnerability details.',
              'Avoiding full names of children in public captions (first names only or anonymized cohort references).',
              'Ensuring children are properly clothed and presented in respectful, empowered postures.',
              'Storing high-resolution master media files in secure, access-controlled repositories.',
              'Promptly honoring any parental or guardian request to remove or unpublish photographs.',
            ].map((rule) => (
              <li key={rule} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B05A28] shrink-0 mt-0.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Volunteer Code of Conduct */}
        <div className="bg-white rounded-2xl border border-[#E6DDD5] p-6 sm:p-10 space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-[#111111]">
            Volunteer & Field Worker Code of Conduct
          </h2>
          <div className="text-xs text-[#404040] space-y-3 leading-relaxed">
            <p>
              Every volunteer registered with AOS Foundation must sign our Child Safeguarding Undertaking prior to field deployment:
            </p>
            <div className="p-4 rounded-lg bg-[#FAF3EE] border border-[#E6DDD5] space-y-2 text-[#8F431E]">
              <p>• Never be alone in an unobserved space with a child.</p>
              <p>• Never use discriminatory, harsh, or humiliating language.</p>
              <p>• Never offer gifts, money, or personal contact info directly to minors outside official distribution protocols.</p>
              <p>• Immediately report any observed breach or safety concern to the Foundation Safeguarding Lead.</p>
            </div>
          </div>
        </div>

        {/* Reporting Channel */}
        <div className="bg-gradient-to-r from-[#FAF3EE] to-white rounded-2xl border border-[#E6DDD5] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B05A28]">
              <AlertTriangle className="w-4 h-4 text-[#B05A28]" />
              <span>Reporting Safeguarding Concerns</span>
            </div>
            <h3 className="text-lg font-bold text-[#111111]">
              Confidential Whistleblowing & Safeguarding Desk
            </h3>
            <p className="text-xs text-[#525252] max-w-lg">
              If you observe any conduct violating our child protection principles, report immediately to our dedicated focal officer. All reports are treated with urgent confidentiality.
            </p>
          </div>

          <a
            href={whatsappSafeguarding}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap shadow-xs"
          >
            Report Safeguarding Concern
          </a>
        </div>
      </section>

      {/* Bottom Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Child Safeguarding"
        prevSection={{ title: 'Transparency Reports', path: '/reports' }}
        nextSection={{ title: 'Frequently Asked Questions', path: '/faq' }}
        onNavigate={onNavigate}
        isBottom
      />
    </div>
  );
};
