import React from 'react';
import { DataStore } from '../services/store';
import { Shield, Heart, Eye, Target, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const content = DataStore.getSiteContent();

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-16">
      {/* Header */}
      <section className="bg-white border-b border-[#E6DDD5] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-3">
            <span>About AOS Foundation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
            Bridging the Critical Divide in Basic Education
          </h1>
          <p className="mt-4 text-lg text-[#525252] leading-relaxed max-w-3xl">
            AOS Foundation is an indigenous non-profit initiative established to remove the physical and material obstacles that keep children out of primary and secondary school classrooms.
          </p>
        </div>
      </section>

      {/* Why We Exist & The Genesis */}
      <section className="py-16 sm:py-20 border-b border-[#E6DDD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-[#8F431E]">
                Our Genesis
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111111]">
                Why We Exist
              </h2>
              <div className="space-y-4 text-base text-[#404040] leading-relaxed">
                <p>
                  The inspiration behind AOS Foundation arose from a straightforward yet heartbreaking observation: across communities where governments provide free basic education, children still linger at home during school hours or struggle in the classroom.
                </p>
                <p>
                  When asked why, the answer is rarely tuition. It is the inability of families to purchase a mandatory pair of shoes, exercise books to write in, a backpack to carry books through wet seasons, or a clean school uniform.
                </p>
                <p>
                  Without these basic tools, children face social stigma, punishment, and eventual withdrawal. AOS Foundation exists to close this exact gap—turning the promise of free education into a practical reality for every child.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/programmes')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>Explore Our Three Programme Pillars</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#E6DDD5] overflow-hidden shadow-sm bg-white p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8F431E]">
                  Core Operational Focus:
                </h3>
                <ul className="space-y-3 text-xs text-[#262626]">
                  {content.materialsFocus.map((mat) => (
                    <li key={mat} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#B05A28] shrink-0" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-[#E6DDD5] text-[11px] text-[#737373]">
                  Distributed directly in collaboration with local public schools and verified community heads.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white border-b border-[#E6DDD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#FAF3EE] text-[#B05A28] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#111111]">Our Mission</h3>
              <p className="text-sm text-[#404040] leading-relaxed">
                {content.missionStatement}
              </p>
            </div>

            <div className="p-8 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#FAF3EE] text-[#B05A28] flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-[#111111]">Our Vision</h3>
              <p className="text-sm text-[#404040] leading-relaxed">
                {content.visionStatement}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Values */}
      <section className="py-16 sm:py-20 border-b border-[#E6DDD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-1">
              Ethical Foundation
            </div>
            <h2 className="text-3xl font-extrabold text-[#111111]">
              Our Guiding Values
            </h2>
            <p className="text-sm text-[#525252] mt-2">
              Every outreach, partnership, and distribution is governed by clear moral commitments:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.values.map((val) => (
              <div
                key={val.title}
                className="p-6 rounded-xl bg-white border border-[#E6DDD5] space-y-2 hover:border-[#B05A28]/40 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-[#B05A28]" />
                <h4 className="text-base font-bold text-[#111111]">{val.title}</h4>
                <p className="text-xs text-[#525252] leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach (The 4 Steps) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-1">
              Methodology
            </div>
            <h2 className="text-3xl font-extrabold text-[#111111]">
              How AOS Foundation Operates
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'School Consultation',
                desc: 'We liaise directly with public school teachers and community elders to identify students facing genuine material distress.',
              },
              {
                step: '02',
                title: 'Quality Sourcing',
                desc: 'We procure durable, reinforced learning materials—fostering local youth tailoring wherever possible for school uniforms.',
              },
              {
                step: '03',
                title: 'Dignified Distribution',
                desc: 'Kits are distributed with dignity and joy, respecting the privacy and self-worth of every child and guardian.',
              },
              {
                step: '04',
                title: 'Tracking & Retention',
                desc: 'We follow up with teachers to ensure distributed pupils maintain consistent class attendance and academic progression.',
              },
            ].map((step) => (
              <div key={step.step} className="p-6 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-3">
                <span className="text-2xl font-extrabold font-mono text-[#B05A28]">{step.step}</span>
                <h4 className="text-base font-bold text-[#111111]">{step.title}</h4>
                <p className="text-xs text-[#525252] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Stewards Gateway */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#E6DDD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-[#FCFAF7] border border-[#E6DDD5] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="text-xs font-bold uppercase tracking-widest text-[#B05A28]">
                Governance & Field Coordinators
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                Meet the Stewards Behind AOS Foundation
              </h3>
              <p className="text-sm text-[#525252] leading-relaxed">
                Our organization is steered by committed community educators, trustees, and logistics coordinators ensuring every exercise book, backpack, shoe, and uniform reaches public school pupils with complete accountability.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onNavigate('/team')}
                className="px-6 py-3.5 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Meet Our Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/reports')}
                className="px-5 py-3.5 rounded-md bg-white hover:bg-[#F3EAE2] text-[#111111] text-xs font-bold border border-[#E6DDD5] transition-colors cursor-pointer text-center"
              >
                Governance & Reports
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
