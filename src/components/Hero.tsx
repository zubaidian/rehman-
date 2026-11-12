import { useState, useRef } from 'react';
import {
  ArrowUpRight,
  Award,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Users,
  Play,
  Video,
  Image as ImageIcon,
  X,
  Upload,
  Volume2,
  VolumeX,
  Check
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

interface HeroProps {
  onOpenEnquiry: () => void;
}

export function Hero({ onOpenEnquiry }: HeroProps) {
  // Video player modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  // Hero background mode: 'photo' or 'video'
  const [bgMode, setBgMode] = useState<'photo' | 'video'>('photo');

  // Hero video source (only initialized with sample video in development mode)
  const [videoUrl, setVideoUrl] = useState<string>(
    import.meta.env.DEV
      ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      : ''
  );
  const [isChangingVideo, setIsChangingVideo] = useState(false);
  const [customInputUrl, setCustomInputUrl] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setVideoUrl(blobUrl);
      setBgMode('video');
      setIsChangingVideo(false);
    }
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInputUrl.trim()) {
      setVideoUrl(customInputUrl.trim());
      setBgMode('video');
      setCustomInputUrl('');
      setIsChangingVideo(false);
    }
  };

  return (
    <section id="home" className="relative bg-[#042f28] text-white overflow-hidden select-none">
      {/* Dynamic Background: High-Visibility Campus Photo (or Ambient Video in Dev) */}
      <div className="absolute inset-0 z-0">
        {import.meta.env.DEV && bgMode === 'video' && videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05] transition-opacity duration-700"
          />
        ) : (
          <img
            src={COLLEGE_INFO.images.campus}
            alt="Govt Girls Zubaida College Campus Entrance"
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] saturate-[1.1] transition-opacity duration-700"
          />
        )}

        {/* Optimized Balanced Scrim: Keeps campus architecture clearly visible while guaranteeing text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#042f28]/90 via-[#042f28]/60 to-[#042f28]/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#042f28] via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Floating Background Switcher Controls & Video Configurator (Development Only) */}
      {import.meta.env.DEV && (
        <>
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-300/40 shadow-lg">
            <button
              onClick={() => setBgMode('photo')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                bgMode === 'photo'
                  ? 'bg-amber-400 text-emerald-950 shadow'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="Show high-clarity campus photo background"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Campus Photo</span>
            </button>

            <button
              onClick={() => setBgMode('video')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                bgMode === 'video'
                  ? 'bg-amber-400 text-emerald-950 shadow'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="Play campus video background"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Campus Video</span>
            </button>

            {bgMode === 'video' && (
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 rounded-full text-amber-300 hover:text-white transition-colors"
                title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            )}

            <button
              onClick={() => setIsChangingVideo(!isChangingVideo)}
              className="text-[10px] text-amber-200 hover:text-amber-100 underline ml-1 font-medium"
            >
              {isChangingVideo ? 'Close' : 'Set Video'}
            </button>
          </div>

          {/* Custom Video URL / Upload Dropdown Panel */}
          {isChangingVideo && (
            <div className="absolute top-16 right-4 z-30 w-80 sm:w-96 p-4 rounded-2xl bg-[#03241e] border-2 border-amber-300/60 shadow-2xl text-left text-xs animate-fadeIn">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-800">
                <span className="font-serif font-bold text-sm text-amber-300 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-amber-400" />
                  Configure Hero Video
                </span>
                <button
                  onClick={() => setIsChangingVideo(false)}
                  className="text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleApplyCustomUrl} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                    Enter Video URL (MP4 / WebM / Stream):
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customInputUrl}
                      onChange={(e) => setCustomInputUrl(e.target.value)}
                      placeholder="Paste video URL..."
                      className="flex-1 px-3 py-1.5 text-xs rounded bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded text-xs"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="text-center text-[10px] text-stone-400">or</div>

                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleVideoUpload}
                    accept="video/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 bg-[#064b36] hover:bg-[#053d2c] border border-amber-400/40 text-amber-200 font-semibold rounded flex items-center justify-center gap-1.5 text-xs"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-300" />
                    <span>Upload Video File from Computer...</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 text-left space-y-6">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 backdrop-blur-md border border-amber-300/50 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Official College Web Portal · Hyderabad, Sindh</span>
            </div>

            {/* Display Headline - Enhanced with subtle text shadow for high legibility */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-white drop-shadow-md">
              Knowledge that empowers.{' '}
              <span className="block italic font-normal text-amber-300 mt-1 drop-shadow">
                Education that transforms.
              </span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-stone-100 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl drop-shadow-sm">
              Welcome to <strong className="text-white font-semibold">Government Girls Zubaida College, Hyderabad</strong> — A distinguished home for learning, intellectual discovery, and student achievement for over seven decades under our guiding light: <span className="text-amber-200 font-serif italic">&ldquo;Service Above Self&rdquo;</span>.
            </p>

            {/* Action Buttons including Watch Campus Video */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href="#admissions"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm shadow-lg shadow-black/20 hover:shadow-amber-400/20 transition-all active:scale-95"
              >
                <span>SECCAP Admissions 2026</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-950" />
              </a>

              {/* Watch Video Tour Button (Development Only until real campus video is added) */}
              {import.meta.env.DEV && (
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-900/95 hover:bg-emerald-800 border-2 border-amber-300 text-amber-200 font-bold text-sm shadow-md transition-all active:scale-95 group"
                  title="Watch Campus Video Tour"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-300 text-emerald-950 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>Watch Campus Video</span>
                </button>
              )}

              <a
                href={`tel:${COLLEGE_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-[#032922]/90 hover:bg-[#021f19] border border-amber-400/50 text-amber-300 font-bold text-sm shadow-md transition-all active:scale-95"
                title="Call Govt Girls Zubaida College Office"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Call: {COLLEGE_INFO.phone}</span>
              </a>

              <a
                href="#board-results"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-[#073d32]/90 hover:bg-[#094c3f] border border-amber-300/50 text-amber-200 font-semibold text-sm shadow-md transition-all"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Board Honors (2nd &amp; 4th)</span>
              </a>

              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/15 hover:bg-white/25 text-white font-medium text-sm backdrop-blur-sm transition-all"
              >
                <span>Online Enquiry</span>
              </button>
            </div>

            {/* Core Values / Triad */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-emerald-800/80 max-w-xl text-left">
              <div>
                <span className="block font-serif font-bold text-base sm:text-lg text-amber-200 drop-shadow-sm">Curiosity</span>
                <span className="block text-xs text-stone-200">Ask boldly. Discover truth.</span>
              </div>
              <div>
                <span className="block font-serif font-bold text-base sm:text-lg text-amber-200 drop-shadow-sm">Confidence</span>
                <span className="block text-xs text-stone-200">Believe in your capabilities.</span>
              </div>
              <div>
                <span className="block font-serif font-bold text-base sm:text-lg text-amber-200 drop-shadow-sm">Community</span>
                <span className="block text-xs text-stone-200">Service above self, always.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Crest Insignia Card with Video Quick-Play Banner */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end space-y-4">
            <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#064b36]/95 to-[#032922]/98 border-2 border-amber-300/60 shadow-2xl backdrop-blur-md max-w-sm w-full text-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full p-2 bg-white/95 border-4 border-amber-300 shadow-inner flex items-center justify-center">
                <img
                  src={COLLEGE_INFO.images.logo}
                  alt="Official College Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                  Government College
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                  Govt Girls Zubaida College
                </h2>
                <p className="text-xs text-emerald-200 mt-1">
                  Opposite Central Jail, Pathan Colony, Hirabad, Hyderabad
                </p>
              </div>

              <div className="my-4 py-3 border-y border-amber-300/30">
                <span className="block text-xs uppercase tracking-wider text-stone-300">College Motto</span>
                <span className="font-serif italic font-bold text-base text-amber-200">
                  &ldquo;Service Above Self&rdquo;
                </span>
                <span className="block text-[11px] text-emerald-300 mt-0.5">Established 1953 · Sindh, Pakistan</span>
              </div>

              <div className="bg-[#021f19] p-3 rounded-lg border border-emerald-800 text-left text-xs space-y-1.5">
                <div className="flex items-center justify-between text-stone-300">
                  <span>Affiliation:</span>
                  <span className="text-amber-200 font-semibold">BISE Hyderabad &amp; Univ. of Sindh</span>
                </div>
                <div className="flex items-center justify-between text-stone-300">
                  <span>Admission Mode:</span>
                  <span className="text-emerald-300 font-semibold">SECCAP Centralized</span>
                </div>
                <div className="flex items-center justify-between text-stone-300 pt-1 border-t border-emerald-800/80">
                  <span>Official Phone:</span>
                  <a href={`tel:${COLLEGE_INFO.phoneRaw}`} className="text-amber-300 font-mono font-bold hover:underline">
                    {COLLEGE_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Video Tour Quick Trigger Banner (Development Only) */}
            {import.meta.env.DEV && (
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full max-w-sm p-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-emerald-800/60 to-amber-500/20 border border-amber-300/50 hover:border-amber-300 shadow-md backdrop-blur-md flex items-center justify-between gap-3 text-left group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Campus Video Tour
                    </span>
                    <span className="text-[10px] text-amber-200 block">
                      Explore historic gates, labs &amp; assemblies
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-amber-300 font-semibold underline shrink-0">
                  Play ↗
                </span>
              </button>
            )}
          </div>
        </div>

        {/* 5 Quantitative Institutional Milestone Cards */}
        <div className="mt-14 pt-8 border-t border-emerald-800/80 grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-5 text-left">
          <div className="p-4 rounded-xl bg-[#063f33]/85 border border-emerald-700/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Established</span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
              1953
            </div>
            <p className="text-xs text-stone-200 mt-1">
              Over 70 years serving the daughters of Hyderabad.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#063f33]/85 border border-amber-400/50 backdrop-blur-sm shadow-md">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Total Students</span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 tabular-nums">
              {COLLEGE_INFO.totalStudentsFormatted}
            </div>
            <p className="text-xs text-stone-200 mt-1">
              Total enrolled students across HSC &amp; Degree programs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#063f33]/85 border border-emerald-700/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Board Honors</span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 tabular-nums">
              2nd &amp; 4th
            </div>
            <p className="text-xs text-stone-200 mt-1">
              Top Board Positions in Computer Science Group.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#063f33]/85 border border-emerald-700/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Standard</span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
              100%
            </div>
            <p className="text-xs text-stone-200 mt-1">
              Pass rate with predominant A1 &amp; A grades.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#063f33]/85 border border-emerald-700/60 backdrop-blur-sm col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Admissions</span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-300">
              SECCAP
            </div>
            <p className="text-xs text-stone-200 mt-1">
              Sindh Govt centralized free education policy.
            </p>
          </div>
        </div>
      </div>

      {/* Campus Video Tour Modal (Development Only) */}
      {import.meta.env.DEV && isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="bg-[#03241e] rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl border-2 border-amber-300/60 text-left space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-emerald-800 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Government Girls Zubaida College Hyderabad
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Campus Video Showcase &amp; Tour
                </h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg text-lg font-bold"
                aria-label="Close video modal"
              >
                ✕
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-emerald-700 shadow-inner">
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video Description & Options */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <div className="space-y-1 text-xs text-stone-300">
                <p className="font-medium text-white">
                  Experience the historic 1953 gates, laboratories, assembly courtyard, and student life.
                </p>
                <p className="text-[11px] text-amber-200/80">
                  You can set any custom video file or URL using the &ldquo;Set Video&rdquo; button in the hero header.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setBgMode('video');
                    setIsVideoModalOpen(false);
                  }}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-lg shadow flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Use as Hero Background</span>
                </button>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-3 py-2 border border-emerald-700 text-stone-300 hover:text-white text-xs rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
