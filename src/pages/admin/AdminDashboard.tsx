import React, { useState, useEffect, useRef } from 'react';
import { DataStore } from '../../services/store';
import { SupabaseService } from '../../services/supabase';
import {
  Programme,
  ImpactStatistic,
  GalleryItem,
  NewsPost,
  VolunteerApplication,
  ContactEnquiry,
  GovernanceDocument,
  SiteContent,
  YouTubeVideoItem,
  TeamMember,
  TeamMemberPermissions,
  AdminAuthSession,
} from '../../types';
import {
  LayoutDashboard,
  BookOpen,
  Image as ImageIcon,
  Film,
  Newspaper,
  BarChart3,
  Mail,
  Users,
  FileText,
  Sliders,
  Settings,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Phone,
  Crown,
  UserCheck,
  Key,
  X,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Compass,
  EyeOff,
  AlertTriangle,
} from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';
import { formatDate, compressImageFile, getYouTubeThumbnail } from '../../utils';

const ADMIN_TAB_KEY = 'aos_admin_active_tab_v2';
const TEAM_DRAFT_KEY = 'aos_team_member_draft_v2';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

type AdminTab =
  | 'overview'
  | 'programmes'
  | 'gallery'
  | 'videos'
  | 'team'
  | 'news'
  | 'impact'
  | 'enquiries'
  | 'volunteers'
  | 'site-content'
  | 'documents'
  | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<AdminAuthSession | null>(DataStore.getAdminSession());
  const [passphrase, setPassphrase] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>(() => {
    try {
      const saved = (localStorage.getItem(ADMIN_TAB_KEY) || sessionStorage.getItem('aos_admin_active_tab')) as AdminTab;
      if (saved) return saved;
    } catch {
      // Ignore
    }
    return 'overview';
  });

  const changeTab = (tab: AdminTab) => {
    setActiveTab(tab);
    try {
      localStorage.setItem(ADMIN_TAB_KEY, tab);
      sessionStorage.setItem('aos_admin_active_tab', tab);
    } catch {
      // Ignore
    }
    window.dispatchEvent(new CustomEvent('aos_admin_tab_active', { detail: tab }));
  };

  useEffect(() => {
    // Synchronize initial active tab with universal navigator
    window.dispatchEvent(new CustomEvent('aos_admin_tab_active', { detail: activeTab }));

    const handleExternalTabChange = (e: any) => {
      if (e.detail) {
        setActiveTab(e.detail as AdminTab);
        setEditingProg(null);
        setEditingNews(null);
        setEditingStat(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('aos_admin_change_tab', handleExternalTabChange);
    return () => window.removeEventListener('aos_admin_change_tab', handleExternalTabChange);
  }, []);

  // Reactive state from DataStore
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [videos, setVideos] = useState<YouTubeVideoItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [news, setNews] = useState<NewsPost[]>([]);
  const [impactStats, setImpactStats] = useState<ImpactStatistic[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([]);
  const [documents, setDocuments] = useState<GovernanceDocument[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(DataStore.getSiteContent());

  // Editing state holders
  const [editingProg, setEditingProg] = useState<Programme | null>(null);
  const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
  const [editingStat, setEditingStat] = useState<ImpactStatistic | null>(null);
  const [editingVideo, setEditingVideo] = useState<YouTubeVideoItem | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [teamFormError, setTeamFormError] = useState<string | null>(null);
  const [galleryFormError, setGalleryFormError] = useState<string | null>(null);
  const [videoFormError, setVideoFormError] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'gallery' | 'team' | 'programme' | 'news' | 'enquiry' | 'volunteer' | 'video' | 'baseline';
    id?: string;
    title: string;
    subtitle?: string;
    image?: string;
  } | null>(null);
  const [newGalleryCaption, setNewGalleryCaption] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState<GalleryItem['category']>('Education Support');
  const [newGalleryChildCleared, setNewGalleryChildCleared] = useState(true);
  const [newGalleryPublished, setNewGalleryPublished] = useState(true);
  const [newGalleryImageSrc, setNewGalleryImageSrc] = useState('');
  const [confirmDeleteGalleryId, setConfirmDeleteGalleryId] = useState<string | null>(null);
  const [visiblePasscodes, setVisiblePasscodes] = useState<Record<string, boolean>>({});
  const [currentMasterPasswordInput, setCurrentMasterPasswordInput] = useState('');
  const [newMasterPasswordInput, setNewMasterPasswordInput] = useState('');
  const [confirmMasterPasswordInput, setConfirmMasterPasswordInput] = useState('');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState<{ text: string; isError: boolean } | null>(null);
  const [showCurrentMasterPassword, setShowCurrentMasterPassword] = useState(false);
  const [showNewMasterPassword, setShowNewMasterPassword] = useState(false);
  const [showConfirmMasterPassword, setShowConfirmMasterPassword] = useState(false);
  const [showEditPasscode, setShowEditPasscode] = useState(false);
  const [isUploadingTeamPhoto, setIsUploadingTeamPhoto] = useState(false);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const teamImageInputRef = useRef<HTMLInputElement>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [supabaseTestMsg, setSupabaseTestMsg] = useState<{ ok: boolean; message: string } | null>(null);
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);

  const loadData = () => {
    setIsAuthenticated(DataStore.isAdminAuthenticated());
    setSession(DataStore.getAdminSession());
    setProgrammes(DataStore.getProgrammes());
    setGallery(DataStore.getGallery());
    setVideos(DataStore.getYouTubeVideos());
    setTeamMembers(DataStore.getTeamMembers());
    setNews(DataStore.getNewsPosts());
    setImpactStats(DataStore.getImpactStats());
    setEnquiries(DataStore.getEnquiries());
    setVolunteers(DataStore.getVolunteers());
    setDocuments(DataStore.getDocuments());
    setSiteContent(DataStore.getSiteContent());
  };

  useEffect(() => {
    loadData();
    const handleStoreUpdate = () => loadData();
    window.addEventListener('aos_store_updated', handleStoreUpdate);

    // Restore any active team member editing draft so mobile camera/file switching never loses user work
    try {
      const savedDraft = localStorage.getItem(TEAM_DRAFT_KEY) || sessionStorage.getItem('aos_team_member_draft');
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed && (parsed.id || parsed.name)) {
          setEditingMember(parsed);
        }
      }
    } catch {
      // Ignore parse errors
    }

    return () => window.removeEventListener('aos_store_updated', handleStoreUpdate);
  }, []);

  const updateEditingMember = (updates: Partial<TeamMember>) => {
    setTeamFormError(null);
    setEditingMember((prev) => {
      if (!prev) return null;
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(TEAM_DRAFT_KEY, JSON.stringify(next));
        sessionStorage.setItem('aos_team_member_draft', JSON.stringify(next));
      } catch {
        // Ignore quota/storage errors
      }
      return next;
    });
  };

  const clearEditingMemberDraft = () => {
    try {
      localStorage.removeItem(TEAM_DRAFT_KEY);
      sessionStorage.removeItem('aos_team_member_draft');
    } catch {
      // Ignore
    }
    setTeamFormError(null);
    setEditingMember(null);
  };

  const triggerToast = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = DataStore.loginAdmin(passphrase);
    if (res.success && res.session) {
      setIsAuthenticated(true);
      setSession(res.session);
      setAuthError(false);
      setPassphrase('');
      loadData();
      triggerToast(
        res.session.isMasterAdmin
          ? 'Welcome, Master Administrator.'
          : `Signed in as: ${res.session.memberName} (${res.session.memberPosition})`
      );
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    DataStore.logoutAdmin();
    setIsAuthenticated(false);
    setSession(null);
  };

  // Direct Image File Upload Handler with Canvas Compression
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'gallery' | 'programme' | 'news' | 'team'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (target === 'team') {
      setIsUploadingTeamPhoto(true);
    }

    try {
      // For team avatars, downscale to 500x500 at 0.78 quality to guarantee no mobile crash/flicker
      const maxDim = target === 'team' ? 500 : 1280;
      const quality = target === 'team' ? 0.78 : 0.85;
      const result = await compressImageFile(file, maxDim, maxDim, quality);

      if (target === 'gallery') {
        setNewGalleryImageSrc(result);
      } else if (target === 'programme') {
        setEditingProg((prev) => (prev ? { ...prev, coverImage: result } : prev));
      } else if (target === 'news') {
        setEditingNews((prev) => (prev ? { ...prev, coverImage: result } : prev));
      } else if (target === 'team') {
        updateEditingMember({ imageUrl: result });
      }
    } catch (err) {
      console.warn('Canvas compression fallback to standard reader:', err);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (target === 'gallery') {
          setNewGalleryImageSrc(result);
        } else if (target === 'programme') {
          setEditingProg((prev) => (prev ? { ...prev, coverImage: result } : prev));
        } else if (target === 'news') {
          setEditingNews((prev) => (prev ? { ...prev, coverImage: result } : prev));
        } else if (target === 'team') {
          updateEditingMember({ imageUrl: result });
        }
      };
      reader.readAsDataURL(file);
    } finally {
      if (target === 'team') {
        setIsUploadingTeamPhoto(false);
        triggerToast('Team photo updated successfully!');
      }
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const handleUpdateMasterPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeMsg(null);

    const activeMaster = DataStore.getMasterPassword();
    if (currentMasterPasswordInput.trim() !== activeMaster) {
      setPasswordChangeMsg({
        text: 'Current master password is incorrect. Please verify and try again.',
        isError: true,
      });
      return;
    }

    if (!newMasterPasswordInput.trim() || newMasterPasswordInput.trim().length < 6) {
      setPasswordChangeMsg({
        text: 'New password must be at least 6 characters long.',
        isError: true,
      });
      return;
    }

    if (newMasterPasswordInput.trim() !== confirmMasterPasswordInput.trim()) {
      setPasswordChangeMsg({
        text: 'New password and confirmation do not match.',
        isError: true,
      });
      return;
    }

    const success = DataStore.setMasterPassword(newMasterPasswordInput.trim());
    if (success) {
      setCurrentMasterPasswordInput('');
      setNewMasterPasswordInput('');
      setConfirmMasterPasswordInput('');
      setPasswordChangeMsg({
        text: 'Master Administrator password successfully updated! The old password is no longer valid.',
        isError: false,
      });
      triggerToast('Master password updated successfully!');
    } else {
      setPasswordChangeMsg({
        text: 'Failed to update password. Please check requirements.',
        isError: true,
      });
    }
  };

  const executeConfirmedDelete = () => {
    if (!deleteConfirmation) return;
    const { type, id } = deleteConfirmation;

    if (type === 'gallery' && id) {
      DataStore.deleteGalleryItem(id);
      setGallery(DataStore.getGallery());
      loadData();
      triggerToast('Photo permanently deleted from gallery archive.');
    } else if (type === 'team' && id) {
      DataStore.deleteTeamMember(id);
      loadData();
      triggerToast('Team member removed.');
    } else if (type === 'programme' && id) {
      DataStore.deleteProgramme(id);
      loadData();
      triggerToast('Programme deleted.');
    } else if (type === 'news' && id) {
      DataStore.deleteNewsPost(id);
      loadData();
      triggerToast('News post deleted.');
    } else if (type === 'enquiry' && id) {
      DataStore.deleteEnquiry(id);
      loadData();
      triggerToast('Inquiry removed.');
    } else if (type === 'volunteer' && id) {
      DataStore.deleteVolunteer(id);
      loadData();
      triggerToast('Volunteer application removed.');
    } else if (type === 'video' && id) {
      DataStore.deleteYouTubeVideo(id);
      loadData();
      triggerToast('YouTube video removed.');
    } else if (type === 'baseline') {
      DataStore.resetToVerifiedDefaults();
      loadData();
      triggerToast('Reset to verified baseline completed.');
    }

    setDeleteConfirmation(null);
  };

  // ----------------------------------------------------
  // UN-AUTHENTICATED LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#E6DDD5] p-8 sm:p-10 space-y-6 shadow-md">
          <div className="text-center space-y-2">
            <BrandLogo size="md" className="mx-auto" />
            <h1 className="text-xl font-bold text-[#111111] pt-2">
              AOS Foundation Portal
            </h1>
            <p className="text-xs text-[#525252]">
              Administrative Content Management & Operations
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1">
                Administrative Passphrase
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter administrator password"
                  value={passphrase}
                  onChange={(e) => {
                    setPassphrase(e.target.value);
                    setAuthError(false);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-[#737373] absolute right-3 top-3" />
              </div>
              {authError && (
                <p className="text-[11px] text-red-600 mt-1 font-medium">
                  Invalid administrative passphrase. Please check your credentials.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              Sign In to CMS
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('/')}
              className="text-xs text-[#737373] hover:text-[#111111] underline"
            >
              Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FCFAF7] flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#111111] text-white border-b border-[#8F431E]/40 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3 sm:gap-4">
          <BrandLogo variant="monochrome-white" size="sm" />
          <span className="hidden sm:inline-block text-[11px] font-mono uppercase tracking-wider text-[#D4A992] bg-white/10 px-2 py-0.5 rounded">
            CMS Portal v1.0
          </span>

          {/* Active Session & Authority Badge */}
          {session?.isMasterAdmin ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Master Admin</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              <span className="truncate max-w-[160px]">
                {session?.memberName || 'Delegated Team'}
              </span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-medium text-white/80 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Public Site</span>
          </button>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold text-rose-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-rose-900/40 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {saveSuccessMsg && (
        <div className="fixed top-16 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        {(() => {
          const availableAdminTabs: {
            id: AdminTab;
            label: string;
            icon: React.ElementType;
            allowed: boolean;
            count?: number;
            badgeColor?: string;
          }[] = [
            { id: 'overview', label: 'Overview', icon: LayoutDashboard, allowed: true },
            {
              id: 'programmes',
              label: 'Programmes',
              icon: BookOpen,
              count: programmes.length,
              allowed: Boolean(session?.isMasterAdmin || session?.permissions?.canManageProgrammes),
            },
            {
              id: 'gallery',
              label: 'Gallery & Photos',
              icon: ImageIcon,
              count: gallery.length,
              allowed: Boolean(session?.isMasterAdmin || session?.permissions?.canManageGallery),
            },
            {
              id: 'videos',
              label: 'YouTube Videos',
              icon: Film,
              count: videos.length,
              allowed: Boolean(session?.isMasterAdmin || session?.permissions?.canManageVideos),
            },
            {
              id: 'team',
              label: 'Team & Delegation',
              icon: UserCheck,
              count: teamMembers.length,
              allowed: Boolean(session?.isMasterAdmin || session?.permissions?.canManageTeam),
              badgeColor: 'bg-[#B05A28]',
            },
            {
              id: 'news',
              label: 'News & Updates',
              icon: Newspaper,
              count: news.length,
              allowed: Boolean(session?.isMasterAdmin || session?.permissions?.canManageNews),
            },
            {
              id: 'impact',
              label: 'Impact Statistics',
              icon: BarChart3,
              count: impactStats.length,
              allowed: Boolean(session?.isMasterAdmin || session?.permissions?.canManageImpact),
            },
            {
              id: 'enquiries',
              label: 'Enquiries',
              icon: Mail,
              count: enquiries.filter((e) => e.status === 'new').length,
              badgeColor: 'bg-[#B05A28]',
              allowed: Boolean(session?.isMasterAdmin || session?.permissions?.canManageEnquiries),
            },
            {
              id: 'volunteers',
              label: 'Volunteers',
              icon: Users,
              count: volunteers.filter((v) => v.status === 'new').length,
              badgeColor: 'bg-emerald-600',
              allowed: Boolean(session?.isMasterAdmin || session?.permissions?.canManageVolunteers),
            },
            {
              id: 'site-content',
              label: 'Site Content',
              icon: Sliders,
              allowed: Boolean(session?.isMasterAdmin || session?.permissions?.canManageSiteContent),
            },
            {
              id: 'documents',
              label: 'Reports & Governance',
              icon: FileText,
              count: documents.length,
              allowed: Boolean(session?.isMasterAdmin || session?.permissions?.canManageSettings),
            },
            {
              id: 'settings',
              label: 'Database & Sync',
              icon: Settings,
              allowed: Boolean(session?.isMasterAdmin),
            },
          ];

          const allowedAdminTabs = availableAdminTabs.filter((t) => t.allowed);
          const currentAdminTabIdx = allowedAdminTabs.findIndex((t) => t.id === activeTab);
          const prevAdminTab =
            currentAdminTabIdx > 0
              ? allowedAdminTabs[currentAdminTabIdx - 1]
              : allowedAdminTabs[allowedAdminTabs.length - 1];
          const nextAdminTab =
            currentAdminTabIdx < allowedAdminTabs.length - 1
              ? allowedAdminTabs[currentAdminTabIdx + 1]
              : allowedAdminTabs[0];

          const handleAdminPrevTab = () => {
            if (prevAdminTab) {
              changeTab(prevAdminTab.id);
              setEditingProg(null);
              setEditingNews(null);
              setEditingStat(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          };

          const handleAdminNextTab = () => {
            if (nextAdminTab) {
              changeTab(nextAdminTab.id);
              setEditingProg(null);
              setEditingNews(null);
              setEditingStat(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          };

          return (
            <>
              <aside className="w-full md:w-64 bg-white border-r border-[#E6DDD5] p-4 shrink-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#8F431E] px-3 mb-2 flex items-center justify-between">
                  <span>CMS Modules</span>
                  {!session?.isMasterAdmin && (
                    <span className="text-[10px] text-[#737373] font-normal">Delegated Mode</span>
                  )}
                </div>
                <nav className="space-y-1">
                  {allowedAdminTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          changeTab(tab.id as AdminTab);
                          setEditingProg(null);
                          setEditingNews(null);
                          setEditingStat(null);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#FAF3EE] text-[#B05A28] font-bold border-l-4 border-[#B05A28]'
                            : 'text-[#404040] hover:bg-[#FCFAF7] hover:text-[#111111]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{tab.label}</span>
                        </div>
                        {tab.count !== undefined && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                              tab.badgeColor
                                ? `${tab.badgeColor} text-white`
                                : 'bg-[#E6DDD5] text-[#262626]'
                            }`}
                          >
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </aside>

              {/* Content Viewport (Unbounded native scrolling for frictionless mobile gesture support) */}
              <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full">
                {/* Universal Top Admin Section Navigation Bar */}
                <div className="mb-6 p-3.5 bg-white rounded-xl border border-[#E6DDD5] shadow-2xs flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate('/')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF3EE] hover:bg-[#F3EAE2] text-[#8F431E] hover:text-[#B05A28] border border-[#E6DDD5] text-xs font-bold transition-all group cursor-pointer shadow-2xs"
                      title="Return to Public Website"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      <span>Exit to Public Site</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleAdminPrevTab}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#FAF3EE] text-[#404040] hover:text-[#111111] border border-[#E6DDD5] text-xs font-bold transition-all group cursor-pointer"
                      title={`Go to previous admin section: ${prevAdminTab?.label}`}
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-[#B05A28] group-hover:-translate-x-1 transition-transform" />
                      <span>← Prev: {prevAdminTab?.label}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#737373] hidden sm:inline">Section:</span>
                      <select
                        value={activeTab}
                        onChange={(e) => {
                          changeTab(e.target.value as AdminTab);
                          setEditingProg(null);
                          setEditingNews(null);
                          setEditingStat(null);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#FCFAF7] border border-[#E6DDD5] text-xs font-bold text-[#111111] focus:outline-hidden focus:border-[#B05A28] cursor-pointer"
                        aria-label="Navigate between admin sections"
                      >
                        {allowedAdminTabs.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={handleAdminNextTab}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold transition-all group cursor-pointer shadow-2xs"
                      title={`Go to next admin section: ${nextAdminTab?.label}`}
                    >
                      <span>Next: {nextAdminTab?.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#111111]">
                  AOS Foundation Executive Dashboard
                </h2>
                <p className="text-xs text-[#525252] mt-1">
                  Real-time summary of programmes, incoming enquiries, volunteer applications, and field media.
                </p>
              </div>

              {/* KPI Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div
                  onClick={() => changeTab('programmes')}
                  className="p-5 bg-white rounded-xl border border-[#E6DDD5] cursor-pointer hover:border-[#B05A28] transition-colors"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F431E]">
                    Total Programmes
                  </span>
                  <div className="text-3xl font-extrabold font-mono text-[#111111] mt-1">
                    {programmes.length}
                  </div>
                  <span className="text-[10px] text-[#737373]">
                    {programmes.filter((p) => p.status === 'Ongoing').length} currently active
                  </span>
                </div>

                <div
                  onClick={() => changeTab('enquiries')}
                  className="p-5 bg-white rounded-xl border border-[#E6DDD5] cursor-pointer hover:border-[#B05A28] transition-colors"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F431E]">
                    Incoming Inquiries
                  </span>
                  <div className="text-3xl font-extrabold font-mono text-[#B05A28] mt-1">
                    {enquiries.length}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    {enquiries.filter((e) => e.status === 'new').length} pending response
                  </span>
                </div>

                <div
                  onClick={() => changeTab('volunteers')}
                  className="p-5 bg-white rounded-xl border border-[#E6DDD5] cursor-pointer hover:border-[#B05A28] transition-colors"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F431E]">
                    Volunteer Roster
                  </span>
                  <div className="text-3xl font-extrabold font-mono text-[#111111] mt-1">
                    {volunteers.length}
                  </div>
                  <span className="text-[10px] text-[#737373]">
                    {volunteers.filter((v) => v.status === 'new').length} new applicants
                  </span>
                </div>

                <div
                  onClick={() => changeTab('gallery')}
                  className="p-5 bg-white rounded-xl border border-[#E6DDD5] cursor-pointer hover:border-[#B05A28] transition-colors"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F431E]">
                    Gallery Assets
                  </span>
                  <div className="text-3xl font-extrabold font-mono text-[#111111] mt-1">
                    {gallery.length}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">
                    100% Safeguarding reviewed
                  </span>
                </div>
              </div>

              {/* Fast Activity Grids */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Inquiries */}
                <div className="bg-white rounded-xl border border-[#E6DDD5] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#111111]">
                      Recent Donor & Partner Inquiries
                    </h3>
                    <button
                      onClick={() => changeTab('enquiries')}
                      className="text-xs text-[#B05A28] font-bold hover:underline"
                    >
                      View All ({enquiries.length})
                    </button>
                  </div>
                  {enquiries.slice(0, 3).map((enq) => (
                    <div
                      key={enq.id}
                      className="p-3 rounded-lg bg-[#FCFAF7] border border-[#E6DDD5] text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#111111]">{enq.name}</span>
                        <span className="text-[10px] font-mono text-[#737373]">
                          {formatDate(enq.submittedAt)}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#8F431E] font-medium">
                        {enq.enquiryType} · {enq.organisation || 'Individual'}
                      </div>
                      <p className="text-[11px] text-[#525252] line-clamp-1">{enq.message}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-[#E6DDD5] p-5 space-y-4">
                  <h3 className="text-sm font-bold text-[#111111]">Direct Publishing Actions</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button
                      onClick={() => {
                        setEditingProg({
                          id: `prog-${Date.now()}`,
                          slug: 'new-programme',
                          title: '',
                          category: 'Education Support',
                          shortDescription: '',
                          fullDescription: '',
                          location: '',
                          date: 'Upcoming',
                          status: 'Draft',
                          beneficiariesSummary: '',
                          impactSummary: '',
                          coverImage: '',
                          images: [],
                          featured: false,
                          materialsIncluded: ['Notebooks', 'School bags'],
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString(),
                        });
                        changeTab('programmes');
                      }}
                      className="p-3 rounded-lg bg-[#FAF3EE] hover:bg-[#F3EAE2] text-[#8F431E] font-bold text-center border border-[#E6DDD5] transition-colors"
                    >
                      + New Programme
                    </button>

                    <button
                      onClick={() => changeTab('gallery')}
                      className="p-3 rounded-lg bg-[#FAF3EE] hover:bg-[#F3EAE2] text-[#8F431E] font-bold text-center border border-[#E6DDD5] transition-colors"
                    >
                      + Upload Field Photo
                    </button>

                    <button
                      onClick={() => {
                        setEditingNews({
                          id: `news-${Date.now()}`,
                          slug: 'new-announcement',
                          title: '',
                          category: 'Programme Update',
                          excerpt: '',
                          content: '',
                          author: 'AOS Editorial',
                          coverImage: '',
                          published: true,
                          publishedAt: new Date().toISOString(),
                        });
                        changeTab('news');
                      }}
                      className="p-3 rounded-lg bg-[#FAF3EE] hover:bg-[#F3EAE2] text-[#8F431E] font-bold text-center border border-[#E6DDD5] transition-colors"
                    >
                      + Publish Article
                    </button>

                    <button
                      onClick={() => changeTab('site-content')}
                      className="p-3 rounded-lg bg-[#FAF3EE] hover:bg-[#F3EAE2] text-[#8F431E] font-bold text-center border border-[#E6DDD5] transition-colors"
                    >
                      Edit Site Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. PROGRAMMES TAB */}
          {activeTab === 'programmes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#111111]">Programme Management</h2>
                  <p className="text-xs text-[#525252]">
                    Create and publish strategic initiatives without writing code.
                  </p>
                </div>
                {!editingProg && (
                  <button
                    onClick={() =>
                      setEditingProg({
                        id: `prog-${Date.now()}`,
                        slug: `programme-${Date.now()}`,
                        title: 'New Strategic Initiative',
                        category: 'Education Support',
                        shortDescription: '',
                        fullDescription: '',
                        location: 'Nigeria',
                        date: 'Upcoming',
                        status: 'Draft',
                        beneficiariesSummary: '',
                        impactSummary: '',
                        coverImage: '',
                        images: [],
                        featured: false,
                        materialsIncluded: ['Notebooks', 'School bags', 'Shoes'],
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                      })
                    }
                    className="px-4 py-2 bg-[#B05A28] text-white text-xs font-bold uppercase tracking-wider rounded-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Programme</span>
                  </button>
                )}
              </div>

              {editingProg ? (
                <div className="bg-white rounded-xl border border-[#E6DDD5] p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E6DDD5] pb-3">
                    <h3 className="font-bold text-sm text-[#111111]">
                      {editingProg.title ? `Editing: ${editingProg.title}` : 'New Programme'}
                    </h3>
                    <button
                      onClick={() => setEditingProg(null)}
                      className="text-xs text-[#737373] hover:text-[#111111]"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Title *</label>
                      <input
                        type="text"
                        value={editingProg.title}
                        onChange={(e) =>
                          setEditingProg({
                            ...editingProg,
                            title: e.target.value,
                            slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                          })
                        }
                        className="w-full px-3 py-2 border rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Slug (URL path)</label>
                      <input
                        type="text"
                        value={editingProg.slug}
                        onChange={(e) =>
                          setEditingProg({ ...editingProg, slug: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Category</label>
                      <select
                        value={editingProg.category}
                        onChange={(e) =>
                          setEditingProg({
                            ...editingProg,
                            category: e.target.value as Programme['category'],
                          })
                        }
                        className="w-full px-3 py-2 border rounded text-xs bg-white"
                      >
                        <option value="Education Support">Education Support</option>
                        <option value="Empowerment">Empowerment</option>
                        <option value="Skills Acquisition">Skills Acquisition</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Status</label>
                      <select
                        value={editingProg.status}
                        onChange={(e) =>
                          setEditingProg({
                            ...editingProg,
                            status: e.target.value as Programme['status'],
                          })
                        }
                        className="w-full px-3 py-2 border rounded text-xs bg-white"
                      >
                        <option value="Draft">Draft (Hidden from public)</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Location</label>
                      <input
                        type="text"
                        value={editingProg.location}
                        onChange={(e) =>
                          setEditingProg({ ...editingProg, location: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Schedule / Date</label>
                      <input
                        type="text"
                        value={editingProg.date}
                        onChange={(e) =>
                          setEditingProg({ ...editingProg, date: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Short Summary (Cards)</label>
                    <input
                      type="text"
                      value={editingProg.shortDescription}
                      onChange={(e) =>
                        setEditingProg({ ...editingProg, shortDescription: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Full Detailed Narrative</label>
                    <textarea
                      rows={5}
                      value={editingProg.fullDescription}
                      onChange={(e) =>
                        setEditingProg({ ...editingProg, fullDescription: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded text-xs"
                    />
                  </div>

                  {/* Materials Included */}
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Materials Included (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={editingProg.materialsIncluded.join(', ')}
                      onChange={(e) =>
                        setEditingProg({
                          ...editingProg,
                          materialsIncluded: e.target.value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-2 border rounded text-xs"
                      placeholder="Notebooks, School bags, Shoes, Uniforms"
                    />
                  </div>

                  {/* Cover Image Upload */}
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Cover Image (Upload from phone/laptop or paste URL)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'programme')}
                        className="text-xs"
                      />
                    </div>
                    {editingProg.coverImage && (
                      <div className="mt-2 w-32 h-20 rounded border overflow-hidden">
                        <img
                          src={editingProg.coverImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => {
                        DataStore.saveProgramme(editingProg);
                        setEditingProg(null);
                        loadData();
                        triggerToast('Programme saved successfully!');
                      }}
                      className="px-5 py-2.5 bg-[#B05A28] text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer"
                    >
                      Save Programme
                    </button>
                    <button
                      onClick={() => setEditingProg(null)}
                      className="px-4 py-2 border rounded text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {programmes.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-xl border border-[#E6DDD5] p-4 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#111111]">{p.title}</h4>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              p.status === 'Ongoing'
                                ? 'bg-emerald-100 text-emerald-800'
                                : p.status === 'Draft'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-[#FCFAF7] text-[#525252] border'
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#525252] mt-0.5">
                          {p.category} · {p.location} · {p.materialsIncluded.length} materials
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProg(p)}
                          className="p-1.5 rounded hover:bg-[#FAF3EE] text-[#8F431E]"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteConfirmation({
                              type: 'programme',
                              id: p.id,
                              title: `Delete Programme: ${p.title}`,
                              subtitle: 'Are you sure you want to permanently delete this programme? All related field updates and images will be removed.',
                              image: p.coverImage,
                            });
                          }}
                          className="p-1.5 rounded hover:bg-rose-50 text-rose-600 cursor-pointer transition-colors"
                          title="Delete Programme"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. GALLERY TAB (Image upload directly from phone/laptop) */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#111111]">Gallery & Photographic Media</h2>
                <p className="text-xs text-[#525252]">
                  Upload images directly from your computer or mobile phone. Enforces Child Safeguarding verification.
                </p>
              </div>

              {/* Upload Box */}
              <div className="bg-white rounded-xl border border-[#E6DDD5] p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b pb-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                    Add Verified Photo to Gallery Archive
                  </h3>
                  <span className="text-[11px] text-[#737373]">
                    {gallery.filter((g) => Boolean(g.url)).length} active photo(s)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Choose Image File (Laptop or Phone)
                    </label>
                    <input
                      ref={galleryFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'gallery')}
                      className="w-full text-xs text-[#525252] file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#FAF3EE] file:text-[#8F431E] hover:file:bg-[#F3EAE2] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Or Direct Image Link (URL)
                    </label>
                    <input
                      type="url"
                      placeholder="https://i.ibb.co/.../image.jpg"
                      value={newGalleryImageSrc}
                      onChange={(e) => setNewGalleryImageSrc(e.target.value)}
                      className="w-full px-3 py-2 border rounded text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Outreach Category
                    </label>
                    <select
                      value={newGalleryCategory}
                      onChange={(e) =>
                        setNewGalleryCategory(e.target.value as GalleryItem['category'])
                      }
                      className="w-full px-3 py-2 border rounded text-xs bg-white"
                    >
                      <option value="Education Support">Education Support</option>
                      <option value="Community Activities">Community Activities</option>
                      <option value="Empowerment">Empowerment</option>
                      <option value="Skills Acquisition">Skills Acquisition</option>
                      <option value="Volunteers">Volunteers</option>
                      <option value="Events">Events</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Caption & Distribution Context *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Primary pupils receiving backpacks and stationery packs"
                      value={newGalleryCaption}
                      onChange={(e) => setNewGalleryCaption(e.target.value)}
                      className="w-full px-3 py-2 border rounded text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="childClear"
                      checked={newGalleryChildCleared}
                      onChange={(e) => setNewGalleryChildCleared(e.target.checked)}
                      className="rounded text-[#B05A28]"
                    />
                    <label htmlFor="childClear" className="text-[#262626]">
                      Child Safeguarding Cleared (guardian consent confirmed)
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="publishPublic"
                      checked={newGalleryPublished}
                      onChange={(e) => setNewGalleryPublished(e.target.checked)}
                      className="rounded text-[#B05A28]"
                    />
                    <label htmlFor="publishPublic" className="font-semibold text-[#111111]">
                      Publish immediately to public website
                    </label>
                  </div>
                </div>

                {newGalleryImageSrc && (
                  <div className="flex items-center gap-3 p-3 bg-[#FAF3EE] rounded-lg">
                    <div className="w-24 h-16 rounded border overflow-hidden bg-white shrink-0">
                      <img
                        src={newGalleryImageSrc}
                        alt="Upload preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs space-y-1">
                      <span className="font-semibold text-[#8F431E] block">Image Ready for Publication</span>
                      <button
                        type="button"
                        onClick={() => {
                          setNewGalleryImageSrc('');
                          if (galleryFileInputRef.current) galleryFileInputRef.current.value = '';
                        }}
                        className="text-rose-600 hover:underline flex items-center gap-1 text-[11px]"
                      >
                        <X className="w-3 h-3" />
                        <span>Discard uploaded image</span>
                      </button>
                    </div>
                  </div>
                )}

                {galleryFormError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{galleryFormError}</span>
                  </div>
                )}

                <div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!newGalleryImageSrc.trim()) {
                        setGalleryFormError('Please select or upload a photo first.');
                        return;
                      }
                      if (!newGalleryCaption.trim()) {
                        setGalleryFormError('Please enter a caption describing the activity or school.');
                        return;
                      }
                      setGalleryFormError(null);
                      DataStore.saveGalleryItem({
                        id: `gal-${Date.now()}`,
                        url: newGalleryImageSrc.trim(),
                        caption: newGalleryCaption.trim(),
                        category: newGalleryCategory,
                        photographerCredit: 'AOS Media Team',
                        childPrivacyCleared: newGalleryChildCleared,
                        published: newGalleryPublished,
                        createdAt: new Date().toISOString(),
                      });
                      setNewGalleryCaption('');
                      setNewGalleryImageSrc('');
                      if (galleryFileInputRef.current) galleryFileInputRef.current.value = '';
                      loadData();
                      triggerToast(
                        newGalleryPublished
                          ? 'Photo added and published to public site!'
                          : 'Photo saved to private archive (draft).'
                      );
                    }}
                    className="px-5 py-2.5 rounded bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs min-h-[44px]"
                  >
                    Save Photo to Archive
                  </button>
                </div>
              </div>

              {/* Existing Gallery Grid with Reliable Delete Action & Publish Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {gallery
                  .filter((item) => Boolean(item.url && item.url.trim().length > 0))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-[#E6DDD5] p-3.5 space-y-3 relative group shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="h-36 rounded-lg overflow-hidden bg-[#FCFAF7] border border-[#E6DDD5]/60">
                          <img
                            src={item.url}
                            alt={item.caption}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-[#8F431E]">{item.category}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.published !== false
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {item.published !== false ? '✓ Public' : 'Draft / Private'}
                          </span>
                        </div>
                        <p className="text-xs text-[#262626] line-clamp-2 leading-relaxed">
                          {item.caption}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#E6DDD5] flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const nextState = DataStore.toggleGalleryPublished(item.id);
                            setGallery((prev) =>
                              prev.map((g) => (g.id === item.id ? { ...g, published: nextState } : g))
                            );
                            triggerToast(
                              nextState
                                ? 'Photo is now published on the public site.'
                                : 'Photo unpublished and moved to private archive.'
                            );
                          }}
                          className="px-2.5 py-1 rounded bg-[#FAF3EE] hover:bg-[#F3EAE2] text-[#8F431E] text-xs font-semibold border border-[#E6DDD5] transition-colors cursor-pointer min-h-[36px]"
                        >
                          {item.published !== false ? 'Unpublish' : 'Publish to Site'}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setDeleteConfirmation({
                              type: 'gallery',
                              id: item.id,
                              title: 'Delete Photo from Gallery',
                              subtitle: item.caption
                                ? `Are you sure you want to permanently delete "${item.caption}"?`
                                : 'Are you sure you want to permanently delete this photo from the field gallery archive?',
                              image: item.url,
                            });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-rose-200 min-h-[36px]"
                          title="Delete photo permanently"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 4. NEWS TAB */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#111111]">News & Field Updates</h2>
                  <p className="text-xs text-[#525252]">Publish updates, insights, and event reports.</p>
                </div>
                {!editingNews && (
                  <button
                    onClick={() =>
                      setEditingNews({
                        id: `news-${Date.now()}`,
                        slug: `news-${Date.now()}`,
                        title: 'New Announcement',
                        category: 'Programme Update',
                        excerpt: '',
                        content: '',
                        author: 'AOS Editorial',
                        coverImage: '',
                        published: true,
                        publishedAt: new Date().toISOString(),
                      })
                    }
                    className="px-4 py-2 bg-[#B05A28] text-white text-xs font-bold uppercase tracking-wider rounded-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Article</span>
                  </button>
                )}
              </div>

              {editingNews ? (
                <div className="bg-white rounded-xl border border-[#E6DDD5] p-6 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-bold text-sm">Article Editor</h3>
                    <button
                      onClick={() => setEditingNews(null)}
                      className="text-xs text-[#737373]"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Title *</label>
                      <input
                        type="text"
                        value={editingNews.title}
                        onChange={(e) =>
                          setEditingNews({
                            ...editingNews,
                            title: e.target.value,
                            slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                          })
                        }
                        className="w-full px-3 py-2 border rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Category</label>
                      <select
                        value={editingNews.category}
                        onChange={(e) =>
                          setEditingNews({
                            ...editingNews,
                            category: e.target.value as NewsPost['category'],
                          })
                        }
                        className="w-full px-3 py-2 border rounded text-xs bg-white"
                      >
                        <option value="Programme Update">Programme Update</option>
                        <option value="Community">Community</option>
                        <option value="Education">Education</option>
                        <option value="Announcement">Announcement</option>
                        <option value="Event">Event</option>
                        <option value="Impact">Impact</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Excerpt (Card preview)</label>
                    <textarea
                      rows={2}
                      value={editingNews.excerpt}
                      onChange={(e) =>
                        setEditingNews({ ...editingNews, excerpt: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Full Article Content</label>
                    <textarea
                      rows={8}
                      value={editingNews.content}
                      onChange={(e) =>
                        setEditingNews({ ...editingNews, content: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={editingNews.published}
                        onChange={(e) =>
                          setEditingNews({ ...editingNews, published: e.target.checked })
                        }
                      />
                      <span>Publish immediately</span>
                    </label>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => {
                        DataStore.saveNewsPost(editingNews);
                        setEditingNews(null);
                        loadData();
                        triggerToast('Article saved.');
                      }}
                      className="px-5 py-2.5 bg-[#B05A28] text-white text-xs font-bold uppercase tracking-wider rounded"
                    >
                      Save Article
                    </button>
                    <button
                      onClick={() => setEditingNews(null)}
                      className="px-4 py-2 border rounded text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {news.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-[#E6DDD5] p-4 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#111111]">{item.title}</h4>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded ${
                              item.published
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {item.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <p className="text-xs text-[#525252] mt-0.5">
                          {item.category} · By {item.author} · {formatDate(item.publishedAt)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingNews(item)}
                          className="p-1.5 rounded hover:bg-[#FAF3EE] text-[#8F431E]"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteConfirmation({
                              type: 'news',
                              id: item.id,
                              title: `Delete Article: ${item.title}`,
                              subtitle: 'Are you sure you want to permanently delete this news article?',
                              image: item.coverImage,
                            });
                          }}
                          className="p-1.5 rounded hover:bg-rose-50 text-rose-600 cursor-pointer transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. IMPACT STATISTICS TAB */}
          {activeTab === 'impact' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#111111]">Impact Statistics Manager</h2>
                <p className="text-xs text-[#525252]">
                  Update verified beneficiary counts, materials distributed, and programme figures.
                </p>
              </div>

              <div className="space-y-3">
                {impactStats.map((stat) => (
                  <div
                    key={stat.id}
                    className="bg-white rounded-xl border border-[#E6DDD5] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-[#8F431E] uppercase">
                        {stat.label}
                      </span>
                      <div className="text-2xl font-bold font-mono text-[#111111]">
                        {stat.value} {stat.unit}
                      </div>
                      <p className="text-xs text-[#525252] mt-0.5">{stat.verificationNote}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const newVal = prompt(`Update value for "${stat.label}":`, stat.value);
                          if (newVal !== null) {
                            DataStore.saveImpactStat({
                              ...stat,
                              value: newVal,
                              isVerified: true,
                            });
                            loadData();
                            triggerToast('Statistic updated.');
                          }
                        }}
                        className="px-3 py-1.5 bg-[#FAF3EE] text-[#8F431E] hover:bg-[#B05A28] hover:text-white rounded text-xs font-semibold transition-colors"
                      >
                        Edit Value
                      </button>
                      <button
                        onClick={() => {
                          DataStore.saveImpactStat({
                            ...stat,
                            isVerified: !stat.isVerified,
                          });
                          loadData();
                        }}
                        className={`text-xs px-2.5 py-1.5 rounded border ${
                          stat.isVerified
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {stat.isVerified ? 'Marked Verified' : 'Marked Unverified'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. ENQUIRIES TAB */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#111111]">Public Inquiries Pipeline</h2>
                <p className="text-xs text-[#525252]">
                  Donation pledges, material sponsorship offers, and corporate partnership messages.
                </p>
              </div>

              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white rounded-xl border border-[#E6DDD5] p-5 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6DDD5] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#111111]">{enq.name}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF3EE] text-[#8F431E] font-semibold">
                            {enq.enquiryType}
                          </span>
                        </div>
                        <div className="text-xs text-[#525252] mt-0.5">
                          {enq.email} · {enq.phone} {enq.organisation ? `· ${enq.organisation}` : ''}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-[#737373]">
                          {formatDate(enq.submittedAt)}
                        </span>
                        <select
                          value={enq.status}
                          onChange={(e) => {
                            DataStore.updateEnquiryStatus(
                              enq.id,
                              e.target.value as ContactEnquiry['status']
                            );
                            loadData();
                            triggerToast('Status updated.');
                          }}
                          className="text-xs border rounded px-2 py-1 bg-white"
                        >
                          <option value="new">New</option>
                          <option value="responded">Responded</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-xs text-[#262626] bg-[#FCFAF7] p-3 rounded-lg border border-[#E6DDD5]/60 whitespace-pre-line leading-relaxed">
                      {enq.message}
                    </p>

                    <div className="flex justify-end gap-3 text-xs">
                      <a
                        href={`mailto:${enq.email}?subject=AOS Foundation: Response to your inquiry`}
                        className="text-[#B05A28] font-bold hover:underline"
                      >
                        Reply via Email
                      </a>
                      <button
                        onClick={() => {
                          setDeleteConfirmation({
                            type: 'enquiry',
                            id: enq.id,
                            title: `Delete Inquiry from ${enq.name}`,
                            subtitle: `Are you sure you want to remove this inquiry message from ${enq.organisation || 'individual'}?`,
                          });
                        }}
                        className="text-rose-600 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. VOLUNTEERS TAB */}
          {activeTab === 'volunteers' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#111111]">Volunteer Applications</h2>
                <p className="text-xs text-[#525252]">
                  Review and manage registered community volunteers.
                </p>
              </div>

              <div className="space-y-4">
                {volunteers.map((vol) => (
                  <div
                    key={vol.id}
                    className="bg-white rounded-xl border border-[#E6DDD5] p-5 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6DDD5] pb-3">
                      <div>
                        <h4 className="font-bold text-sm text-[#111111]">{vol.fullName}</h4>
                        <div className="text-xs text-[#525252] mt-0.5">
                          {vol.email} · {vol.phone} · Location: {vol.location}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={vol.status}
                          onChange={(e) => {
                            DataStore.updateVolunteerStatus(
                              vol.id,
                              e.target.value as VolunteerApplication['status']
                            );
                            loadData();
                            triggerToast('Volunteer status updated.');
                          }}
                          className="text-xs border rounded px-2 py-1 bg-white font-medium"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="accepted">Accepted</option>
                          <option value="declined">Declined</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[#737373]">Area of Interest:</span>{' '}
                        <strong className="text-[#8F431E]">{vol.interestArea}</strong>
                      </div>
                      <div>
                        <span className="text-[#737373]">Availability:</span>{' '}
                        <strong className="text-[#111111]">{vol.availability}</strong>
                      </div>
                    </div>

                    {vol.message && (
                      <p className="text-xs text-[#404040] bg-[#FCFAF7] p-2.5 rounded border border-[#E6DDD5]/60">
                        "{vol.message}"
                      </p>
                    )}

                    <div className="flex justify-end gap-3 text-xs">
                      <a
                        href={`tel:${vol.phone}`}
                        className="text-[#8F431E] font-bold hover:underline"
                      >
                        Call Applicant
                      </a>
                      <button
                        onClick={() => {
                          setDeleteConfirmation({
                            type: 'volunteer',
                            id: vol.id,
                            title: `Delete Volunteer Application: ${vol.fullName}`,
                            subtitle: `Are you sure you want to remove the volunteer application for ${vol.fullName} (${vol.email})?`,
                          });
                        }}
                        className="text-rose-600 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. SITE CONTENT TAB */}
          {activeTab === 'site-content' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#111111]">Site Content & Copy Editor</h2>
                <p className="text-xs text-[#525252]">
                  Modify public website headlines, mission, vision, and contact channels.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-[#E6DDD5] p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Hero Main Headline</label>
                  <input
                    type="text"
                    value={siteContent.heroHeadline}
                    onChange={(e) =>
                      setSiteContent({ ...siteContent, heroHeadline: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Hero Sub-headline</label>
                  <textarea
                    rows={2}
                    value={siteContent.heroSubheadline}
                    onChange={(e) =>
                      setSiteContent({ ...siteContent, heroSubheadline: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Mission Statement</label>
                  <textarea
                    rows={3}
                    value={siteContent.missionStatement}
                    onChange={(e) =>
                      setSiteContent({ ...siteContent, missionStatement: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Vision Statement</label>
                  <textarea
                    rows={3}
                    value={siteContent.visionStatement}
                    onChange={(e) =>
                      setSiteContent({ ...siteContent, visionStatement: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Official Phone / WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={siteContent.contactPhone}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          contactPhone: e.target.value,
                          contactWhatsApp: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Contact Email</label>
                    <input
                      type="email"
                      value={siteContent.contactEmail}
                      onChange={(e) =>
                        setSiteContent({ ...siteContent, contactEmail: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded text-xs"
                    />
                  </div>
                </div>

                {/* Official YouTube Channel URL */}
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Official YouTube Channel URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/@aosfoundation"
                    value={siteContent.youtubeChannelUrl || ''}
                    onChange={(e) =>
                      setSiteContent({ ...siteContent, youtubeChannelUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded text-xs font-mono"
                  />
                  <p className="text-[11px] text-[#737373] mt-1">
                    Displayed on the public website's video documentation section and footer pathways.
                  </p>
                </div>

                {/* Official Logo Customization & Upload */}
                <div className="pt-4 border-t border-[#E6DDD5] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#111111]">
                        Official AOS Foundation Logo
                      </h4>
                      <p className="text-xs text-[#525252]">
                        Upload the original foundation logo image or provide a direct image link.
                      </p>
                    </div>
                    {siteContent.customLogoUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...siteContent, customLogoUrl: '' };
                          setSiteContent(updated);
                          DataStore.updateSiteContent(updated);
                          loadData();
                          triggerToast('Reset to default official vector emblem.');
                        }}
                        className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
                      >
                        Reset to Vector Emblem
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5]">
                    {/* Active Logo Preview */}
                    <div className="w-24 h-24 rounded-lg bg-white border border-[#E6DDD5] flex items-center justify-center p-2 shadow-xs shrink-0 overflow-hidden">
                      {siteContent.customLogoUrl ? (
                        <img
                          src={siteContent.customLogoUrl}
                          alt="Custom AOS Logo Preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <BrandLogo variant="mark" size="lg" />
                      )}
                    </div>

                    <div className="flex-1 w-full space-y-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1">
                          Upload Logo File (PNG, JPG, SVG, WebP)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const base64 = event.target?.result as string;
                                if (base64) {
                                  const updated = { ...siteContent, customLogoUrl: base64 };
                                  setSiteContent(updated);
                                  DataStore.updateSiteContent(updated);
                                  loadData();
                                  triggerToast('Custom logo uploaded & saved successfully!');
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full text-xs text-[#525252] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#B05A28] file:text-white hover:file:bg-[#8F431E] cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#737373] mb-1">
                          Or Direct Image URL (e.g., from ibb.co or Supabase Storage)
                        </label>
                        <input
                          type="url"
                          placeholder="https://i.ibb.co/.../logo.png"
                          value={siteContent.customLogoUrl || ''}
                          onChange={(e) =>
                            setSiteContent({ ...siteContent, customLogoUrl: e.target.value })
                          }
                          className="w-full px-3 py-1.5 border rounded text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      DataStore.updateSiteContent(siteContent);
                      loadData();
                      triggerToast('Site branding & content saved successfully!');
                    }}
                    className="px-6 py-2.5 rounded bg-[#B05A28] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#8F431E] transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 8.5 YOUTUBE VIDEOS CMS TAB */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#111111]">
                    YouTube Video Dispatches & Documentaries
                  </h2>
                  <p className="text-xs text-[#525252]">
                    Manage authentic video footage of field outreaches, student stories, and community dialogues.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingVideo({
                      id: `vid-${Date.now()}`,
                      youtubeUrl: '',
                      title: '',
                      description: '',
                      category: 'Field Outreach',
                      duration: '3:30',
                      location: 'Community Primary Schools, Nigeria',
                      date: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
                      featured: true,
                    })
                  }
                  className="px-4 py-2 bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 cursor-pointer self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Video Dispatch</span>
                </button>
              </div>

              {/* COMING SOON PLACARD CONTROL CARD */}
              <div className="bg-white rounded-xl border border-[#E6DDD5] p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#111111]">
                      Public Video Section Display Mode
                    </h3>
                    <p className="text-xs text-[#525252]">
                      Control whether the public site displays the "Coming Soon" documentary production placard or live video embeds.
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      siteContent.youtubeComingSoon ?? true
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {siteContent.youtubeComingSoon ?? true ? 'Coming Soon Mode Active' : 'Live Videos Active'}
                  </span>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2.5 text-xs font-semibold cursor-pointer text-[#111111]">
                    <input
                      type="checkbox"
                      checked={siteContent.youtubeComingSoon ?? true}
                      onChange={(e) =>
                        setSiteContent({ ...siteContent, youtubeComingSoon: e.target.checked })
                      }
                      className="rounded text-[#B05A28]"
                    />
                    <span>
                      Display "Field Dispatches in Production · Coming Soon" Placard on Website
                    </span>
                  </label>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#525252]">
                      Placard Explanation Note
                    </label>
                    <textarea
                      rows={2}
                      value={siteContent.youtubeComingSoonNotice || ''}
                      onChange={(e) =>
                        setSiteContent({ ...siteContent, youtubeComingSoonNotice: e.target.value })
                      }
                      placeholder="Our field documentation crew is actively recording verified distributions..."
                      className="w-full px-3 py-2 border rounded text-xs"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      DataStore.updateSiteContent(siteContent);
                      loadData();
                      triggerToast('Video display preferences saved successfully!');
                    }}
                    className="px-4 py-2 bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold rounded cursor-pointer transition-colors"
                  >
                    Update Video Mode
                  </button>
                </div>
              </div>

              {/* Video Editor Modal / Form */}
              {editingVideo && (
                <div className="bg-white rounded-xl border-2 border-[#B05A28]/30 p-6 space-y-4 shadow-md animate-in fade-in">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="font-bold text-sm text-[#111111]">
                      {videos.some((v) => v.id === editingVideo.id)
                        ? 'Edit Video Dispatch'
                        : 'New Video Dispatch'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingVideo(null)}
                      className="text-xs text-[#737373] hover:text-[#111111]"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1">
                        YouTube Video Link or Video ID *
                      </label>
                      <input
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                        value={editingVideo.youtubeUrl}
                        onChange={(e) =>
                          setEditingVideo({ ...editingVideo, youtubeUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded text-xs font-mono"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1">Video Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Primary School Distribution Outreach"
                        value={editingVideo.title}
                        onChange={(e) =>
                          setEditingVideo({ ...editingVideo, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded text-xs"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Category</label>
                      <select
                        value={editingVideo.category}
                        onChange={(e) =>
                          setEditingVideo({
                            ...editingVideo,
                            category: e.target.value as YouTubeVideoItem['category'],
                          })
                        }
                        className="w-full px-3 py-2 border rounded text-xs bg-white"
                      >
                        <option value="Field Outreach">Field Outreach</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Student Story">Student Story</option>
                        <option value="Community Forum">Community Forum</option>
                        <option value="Message from Founder">Message from Founder</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Video Duration</label>
                      <input
                        type="text"
                        placeholder="e.g. 4:18"
                        value={editingVideo.duration || ''}
                        onChange={(e) =>
                          setEditingVideo({ ...editingVideo, duration: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Outreach Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Community Primary Schools, Nigeria"
                        value={editingVideo.location || ''}
                        onChange={(e) =>
                          setEditingVideo({ ...editingVideo, location: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Record Date</label>
                      <input
                        type="text"
                        placeholder="e.g. February 2026"
                        value={editingVideo.date || ''}
                        onChange={(e) =>
                          setEditingVideo({ ...editingVideo, date: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1">
                        Video Description / Summary
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Summary of the outreach footage, school visited, and materials distributed..."
                        value={editingVideo.description}
                        onChange={(e) =>
                          setEditingVideo({ ...editingVideo, description: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingVideo.featured ?? true}
                        onChange={(e) =>
                          setEditingVideo({ ...editingVideo, featured: e.target.checked })
                        }
                      />
                      <span>Feature on Homepage Video Section</span>
                    </label>

                    {videoFormError && (
                      <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                        <span>{videoFormError}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setVideoFormError(null);
                          setEditingVideo(null);
                        }}
                        className="px-4 py-2 border rounded text-xs font-medium hover:bg-neutral-50 cursor-pointer min-h-[40px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingVideo.youtubeUrl?.trim() || !editingVideo.title?.trim()) {
                            setVideoFormError('Please provide both a YouTube URL and title.');
                            return;
                          }
                          setVideoFormError(null);
                          DataStore.saveYouTubeVideo(editingVideo);
                          setEditingVideo(null);
                          loadData();
                          triggerToast('YouTube video saved successfully!');
                        }}
                        className="px-5 py-2 bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold rounded cursor-pointer shadow-xs transition-colors min-h-[40px]"
                      >
                        Save Video
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Video List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((vid) => {
                  return (
                    <div
                      key={vid.id}
                      className="bg-white rounded-xl border border-[#E6DDD5] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative aspect-video bg-[#111111]">
                          <img
                            src={
                              vid.youtubeUrl.includes('v=') || vid.youtubeUrl.includes('youtu.be')
                                ? `https://img.youtube.com/vi/${vid.youtubeUrl.replace(/.*(?:v=|\/)([\w-]{11}).*/, '$1')}/hqdefault.jpg`
                                : 'https://i.ibb.co/XfPxFrVP/IMG-20240113-WA0008.jpg'
                            }
                            alt={vid.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                'https://i.ibb.co/XfPxFrVP/IMG-20240113-WA0008.jpg';
                            }}
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-semibold">
                            {vid.category}
                          </div>
                          {vid.duration && (
                            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">
                              {vid.duration}
                            </div>
                          )}
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="font-bold text-sm text-[#111111] line-clamp-2">
                            {vid.title}
                          </h4>
                          <p className="text-xs text-[#525252] line-clamp-2">
                            {vid.description}
                          </p>
                          {vid.location && (
                            <p className="text-[11px] text-[#737373] truncate">
                              📍 {vid.location}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="p-4 pt-0 border-t border-[#E6DDD5]/60 flex items-center justify-between mt-3 text-xs">
                        <a
                          href={vid.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8F431E] font-semibold hover:underline flex items-center gap-1"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingVideo(vid)}
                            className="p-1.5 text-[#525252] hover:text-[#B05A28]"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteConfirmation({
                                type: 'video',
                                id: vid.id,
                                title: `Remove Video: ${vid.title}`,
                                subtitle: 'Are you sure you want to remove this YouTube video from the website?',
                                image: vid.youtubeUrl ? getYouTubeThumbnail(vid.youtubeUrl) : undefined,
                              });
                            }}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded cursor-pointer transition-colors"
                            title="Delete Video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 8.6 MEET OUR TEAM & ROLE DELEGATION (RBAC) TAB */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#111111] flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#B05A28]" />
                    <span>Meet Our Team & Role Delegation</span>
                  </h2>
                  <p className="text-xs text-[#525252]">
                    Manage team member public placards and delegate CMS responsibilities with custom access passcodes.
                  </p>
                </div>

                {session?.isMasterAdmin && (
                  <button
                    type="button"
                    onClick={() =>
                      setEditingMember({
                        id: `team-${Date.now()}`,
                        name: '',
                        position: '',
                        bio: '',
                        imageUrl: '',
                        department: 'Field Operations',
                        email: '',
                        phone: '08168779732',
                        isMasterAdmin: false,
                        accessPasscode: `team${Math.floor(1000 + Math.random() * 9000)}`,
                        permissions: {
                          canManageProgrammes: true,
                          canManageGallery: false,
                          canManageVideos: false,
                          canManageNews: false,
                          canManageImpact: false,
                          canManageVolunteers: true,
                          canManageEnquiries: false,
                          canManageSiteContent: false,
                          canManageTeam: false,
                          canManageSettings: false,
                        },
                        displayOrder: teamMembers.length + 1,
                        published: true,
                        createdAt: new Date().toISOString(),
                      })
                    }
                    className="px-4 py-2 bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 cursor-pointer self-start"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Team Member</span>
                  </button>
                )}
              </div>

              {/* Master Admin Sovereignty & Hierarchy Banner */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
                <Crown className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="font-bold text-amber-950 block">
                    Master Administrator Control & Team Hierarchy
                  </strong>
                  <p className="text-amber-800 leading-relaxed">
                    Master administrative control belongs to you (Media Strategist / Systems Lead / Master Plan Admin). The Master Admin is completely independent of public leadership placards and does not have to be the Director. You can arrange the exact public display hierarchy of team members using the Move Up (↑) / Move Down (↓) buttons or by setting the custom order rank.
                  </p>
                </div>
              </div>

              {/* Team Member Form Modal */}
              {editingMember && (
                <div className="bg-white rounded-xl border-2 border-[#B05A28]/40 p-6 space-y-5 shadow-xl animate-in fade-in">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h3 className="font-bold text-sm text-[#111111]">
                        {teamMembers.some((m) => m.id === editingMember.id)
                          ? `Edit Member: ${editingMember.name || 'Untitled'}`
                          : 'New Team Member Placard & Role Delegation'}
                      </h3>
                      <p className="text-[11px] text-[#737373]">
                        Your edits are automatically preserved while uploading photos or switching apps.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={clearEditingMemberDraft}
                      className="text-xs text-[#737373] hover:text-[#111111] px-2 py-1 rounded hover:bg-neutral-100"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ibrahim Alabi"
                        value={editingMember.name}
                        onChange={(e) => updateEditingMember({ name: e.target.value })}
                        className="w-full px-3 py-2 border rounded text-xs"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Position / Role Designation *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Media Strategist & Communications Lead"
                        value={editingMember.position}
                        onChange={(e) => updateEditingMember({ position: e.target.value })}
                        className="w-full px-3 py-2 border rounded text-xs"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Department</label>
                      <select
                        value={editingMember.department || 'Field Operations'}
                        onChange={(e) => updateEditingMember({ department: e.target.value })}
                        className="w-full px-3 py-2 border rounded text-xs bg-white"
                      >
                        <option value="Executive Leadership">Executive Leadership</option>
                        <option value="Field Operations">Field Operations</option>
                        <option value="Safeguarding & Community">Safeguarding & Community</option>
                        <option value="Media & Public Relations">Media & Public Relations</option>
                        <option value="Volunteer Coordination">Volunteer Coordination</option>
                        <option value="Logistics & Supplies">Logistics & Supplies</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Public Display Order / Hierarchy Rank
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={editingMember.displayOrder || 1}
                        onChange={(e) =>
                          updateEditingMember({
                            displayOrder: Math.max(1, parseInt(e.target.value, 10) || 1),
                          })
                        }
                        className="w-full px-3 py-2 border rounded text-xs font-mono font-bold bg-white"
                      />
                      <span className="text-[11px] text-[#737373] mt-0.5 block">
                        Determines position on public page (1 = 1st card, 2 = 2nd card, etc.)
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Official Email</label>
                      <input
                        type="email"
                        placeholder="name@aosfoundation.org"
                        value={editingMember.email || ''}
                        onChange={(e) => updateEditingMember({ email: e.target.value })}
                        className="w-full px-3 py-2 border rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Official Phone</label>
                      <input
                        type="tel"
                        placeholder="08168779732"
                        value={editingMember.phone || ''}
                        onChange={(e) => updateEditingMember({ phone: e.target.value })}
                        className="w-full px-3 py-2 border rounded text-xs"
                      />
                    </div>

                    {/* Image Placard Upload / URL */}
                    <div className="sm:col-span-2 p-4 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-[#8F431E]">
                          Team Member Photo Placard
                        </label>
                        {isUploadingTeamPhoto && (
                          <span className="text-xs text-[#B05A28] font-semibold flex items-center gap-1.5 animate-pulse">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Compressing photo...</span>
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-20 h-20 rounded-xl bg-white border border-[#E6DDD5] overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
                          {editingMember.imageUrl ? (
                            <img
                              src={editingMember.imageUrl}
                              alt="Member preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-xs font-bold text-[#B05A28]">No Photo</div>
                          )}
                        </div>

                        <div className="flex-1 w-full space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              accept="image/*"
                              disabled={isUploadingTeamPhoto}
                              onChange={(e) => handleFileUpload(e, 'team')}
                              className="flex-1 text-xs text-[#525252] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#B05A28] file:text-white hover:file:bg-[#8F431E] cursor-pointer"
                            />
                            {editingMember.imageUrl && (
                              <button
                                type="button"
                                onClick={() => updateEditingMember({ imageUrl: '' })}
                                className="px-2.5 py-1.5 rounded text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                <X className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            )}
                          </div>
                          <input
                            type="url"
                            placeholder="Or paste direct image URL (https://...)"
                            value={editingMember.imageUrl || ''}
                            onChange={(e) => updateEditingMember({ imageUrl: e.target.value })}
                            className="w-full px-3 py-1.5 border rounded text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1">
                        Brief Bio / Focus
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Brief summary of operational background, commitment, and community outreach responsibilities..."
                        value={editingMember.bio}
                        onChange={(e) => updateEditingMember({ bio: e.target.value })}
                        className="w-full px-3 py-2 border rounded text-xs"
                      />
                    </div>
                  </div>

                  {/* ROLE DELEGATION & PERMISSIONS MATRIX */}
                  {session?.isMasterAdmin && (
                    <div className="p-4 rounded-xl bg-[#FAF3EE] border border-[#E6DDD5] space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Key className="w-4 h-4 text-[#B05A28]" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                            Delegated Access Passcode & Module Permissions
                          </h4>
                        </div>
                        <label className="flex items-center gap-1.5 text-xs font-bold text-amber-800 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingMember.isMasterAdmin ?? false}
                            onChange={(e) =>
                              updateEditingMember({ isMasterAdmin: e.target.checked })
                            }
                          />
                          <span>Grant Full Master Admin</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Team Login Passcode (Confidential)
                          </label>
                          <div className="relative">
                            <input
                              type={showEditPasscode ? 'text' : 'password'}
                              placeholder="e.g. field2026 or ops-pass"
                              value={editingMember.accessPasscode || ''}
                              onChange={(e) =>
                                updateEditingMember({ accessPasscode: e.target.value })
                              }
                              className="w-full px-3 py-2 pr-10 border rounded text-xs font-mono font-bold bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => setShowEditPasscode(!showEditPasscode)}
                              className="absolute right-2.5 top-2.5 text-[#737373] hover:text-[#111111] p-0.5 cursor-pointer"
                              title={showEditPasscode ? 'Hide Passcode' : 'Reveal Passcode'}
                            >
                              {showEditPasscode ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                          <span className="text-[11px] text-[#737373] mt-1 block">
                            Private login credential for this specific team member. Masked by default for privacy.
                          </span>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-2">
                            Allowed Management Modules
                          </label>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {[
                              { key: 'canManageProgrammes', label: 'Programmes' },
                              { key: 'canManageGallery', label: 'Gallery & Media' },
                              { key: 'canManageVideos', label: 'YouTube Videos' },
                              { key: 'canManageNews', label: 'News & Updates' },
                              { key: 'canManageImpact', label: 'Impact Statistics' },
                              { key: 'canManageVolunteers', label: 'Volunteers' },
                              { key: 'canManageEnquiries', label: 'Enquiries' },
                              { key: 'canManageSiteContent', label: 'Site Content' },
                            ].map((perm) => (
                              <label
                                key={perm.key}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    editingMember.isMasterAdmin ||
                                    Boolean(
                                      editingMember.permissions[
                                        perm.key as keyof TeamMemberPermissions
                                      ]
                                    )
                                  }
                                  disabled={editingMember.isMasterAdmin}
                                  onChange={(e) => {
                                    updateEditingMember({
                                      permissions: {
                                        ...editingMember.permissions,
                                        [perm.key]: e.target.checked,
                                      },
                                    });
                                  }}
                                  className="rounded text-[#B05A28]"
                                />
                                <span>{perm.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {teamFormError && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{teamFormError}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t">
                    <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingMember.published}
                        onChange={(e) => updateEditingMember({ published: e.target.checked })}
                      />
                      <span>Show on Public "Meet Our Team" Section</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={clearEditingMemberDraft}
                        className="px-4 py-2 border rounded-lg text-xs font-medium hover:bg-neutral-50 cursor-pointer min-h-[40px]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingMember.name.trim() || !editingMember.position.trim()) {
                            setTeamFormError('Please provide both the member full name and role position.');
                            return;
                          }
                          setTeamFormError(null);
                          DataStore.saveTeamMember(editingMember);
                          if (editingMember.displayOrder) {
                            DataStore.setTeamMemberOrder(
                              editingMember.id,
                              editingMember.displayOrder
                            );
                          }
                          clearEditingMemberDraft();
                          loadData();
                          triggerToast('Team member saved successfully!');
                        }}
                        className="px-5 py-2 bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold rounded-lg cursor-pointer shadow-xs transition-colors min-h-[40px]"
                      >
                        Save Team Member
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Team Members List Arranged in Hierarchical Order */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, idx) => {
                  const initials = member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <div
                      key={member.id}
                      className="bg-white rounded-xl border border-[#E6DDD5] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                    >
                      <div>
                        {/* Member Photo Placard */}
                        <div className="relative h-48 bg-[#F3EAE2] overflow-hidden flex items-center justify-center">
                          {member.imageUrl ? (
                            <img
                              src={member.imageUrl}
                              alt={member.name}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-white text-[#B05A28] font-bold text-xl flex items-center justify-center shadow-xs">
                              {initials}
                            </div>
                          )}

                          {/* Hierarchical Rank / Display Position Badge */}
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold font-mono shadow-xs">
                            #{member.displayOrder || idx + 1}
                          </span>

                          {member.isMasterAdmin ? (
                            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                              <Crown className="w-3 h-3" />
                              <span>Master</span>
                            </span>
                          ) : (
                            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-semibold">
                              {member.department}
                            </span>
                          )}
                        </div>

                        <div className="p-4 space-y-2">
                          <span className="text-[10px] font-bold text-[#8F431E] uppercase tracking-wider block">
                            {member.position}
                          </span>
                          <h4 className="font-extrabold text-sm text-[#111111] leading-tight">
                            {member.name}
                          </h4>
                          <p className="text-xs text-[#525252] line-clamp-3 leading-relaxed">
                            {member.bio}
                          </p>

                          {/* Login Passcode preview for Master Admin (Masked for Security) */}
                          {session?.isMasterAdmin && member.accessPasscode && (
                            <div className="pt-2 flex items-center justify-between bg-[#FAF3EE] px-2.5 py-1.5 rounded text-[11px] border border-[#E6DDD5]/60">
                              <div className="flex items-center gap-1.5 font-mono text-[#8F431E]">
                                <Lock className="w-3 h-3 text-[#B05A28]" />
                                <span>Passcode:</span>
                                <span className="font-bold tracking-wider">
                                  {visiblePasscodes[member.id]
                                    ? member.accessPasscode
                                    : '••••••••'}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setVisiblePasscodes((prev) => ({
                                    ...prev,
                                    [member.id]: !prev[member.id],
                                  }))
                                }
                                className="text-[#8F431E] hover:text-[#111111] p-0.5 cursor-pointer"
                                title={
                                  visiblePasscodes[member.id] ? 'Hide Passcode' : 'Reveal Passcode'
                                }
                              >
                                {visiblePasscodes[member.id] ? (
                                  <EyeOff className="w-3.5 h-3.5" />
                                ) : (
                                  <Eye className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4 pt-2 border-t border-[#E6DDD5]/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-[#737373]">
                          {member.published ? '✓ Public' : 'Draft'}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {/* Hierarchical Move Up / Down Buttons for Master Control */}
                          {session?.isMasterAdmin && (
                            <div className="flex items-center border border-[#E6DDD5] rounded-md overflow-hidden mr-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => {
                                  DataStore.reorderTeamMember(member.id, 'up');
                                  loadData();
                                  triggerToast(`Moved ${member.name} up in hierarchy.`);
                                }}
                                className="p-1 hover:bg-[#FAF3EE] text-[#525252] disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed"
                                title="Move Up in Public Hierarchy"
                              >
                                <ArrowUp className="w-3 h-3" />
                              </button>
                              <div className="w-[1px] h-3.5 bg-[#E6DDD5]" />
                              <button
                                type="button"
                                disabled={idx === teamMembers.length - 1}
                                onClick={() => {
                                  DataStore.reorderTeamMember(member.id, 'down');
                                  loadData();
                                  triggerToast(`Moved ${member.name} down in hierarchy.`);
                                }}
                                className="p-1 hover:bg-[#FAF3EE] text-[#525252] disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed"
                                title="Move Down in Public Hierarchy"
                              >
                                <ArrowDown className="w-3 h-3" />
                              </button>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => setEditingMember(member)}
                            className="p-1.5 text-[#525252] hover:text-[#B05A28] rounded hover:bg-neutral-100 cursor-pointer"
                            title="Edit Member"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {session?.isMasterAdmin && !member.isMasterAdmin && (
                            <button
                              type="button"
                              onClick={() => {
                                setDeleteConfirmation({
                                  type: 'team',
                                  id: member.id,
                                  title: `Remove Team Member: ${member.name}`,
                                  subtitle: `Are you sure you want to permanently remove ${member.name} (${member.position})?`,
                                  image: member.imageUrl,
                                });
                              }}
                              className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                              title="Delete Member"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 9. DOCUMENTS TAB */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#111111]">Governance & Audit Documents</h2>
                <p className="text-xs text-[#525252]">
                  Manage governance charters, safeguarding policies, and distribution audit templates.
                </p>
              </div>

              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-xl border border-[#E6DDD5] p-4 flex items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-[#111111]">{doc.title}</h4>
                      <p className="text-xs text-[#525252] mt-0.5">
                        {doc.category} · {doc.publishedDate} · {doc.officialStatus}
                      </p>
                    </div>

                    <span className="text-xs text-[#8F431E] font-medium font-mono">
                      {doc.fileSize}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. SETTINGS & SUPABASE SYNC TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-[#111111]">
                  Security, Database Architecture & Cloud Sync
                </h2>
                <p className="text-xs text-[#525252]">
                  Manage master administrator credentials, configure live Supabase connection, or export database backups.
                </p>
              </div>

              {/* Master Administrator Password Management */}
              <div className="bg-white rounded-xl border border-[#E6DDD5] p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#B05A28]" />
                  <h3 className="font-bold text-sm text-[#111111]">
                    Master Administrator Password Management
                  </h3>
                </div>
                <p className="text-xs text-[#525252] leading-relaxed">
                  You can change the Master Administrator password from <code>aos2026</code> to any confidential password of your choice. Once updated, the previous password will no longer be accepted.
                </p>

                <form onSubmit={handleUpdateMasterPassword} className="space-y-4 max-w-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Current Master Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentMasterPassword ? 'text' : 'password'}
                          placeholder="Current password"
                          value={currentMasterPasswordInput}
                          onChange={(e) => setCurrentMasterPasswordInput(e.target.value)}
                          className="w-full px-3 py-2 pr-9 border rounded text-xs font-mono bg-white"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentMasterPassword(!showCurrentMasterPassword)}
                          className="absolute right-2.5 top-2.5 text-[#737373] hover:text-[#111111] p-0.5 cursor-pointer"
                          title={showCurrentMasterPassword ? 'Hide' : 'Reveal'}
                        >
                          {showCurrentMasterPassword ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        New Master Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewMasterPassword ? 'text' : 'password'}
                          placeholder="Min 6 characters"
                          value={newMasterPasswordInput}
                          onChange={(e) => setNewMasterPasswordInput(e.target.value)}
                          className="w-full px-3 py-2 pr-9 border rounded text-xs font-mono bg-white"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewMasterPassword(!showNewMasterPassword)}
                          className="absolute right-2.5 top-2.5 text-[#737373] hover:text-[#111111] p-0.5 cursor-pointer"
                          title={showNewMasterPassword ? 'Hide' : 'Reveal'}
                        >
                          {showNewMasterPassword ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmMasterPassword ? 'text' : 'password'}
                          placeholder="Repeat password"
                          value={confirmMasterPasswordInput}
                          onChange={(e) => setConfirmMasterPasswordInput(e.target.value)}
                          className="w-full px-3 py-2 pr-9 border rounded text-xs font-mono bg-white"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmMasterPassword(!showConfirmMasterPassword)}
                          className="absolute right-2.5 top-2.5 text-[#737373] hover:text-[#111111] p-0.5 cursor-pointer"
                          title={showConfirmMasterPassword ? 'Hide' : 'Reveal'}
                        >
                          {showConfirmMasterPassword ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {passwordChangeMsg && (
                    <div
                      className={`p-3 rounded-lg text-xs leading-relaxed border ${
                        passwordChangeMsg.isError
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {passwordChangeMsg.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer shadow-xs"
                  >
                    Save New Master Password
                  </button>
                </form>
              </div>

              {/* Supabase Connection */}
              <div className="bg-white rounded-xl border border-[#E6DDD5] p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#B05A28]" />
                  <h3 className="font-bold text-sm text-[#111111]">
                    Supabase PostgreSQL Connection
                  </h3>
                </div>
                <p className="text-xs text-[#525252]">
                  The platform operates with instant local persistence out-of-the-box. To connect directly to your live Supabase database instance, enter your credentials below (or define <code>VITE_SUPABASE_URL</code> in <code>.env</code>).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Supabase Project URL</label>
                    <input
                      type="text"
                      placeholder="https://your-project.supabase.co"
                      value={DataStore.getSupabaseConfig().supabaseUrl}
                      onChange={(e) =>
                        DataStore.updateSupabaseConfig({ supabaseUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Supabase Anon Public Key
                    </label>
                    <input
                      type="password"
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      value={DataStore.getSupabaseConfig().supabaseAnonKey}
                      onChange={(e) =>
                        DataStore.updateSupabaseConfig({ supabaseAnonKey: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    disabled={isTestingSupabase}
                    onClick={async () => {
                      setIsTestingSupabase(true);
                      setSupabaseTestMsg(null);
                      const res = await SupabaseService.testConnection();
                      setIsTestingSupabase(false);
                      setSupabaseTestMsg(res);
                    }}
                    className="px-4 py-2 bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTestingSupabase ? 'animate-spin' : ''}`} />
                    <span>{isTestingSupabase ? 'Testing Live Connection...' : 'Test Supabase Connection'}</span>
                  </button>
                  <span className="text-[11px] text-[#737373]">
                    Connected project: <code className="font-mono text-[#8F431E]">twqfqdueqgwphatinvdy</code>
                  </span>
                </div>

                {supabaseTestMsg && (
                  <div
                    className={`p-3 rounded-lg text-xs leading-relaxed border ${
                      supabaseTestMsg.ok
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    <strong>{supabaseTestMsg.ok ? '✓ Connection Verified:' : 'Notice:'}</strong>{' '}
                    {supabaseTestMsg.message}
                  </div>
                )}

                <div className="p-3 bg-[#FAF3EE] rounded-lg text-xs text-[#8F431E]">
                  Complete database DDL tables and Row Level Security scripts are ready in <code>supabase/schema.sql</code>.
                </div>
              </div>

              {/* Backup & Export */}
              <div className="bg-white rounded-xl border border-[#E6DDD5] p-6 space-y-4">
                <h3 className="font-bold text-sm text-[#111111]">
                  Data Portability & Full JSON Backup
                </h3>
                <p className="text-xs text-[#525252]">
                  Download a full backup of your programmes, gallery items, news, inquiries, and site content.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      const json = DataStore.exportDatabaseJSON();
                      const blob = new Blob([json], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `aos_foundation_backup_${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      triggerToast('Backup JSON downloaded!');
                    }}
                    className="px-4 py-2 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON Backup</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDeleteConfirmation({
                        type: 'baseline',
                        title: 'Reset to Baseline Defaults',
                        subtitle: 'Are you sure you want to reset all website content, programmes, and statistics back to the verified official baseline? Any custom test entries will be overwritten.',
                      });
                    }}
                    className="px-4 py-2 border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer transition-colors min-h-[40px]"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset to Baseline Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}

                {/* Universal Admin Bottom Cross-Section Navigation Footer */}
                <div className="mt-12 pt-6 border-t border-[#E6DDD5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <button
                    type="button"
                    onClick={handleAdminPrevTab}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-[#FAF3EE] border border-[#E6DDD5] text-[#8F431E] font-bold transition-all group cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    <span>← Previous Section: {prevAdminTab?.label}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="px-3.5 py-2 rounded-lg bg-[#FAF3EE] hover:bg-[#F3EAE2] text-[#8F431E] font-semibold border border-[#E6DDD5] transition-colors cursor-pointer"
                    >
                      ↑ Back to Top of Section
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('/')}
                      className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#FCFAF7] text-[#525252] hover:text-[#111111] border border-[#E6DDD5] transition-colors cursor-pointer"
                    >
                      Exit to Public Site
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAdminNextTab}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#B05A28] hover:bg-[#8F431E] text-white font-bold transition-all group cursor-pointer shadow-2xs"
                  >
                    <span>Next Section: {nextAdminTab?.label} →</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </main>
            </>
          );
        })()}
      </div>

      {/* Universal In-App Deletion & Confirmation Modal (Works 100% on Mobile, Tablets, PC & iFrames) */}
      {deleteConfirmation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setDeleteConfirmation(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-[#E6DDD5] overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#111111]">
                    {deleteConfirmation.title}
                  </h3>
                  <p className="text-xs text-[#737373]">
                    This action is permanent and cannot be undone.
                  </p>
                </div>
              </div>

              {deleteConfirmation.image && (
                <div className="w-full h-40 rounded-xl overflow-hidden bg-[#FCFAF7] border border-[#E6DDD5] flex items-center justify-center">
                  <img
                    src={deleteConfirmation.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {deleteConfirmation.subtitle && (
                <div className="p-3 bg-[#FCFAF7] rounded-xl border border-[#E6DDD5] text-xs text-[#404040] leading-relaxed">
                  {deleteConfirmation.subtitle}
                </div>
              )}
            </div>

            <div className="bg-[#FAF3EE] px-6 py-4 border-t border-[#E6DDD5] flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#E6DDD5] bg-white hover:bg-neutral-50 text-xs font-semibold text-[#404040] transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeConfirmedDelete}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm min-h-[44px] flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Yes, Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
