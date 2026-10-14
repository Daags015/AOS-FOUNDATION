import React from 'react';

export interface UniversalSectionNavProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  isAdmin?: boolean;
  adminActiveTab?: string;
  onAdminChangeTab?: (tab: string) => void;
}

/**
 * Disabled redundant floating sections navigation playcard.
 * Single professional navigation bar is maintained exclusively at the top.
 */
export const UniversalSectionNav: React.FC<UniversalSectionNavProps> = () => {
  return null;
};
