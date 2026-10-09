import React, { useState } from 'react';
import { DataStore } from '../services/store';
import { VolunteerApplication } from '../types';
import { Users, CheckCircle2, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface VolunteerPageProps {
  onNavigate: (path: string) => void;
}

export const VolunteerPage: React.FC<VolunteerPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    interestArea: 'Education Support' as VolunteerApplication['interestArea'],
    availability: 'Weekends' as VolunteerApplication['availability'],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;

    DataStore.submitVolunteer({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      interestArea: formData.interestArea,
      availability: formData.availability,
      message: formData.message,
    });

    setSubmitted(true);
  };

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-24">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Volunteer Registry"
        prevSection={{ title: 'Support Our Work', path: '/donate' }}
        nextSection={{ title: 'Contact Desk', path: '/contact' }}
        breadcrumbs={[{ title: 'Volunteer Registry' }]}
        onNavigate={onNavigate}
      />
      {/* Header */}
      <section className="bg-white border-b border-[#E6DDD5] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B05A28]">
            <span>Field Team & Skills Network</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Join the AOS Volunteer Community
          </h1>
          <p className="text-base sm:text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed">
            Lend your hands, energy, and professional skills to organize material kits, coordinate school distributions, and mentor youth.
          </p>
        </div>
      </section>

      {/* Volunteer Form Area */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white rounded-2xl border border-[#E6DDD5] p-6 sm:p-10 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#111111]">
                Application Received!
              </h3>
              <p className="text-sm text-[#525252] leading-relaxed">
                Thank you for offering your time. Your application has been logged in our volunteer registry. Our team reviews submissions and coordinates orientation sessions prior to outreach schedules.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => onNavigate('/')}
                  className="px-5 py-2.5 rounded-md bg-[#B05A28] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#E6DDD5] pb-4">
                <h3 className="text-lg font-bold text-[#111111]">
                  Volunteer Registration Form
                </h3>
                <p className="text-xs text-[#525252] mt-1">
                  All volunteers complete background screening and adhere strictly to child safeguarding guidelines.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="First and last name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Phone Number / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="081..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Current City / State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lagos, Ibadan, Abuja"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Primary Area of Interest
                  </label>
                  <select
                    value={formData.interestArea}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        interestArea: e.target.value as VolunteerApplication['interestArea'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] bg-white focus:outline-hidden focus:border-[#B05A28]"
                  >
                    <option value="Education Support">Education Support (Material Prep & School Visits)</option>
                    <option value="Field Distribution">Field Distribution Logistics</option>
                    <option value="Skills Mentorship">Skills Mentorship & Vocational Support</option>
                    <option value="Logistics & Coordination">Logistics & Supply Sourcing</option>
                    <option value="Media & Photography">Media & Photography (Safeguarding Cleared)</option>
                    <option value="Administrative Support">Administrative & Correspondence Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Availability
                  </label>
                  <select
                    value={formData.availability}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availability: e.target.value as VolunteerApplication['availability'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] bg-white focus:outline-hidden focus:border-[#B05A28]"
                  >
                    <option value="Weekends">Weekends only</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Project-based">Project-based / Specific Events</option>
                    <option value="Flexible">Flexible schedule</option>
                    <option value="Full-time">Full-time seasonal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1">
                  Why do you wish to volunteer with AOS Foundation?
                </label>
                <textarea
                  rows={4}
                  placeholder="Share a few words about your background, motivation, or past experience..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                />
              </div>

              <div className="p-3 bg-[#FAF3EE] rounded-lg flex items-start gap-2.5 text-[11px] text-[#8F431E]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#B05A28] mt-0.5" />
                <span>
                  By registering, you agree to uphold AOS Foundation’s Child Safeguarding Code of Conduct during all interactions with minors.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Submit Volunteer Registration
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Bottom Cross-Section Pathway Navigation */}
      <InlineSectionBar
        currentTitle="Volunteer Registry"
        prevSection={{ title: 'Support Our Work', path: '/donate' }}
        nextSection={{ title: 'Contact Desk', path: '/contact' }}
        onNavigate={onNavigate}
        isBottom
      />
    </div>
  );
};
