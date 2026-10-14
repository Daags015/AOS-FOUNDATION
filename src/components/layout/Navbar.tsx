import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { Menu, X, HeartHandshake, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isAdmin?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  isAdmin = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Meet Our Team', path: '/team' },
    { label: 'Programmes', path: '/programmes' },
    { label: 'Impact', path: '/impact' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Get Involved', path: '/get-involved' },
    { label: 'News', path: '/news' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Transparency', path: '/reports' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    if (path.includes('#')) {
      const [pagePath, hash] = path.split('#');
      onNavigate(pagePath || '/');
      setMobileMenuOpen(false);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
      return;
    }
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FCFAF7] border-b border-[#E6DDD5] transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Wordmark / Official Emblem */}
          <div
            onClick={() => handleLinkClick('/')}
            className="cursor-pointer flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-[#B05A28]"
            tabIndex={0}
            role="button"
            aria-label="AOS Foundation Home"
          >
            <BrandLogo size="md" />
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-4.5 2xl:gap-6 text-[13px] 2xl:text-[14px] font-medium text-[#262626]">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`relative py-1 transition-colors whitespace-nowrap cursor-pointer hover:text-[#B05A28] ${
                    isActive
                      ? 'text-[#B05A28] font-semibold'
                      : 'text-[#262626]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B05A28] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Portal Link */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('/volunteer')}
              className="text-xs font-semibold text-[#8F431E] hover:text-[#B05A28] px-3 py-2 rounded-md hover:bg-[#F3EAE2] transition-colors whitespace-nowrap cursor-pointer"
            >
              Volunteer
            </button>
            <button
              onClick={() => handleLinkClick('/donate')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-bold text-white bg-[#B05A28] hover:bg-[#8F431E] rounded-md shadow-xs transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Support Our Work</span>
            </button>
            {isAdmin ? (
              <button
                onClick={() => handleLinkClick('/admin')}
                className="p-2 text-[#8F431E] hover:bg-[#F3EAE2] rounded-md transition-colors cursor-pointer"
                title="Admin CMS Active"
              >
                <ShieldCheck className="w-5 h-5" />
              </button>
            ) : null}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleLinkClick('/donate')}
              className="sm:hidden px-3 py-1.5 text-xs font-bold text-white bg-[#B05A28] rounded-md"
            >
              Support
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] hover:text-[#B05A28] hover:bg-[#F3EAE2] rounded-md focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E6DDD5] bg-[#FCFAF7] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F3EAE2] text-[#B05A28] font-semibold'
                      : 'text-[#262626] hover:bg-[#F3EAE2]/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E6DDD5] grid grid-cols-2 gap-2">
            <button
              onClick={() => handleLinkClick('/volunteer')}
              className="w-full text-center py-2.5 px-3 text-xs font-semibold text-[#8F431E] bg-[#F3EAE2] hover:bg-[#E5CEBF] rounded-md"
            >
              Volunteer
            </button>
            <button
              onClick={() => handleLinkClick('/donate')}
              className="w-full text-center py-2.5 px-3 text-xs font-bold text-white bg-[#B05A28] hover:bg-[#8F431E] rounded-md"
            >
              Support Our Work
            </button>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => handleLinkClick('/admin')}
              className="text-xs text-[#8F431E] underline hover:text-[#B05A28]"
            >
              Staff & Admin Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
