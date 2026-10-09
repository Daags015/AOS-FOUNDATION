import React, { useState } from 'react';
import { DataStore } from '../services/store';
import { GalleryItem } from '../types';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Filter, Eye, ShieldCheck, X, ArrowLeft } from 'lucide-react';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface GalleryPageProps {
  onNavigate: (path: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const items = DataStore.getGallery(true, true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Education Support',
    'Community Activities',
    'Empowerment',
    'Skills Acquisition',
    'Volunteers',
    'Events',
  ];

  const [showSafeguarding, setShowSafeguarding] = useState(false);

  const filtered = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-24">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Field Photo Archive"
        prevSection={{ title: 'Impact & Evidence', path: '/impact' }}
        nextSection={{ title: 'Get Involved Pathways', path: '/get-involved' }}
        breadcrumbs={[{ title: 'Field Photo Archive' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <section className="bg-white border-b border-[#E6DDD5] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Back Navigation Bar */}
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  onNavigate('/');
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FAF3EE] hover:bg-[#F3EAE2] text-[#8F431E] hover:text-[#B05A28] border border-[#E6DDD5] text-xs font-bold transition-all group cursor-pointer shadow-xs"
              title="Return to previous screen or home page"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>← Back to Previous Stage / Home</span>
            </button>
            <span className="text-xs text-[#737373] hidden sm:inline">
              Home &rarr; Field Photographic Evidence
            </span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-3">
              <span>Visual Archive</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
              Field Gallery & Photographic Evidence
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#525252] leading-relaxed">
              Documenting educational pack preparations, school engagements, and community sessions under strict child safeguarding and privacy guidelines.
            </p>
          </div>

          {/* Category Filter Tabs & Optional Safeguarding Toggle */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#E6DDD5] pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#8F431E] uppercase tracking-wider mr-2 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
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

            {/* Optional Child Safeguarding Toggle Button */}
            <button
              type="button"
              onClick={() => setShowSafeguarding(!showSafeguarding)}
              className={`px-3.5 py-2 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border ${
                showSafeguarding
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-[#FCFAF7] border-[#E6DDD5] text-[#525252] hover:text-[#111111] hover:border-[#B05A28]/40'
              }`}
              title="Toggle child safeguarding verification badges across all photos"
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${showSafeguarding ? 'text-emerald-600' : 'text-[#8F431E]'}`} />
              <span>Safeguarding: {showSafeguarding ? 'Badges Visible' : 'Badges Hidden'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-[#E6DDD5]">
            <p className="text-sm text-[#737373]">
              No photographs in this category yet. Field photos can be uploaded via the Admin CMS.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#E6DDD5] overflow-hidden shadow-xs hover:border-[#B05A28]/50 hover:shadow-md transition-all flex flex-col group cursor-pointer"
                onClick={() => setActiveModalItem(item)}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={item.url}
                    alt={item.caption}
                    category={item.category}
                    aspectRatio="video"
                    className="group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-white/90 text-xs font-bold text-[#111111] rounded-md shadow-xs flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#B05A28]" />
                      <span>Inspect Photo</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F431E]">
                      {item.category}
                    </span>
                    <p className="text-xs font-medium text-[#111111] mt-1 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E6DDD5] flex items-center justify-between text-[11px] text-[#737373]">
                    <span>{item.photographerCredit || 'AOS Media Team'}</span>
                    {showSafeguarding && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Safeguarded & Cleared</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Return Pathway */}
        <div className="mt-12 pt-8 border-t border-[#E6DDD5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF3EE] hover:bg-[#F3EAE2] text-[#8F431E] hover:text-[#B05A28] border border-[#E6DDD5] text-xs font-bold transition-all group cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Homepage</span>
          </button>
          <p className="text-xs text-[#737373] text-center sm:text-right">
            AOS Foundation · Dignified Educational Support Across Nigeria
          </p>
        </div>
      </section>

      {/* Full-view Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E6DDD5] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <ImageWithFallback
                src={activeModalItem.url}
                alt={activeModalItem.caption}
                category={activeModalItem.category}
                aspectRatio="video"
              />
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B05A28]">
                  {activeModalItem.category}
                </span>
                <span className="text-xs text-[#737373]">
                  Credit: {activeModalItem.photographerCredit || 'AOS Media Team'}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#111111]">
                {activeModalItem.caption}
              </h3>

              {activeModalItem.contextNote && (
                <div className="p-3 bg-[#FAF3EE] rounded-lg text-xs text-[#8F431E] leading-relaxed">
                  <span className="font-semibold">Context Note:</span>{' '}
                  {activeModalItem.contextNote}
                </div>
              )}

              <div className="pt-3 border-t border-[#E6DDD5] flex items-center justify-between text-xs text-[#737373]">
                <span>Child Protection: Verified & Approved</span>
                <button
                  onClick={() => onNavigate('/safeguarding')}
                  className="text-[#B05A28] hover:underline"
                >
                  View Safeguarding Guidelines
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Field Photo Archive"
        prevSection={{ title: 'Impact & Evidence', path: '/impact' }}
        nextSection={{ title: 'Get Involved Pathways', path: '/get-involved' }}
        onNavigate={onNavigate}
        isBottom
      />

      {/* Floating Return Button for Mobile Screen Convenience */}
      <div className="fixed bottom-6 left-6 z-40 sm:hidden">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              onNavigate('/');
            }
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111111]/90 backdrop-blur-md text-white text-xs font-bold shadow-xl border border-white/20 active:scale-95 transition-transform"
          aria-label="Return to previous screen"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4A992]" />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
};
