import {
  Programme,
  ImpactStatistic,
  GalleryItem,
  NewsPost,
  GovernanceDocument,
  SiteContent,
  YouTubeVideoItem,
  TeamMember,
} from '../types';

export const initialSiteContent: SiteContent = {
  heroHeadline: 'Every Child Deserves the Opportunity to Learn With Dignity.',
  heroSubheadline:
    'AOS Foundation bridges the gap between parents, communities, and available government educational opportunities by providing essential materials—notebooks, school bags, shoes, uniforms, and socks.',
  theProblemHeadline: 'The Silent Barrier to Education',
  theProblemIntro:
    'Even where governments provide tuition-free basic education, thousands of children remain out of school or face daily humiliation in classrooms simply because their families cannot afford the basic physical materials required to attend.',
  materialsFocus: [
    'Notebooks & Exercise Books',
    'Durable School Bags',
    'Sturdy School Shoes',
    'Clean School Uniforms',
    'Socks & Undergarments',
    'Writing Materials & Mathematical Sets',
  ],
  missionStatement:
    'To bridge the educational participation divide across communities by equipping underserved children with the dignity of basic learning materials, while fostering sustainable community empowerment and practical skills acquisition.',
  visionStatement:
    'A society where no child is excluded from learning, dignity, or future opportunity due to a lack of basic school essentials.',
  values: [
    {
      title: 'Dignity First',
      description:
        'We honor the self-respect of every child and family we serve, rejecting degrading narratives or sensationalized charity depictions.',
    },
    {
      title: 'Radical Transparency',
      description:
        'We believe trust is earned through verifiable action, accurate reporting, and strict accountability for every resource entrusted to us.',
    },
    {
      title: 'Community Partnership',
      description:
        'We work alongside parents, local teachers, and community heads rather than imposing outside assumptions.',
    },
    {
      title: 'Accountability',
      description:
        'We maintain rigorous governance, documented distributions, and open reporting accessible to all stakeholders.',
    },
    {
      title: 'Integrity',
      description:
        'Our words reflect our deeds. If an outcome is not yet verified or documented, we state so openly in our reports.',
    },
    {
      title: 'Sustainable Action',
      description:
        'We combine immediate educational material relief with long-term youth skills acquisition and family empowerment.',
    },
  ],
  contactPhone: '08168779732',
  contactWhatsApp: '08168779732',
  contactEmail: 'contact@aosfoundation.org',
  contactAddress: 'Nigeria (Operational Base - Details editable in Admin CMS)',
  donationAccountNotice:
    'AOS Foundation coordinates material and financial donations directly through vetted channels. Bank transfer details and direct physical drop-off logistics are verified upon inquiry to safeguard donor contributions.',
  customLogoUrl: '',
  youtubeChannelUrl: 'https://www.youtube.com/@aosfoundation',
  youtubeComingSoon: true,
  youtubeComingSoonNotice:
    'Official field video dispatches are currently in production. High-transparency documentary footage from our community primary school material distributions will be published here upon editorial and safeguarding clearance.',
  showTrustBadge1: true,
  trustBadge1Text: 'Dignified Direct Support',
  showTrustBadge2: true,
  trustBadge2Text: 'Strict Safeguarding',
  showTrustBadge3: true,
  trustBadge3Text: 'Zero Fabricated Stats',
};

export const initialProgrammes: Programme[] = [
  {
    id: 'prog-01',
    slug: 'education-support',
    title: 'Education Support Programme',
    category: 'Education Support',
    shortDescription:
      'Equipping vulnerable pupils with full school kits: notebooks, sturdy school bags, shoes, uniforms, and socks so they can attend school without stigma.',
    fullDescription:
      'The Education Support Programme is AOS Foundation’s primary pillar. In many communities, public primary schooling is technically tuition-free, yet children are routinely turned away or drop out due to uniform non-compliance, lack of notebooks, or having no footwear. We work with public schools and village heads to identify children genuinely in need, providing each child with a comprehensive educational pack designed to last the academic year.',
    location: 'Primary Schools & Community Centers (Locations managed via CMS)',
    date: 'Active Programme',
    status: 'Ongoing',
    beneficiariesSummary: 'Underserved primary and junior secondary students',
    impactSummary:
      'Removes the direct material barrier preventing enrolled children from attending classes consistently with self-esteem.',
    coverImage: 'https://i.ibb.co/XfPxFrVP/IMG-20240113-WA0008.jpg',
    images: ['https://i.ibb.co/XfPxFrVP/IMG-20240113-WA0008.jpg'],
    featured: true,
    materialsIncluded: [
      'Custom ruled exercise notebooks',
      'Reinforced water-resistant school bags',
      'Durable leather school shoes',
      'Tailored school uniforms',
      'Socks and stationery pouches',
    ],
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'prog-02',
    slug: 'empowerment',
    title: 'Family & Community Empowerment',
    category: 'Empowerment',
    shortDescription:
      'Strengthening household self-reliance and parental support groups to ensure children remain sustainably enrolled across multiple school years.',
    fullDescription:
      'Providing educational materials provides immediate relief, but long-term educational retention requires an empowered home environment. This programme focuses on community dialogs, caregiver support networks, and localized micro-enterprise encouragement so families are progressively able to sustain their children’s learning needs independently.',
    location: 'Community Hubs (Editable in Admin CMS)',
    date: 'Phase 1 Rollout',
    status: 'Ongoing',
    beneficiariesSummary: 'Parents, caregivers, and community education committees',
    impactSummary:
      'Encourages parental ownership of public schooling and establishes local accountability circles.',
    coverImage: '',
    images: [],
    featured: true,
    materialsIncluded: [
      'Parental mentorship toolkits',
      'Community educational forums',
      'Caregiver peer-support circles',
    ],
    createdAt: '2026-02-01T00:00:00Z',
    updatedAt: '2026-03-05T00:00:00Z',
  },
  {
    id: 'prog-03',
    slug: 'skills-acquisition',
    title: 'Vocational Skills Acquisition Initiative',
    category: 'Skills Acquisition',
    shortDescription:
      'Hands-on vocational skills training for older youth and out-of-school adolescents to build productive livelihoods and self-determination.',
    fullDescription:
      'Recognizing that adolescents and young adults require practical economic agency, AOS Foundation is establishing vocational training tracks in practical crafts, sewing and uniform production, digital literacy, and technical trades. This creates a circular benefit: local trainees can participate in producing school uniforms and bags for the Education Support programme.',
    location: 'Vocational Training Centers (Editable in Admin CMS)',
    date: 'Pilot Phase Scheduled',
    status: 'Upcoming',
    beneficiariesSummary: 'Adolescent youth and young adults seeking trade skills',
    impactSummary:
      'Creates viable career pathways and locally produced educational supplies.',
    coverImage: '',
    images: [],
    featured: true,
    materialsIncluded: [
      'Tailoring & uniform crafting equipment',
      'Technical trade starter tools',
      'Mentorship and practical workshop materials',
    ],
    createdAt: '2026-02-10T00:00:00Z',
    updatedAt: '2026-03-10T00:00:00Z',
  },
];

export const initialImpactStatistics: ImpactStatistic[] = [
  {
    id: 'stat-01',
    metricKey: 'core_pillars',
    label: 'Active Strategic Pillars',
    value: '3',
    unit: 'Programmes',
    isVerified: true,
    verificationNote: 'Education Support, Family Empowerment, Skills Acquisition',
    orderIndex: 1,
  },
  {
    id: 'stat-02',
    metricKey: 'essential_materials',
    label: 'Key School Essentials Covered',
    value: '6+',
    unit: 'Categories',
    isVerified: true,
    verificationNote: 'Notebooks, Bags, Shoes, Uniforms, Socks & Stationery',
    orderIndex: 2,
  },
  {
    id: 'stat-03',
    metricKey: 'pupils_reached',
    label: 'Documented Beneficiaries',
    value: 'Awaiting Entry',
    unit: '',
    isVerified: false,
    verificationNote: 'Official distribution records will be published after verification.',
    orderIndex: 3,
  },
  {
    id: 'stat-04',
    metricKey: 'volunteers_count',
    label: 'Volunteer Network',
    value: 'Open Registry',
    unit: '',
    isVerified: false,
    verificationNote: 'Volunteer registry active; field teams onboarding via portal.',
    orderIndex: 4,
  },
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-01',
    url: 'https://i.ibb.co/XfPxFrVP/IMG-20240113-WA0008.jpg',
    caption: 'AOS Foundation field distribution: Pupils receiving essential learning materials',
    category: 'Education Support',
    programmeId: 'prog-01',
    programmeTitle: 'Education Support Programme',
    photographerCredit: 'AOS Media Team',
    childPrivacyCleared: true,
    contextNote: 'Field distribution of backpacks, exercise books, and learning supplies.',
    published: true,
    createdAt: '2026-02-18T10:00:00Z',
  },
];

export const initialNewsPosts: NewsPost[] = [
  {
    id: 'news-01',
    slug: 'bridging-the-educational-divide',
    title: 'Why School Uniforms and Notebooks Matter as Much as Free Tuition',
    category: 'Education',
    excerpt:
      'Understanding the hidden non-tuition costs that keep thousands of willing children out of classrooms across developing communities.',
    content: `When a government declares basic primary education tuition-free, the public often assumes that financial barriers have disappeared. But for a low-income family struggling with daily sustenance, the cost of a required uniform, sturdy shoes, notebooks, and a bag can represent several weeks of total household income.

Children who attend school in torn everyday clothes or without shoes frequently experience emotional distress, social exclusion, and disciplinary sanctions from schools. 

AOS Foundation was founded on this direct reality: by providing the tangible physical materials of education with dignity, we unlock the real promise of free schooling. Our approach is direct, respectful, and grounded in community partnerships.`,
    author: 'AOS Foundation Editorial',
    coverImage: '',
    published: true,
    publishedAt: '2026-02-20T12:00:00Z',
  },
  {
    id: 'news-02',
    slug: 'skills-acquisition-pilot-launch',
    title: 'Connecting Skills Training With Local School Supply Chains',
    category: 'Programme Update',
    excerpt:
      'How our upcoming Skills Acquisition programme aims to train youth in tailoring to craft school bags and uniforms for local pupils.',
    content: `A truly sustainable nonprofit model creates reciprocal value within the community it serves. Through our vocational initiative, young adults will receive structured hands-on training in tailoring, garment construction, and bag manufacturing.

Rather than importing finished uniforms from distant commercial vendors, AOS Foundation seeks to procure locally sewn uniforms and bags produced by vocational trainees—fostering community income while directly clothing students in need.`,
    author: 'Programme Directorate',
    coverImage: '',
    published: true,
    publishedAt: '2026-03-05T08:00:00Z',
  },
];

export const initialDocuments: GovernanceDocument[] = [
  {
    id: 'doc-01',
    title: 'AOS Foundation Child Safeguarding & Responsible Imagery Policy',
    category: 'Safeguarding',
    fileUrl: '#safeguarding',
    fileSize: 'Framework',
    publishedDate: 'March 2026',
    summary:
      'Our mandatory principles governing child protection, informed guardian consent, dignified visual representation, and reporting protocols for all volunteers and field workers.',
    officialStatus: 'Framework Document',
  },
  {
    id: 'doc-02',
    title: 'AOS Foundation Transparency & Donor Accountability Charter',
    category: 'Governance & Policy',
    fileUrl: '#transparency',
    fileSize: 'Charter',
    publishedDate: 'March 2026',
    summary:
      'Our institutional commitment to verifiable tracking of material donations, zero tolerance for fabricated metrics, and transparent donor communications.',
    officialStatus: 'Framework Document',
  },
  {
    id: 'doc-03',
    title: 'AOS Foundation Annual Operations & Distribution Audit (Template)',
    category: 'Annual Report',
    fileUrl: '#reports',
    fileSize: 'Template',
    publishedDate: 'Scheduled 2026',
    summary:
      'The comprehensive audit reporting structure for tracking distribution rounds, material counts, beneficiary verification, and financial allocations.',
    officialStatus: 'Awaiting Foundation Ratification',
  },
];

export const initialYouTubeVideos: YouTubeVideoItem[] = [
  {
    id: 'vid-01',
    youtubeUrl: 'https://www.youtube.com/watch?v=kYJhnG667e8',
    title: 'AOS Foundation Field Outreaches: Providing School Bags & Notebooks With Dignity',
    description: 'Documentary footage from our primary school outreach, capturing the distribution of durable leather bags, exercise books, uniforms, and learning essentials.',
    category: 'Field Outreach',
    duration: '4:18',
    date: 'February 2026',
    location: 'Community Primary Schools, Nigeria',
    featured: true,
  },
  {
    id: 'vid-02',
    youtubeUrl: 'https://www.youtube.com/watch?v=J---aiyznGQ',
    title: 'Bridging the Dignity Gap: Why Basic Materials Keep Children in Classrooms',
    description: 'A deep-dive conversation with local headteachers on how poverty-induced material exclusion causes school dropouts and how community-driven interventions change lives.',
    category: 'Documentary',
    duration: '6:02',
    date: 'January 2026',
    location: 'Field Outreach Base, Nigeria',
    featured: true,
  },
  {
    id: 'vid-03',
    youtubeUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    title: 'Vocational Tailoring & Bag Crafting Initiative: Sustainable Local Production',
    description: 'A walkthrough of our vocational training pilot equipping older youth with tailoring and leathercraft skills to produce school kits locally.',
    category: 'Student Story',
    duration: '3:30',
    date: 'February 2026',
    location: 'Vocational Hub, Nigeria',
    featured: false,
  },
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: 'team-01',
    name: 'Executive Director & Founder',
    position: 'Founder & Executive Director',
    bio: 'Championing dignified basic education access, community partnership frameworks, and transparent philanthropic stewardship across Nigeria.',
    imageUrl: '',
    department: 'Executive Leadership',
    email: 'director@aosfoundation.org',
    phone: '08168779732',
    isMasterAdmin: false,
    accessPasscode: 'director2026',
    permissions: {
      canManageProgrammes: true,
      canManageGallery: true,
      canManageVideos: true,
      canManageNews: true,
      canManageImpact: true,
      canManageVolunteers: true,
      canManageEnquiries: true,
      canManageSiteContent: true,
      canManageTeam: false,
      canManageSettings: false,
    },
    displayOrder: 1,
    published: true,
    createdAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'team-02',
    name: 'Head of Field Operations & Logistics',
    position: 'Head of Field Operations & Logistics',
    bio: 'Oversees on-the-ground primary school assessments, material kit procurement (notebooks, bags, shoes, uniforms), and direct village distribution rounds.',
    imageUrl: '',
    department: 'Field Operations',
    email: 'operations@aosfoundation.org',
    phone: '08168779732',
    isMasterAdmin: false,
    accessPasscode: 'field2026',
    permissions: {
      canManageProgrammes: true,
      canManageGallery: false,
      canManageVideos: false,
      canManageNews: false,
      canManageImpact: true,
      canManageVolunteers: true,
      canManageEnquiries: true,
      canManageSiteContent: false,
      canManageTeam: false,
      canManageSettings: false,
    },
    displayOrder: 2,
    published: true,
    createdAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'team-03',
    name: 'Child Safeguarding & Community Lead',
    position: 'Child Safeguarding & Community Engagement Lead',
    bio: 'Enforces strict child privacy standards, parental consent guidelines, and caregiver dialogue circles to ensure every child learns with dignity.',
    imageUrl: '',
    department: 'Safeguarding & Community',
    email: 'safeguarding@aosfoundation.org',
    phone: '08168779732',
    isMasterAdmin: false,
    accessPasscode: 'safeguard2026',
    permissions: {
      canManageProgrammes: false,
      canManageGallery: true,
      canManageVideos: false,
      canManageNews: true,
      canManageImpact: false,
      canManageVolunteers: true,
      canManageEnquiries: false,
      canManageSiteContent: false,
      canManageTeam: false,
      canManageSettings: false,
    },
    displayOrder: 3,
    published: true,
    createdAt: '2026-01-20T00:00:00Z',
  },
  {
    id: 'team-04',
    name: 'Media Strategist & Communications Lead',
    position: 'Media Strategist & Communications Lead',
    bio: 'Directs authentic video dispatches, visual archive documentation, public reporting, and media strategy while upholding strict child safeguarding standards.',
    imageUrl: '',
    department: 'Media & Public Relations',
    email: 'media@aosfoundation.org',
    phone: '08168779732',
    isMasterAdmin: false,
    accessPasscode: 'media2026',
    permissions: {
      canManageProgrammes: false,
      canManageGallery: true,
      canManageVideos: true,
      canManageNews: true,
      canManageImpact: false,
      canManageVolunteers: false,
      canManageEnquiries: false,
      canManageSiteContent: false,
      canManageTeam: false,
      canManageSettings: false,
    },
    displayOrder: 4,
    published: true,
    createdAt: '2026-02-01T00:00:00Z',
  },
];


