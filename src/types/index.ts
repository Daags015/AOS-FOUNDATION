export type ProgrammeCategory = 'Education Support' | 'Empowerment' | 'Skills Acquisition';

export type ProgrammeStatus = 'Draft' | 'Upcoming' | 'Ongoing' | 'Completed' | 'Archived';

export interface Programme {
  id: string;
  slug: string;
  title: string;
  category: ProgrammeCategory;
  shortDescription: string;
  fullDescription: string;
  location: string;
  date: string;
  status: ProgrammeStatus;
  beneficiariesSummary: string;
  impactSummary: string;
  coverImage: string;
  images: string[];
  featured: boolean;
  materialsIncluded: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ImpactStatistic {
  id: string;
  metricKey: string;
  label: string;
  value: string;
  unit?: string;
  isVerified: boolean;
  verificationNote: string;
  orderIndex: number;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'Education Support' | 'Community Activities' | 'Empowerment' | 'Skills Acquisition' | 'Volunteers' | 'Events';
  programmeId?: string;
  programmeTitle?: string;
  photographerCredit?: string;
  childPrivacyCleared: boolean;
  contextNote?: string;
  published?: boolean;
  createdAt: string;
}

export interface NewsPost {
  id: string;
  slug: string;
  title: string;
  category: 'Programme Update' | 'Community' | 'Education' | 'Announcement' | 'Event' | 'Impact';
  excerpt: string;
  content: string;
  author: string;
  coverImage: string;
  published: boolean;
  publishedAt: string;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  interestArea: 'Education Support' | 'Field Distribution' | 'Skills Mentorship' | 'Logistics & Coordination' | 'Media & Photography' | 'Administrative Support';
  availability: 'Weekdays' | 'Weekends' | 'Project-based' | 'Full-time' | 'Flexible';
  message: string;
  status: 'new' | 'contacted' | 'accepted' | 'declined' | 'archived';
  submittedAt: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  organisation?: string;
  enquiryType: 'Donation' | 'Sponsorship' | 'Partnership' | 'Volunteering' | 'General Enquiry';
  message: string;
  status: 'new' | 'responded' | 'closed';
  submittedAt: string;
}

export interface GovernanceDocument {
  id: string;
  title: string;
  category: 'Annual Report' | 'Programme Report' | 'Financial Information' | 'Safeguarding' | 'Governance & Policy';
  fileUrl: string;
  fileSize: string;
  publishedDate: string;
  summary: string;
  officialStatus: 'Official AOS Publication' | 'Framework Document' | 'Awaiting Foundation Ratification';
}

export interface SiteContent {
  heroHeadline: string;
  heroSubheadline: string;
  theProblemHeadline: string;
  theProblemIntro: string;
  materialsFocus: string[];
  missionStatement: string;
  visionStatement: string;
  values: {
    title: string;
    description: string;
  }[];
  contactPhone: string;
  contactWhatsApp: string;
  contactEmail: string;
  contactAddress: string;
  donationAccountNotice: string;
  customLogoUrl?: string;
  youtubeChannelUrl?: string;
  youtubeComingSoon?: boolean;
  youtubeComingSoonNotice?: string;
  // Trust Badges under Hero (Editable & Toggleable)
  showTrustBadge1?: boolean;
  trustBadge1Text?: string;
  showTrustBadge2?: boolean;
  trustBadge2Text?: string;
  showTrustBadge3?: boolean;
  trustBadge3Text?: string;
}

export interface YouTubeVideoItem {
  id: string;
  youtubeUrl: string;
  title: string;
  description: string;
  category: 'Field Outreach' | 'Documentary' | 'Student Story' | 'Community Forum' | 'Message from Founder';
  duration?: string;
  date?: string;
  location?: string;
  featured?: boolean;
}

export interface TeamMemberPermissions {
  canManageProgrammes: boolean;
  canManageGallery: boolean;
  canManageVideos: boolean;
  canManageNews: boolean;
  canManageImpact: boolean;
  canManageVolunteers: boolean;
  canManageEnquiries: boolean;
  canManageSiteContent: boolean;
  canManageTeam: boolean;
  canManageSettings: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl?: string;
  department?: string;
  email?: string;
  phone?: string;
  isMasterAdmin?: boolean;
  accessPasscode?: string;
  permissions: TeamMemberPermissions;
  displayOrder: number;
  published: boolean;
  createdAt: string;
}

export interface AdminAuthSession {
  token: string;
  expires: number;
  isMasterAdmin: boolean;
  teamMemberId?: string;
  memberName?: string;
  memberPosition?: string;
  permissions: TeamMemberPermissions;
}


