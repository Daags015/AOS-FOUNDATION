import React from 'react';
import { DataStore } from '../services/store';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { formatDate } from '../utils';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface NewsDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ slug, onNavigate }) => {
  const post = DataStore.getNewsPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#111111]">Article Not Found</h2>
        <p className="text-sm text-[#525252]">The requested post could not be located.</p>
        <button
          onClick={() => onNavigate('/news')}
          className="px-5 py-2.5 rounded-md bg-[#B05A28] text-white text-xs font-bold uppercase tracking-wider"
        >
          View All News
        </button>
      </div>
    );
  }

  return (
    <article className="bg-[#FCFAF7] min-h-screen pb-24">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle={post.title}
        prevSection={{ title: 'News & Dispatches', path: '/news' }}
        nextSection={{ title: 'Support Our Work & Donate', path: '/donate' }}
        breadcrumbs={[
          { title: 'News & Dispatches', path: '/news' },
          { title: post.title },
        ]}
        onNavigate={onNavigate}
      />

      {/* Article Header */}
      <header className="bg-white border-b border-[#E6DDD5] py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B05A28]">
            <span>{post.category}</span>
            <span>·</span>
            <span className="text-[#737373]">{formatDate(post.publishedAt)}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#525252] leading-relaxed italic border-l-2 border-[#B05A28] pl-4">
            {post.excerpt}
          </p>

          <div className="pt-4 border-t border-[#E6DDD5] flex items-center justify-between text-xs text-[#737373]">
            <span className="flex items-center gap-1.5 font-medium text-[#111111]">
              <User className="w-4 h-4 text-[#B05A28]" />
              <span>By {post.author}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Narrative Column */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        {post.coverImage && (
          <div className="rounded-xl overflow-hidden border border-[#E6DDD5]">
            <ImageWithFallback
              src={post.coverImage}
              alt={post.title}
              category={post.category}
              aspectRatio="video"
            />
          </div>
        )}

        <div className="bg-white rounded-xl border border-[#E6DDD5] p-6 sm:p-10 shadow-xs">
          <div className="prose prose-stone max-w-none text-[#262626] leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line">
            {post.content}
          </div>
        </div>

        {/* Back navigation CTA */}
        <div className="pt-6 border-t border-[#E6DDD5] flex items-center justify-between">
          <button
            onClick={() => onNavigate('/news')}
            className="text-xs font-bold text-[#8F431E] hover:text-[#B05A28] flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to News Archive</span>
          </button>
          <button
            onClick={() => onNavigate('/donate')}
            className="px-4 py-2 bg-[#B05A28] text-white text-xs font-bold uppercase tracking-wider rounded-md"
          >
            Support This Mission
          </button>
        </div>

        {/* Bottom Cross-Section Navigation Bar */}
        <InlineSectionBar
          currentTitle={post.title}
          prevSection={{ title: 'News & Dispatches', path: '/news' }}
          nextSection={{ title: 'Support Our Work & Donate', path: '/donate' }}
          onNavigate={onNavigate}
          isBottom
        />
      </div>
    </article>
  );
};
