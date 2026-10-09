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
  AdminAuthSession,
  TeamMemberPermissions,
} from '../types';
import {
  initialSiteContent,
  initialProgrammes,
  initialImpactStatistics,
  initialGallery,
  initialNewsPosts,
  initialDocuments,
  initialYouTubeVideos,
  initialTeamMembers,
} from '../data/initialData';
import { SupabaseService, supabaseUrl, supabaseAnonKey } from './supabase';

const STORAGE_KEYS = {
  SITE_CONTENT: 'aos_site_content_v1',
  PROGRAMMES: 'aos_programmes_v1',
  IMPACT_STATS: 'aos_impact_stats_v1',
  GALLERY: 'aos_gallery_v1',
  NEWS: 'aos_news_v1',
  VOLUNTEERS: 'aos_volunteers_v1',
  ENQUIRIES: 'aos_enquiries_v1',
  DOCUMENTS: 'aos_documents_v1',
  YOUTUBE_VIDEOS: 'aos_youtube_videos_v1',
  TEAM_MEMBERS: 'aos_team_members_v1',
  ADMIN_SESSION: 'aos_admin_session_v1',
  SUPABASE_CONFIG: 'aos_supabase_config_v1',
  MASTER_PASSWORD: 'aos_master_password_v1',
};

// Safe LocalStorage helpers
function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Emit custom event for cross-component reactivity
    window.dispatchEvent(new CustomEvent('aos_store_updated', { detail: { key } }));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isConnected: boolean;
}

export const DataStore = {
  // --- Site Content ---
  getSiteContent(): SiteContent {
    return safeGet<SiteContent>(STORAGE_KEYS.SITE_CONTENT, initialSiteContent);
  },
  updateSiteContent(updates: Partial<SiteContent>): SiteContent {
    const current = this.getSiteContent();
    const updated = { ...current, ...updates };
    safeSet(STORAGE_KEYS.SITE_CONTENT, updated);
    return updated;
  },

  // --- Programmes ---
  getProgrammes(): Programme[] {
    return safeGet<Programme[]>(STORAGE_KEYS.PROGRAMMES, initialProgrammes);
  },
  getProgrammeBySlug(slug: string): Programme | undefined {
    return this.getProgrammes().find((p) => p.slug === slug);
  },
  getProgrammeById(id: string): Programme | undefined {
    return this.getProgrammes().find((p) => p.id === id);
  },
  saveProgramme(programme: Programme): Programme {
    const list = this.getProgrammes();
    const existingIndex = list.findIndex((p) => p.id === programme.id);
    let updatedList: Programme[];

    const now = new Date().toISOString();
    const enriched = {
      ...programme,
      updatedAt: now,
      createdAt: programme.createdAt || now,
    };

    if (existingIndex >= 0) {
      updatedList = [...list];
      updatedList[existingIndex] = enriched;
    } else {
      updatedList = [enriched, ...list];
    }

    safeSet(STORAGE_KEYS.PROGRAMMES, updatedList);
    return enriched;
  },
  deleteProgramme(id: string): void {
    const list = this.getProgrammes().filter((p) => p.id !== id);
    safeSet(STORAGE_KEYS.PROGRAMMES, list);
  },

  // --- Impact Statistics ---
  getImpactStats(): ImpactStatistic[] {
    return safeGet<ImpactStatistic[]>(STORAGE_KEYS.IMPACT_STATS, initialImpactStatistics);
  },
  saveImpactStat(stat: ImpactStatistic): ImpactStatistic {
    const list = this.getImpactStats();
    const existingIndex = list.findIndex((s) => s.id === stat.id);
    let updatedList: ImpactStatistic[];

    if (existingIndex >= 0) {
      updatedList = [...list];
      updatedList[existingIndex] = stat;
    } else {
      updatedList = [...list, stat];
    }

    safeSet(STORAGE_KEYS.IMPACT_STATS, updatedList);
    return stat;
  },
  deleteImpactStat(id: string): void {
    const list = this.getImpactStats().filter((s) => s.id !== id);
    safeSet(STORAGE_KEYS.IMPACT_STATS, list);
  },

  // --- Gallery ---
  getGallery(onlyValidUrl = false, onlyPublished = false): GalleryItem[] {
    const list = safeGet<GalleryItem[]>(STORAGE_KEYS.GALLERY, initialGallery);
    let filtered = list;
    if (onlyValidUrl) {
      filtered = filtered.filter((g) => Boolean(g.url && g.url.trim().length > 0));
    }
    if (onlyPublished) {
      filtered = filtered.filter((g) => g.published !== false);
    }
    return filtered;
  },
  saveGalleryItem(item: GalleryItem): GalleryItem {
    const list = this.getGallery();
    const existingIndex = list.findIndex((g) => g.id === item.id);
    let updatedList: GalleryItem[];

    const enriched: GalleryItem = {
      ...item,
      url: item.url?.trim() || '',
      published: item.published ?? true,
      createdAt: item.createdAt || new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      updatedList = [...list];
      updatedList[existingIndex] = enriched;
    } else {
      updatedList = [enriched, ...list];
    }

    safeSet(STORAGE_KEYS.GALLERY, updatedList);

    // Sync to Supabase if available
    try {
      if (SupabaseService.isConfigured()) {
        SupabaseService.client.from('gallery').upsert({
          id: enriched.id,
          image_url: enriched.url,
          caption: enriched.caption,
          category: enriched.category,
          photographer: enriched.photographerCredit || 'AOS Media Team',
          safeguarding_cleared: enriched.childPrivacyCleared,
          published: enriched.published,
          created_at: enriched.createdAt,
        }).then(({ error }) => {
          if (error) console.warn('Supabase gallery upsert error:', error.message);
        });
      }
    } catch (e) {
      console.warn('Supabase sync skipped:', e);
    }

    return enriched;
  },
  toggleGalleryPublished(id: string): boolean {
    const list = this.getGallery();
    const target = list.find((g) => g.id === id);
    if (!target) return false;
    target.published = !target.published;
    safeSet(STORAGE_KEYS.GALLERY, list);
    return target.published;
  },
  deleteGalleryItem(id: string): boolean {
    const list = this.getGallery();
    const updatedList = list.filter((g) => g.id !== id);
    safeSet(STORAGE_KEYS.GALLERY, updatedList);

    // Also delete from Supabase if connected
    try {
      if (SupabaseService.isConfigured()) {
        SupabaseService.client.from('gallery').delete().eq('id', id).then(({ error }) => {
          if (error) console.warn('Supabase gallery delete error:', error.message);
        });
      }
    } catch (e) {
      console.warn('Supabase delete skipped:', e);
    }

    return true;
  },

  // --- News Posts ---
  getNewsPosts(): NewsPost[] {
    return safeGet<NewsPost[]>(STORAGE_KEYS.NEWS, initialNewsPosts);
  },
  getNewsPostBySlug(slug: string): NewsPost | undefined {
    return this.getNewsPosts().find((p) => p.slug === slug);
  },
  saveNewsPost(post: NewsPost): NewsPost {
    const list = this.getNewsPosts();
    const existingIndex = list.findIndex((p) => p.id === post.id);
    let updatedList: NewsPost[];

    if (existingIndex >= 0) {
      updatedList = [...list];
      updatedList[existingIndex] = post;
    } else {
      updatedList = [post, ...list];
    }

    safeSet(STORAGE_KEYS.NEWS, updatedList);
    return post;
  },
  deleteNewsPost(id: string): void {
    const list = this.getNewsPosts().filter((p) => p.id !== id);
    safeSet(STORAGE_KEYS.NEWS, list);
  },

  // --- Volunteer Applications ---
  getVolunteers(): VolunteerApplication[] {
    return safeGet<VolunteerApplication[]>(STORAGE_KEYS.VOLUNTEERS, [
      {
        id: 'vol-sample-01',
        fullName: 'Ibrahim Alabi',
        email: 'ibrahim.alabi@example.org',
        phone: '08031234567',
        location: 'Lagos State',
        interestArea: 'Education Support',
        availability: 'Weekends',
        message: 'Passionate about school kit distribution and assisting field teams in community primary schools.',
        status: 'new',
        submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
    ]);
  },
  submitVolunteer(app: Omit<VolunteerApplication, 'id' | 'status' | 'submittedAt'>): VolunteerApplication {
    const list = this.getVolunteers();
    const newEntry: VolunteerApplication = {
      ...app,
      id: `vol-${Date.now()}`,
      status: 'new',
      submittedAt: new Date().toISOString(),
    };
    safeSet(STORAGE_KEYS.VOLUNTEERS, [newEntry, ...list]);

    // Asynchronously sync with Supabase cloud database
    SupabaseService.insertVolunteer(app).catch((err) => {
      console.warn('Supabase volunteer sync note:', err);
    });

    return newEntry;
  },
  updateVolunteerStatus(id: string, status: VolunteerApplication['status']): void {
    const list = this.getVolunteers().map((v) => (v.id === id ? { ...v, status } : v));
    safeSet(STORAGE_KEYS.VOLUNTEERS, list);
  },
  deleteVolunteer(id: string): void {
    const list = this.getVolunteers().filter((v) => v.id !== id);
    safeSet(STORAGE_KEYS.VOLUNTEERS, list);
  },

  // --- Enquiries ---
  getEnquiries(): ContactEnquiry[] {
    return safeGet<ContactEnquiry[]>(STORAGE_KEYS.ENQUIRIES, [
      {
        id: 'enq-sample-01',
        name: 'Chinyere Okafor',
        email: 'chinyere.o@example.com',
        phone: '08029876543',
        organisation: 'Community Initiative Partners',
        enquiryType: 'Partnership',
        message: 'Interested in partnering with AOS Foundation to sponsor notebooks and shoes for 50 primary students.',
        status: 'new',
        submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
    ]);
  },
  submitEnquiry(enquiry: Omit<ContactEnquiry, 'id' | 'status' | 'submittedAt'>): ContactEnquiry {
    const list = this.getEnquiries();
    const newEntry: ContactEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: 'new',
      submittedAt: new Date().toISOString(),
    };
    safeSet(STORAGE_KEYS.ENQUIRIES, [newEntry, ...list]);

    // Asynchronously sync with Supabase cloud database
    SupabaseService.insertEnquiry(enquiry).catch((err) => {
      console.warn('Supabase enquiry sync note:', err);
    });

    return newEntry;
  },
  updateEnquiryStatus(id: string, status: ContactEnquiry['status']): void {
    const list = this.getEnquiries().map((e) => (e.id === id ? { ...e, status } : e));
    safeSet(STORAGE_KEYS.ENQUIRIES, list);
  },
  deleteEnquiry(id: string): void {
    const list = this.getEnquiries().filter((e) => e.id !== id);
    safeSet(STORAGE_KEYS.ENQUIRIES, list);
  },

  // --- Governance Documents ---
  getDocuments(): GovernanceDocument[] {
    return safeGet<GovernanceDocument[]>(STORAGE_KEYS.DOCUMENTS, initialDocuments);
  },
  saveDocument(doc: GovernanceDocument): GovernanceDocument {
    const list = this.getDocuments();
    const existingIndex = list.findIndex((d) => d.id === doc.id);
    let updatedList: GovernanceDocument[];

    if (existingIndex >= 0) {
      updatedList = [...list];
      updatedList[existingIndex] = doc;
    } else {
      updatedList = [doc, ...list];
    }

    safeSet(STORAGE_KEYS.DOCUMENTS, updatedList);
    return doc;
  },
  deleteDocument(id: string): void {
    const list = this.getDocuments().filter((d) => d.id !== id);
    safeSet(STORAGE_KEYS.DOCUMENTS, list);
  },

  // --- YouTube Videos & Channels ---
  getYouTubeVideos(): YouTubeVideoItem[] {
    return safeGet<YouTubeVideoItem[]>(STORAGE_KEYS.YOUTUBE_VIDEOS, initialYouTubeVideos);
  },
  saveYouTubeVideo(video: YouTubeVideoItem): YouTubeVideoItem {
    const list = this.getYouTubeVideos();
    const existingIndex = list.findIndex((v) => v.id === video.id);
    let updatedList: YouTubeVideoItem[];

    if (existingIndex >= 0) {
      updatedList = [...list];
      updatedList[existingIndex] = video;
    } else {
      updatedList = [video, ...list];
    }

    safeSet(STORAGE_KEYS.YOUTUBE_VIDEOS, updatedList);
    return video;
  },
  deleteYouTubeVideo(id: string): void {
    const list = this.getYouTubeVideos().filter((v) => v.id !== id);
    safeSet(STORAGE_KEYS.YOUTUBE_VIDEOS, list);
  },

  // --- Team Members & Role Delegation ---
  getTeamMembers(onlyPublished = false): TeamMember[] {
    const list = safeGet<TeamMember[]>(STORAGE_KEYS.TEAM_MEMBERS, initialTeamMembers);
    const sorted = [...list].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    if (onlyPublished) {
      return sorted.filter((m) => m.published);
    }
    return sorted;
  },
  saveTeamMember(member: TeamMember): TeamMember {
    const list = this.getTeamMembers();
    const existingIndex = list.findIndex((m) => m.id === member.id);
    let updatedList: TeamMember[];

    const enriched = {
      ...member,
      createdAt: member.createdAt || new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      updatedList = [...list];
      updatedList[existingIndex] = enriched;
    } else {
      updatedList = [...list, enriched];
    }

    safeSet(STORAGE_KEYS.TEAM_MEMBERS, updatedList);
    return enriched;
  },
  deleteTeamMember(id: string): boolean {
    const list = this.getTeamMembers();
    const updated = list.filter((m) => m.id !== id);
    safeSet(STORAGE_KEYS.TEAM_MEMBERS, updated);
    return true;
  },
  reorderTeamMember(id: string, direction: 'up' | 'down'): TeamMember[] {
    const list = [...this.getTeamMembers()];
    const index = list.findIndex((m) => m.id === id);
    if (index < 0) return list;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return list;

    // Swap adjacent members
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    // Normalize displayOrder numbers sequentially
    const updated = list.map((item, idx) => ({
      ...item,
      displayOrder: idx + 1,
    }));

    safeSet(STORAGE_KEYS.TEAM_MEMBERS, updated);
    return updated;
  },
  setTeamMemberOrder(id: string, newOrder: number): TeamMember[] {
    const list = [...this.getTeamMembers()];
    const item = list.find((m) => m.id === id);
    if (!item) return list;

    item.displayOrder = Math.max(1, newOrder);
    list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    const updated = list.map((m, idx) => ({
      ...m,
      displayOrder: idx + 1,
    }));

    safeSet(STORAGE_KEYS.TEAM_MEMBERS, updated);
    return updated;
  },

  // --- Master Admin Password Management ---
  getMasterPassword(): string {
    return safeGet<string>(STORAGE_KEYS.MASTER_PASSWORD, 'aos2026');
  },
  setMasterPassword(newPassword: string): boolean {
    const trimmed = newPassword.trim();
    if (!trimmed || trimmed.length < 4) return false;
    safeSet(STORAGE_KEYS.MASTER_PASSWORD, trimmed);
    return true;
  },

  // --- Role-Based Admin Session ---
  getAdminSession(): AdminAuthSession | null {
    const session = safeGet<AdminAuthSession | null>(STORAGE_KEYS.ADMIN_SESSION, null);
    if (!session) return null;
    if (session.expires <= Date.now()) {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      return null;
    }
    return session;
  },
  isAdminAuthenticated(): boolean {
    return Boolean(this.getAdminSession());
  },
  loginAdmin(passphrase: string): { success: boolean; session?: AdminAuthSession } {
    const trimmed = passphrase.trim();
    if (!trimmed) return { success: false };

    // 1. Check Master Admin Passphrase (Custom or Default)
    // Only accept active master password. If admin changed from aos2026, old default is no longer accepted.
    const activeMaster = this.getMasterPassword();
    const isMasterMatch = trimmed === activeMaster;

    if (isMasterMatch) {
      const fullPermissions: TeamMemberPermissions = {
        canManageProgrammes: true,
        canManageGallery: true,
        canManageVideos: true,
        canManageNews: true,
        canManageImpact: true,
        canManageVolunteers: true,
        canManageEnquiries: true,
        canManageSiteContent: true,
        canManageTeam: true,
        canManageSettings: true,
      };

      const session: AdminAuthSession = {
        token: `aos_master_${Date.now()}`,
        expires: Date.now() + 1000 * 60 * 60 * 12, // 12 hours
        isMasterAdmin: true,
        memberName: 'Master Plan Administrator',
        memberPosition: 'Media Strategist / Systems Lead',
        permissions: fullPermissions,
      };

      safeSet(STORAGE_KEYS.ADMIN_SESSION, session);
      return { success: true, session };
    }

    // 2. Check Delegated Team Members Credentials
    const team = this.getTeamMembers();
    const matched = team.find(
      (m) => m.accessPasscode && m.accessPasscode.trim().toLowerCase() === trimmed.toLowerCase()
    );

    if (matched) {
      const session: AdminAuthSession = {
        token: `aos_team_${matched.id}_${Date.now()}`,
        expires: Date.now() + 1000 * 60 * 60 * 12,
        isMasterAdmin: Boolean(matched.isMasterAdmin),
        teamMemberId: matched.id,
        memberName: matched.name,
        memberPosition: matched.position,
        permissions: matched.permissions,
      };

      safeSet(STORAGE_KEYS.ADMIN_SESSION, session);
      return { success: true, session };
    }

    return { success: false };
  },
  logoutAdmin(): void {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    window.dispatchEvent(new CustomEvent('aos_store_updated', { detail: { key: 'admin_logout' } }));
  },

  // --- Supabase Config Integration ---
  getSupabaseConfig(): SupabaseConfig {
    const stored = safeGet<SupabaseConfig>(STORAGE_KEYS.SUPABASE_CONFIG, {
      supabaseUrl: supabaseUrl,
      supabaseAnonKey: supabaseAnonKey,
      isConnected: Boolean(supabaseUrl && supabaseAnonKey),
    });

    return stored;
  },
  updateSupabaseConfig(config: Partial<SupabaseConfig>): void {
    const current = this.getSupabaseConfig();
    const updated = {
      ...current,
      ...config,
      isConnected: Boolean(config.supabaseUrl || current.supabaseUrl),
    };
    safeSet(STORAGE_KEYS.SUPABASE_CONFIG, updated);
  },

  // --- Backup / Export / Reset ---
  exportDatabaseJSON(): string {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      siteContent: this.getSiteContent(),
      programmes: this.getProgrammes(),
      impactStatistics: this.getImpactStats(),
      gallery: this.getGallery(),
      newsPosts: this.getNewsPosts(),
      volunteers: this.getVolunteers(),
      enquiries: this.getEnquiries(),
      documents: this.getDocuments(),
      youtubeVideos: this.getYouTubeVideos(),
      teamMembers: this.getTeamMembers(),
    };
    return JSON.stringify(backup, null, 2);
  },
  importDatabaseJSON(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.siteContent) safeSet(STORAGE_KEYS.SITE_CONTENT, data.siteContent);
      if (data.programmes) safeSet(STORAGE_KEYS.PROGRAMMES, data.programmes);
      if (data.impactStatistics) safeSet(STORAGE_KEYS.IMPACT_STATS, data.impactStatistics);
      if (data.gallery) safeSet(STORAGE_KEYS.GALLERY, data.gallery);
      if (data.newsPosts) safeSet(STORAGE_KEYS.NEWS, data.newsPosts);
      if (data.volunteers) safeSet(STORAGE_KEYS.VOLUNTEERS, data.volunteers);
      if (data.enquiries) safeSet(STORAGE_KEYS.ENQUIRIES, data.enquiries);
      if (data.documents) safeSet(STORAGE_KEYS.DOCUMENTS, data.documents);
      if (data.youtubeVideos) safeSet(STORAGE_KEYS.YOUTUBE_VIDEOS, data.youtubeVideos);
      if (data.teamMembers) safeSet(STORAGE_KEYS.TEAM_MEMBERS, data.teamMembers);
      return true;
    } catch (e) {
      console.error('Failed to import JSON backup:', e);
      return false;
    }
  },
  resetToVerifiedDefaults(): void {
    safeSet(STORAGE_KEYS.SITE_CONTENT, initialSiteContent);
    safeSet(STORAGE_KEYS.PROGRAMMES, initialProgrammes);
    safeSet(STORAGE_KEYS.IMPACT_STATS, initialImpactStatistics);
    safeSet(STORAGE_KEYS.GALLERY, initialGallery);
    safeSet(STORAGE_KEYS.NEWS, initialNewsPosts);
    safeSet(STORAGE_KEYS.DOCUMENTS, initialDocuments);
    safeSet(STORAGE_KEYS.YOUTUBE_VIDEOS, initialYouTubeVideos);
    safeSet(STORAGE_KEYS.TEAM_MEMBERS, initialTeamMembers);
  },
};
