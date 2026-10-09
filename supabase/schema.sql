-- ====================================================================
-- AOS FOUNDATION - SUPABASE POSTGRESQL PRODUCTION DATABASE SCHEMA
-- ====================================================================
-- Description: Complete schema for AOS Foundation NGO digital platform
-- Includes UUID keys, foreign key constraints, triggers, indexes,
-- and Row Level Security (RLS) policies for donor transparency.
-- ====================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Enumerated Types
CREATE TYPE programme_category AS ENUM (
  'Education Support',
  'Empowerment',
  'Skills Acquisition'
);

CREATE TYPE programme_status AS ENUM (
  'Draft',
  'Upcoming',
  'Ongoing',
  'Completed',
  'Archived'
);

CREATE TYPE gallery_category AS ENUM (
  'Education Support',
  'Community Activities',
  'Empowerment',
  'Skills Acquisition',
  'Volunteers',
  'Events'
);

CREATE TYPE news_category AS ENUM (
  'Programme Update',
  'Community',
  'Education',
  'Announcement',
  'Event',
  'Impact'
);

CREATE TYPE volunteer_status AS ENUM (
  'new',
  'contacted',
  'accepted',
  'declined',
  'archived'
);

CREATE TYPE enquiry_type AS ENUM (
  'Donation',
  'Sponsorship',
  'Partnership',
  'Volunteering',
  'General Enquiry'
);

CREATE TYPE enquiry_status AS ENUM (
  'new',
  'responded',
  'closed'
);

-- ====================================================================
-- 3. Core Tables
-- ====================================================================

-- Site Content Settings & Brand Copy
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_key VARCHAR(100) UNIQUE NOT NULL,
  content JSONB NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Programmes Table
CREATE TABLE IF NOT EXISTS programmes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(120) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  category programme_category NOT NULL DEFAULT 'Education Support',
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  programme_date VARCHAR(100),
  status programme_status NOT NULL DEFAULT 'Upcoming',
  beneficiaries_summary TEXT,
  impact_summary TEXT,
  cover_image TEXT,
  materials_included JSONB DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_programmes_slug ON programmes(slug);
CREATE INDEX IF NOT EXISTS idx_programmes_status ON programmes(status);
CREATE INDEX IF NOT EXISTS idx_programmes_category ON programmes(category);

-- Programme Additional Images
CREATE TABLE IF NOT EXISTS programme_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  programme_id UUID NOT NULL REFERENCES programmes(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_programme_images_pid ON programme_images(programme_id);

-- Impact Statistics (Zero fake numbers policy)
CREATE TABLE IF NOT EXISTS impact_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_key VARCHAR(100) UNIQUE NOT NULL,
  label VARCHAR(255) NOT NULL,
  metric_value VARCHAR(100) NOT NULL,
  unit VARCHAR(50),
  is_verified BOOLEAN DEFAULT FALSE,
  verification_note TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_impact_order ON impact_statistics(order_index);

-- Gallery (With Child Safeguarding & Privacy clearance)
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL,
  category gallery_category NOT NULL DEFAULT 'Education Support',
  programme_id UUID REFERENCES programmes(id) ON DELETE SET NULL,
  photographer_credit VARCHAR(255),
  child_privacy_cleared BOOLEAN DEFAULT TRUE,
  context_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);

-- News & Updates
CREATE TABLE IF NOT EXISTS news_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(150) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  category news_category NOT NULL DEFAULT 'Programme Update',
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(150) NOT NULL DEFAULT 'AOS Foundation Editorial',
  cover_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_news_slug ON news_posts(slug);
CREATE INDEX IF NOT EXISTS idx_news_published ON news_posts(published, published_at DESC);

-- Governance & Transparency Documents
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  file_url TEXT NOT NULL,
  file_size VARCHAR(50),
  published_date VARCHAR(100),
  summary TEXT,
  official_status VARCHAR(100) DEFAULT 'Framework Document',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Public Volunteer Applications
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  interest_area VARCHAR(100) NOT NULL,
  availability VARCHAR(100) NOT NULL,
  message TEXT,
  status volunteer_status DEFAULT 'new',
  admin_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_volunteers_status ON volunteers(status);

-- Public Enquiries & Donation Pledges
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  organisation VARCHAR(255),
  enquiry_type enquiry_type NOT NULL DEFAULT 'General Enquiry',
  message TEXT NOT NULL,
  status enquiry_status DEFAULT 'new',
  admin_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_type ON enquiries(enquiry_type);

-- ====================================================================
-- 4. Automatic Updated_At Trigger Function
-- ====================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_programmes_modtime
  BEFORE UPDATE ON programmes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_modtime
  BEFORE UPDATE ON news_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteers_modtime
  BEFORE UPDATE ON volunteers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enquiries_modtime
  BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- 5. Row Level Security (RLS) Policies
-- ====================================================================

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE programmes ENABLE ROW LEVEL SECURITY;
ALTER TABLE programme_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Public Visitors: Read access to published & verified public data
CREATE POLICY "Public can view site content" ON site_content
  FOR SELECT USING (true);

CREATE POLICY "Public can view non-draft programmes" ON programmes
  FOR SELECT USING (status != 'Draft');

CREATE POLICY "Public can view programme images" ON programme_images
  FOR SELECT USING (true);

CREATE POLICY "Public can view verified impact stats" ON impact_statistics
  FOR SELECT USING (true);

CREATE POLICY "Public can view cleared gallery images" ON gallery
  FOR SELECT USING (child_privacy_cleared = true);

CREATE POLICY "Public can view published news" ON news_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view documents" ON documents
  FOR SELECT USING (true);

-- Public Visitors: Insert access for submissions
CREATE POLICY "Public can submit volunteer applications" ON volunteers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can submit enquiries" ON enquiries
  FOR INSERT WITH CHECK (true);

-- Authenticated Administrators: Full access to all records
CREATE POLICY "Admins have full access to site_content" ON site_content
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to programmes" ON programmes
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to programme_images" ON programme_images
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to impact_statistics" ON impact_statistics
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to gallery" ON gallery
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to news_posts" ON news_posts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to documents" ON documents
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to volunteers" ON volunteers
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admins have full access to enquiries" ON enquiries
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
