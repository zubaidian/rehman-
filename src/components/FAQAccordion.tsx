import { useState, useMemo } from 'react';
import { DETAILED_FAQS, FAQItem } from '../data/faqData';
import {
  HelpCircle,
  Search,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Shirt,
  GraduationCap,
  Clock,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

interface FAQAccordionProps {
  onQuickInquire?: (topic: string) => void;
}

export function FAQAccordion({ onQuickInquire }: FAQAccordionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-seccap-process', 'faq-uniform-daily']));

  const categories = [
    { id: 'all', label: 'All Queries', icon: HelpCircle },
    { id: 'admissions', label: 'Admissions & SECCAP', icon: GraduationCap },
    { id: 'uniform', label: 'Uniform & Dress Code', icon: Shirt },
    { id: 'documents', label: 'Documentation Checklist', icon: FileCheck },
    { id: 'campus', label: 'Timings & Campus Life', icon: Clock }
  ];

  const filteredFaqs = useMemo(() => {
    return DETAILED_FAQS.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        (item.keyPoints && item.keyPoints.some((pt) => pt.toLowerCase().includes(q))) ||
        (item.importantNotice && item.importantNotice.toLowerCase().includes(q));

      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setOpenIds(new Set(filteredFaqs.map((f) => f.id)));
  };

  const handleCollapseAll = () => {
    setOpenIds(new Set());
  };

  return (
    <div id="faq" className="mt-20 pt-16 border-t border-stone-200">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#064b36]">
          Frequently Asked Questions
        </h3>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Clear answers and official guidelines regarding admissions, mandatory daily &amp; winter uniforms, required verification documents, and campus regulations.
        </p>
      </div>

      {/* Interactive Controls Bar: Category Tabs + Live Search + Expand/Collapse */}
      <div className="bg-stone-50 p-4 sm:p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4 mb-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              import.meta.env.DEV
                ? 'Search FAQs by topic (e.g. uniform, white qameez, documents, B-Form, marksheet, fee, timings)...'
                : 'Search FAQs by topic...'
            }
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36] bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills & Expand Toggles */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2 border-t border-stone-200">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-[#064b36] text-white shadow-sm'
                      : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto text-xs text-stone-600">
            <button
              onClick={handleExpandAll}
              className="hover:text-[#064b36] hover:underline font-semibold"
            >
              Expand All
            </button>
            <span>·</span>
            <button
              onClick={handleCollapseAll}
              className="hover:text-[#064b36] hover:underline font-semibold"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Questions List */}
      {filteredFaqs.length === 0 ? (
        <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-600 space-y-2">
          <HelpCircle className="w-10 h-10 text-stone-400 mx-auto" />
          <h4 className="font-bold text-sm text-stone-800">No matching questions found</h4>
          <p className="text-xs text-stone-500">
            We couldn&rsquo;t find an answer matching &ldquo;{searchQuery}&rdquo;. Try another keyword or submit an inquiry using our online form above.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-2 px-3 py-1.5 bg-[#064b36] text-white text-xs font-semibold rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.has(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-emerald-400 shadow-md ring-1 ring-emerald-400/30'
                    : 'bg-stone-50 hover:bg-white border-stone-200 hover:border-emerald-300'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      {faq.categoryLabel}
                    </span>
                    <h4 className="font-serif font-bold text-base sm:text-lg text-stone-900 leading-snug">
                      {faq.question}
                    </h4>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen
                        ? 'bg-emerald-100 text-[#064b36] rotate-180'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-700 border-t border-stone-100 space-y-3.5 animate-fadeIn">
                    <p className="leading-relaxed text-stone-800">{faq.answer}</p>

                    {/* Key Checklist / Points */}
                    {faq.keyPoints && faq.keyPoints.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#064b36] block">
                          Key Instructions &amp; Requirements:
                        </span>
                        <div className="space-y-1.5">
                          {faq.keyPoints.map((pt, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Important Alert Notice */}
                    {faq.importantNotice && (
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <strong>Official Notice:</strong> {faq.importantNotice}
                        </div>
                      </div>
                    )}

                    {/* Quick Inquiry Trigger */}
                    {onQuickInquire && (
                      <div className="pt-2 flex items-center justify-end">
                        <button
                          onClick={() => onQuickInquire(faq.categoryLabel)}
                          className="text-xs font-semibold text-[#064b36] hover:underline flex items-center gap-1"
                        >
                          <span>Ask a question about {faq.categoryLabel.toLowerCase()}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Still Have Questions? Banner */}
      <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-stone-100 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-serif font-bold text-base text-[#064b36]">
            Can&rsquo;t find your question answered here?
          </h4>
          <p className="text-xs text-stone-600 mt-0.5">
            Our admission officers and administrative staff are here to assist you during college working hours.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={`mailto:${COLLEGE_INFO.email}`}
            className="px-4 py-2 bg-[#064b36] hover:bg-[#042f28] text-white text-xs font-bold rounded-lg shadow-sm"
          >
            Email Administration
          </a>
          <a
            href="#contact"
            className="px-4 py-2 bg-white hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg border border-stone-300"
          >
            Submit Enquiry Form
          </a>
        </div>
      </div>
    </div>
  );
}
