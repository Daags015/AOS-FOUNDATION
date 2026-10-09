import React from 'react';
import { DataStore } from '../services/store';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  PackageCheck,
  HeartHandshake,
  MessageSquare,
} from 'lucide-react';
import { formatWhatsAppUrl } from '../utils';
import { InlineSectionBar } from '../components/common/InlineSectionBar';

interface ProgrammeDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProgrammeDetailPage: React.FC<ProgrammeDetailPageProps> = ({
  slug,
  onNavigate,
}) => {
  const programme = DataStore.getProgrammeBySlug(slug);
  const gallery = DataStore.getGallery().filter((g) => g.programmeId === programme?.id);

  if (!programme) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#111111]">Programme Not Found</h2>
        <p className="text-sm text-[#525252]">
          The requested programme could not be located or may be in draft mode.
        </p>
        <button
          onClick={() => onNavigate('/programmes')}
          className="px-5 py-2.5 rounded-md bg-[#B05A28] text-white text-xs font-bold uppercase tracking-wider"
        >
          View All Programmes
        </button>
      </div>
    );
  }

  const whatsappMessage = `Hello AOS Foundation, I would like to sponsor or support the "${programme.title}" initiative.`;
  const whatsappUrl = formatWhatsAppUrl('08168779732', whatsappMessage);

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-20">
      {/* Top Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle={programme.title}
        prevSection={{ title: 'Strategic Programmes', path: '/programmes' }}
        nextSection={{ title: 'Support Our Work & Donate', path: '/donate' }}
        breadcrumbs={[
          { title: 'Strategic Programmes', path: '/programmes' },
          { title: programme.title },
        ]}
        onNavigate={onNavigate}
      />

      {/* Main Detail Header */}
      <header className="bg-white border-b border-[#E6DDD5] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-bold uppercase tracking-wider text-[#B05A28]">
              {programme.category}
            </span>
            <span className="text-[#8F431E]">·</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF3EE] border border-[#E6DDD5] text-[#8F431E] font-medium">
              Status: {programme.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
            {programme.title}
          </h1>

          <p className="text-lg text-[#525252] leading-relaxed max-w-3xl">
            {programme.shortDescription}
          </p>

          {/* Quick Operational Metadata Bar */}
          <div className="pt-6 border-t border-[#E6DDD5] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#262626]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B05A28] shrink-0" />
              <span>
                <strong className="font-semibold">Location:</strong> {programme.location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#B05A28] shrink-0" />
              <span>
                <strong className="font-semibold">Schedule:</strong> {programme.date}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#B05A28] shrink-0" />
              <span>
                <strong className="font-semibold">Beneficiaries:</strong>{' '}
                {programme.beneficiariesSummary || 'Primary pupils'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* Cover Photo */}
        <div className="rounded-2xl overflow-hidden border border-[#E6DDD5] shadow-xs">
          <ImageWithFallback
            src={programme.coverImage}
            alt={programme.title}
            category={programme.category}
            aspectRatio="wide"
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>

        {/* Narrative & Materials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Narrative Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-xl border border-[#E6DDD5] p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#111111]">Programme Overview & Objectives</h2>
              <div className="text-sm text-[#404040] leading-relaxed space-y-4 whitespace-pre-line">
                {programme.fullDescription}
              </div>
            </div>

            {/* Impact Strategy */}
            <div className="bg-white rounded-xl border border-[#E6DDD5] p-6 sm:p-8 space-y-3">
              <h3 className="text-lg font-bold text-[#111111]">Expected Impact & Retention Goal</h3>
              <p className="text-sm text-[#404040] leading-relaxed">
                {programme.impactSummary}
              </p>
            </div>

            {/* Field Images if available */}
            {gallery.length > 0 && (
              <div className="bg-white rounded-xl border border-[#E6DDD5] p-6 sm:p-8 space-y-4">
                <h3 className="text-lg font-bold text-[#111111]">Field Documentation</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((img) => (
                    <div key={img.id} className="rounded-lg overflow-hidden border border-[#E6DDD5]">
                      <ImageWithFallback
                        src={img.url}
                        alt={img.caption}
                        category={img.category}
                        aspectRatio="video"
                      />
                      <p className="p-2.5 text-xs text-[#525252] bg-[#FCFAF7] border-t border-[#E6DDD5]">
                        {img.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Materials Pack Checklist */}
            <div className="bg-[#FAF3EE] rounded-xl border border-[#E6DDD5] p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8F431E]">
                <PackageCheck className="w-4 h-4 text-[#B05A28]" />
                <span>Materials Included in This Pack</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#262626]">
                {programme.materialsIncluded.map((mat) => (
                  <li key={mat} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B05A28] shrink-0 mt-0.5" />
                    <span>{mat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Sponsorship CTA */}
            <div className="bg-white rounded-xl border border-[#E6DDD5] p-6 space-y-4 text-center">
              <HeartHandshake className="w-8 h-8 text-[#B05A28] mx-auto" />
              <h4 className="text-base font-bold text-[#111111]">
                Support This Specific Programme
              </h4>
              <p className="text-xs text-[#525252] leading-relaxed">
                You can sponsor full packs for a classroom or provide essential materials directly.
              </p>
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onNavigate('/donate')}
                  className="w-full py-3 px-4 rounded-md bg-[#B05A28] hover:bg-[#8F431E] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Sponsor Learning Packs
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-md bg-[#FCFAF7] hover:bg-[#F3EAE2] text-[#8F431E] border border-[#E6DDD5] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discuss on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Volunteer CTA */}
            <div className="bg-white rounded-xl border border-[#E6DDD5] p-6 space-y-3">
              <h4 className="text-sm font-bold text-[#111111]">Field Volunteers Welcome</h4>
              <p className="text-xs text-[#525252] leading-relaxed">
                Assist with verification, kit packaging, sorting, and field distribution across local schools.
              </p>
              <button
                onClick={() => onNavigate('/volunteer')}
                className="w-full py-2 px-3 rounded-md bg-[#111111] hover:bg-[#262626] text-white text-xs font-semibold transition-colors"
              >
                Apply as Volunteer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Cross-Section Navigation Bar */}
      <InlineSectionBar
        currentTitle={programme.title}
        prevSection={{ title: 'Strategic Programmes', path: '/programmes' }}
        nextSection={{ title: 'Support Our Work & Donate', path: '/donate' }}
        onNavigate={onNavigate}
        isBottom
      />
    </div>
  );
};
