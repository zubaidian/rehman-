import React, { useState, useMemo } from 'react';
import { LIBRARY_RESOURCES, DIGITAL_LIBRARY_STATS, LibraryResource } from '../data/digitalLibraryData';
import {
  BookOpen,
  Search,
  Download,
  FileText,
  Eye,
  CheckCircle,
  X,
  ExternalLink,
  Sparkles,
  Bookmark,
  Layers,
  GraduationCap
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

export function DigitalLibrarySection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [previewResource, setPreviewResource] = useState<LibraryResource | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'past-papers', label: 'Past Papers' },
    { id: 'textbooks', label: 'E-Textbooks' },
    { id: 'model-papers', label: 'Model Papers' },
    { id: 'reference', label: 'Degree Reference' }
  ];

  const levels = [
    { id: 'all', label: 'All Classes' },
    { id: 'Class XI', label: 'Class XI (First Year)' },
    { id: 'Class XII', label: 'Class XII (Second Year)' },
    { id: 'BS Zoology', label: 'BS Zoology' },
    { id: 'AD Commerce', label: 'AD Commerce' }
  ];

  // Filtered resources based on search and selected filters
  const filteredResources = useMemo(() => {
    return LIBRARY_RESOURCES.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.publisher.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keyTopics.some((topic) => topic.toLowerCase().includes(q));

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  const handleDownload = (resource: LibraryResource) => {
    setDownloadSuccessMessage(`Preparing download for: "${resource.title}" (${resource.fileSize})`);
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 4500);
  };

  return (
    <section id="digital-library" className="py-16 sm:py-24 bg-[#f8faf7] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-[#064b36] text-xs font-bold tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5 text-emerald-800" />
            <span>Academic Repository · Free Student Access</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            Digital Library &amp; Past Papers
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Free online access to official Sindh Textbook Board e-books, BISE Hyderabad solved past papers, model examination papers, and degree study guides for Zubaida College students.
          </p>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {DIGITAL_LIBRARY_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm text-center"
            >
              <span className="font-serif font-bold text-2xl sm:text-3xl text-[#064b36] block tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-stone-900 block mt-0.5">
                {stat.label}
              </span>
              <span className="text-[11px] text-stone-500">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-md space-y-5 mb-10">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject, title, author (e.g., Computer Science, Biology, Past Paper, STBB, Physics, English)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36] bg-stone-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-stone-100">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-stone-500 mr-2 uppercase tracking-wider hidden sm:inline">
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#064b36] text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Level Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider hidden sm:inline">
                Level:
              </span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-stone-300 bg-stone-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#064b36]"
              >
                {levels.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>
                    {lvl.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Download Success Toast Message */}
        {downloadSuccessMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-900 text-white flex items-center justify-between shadow-lg border border-amber-300 animate-fadeIn">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              <CheckCircle className="w-5 h-5 text-amber-300 shrink-0" />
              <span>{downloadSuccessMessage} — Access generated successfully.</span>
            </div>
            <button
              onClick={() => setDownloadSuccessMessage(null)}
              className="text-stone-300 hover:text-white text-xs px-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <BookOpen className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-stone-800">
              No matching academic resources found
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              We couldn&rsquo;t find anything matching &ldquo;{searchQuery}&rdquo;. Try searching for general terms like &ldquo;Physics&rdquo;, &ldquo;Biology&rdquo;, &ldquo;Computer Science&rdquo;, or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}
              className="px-4 py-2 bg-[#064b36] text-white text-xs font-semibold rounded-lg hover:bg-[#042f28]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      {resource.subject}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {resource.level}
                    </span>
                  </div>

                  {/* Resource Title & Publisher */}
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#064b36] group-hover:text-emerald-800 leading-snug transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      {resource.publisher} · {resource.year}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {resource.description}
                  </p>

                  {/* Key Topics Badges */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                      Curriculum Highlights:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {resource.keyTopics.slice(0, 2).map((topic, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[11px] font-medium border border-stone-200"
                        >
                          {topic}
                        </span>
                      ))}
                      {resource.keyTopics.length > 2 && (
                        <span className="text-[11px] text-emerald-800 font-semibold px-1 py-0.5">
                          +{resource.keyTopics.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* File Format & Size Details */}
                  <div className="flex items-center gap-3 text-xs text-stone-500 pt-2 border-t border-stone-100">
                    <span className="font-mono font-bold text-stone-700">
                      {resource.fileFormat}
                    </span>
                    <span>·</span>
                    <span>{resource.fileSize}</span>
                    <span>·</span>
                    <span>{resource.pages} Pages</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-5 mt-5 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setPreviewResource(resource)}
                    className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#064b36]" />
                    <span>Preview</span>
                  </button>

                  <button
                    onClick={() => handleDownload(resource)}
                    className="px-4 py-2 rounded-lg bg-[#064b36] hover:bg-[#042f28] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-300" />
                    <span>Get Resource</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Central Library Book Bank Notice */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#042f28] text-white border-2 border-amber-300/40 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                On-Campus Physical Book Bank
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                Prefer Physical Hardcover Textbooks?
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
                Under the Sindh College Education Department Book Bank scheme, enrolled students can borrow complete textbook sets for the full academic year free of cost from the Central Library on campus.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="#campus-tour"
                className="px-4 py-2.5 bg-[#063f35] hover:bg-[#084f42] text-amber-200 rounded-lg text-xs font-semibold border border-amber-300/30 text-center"
              >
                View Library on Campus Tour
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-lg text-xs font-bold text-center"
              >
                Inquire with Library Desk
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Resource In-App Preview Modal */}
      {previewResource && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreviewResource(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-left border border-stone-200 max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {previewResource.subject} · {previewResource.level}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#064b36] mt-1">
                  {previewResource.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Published by {previewResource.publisher} ({previewResource.year})
                </p>
              </div>

              <button
                onClick={() => setPreviewResource(null)}
                className="text-stone-400 hover:text-stone-800 p-1.5 rounded-lg"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Specs */}
            <div className="grid grid-cols-3 gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center text-xs">
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Format</span>
                <span className="font-bold text-stone-900">{previewResource.fileFormat}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold">File Size</span>
                <span className="font-bold text-stone-900">{previewResource.fileSize}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Total Pages</span>
                <span className="font-bold text-stone-900">{previewResource.pages} Pages</span>
              </div>
            </div>

            {/* Document Overview */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-1">
                Resource Summary &amp; Scope:
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {previewResource.description}
              </p>
            </div>

            {/* Key Curriculum Breakdown */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-2">
                Included Chapters &amp; Examination Modules:
              </h4>
              <div className="space-y-2">
                {previewResource.keyTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Note */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Faculty Study Recommendation:</strong> Review past papers alongside textbook chapter reviews. For practical sciences, ensure you consult the official experiment diagrams and calculations.
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-500">Government Girls Zubaida College Digital Repository</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewResource(null)}
                  className="px-4 py-2 border border-stone-300 hover:bg-stone-100 rounded-lg font-medium text-stone-700"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => {
                    handleDownload(previewResource);
                    setPreviewResource(null);
                  }}
                  className="px-5 py-2 bg-[#064b36] hover:bg-[#042f28] text-white rounded-lg font-bold flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>Download File ({previewResource.fileSize})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
