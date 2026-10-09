import React, { useState } from 'react';
import { DataStore } from '../services/store';
import { Programme, ProgrammeCategory } from '../types';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ArrowRight, CheckCircle2, Filter } from 'lucide-react';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface ProgrammesPageProps {
  onNavigate: (path: string) => void;
}

export const ProgrammesPage: React.FC<ProgrammesPageProps> = ({ onNavigate }) => {
  const allProgrammes = DataStore.getProgrammes().filter((p) => p.status !== 'Draft');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Education Support', 'Empowerment', 'Skills Acquisition'];

  const filtered = selectedCategory === 'All'
    ? allProgrammes
    : allProgrammes.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-16">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Programmes"
        prevSection={{ title: 'About Us', path: '/about' }}
        nextSection={{ title: 'Verifiable Impact', path: '/impact' }}
        breadcrumbs={[{ title: 'Programmes' }]}
        onNavigate={onNavigate}
      />
      {/* Header */}
      <section className="bg-white border-b border-[#E6DDD5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-3">
              <span>AOS Strategic Initiatives</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
              Our Programmes
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#525252] leading-relaxed">
              Targeted, community-centered initiatives focused on immediate material education support, caregiver empowerment, and long-term youth skills acquisition.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-[#E6DDD5] pt-6">
            <span className="text-xs font-bold text-[#8F431E] uppercase tracking-wider mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#B05A28] text-white shadow-xs'
                    : 'bg-[#FCFAF7] text-[#262626] hover:bg-[#F3EAE2] border border-[#E6DDD5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programme Listing */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {filtered.map((prog, idx) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-[#E6DDD5] overflow-hidden shadow-xs hover:border-[#B05A28]/40 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Visual Side */}
                  <div className="lg:col-span-5 relative">
                    <ImageWithFallback
                      src={prog.coverImage}
                      alt={prog.title}
                      category={prog.category}
                      aspectRatio="video"
                      className="w-full h-64 sm:h-80 lg:h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-md bg-white/90 backdrop-blur-xs text-[11px] font-bold text-[#8F431E] border border-[#E6DDD5]">
                        {prog.status}
                      </span>
                    </div>
                  </div>

                  {/* Narrative Side */}
                  <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#B05A28] mb-2">
                        {prog.category} · Pillar 0{idx + 1}
                      </div>

                      <h2
                        onClick={() => onNavigate(`/programmes/${prog.slug}`)}
                        className="text-2xl sm:text-3xl font-extrabold text-[#111111] hover:text-[#B05A28] transition-colors cursor-pointer"
                      >
                        {prog.title}
                      </h2>

                      <p className="mt-3 text-sm text-[#404040] leading-relaxed">
                        {prog.shortDescription}
                      </p>

                      {/* Materials List */}
                      {prog.materialsIncluded.length > 0 && (
                        <div className="mt-5 space-y-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                            Core Materials Provided:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#262626]">
                            {prog.materialsIncluded.map((mat) => (
                              <div key={mat} className="flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#B05A28] shrink-0" />
                                <span>{mat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-[#E6DDD5] flex flex-wrap items-center justify-between gap-4">
                      <div className="text-xs text-[#737373]">
                        <span className="font-semibold text-[#111111]">Location:</span>{' '}
                        {prog.location}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onNavigate(`/programmes/${prog.slug}`)}
                          className="px-5 py-2.5 rounded-md bg-[#FAF3EE] hover:bg-[#B05A28] text-[#8F431E] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Programme Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Cross-Section Pathway Navigation */}
      <InlineSectionBar
        currentTitle="Programmes"
        prevSection={{ title: 'About Us', path: '/about' }}
        nextSection={{ title: 'Verifiable Impact', path: '/impact' }}
        onNavigate={onNavigate}
        isBottom
      />
    </div>
  );
};
