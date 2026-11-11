import { ArrowUpRight, Award, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

interface HeroProps {
  onOpenEnquiry: () => void;
}

export function Hero({ onOpenEnquiry }: HeroProps) {
  return (
    <section id="home" className="relative bg-[#042f28] text-white overflow-hidden">
      {/* Background with Campus Gate Photo & Rich Dark Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={COLLEGE_INFO.images.campus}
          alt="Govt Girls Zubaida College Campus Entrance"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#042f28] via-[#042f28]/90 to-[#064b36]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 text-left space-y-6">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/80 border border-amber-300/40 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Official College Web Portal · Hyderabad, Sindh</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-white">
              Knowledge that empowers.{' '}
              <span className="block italic font-normal text-amber-300 mt-1">
                Education that transforms.
              </span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-stone-200 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl">
              Welcome to <strong className="text-white font-semibold">Government Girls Zubaida College, Hyderabad</strong> — A distinguished home for learning, intellectual discovery, and student achievement for over seven decades under our guiding light: <span className="text-amber-200 font-serif italic">&ldquo;Service Above Self&rdquo;</span>.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href="#admissions"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm shadow-lg shadow-black/20 hover:shadow-amber-400/20 transition-all active:scale-95"
              >
                <span>SECCAP Admissions 2026</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-950" />
              </a>

              <a
                href={`tel:${COLLEGE_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-900/90 hover:bg-emerald-800 border-2 border-amber-400 text-amber-300 font-bold text-sm shadow-md transition-all active:scale-95"
                title="Call Govt Girls Zubaida College Office"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Call College: {COLLEGE_INFO.phone}</span>
              </a>

              <a
                href="#board-results"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-[#073d32] hover:bg-[#094c3f] border border-amber-300/50 text-amber-200 font-semibold text-sm shadow-md transition-all"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Board Honors (2nd & 4th)</span>
              </a>

              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-sm transition-all"
              >
                <span>Online Enquiry</span>
              </button>
            </div>

            {/* Core Values / Triad */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-emerald-800/80 max-w-xl text-left">
              <div>
                <span className="block font-serif font-bold text-base sm:text-lg text-amber-200">Curiosity</span>
                <span className="block text-xs text-stone-300">Ask boldly. Discover truth.</span>
              </div>
              <div>
                <span className="block font-serif font-bold text-base sm:text-lg text-amber-200">Confidence</span>
                <span className="block text-xs text-stone-300">Believe in your capabilities.</span>
              </div>
              <div>
                <span className="block font-serif font-bold text-base sm:text-lg text-amber-200">Community</span>
                <span className="block text-xs text-stone-300">Service above self, always.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Crest Insignia Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#064b36]/90 to-[#032922]/95 border-2 border-amber-300/50 shadow-2xl backdrop-blur-md max-w-sm w-full text-center">
              <div className="w-28 h-28 mx-auto rounded-full p-2 bg-white/95 border-4 border-amber-300 shadow-inner flex items-center justify-center">
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
                  <span className="text-amber-200 font-semibold">BISE Hyderabad & Univ. of Sindh</span>
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
          </div>
        </div>

        {/* 4 Quantitative Institutional Milestone Cards */}
        <div className="mt-14 pt-8 border-t border-emerald-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div className="p-4 rounded-xl bg-[#063f33]/80 border border-emerald-700/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Established</span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
              1953
            </div>
            <p className="text-xs text-stone-300 mt-1">
              Over 70 years serving the daughters of Hyderabad.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#063f33]/80 border border-emerald-700/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Board Distinction</span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 tabular-nums">
              2nd &amp; 4th
            </div>
            <p className="text-xs text-stone-300 mt-1">
              Top Board Positions in Computer Science Group.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#063f33]/80 border border-emerald-700/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Academic Standard</span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
              100%
            </div>
            <p className="text-xs text-stone-300 mt-1">
              Pass rate with predominant A1 &amp; A grades.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#063f33]/80 border border-emerald-700/60 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Free Admissions</span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-300">
              SECCAP
            </div>
            <p className="text-xs text-stone-300 mt-1">
              Sindh Govt initiative for merit-based free education.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
