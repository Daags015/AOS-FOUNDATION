# AOS Foundation Official Website & Content Management Platform

Comprehensive, production-ready digital platform for AOS Foundation—bridging the educational gap for vulnerable children by providing essential learning materials (notebooks, bags, shoes, uniforms, socks) with dignity, transparency, and donor accountability.

### User Review & Critical Decisions

> [!IMPORTANT]
> The platform is architected around honest, dignity-centered NGO principles: zero fabricated statistics or artificial testimonials, strict adherence to the official copper brand identity (`#B05A28` / `#8F431E`), robust child safeguarding, and a complete CMS allowing non-technical foundation staff to update programmes, media, reports, and stories for years to come.

- **Confirmed Brand & Color Hierarchy**: Burnt copper (`#B05A28`) and deep copper (`#8F431E`) strictly used as high-intent accents (5–15%), with 60–70% warm white/limestone paper space (`#FCFAF7` / `#FFFFFF`) and 20–25% deep charcoal typography (`#111111`).
- **Data Persistence & Supabase Compatibility**: Hybrid local database persistence with instant zero-configuration runtime out of the box, paired with full Supabase PostgreSQL and Supabase Storage schema readiness and environment toggle.
- **Dignity & Verified Impact**: Unverified metrics display honest editorial placeholders with instant admin CMS editing pathways, avoiding any artificial claims or poverty-porn tropes.
- **Direct Engagement & WhatsApp Integration**: Internationalized WhatsApp routing (`2348168779732`) with contextual intent prompts for donations, material sponsorships, partnerships, and volunteering.

---

### 1. Overview & Core Concept

- **What It Does**: Serves as AOS Foundation's 24/7 digital headquarters. Visitors discover the foundation's core mission (supplying essential educational materials so government free education is truly accessible), explore dynamic programme areas (Education Support, Empowerment, Skills Acquisition), inspect verified evidence and photographic archives, submit inquiries, apply as volunteers, coordinate material or financial sponsorships, and access institutional governance reports.
- **Target Audience & Personas**:
  - *Local & Diaspora Donors*: Seeking verifiable proof of work and direct ways to sponsor children or programmes without middleman friction.
  - *Corporate & Institutional Partners*: Evaluating governance, safeguarding compliance, accountability, and partnership models.
  - *Community Volunteers*: Looking to offer time, logistics, teaching, or field distribution skills.
  - *Parents, Communities & Schools*: Connecting with foundation initiatives and outreach dates.
  - *Foundation Leadership & CMS Admins*: Requiring a frictionless mobile-and-desktop CMS to post updates, upload field photography, manage inquiries, review volunteer applications, and update statistics.
- **Key Value**: Delivers undeniable credibility, operational transparency, and seamless donor/partner conversion without relying on generic charity templates or inflated statistics.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  - *Donor / Sponsor Pathway*: Land on Hero -> Understand the practical barrier (lack of basic learning materials) -> Review active/completed programmes with genuine photographic proof -> Tap "Support Our Work" or "Sponsor Materials" -> Complete structured pledge/enquiry form or initiate direct WhatsApp discussion with prefilled context.
  - *Programme Exploration*: Browse categorized initiatives (`/programmes`) -> Filter by status (Upcoming, Ongoing, Completed) -> Open detailed slug view (`/programmes/[slug]`) -> View beneficiary reach, location, gallery, and impact highlights.
  - *Volunteer Application*: Navigate to `/volunteer` -> Complete structured application (interests, skills, location, availability) -> Immediate confirmation -> Application routed to Admin Volunteer Pipeline for status progression (New -> Contacted -> Accepted -> Declined).
  - *Administrative Management*: Secure login (`/admin`) -> Unified KPI overview -> Manage Programmes, Media Gallery with captioning and child privacy tagging, Impact Metrics, News/Announcements, Public Enquiries, Volunteer Registry, Downloadable Reports, and Site Content.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Institutional editorial dignity, grounded warmth, and architectural clarity (drawing from Museum & Non-Profit Broadsheet references).
  - *Color Palette*:
    - Canvas: Warm White (`#FCFAF7`) & Crisp Alabaster (`#FFFFFF`)
    - Surface & Cards: Soft Sand (`#F3EAE2` / `#F8F5F1`), 1px subtle hairline borders (`#E6DDD5`)
    - Typography: Deep Black / Charcoal Ink (`#111111`, `#262626`, `#525252`)
    - Primary Accent: Burnt Copper (`#B05A28`) for primary CTAs, active highlights, key metrics
    - Secondary Accent: Deep Earthy Copper (`#8F431E`) for hover states and emphasis
  - *Typography & Hierarchy*:
    - Headings: Plus Jakarta Sans / Manrope (confident, human, modern geometric authority)
    - Body: Inter (pristine legibility across all screen densities, generous 1.7 line height)
    - Metadata & Tags: Tabular numerals with clean unboxed text dividers (`·` and `/`)
  - *Child Privacy & Dignity Standard*: Responsible image management in compliance with child safeguarding principles—captions document educational context rather than exposing sensitive personal identifiers.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Full Client-Side SPA Routing with Direct URL & Dynamic Parameter Support**
  - *Chosen Approach*: Comprehensive client-side routing router supporting all requested public routes (`/`, `/about`, `/programmes`, `/programmes/:slug`, `/impact`, `/gallery`, `/get-involved`, `/donate`, `/volunteer`, `/contact`, `/news`, `/news/:slug`, `/reports`, `/faq`, `/privacy`, `/terms`, `/safeguarding`, `/admin/*`) with browser history API, bookmarking, and custom 404 recovery.
  - *Why*: Ensures zero broken routes, instant transitions, mobile resilience on slower Nigerian cellular data networks, and seamless deployment across Vercel, Netlify, and Cloud Run preview environments without server-side rewrite mismatches.
- **Decision 2: Dual-Engine Data Layer (Embedded Reactive Store + Supabase Schema)**
  - *Chosen Approach*: Build a robust reactive data architecture initialized with persistent browser storage (IndexedDB/localStorage) pre-seeded with authentic AOS Foundation baseline content, while supplying production-ready Supabase PostgreSQL schemas, DDL scripts, RLS policies, and environment config variables.
  - *Why*: Allows instant preview verification, testing of all admin CMS operations, form submissions, and photo additions, while providing a turnkey migration pathway to live Supabase cloud instances.
- **Decision 3: Non-Invasive Responsible Image Management**
  - *Chosen Approach*: Support direct photo uploads (via local object URLs / Data URLs in local mode and Supabase Storage bucket integration in cloud mode) with built-in child privacy toggles (caption, location, programme link, context notes, consent confirmation flag).
  - *Why*: Prevents privacy breaches while letting administrators upload real field photos directly from mobile phones and laptops without external image host dependencies.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          AOS FOUNDATION CLIENT                         │
│                                                                        │
│   ┌───────────────────────┐              ┌─────────────────────────┐   │
│   │     Public Layout     │              │    Admin CMS Portal     │   │
│   │ ───────────────────── │              │ ─────────────────────── │   │
│   │ • 3-Zone Top Bar      │              │ • Secure Auth Barrier   │   │
│   │ • Editorial Hero      │              │ • Programme Manager     │   │
│   │ • Dynamic Programmes  │              │ • Gallery & Media Vault │   │
│   │ • Impact & Proof      │              │ • News & Announcements  │   │
│   │ • Volunteer & Contact │              │ • Volunteer Pipeline    │   │
│   │ • Reports & Policies  │              │ • Inquiries & Leads     │   │
│   │ • Floating WhatsApp   │              │ • Live Content Editor   │   │
│   └───────────┬───────────┘              └────────────┬────────────┘   │
│               │                                       │                │
│               ▼                                       ▼                │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                     Router & State Coordinator                 │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
└───────────────────────────────────┼────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           UNIFIED DATA LAYER                           │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │               Repository & Persistent Cache Engine             │   │
│   │   (Reactive State · Indexed Storage · Optimistic Mutations)    │   │
│   └───────────────┬────────────────────────────────┬───────────────┘   │
│                   │                                │                   │
│         (Cloud Supabase Mode)            (Autonomous Standalone Mode)  │
│                   ▼                                ▼                   │
│   ┌────────────────────────────────┐   ┌───────────────────────────┐   │
│   │    Supabase Postgres & RLS     │   │   Browser Storage Vault   │   │
│   │  • programmes                  │   │  • Instant preview        │   │
│   │  • gallery & programme_images  │   │  • Multi-session cache    │   │
│   │  • impact_statistics           │   │  • Exportable JSON backup │   │
│   │  • volunteers & enquiries      │   │  • Zero-latency mobile    │   │
│   │  • news_posts & documents      │   │  • Offline resilience     │   │
│   └────────────────────────────────┘   └───────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

#### Core Data Entities:
1. **Programmes**: `id`, `slug`, `title`, `category` (Education Support, Empowerment, Skills Acquisition), `short_description`, `full_description`, `location`, `date`, `status` (Draft, Upcoming, Ongoing, Completed, Archived), `beneficiaries_summary`, `impact_summary`, `cover_image`, `images[]`, `featured` (boolean), `created_at`, `updated_at`.
2. **Impact Statistics**: `id`, `metric_key`, `label`, `value` (numeric string or placeholder), `unit`, `is_verified` (boolean), `verification_note`, `order_index`.
3. **Gallery Items**: `id`, `url`, `caption`, `category`, `programme_id`, `photographer_credit`, `child_privacy_cleared`, `created_at`.
4. **News Posts**: `id`, `slug`, `title`, `category`, `excerpt`, `content`, `author`, `cover_image`, `published` (boolean), `published_at`.
5. **Volunteers**: `id`, `full_name`, `email`, `phone`, `location`, `interest_area`, `availability`, `message`, `status` (new, contacted, accepted, declined, archived), `submitted_at`.
6. **Enquiries**: `id`, `name`, `email`, `phone`, `organisation`, `enquiry_type` (Donation, Sponsorship, Partnership, Volunteering, General), `message`, `status` (new, responded, closed), `submitted_at`.
7. **Governance Documents**: `id`, `title`, `category` (Annual Report, Financial, Policy, Safeguarding), `file_url`, `file_size`, `published_date`, `summary`.
8. **Site Content Settings**: Hero copy, about text, mission/vision/values, contact info (phone `08168779732`, emails, locations), social links, WhatsApp message presets.
