import { useState } from 'react';
import { NOTICES, Notice } from '../data/collegeData';
import { Calendar, X, ChevronRight } from 'lucide-react';

export function NoticesSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const categories = ['all', 'Admissions', 'Examinations', 'Campus'];

  const filteredNotices = activeCategory === 'all'
    ? NOTICES
    : NOTICES.filter(n => n.category === activeCategory);

  return (
    <section id="notices" className="py-16 sm:py-20 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#064b36]">
              News &amp; Official Announcements
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#064b36] text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat === 'all' ? 'All Notices' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notices List */}
        <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
          {filteredNotices.map((notice, index) => (
            <article
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              className="py-5 px-3 sm:px-4 hover:bg-stone-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-base font-bold text-[#064b36] shrink-0 pt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      {notice.category}
                    </span>
                    <span className="text-stone-400 text-xs">·</span>
                    <span className="text-xs text-stone-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      {notice.date}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-[#064b36] transition-colors">
                    {notice.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-1">
                    {notice.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <span className="text-xs font-semibold text-[#064b36] group-hover:underline hidden sm:inline">
                  Read details
                </span>
                <ChevronRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl text-left border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {selectedNotice.category} Notice
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#064b36] mt-1">
                  {selectedNotice.title}
                </h3>
                <span className="text-xs text-stone-500 mt-1 block">
                  Date: {selectedNotice.date}
                </span>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-stone-400 hover:text-stone-800 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-6 text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
              {selectedNotice.details}
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
              <span className="text-stone-500">Government Girls Zubaida College Hyderabad</span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 bg-[#064b36] text-white rounded-lg font-semibold hover:bg-[#042f28]"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
