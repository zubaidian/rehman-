import { useState } from 'react';
import { ACADEMIC_PROGRAMS, AcademicProgram } from '../data/collegeData';
import { CheckCircle, ArrowRight } from 'lucide-react';

export function AcademicsSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'intermediate' | 'degree' | 'associate'>('all');
  const [selectedProgram, setSelectedProgram] = useState<AcademicProgram | null>(null);

  const filteredPrograms = activeCategory === 'all'
    ? ACADEMIC_PROGRAMS
    : ACADEMIC_PROGRAMS.filter(p => p.category === activeCategory);

  return (
    <section id="academics" className="py-16 sm:py-24 bg-white text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            Explore Our Academic Programs
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Empowering students through rigorous curriculum, modern scientific laboratories, experienced faculty, and recognized university degree affiliations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-[#064b36] text-white shadow-md'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Programs ({ACADEMIC_PROGRAMS.length})
          </button>
          <button
            onClick={() => setActiveCategory('intermediate')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'intermediate'
                ? 'bg-[#064b36] text-white shadow-md'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Intermediate / Higher Secondary (HSC)
          </button>
          <button
            onClick={() => setActiveCategory('degree')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'degree'
                ? 'bg-[#064b36] text-white shadow-md'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            4-Year BS Zoology (Univ. of Sindh)
          </button>
          <button
            onClick={() => setActiveCategory('associate')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeCategory === 'associate'
                ? 'bg-[#064b36] text-white shadow-md'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            2-Year Associate Degrees (AD Commerce, Science)
          </button>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border bg-gradient-to-b from-[#064b36] to-[#042f28] text-white border-amber-400/40 hover:border-amber-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    {program.department}
                  </span>
                  {program.id === 'computer-science' && (
                    <span className="text-[11px] font-semibold text-emerald-200">
                      Board 2nd &amp; 4th
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-300">
                    {program.title}
                  </h3>
                  <span className="text-xs block mt-1 font-medium text-emerald-200">
                    Duration: {program.duration}
                  </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-stone-200">
                  {program.overview}
                </p>

                {/* Key Subjects */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider block mb-1 text-amber-200">
                    Core Disciplines:
                  </span>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    {program.subjects.slice(0, 4).join(' · ')}
                    {program.subjects.length > 4 && (
                      <span className="text-amber-300 font-semibold">
                        {' '}· +{program.subjects.length - 4} more
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-6 mt-6 border-t border-emerald-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="text-xs font-bold flex items-center gap-1 transition-colors text-amber-300 hover:text-white"
                >
                  <span>View Full Curriculum &amp; Career</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="#admissions"
                  className="text-[11px] px-3 py-1.5 rounded font-semibold bg-amber-400 hover:bg-amber-300 text-emerald-950 transition-colors shadow-sm"
                >
                  Apply
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Infrastructure Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#f8faf7] border border-stone-300 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-stone-300 pb-4 sm:pb-0 sm:pr-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#064b36]">
                Modern Laboratories
              </span>
              <h4 className="font-serif font-bold text-lg text-stone-900">
                Science &amp; Computing Labs
              </h4>
              <p className="text-xs text-stone-600">
                Equipped with modern high-speed workstations, physics apparatus, biology specimens, and chemical analysis tools.
              </p>
            </div>

            <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-stone-300 pb-4 sm:pb-0 sm:pr-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#064b36]">
                Academic Library
              </span>
              <h4 className="font-serif font-bold text-lg text-stone-900">
                Extensive Book &amp; Periodical Collection
              </h4>
              <p className="text-xs text-stone-600">
                Thousands of reference volumes, textbooks, past examination papers, Urdu &amp; Sindhi literature, and digital resources.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#064b36]">
                Qualified Faculty
              </span>
              <h4 className="font-serif font-bold text-lg text-stone-900">
                Mentorship &amp; Board Excellence
              </h4>
              <p className="text-xs text-stone-600">
                Subject specialists and professors selected through the Sindh Public Service Commission guiding girls to top Board ranks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProgram(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-left border border-stone-300 max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {selectedProgram.department} · {selectedProgram.duration}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#064b36] mt-1">
                  {selectedProgram.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="text-stone-400 hover:text-stone-800 p-1.5 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-1">
                Program Overview:
              </h4>
              <p className="text-sm text-stone-600 leading-relaxed">
                {selectedProgram.overview}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-2">
                Subjects &amp; Curriculum Breakdown:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProgram.subjects.map((sub) => (
                  <div
                    key={sub}
                    className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-800 flex items-center gap-2"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-1">
                Eligibility Criteria:
              </h4>
              <p className="text-xs text-stone-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                {selectedProgram.eligibility}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-2">
                Future Academic &amp; Career Pathways:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProgram.futureProspects.map((path) => (
                  <div
                    key={path}
                    className="flex items-center gap-2 text-xs font-semibold text-stone-800"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{path}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <a
                href="#admissions"
                onClick={() => setSelectedProgram(null)}
                className="px-5 py-2.5 bg-[#064b36] hover:bg-[#042f28] text-white rounded-lg text-xs font-bold"
              >
                Proceed to Admissions Guide
              </a>
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
