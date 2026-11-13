import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  COLLEGE_LIBRARY_INFO,
  DEFAULT_LIBRARY_PHOTO_SLOTS,
  LibraryPhotoItem,
} from '../data/collegeLibraryData';
import {
  BookOpen,
  CalendarClock,
  Camera,
  CheckCircle2,
  Image as ImageIcon,
  MapPin,
  Maximize2,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

const STORAGE_KEY = 'ggzc_college_library_photos';

export function CollegeLibrarySection() {
  const [customPhotos, setCustomPhotos] = useState<LibraryPhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] =
    useState<LibraryPhotoItem['category']>('reading-hall');
  const [newCaption, setNewCaption] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState<LibraryPhotoItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customPhotos));
    } catch {
      // Storage quota or disabled
    }
  }, [customPhotos]);

  useEffect(() => {
    if (!previewPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewPhoto]);

  const displayPhotos = useMemo(() => {
    if (customPhotos.length > 0) {
      // Replace matching slots first or prepend newly uploaded library photos
      return [...customPhotos, ...DEFAULT_LIBRARY_PHOTO_SLOTS];
    }
    return DEFAULT_LIBRARY_PHOTO_SLOTS;
  }, [customPhotos]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      const originalDataUrl = reader.result;
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 1000;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width >= height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setNewImageUrl(originalDataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.78);
        setNewImageUrl(
          compressed.length < originalDataUrl.length ? compressed : originalDataUrl
        );
      };
      img.onerror = () => setNewImageUrl(originalDataUrl);
      img.src = originalDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = newImageUrl.trim();
    if (!trimmedUrl) return;

    const item: LibraryPhotoItem = {
      id: `lib-custom-${Date.now()}`,
      title: newTitle.trim() || 'College Library Photograph',
      category: newCategory,
      caption:
        newCaption.trim() ||
        'Central College Library · Government Girls Zubaida College, Hyderabad.',
      imageUrl: trimmedUrl,
    };

    setCustomPhotos((prev) => [item, ...prev]);
    setNewTitle('');
    setNewCaption('');
    setNewImageUrl('');
    setIsAddingPhoto(false);
  };

  const handleDeletePhoto = (id: string) => {
    setCustomPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section
      id="college-library"
      className="py-16 sm:py-24 bg-white text-stone-900 relative border-t border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            {COLLEGE_LIBRARY_INFO.heading}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            {COLLEGE_LIBRARY_INFO.subheading}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs sm:text-sm text-stone-600 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#064b36]" />
              <span>{COLLEGE_LIBRARY_INFO.location}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock className="w-4 h-4 text-[#064b36]" />
              <span>{COLLEGE_LIBRARY_INFO.timings}</span>
            </span>
          </div>
        </div>

        {/* Library Key Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {COLLEGE_LIBRARY_INFO.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-[#f8faf7] border border-stone-200 shadow-sm text-center"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                {stat.label}
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#064b36] block mt-1">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Library Photos & Gallery Upload Showcase */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#064b36] to-[#042f28] text-white border-2 border-amber-300/40 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-5 text-left">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-300">
                <Camera className="w-5 h-5" />
                <h3 className="font-serif text-2xl font-bold text-white">
                  College Library Photo Gallery
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100">
                Display photographs of the Reading Hall, Book Stacks, Government Book Bank, and Science Reference Wing.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddingPhoto(!isAddingPhoto)}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingPhoto ? 'Cancel Upload' : 'Add / Upload Library Photo'}</span>
            </button>
          </div>

          {/* Add Library Photo Form */}
          {isAddingPhoto && (
            <form
              onSubmit={handleSavePhoto}
              className="p-5 rounded-2xl bg-[#03241e] border border-amber-400/50 space-y-4 text-left"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Upload className="w-4 h-4" />
                  <span>Upload a College Library Photograph</span>
                </span>
                <span className="text-[11px] text-stone-300">
                  Photos are automatically compressed for fast loading
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Main Library Reading Hall"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                    Library Area
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as LibraryPhotoItem['category'])
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  >
                    <option value="reading-hall">Main Reading Hall</option>
                    <option value="book-stacks">Book Stacks &amp; Catalog</option>
                    <option value="book-bank">Issue Desk &amp; Book Bank</option>
                    <option value="reference-wing">Science &amp; BS Reference Wing</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-emerald-200">
                  Select Photo from Device or Paste Image URL *
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
                    className="px-3.5 py-2 bg-[#064b36] hover:bg-[#053d2c] border border-amber-400/40 text-amber-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-300" />
                    <span>Choose Photo File...</span>
                  </button>

                  <span className="text-xs text-stone-400 self-center">or</span>

                  <input
                    type="text"
                    required
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Paste image URL or /assets/... path"
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  />
                </div>

                {newImageUrl && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-[#021814] rounded-lg border border-emerald-800">
                    <img
                      src={newImageUrl}
                      alt="Library preview"
                      className="w-16 h-12 object-cover rounded border border-amber-400/40"
                    />
                    <span className="text-[11px] text-emerald-200">
                      Compressed &amp; ready to display in College Library Gallery
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                  Short Caption / Description
                </label>
                <input
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Describe what is shown in this library photo..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingPhoto(false)}
                  className="px-3.5 py-2 text-xs text-stone-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-lg shadow"
                >
                  Save Photo to Library
                </button>
              </div>
            </form>
          )}

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {displayPhotos.map((photo) => {
              const isCustom = customPhotos.some((p) => p.id === photo.id);

              return (
                <div
                  key={photo.id}
                  className="bg-[#021d17] rounded-2xl overflow-hidden border border-emerald-800/80 flex flex-col justify-between group hover:border-amber-400/60 transition-all shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-[#04241d] overflow-hidden flex items-center justify-center">
                    {photo.imageUrl ? (
                      <>
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          onClick={() => setPreviewPhoto(photo)}
                          className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setPreviewPhoto(photo)}
                          className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/75 text-amber-200 text-[11px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Maximize2 className="w-3 h-3" />
                          <span>Enlarge</span>
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setNewCategory(photo.category);
                          setNewTitle(photo.title);
                          setNewCaption(photo.caption);
                          setIsAddingPhoto(true);
                        }}
                        className="w-full h-full p-4 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#063f2f] to-[#021b14] hover:from-[#074d3a] transition-colors cursor-pointer"
                      >
                        <div className="w-11 h-11 rounded-full bg-emerald-900/80 border border-amber-400/40 flex items-center justify-center mb-2">
                          <ImageIcon className="w-5 h-5 text-amber-300" />
                        </div>
                        <span className="text-xs font-bold text-amber-200 line-clamp-1">
                          {photo.title}
                        </span>
                        <span className="text-[10px] text-emerald-300/90 uppercase tracking-wider mt-1">
                          Click to Upload Photo
                        </span>
                      </button>
                    )}

                    {isCustom && (
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="absolute top-2 right-2 p-1.5 rounded bg-rose-900/85 hover:bg-rose-700 text-rose-100 transition-colors"
                        title="Remove uploaded library photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="p-3.5 space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-amber-300 leading-tight">
                      {photo.title}
                    </h4>
                    <p className="text-[11px] text-stone-300 leading-relaxed line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Library Collections & Membership Rules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          {/* 4 Collection Wings */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COLLEGE_LIBRARY_INFO.wings.map((wing) => (
              <div
                key={wing.id}
                className="p-6 rounded-2xl bg-[#f8faf7] border border-stone-200 shadow-sm hover:border-emerald-700/40 transition-colors space-y-3"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                    {wing.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#064b36] mt-0.5">
                    {wing.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {wing.description}
                </p>
                <div className="space-y-1.5 pt-1 border-t border-stone-200">
                  {wing.highlights.map((hl) => (
                    <div
                      key={hl}
                      className="flex items-start gap-2 text-xs text-stone-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Membership & Borrowing Guidelines */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-[#042f28] text-white border-2 border-amber-300/40 shadow-xl space-y-4">
            <div className="flex items-center gap-2 border-b border-emerald-800/80 pb-3">
              <BookOpen className="w-5 h-5 text-amber-300 shrink-0" />
              <h3 className="font-serif text-xl font-bold text-amber-300">
                Library Rules &amp; Book Lending
              </h3>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Every enrolled student of Intermediate, Associate Degree, and BS 4-Year programs is entitled to a College Library Card and Book Bank support.
            </p>
            <ul className="space-y-3 pt-1">
              {COLLEGE_LIBRARY_INFO.guidelines.map((rule, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-stone-200 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Uploaded Library Photos */}
      {previewPhoto?.imageUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl p-4 text-center border border-stone-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-left">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {previewPhoto.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPhoto(null)}
                className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
                aria-label="Close library photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 max-h-[75vh] overflow-auto flex flex-col items-center justify-center gap-3">
              <img
                src={previewPhoto.imageUrl}
                alt={previewPhoto.title}
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-lg"
              />
              <p className="text-xs text-stone-300 max-w-2xl">
                {previewPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
