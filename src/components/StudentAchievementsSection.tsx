import React, { useEffect, useState } from 'react';
import {
  AchievementCategory,
  FEATURED_STUDENT_ACHIEVEMENTS,
  StudentAchievementItem,
} from '../data/studentAchievementsData';
import { useFirebase } from '../contexts/FirebaseContext';
import {
  createStudentAchievement,
  deleteStudentAchievement,
  StudentAchievementRecord,
  subscribePublishedStudentAchievements,
} from '../services/collegeSubmissions';
import {
  Award,
  Calendar,
  Maximize2,
  Plus,
  Trash2,
  X,
  Lock,
  CheckCircle2,
} from 'lucide-react';

const CATEGORIES: ('All' | AchievementCategory)[] = [
  'All',
  'Board & Academic',
  'Co-Curricular & Religious',
  'Science & Computing',
  'Sports & Leadership',
];

export function StudentAchievementsSection() {
  const { isAdmin, user, signInWithGoogle } = useFirebase();
  const [activeCategory, setActiveCategory] = useState<'All' | AchievementCategory>('All');
  const [firestoreRecords, setFirestoreRecords] = useState<StudentAchievementRecord[]>([]);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);

  // Add Student Achievement Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [program, setProgram] = useState('');
  const [achievementTitle, setAchievementTitle] = useState('');
  const [category, setCategory] = useState<AchievementCategory>('Board & Academic');
  const [dateLabel, setDateLabel] = useState('2026');
  const [metric, setMetric] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const unsub = subscribePublishedStudentAchievements(
      (items) => setFirestoreRecords(items),
      (err) => {
        console.error('Failed loading student achievements:', err.message);
      }
    );
    return () => unsub();
  }, []);

  const dynamicItems: StudentAchievementItem[] = firestoreRecords.map((rec) => ({
    id: rec.id,
    studentName: rec.studentName,
    program: rec.program,
    achievementTitle: rec.achievementTitle,
    category: rec.category,
    dateLabel: rec.dateLabel,
    metric: rec.metric,
    details: rec.details,
    source: 'firestore',
  }));

  const allAchievements = [...dynamicItems, ...FEATURED_STUDENT_ACHIEVEMENTS];
  const filteredAchievements =
    activeCategory === 'All'
      ? allAchievements
      : allAchievements.filter((item) => item.category === activeCategory);

  const resetForm = () => {
    setStudentName('');
    setProgram('');
    setAchievementTitle('');
    setCategory('Board & Academic');
    setDateLabel('2026');
    setMetric('');
    setDetails('');
    setSubmitError('');
    setIsAddModalOpen(false);
  };

  const handleOpenAdd = async () => {
    setAuthError('');
    if (!user) {
      try {
        await signInWithGoogle();
      } catch (err) {
        setAuthError(
          err instanceof Error ? err.message : 'Unable to sign in with Google.'
        );
        return;
      }
    }
    setIsAddModalOpen(true);
  };

  const handleCreateAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !program.trim() || !achievementTitle.trim() || !details.trim()) {
      return;
    }

    setSubmitError('');
    setSubmitting(true);
    try {
      await createStudentAchievement({
        studentName,
        program,
        achievementTitle,
        category,
        dateLabel,
        metric,
        details,
      });
      resetForm();
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Unable to publish this achievement. Make sure you are signed in as zubaidaisbest@gmail.com.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStudentAchievement(id);
    } catch (err) {
      console.error('Delete achievement failed:', err);
    }
  };

  return (
    <section
      id="student-achievements"
      className="py-16 sm:py-24 bg-white text-stone-900 relative border-t border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            Student Achievements &amp; Roll of Honor
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Celebrating the academic distinctions, board positions, and district-level competitions won by students of Government Girls Zubaida College, Hyderabad.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#064b36] text-white shadow-md'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat === 'All' ? `All Achievements (${allAchievements.length})` : cat}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredAchievements.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl bg-[#042f28] text-white border-2 border-amber-300/40 shadow-xl overflow-hidden flex flex-col justify-between p-6 sm:p-8 text-left"
            >
              <div className="space-y-4">
                {/* Top Metadata Row (Plain Text, Zero Badges) */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/80 pb-3 text-xs">
                  <span className="font-bold uppercase tracking-wider text-amber-300">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-200 flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-amber-300" />
                      <span>{item.dateLabel}</span>
                    </span>
                    {isAdmin && item.source === 'firestore' && (
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-rose-300 hover:text-rose-200 hover:bg-rose-900/40 rounded"
                        title="Delete added student achievement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Student Header & Metric */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                      {item.studentName}
                    </h3>
                    <p className="text-sm font-semibold text-white">
                      {item.achievementTitle}
                    </p>
                    <p className="text-xs text-emerald-200 font-medium">
                      {item.program}
                    </p>
                    {(item.fatherOrGuardian || item.rollNumber) && (
                      <p className="text-xs text-stone-300 pt-0.5">
                        {[item.fatherOrGuardian, item.rollNumber].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>

                  {item.metric && (
                    <div className="bg-[#021f19] px-4 py-3 rounded-xl border border-amber-300/30 text-center shrink-0">
                      <span className="text-[10px] uppercase tracking-wider text-stone-300 block">
                        Distinction
                      </span>
                      <span className="font-serif font-bold text-lg text-amber-300 block mt-0.5">
                        {item.metric}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {item.details}
                </p>

                {/* Optional Verified Banner / Gazette Preview (Maryam Bibi) */}
                {item.image && (
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewImage({
                          src: item.image!,
                          title: `${item.studentName} — ${item.achievementTitle}`,
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white underline underline-offset-4"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Official Result Banner</span>
                    </button>

                    {item.secondaryImage && (
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewImage({
                            src: item.secondaryImage!,
                            title: item.secondaryImageTitle || 'Official Gazette Record',
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-200 hover:text-white underline underline-offset-4"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-300" />
                        <span>Inspect Official Board Gazette</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-emerald-800/80 flex items-center gap-2 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Verified Student Honor · Govt Girls Zubaida College Hyderabad</span>
              </div>
            </article>
          ))}
        </div>

        {/* Future Additions Bar (Saved in Cloud Firestore for Live Visibility) */}
        <div className="mt-10 p-6 sm:p-7 rounded-2xl bg-[#f8faf7] border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Administration Updates
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#064b36]">
              Add More Student Achievements
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
              {isAdmin
                ? 'Signed in as college administrator (zubaidaisbest@gmail.com). New achievements added here save to Firestore and publish live for all students and visitors.'
                : 'Authorized college administrators (zubaidaisbest@gmail.com) can sign in to publish new board positions, competition winners, and scholarship honors directly.'}
            </p>
            {authError && (
              <p className="text-xs text-rose-700 pt-1">{authError}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-3 rounded-xl bg-[#064b36] hover:bg-[#042f28] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 active:scale-95 flex items-center gap-2"
          >
            {isAdmin ? (
              <>
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Add Student Achievement</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-amber-300" />
                <span>Admin Sign In to Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add Student Achievement Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={resetForm}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl text-left border border-stone-200 relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={resetForm}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              aria-label="Close add achievement modal"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              Publish to Live Roll of Honor
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#064b36] mb-1">
              Add Student Achievement
            </h3>
            <p className="text-xs text-stone-600 mb-5">
              Entries saved here are stored permanently in Firestore and immediately displayed on the website.
            </p>

            {!isAdmin ? (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-2">
                <p>
                  Only the authorized college account (<strong>zubaidaisbest@gmail.com</strong>) can publish new student achievements.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateAchievement} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={120}
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Student full name"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Class / Department *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={120}
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      placeholder="e.g. Class XII Pre-Medical"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Achievement / Award Title *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={160}
                    value={achievementTitle}
                    onChange={(e) => setAchievementTitle(e.target.value)}
                    placeholder="e.g. 1st Position in Inter-Collegiate Science Quiz"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as AchievementCategory)}
                      className="w-full px-3 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36] bg-white"
                    >
                      <option value="Board & Academic">Board &amp; Academic</option>
                      <option value="Co-Curricular & Religious">Co-Curricular &amp; Religious</option>
                      <option value="Science & Computing">Science &amp; Computing</option>
                      <option value="Sports & Leadership">Sports &amp; Leadership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Date / Year *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={60}
                      value={dateLabel}
                      onChange={(e) => setDateLabel(e.target.value)}
                      placeholder="e.g. October 2026"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Marks / Rank (Optional)
                    </label>
                    <input
                      type="text"
                      maxLength={80}
                      value={metric}
                      onChange={(e) => setMetric(e.target.value)}
                      placeholder="e.g. 1st Position"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Achievement Details *
                  </label>
                  <textarea
                    rows={3}
                    required
                    maxLength={1500}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Describe the competition, exam, board, or recognition..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-2.5 rounded-lg">
                    {submitError}
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2.5 rounded-lg border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 rounded-lg bg-[#064b36] hover:bg-[#042f28] text-white font-bold shadow flex items-center gap-1.5 disabled:opacity-60"
                  >
                    <Plus className="w-4 h-4 text-amber-300" />
                    <span>{submitting ? 'Saving...' : 'Publish Achievement'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Result Banner / Gazette Lightbox */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl p-4 text-center border border-stone-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-left">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {previewImage.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
                aria-label="Close image dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 max-h-[75vh] overflow-auto flex items-center justify-center">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
