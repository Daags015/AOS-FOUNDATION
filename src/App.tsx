import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { ProgrammesPage } from './pages/ProgrammesPage';
import { ProgrammeDetailPage } from './pages/ProgrammeDetailPage';
import { ImpactPage } from './pages/ImpactPage';
import { GalleryPage } from './pages/GalleryPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
import { DonatePage } from './pages/DonatePage';
import { VolunteerPage } from './pages/VolunteerPage';
import { ContactPage } from './pages/ContactPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { ReportsPage } from './pages/ReportsPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { SafeguardingPage } from './pages/SafeguardingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { DataStore } from './services/store';
import { updatePageSEO } from './utils';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return DataStore.isAdminAuthenticated();
  });

  // Synchronize browser history and popstate events
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    const handleStoreUpdate = () => {
      setIsAdmin(DataStore.isAdminAuthenticated());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('aos_store_updated', handleStoreUpdate);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('aos_store_updated', handleStoreUpdate);
    };
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Dynamic SEO metadata based on current route
  useEffect(() => {
    if (currentPath === '/') {
      updatePageSEO(
        'Home | Essential Educational Materials, Empowerment & Skills',
        'AOS Foundation provides notebooks, school bags, shoes, uniforms, and essential educational materials to bridge the non-tuition learning divide.'
      );
    } else if (currentPath === '/about') {
      updatePageSEO(
        'About Us',
        'Learn why AOS Foundation was founded, our mission to supply basic school kits with dignity, and our core community values.'
      );
    } else if (currentPath === '/team') {
      updatePageSEO(
        'Meet Our Team',
        'Meet the dedicated leadership, trustees, and field stewards coordinating basic school supplies for children.'
      );
    } else if (currentPath === '/programmes') {
      updatePageSEO(
        'Strategic Programmes',
        'Explore Education Support, Family & Community Empowerment, and Vocational Skills Acquisition programmes.'
      );
    } else if (currentPath.startsWith('/programmes/')) {
      const slug = currentPath.replace('/programmes/', '');
      const prog = DataStore.getProgrammeBySlug(slug);
      if (prog) {
        updatePageSEO(prog.title, prog.shortDescription);
      }
    } else if (currentPath === '/impact') {
      updatePageSEO(
        'Impact & Evidence',
        'Honest, verifiable impact reporting, distribution documentation, and data accountability.'
      );
    } else if (currentPath === '/gallery') {
      updatePageSEO(
        'Field Gallery',
        'Photographic archive of school visits, material distributions, and community consultations under child safeguarding protocols.'
      );
    } else if (currentPath === '/get-involved') {
      updatePageSEO(
        'Get Involved',
        'Four clear pathways to support: donate materials, corporate partnership, volunteer your skills, or sponsor a classroom.'
      );
    } else if (currentPath === '/donate') {
      updatePageSEO(
        'Support Our Work | Donation & Material Sponsorship',
        'Sponsor student learning packs or donate exercise books, backpacks, shoes, uniforms, and socks.'
      );
    } else if (currentPath === '/volunteer') {
      updatePageSEO(
        'Volunteer Registry',
        'Join the AOS Foundation field network to assist with educational material packaging and school distributions.'
      );
    } else if (currentPath === '/contact') {
      updatePageSEO(
        'Contact & Inquiries',
        'Reach the AOS Foundation coordination desk via official phone, WhatsApp (08168779732), or inquiry form.'
      );
    } else if (currentPath === '/news') {
      updatePageSEO(
        'News & Dispatches',
        'Updates, field reports, and insights on education access and community empowerment.'
      );
    } else if (currentPath.startsWith('/news/')) {
      const slug = currentPath.replace('/news/', '');
      const post = DataStore.getNewsPostBySlug(slug);
      if (post) {
        updatePageSEO(post.title, post.excerpt);
      }
    } else if (currentPath === '/reports') {
      updatePageSEO(
        'Transparency & Governance Reports',
        'Review governance charters, safeguarding policies, and distribution audit templates.'
      );
    } else if (currentPath === '/safeguarding') {
      updatePageSEO(
        'Child Safeguarding & Protection Policy',
        'Our non-negotiable guidelines regarding child dignity, privacy, and responsible photography.'
      );
    } else if (currentPath === '/faq') {
      updatePageSEO(
        'Frequently Asked Questions',
        'Answers to common donor and community questions regarding our distribution model.'
      );
    } else if (currentPath === '/privacy') {
      updatePageSEO('Privacy Policy', 'Data protection and confidentiality standards for AOS Foundation.');
    } else if (currentPath === '/terms') {
      updatePageSEO('Terms of Engagement', 'Official terms governing platform usage and non-profit partnerships.');
    } else if (currentPath.startsWith('/admin')) {
      document.title = 'AOS Admin Portal | Content Management System';
    }
  }, [currentPath]);

  // Route Resolver
  const renderRoute = () => {
    // 1. Admin Portal
    if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
      return <AdminDashboard onNavigate={navigate} />;
    }

    // 2. Specific Public Routes
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigate} />;
    }

    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (currentPath === '/team') {
      return <TeamPage onNavigate={navigate} />;
    }

    if (currentPath === '/programmes') {
      return <ProgrammesPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/programmes/')) {
      const slug = currentPath.replace('/programmes/', '');
      return <ProgrammeDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentPath === '/impact') {
      return <ImpactPage onNavigate={navigate} />;
    }

    if (currentPath === '/gallery') {
      return <GalleryPage onNavigate={navigate} />;
    }

    if (currentPath === '/get-involved') {
      return <GetInvolvedPage onNavigate={navigate} />;
    }

    if (currentPath === '/donate') {
      return <DonatePage onNavigate={navigate} />;
    }

    if (currentPath === '/volunteer') {
      return <VolunteerPage onNavigate={navigate} />;
    }

    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    if (currentPath === '/news') {
      return <NewsPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/news/')) {
      const slug = currentPath.replace('/news/', '');
      return <NewsDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentPath === '/reports') {
      return <ReportsPage onNavigate={navigate} />;
    }

    if (currentPath === '/faq') {
      return <FaqPage onNavigate={navigate} />;
    }

    if (currentPath === '/safeguarding') {
      return <SafeguardingPage onNavigate={navigate} />;
    }

    if (currentPath === '/privacy') {
      return <PrivacyPage onNavigate={navigate} />;
    }

    if (currentPath === '/terms') {
      return <TermsPage onNavigate={navigate} />;
    }

    // 3. Fallback for genuinely invalid route
    return <NotFoundPage onNavigate={navigate} attemptedPath={currentPath} />;
  };

  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7] text-[#111111]">
      {!isAdminRoute && (
        <Navbar currentPath={currentPath} onNavigate={navigate} isAdmin={isAdmin} />
      )}

      <main className="flex-1">{renderRoute()}</main>

      {!isAdminRoute && <Footer onNavigate={navigate} />}

      {!isAdminRoute && <FloatingWhatsApp />}
    </div>
  );
}
