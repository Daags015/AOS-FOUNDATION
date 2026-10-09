import React from 'react';
import { ArrowLeft, ArrowRight, Home, Compass } from 'lucide-react';

interface InlineSectionBarProps {
  currentTitle: string;
  prevSection?: { title: string; path: string };
  nextSection?: { title: string; path: string };
  onNavigate: (path: string) => void;
  breadcrumbs?: { title: string; path?: string }[];
  className?: string;
  isBottom?: boolean;
}

export const InlineSectionBar: React.FC<InlineSectionBarProps> = ({
  currentTitle,
  prevSection,
  nextSection,
  onNavigate,
  breadcrumbs,
  className = '',
  isBottom = false,
}) => {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else if (prevSection) {
      onNavigate(prevSection.path);
    } else {
      onNavigate('/');
    }
  };

  if (isBottom) {
    return (
      <nav
        aria-label="Bottom Section Navigation"
        className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8 ${className}`}
      >
        <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#E6DDD5] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <button
            type="button"
            onClick={handleGoBack}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF3EE] hover:bg-[#F3EAE2] text-[#8F431E] hover:text-[#B05A28] border border-[#E6DDD5] font-bold transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← Previous: {prevSection ? prevSection.title : 'Former Stage'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="text-[#737373] hover:text-[#111111] font-semibold transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Homepage Overview</span>
            </button>
          </div>

          {nextSection ? (
            <button
              type="button"
              onClick={() => onNavigate(nextSection.path)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B05A28] hover:bg-[#8F431E] text-white font-bold transition-all group cursor-pointer shadow-xs"
            >
              <span>Next: {nextSection.title}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('/donate')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#B05A28] hover:bg-[#8F431E] text-white font-bold transition-all group cursor-pointer shadow-xs"
            >
              <span>Support Our Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Top Section Navigation"
      className={`border-b border-[#E6DDD5] bg-[#FAF3EE]/80 sticky top-16 z-20 backdrop-blur-xs ${className}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F3EAE2] text-[#8F431E] hover:text-[#B05A28] border border-[#E6DDD5] font-bold transition-all group cursor-pointer shadow-2xs"
            title="Navigate to former section or stage"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>← Back{prevSection ? `: ${prevSection.title}` : ' to Former Section'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="hidden md:flex items-center gap-1.5 text-xs text-[#737373]">
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="hover:text-[#B05A28] transition-colors"
              >
                Home
              </button>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <span>/</span>
                  {crumb.path ? (
                    <button
                      type="button"
                      onClick={() => onNavigate(crumb.path!)}
                      className="hover:text-[#B05A28] transition-colors"
                    >
                      {crumb.title}
                    </button>
                  ) : (
                    <span className="font-semibold text-[#111111]">{crumb.title}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {nextSection && (
            <button
              type="button"
              onClick={() => onNavigate(nextSection.path)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B05A28] hover:bg-[#8F431E] text-white font-bold transition-all group cursor-pointer shadow-2xs"
              title={`Navigate to next section: ${nextSection.title}`}
            >
              <span>Next: {nextSection.title}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
