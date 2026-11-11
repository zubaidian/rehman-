import React, { useState } from 'react';
import { ALUMNAE_PROFILES, ALUMNAE_IMPACT_METRICS, AlumnaProfile } from '../data/alumnaeData';
import {
  GraduationCap,
  Quote,
  Award,
  BookOpen,
  HeartHandshake,
  ArrowRight,
  X,
  CheckCircle2,
  Sparkles,
  Send
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

export function AlumnaeSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedAlumna, setSelectedAlumna] = useState<AlumnaProfile | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // Alumnae Join Form State
  const [joinName, setJoinName] = useState('');
  const [joinBatch, setJoinBatch] = useState('');
  const [joinProfession, setJoinProfession] = useState('');
  const [joinEmail, setJoinEmail] = useState('');
  const [joinMessage, setJoinMessage] = useState('');
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  const categories = [
    { id: 'all', label: 'All Fields' },
    { id: 'Medicine', label: 'Medicine & Healthcare' },
    { id: 'Technology', label: 'Tech & Engineering' },
    { id: 'Civil Services', label: 'Civil Services' },
    { id: 'Academia', label: 'Academia & Higher Ed' },
    { id: 'Research', label: 'Scientific Research' },
    { id: 'Law', label: 'Law & Human Rights' }
  ];

  const filteredAlumnae = activeCategory === 'all'
    ? ALUMNAE_PROFILES
    : ALUMNAE_PROFILES.filter(a => a.category === activeCategory);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinName || !joinEmail) return;
    setJoinSubmitted(true);
  };

  const resetJoinForm = () => {
    setJoinName('');
    setJoinBatch('');
    setJoinProfession('');
    setJoinEmail('');
    setJoinMessage('');
    setJoinSubmitted(false);
    setIsJoinModalOpen(false);
  };

  return (
    <section id="alumnae" className="py-16 sm:py-24 bg-white text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-[#064b36] text-xs font-bold tracking-wider uppercase">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-800" />
            <span>Zubeidian Pride · Generations of Impact</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            Alumnae Success Stories
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Meet the distinguished graduates of Government Girls Zubaida College who have transformed their education into national leadership across healthcare, technology, academia, and public administration.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#064b36] text-white shadow-md'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Alumnae Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlumnae.map((alumna) => (
            <div
              key={alumna.id}
              className="rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header Metadata */}
                <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-3">
                  <div className="text-xs text-stone-500 font-medium">
                    <span>{alumna.batchYear}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span className="text-emerald-800 font-semibold">{alumna.stream}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#064b36] text-[10px] font-bold uppercase tracking-wider">
                    {alumna.category}
                  </span>
                </div>

                {/* Profile Title & Current Role */}
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#064b36] group-hover:text-emerald-800 transition-colors">
                    {alumna.name}
                  </h3>
                  <p className="text-xs font-semibold text-stone-900 mt-1 leading-snug">
                    {alumna.role}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {alumna.organization}
                  </p>
                </div>

                {/* Achievement Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold">
                  <Award className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{alumna.achievementBadge}</span>
                </div>

                {/* Pull Quote */}
                <div className="relative pt-2 pl-3 border-l-2 border-amber-400/80">
                  <p className="font-serif italic text-xs sm:text-sm text-stone-700 leading-relaxed line-clamp-3">
                    &ldquo;{alumna.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-6 mt-6 border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => setSelectedAlumna(alumna)}
                  className="text-xs font-bold text-[#064b36] hover:text-emerald-700 flex items-center gap-1.5 group/btn"
                >
                  <span>Read Full Story &amp; Advice</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <span className="text-[10px] font-mono text-stone-400">
                  Alumna
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Alumnae Impact Metrics Bar */}
        <div className="mt-16 p-8 rounded-2xl bg-[#042f28] text-white border-2 border-amber-300/40 shadow-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-emerald-800/80">
            {ALUMNAE_IMPACT_METRICS.map((metric, idx) => (
              <div key={idx} className={idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}>
                <div className="font-serif font-bold text-3xl sm:text-4xl text-amber-300 tabular-nums">
                  {metric.value}
                </div>
                <div className="font-bold text-xs sm:text-sm text-white mt-1">
                  {metric.label}
                </div>
                <p className="text-xs text-emerald-200 mt-0.5">
                  {metric.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reconnect with Alma Mater CTA Box */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#064b36] to-[#042f28] text-white border border-amber-300/40 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                Are You a Graduate of Zubaida College?
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Reconnect with Your Alma Mater &amp; Inspire the Next Generation
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
                Join our official Zubeidian Alumnae Network to participate in guest lectures, career guidance mentorships for current students, and annual reunion assemblies.
              </p>
            </div>

            <button
              onClick={() => setIsJoinModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 active:scale-95 flex items-center gap-2"
            >
              <HeartHandshake className="w-4 h-4 text-emerald-950" />
              <span>Join Alumnae Directory</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alumna Profile Details Modal */}
      {selectedAlumna && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedAlumna(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-left border border-stone-200 max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <div className="text-xs text-stone-500 font-semibold mb-1">
                  <span>{selectedAlumna.batchYear}</span>
                  <span className="mx-1.5">·</span>
                  <span className="text-[#064b36] font-bold">{selectedAlumna.stream}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#064b36]">
                  {selectedAlumna.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-stone-800 mt-1">
                  {selectedAlumna.role}
                </p>
                <p className="text-xs text-stone-600">
                  {selectedAlumna.organization}
                </p>
              </div>

              <button
                onClick={() => setSelectedAlumna(null)}
                className="text-stone-400 hover:text-stone-800 p-1.5 rounded-lg"
                aria-label="Close alumna modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Achievement Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
              <Award className="w-4 h-4 text-amber-700" />
              <span>{selectedAlumna.achievementBadge}</span>
            </div>

            {/* Full Story */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-2">
                Journey from Zubaida College:
              </h4>
              <p className="text-sm text-stone-700 leading-relaxed">
                {selectedAlumna.story}
              </p>
            </div>

            {/* Quotation Highlight */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                Reflections on Alma Mater:
              </span>
              <p className="font-serif italic text-sm text-[#064b36] leading-relaxed">
                &ldquo;{selectedAlumna.quote}&rdquo;
              </p>
            </div>

            {/* Career Milestones */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-2">
                Notable Career Milestones:
              </h4>
              <div className="space-y-2">
                {selectedAlumna.keyCareerHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advice for Current Students */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Message &amp; Advice to Current Zubeidians:</span>
              </div>
              <p className="text-xs text-stone-800 leading-relaxed font-medium">
                &ldquo;{selectedAlumna.adviceToStudents}&rdquo;
              </p>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-serif">
                Government Girls Zubaida College Alumnae
              </span>
              <button
                onClick={() => setSelectedAlumna(null)}
                className="px-4 py-2 bg-[#064b36] hover:bg-[#042f28] text-white rounded-lg font-semibold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Alumnae Directory Modal */}
      {isJoinModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={resetJoinForm}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-left border border-stone-200 relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={resetJoinForm}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              aria-label="Close directory join modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-[#064b36]">
              <HeartHandshake className="w-5 h-5 text-amber-600" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Alumnae Registration
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#064b36] mb-1">
              Join the Zubeidian Alumnae Network
            </h3>
            <p className="text-xs text-stone-600 mb-6">
              Reconnect with your teachers, mentor current students, and stay informed on college reunions.
            </p>

            {joinSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-xl font-bold text-stone-900">
                  Welcome Back, {joinName}!
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                  Your graduation registration for the <strong>Class of {joinBatch || 'Zubaida College'}</strong> has been recorded. Our alumnae coordinator will contact you at <strong>{joinEmail}</strong>.
                </p>
                <button
                  onClick={resetJoinForm}
                  className="px-6 py-2.5 bg-[#064b36] text-white rounded-lg text-xs font-semibold"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={joinName}
                    onChange={(e) => setJoinName(e.target.value)}
                    placeholder="e.g. Dr. Hina Memon"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Passing / Graduation Year *
                    </label>
                    <input
                      type="text"
                      required
                      value={joinBatch}
                      onChange={(e) => setJoinBatch(e.target.value)}
                      placeholder="e.g. 2004 or 2018"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={joinEmail}
                      onChange={(e) => setJoinEmail(e.target.value)}
                      placeholder="alumna@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Current Profession / Organization
                  </label>
                  <input
                    type="text"
                    value={joinProfession}
                    onChange={(e) => setJoinProfession(e.target.value)}
                    placeholder="e.g. Assistant Professor, LUMHS or Civil Judge"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Would you like to mentor current students or deliver a guest lecture?
                  </label>
                  <textarea
                    rows={2}
                    value={joinMessage}
                    onChange={(e) => setJoinMessage(e.target.value)}
                    placeholder="Share any special memories or areas you'd like to support (optional)..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#064b36] hover:bg-[#042f28] text-white rounded-lg font-bold text-sm shadow transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Submit Registration</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
