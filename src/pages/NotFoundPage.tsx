import React from 'react';
import { BrandLogo } from '../components/common/BrandLogo';
import { Home, Compass, ArrowRight } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  attemptedPath?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigate,
  attemptedPath = '',
}) => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#FCFAF7] px-4 py-16">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-[#E6DDD5] p-8 sm:p-12 text-center space-y-6 shadow-sm">
        <BrandLogo size="md" className="mx-auto" />

        <div className="space-y-2">
          <span className="text-4xl sm:text-5xl font-extrabold font-mono text-[#B05A28]">
            404
          </span>
          <h1 className="text-2xl font-bold text-[#111111]">
            Page Not Located
          </h1>
          <p className="text-xs sm:text-sm text-[#525252] leading-relaxed">
            The page {attemptedPath ? <code className="bg-[#FAF3EE] px-1.5 py-0.5 rounded text-[#8F431E]">{attemptedPath}</code> : 'you requested'} does not exist or may have been reorganized.
          </p>
        </div>

        <div className="pt-4 border-t border-[#E6DDD5] flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>
          <button
            onClick={() => onNavigate('/programmes')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-[#FCFAF7] hover:bg-[#F3EAE2] text-[#111111] text-xs font-semibold border border-[#E6DDD5] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#8F431E]" />
            <span>Browse Programmes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
