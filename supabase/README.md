# AOS Foundation - Supabase Production Setup Guide

This directory contains the production database architecture and deployment scripts for AOS Foundation.

## Architecture Highlights
- **PostgreSQL 15+ with UUIDs**: Scalable relational structure for programmes, media, news, impact metrics, volunteer applications, and inquiries.
- **Row Level Security (RLS)**: Public read-only access for published content, isolated write policies for inquiries/volunteers, and full administrative isolation for authenticated managers.
- **Child Privacy Clearance**: Schema-level flags (`child_privacy_cleared`, `context_note`) ensuring child safeguarding compliance before photos appear publicly.

## Step 1: Execute SQL Schema
1. Open your Supabase Dashboard: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project and navigate to the **SQL Editor**.
3. Copy the contents of `supabase/schema.sql` and run the script.

## Step 2: Storage Buckets
Create the following storage buckets in the Supabase Dashboard under **Storage**:
1. `programme-media` (Public bucket)
2. `gallery-vault` (Public bucket with privacy review)
3. `governance-documents` (Public bucket for PDF reports)

Set bucket policies to allow public read access, while restricting upload/delete permissions to authenticated users.

## Step 3: Environment Variables
Add the following keys to your `.env` or deployment settings (Vercel / Netlify):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

When these environment variables are provided, the application automatically synchronizes with your live Supabase cloud database. When running without credentials, the platform seamlessly defaults to its persistent high-performance reactive storage engine, ensuring uninterrupted testing and demonstration.
