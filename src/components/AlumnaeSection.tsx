import React, { useState, useEffect } from 'react';
import { ALUMNAE_PROFILES, ALUMNAE_IMPACT_METRICS, AlumnaProfile } from '../data/alumnaeData';
import {
  HeartHandshake,
  ArrowRight,
  X,
  CheckCircle2,
  BookOpen,
  ExternalLink,
  Send,
  Plus,
  Trash2,
  Upload,
  Copy,
  Check
} from 'lucide-react';

const DEV_ALUMNAE_STORAGE_KEY = 'zubaida_dev_custom_alumnae_v1';

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

  // DEV-only: Add More Alumnae (completely hidden in production/live builds)
  const [devAlumnae, setDevAlumnae] = useState<AlumnaProfile[]>(() => {
    if (!import.meta.env.DEV) return [];
    try {
      const saved = localStorage.getItem(DEV_ALUMNAE_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as AlumnaProfile[]) : [];
    } catch {
      return [];
    }
  });
  const [isAddDevModalOpen, setIsAddDevModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<AlumnaProfile['category']>('Public Service & Media');
  const [newStream, setNewStream] = useState('');
  const [newAttendance, setNewAttendance] = useState('');
  const [newAssociationRole, setNewAssociationRole] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newOrganization, setNewOrganization] = useState('');
  const [newBadge, setNewBadge] = useState('');
  const [newRolesText, setNewRolesText] = useState('');
  const [newStory, setNewStory] = useState('');
  const [newLegacyNote, setNewLegacyNote] = useState('');
  const [newPhoto, setNewPhoto] = useState('');
  const [newRefLabel, setNewRefLabel] = useState('');
  const [newRefUrl, setNewRefUrl] = useState('');

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    try {
      localStorage.setItem(DEV_ALUMNAE_STORAGE_KEY, JSON.stringify(devAlumnae));
    } catch {
      // Ignore storage quota errors in dev
    }
  }, [devAlumnae]);

  const categories = [
    { id: 'all', label: 'All Distinguished Alumnae' },
    { id: 'Public Service & Media', label: 'Public Service & Media' },
    { id: 'Law Enforcement & Administration', label: 'Law Enforcement & Rights' },
    { id: 'Academia & Literature', label: 'Academia & Literature' },
    { id: 'Poetry & Human Rights', label: 'Poetry & Human Rights' }
  ];

  const allVisibleAlumnae = import.meta.env.DEV
    ? [...ALUMNAE_PROFILES, ...devAlumnae]
    : ALUMNAE_PROFILES;

  const filteredAlumnae =
    activeCategory === 'all'
      ? allVisibleAlumnae
      : allVisibleAlumnae.filter((a) => a.category === activeCategory);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinName.trim() || !joinEmail.trim()) return;
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

  const resetAddDevForm = () => {
    setNewName('');
    setNewCategory('Public Service & Media');
    setNewStream('');
    setNewAttendance('');
    setNewAssociationRole('');
    setNewRole('');
    setNewOrganization('');
    setNewBadge('');
    setNewRolesText('');
    setNewStory('');
    setNewLegacyNote('');
    setNewPhoto('');
    setNewRefLabel('');
    setNewRefUrl('');
    setIsAddDevModalOpen(false);
  };

  const handleDevPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddDevAlumna = (e: React.FormEvent) => {
    e.preventDefault();
    if (!import.meta.env.DEV) return;
    if (!newName.trim() || !newRole.trim()) return;

    const parsedRoles = newRolesText
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);

    const slug = newName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const profile: AlumnaProfile = {
      id: `dev-${slug || 'alumna'}-${Date.now()}`,
      name: newName.trim(),
      photo: newPhoto.trim() || '/assets/aistudio/college-logo_075efbff.jpg',
      photoFit: 'contain',
      documentedAttendance:
        newAttendance.trim() || 'Confirmed Alumna of Government Girls Zubaida College, Hyderabad',
      stream: newStream.trim() || 'Graduate · Zubaida Girls College',
      ...(newAssociationRole.trim() ? { associationRole: newAssociationRole.trim() } : {}),
      role: newRole.trim(),
      rolesList: parsedRoles.length > 0 ? parsedRoles : [newRole.trim()],
      organization: newOrganization.trim() || 'Government Girls Zubaida College Alumnae',
      category: newCategory,
      achievementBadge: newBadge.trim() || 'Distinguished Zubeidian Alumna',
      summaryHighlight:
        newStory.trim() || `${newName.trim()} — ${newRole.trim()}.`,
      story:
        newStory.trim() ||
        `${newName.trim()} is an accomplished alumna of Government Girls Zubaida College, Hyderabad, serving as ${newRole.trim()}.`,
      legacyNote:
        newLegacyNote.trim() ||
        'Inspiring current students of Government Girls Zubaida College through leadership and public service.',
      keyCareerHighlights:
        parsedRoles.length > 0
          ? parsedRoles
          : [
              newAttendance.trim() || 'Alumna of Government Girls Zubaida College, Hyderabad',
              newRole.trim()
            ],
      referenceLinks: newRefUrl.trim()
        ? [{ label: newRefLabel.trim() || 'Reference Profile', url: newRefUrl.trim() }]
        : []
    };

    setDevAlumnae((prev) => [...prev, profile]);
    resetAddDevForm();
  };

  const handleDeleteDevAlumna = (id: string) => {
    if (!import.meta.env.DEV) return;
    setDevAlumnae((prev) => prev.filter((item) => item.id !== id));
    if (selectedAlumna?.id === id) {
      setSelectedAlumna(null);
    }
  };

  const handleCopyDevEntry = async (alumna: AlumnaProfile) => {
    if (!import.meta.env.DEV) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(alumna, null, 2));
      setCopiedId(alumna.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Ignore clipboard failures
    }
  };

  return (
    <section id="alumnae" className="py-16 sm:py-24 bg-white text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            Distinguished Alumnae
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Celebrating iconic graduates of Government Girls Zubaida College Hyderabad whose achievements shaped Pakistani literature, higher education, broadcasting, and parliamentary leadership.
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
          {filteredAlumnae.map((alumna) => {
            const isDevDraft = import.meta.env.DEV && alumna.id.startsWith('dev-');
            return (
            <div
              key={alumna.id}
              className={`rounded-2xl bg-stone-50 border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group ${
                isDevDraft
                  ? 'border-dashed border-amber-500 ring-1 ring-amber-300/60'
                  : 'border-stone-200 hover:border-emerald-300'
              }`}
            >
              <div>
                {/* Full Portrait Photo Frame (no cropping) */}
                <div className="relative h-96 sm:h-[420px] bg-[#f8f3e6] overflow-hidden border-b border-stone-200 flex items-center justify-center p-2">
                  <img
                    src={alumna.photo}
                    alt={alumna.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3.5 text-left">
                  <div>
                    {isDevDraft && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-0.5">
                        Dev Draft · Hidden Live
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                      {alumna.category} · {alumna.stream}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#064b36] mt-0.5 leading-snug">
                      {alumna.name}
                    </h3>
                    {alumna.associationRole && (
                      <p className="text-xs font-bold text-amber-800 mt-0.5">
                        {alumna.associationRole}
                      </p>
                    )}
                  </div>

                  {/* Documented Attendance Badge */}
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">
                      College Attendance Documented
                    </span>
                    <span>{alumna.documentedAttendance}</span>
                  </div>

                  {/* Key Roles List */}
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {alumna.rolesList.map((roleItem) => (
                      <li key={roleItem} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#064b36] shrink-0 mt-0.5" />
                        <span className="font-medium text-stone-800">{roleItem}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Key Distinction */}
                  <p className="text-xs font-bold text-amber-800">
                    {alumna.achievementBadge}
                  </p>

                  {/* Summary Highlight */}
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {alumna.summaryHighlight}
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-6 py-4 bg-white border-t border-stone-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedAlumna(alumna)}
                  className="text-xs font-bold text-[#064b36] hover:text-emerald-700 flex items-center gap-1.5 group/btn"
                >
                  <span>Biography &amp; Achievements</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2">
                  {isDevDraft && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCopyDevEntry(alumna)}
                        className="p-1.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700"
                        title="Copy entry JSON for alumnaeData.ts"
                      >
                        {copiedId === alumna.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDevAlumna(alumna.id)}
                        className="p-1.5 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700"
                        title="Remove draft alumna"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                  {alumna.referenceLinks[0] && (
                    <a
                      href={alumna.referenceLinks[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-stone-500 hover:text-[#064b36] flex items-center gap-1"
                    >
                      <span>Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* DEV-ONLY Section: Add More Alumnae (Hidden in Live / Production Build) */}
        {import.meta.env.DEV && (
          <div className="mt-12 p-6 sm:p-8 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50/70 text-left shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                  Dev Only · Not Visible on Live Site
                </p>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#064b36]">
                  Add More Distinguished Alumnae (Draft Workspace)
                </h3>
                <p className="text-xs text-stone-700 max-w-2xl leading-relaxed">
                  Use this private development section to draft and preview new alumnae profiles locally ({devAlumnae.length} draft{devAlumnae.length === 1 ? '' : 's'} saved). This entire panel and any local drafts are automatically stripped out when built for live production.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddDevModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-[#064b36] hover:bg-[#042f28] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 active:scale-95 flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Add More Alumnae</span>
              </button>
            </div>
          </div>
        )}

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
            {/* Modal Header with Photo */}
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <img
                  src={selectedAlumna.photo}
                  alt={selectedAlumna.name}
                  referrerPolicy="no-referrer"
                  className="w-32 h-40 sm:w-36 sm:h-48 rounded-xl object-contain border-2 border-amber-300 shadow-md shrink-0 bg-[#f8f3e6] p-1"
                />
                <div>
                  <div className="text-xs text-[#064b36] font-bold mb-1">
                    {selectedAlumna.stream}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#064b36]">
                    {selectedAlumna.name}
                  </h3>
                  {selectedAlumna.associationRole && (
                    <p className="text-xs font-bold text-amber-800 mt-1">
                      {selectedAlumna.associationRole}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm font-semibold text-stone-800 mt-1">
                    {selectedAlumna.role}
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {selectedAlumna.organization}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAlumna(null)}
                className="text-stone-400 hover:text-stone-800 p-1.5 rounded-lg shrink-0"
                aria-label="Close alumna modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Key Distinction */}
            <p className="text-xs font-bold text-amber-800">
              {selectedAlumna.achievementBadge}
            </p>

            {/* Documented Attendance */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                College Attendance Documented:
              </span>
              <p className="text-sm font-semibold text-[#064b36]">
                {selectedAlumna.documentedAttendance}
              </p>
            </div>

            {/* Biography */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-2">
                Biography &amp; Achievements:
              </h4>
              <p className="text-sm text-stone-700 leading-relaxed">
                {selectedAlumna.story}
              </p>
            </div>

            {/* Career Milestones */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-2">
                Key Highlights &amp; Public Contributions:
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

            {/* Legacy Note */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>National Recognition &amp; Legacy:</span>
              </div>
              <p className="text-xs text-stone-800 leading-relaxed font-medium">
                {selectedAlumna.legacyNote}
              </p>
            </div>

            {/* Reference Links & Close */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                {selectedAlumna.referenceLinks.map((refLink) => (
                  <a
                    key={refLink.url}
                    href={refLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#064b36] font-semibold transition-colors"
                  >
                    <span>{refLink.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
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
                    placeholder={import.meta.env.DEV ? 'e.g. Dr. Hina Memon' : undefined}
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
                      placeholder={import.meta.env.DEV ? 'e.g. 2004 or 2018' : undefined}
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
                      placeholder={import.meta.env.DEV ? 'alumna@example.com' : undefined}
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
                    placeholder={import.meta.env.DEV ? 'e.g. Assistant Professor, LUMHS or Civil Judge' : undefined}
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
                    placeholder={import.meta.env.DEV ? "Share any special memories or areas you'd like to support (optional)..." : undefined}
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

      {/* DEV-ONLY Modal: Add More Alumnae (Stripped from Live / Production Build) */}
      {import.meta.env.DEV && isAddDevModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={resetAddDevForm}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-left border-2 border-amber-400 relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={resetAddDevForm}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              aria-label="Close add alumna modal"
            >
              <X className="w-6 h-6" />
            </button>

            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-900 mb-1.5">
              Dev-Only Draft Form · Hidden Live
            </p>

            <h3 className="font-serif text-2xl font-bold text-[#064b36] mb-1">
              Add Distinguished Alumna Profile
            </h3>
            <p className="text-xs text-stone-600 mb-6">
              Preview how a new alumna card looks in the directory. Copy its JSON afterward to save permanently into data when ready to publish.
            </p>

            <form onSubmit={handleAddDevAlumna} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Dr. Noor Jehan"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as AlumnaProfile['category'])}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36] bg-white"
                  >
                    <option value="Public Service & Media">Public Service &amp; Media</option>
                    <option value="Law Enforcement & Administration">Law Enforcement &amp; Administration</option>
                    <option value="Academia & Literature">Academia &amp; Literature</option>
                    <option value="Poetry & Human Rights">Poetry &amp; Human Rights</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Degree / Stream at College
                  </label>
                  <input
                    type="text"
                    value={newStream}
                    onChange={(e) => setNewStream(e.target.value)}
                    placeholder="e.g. B.Sc · Zubaida Girls College"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Documented Attendance Note
                  </label>
                  <input
                    type="text"
                    value={newAttendance}
                    onChange={(e) => setNewAttendance(e.target.value)}
                    placeholder="e.g. Completed B.Sc from Zubaida College"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Primary Profession / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. Professor & Vice Chancellor"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Organization / Institution
                  </label>
                  <input
                    type="text"
                    value={newOrganization}
                    onChange={(e) => setNewOrganization(e.target.value)}
                    placeholder="e.g. University of Sindh"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Achievement Badge
                  </label>
                  <input
                    type="text"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    placeholder="e.g. Pride of Performance"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Alumnae Association Role (Optional)
                  </label>
                  <input
                    type="text"
                    value={newAssociationRole}
                    onChange={(e) => setNewAssociationRole(e.target.value)}
                    placeholder="e.g. Member, Executive Committee"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Portrait Photo (Upload File or Paste Path/URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newPhoto}
                    onChange={(e) => setNewPhoto(e.target.value)}
                    placeholder="/assets/alumnae/photo.jpg"
                    className="flex-1 px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                  <label className="px-4 py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-semibold cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDevPhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Key Highlights (one per line)
                </label>
                <textarea
                  rows={2}
                  value={newRolesText}
                  onChange={(e) => setNewRolesText(e.target.value)}
                  placeholder="Educationist & scholar&#10;Published researcher"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Biography &amp; Achievements
                </label>
                <textarea
                  rows={3}
                  value={newStory}
                  onChange={(e) => setNewStory(e.target.value)}
                  placeholder="Short documented story and achievements..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Legacy Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={newLegacyNote}
                    onChange={(e) => setNewLegacyNote(e.target.value)}
                    placeholder="National recognition or legacy summary..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Reference Link (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newRefLabel}
                      onChange={(e) => setNewRefLabel(e.target.value)}
                      placeholder="Label"
                      className="w-28 px-2.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                    />
                    <input
                      type="url"
                      value={newRefUrl}
                      onChange={(e) => setNewRefUrl(e.target.value)}
                      placeholder="https://..."
                      className="flex-1 px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetAddDevForm}
                  className="px-4 py-2.5 rounded-lg border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#064b36] hover:bg-[#042f28] text-white font-bold shadow flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Add Draft Alumna</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
