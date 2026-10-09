import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Clean and normalize the Supabase Project URL
function getNormalizedUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  return rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
}

const DEFAULT_URL = 'https://twqfqdueqgwphatinvdy.supabase.co';
const DEFAULT_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3cWZxZHVlcWd3cGhhdGludmR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5NDY4MjAsImV4cCI6MjEwNjUyMjgyMH0.baxWqesVOIiik18f4MapkLzUfEFrYFJNwr6tT1UOYlU';

const envUrl = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_SUPABASE_URL || DEFAULT_URL;
const envKey = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_SUPABASE_ANON_KEY || DEFAULT_KEY;

export const supabaseUrl = getNormalizedUrl(envUrl);
export const supabaseAnonKey = envKey.trim();

// Create singleton Supabase Client instance
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Service to sync and query Supabase Postgres directly
 */
export const SupabaseService = {
  client: supabase,
  isConfigured(): boolean {
    return Boolean(supabaseUrl && supabaseAnonKey);
  },

  async testConnection(): Promise<{ ok: boolean; message: string }> {
    try {
      const { data, error } = await supabase.from('programmes').select('id').limit(1);
      if (error) {
        // Table might not exist yet if script hasn't been executed
        if (error.code === '42P01') {
          return {
            ok: false,
            message: 'Connected to Supabase, but tables have not been created yet. Please execute the SQL script in your Supabase SQL Editor.',
          };
        }
        return { ok: false, message: `Supabase Error: ${error.message}` };
      }
      return { ok: true, message: `Successfully connected to Supabase (${supabaseUrl})!` };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { ok: false, message: `Connection failed: ${msg}` };
    }
  },

  // Insert volunteer application directly to Supabase
  async insertVolunteer(vol: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    interestArea: string;
    availability: string;
    message: string;
  }) {
    return await supabase.from('volunteers').insert({
      full_name: vol.fullName,
      email: vol.email,
      phone: vol.phone,
      location: vol.location,
      interest_area: vol.interestArea,
      availability: vol.availability,
      message: vol.message,
      status: 'new',
    });
  },

  // Insert enquiry directly to Supabase
  async insertEnquiry(enq: {
    name: string;
    email: string;
    phone: string;
    organisation?: string;
    enquiryType: string;
    message: string;
  }) {
    return await supabase.from('enquiries').insert({
      name: enq.name,
      email: enq.email,
      phone: enq.phone,
      organisation: enq.organisation || '',
      enquiry_type: enq.enquiryType,
      message: enq.message,
      status: 'new',
    });
  },

  // Fetch all programmes from Supabase
  async fetchProgrammes() {
    return await supabase
      .from('programmes')
      .select('*')
      .order('created_at', { ascending: false });
  },

  // Fetch gallery items from Supabase
  async fetchGallery() {
    return await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
  },
};
