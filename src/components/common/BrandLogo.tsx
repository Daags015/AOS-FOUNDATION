import React, { useState, useEffect } from 'react';
import { DataStore } from '../../services/store';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'monochrome-white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
}) => {
  const [customLogoUrl, setCustomLogoUrl] = useState<string>(
    DataStore.getSiteContent().customLogoUrl || ''
  );

  useEffect(() => {
    const handleUpdate = () => {
      setCustomLogoUrl(DataStore.getSiteContent().customLogoUrl || '');
    };
    window.addEventListener('aos_store_updated', handleUpdate);
    return () => window.removeEventListener('aos_store_updated', handleUpdate);
  }, []);

  // Dimension tokens maintaining exact proportions
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16',
  };

  const isWhite = variant === 'monochrome-white';
  const copper = isWhite ? '#FFFFFF' : '#B05A28';
  const deepCopper = isWhite ? '#FFFFFF' : '#8F431E';
  const textDark = isWhite ? '#FFFFFF' : '#111111';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* If admin uploaded a custom logo image, display it */}
      {customLogoUrl ? (
        <img
          src={customLogoUrl}
          alt="AOS Foundation Official Logo"
          className={`${sizeClasses[size]} w-auto max-w-[180px] object-contain shrink-0 rounded-sm`}
          onError={() => setCustomLogoUrl('')}
        />
      ) : (
        /* Official Emblem Mark: Dignified interlocking book and rising path of empowerment */
        <svg
          className={`${sizeClasses[size]} w-auto aspect-square shrink-0`}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="AOS Foundation Official Emblem"
        >
          {/* Background shield/circle container with clear space */}
          <rect
            width="64"
            height="64"
            rx="14"
            fill={isWhite ? 'rgba(255,255,255,0.1)' : '#F3EAE2'}
          />

          {/* Foundation Arch of Opportunity */}
          <path
            d="M16 46V28C16 19.1634 23.1634 12 32 12C40.8366 12 48 19.1634 48 28V46"
            stroke={copper}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Open Book of Knowledge / Education Support */}
          <path
            d="M20 44C24 41 28 41 32 44C36 41 40 41 44 44V26C40 23 36 23 32 26C28 23 24 23 20 26V44Z"
            fill={deepCopper}
          />

          {/* Central Spine / Rising Sun of Dignity */}
          <line
            x1="32"
            y1="26"
            x2="32"
            y2="44"
            stroke="#FCFAF7"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Foundation Base Pillar */}
          <path d="M26 50H38" stroke={copper} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      )}

      {/* Official Wordmark Lockup (Shown when full variant) */}
      {variant !== 'mark' && (
        <div className="flex flex-col tracking-tight leading-none">
          <span
            className="font-extrabold tracking-wider uppercase text-base sm:text-lg"
            style={{
              color: textDark,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: '0.08em',
            }}
          >
            AOS FOUNDATION
          </span>
          <span
            className="text-[10px] sm:text-[11px] font-medium tracking-widest uppercase mt-0.5"
            style={{
              color: isWhite ? 'rgba(255,255,255,0.8)' : '#8F431E',
              letterSpacing: '0.12em',
            }}
          >
            Education · Empowerment · Skills
          </span>
        </div>
      )}
    </div>
  );
};
