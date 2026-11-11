import { useState } from 'react';
import { COLLEGE_INFO } from '../data/collegeData';
import { ExternalLink, MessageCircle, Share2, Users, AlertCircle, ShieldCheck } from 'lucide-react';

export function FacebookCommunitySection() {
  const [iframeError, setIframeError] = useState(false);

  return (
    <section id="facebook-updates" className="py-16 sm:py-24 bg-[#042f28] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Community Overview */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064b36] border border-amber-300/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              <span>Official Social Media Channel</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Connect With Our <span className="italic font-normal text-amber-300">College Community</span>
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
              Stay up-to-date with daily student life, extracurricular competitions, academic ceremonies, exam schedules, and public notices through our official Facebook page.
            </p>

            <div className="p-5 rounded-2xl bg-[#063f35] border border-emerald-700/80 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xl">
                  f
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Govt Girls Zubaida College Hyderabad
                  </h4>
                  <span className="text-xs text-amber-300">
                    Official Facebook Page (ID: 100064211700343)
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-300">
                Managed by the college administration for prompt communication with students, parents, alumni, and educational authorities in Sindh.
              </p>

              <div className="pt-2">
                <a
                  href={COLLEGE_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <span>Visit Official Facebook Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-stone-300">
              <div className="p-3 rounded-xl bg-[#021f19] border border-emerald-800 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-amber-300" />
                <span>Live Event Announcements</span>
              </div>
              <div className="p-3 rounded-xl bg-[#021f19] border border-emerald-800 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-amber-300" />
                <span>Student Achievements</span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Facebook Plugin / Fallback Box */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[500px] bg-white rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-300/40 p-4 text-stone-900">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span className="text-xs font-bold text-stone-800">
                    Live Facebook Feed
                  </span>
                </div>
                <a
                  href={COLLEGE_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>Open Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Iframe with graceful fallback */}
              <div className="relative min-h-[500px] w-full bg-stone-100 rounded-xl overflow-hidden flex flex-col items-center justify-center p-4">
                <iframe
                  title="Official Facebook Timeline of Govt Girls Zubaida College Hyderabad"
                  src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                    COLLEGE_INFO.facebookUrl
                  )}&tabs=timeline&width=460&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                  width="100%"
                  height="500"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="w-full h-[500px]"
                  onError={() => setIframeError(true)}
                />

                {/* Always-accessible companion footer inside the frame card */}
                <div className="w-full mt-3 p-3 bg-stone-50 border border-stone-200 rounded-lg text-center text-xs text-stone-600">
                  <p>
                    If Facebook restricts embedding in your current browser, click below:
                  </p>
                  <a
                    href={COLLEGE_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1 font-bold text-blue-700 hover:underline"
                  >
                    Open Govt Girls Zubaida College Page on Facebook ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
