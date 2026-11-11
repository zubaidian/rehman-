import { useState } from 'react';
import { COLLEGE_INFO, BOARD_HONORS } from '../data/collegeData';
import { Award, CheckCircle2, Trophy, Maximize2, X, Sparkles } from 'lucide-react';

export function BoardHonorsSection() {
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);
  const [activeModalTitle, setActiveModalTitle] = useState<string>('');

  const openImageModal = (src: string, title: string) => {
    setActiveModalImage(src);
    setActiveModalTitle(title);
  };

  return (
    <section id="board-results" className="py-16 sm:py-24 bg-[#f4f7f4] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold tracking-wider uppercase">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>Academic Distinction · BISE Hyderabad</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            Outstanding Board Results
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Celebrating the extraordinary success of our students in the Higher Secondary Certificate (HSC Part-II) Annual Examination, securing provincial top honors for Government Girls Zubaida College.
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Official Poster Showcase */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative group rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-xl bg-white p-2">
              <img
                src={COLLEGE_INFO.images.boardResultsFlyer}
                alt="Outstanding Board Results Flyer - Govt Girls Zubaida College Hyderabad"
                className="w-full h-auto rounded-xl object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                onClick={() =>
                  openImageModal(
                    COLLEGE_INFO.images.boardResultsFlyer,
                    'HSC Part-II Computer Science Annual Examination Results Announcement'
                  )
                }
              />
              <button
                onClick={() =>
                  openImageModal(
                    COLLEGE_INFO.images.boardResultsFlyer,
                    'HSC Part-II Computer Science Annual Examination Results Announcement'
                  )
                }
                className="absolute bottom-4 right-4 bg-[#064b36] hover:bg-[#042f28] text-white p-2.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-semibold px-3"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>View Full Banner</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong>Official Felicitation:</strong> Heartiest congratulations from Principal Prof. Yasmin Panhwar and faculty members to all successful students and the Computer Science Department.
              </div>
            </div>
          </div>

          {/* Right Column: Key Position Holder Details & Stats */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Position Card: Maryam Bibi */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#064b36] text-white border-2 border-amber-300 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-700/80 pb-4 mb-4">
                <span className="px-3 py-1 rounded bg-amber-400 text-emerald-950 text-xs font-bold uppercase tracking-wider">
                  2nd Position in BISE Hyderabad Board
                </span>
                <span className="text-amber-200 text-xs font-mono">
                  Roll No: 79256
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                <div className="sm:col-span-2 space-y-2">
                  <span className="text-xs font-semibold text-emerald-200 uppercase tracking-widest block">
                    Position Holder
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                    Maryam Bibi
                  </h3>
                  <p className="text-stone-200 text-sm">
                    Daughter of <strong className="text-white">Muhammad Aslam</strong>
                  </p>
                  <p className="text-emerald-100 text-xs">
                    Institution: <span className="font-semibold text-white">1080. Govt Girls College Hyderabad (Zubaida)</span>
                  </p>
                  <p className="text-xs text-stone-300 pt-1">
                    HSC Part-II (Class XII) Computer Science Annual Examination
                  </p>
                </div>

                <div className="bg-[#042f28] p-4 rounded-xl border border-amber-300/40 text-center">
                  <span className="text-[11px] text-stone-300 block uppercase">Marks Obtained</span>
                  <div className="font-serif font-bold text-3xl sm:text-4xl text-amber-300 my-1 tabular-nums">
                    916
                  </div>
                  <span className="text-xs text-emerald-200">Out of 1100</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-emerald-700/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-emerald-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  Official Board Position Gazetted
                </span>
                <button
                  onClick={() =>
                    openImageModal(
                      COLLEGE_INFO.images.boardResultsOfficial,
                      'BISE Hyderabad Official Position Holders Gazette Sheet'
                    )
                  }
                  className="text-amber-300 hover:text-white font-semibold underline underline-offset-4 flex items-center gap-1"
                >
                  View Official Board Gazette Photo ↗
                </button>
              </div>
            </div>

            {/* Department Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm text-center">
                <span className="text-xs text-stone-500 font-medium block">Board Standings</span>
                <div className="font-serif font-bold text-2xl text-[#064b36] my-1">
                  2nd &amp; 4th
                </div>
                <p className="text-xs text-stone-600">Top positions across all colleges in BISE Hyderabad.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm text-center">
                <span className="text-xs text-stone-500 font-medium block">Grade Distribution</span>
                <div className="font-serif font-bold text-2xl text-[#064b36] my-1">
                  Majority A1 &amp; A
                </div>
                <p className="text-xs text-stone-600">Only 1 B-grade &amp; 1 C-grade across the cohort.</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm text-center">
                <span className="text-xs text-stone-500 font-medium block">Pass Record</span>
                <div className="font-serif font-bold text-2xl text-emerald-700 my-1">
                  No Failures
                </div>
                <p className="text-xs text-stone-600">100% success rate under dedicated faculty mentorship.</p>
              </div>
            </div>

            {/* Official Gazette Thumbnail Card */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
              <img
                src={COLLEGE_INFO.images.boardResultsOfficial}
                alt="BISE Hyderabad Gazette"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-stone-300 shrink-0 cursor-pointer hover:opacity-90"
                onClick={() =>
                  openImageModal(
                    COLLEGE_INFO.images.boardResultsOfficial,
                    'BISE Hyderabad Official Position Holders Gazette Sheet'
                  )
                }
              />
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-bold text-sm text-stone-900">
                  Board of Intermediate &amp; Secondary Education Hyderabad
                </h4>
                <p className="text-xs text-stone-600">
                  Official gazette notification confirming top three position holders in the Computer Science Group Annual Examination.
                </p>
                <button
                  onClick={() =>
                    openImageModal(
                      COLLEGE_INFO.images.boardResultsOfficial,
                      'BISE Hyderabad Official Position Holders Gazette Sheet'
                    )
                  }
                  className="text-xs font-semibold text-[#064b36] hover:text-emerald-700 underline"
                >
                  Click to inspect the verified gazette document
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl p-4 text-center border border-stone-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-left">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {activeModalTitle}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalImage(null)}
                className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 max-h-[75vh] overflow-auto flex items-center justify-center">
              <img
                src={activeModalImage}
                alt={activeModalTitle}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between">
              <span>Government Girls Zubaida College Hyderabad</span>
              <button
                onClick={() => setActiveModalImage(null)}
                className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded font-medium"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
