import React, { useState } from 'react';
import { BookOpen, Users, Scissors, GraduationCap, PackageCheck } from 'lucide-react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  category?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide';
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  category = 'Education Support',
  aspectRatio = 'video',
}) => {
  const [hasError, setHasError] = useState(false);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'portrait':
        return 'aspect-[3/4]';
      case 'wide':
        return 'aspect-[21/9]';
      case 'video':
      default:
        return 'aspect-[16/10]';
    }
  };

  const getCategoryTheme = () => {
    if (category?.includes('Skill')) {
      return {
        icon: Scissors,
        label: 'Skills Acquisition & Tailoring',
        bg: 'from-[#FAF3EE] to-[#F3EAE2]',
        accent: '#B05A28',
      };
    }
    if (category?.includes('Empower') || category?.includes('Community')) {
      return {
        icon: Users,
        label: 'Community & Family Dialogue',
        bg: 'from-[#F8F5F1] to-[#EFE7DE]',
        accent: '#8F431E',
      };
    }
    if (category?.includes('Volunteer')) {
      return {
        icon: Users,
        label: 'Field Volunteer Logistics',
        bg: 'from-[#FAF3EE] to-[#EBE2D7]',
        accent: '#B05A28',
      };
    }
    if (category?.includes('Material') || category?.includes('Pack')) {
      return {
        icon: PackageCheck,
        label: 'Essential Materials Pack',
        bg: 'from-[#F5EFEB] to-[#EADECF]',
        accent: '#B05A28',
      };
    }
    return {
      icon: GraduationCap,
      label: 'Education Support & School Kits',
      bg: 'from-[#FDFBF7] to-[#F3EAE2]',
      accent: '#B05A28',
    };
  };

  const theme = getCategoryTheme();
  const IconComponent = theme.icon;

  if (!src || hasError) {
    return (
      <div
        className={`relative overflow-hidden w-full ${getAspectClass()} bg-gradient-to-br ${theme.bg} border border-[#E6DDD5] flex flex-col items-center justify-center p-6 text-center select-none group ${className}`}
      >
        {/* Subtle geometric watermark for architectural editorial depth */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#B05A28_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Decorative corner accents in copper */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#B05A28]/40" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#B05A28]/40" />

        <div className="relative z-10 flex flex-col items-center max-w-xs">
          <div className="w-14 h-14 rounded-full bg-white shadow-xs border border-[#E6DDD5] flex items-center justify-center mb-3 text-[#B05A28] group-hover:scale-105 transition-transform duration-300">
            <IconComponent className="w-7 h-7 stroke-[1.6]" />
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8F431E] mb-1">
            {theme.label}
          </span>
          <p className="text-xs text-[#525252] line-clamp-2 font-medium">
            {alt || 'AOS Foundation Programme Field Documentation'}
          </p>
        </div>

        <div className="absolute bottom-2 left-4 text-[10px] text-[#8F431E]/70 font-mono">
          AOS · DOCUMENTATION
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`w-full ${getAspectClass()} object-cover ${className}`}
      loading="lazy"
    />
  );
};
