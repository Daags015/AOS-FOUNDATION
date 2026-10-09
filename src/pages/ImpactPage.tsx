import React from 'react';
import { DataStore } from '../services/store';
import {
  ShieldCheck,
  FileCheck,
  TrendingUp,
  Download,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface ImpactPageProps {
  onNavigate: (path: string) => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ onNavigate }) => {
  const stats = DataStore.getImpactStats();
  const documents = DataStore.getDocuments();
  const programmes = DataStore.getProgrammes();

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-16">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Impact & Evidence"
        prevSection={{ title: 'Strategic Programmes', path: '/programmes' }}
        nextSection={{ title: 'Field Photo Archive', path: '/gallery' }}
        breadcrumbs={[{ title: 'Verifiable Impact' }]}
        onNavigate={onNavigate}
      />
      {/* Header */}
      <section className="bg-white border-b border-[#E6DDD5] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-3">
            <span>Evidence & Accountability</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Impact, Documentation & Transparency
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] leading-relaxed max-w-3xl">
            We believe donor trust is earned through verifiable ground truth. AOS Foundation maintains an open verification model: every figure represents real field records, and pending counts are honestly disclosed.
          </p>
        </div>
      </section>

      {/* Honest Data Manifesto Banner */}
      <section className="py-8 bg-[#FAF3EE] border-b border-[#E6DDD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-[#B05A28] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#8F431E] leading-relaxed">
              <span className="font-bold">Our Zero-Fabrication Pledge:</span> AOS Foundation does not inflate beneficiary statistics, fabricate awards, or create simulated testimonials. All metrics below reflect either verified operational milestones or active registry counters updated directly by foundation coordinators.
            </div>
          </div>
        </div>
      </section>

      {/* Verified Statistics Grid */}
      <section className="py-16 border-b border-[#E6DDD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#111111]">Strategic Indicators</h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-1">
              Field distribution records are compiled following community outreach cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="p-6 rounded-xl bg-white border border-[#E6DDD5] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                    {stat.label}
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#111111] mt-2 tabular-nums">
                    {stat.value}
                  </div>
                  {stat.unit && (
                    <span className="text-xs text-[#525252] mt-0.5 block">{stat.unit}</span>
                  )}
                </div>

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

      {/* The Non-Tuition Impact Model (Why Materials Matter) */}
      <section className="py-16 bg-white border-b border-[#E6DDD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-1">
              Theory of Change
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">
              How Essential Materials Keep Children in School
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-3">
              <span className="text-xl font-bold text-[#B05A28] font-mono">01. Dignity & Belonging</span>
              <h3 className="text-base font-bold text-[#111111]">Stigma Elimination</h3>
              <p className="text-xs text-[#525252] leading-relaxed">
                When students lack uniforms or shoes, social embarrassment leads to absenteeism. Providing new uniform sets restores equality in the classroom.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-3">
              <span className="text-xl font-bold text-[#B05A28] font-mono">02. Academic Participation</span>
              <h3 className="text-base font-bold text-[#111111]">Active Learning Tools</h3>
              <p className="text-xs text-[#525252] leading-relaxed">
                Without notebooks and writing instruments, children cannot take notes or complete homework. Supplying complete stationery packs enables real scholastic engagement.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-3">
              <span className="text-xl font-bold text-[#B05A28] font-mono">03. Community Trust</span>
              <h3 className="text-base font-bold text-[#111111]">Parental Relief</h3>
              <p className="text-xs text-[#525252] leading-relaxed">
                Relieving parents of non-tuition costs ensures households do not make the tragic choice between food and school books.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verification & Downloadable Reports */}
      <section className="py-16 border-b border-[#E6DDD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-1">
                Transparency Vault
              </div>
              <h2 className="text-2xl font-bold text-[#111111]">
                Governance Documents & Distribution Audits
              </h2>
            </div>
            <button
              onClick={() => onNavigate('/reports')}
              className="text-xs font-bold uppercase tracking-wider text-[#8F431E] hover:text-[#B05A28] transition-colors"
            >
              All Transparency Documents →
            </button>
          </div>

          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-[#E6DDD5] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#FAF3EE] text-[#B05A28] flex items-center justify-center shrink-0 mt-1">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#8F431E] font-medium mb-1">
                      <span>{doc.category}</span>
                      <span>·</span>
                      <span className="text-[#737373]">{doc.publishedDate}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#111111]">{doc.title}</h3>
                    <p className="text-xs text-[#525252] mt-1 max-w-2xl">{doc.summary}</p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-3 self-end sm:self-center">
                  <span className="text-[11px] font-mono text-[#737373] bg-[#FCFAF7] px-2 py-1 rounded border border-[#E6DDD5]">
                    {doc.officialStatus}
                  </span>
                  <button
                    onClick={() => onNavigate('/reports')}
                    className="p-2 rounded-md bg-[#FAF3EE] hover:bg-[#B05A28] text-[#8F431E] hover:text-white transition-colors"
                    title="View Document"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Banner */}
      <section className="py-16 bg-[#FAF3EE]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
            Partner With Us to Expand Verified Impact
          </h2>
          <p className="text-sm text-[#525252] max-w-xl mx-auto">
            We provide verified distribution tracking reports to all corporate sponsors and institutional partners.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Discuss Partnership
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Cross-Section Pathway Navigation */}
      <InlineSectionBar
        currentTitle="Impact & Evidence"
        prevSection={{ title: 'Strategic Programmes', path: '/programmes' }}
        nextSection={{ title: 'Field Photo Archive', path: '/gallery' }}
        onNavigate={onNavigate}
        isBottom
      />
    </div>
  );
};
