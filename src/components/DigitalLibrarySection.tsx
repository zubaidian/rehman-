import { useState, useEffect } from 'react';
import { SYLLABUS_BOOKS, SyllabusBookItem } from '../data/digitalLibraryData';
import { BookOpen, ExternalLink, Maximize2, X } from 'lucide-react';

export function DigitalLibrarySection() {
  const [filterLevel, setFilterLevel] = useState<'all' | 'intermediate' | 'degree'>('all');
  const [previewBook, setPreviewBook] = useState<SyllabusBookItem | null>(null);

  useEffect(() => {
    if (!previewBook) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewBook(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewBook]);

  const filteredBooks =
    filterLevel === 'all'
      ? SYLLABUS_BOOKS
      : SYLLABUS_BOOKS.filter((item) => item.level === filterLevel);

  return (
    <section id="digital-library" className="py-16 sm:py-24 bg-[#f8faf7] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-[#064b36] text-xs font-bold tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Digital Library · Official Syllabus</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            Syllabus Book Photos &amp; Internet Links
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Direct official internet links to Sindh Textbook Board eBooks, BISE Hyderabad intermediate curricula, and University of Sindh / HEC degree syllabi.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setFilterLevel('all')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              filterLevel === 'all'
                ? 'bg-[#064b36] text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            All Syllabus Books ({SYLLABUS_BOOKS.length})
          </button>
          <button
            onClick={() => setFilterLevel('intermediate')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              filterLevel === 'intermediate'
                ? 'bg-[#064b36] text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            Intermediate (XI &amp; XII)
          </button>
          <button
            onClick={() => setFilterLevel('degree')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              filterLevel === 'degree'
                ? 'bg-[#064b36] text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            BS Zoology &amp; Associate Degrees
          </button>
        </div>

        {/* Syllabus Book Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group text-left"
            >
              <div>
                {/* Syllabus Book Cover Photo */}
                <div
                  onClick={() => setPreviewBook(book)}
                  className="relative h-80 bg-stone-100 overflow-hidden border-b border-stone-200 cursor-pointer"
                >
                  <img
                    src={book.photo}
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-[#064b36]/90 backdrop-blur-sm text-amber-300 border border-amber-300/30 text-[10px] font-bold uppercase tracking-wider shadow">
                      {book.levelLabel}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewBook(book);
                    }}
                    aria-label={`View photo of ${book.title}`}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-[#064b36] shadow-md opacity-90 group-hover:opacity-100 transition-opacity"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-6 space-y-2.5">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    {book.authority}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#064b36] leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {book.subjectsSummary}
                  </p>
                </div>
              </div>

              {/* Official Internet Links */}
              <div className="px-6 pb-6 pt-3 border-t border-stone-100 flex flex-col gap-2">
                <a
                  href={book.primaryLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#064b36] hover:bg-[#042f28] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>{book.primaryLink.label}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                </a>

                {book.secondaryLink && (
                  <a
                    href={book.secondaryLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#064b36] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{book.secondaryLink.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Syllabus Photo Lightbox Preview */}
      {previewBook && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreviewBook(null)}
        >
          <div
            className="bg-stone-900 border border-stone-700 rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  {previewBook.authority}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                  {previewBook.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewBook(null)}
                className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800"
                aria-label="Close syllabus preview"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="my-4 max-h-[60vh] overflow-auto flex items-center justify-center bg-black/40 rounded-xl p-2">
              <img
                src={previewBook.photo}
                alt={previewBook.title}
                referrerPolicy="no-referrer"
                className="max-h-[56vh] max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="pt-3 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-300">
              <p className="leading-relaxed">{previewBook.subjectsSummary}</p>
              <a
                href={previewBook.primaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-lg font-bold shrink-0 inline-flex items-center gap-1.5"
              >
                <span>{previewBook.primaryLink.label}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
