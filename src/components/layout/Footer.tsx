import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { MessageSquare, Phone, Mail, MapPin, ArrowUpRight, Shield } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { formatWhatsAppUrl } from '../../utils';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappLink = formatWhatsAppUrl(
    '08168779732',
    'Hello AOS Foundation, I would like to learn more about your work and how to support.'
  );

  return (
    <footer className="bg-[#111111] text-[#FCFAF7] border-t border-[#8F431E]/30 relative overflow-hidden">
      {/* Subtle top copper hairline */}
      <div className="h-1 bg-gradient-to-r from-[#B05A28] via-[#8F431E] to-[#B05A28]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-5">
            <BrandLogo variant="monochrome-white" size="lg" />
            <p className="text-sm text-[#FCFAF7]/75 leading-relaxed max-w-sm">
              AOS Foundation bridges the gap between parents, communities and available government educational opportunities by providing essential materials—notebooks, school bags, shoes, uniforms, and socks—enabling every child to learn with dignity.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-wider transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>WhatsApp: 08168779732</span>
              </a>
              <button
                onClick={() => handleNav('/safeguarding')}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium border border-white/10 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-[#B05A28]" />
                <span>Child Safeguarding</span>
              </button>
            </div>
          </div>

          {/* Col 3: Strategic Programmes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-4">
              Programmes
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FCFAF7]/70">
              <li>
                <button
                  onClick={() => handleNav('/programmes/education-support')}
                  className="hover:text-white transition-colors text-left"
                >
                  Education Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/programmes/empowerment')}
                  className="hover:text-white transition-colors text-left"
                >
                  Family Empowerment
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/programmes/skills-acquisition')}
                  className="hover:text-white transition-colors text-left"
                >
                  Skills Acquisition
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/gallery')}
                  className="hover:text-white transition-colors text-left"
                >
                  Field Photography
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/impact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Impact & Verification
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Engagement & Giving */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FCFAF7]/70">
              <li>
                <button
                  onClick={() => handleNav('/donate')}
                  className="hover:text-white transition-colors text-left font-medium text-white/90"
                >
                  Support Our Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Partner With Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/volunteer')}
                  className="hover:text-white transition-colors text-left"
                >
                  Volunteer Registry
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/news')}
                  className="hover:text-white transition-colors text-left"
                >
                  News & Dispatch
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/faq')}
                  className="hover:text-white transition-colors text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Governance & Direct Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B05A28] mb-4">
              Governance & Contact
            </h4>
            <ul className="space-y-3 text-sm text-[#FCFAF7]/70">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#B05A28] shrink-0 mt-0.5" />
                <a href="tel:08168779732" className="hover:text-white">
                  08168779732
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#B05A28] shrink-0 mt-0.5" />
                <a href="mailto:contact@aosfoundation.org" className="hover:text-white">
                  contact@aosfoundation.org
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B05A28] shrink-0 mt-0.5" />
                <span>Nigeria (National Operational Scope)</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => handleNav('/reports')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#B05A28] hover:text-white font-medium transition-colors"
                >
                  <span>Institutional Reports</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Staff Zone */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#FCFAF7]/50 gap-4">
          <p>© {new Date().getFullYear()} AOS Foundation. All rights reserved. Registered Non-Profit Initiative.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => handleNav('/safeguarding')} className="hover:text-white transition-colors">
              Safeguarding
            </button>
            <button onClick={() => handleNav('/privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('/terms')} className="hover:text-white transition-colors">
              Terms of Engagement
            </button>
            <button onClick={() => handleNav('/admin')} className="text-[#B05A28] hover:text-white transition-colors font-medium">
              Admin CMS
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
