import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, HeartHandshake, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { DataStore } from '../services/store';
import { TeamMember } from '../types';

interface TeamPageProps {
  onNavigate: (path: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigate }) => {
  const [members, setMembers] = useState<TeamMember[]>(() => DataStore.getTeamMembers(true));
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const handleUpdate = () => {
      setMembers(DataStore.getTeamMembers(true));
    };
    window.addEventListener('aos_store_updated', handleUpdate);
    return () => window.removeEventListener('aos_store_updated', handleUpdate);
  }, []);

  const departments = ['all', ...Array.from(new Set(members.map((m) => m.department).filter(Boolean)))];

  const filteredMembers = activeFilter === 'all'
    ? members
    : members.filter((m) => m.department === activeFilter);

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-20">
      {/* 1. Executive Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-[#E6DDD5] py-16 sm:py-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B05A28]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3EE] border border-[#E6DDD5] text-xs font-semibold text-[#8F431E]">
              <Users className="w-3.5 h-3.5 text-[#B05A28]" />
              <span>AOS Foundation Leadership & Field Stewards</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
              Meet Our Dedicated Team
            </h1>
            <p className="text-base sm:text-lg text-[#525252] leading-relaxed">
              Get to know the passionate educators, community advocates, and governance trustees working alongside public schools and parents to provide essential learning materials with dignity and accountability.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Department Filters (if multiple departments exist) */}
      {departments.length > 2 && (
        <div className="border-b border-[#E6DDD5] bg-[#FAF3EE]/60 sticky top-20 z-10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="font-semibold text-[#8F431E] uppercase tracking-wider text-[11px] shrink-0 mr-2">
              Filter by:
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveFilter(dept as string)}
                className={`px-3 py-1.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
                  activeFilter === dept
                    ? 'bg-[#B05A28] text-white shadow-xs'
                    : 'bg-white text-[#525252] border border-[#E6DDD5] hover:text-[#111111] hover:border-[#B05A28]/40'
                }`}
              >
                {dept === 'all' ? 'All Stewards' : dept}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Team Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredMembers.map((member) => {
            const initials = member.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-[#E6DDD5] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#B05A28]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Photo Placard with direct image display or monogram placeholder */}
                <div className="relative h-64 sm:h-72 w-full bg-[#F3EAE2] overflow-hidden flex items-center justify-center">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500 ease-out"
                    />
                  ) : (
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

                  {/* Priority / Leadership pill */}
                  {(member.isMasterAdmin || member.displayOrder <= 2) && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-full bg-[#B05A28] text-white text-[10px] font-bold tracking-wide shadow-xs flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Leadership</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Profile Information */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#B05A28] transition-colors leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#8F431E] mt-0.5">
                      {member.position}
                    </p>
                    {member.bio && (
                      <p className="text-xs text-[#525252] mt-2.5 leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  {/* Contact / Connection links if provided */}
                  {(member.email || member.phone) && (
                    <div className="pt-3 border-t border-[#E6DDD5] flex items-center gap-3 text-xs text-[#737373]">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="hover:text-[#B05A28] transition-colors flex items-center gap-1"
                          title={member.email}
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[130px]">{member.email}</span>
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="hover:text-[#B05A28] transition-colors flex items-center gap-1"
                          title={member.phone}
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{member.phone}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E6DDD5] p-8">
            <Users className="w-12 h-12 text-[#B05A28]/50 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#111111]">No team members in this category</h3>
            <p className="text-xs text-[#737373] mt-1">Please select another filter or view all stewards.</p>
          </div>
        )}
      </section>

      {/* 4. Join The Team / Volunteer CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#FAF3EE] via-white to-[#FAF3EE] border border-[#E6DDD5] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8F431E]">
              <Sparkles className="w-4 h-4 text-[#B05A28]" />
              <span>Community & Field Stewards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
              Interested in Volunteering or Partnering with Our Team?
            </h2>
            <p className="text-sm text-[#525252] leading-relaxed">
              We welcome field coordinators, student mentors, teachers, and logistical supporters who share our commitment to child dignity and non-tuition learning support.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/volunteer')}
              className="px-6 py-3 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Join Volunteer Registry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/contact')}
              className="px-5 py-3 rounded-md bg-white hover:bg-[#F3EAE2] text-[#111111] text-xs font-bold border border-[#E6DDD5] transition-colors cursor-pointer"
            >
              Contact Our Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
