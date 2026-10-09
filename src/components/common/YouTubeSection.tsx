import React, { useState } from 'react';
import {
  Play,
  ExternalLink,
  X,
  Film,
  CheckCircle2,
  Clock,
  MapPin,
  BellRing,
  Sparkles,
} from 'lucide-react';
import { YouTubeVideoItem } from '../../types';
import { DataStore } from '../../services/store';
import { extractYouTubeId, getYouTubeThumbnail, getYouTubeEmbedUrl } from '../../utils';

interface YouTubeSectionProps {
  videos?: YouTubeVideoItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const YouTubeSection: React.FC<YouTubeSectionProps> = ({
  videos: propVideos,
  title = 'Field Outreaches in Motion',
  subtitle = 'Authentic video dispatches documenting educational supplies distributions, student testimonies, and community forums directly from the field.',
  className = '',
}) => {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideoItem | null>(null);
  const siteContent = DataStore.getSiteContent();
  const allVideos = propVideos || DataStore.getYouTubeVideos();
  const channelUrl = siteContent.youtubeChannelUrl || 'https://www.youtube.com/@aosfoundation';

  // Check if Coming Soon mode is active (default is true, or if no videos are configured)
  const isComingSoon = siteContent.youtubeComingSoon !== false || !allVideos || allVideos.length === 0;
  const hasVideos = allVideos && allVideos.length > 0;

  return (
    <section className={`py-16 sm:py-24 bg-[#FCFAF7] border-b border-[#E6DDD5] relative overflow-hidden ${className}`}>
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#B05A28]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF3EE] border border-[#E6DDD5] text-xs font-semibold text-[#8F431E]">
              <Film className="w-3.5 h-3.5 text-[#B05A28]" />
              <span>AOS Media Archive · Field Documentaries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              {title}
            </h2>
            <p className="text-base text-[#525252] leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Official YouTube Channel CTA Button */}
          <div className="shrink-0">
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white hover:bg-[#FAF3EE] text-[#111111] border border-[#E6DDD5] hover:border-[#B05A28]/40 shadow-xs hover:shadow-md transition-all duration-200 group cursor-pointer"
            >
              {/* YouTube Play Icon Badge */}
              <div className="w-8 h-8 rounded-lg bg-[#FF0000] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Official YouTube Channel
                </span>
                <span className="block text-[11px] text-[#737373]">
                  Subscribe for upcoming video broadcasts
                </span>
              </div>
              <ExternalLink className="w-4 h-4 text-[#8F431E] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* COMING SOON PLACARD: Rendered when Coming Soon is enabled or no uploaded videos */}
        {isComingSoon ? (
          <div className="relative rounded-2xl overflow-hidden bg-white border-2 border-[#E6DDD5] shadow-lg p-8 sm:p-12 text-center max-w-4xl mx-auto">
            {/* Ambient background glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#B05A28]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              {/* High-visibility Coming Soon Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FAF3EE] border border-[#B05A28]/30 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#B05A28]" />
                <span className="text-xs font-black tracking-widest uppercase text-[#8F431E]">
                  COMING SOON · IN FIELD PRODUCTION
                </span>
              </div>

              {/* Dignified Placard Header */}
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded bg-[#111111] text-amber-400 font-mono text-xs font-extrabold uppercase tracking-wider">
                  STATUS: COMING SOON
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
                  Official Field Video Documentaries Coming Soon
                </h3>
                <p className="text-sm sm:text-base text-[#525252] leading-relaxed">
                  {siteContent.youtubeComingSoonNotice ||
                    'Our field documentation crew is actively recording verified distributions of backpacks, notebooks, shoes, and uniforms across public primary schools. Authentic footage will be published here upon editorial and safeguarding clearance.'}
                </p>
              </div>

              {/* Highlights Slate */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="p-4 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 rounded-full bg-[#FAF3EE] text-[#B05A28] flex items-center justify-center text-xs font-bold font-mono">
                      01
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded">
                      In Production
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#111111]">Direct Distributions</h4>
                  <p className="text-[11px] text-[#737373]">Real delivery of learning essentials to verified pupils.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 rounded-full bg-[#FAF3EE] text-[#B05A28] flex items-center justify-center text-xs font-bold font-mono">
                      02
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded">
                      Scheduled
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#111111]">Headteacher Dialogues</h4>
                  <p className="text-[11px] text-[#737373]">Educators speak on material barriers in public schools.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FCFAF7] border border-[#E6DDD5] space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 rounded-full bg-[#FAF3EE] text-[#B05A28] flex items-center justify-center text-xs font-bold font-mono">
                      03
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                      Cleared
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#111111]">Zero Exploitation</h4>
                  <p className="text-[11px] text-[#737373]">Strict parental consent and child safeguarding clearance.</p>
                </div>
              </div>

              {/* YouTube Call To Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>Subscribe on YouTube to Be Notified</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-xs text-[#737373] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Scheduled for upcoming distribution rounds</span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Live Video Cards Grid (When Coming Soon is turned off) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {allVideos.map((vid) => {
              const videoId = extractYouTubeId(vid.youtubeUrl);
              const thumbUrl = videoId
                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                : 'https://i.ibb.co/XfPxFrVP/IMG-20240113-WA0008.jpg';

              return (
                <div
                  key={vid.id}
                  className="group bg-white rounded-2xl border border-[#E6DDD5] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Video Thumbnail with Play Button Trigger */}
                  <div
                    onClick={() => setSelectedVideo(vid)}
                    className="relative aspect-video w-full bg-[#111111] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={thumbUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://i.ibb.co/XfPxFrVP/IMG-20240113-WA0008.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 group-hover:bg-black/30 transition-colors" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-13 h-13 rounded-full bg-white/95 text-[#FF0000] flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-[#FF0000] group-hover:text-white transition-all duration-200">
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold">
                        {vid.category}
                      </span>
                    </div>

                    {vid.duration && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 text-white text-[11px] font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{vid.duration}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3
                        onClick={() => setSelectedVideo(vid)}
                        className="font-bold text-base text-[#111111] group-hover:text-[#B05A28] transition-colors line-clamp-2 leading-snug cursor-pointer"
                      >
                        {vid.title}
                      </h3>
                      <p className="text-xs text-[#525252] line-clamp-2 leading-relaxed">
                        {vid.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E6DDD5] flex items-center justify-between text-xs">
                      {vid.location ? (
                        <span className="text-[#737373] flex items-center gap-1 text-[11px] truncate max-w-[180px]">
                          <MapPin className="w-3 h-3 text-[#B05A28] shrink-0" />
                          <span className="truncate">{vid.location}</span>
                        </span>
                      ) : (
                        <span className="text-[#737373] text-[11px]">Field Video</span>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedVideo(vid)}
                          className="text-xs font-bold text-[#B05A28] hover:text-[#8F431E] transition-colors cursor-pointer"
                        >
                          Play Video
                        </button>
                        <a
                          href={vid.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-[#737373] hover:text-[#FF0000] transition-colors"
                          title="Watch on YouTube"
                          aria-label="Open on YouTube"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-[#111111] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <div className="flex items-center justify-between p-4 bg-black/60 border-b border-white/10 text-white">
                <div className="flex items-center gap-2 truncate pr-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-semibold text-sm truncate">{selectedVideo.title}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={selectedVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                  >
                    <span>Open in YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                    aria-label="Close video player"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`${getYouTubeEmbedUrl(selectedVideo.youtubeUrl)}&autoplay=1`}
                  title={selectedVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="p-4 bg-[#1A1A1A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <p className="text-white/80 leading-relaxed max-w-2xl">
                  {selectedVideo.description}
                </p>
                <div className="shrink-0 flex items-center gap-2 text-white/60 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AOS Field Outreach Archive</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
