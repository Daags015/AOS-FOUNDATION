import React, { useState } from 'react';
import { X, HeartHandshake, Users, Briefcase, HelpCircle, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { formatWhatsAppUrl } from '../../utils';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '08168779732';

  const presets = [
    {
      label: 'Support & Donate Materials',
      icon: HeartHandshake,
      message: 'Hello AOS Foundation, I would like to support your work providing educational materials to children.',
    },
    {
      label: 'Discuss Partnership / CSR',
      icon: Briefcase,
      message: 'Hello AOS Foundation, I would like to discuss a corporate or institutional partnership.',
    },
    {
      label: 'Volunteer Application',
      icon: Users,
      message: 'Hello AOS Foundation, I would like to volunteer my time and skills for your programmes.',
    },
    {
      label: 'General Enquiry',
      icon: HelpCircle,
      message: 'Hello AOS Foundation, I have an enquiry regarding your educational initiatives.',
    },
  ];

  const handleOpenPreset = (msg: string) => {
    const url = formatWhatsAppUrl(phoneNumber, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end select-none">
      {/* Contextual Intent Popup Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-92 bg-white rounded-2xl shadow-2xl border border-[#E6DDD5] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1EBE5D] via-[#25D366] to-[#128C7E] text-white p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-inner">
                <WhatsAppIcon className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm tracking-tight">AOS Foundation</h4>
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>
                <p className="text-[11px] text-white/90 font-mono">08168779732 · Direct Desk</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close WhatsApp options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Context Prompts */}
          <div className="p-3.5 bg-[#FCFAF7] space-y-2">
            <p className="text-[11px] text-[#525252] px-1 font-semibold uppercase tracking-wider">
              Select inquiry topic:
            </p>
            {presets.map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.label}
                  onClick={() => handleOpenPreset(preset.message)}
                  className="w-full flex items-center justify-between p-3 text-left text-xs font-semibold text-[#111111] bg-white hover:bg-[#FAF3EE] border border-[#E6DDD5] hover:border-[#B05A28]/40 rounded-xl transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-7 h-7 rounded-lg bg-[#FAF3EE] group-hover:bg-[#B05A28] text-[#B05A28] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="truncate">{preset.label}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8F431E] opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              );
            })}
          </div>

          {/* Direct Start Footer */}
          <div className="p-3.5 bg-white border-t border-[#E6DDD5]">
            <button
              onClick={() =>
                handleOpenPreset('Hello AOS Foundation, I would like to get in touch with your team.')
              }
              className="w-full py-2.5 px-4 text-center text-xs font-bold text-white bg-[#111111] hover:bg-[#262626] rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400 fill-current" />
              <span>Open Direct Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Premium Circular WhatsApp Icon Floating Button */}
      <div className="relative group">
        {/* Subtle pulsing glow ring when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 blur-xs animate-ping pointer-events-none" />
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(37,211,102,0.45)] hover:shadow-[0_15px_30px_-5px_rgba(37,211,102,0.6)] hover:scale-108 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-3 focus-visible:outline-[#25D366]"
          aria-label="Chat with AOS Foundation on WhatsApp"
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9 text-white fill-current drop-shadow-xs" />
          )}

          {/* Online green indicator badge */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-white border-2 border-white flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </span>
        </button>

        {/* Hover Tooltip (Desktop) */}
        {!isOpen && (
          <div className="hidden lg:block absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-lg bg-[#111111] text-white text-[11px] font-semibold whitespace-nowrap shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
            Chat on WhatsApp
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[#111111]" />
          </div>
        )}
      </div>
    </div>
  );
};
