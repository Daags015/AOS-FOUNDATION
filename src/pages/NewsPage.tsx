import React, { useState } from 'react';
import { DataStore } from '../services/store';
import { NewsPost } from '../types';
import { formatDate } from '../utils';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Calendar, User, ArrowRight, Filter } from 'lucide-react';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface NewsPageProps {
  onNavigate: (path: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const posts = DataStore.getNewsPosts().filter((p) => p.published);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Programme Update', 'Community', 'Education', 'Announcement', 'Event', 'Impact'];

  const filtered = selectedCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-24">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="News & Dispatches"
        prevSection={{ title: 'Contact Desk', path: '/contact' }}
        nextSection={{ title: 'Transparency Reports', path: '/reports' }}
        breadcrumbs={[{ title: 'News' }]}
        onNavigate={onNavigate}
      />
      {/* Header */}
      <section className="bg-white border-b border-[#E6DDD5] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-3">
            <span>Dispatches & Updates</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            News & Field Insights
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] leading-relaxed max-w-2xl">
            Articles, field journals, and policy perspectives regarding basic educational materials, community empowerment, and vocational training.
          </p>

          {/* Category Tabs */}
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-[#E6DDD5] pt-6">
            <span className="text-xs font-bold text-[#8F431E] uppercase tracking-wider mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#B05A28] text-white'
                    : 'bg-[#FCFAF7] text-[#262626] hover:bg-[#F3EAE2] border border-[#E6DDD5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-[#E6DDD5]">
            <p className="text-sm text-[#737373]">No published articles in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-[#E6DDD5] overflow-hidden shadow-xs hover:border-[#B05A28]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <ImageWithFallback
                    src={item.coverImage}
                    alt={item.title}
                    category={item.category}
                    aspectRatio="video"
                  />

                  <div className="p-6 sm:p-8 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#8F431E] font-medium">
                      <span>{item.category}</span>
                      <span>·</span>
                      <span className="text-[#737373]">{formatDate(item.publishedAt)}</span>
                    </div>

                    <h2
                      onClick={() => onNavigate(`/news/${item.slug}`)}
                      className="text-xl font-bold text-[#111111] hover:text-[#B05A28] cursor-pointer transition-colors leading-snug"
                    >
                      {item.title}
                    </h2>

                    <p className="text-xs text-[#525252] leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 border-t border-[#E6DDD5]/60 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-[#737373] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{item.author}</span>
                  </span>

                  <button
                    onClick={() => onNavigate(`/news/${item.slug}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B05A28] hover:text-[#8F431E] transition-colors cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Cross-Section Pathway Navigation */}
      <InlineSectionBar
        currentTitle="News & Dispatches"
        prevSection={{ title: 'Contact Desk', path: '/contact' }}
        nextSection={{ title: 'Transparency Reports', path: '/reports' }}
        onNavigate={onNavigate}
        isBottom
      />
    </div>
  );
};
