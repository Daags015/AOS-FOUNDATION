import React, { useState } from 'react';
import { DataStore } from '../services/store';
import { GovernanceDocument } from '../types';
import { FileText, Download, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface ReportsPageProps {
  onNavigate: (path: string) => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ onNavigate }) => {
  const documents = DataStore.getDocuments();
  const [inspectedDoc, setInspectedDoc] = useState<GovernanceDocument | null>(null);

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-24">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Transparency Reports"
        prevSection={{ title: 'News & Dispatches', path: '/news' }}
        nextSection={{ title: 'Child Safeguarding', path: '/safeguarding' }}
        breadcrumbs={[{ title: 'Transparency Reports' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <section className="bg-white border-b border-[#E6DDD5] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-3">
            <span>Governance & Accountability</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Transparency & Institutional Reports
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] leading-relaxed max-w-2xl">
            AOS Foundation is committed to radical transparency. Here you will find our operational charters, safeguarding frameworks, and distribution audit templates.
          </p>
        </div>
      </section>

      {/* Honest Documentation Statement */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="p-5 rounded-xl bg-[#FAF3EE] border border-[#E6DDD5] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#B05A28] shrink-0 mt-0.5" />
          <div className="text-xs text-[#8F431E] leading-relaxed">
            <span className="font-bold">Authentic Disclosure Standard:</span> We do not fabricate legal certificates or financial declarations. Documents below comprise our operational guiding frameworks and audit templates. Foundation audited financial statements are published annually following full distribution reconciliations.
          </div>
        </div>
      </section>

      {/* Documents List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-[#E6DDD5] p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FCFAF7] text-[#B05A28] border border-[#E6DDD5] flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] text-[#8F431E] font-medium">
                    <span>{doc.category}</span>
                    <span>·</span>
                    <span className="text-[#737373]">{doc.publishedDate}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111111]">{doc.title}</h3>
                  <p className="text-xs text-[#525252] leading-relaxed max-w-2xl">
                    {doc.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono text-[#737373] bg-[#FCFAF7] border border-[#E6DDD5]">
                  {doc.officialStatus}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (doc.category === 'Safeguarding') {
                      onNavigate('/safeguarding');
                    } else {
                      setInspectedDoc(doc);
                    }
                  }}
                  className="px-4 py-2 rounded-md bg-[#FAF3EE] hover:bg-[#B05A28] text-[#8F431E] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audit & Partner Inquiries */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-white rounded-2xl border border-[#E6DDD5] p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-[#111111]">
            Request Institutional Due Diligence Pack
          </h3>
          <p className="text-xs text-[#525252] max-w-xl mx-auto leading-relaxed">
            Institutional donors, embassies, and grantmakers requiring customized due diligence packs, MOUs, or bank verification may request them directly through foundation leadership.
          </p>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-6 py-2.5 rounded-md bg-[#111111] hover:bg-[#262626] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Contact Governance Directorate
          </button>
        </div>
      </section>

      {/* Bottom Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Transparency Reports"
        prevSection={{ title: 'News & Dispatches', path: '/news' }}
        nextSection={{ title: 'Child Safeguarding', path: '/safeguarding' }}
        onNavigate={onNavigate}
        isBottom
      />

      {/* In-App Document Inspection Modal */}
      {inspectedDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setInspectedDoc(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#E6DDD5] animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF3EE] text-[#B05A28] border border-[#E6DDD5] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F431E]">
                    {inspectedDoc.category} · {inspectedDoc.officialStatus}
                  </span>
                  <h3 className="text-base font-bold text-[#111111]">{inspectedDoc.title}</h3>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#FCFAF7] rounded-xl border border-[#E6DDD5] space-y-2 text-xs text-[#404040] leading-relaxed">
              <p className="font-semibold text-[#111111]">Document Summary & Governance Scope:</p>
              <p>{inspectedDoc.summary}</p>
            </div>

            <div className="text-[11px] text-[#737373] flex items-center justify-between">
              <span>Published: {inspectedDoc.publishedDate}</span>
              <span>AOS Operational Archive</span>
            </div>

            <div className="pt-3 border-t border-[#E6DDD5] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setInspectedDoc(null)}
                className="px-5 py-2.5 rounded-xl border border-[#E6DDD5] hover:bg-neutral-50 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setInspectedDoc(null);
                  onNavigate('/contact');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold cursor-pointer"
              >
                Request Full PDF Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
