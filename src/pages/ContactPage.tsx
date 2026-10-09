import React, { useState } from 'react';
import { DataStore } from '../services/store';
import { ContactEnquiry } from '../types';
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Send,
  Building,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { formatWhatsAppUrl } from '../utils';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const content = DataStore.getSiteContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    enquiryType: 'General Enquiry' as ContactEnquiry['enquiryType'],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    DataStore.submitEnquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      organisation: formData.organisation,
      enquiryType: formData.enquiryType,
      message: formData.message,
    });

    setSubmitted(true);
  };

  const whatsappDirect = formatWhatsAppUrl(
    '08168779732',
    `Hello AOS Foundation, I would like to inquire regarding ${formData.enquiryType}.`
  );

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-24">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Contact & Desk"
        prevSection={{ title: 'Volunteer Registry', path: '/volunteer' }}
        nextSection={{ title: 'News & Dispatches', path: '/news' }}
        breadcrumbs={[{ title: 'Contact Desk' }]}
        onNavigate={onNavigate}
      />
      {/* Header */}
      <section className="bg-white border-b border-[#E6DDD5] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-3">
            <span>Direct Channels</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Connect With AOS Foundation
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#525252] leading-relaxed max-w-2xl">
            Whether inquiring about school partnerships, kit sponsorships, volunteer opportunities, or governance, we are accessible and responsive.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Info & Fast WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E6DDD5] p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="text-lg font-bold text-[#111111]">Contact Channels</h3>

              <div className="space-y-4 text-xs text-[#262626]">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF3EE] text-[#B05A28] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-[#737373] text-[11px] uppercase">
                      Phone Call / Direct Line
                    </span>
                    <a href="tel:08168779732" className="text-sm font-bold text-[#111111] hover:text-[#B05A28]">
                      08168779732
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF3EE] text-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="font-semibold block text-[#737373] text-[11px] uppercase">
                      Official WhatsApp
                    </span>
                    <a
                      href={whatsappDirect}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#111111] hover:text-[#B05A28]"
                    >
                      08168779732 (Tap to Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF3EE] text-[#B05A28] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-[#737373] text-[11px] uppercase">
                      Email Inquiries
                    </span>
                    <a
                      href="mailto:contact@aosfoundation.org"
                      className="text-sm font-bold text-[#111111] hover:text-[#B05A28]"
                    >
                      contact@aosfoundation.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF3EE] text-[#B05A28] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block text-[#737373] text-[11px] uppercase">
                      Operational Headquarters
                    </span>
                    <p className="text-xs text-[#525252] mt-0.5">
                      Nigeria (Field outreaches conducted across selected public school communities)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6DDD5]">
                <a
                  href={whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>
            </div>

            {/* Fast Partner Note */}
            <div className="bg-[#FAF3EE] rounded-xl border border-[#E6DDD5] p-5 space-y-2 text-xs text-[#8F431E]">
              <div className="flex items-center gap-2 font-bold">
                <Building className="w-4 h-4 text-[#B05A28]" />
                <span>For Institutional & Corporate Inquiries</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                If your organisation requires formal proposals, safeguarding clearance documentation, or CSR distribution partnerships, please select "Partnership" in the inquiry form.
              </p>
            </div>
          </div>

          {/* Right Column: Contact & Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#E6DDD5] p-6 sm:p-10 shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111]">
                    Message Sent Successfully
                  </h3>
                  <p className="text-sm text-[#525252] leading-relaxed">
                    Thank you for contacting AOS Foundation. Your enquiry has been routed to our administrative team. We will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        organisation: '',
                        enquiryType: 'General Enquiry',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-md bg-[#B05A28] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-[#E6DDD5] pb-4">
                    <h3 className="text-lg font-bold text-[#111111]">
                      Send an Official Enquiry
                    </h3>
                    <p className="text-xs text-[#525252] mt-0.5">
                      Direct inquiry form. All submissions are stored securely and addressed by foundation leadership.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="First and last name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        Phone Number / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="080..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        Organisation (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Company, NGO, or institution"
                        value={formData.organisation}
                        onChange={(e) =>
                          setFormData({ ...formData, organisation: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Enquiry Category *
                    </label>
                    <select
                      value={formData.enquiryType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          enquiryType: e.target.value as ContactEnquiry['enquiryType'],
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] bg-white focus:outline-hidden focus:border-[#B05A28]"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Donation">Material or Financial Donation</option>
                      <option value="Sponsorship">Programme / Student Kit Sponsorship</option>
                      <option value="Partnership">Corporate / Institutional Partnership</option>
                      <option value="Volunteering">Volunteering & Community Action</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please describe your inquiry, proposed partnership, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E6DDD5] text-xs text-[#111111] focus:outline-hidden focus:border-[#B05A28]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to AOS Team</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Cross-Section Pathway Navigation */}
      <InlineSectionBar
        currentTitle="Contact & Desk"
        prevSection={{ title: 'Volunteer Registry', path: '/volunteer' }}
        nextSection={{ title: 'News & Dispatches', path: '/news' }}
        onNavigate={onNavigate}
        isBottom
      />
    </div>
  );
};
