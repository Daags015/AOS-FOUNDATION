import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, ShieldCheck } from 'lucide-react';
import { DataStore } from '../../services/store';
import { TeamMember } from '../../types';

interface TeamSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  limit?: number;
  id?: string;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  title = 'Meet Our Dedicated Team',
  subtitle = 'Dedicated individuals working alongside teachers, communities, and guardians to provide essential learning materials and uphold educational dignity.',
  className = '',
  limit,
  id = 'team',
}) => {
  const [members, setMembers] = useState<TeamMember[]>(() => {
    const allMembers = DataStore.getTeamMembers(true);
    return limit ? allMembers.slice(0, limit) : allMembers;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const allMembers = DataStore.getTeamMembers(true);
      setMembers(limit ? allMembers.slice(0, limit) : allMembers);
    };
    window.addEventListener('aos_store_updated', handleUpdate);
    return () => window.removeEventListener('aos_store_updated', handleUpdate);
  }, [limit]);

  if (members.length === 0) return null;

  return (
    <section id={id} className={`py-16 sm:py-24 bg-white border-b border-[#E6DDD5] relative overflow-hidden ${className}`}>
      {/* Background ambient accents */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#B05A28]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3EE] border border-[#E6DDD5] text-xs font-semibold text-[#8F431E]">
            <Users className="w-3.5 h-3.5 text-[#B05A28]" />
            <span>Leadership & Field Stewards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {members.map((member) => {
            const initials = member.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <div
                key={member.id}
                className="bg-[#FCFAF7] rounded-2xl border border-[#E6DDD5] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#B05A28]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Image Placard */}
                <div className="relative h-64 w-full bg-[#F3EAE2] overflow-hidden flex items-center justify-center">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    /* Elegant placeholder placard */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F8F5F1] to-[#EFE8E0]">
                      <div className="w-20 h-20 rounded-full bg-white border-2 border-[#B05A28]/30 shadow-md flex items-center justify-center text-[#B05A28] font-extrabold text-2xl tracking-wider">
                        {initials}
                      </div>
                      <span className="text-[11px] font-semibold text-[#8F431E] uppercase tracking-wider mt-3">
                        AOS Team Steward
                      </span>
                    </div>
                  )}

                  {/* Department pill badge */}
                  {member.department && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide">
                        {member.department}
                      </span>
                    </div>
                  )}

                  {/* Verified Pillar Check */}
                  <div className="absolute top-3 right-3">
                    <span className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs text-emerald-600">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Team Info Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Position / Post Badge */}
                    <div className="inline-block px-2.5 py-1 rounded-md bg-[#FAF3EE] border border-[#E6DDD5] text-[11px] font-bold text-[#8F431E] leading-tight">
                      {member.position}
                    </div>

                    {/* Member Full Name */}
                    <h3 className="font-extrabold text-base sm:text-lg text-[#111111] group-hover:text-[#B05A28] transition-colors leading-snug">
                      {member.name}
                    </h3>

                    {/* Bio Summary */}
                    <p className="text-xs text-[#525252] leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>

                  {/* Contact Pathways */}
                  {(member.email || member.phone) && (
                    <div className="pt-3 border-t border-[#E6DDD5] flex items-center gap-3 text-xs text-[#737373]">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="hover:text-[#B05A28] transition-colors flex items-center gap-1 text-[11px]"
                          title={member.email}
                        >
                          <Mail className="w-3 h-3 text-[#B05A28]" />
                          <span className="truncate max-w-[130px]">{member.email}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
