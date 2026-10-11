import React, { useState, useEffect } from 'react';
import {
  Compass,
  ArrowLeft,
  ArrowRight,
  X,
  Home,
  BookOpen,
  Layers,
  BarChart3,
  Image as ImageIcon,
  HeartHandshake,
  Heart,
  Users,
  Mail,
  Newspaper,
  FileText,
  ShieldAlert,
  HelpCircle,
  Lock,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface UniversalSectionNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isAdmin?: boolean;
  adminActiveTab?: string;
  onAdminChangeTab?: (tab: string) => void;
}

interface NavSection {
  id: string;
  title: string;
  path: string;
  category: 'core' | 'action' | 'governance' | 'admin';
  icon: React.ElementType;
  badge?: string;
  description: string;
}

export const UniversalSectionNav: React.FC<UniversalSectionNavProps> = ({
  currentPath,
  onNavigate,
  isAdmin = false,
  adminActiveTab,
  onAdminChangeTab,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleOpenNav = () => setIsOpen(true);
    window.addEventListener('aos_open_section_nav', handleOpenNav);
    return () => window.removeEventListener('aos_open_section_nav', handleOpenNav);
  }, []);

  // Ordered list of main public website sections/features
  const publicSections: NavSection[] = [
    {
      id: 'home',
      title: 'Home Overview',
      path: '/',
      category: 'core',
      icon: Home,
      description: 'Mission, hero showcase, core focus & live dispatches',
    },
    {
      id: 'about',
      title: 'About AOS Foundation',
      path: '/about',
      category: 'core',
      icon: BookOpen,
      description: 'Founding vision, leadership ethos & community values',
    },
    {
      id: 'programmes',
      title: 'Strategic Programmes',
      path: '/programmes',
      category: 'core',
      icon: Layers,
      badge: '3 Pillars',
      description: 'Education Support, Family Empowerment & Skills Acquisition',
    },
    {
      id: 'impact',
      title: 'Verifiable Impact',
      path: '/impact',
      category: 'core',
      icon: BarChart3,
      description: 'Audited distribution statistics & field transparency evidence',
    },
    {
      id: 'gallery',
      title: 'Field Photo Archive',
      path: '/gallery',
      category: 'core',
      icon: ImageIcon,
      description: 'Authentic photographs of school outreach & pupil packages',
    },
    {
      id: 'get-involved',
      title: 'Get Involved Pathways',
      path: '/get-involved',
      category: 'action',
      icon: HeartHandshake,
      description: 'Four direct routes: donate, volunteer, corporate CSR, sponsor',
    },
    {
      id: 'donate',
      title: 'Support Our Work & Donate',
      path: '/donate',
      category: 'action',
      icon: Heart,
      badge: 'Material / Funds',
      description: 'Material donation inquiry & fast procurement payment options',
    },
    {
      id: 'volunteer',
      title: 'Volunteer Registry',
      path: '/volunteer',
      category: 'action',
      icon: Users,
      description: 'Join field logistics, kit packing, mentoring & photography',
    },
    {
      id: 'contact',
      title: 'Contact & Inquiry Desk',
      path: '/contact',
      category: 'action',
      icon: Mail,
      description: 'Direct WhatsApp (08168779732), institutional inquiries & office',
    },
    {
      id: 'news',
      title: 'News & Field Dispatches',
      path: '/news',
      category: 'governance',
      icon: Newspaper,
      description: 'Field logs, educational insights & community articles',
    },
    {
      id: 'reports',
      title: 'Transparency Reports',
      path: '/reports',
      category: 'governance',
      icon: FileText,
      description: 'Auditable distribution reconciliations & governance charters',
    },
    {
      id: 'safeguarding',
      title: 'Child Safeguarding',
      path: '/safeguarding',
      category: 'governance',
      icon: ShieldAlert,
      badge: 'Strict Policy',
      description: 'Guardian consent protocols & non-exploitative child protection',
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      path: '/faq',
      category: 'governance',
      icon: HelpCircle,
      description: 'Clear answers on donations, material handling & field safety',
    },
  ];

  // Admin dashboard sections
  const adminSections = [
    { id: 'overview', title: 'Executive Overview', icon: BarChart3 },
    { id: 'programmes', title: 'Programmes CMS', icon: Layers },
    { id: 'impact', title: 'Impact Statistics', icon: BarChart3 },
    { id: 'gallery', title: 'Field Gallery Archive', icon: ImageIcon },
    { id: 'videos', title: 'YouTube Field Videos', icon: Compass },
    { id: 'team', title: 'Team & Role Delegation', icon: Users },
    { id: 'news', title: 'News & Dispatches', icon: Newspaper },
    { id: 'enquiries', title: 'Incoming Enquiries', icon: Mail },
    { id: 'volunteers', title: 'Volunteer Applications', icon: Users },
    { id: 'site-content', title: 'Site Content & Identity', icon: Sparkles },
    { id: 'documents', title: 'Reports & Governance', icon: FileText },
    { id: 'settings', title: 'Database & Supabase Sync', icon: Lock },
  ];

  const isInAdmin = currentPath.startsWith('/admin');

  // Active admin tab synchronized across dashboard and universal navigator
  const [internalAdminTab, setInternalAdminTab] = useState<string>(() => {
    try {
      return (
        adminActiveTab ||
        localStorage.getItem('aos_admin_active_tab_v2') ||
        sessionStorage.getItem('aos_admin_active_tab') ||
        'overview'
      );
    } catch {
      return 'overview';
    }
  });

  useEffect(() => {
    if (adminActiveTab) {
      setInternalAdminTab(adminActiveTab);
    }
  }, [adminActiveTab]);

  useEffect(() => {
    const handleTabActive = (e: any) => {
      if (e.detail) {
        setInternalAdminTab(e.detail);
      }
    };
    window.addEventListener('aos_admin_tab_active', handleTabActive);
    return () => window.removeEventListener('aos_admin_tab_active', handleTabActive);
  }, []);

  const effectiveAdminTab = adminActiveTab || internalAdminTab || 'overview';

  // Compute Current, Prev, and Next in sequence
  let currentIndex = -1;
  let prevSection: NavSection | null = null;
  let nextSection: NavSection | null = null;

  if (!isInAdmin) {
    currentIndex = publicSections.findIndex((s) => s.path === currentPath);
    if (currentIndex === -1) {
      if (currentPath.startsWith('/programmes/')) {
        currentIndex = publicSections.findIndex((s) => s.path === '/programmes');
      } else if (currentPath.startsWith('/news/')) {
        currentIndex = publicSections.findIndex((s) => s.path === '/news');
      }
    }

    if (currentIndex >= 0) {
      prevSection = currentIndex > 0 ? publicSections[currentIndex - 1] : publicSections[publicSections.length - 1];
      nextSection = currentIndex < publicSections.length - 1 ? publicSections[currentIndex + 1] : publicSections[0];
    }
  } else {
    const adminIndex = adminSections.findIndex((s) => s.id === effectiveAdminTab);
    const validIdx = adminIndex >= 0 ? adminIndex : 0;
    const prevAdmin = validIdx > 0 ? adminSections[validIdx - 1] : adminSections[adminSections.length - 1];
    const nextAdmin = validIdx < adminSections.length - 1 ? adminSections[validIdx + 1] : adminSections[0];

    prevSection = {
      id: prevAdmin.id,
      title: prevAdmin.title,
      path: '/admin',
      category: 'admin',
      icon: prevAdmin.icon,
      description: `Admin Section: ${prevAdmin.title}`,
    };
    nextSection = {
      id: nextAdmin.id,
      title: nextAdmin.title,
      path: '/admin',
      category: 'admin',
      icon: nextAdmin.icon,
      description: `Admin Section: ${nextAdmin.title}`,
    };
  }

  const handleNavigateTo = (targetPath: string, adminTabId?: string) => {
    setIsOpen(false);
    if (adminTabId) {
      setInternalAdminTab(adminTabId);
      try {
        localStorage.setItem('aos_admin_active_tab_v2', adminTabId);
        sessionStorage.setItem('aos_admin_active_tab', adminTabId);
      } catch {
        // Ignore
      }
      window.dispatchEvent(new CustomEvent('aos_admin_change_tab', { detail: adminTabId }));
      if (onAdminChangeTab) {
        onAdminChangeTab(adminTabId);
      }
    }
    onNavigate(targetPath);
  };

  const handleGoBack = () => {
    if (isInAdmin && prevSection && prevSection.category === 'admin') {
      setInternalAdminTab(prevSection.id);
      try {
        localStorage.setItem('aos_admin_active_tab_v2', prevSection.id);
        sessionStorage.setItem('aos_admin_active_tab', prevSection.id);
      } catch {
        // Ignore
      }
      window.dispatchEvent(new CustomEvent('aos_admin_change_tab', { detail: prevSection.id }));
      if (onAdminChangeTab) {
        onAdminChangeTab(prevSection.id);
      }
    } else if (window.history.length > 1) {
      window.history.back();
    } else if (prevSection) {
      onNavigate(prevSection.path);
    } else {
      onNavigate('/');
    }
  };

  const handleGoNext = () => {
    if (isInAdmin && nextSection && nextSection.category === 'admin') {
      setInternalAdminTab(nextSection.id);
      try {
        localStorage.setItem('aos_admin_active_tab_v2', nextSection.id);
        sessionStorage.setItem('aos_admin_active_tab', nextSection.id);
      } catch {
        // Ignore
      }
      window.dispatchEvent(new CustomEvent('aos_admin_change_tab', { detail: nextSection.id }));
      if (onAdminChangeTab) {
        onAdminChangeTab(nextSection.id);
      }
    } else if (nextSection) {
      onNavigate(nextSection.path);
    }
  };

  // Current title display
  const currentTitle = isInAdmin
    ? adminSections.find((s) => s.id === effectiveAdminTab)?.title || 'Admin Portal'
    : publicSections.find((s) => s.path === currentPath)?.title || 'AOS Foundation';

  return (
    <>
      {/* Full Modal Drawer: Complete Section & Feature Explorer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="section-navigator-heading"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#FCFAF7] rounded-t-3xl sm:rounded-2xl max-w-3xl w-full max-h-[88vh] overflow-hidden flex flex-col border border-[#E6DDD5] shadow-2xl animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-white border-b border-[#E6DDD5] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF3EE] text-[#B05A28] flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h2
                    id="section-navigator-heading"
                    className="text-lg font-extrabold text-[#111111]"
                  >
                    Website Section & Feature Navigator
                  </h2>
                  <p className="text-xs text-[#525252]">
                    Quickly jump between all features, public pages, and administrative controls.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-[#FCFAF7] hover:bg-[#FAF3EE] text-[#525252] hover:text-[#111111] border border-[#E6DDD5] transition-colors cursor-pointer"
                aria-label="Close section navigator"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Fast Jump Controls */}
            <div className="p-4 bg-[#FAF3EE]/60 border-b border-[#E6DDD5] flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#8F431E]">Currently in:</span>
                <span className="px-2.5 py-1 rounded-full bg-white border border-[#E6DDD5] font-semibold text-[#111111]">
                  {currentTitle}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    handleGoBack();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#FAF3EE] border border-[#E6DDD5] text-[#8F431E] font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Former Section</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    handleGoNext();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#FAF3EE] border border-[#E6DDD5] text-[#8F431E] font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Next Section</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Section Categorized List */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* Category 1: Main Platform Features */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-3">
                  Core Public Features & Portals
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {publicSections
                    .filter((s) => s.category === 'core')
                    .map((section) => {
                      const Icon = section.icon;
                      const isCurrent = currentPath === section.path;
                      return (
                        <button
                          type="button"
                          key={section.id}
                          onClick={() => handleNavigateTo(section.path)}
                          className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                            isCurrent
                              ? 'bg-white border-[#B05A28] shadow-sm ring-1 ring-[#B05A28]'
                              : 'bg-white border-[#E6DDD5] hover:border-[#B05A28]/40 hover:bg-[#FAF3EE]/40'
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg shrink-0 ${
                              isCurrent ? 'bg-[#B05A28] text-white' : 'bg-[#FAF3EE] text-[#B05A28]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-[#111111] truncate">
                                {section.title}
                              </span>
                              {section.badge && (
                                <span className="text-[10px] font-bold text-[#8F431E] bg-[#FAF3EE] px-1.5 py-0.5 rounded">
                                  {section.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#737373] mt-0.5 line-clamp-1">
                              {section.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Category 2: Support & Participation */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#8F431E] mb-3">
                  Support Our Work & Direct Action
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {publicSections
                    .filter((s) => s.category === 'action')
                    .map((section) => {
                      const Icon = section.icon;
                      const isCurrent = currentPath === section.path;
                      return (
                        <button
                          type="button"
                          key={section.id}
                          onClick={() => handleNavigateTo(section.path)}
                          className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                            isCurrent
                              ? 'bg-white border-[#B05A28] shadow-sm ring-1 ring-[#B05A28]'
                              : 'bg-white border-[#E6DDD5] hover:border-[#B05A28]/40 hover:bg-[#FAF3EE]/40'
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg shrink-0 ${
                              isCurrent ? 'bg-[#B05A28] text-white' : 'bg-[#FAF3EE] text-[#8F431E]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-[#111111] truncate">
                                {section.title}
                              </span>
                              {section.badge && (
                                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                                  {section.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#737373] mt-0.5 line-clamp-1">
                              {section.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Category 3: Governance & Transparency */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#737373] mb-3">
                  Governance, Safeguarding & Transparency
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {publicSections
                    .filter((s) => s.category === 'governance')
                    .map((section) => {
                      const Icon = section.icon;
                      const isCurrent = currentPath === section.path;
                      return (
                        <button
                          type="button"
                          key={section.id}
                          onClick={() => handleNavigateTo(section.path)}
                          className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                            isCurrent
                              ? 'bg-white border-[#B05A28] shadow-sm ring-1 ring-[#B05A28]'
                              : 'bg-white border-[#E6DDD5] hover:border-[#B05A28]/40 hover:bg-[#FAF3EE]/40'
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg shrink-0 ${
                              isCurrent ? 'bg-[#B05A28] text-white' : 'bg-[#FAF3EE] text-[#525252]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-[#111111] truncate">
                                {section.title}
                              </span>
                              {section.badge && (
                                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                                  {section.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#737373] mt-0.5 line-clamp-1">
                              {section.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Category 4: Administrative Management Portal */}
              <div className="pt-4 border-t border-[#E6DDD5]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#111111] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#B05A28]" />
                    <span>Administrative Portal & CMS Sections</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleNavigateTo('/admin', 'overview')}
                    className="text-xs font-bold text-[#B05A28] hover:underline"
                  >
                    Open Admin Dashboard →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {adminSections.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = isInAdmin && effectiveAdminTab === tab.id;
                    return (
                      <button
                        type="button"
                        key={tab.id}
                        onClick={() => handleNavigateTo('/admin', tab.id)}
                        className={`p-2.5 rounded-lg border text-left text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#B05A28] text-white border-[#B05A28]'
                            : 'bg-white border-[#E6DDD5] text-[#262626] hover:bg-[#FAF3EE]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{tab.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-[#E6DDD5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#737373] shrink-0">
              <span className="font-mono text-[11px]">
                AOS Foundation · Continuous Cross-Section Navigation System
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#FAF3EE] hover:bg-[#F3EAE2] text-[#8F431E] font-bold cursor-pointer"
              >
                Close Navigator
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
