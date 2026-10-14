import React from 'react';

export interface InlineSectionBarProps {
  currentTitle?: string;
  prevSection?: { title: string; path: string };
  nextSection?: { title: string; path: string };
  onNavigate?: (path: string) => void;
  breadcrumbs?: { title: string; path?: string }[];
  className?: string;
  isBottom?: boolean;
}

/**
 * Disabled redundant secondary navigation bar.
 * Primary navigation is centralized exclusively in the official top Navbar.
 */
export const InlineSectionBar: React.FC<InlineSectionBarProps> = () => {
  return null;
};
