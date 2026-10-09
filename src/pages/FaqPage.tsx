import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { formatWhatsAppUrl } from '../utils';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the primary mission of AOS Foundation?',
      a: 'AOS Foundation seeks to bridge the gap between parents, communities and available government educational opportunities by providing essential physical learning materials such as notebooks, school bags, shoes, school uniforms, and socks. We believe no child should miss education simply because they lack basic materials.',
    },
    {
      q: 'Why does AOS Foundation focus on non-tuition materials?',
      a: 'Even in areas where government declares basic primary education tuition-free, thousands of children still remain out of school or face severe embarrassment in classrooms because families cannot afford compulsory uniforms, shoes, or notebooks. By providing these tangible materials, we make free education truly accessible.',
    },
    {
      q: 'Can I donate physical materials instead of money?',
      a: 'Yes, absolutely. We welcome bulk contributions of brand new exercise notebooks, school bags, durable black school shoes, tailored uniforms, and socks. Visit our "Donate / Support" page to submit a material donation enquiry or coordinate directly via WhatsApp.',
    },
    {
      q: 'How does AOS Foundation identify children in genuine need?',
      a: 'We collaborate directly with public primary school headteachers, community education committees, and local village leaders who possess verified knowledge of families experiencing severe material hardship.',
    },
    {
      q: 'How do you protect children’s privacy during outreaches?',
      a: 'AOS Foundation adheres to a strict Child Safeguarding Policy. We obtain informed guardian consent before taking photographs, avoid publishing sensitive personal data (home addresses, contact numbers, or case histories), and strictly portray children with dignity, rejecting poverty-pornographic imagery.',
    },
    {
      q: 'How are financial donations verified and tracked?',
      a: 'To safeguard contributions, official account coordination is handled directly with verified donors. We provide documented distribution reconciliations and follow-up reports showing where materials were deployed.',
    },
    {
      q: 'How can corporate organisations or NGOs partner with AOS Foundation?',
      a: 'We offer structured partnership frameworks for corporate CSR teams, alumni associations, and grantmakers. You can sponsor an entire school class, adopt a community, or fund vocational youth uniform-tailoring tracks.',
    },
    {
      q: 'Can I volunteer with the foundation?',
      a: 'Yes. We welcome volunteers across field distribution logistics, material sorting, photography (safeguarding approved), and youth skills mentoring. Complete the volunteer application form on our Volunteer page.',
    },
  ];

  const whatsappFaq = formatWhatsAppUrl(
    '08168779732',
    'Hello AOS Foundation, I have a question that is not covered in your FAQ.'
  );

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-24">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Frequently Asked Questions"
        prevSection={{ title: 'Child Safeguarding', path: '/safeguarding' }}
        nextSection={{ title: 'Contact & Inquiries', path: '/contact' }}
        breadcrumbs={[{ title: 'Frequently Asked Questions' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <section className="bg-white border-b border-[#E6DDD5] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B05A28]">
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Understanding Our Operations
          </h1>
          <p className="text-base sm:text-lg text-[#525252] max-w-2xl mx-auto leading-relaxed">
            Clear, honest answers regarding our mission, distribution criteria, donor verification, and volunteer engagement.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-4">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.q}
              className="bg-white rounded-xl border border-[#E6DDD5] overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FCFAF7] transition-colors"
              >
                <span className="text-sm font-bold text-[#111111]">{item.q}</span>
                <span className="p-1 rounded-md text-[#8F431E]">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-[#404040] leading-relaxed border-t border-[#E6DDD5]/60 bg-[#FCFAF7]/50">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Contact Prompt */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center">
        <div className="p-6 rounded-xl bg-white border border-[#E6DDD5] space-y-3">
          <h3 className="text-base font-bold text-[#111111]">
            Have a question not listed here?
          </h3>
          <p className="text-xs text-[#525252]">
            Our coordination team is happy to discuss any inquiries regarding our work.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-5 py-2.5 rounded-md bg-[#B05A28] text-white text-xs font-bold uppercase tracking-wider"
            >
              Contact Team
            </button>
            <a
              href={whatsappFaq}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-md bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Bottom Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle="Frequently Asked Questions"
        prevSection={{ title: 'Child Safeguarding', path: '/safeguarding' }}
        nextSection={{ title: 'Contact & Inquiries', path: '/contact' }}
        onNavigate={onNavigate}
        isBottom
      />
    </div>
  );
};
