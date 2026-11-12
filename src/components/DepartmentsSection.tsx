import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DEPARTMENTS_DATA, Department, DepartmentPhoto } from '../data/departmentsData';
import {
  Building2,
  Search,
  FlaskConical,
  GraduationCap,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Layers,
  ChevronRight,
  Camera,
  Upload,
  Plus,
  Image as ImageIcon,
  Trash2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface DepartmentsSectionProps {
  onOpenEnquiry?: () => void;
}

export function DepartmentsSection({ onOpenEnquiry }: DepartmentsSectionProps) {
  const [activeFaculty, setActiveFaculty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  // Custom user-uploaded photos stored in localStorage keyed by department ID
  const [customPhotos, setCustomPhotos] = useState<Record<string, DepartmentPhoto[]>>(() => {
    try {
      const saved = localStorage.getItem('ggzc_department_custom_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // State for adding a new photo in modal
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<'lab' | 'faculty' | 'apparatus' | 'seminar' | 'classroom'>('lab');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save to localStorage when custom photos change
  useEffect(() => {
    try {
      localStorage.setItem('ggzc_department_custom_photos', JSON.stringify(customPhotos));
    } catch {
      // Storage quota or disabled
    }
  }, [customPhotos]);

  const faculties = [
    { id: 'all', label: 'All Departments' },
    { id: 'Sciences & Computing', label: 'Sciences & Computing' },
    { id: 'Life Sciences', label: 'Life Sciences' },
    { id: 'Commerce & Economics', label: 'Commerce & Economics' },
    { id: 'Languages & Literature', label: 'Languages & Literature' },
    { id: 'Humanities & Social Sciences', label: 'Humanities & Social Sciences' }
  ];

  const filteredDepartments = useMemo(() => {
    return DEPARTMENTS_DATA.filter((dept) => {
      const matchesFaculty =
        activeFaculty === 'all' || dept.faculty === activeFaculty;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dept.name.toLowerCase().includes(q) ||
        dept.faculty.toLowerCase().includes(q) ||
        dept.description.toLowerCase().includes(q) ||
        dept.keyCourses.some((c) => c.toLowerCase().includes(q)) ||
        dept.facilities.some((f) => f.toLowerCase().includes(q)) ||
        dept.programsServed.some((p) => p.toLowerCase().includes(q));

      return matchesFaculty && matchesSearch;
    });
  }, [activeFaculty, searchQuery]);

  // Merge default photos with any custom photos uploaded for selected department
  const currentDeptPhotos = useMemo(() => {
    if (!selectedDept) return [];
    const custom = customPhotos[selectedDept.id] || [];
    return [...custom, ...selectedDept.photos];
  }, [selectedDept, customPhotos]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDept) return;

    const trimmedUrl = newPhotoUrl.trim();
    if (!trimmedUrl) return;

    const newPhoto: DepartmentPhoto = {
      id: `photo-${Date.now()}`,
      title: newPhotoTitle.trim() || `${selectedDept.name} Photo`,
      category: newPhotoCategory,
      caption: newPhotoCaption.trim() || 'Uploaded department photograph.',
      imageUrl: trimmedUrl
    };

    setCustomPhotos((prev) => ({
      ...prev,
      [selectedDept.id]: [newPhoto, ...(prev[selectedDept.id] || [])]
    }));

    // Reset form
    setNewPhotoTitle('');
    setNewPhotoCaption('');
    setNewPhotoUrl('');
    setIsAddingPhoto(false);
  };

  const handleDeletePhoto = (photoId: string) => {
    if (!selectedDept) return;
    setCustomPhotos((prev) => ({
      ...prev,
      [selectedDept.id]: (prev[selectedDept.id] || []).filter((p) => p.id !== photoId)
    }));
  };

  return (
    <section id="departments" className="py-16 sm:py-24 bg-[#fbfdfa] text-stone-900 relative border-t border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-bold tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5 text-emerald-800" />
            <span>Academic Faculties &amp; Chairs</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            Academic Departments
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Dedicated faculties delivering specialized instruction across biological sciences, physical sciences, computing, commerce, regional languages, Islamic learning, and humanities since 1953.
          </p>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="bg-white rounded-xl p-4 border border-emerald-800/15 shadow-sm text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#064b36]">20</div>
            <div className="text-xs text-stone-600 font-medium mt-0.5">Distinct Academic Departments</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-emerald-800/15 shadow-sm text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-600">8+</div>
            <div className="text-xs text-stone-600 font-medium mt-0.5">Specialized Labs &amp; Suites</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-emerald-800/15 shadow-sm text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">100%</div>
            <div className="text-xs text-stone-600 font-medium mt-0.5">SPSC Merit Qualified Faculty</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-emerald-800/15 shadow-sm text-center">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#064b36]">4-Yr &amp; 2-Yr</div>
            <div className="text-xs text-stone-600 font-medium mt-0.5">University Degrees &amp; HSC</div>
          </div>
        </div>

        {/* Search & Faculty Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search departments (e.g., Mathematics, Statistics, Botany, Zoology, Urdu, Sindhi, Islamiat, Physiology, Economics)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-stone-50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Result Count */}
            <div className="text-xs text-stone-500 font-medium shrink-0 self-center">
              Showing <span className="font-bold text-[#064b36]">{filteredDepartments.length}</span> of {DEPARTMENTS_DATA.length} departments
            </div>
          </div>

          {/* Faculty Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
            {faculties.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFaculty(f.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFaculty === f.id
                    ? 'bg-[#064b36] text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Departments Cards Grid - Styled consistently in the signature emerald gradient */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredDepartments.map((dept) => {
            const customCount = (customPhotos[dept.id] || []).length;
            const totalPhotos = dept.photos.length + customCount;

            return (
              <div
                key={dept.id}
                className="rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border bg-gradient-to-b from-[#064b36] to-[#042f28] text-white border-amber-400/40 hover:border-amber-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Faculty badge & Achievement badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-300 text-emerald-950">
                      {dept.faculty}
                    </span>
                    {dept.badge && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-[#03241e] px-2 py-0.5 rounded border border-amber-400/30">
                        <Award className="w-3.5 h-3.5 text-amber-300" />
                        {dept.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Lab location */}
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-300 leading-tight">
                      {dept.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-200 mt-1 font-medium">
                      <FlaskConical className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{dept.labsAvailable}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm leading-relaxed text-stone-200">
                    {dept.description}
                  </p>

                  {/* Programs served */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider block mb-1 text-amber-200">
                      Academic Streams Served:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.programsServed.map((prog) => (
                        <span
                          key={prog}
                          className="text-[11px] px-2 py-0.5 rounded border bg-[#03241e] border-emerald-700 text-stone-200"
                        >
                          {prog}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Courses Sample */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider block mb-1 text-amber-200">
                      Key Curricular Subjects:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.keyCourses.slice(0, 3).map((course) => (
                        <span
                          key={course}
                          className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-100"
                        >
                          {course}
                        </span>
                      ))}
                      {dept.keyCourses.length > 3 && (
                        <span className="text-[11px] px-2 py-0.5 rounded text-amber-300 font-semibold">
                          +{dept.keyCourses.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-6 mt-6 border-t border-emerald-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      setSelectedDept(dept);
                      setIsAddingPhoto(false);
                    }}
                    className="text-xs font-bold flex items-center gap-1.5 transition-colors text-amber-300 hover:text-white"
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-300" />
                    <span>Lab &amp; Faculty Details ({totalPhotos} Photos)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenEnquiry) {
                        onOpenEnquiry();
                      } else {
                        const el = document.querySelector('#contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-[11px] px-3 py-1.5 rounded font-semibold bg-amber-400 hover:bg-amber-300 text-emerald-950 transition-colors shadow-sm"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Fallback */}
        {filteredDepartments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
            <Layers className="w-10 h-10 text-stone-400 mx-auto" />
            <h4 className="font-serif font-bold text-lg text-stone-800">
              No matching departments found
            </h4>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              We couldn&rsquo;t find any department matching &ldquo;{searchQuery}&rdquo;. Try searching for general terms like &ldquo;Mathematics&rdquo;, &ldquo;Statistics&rdquo;, &ldquo;Botany&rdquo;, &ldquo;Zoology&rdquo;, &ldquo;Urdu&rdquo;, &ldquo;Sindhi&rdquo;, &ldquo;Physiology&rdquo;, or &ldquo;Economics&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFaculty('all');
              }}
              className="px-4 py-2 bg-[#064b36] text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Department Infrastructure Notice */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#064b36] via-[#053d2c] to-[#042f28] text-white border-2 border-amber-300/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Sindh Public Service Commission Qualified Faculty
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Want to speak with a Department Head or Course Counselor?
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 max-w-2xl">
              Faculty members are available during official college hours (8:00 AM – 2:00 PM PKT, Mon–Sat) for academic counseling, syllabus guidance, and stream selection.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onOpenEnquiry && (
              <button
                onClick={onOpenEnquiry}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Contact Department</span>
              </button>
            )}
            <a
              href="#admissions"
              className="px-4 py-2.5 rounded-xl bg-[#03241e] hover:bg-[#021f19] border border-amber-400/40 text-amber-200 text-xs font-semibold transition-colors"
            >
              SECCAP Guide
            </a>
          </div>
        </div>
      </div>

      {/* Department Detail Modal with Interactive Photos Showcase */}
      {selectedDept && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => {
            setSelectedDept(null);
            setIsAddingPhoto(false);
          }}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl text-left border border-stone-300 max-h-[92vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    {selectedDept.faculty}
                  </span>
                  {selectedDept.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                      {selectedDept.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#064b36] mt-1">
                  {selectedDept.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Faculty Leadership: <strong className="text-stone-700">{selectedDept.headOrLead}</strong>
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedDept(null);
                  setIsAddingPhoto(false);
                }}
                className="text-stone-400 hover:text-stone-800 p-1.5 rounded-lg text-lg font-bold"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Department Photos & Laboratory Gallery Showcase */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#064b36] to-[#042f28] text-white border border-amber-400/40 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-300" />
                  <h4 className="font-serif font-bold text-base text-amber-300">
                    Department &amp; Laboratory Photos
                  </h4>
                  <span className="text-xs bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700 text-stone-200">
                    {currentDeptPhotos.length} Available
                  </span>
                </div>

                <button
                  onClick={() => setIsAddingPhoto(!isAddingPhoto)}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingPhoto ? 'Cancel Add Photo' : 'Add / Upload Department Photo'}</span>
                </button>
              </div>

              {/* Add Photo Form (Supports direct image file upload or URL) */}
              {isAddingPhoto && (
                <form onSubmit={handleSavePhoto} className="mb-5 p-4 rounded-xl bg-[#03241e] border border-amber-400/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      Upload Photo for {selectedDept.name}
                    </span>
                    <span className="text-[11px] text-stone-300">
                      Supports direct upload or image URL
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                        Photo Title:
                      </label>
                      <input
                        type="text"
                        value={newPhotoTitle}
                        onChange={(e) => setNewPhotoTitle(e.target.value)}
                        placeholder="e.g., Zoology Research Microscope Suite"
                        className="w-full px-3 py-1.5 text-xs rounded bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                        Photo Category:
                      </label>
                      <select
                        value={newPhotoCategory}
                        onChange={(e) => setNewPhotoCategory(e.target.value as any)}
                        className="w-full px-3 py-1.5 text-xs rounded bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                      >
                        <option value="lab">Laboratory &amp; Practical Hall</option>
                        <option value="faculty">Faculty &amp; Demonstration</option>
                        <option value="apparatus">Equipment &amp; Apparatus</option>
                        <option value="seminar">Seminar &amp; Study Room</option>
                        <option value="classroom">Classroom &amp; Lecture Hall</option>
                      </select>
                    </div>
                  </div>

                  {/* File Upload OR URL Option */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-semibold text-emerald-200">
                      Select Photo from Device or Paste Image URL:
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-2 bg-[#064b36] hover:bg-[#053d2c] border border-amber-400/40 text-amber-200 text-xs font-semibold rounded flex items-center justify-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-300" />
                        <span>Choose Photo File...</span>
                      </button>

                      <span className="text-xs text-stone-400 self-center">or</span>

                      <input
                        type="text"
                        value={newPhotoUrl}
                        onChange={(e) => setNewPhotoUrl(e.target.value)}
                        placeholder="Paste image URL or /assets/... path"
                        className="flex-1 px-3 py-1.5 text-xs rounded bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                        required
                      />
                    </div>

                    {/* Thumbnail Preview */}
                    {newPhotoUrl && (
                      <div className="mt-2 flex items-center gap-3 p-2 bg-[#021814] rounded border border-emerald-800">
                        <img
                          src={newPhotoUrl}
                          alt="Upload preview"
                          className="w-16 h-12 object-cover rounded border border-amber-400/40"
                        />
                        <span className="text-[11px] text-emerald-200">
                          Photo ready to display in department gallery
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                      Short Caption / Description:
                    </label>
                    <input
                      type="text"
                      value={newPhotoCaption}
                      onChange={(e) => setNewPhotoCaption(e.target.value)}
                      placeholder="Brief note about the equipment or department facility..."
                      className="w-full px-3 py-1.5 text-xs rounded bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddingPhoto(false)}
                      className="px-3 py-1.5 text-xs text-stone-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded shadow"
                    >
                      Save Photo to Department
                    </button>
                  </div>
                </form>
              )}

              {/* Photo Showcase Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {currentDeptPhotos.map((photo) => {
                  const isCustom = (customPhotos[selectedDept.id] || []).some((p) => p.id === photo.id);

                  return (
                    <div
                      key={photo.id}
                      className="bg-[#021d17] rounded-xl overflow-hidden border border-emerald-800/80 flex flex-col justify-between group hover:border-amber-400/60 transition-all shadow-sm"
                    >
                      {/* Photo Image Area */}
                      <div className="relative aspect-video bg-[#04241d] overflow-hidden flex items-center justify-center">
                        {photo.imageUrl ? (
                          <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          // Default Department Photo Placeholder Ready for User's Upload
                          <div className="w-full h-full p-3 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#063f2f] to-[#021b14] border-b border-emerald-800">
                            <div className="w-10 h-10 rounded-full bg-emerald-900/80 border border-amber-400/40 flex items-center justify-center mb-1.5">
                              <ImageIcon className="w-5 h-5 text-amber-300" />
                            </div>
                            <span className="text-[11px] font-bold text-amber-200 line-clamp-1">
                              {photo.title}
                            </span>
                            <span className="text-[9px] text-emerald-300/80 uppercase tracking-wider mt-0.5">
                              Photo Slot · Ready for Upload
                            </span>
                          </div>
                        )}

                        {/* Category Tag Overlay */}
                        <div className="absolute top-2 left-2">
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-amber-300 border border-amber-400/30">
                            {photo.category}
                          </span>
                        </div>

                        {/* Delete button for user-uploaded photo */}
                        {isCustom && (
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="absolute top-2 right-2 p-1 rounded bg-rose-900/80 hover:bg-rose-700 text-rose-200 transition-colors"
                            title="Remove uploaded photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Photo Caption & Metadata */}
                      <div className="p-2.5 space-y-1">
                        <h5 className="font-bold text-xs text-white leading-tight">
                          {photo.title}
                        </h5>
                        <p className="text-[11px] text-stone-300 leading-normal line-clamp-2">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Informative helper note for user */}
              <div className="mt-3 pt-3 border-t border-emerald-800/80 flex items-center justify-between text-[11px] text-stone-300">
                <span className="flex items-center gap-1.5 text-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>You can upload real campus &amp; lab photos anytime using the &ldquo;Add / Upload Department Photo&rdquo; button above.</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-1">
                Department Overview:
              </h4>
              <p className="text-sm text-stone-600 leading-relaxed">
                {selectedDept.description}
              </p>
            </div>

            {/* Facilities & Lab Equipment */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4 text-emerald-700" />
                <span>Laboratories &amp; Technical Infrastructure:</span>
              </h4>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 mb-2">
                <span className="text-xs font-bold text-[#064b36] block">
                  Location / Suite: {selectedDept.labsAvailable}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedDept.facilities.map((fac) => (
                  <div
                    key={fac}
                    className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs text-stone-800 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Subjects & Curriculum */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>Curricular Subjects &amp; Practical Modules:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedDept.keyCourses.map((course) => (
                  <div
                    key={course}
                    className="p-2 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-800 flex items-center gap-2"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Programs Served */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-1">
                Academic Programs &amp; Streams Served:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDept.programsServed.map((prog) => (
                  <span
                    key={prog}
                    className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-md text-xs font-semibold"
                  >
                    {prog}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
              <span className="font-bold block text-emerald-900 mb-0.5">
                Institutional Distinctions &amp; Records:
              </span>
              <span>{selectedDept.achievements}</span>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  setSelectedDept(null);
                  setIsAddingPhoto(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                className="px-5 py-2.5 bg-[#064b36] hover:bg-[#042f28] text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Submit Department Inquiry</span>
              </button>

              <button
                onClick={() => {
                  setSelectedDept(null);
                  setIsAddingPhoto(false);
                }}
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
