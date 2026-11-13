import { useEffect, useMemo, useState } from 'react';
import {
  ResourceCategory,
  STUDENT_RESOURCES,
  StudentResourceDoc,
} from '../data/studentResourcesData';
import {
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Search,
  X,
} from 'lucide-react';

const RESOURCE_CATEGORIES: ('All' | ResourceCategory)[] = [
  'All',
  'Admission Forms',
  'Enrollment Slips',
  'Semester Registration Guides',
];

export function StudentResourcesSection() {
  const [activeCategory, setActiveCategory] = useState<'All' | ResourceCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewDoc, setPreviewDoc] = useState<StudentResourceDoc | null>(null);

  useEffect(() => {
    if (!previewDoc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewDoc(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewDoc]);

  const filteredResources = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return STUDENT_RESOURCES.filter((doc) => {
      const matchesCat =
        activeCategory === 'All' || doc.category === activeCategory;
      const matchesSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.code.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q) ||
        doc.audience.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="student-resources"
      className="py-16 sm:py-24 bg-[#f8faf7] text-stone-900 relative border-t border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            Student Resources &amp; Downloadable Forms
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Official downloadable PDF admission forms, BISE &amp; University enrollment slips, and semester registration guides for scholars of Government Girls Zubaida College, Hyderabad.
          </p>
        </div>

        {/* Category Filter Tabs & Quick Search */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {RESOURCE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-[#064b36] text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat === 'All'
                    ? `All Documents (${STUDENT_RESOURCES.length})`
                    : cat}
                </button>
              ))}
            </div>

            <div className="relative md:w-72 shrink-0">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search forms, slips, or guides..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm bg-stone-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#064b36]"
              />
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((doc) => (
              <article
                key={doc.id}
                className="rounded-2xl bg-gradient-to-b from-[#064b36] to-[#042f28] text-white border-2 border-amber-300/35 hover:border-amber-300/70 shadow-lg hover:shadow-xl transition-all p-6 flex flex-col justify-between gap-5 text-left"
              >
                <div className="space-y-3.5">
                  {/* Category & Code Header (Plain Text, Zero Badges) */}
                  <div className="flex items-center justify-between gap-2 border-b border-emerald-800/80 pb-3 text-[11px]">
                    <span className="font-bold uppercase tracking-wider text-amber-300">
                      {doc.category}
                    </span>
                    <span className="font-mono text-emerald-200">
                      {doc.code}
                    </span>
                  </div>

                  {/* Title & Audience */}
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white leading-snug">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-emerald-200 font-medium mt-1">
                      {doc.audience}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                    {doc.description}
                  </p>

                  {/* Included Sections Checklist */}
                  <div className="space-y-1.5 pt-1">
                    {doc.includedItems.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-xs text-emerald-100"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Metadata & PDF Action Buttons */}
                <div className="pt-4 border-t border-emerald-800/80 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-stone-300">
                    <span className="flex items-center gap-1.5 font-mono">
                      <FileText className="w-3.5 h-3.5 text-amber-300" />
                      <span>{doc.fileSize}</span>
                    </span>
                    <span>{doc.updatedLabel}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={doc.pdfUrl}
                      download={doc.fileName}
                      className="px-3.5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setPreviewDoc(doc)}
                      className="px-3.5 py-2.5 rounded-xl bg-[#03241e] hover:bg-[#05352c] text-amber-200 border border-amber-300/40 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview PDF</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
            <FileText className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-stone-800">
              No matching forms or guides found
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Try clearing your search or selecting &ldquo;All Documents&rdquo; above.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="px-4 py-2 bg-[#064b36] text-white text-xs font-semibold rounded-lg"
            >
              Show All Resources
            </button>
          </div>
        )}
      </div>

      {/* Inline PDF Preview Modal */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-700 flex flex-col h-[86vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-stone-800 text-left">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {previewDoc.title}
                  </h3>
                  <span className="text-[11px] font-mono text-stone-400 block">
                    {previewDoc.code} · {previewDoc.fileSize}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={previewDoc.pdfUrl}
                  download={previewDoc.fileName}
                  className="px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
                  aria-label="Close PDF preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-stone-800">
              <iframe
                src={previewDoc.pdfUrl}
                title={previewDoc.title}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
