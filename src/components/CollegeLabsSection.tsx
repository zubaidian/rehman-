import React, { useEffect, useRef, useState } from 'react';
import { COLLEGE_LABS, CollegeLabInfo, LabPhotoItem, LabSlug } from '../data/collegeLabsData';
import {
  Camera,
  CheckCircle2,
  FlaskConical,
  Image as ImageIcon,
  MapPin,
  Maximize2,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

const STORAGE_KEY = 'ggzc_college_lab_photos';

export function CollegeLabsSection() {
  const [activeLabFilter, setActiveLabFilter] = useState<'all' | LabSlug>('all');
  const [labPhotos, setLabPhotos] = useState<LabPhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Upload Form State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLabId, setSelectedLabId] = useState<LabSlug>('computer-science');
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState<{
    src: string;
    title: string;
    caption: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(labPhotos));
    } catch {
      // Storage quota or disabled
    }
  }, [labPhotos]);

  useEffect(() => {
    if (!previewPhoto && !isAddModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewPhoto(null);
        setIsAddModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewPhoto, isAddModalOpen]);

  const visibleLabs: CollegeLabInfo[] =
    activeLabFilter === 'all'
      ? COLLEGE_LABS
      : COLLEGE_LABS.filter((lab) => lab.id === activeLabFilter);

  const openUploadForLab = (lab: CollegeLabInfo) => {
    setSelectedLabId(lab.id);
    setPhotoTitle(lab.defaultPhotoTitle);
    setPhotoCaption(lab.defaultPhotoCaption);
    setPhotoUrl('');
    setIsAddModalOpen(true);
  };

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
          setPhotoUrl(originalDataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', 0.78);
        setPhotoUrl(
          compressed.length < originalDataUrl.length ? compressed : originalDataUrl
        );
      };
      img.onerror = () => setPhotoUrl(originalDataUrl);
      img.src = originalDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveLabPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUrl = photoUrl.trim();
    if (!trimmedUrl) return;

    const targetLab = COLLEGE_LABS.find((l) => l.id === selectedLabId);
    const newItem: LabPhotoItem = {
      id: `lab-photo-${Date.now()}`,
      labId: selectedLabId,
      title: photoTitle.trim() || `${targetLab?.name || 'College Lab'} Photo`,
      caption:
        photoCaption.trim() ||
        targetLab?.defaultPhotoCaption ||
        'Laboratory facilities at Govt Girls Zubaida College, Hyderabad.',
      imageUrl: trimmedUrl,
    };

    setLabPhotos((prev) => [newItem, ...prev]);
    setPhotoTitle('');
    setPhotoCaption('');
    setPhotoUrl('');
    setIsAddModalOpen(false);
  };

  const handleDeletePhoto = (id: string) => {
    setLabPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section
      id="college-labs"
      className="py-16 sm:py-24 bg-[#f8faf7] text-stone-900 relative border-t border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            College Laboratories &amp; Practical Wings
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Dedicated practical halls for Computer Science, Physics, Chemistry, Zoology, and Botany—supporting BISE Hyderabad Board and University degree experiments.
          </p>
        </div>

        {/* Lab Filter Tabs + Quick Upload Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <button
              type="button"
              onClick={() => setActiveLabFilter('all')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeLabFilter === 'all'
                  ? 'bg-[#064b36] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All 5 Labs
            </button>
            {COLLEGE_LABS.map((lab) => (
              <button
                key={lab.id}
                type="button"
                onClick={() => setActiveLabFilter(lab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeLabFilter === lab.id
                    ? 'bg-[#064b36] text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {lab.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              const initialLab =
                activeLabFilter === 'all'
                  ? COLLEGE_LABS[0]
                  : COLLEGE_LABS.find((l) => l.id === activeLabFilter) || COLLEGE_LABS[0];
              openUploadForLab(initialLab);
            }}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lab Photo</span>
          </button>
        </div>

        {/* Labs Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {visibleLabs.map((lab) => {
            const photosForLab = labPhotos.filter((p) => p.labId === lab.id);

            return (
              <article
                key={lab.id}
                className="rounded-3xl bg-gradient-to-br from-[#064b36] to-[#042f28] text-white border-2 border-amber-300/40 shadow-xl p-6 sm:p-7 flex flex-col justify-between gap-6 text-left"
              >
                <div className="space-y-4">
                  {/* Lab Title & Location */}
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-emerald-800/80 pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                        {lab.programs}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">
                        {lab.name}
                      </h3>
                      <p className="text-xs text-emerald-200 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span>{lab.location}</span>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => openUploadForLab(lab)}
                      className="px-3 py-1.5 rounded-lg bg-[#03241e] hover:bg-amber-400 hover:text-emerald-950 border border-amber-300/40 text-amber-200 text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                    </button>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                    {lab.summary}
                  </p>

                  {/* Key Equipment */}
                  <div className="space-y-1.5">
                    {lab.equipment.map((eq) => (
                      <div
                        key={eq}
                        className="flex items-start gap-2 text-xs text-emerald-100"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                        <span>{eq}</span>
                      </div>
                    ))}
                  </div>

                  {/* Lab Photos Area */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <span className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>Lab Photos ({photosForLab.length})</span>
                      </span>
                    </div>

                    {photosForLab.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {photosForLab.map((photo) => (
                          <div
                            key={photo.id}
                            className="bg-[#021d17] rounded-xl overflow-hidden border border-emerald-800 group hover:border-amber-400/60 transition-all"
                          >
                            <div className="relative aspect-video bg-[#04241d] overflow-hidden">
                              <img
                                src={photo.imageUrl}
                                alt={photo.title}
                                onClick={() =>
                                  setPreviewPhoto({
                                    src: photo.imageUrl,
                                    title: photo.title,
                                    caption: photo.caption,
                                  })
                                }
                                className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setPreviewPhoto({
                                    src: photo.imageUrl,
                                    title: photo.title,
                                    caption: photo.caption,
                                  })
                                }
                                className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/75 text-amber-200 text-[10px] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Maximize2 className="w-3 h-3" />
                                <span>View</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeletePhoto(photo.id)}
                                className="absolute top-2 right-2 p-1 rounded bg-rose-900/85 hover:bg-rose-700 text-rose-100 transition-colors"
                                title="Remove lab photo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="p-2.5">
                              <h4 className="font-bold text-xs text-white line-clamp-1">
                                {photo.title}
                              </h4>
                              <p className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                                {photo.caption}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openUploadForLab(lab)}
                        className="w-full py-6 px-4 rounded-xl bg-[#03241e] hover:bg-[#042c24] border border-dashed border-amber-300/40 flex flex-col items-center justify-center text-center transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-900/80 border border-amber-400/40 flex items-center justify-center mb-2">
                          <ImageIcon className="w-5 h-5 text-amber-300" />
                        </div>
                        <span className="text-xs font-bold text-amber-200">
                          {lab.defaultPhotoTitle}
                        </span>
                        <span className="text-[11px] text-emerald-200/90 mt-0.5">
                          Click to upload photos of the {lab.name}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Add Lab Photo Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl text-left border border-stone-200 relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              aria-label="Close lab photo modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              College Laboratories Gallery
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#064b36] mb-1">
              Add Laboratory Photograph
            </h3>
            <p className="text-xs text-stone-600 mb-5">
              Photos are automatically compressed and displayed immediately under the selected laboratory.
            </p>

            <form onSubmit={handleSaveLabPhoto} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Select Laboratory *
                </label>
                <select
                  value={selectedLabId}
                  onChange={(e) => setSelectedLabId(e.target.value as LabSlug)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36] bg-white"
                >
                  {COLLEGE_LABS.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  placeholder="e.g., Chemistry Practical Session"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-stone-700">
                  Upload Photo from Device or Paste Image URL *
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
                    className="px-3.5 py-2.5 bg-[#064b36] hover:bg-[#042f28] text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-300" />
                    <span>Choose Photo File...</span>
                  </button>

                  <span className="text-stone-400 self-center">or</span>

                  <input
                    type="text"
                    required
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="Paste image URL or /assets/... path"
                    className="flex-1 px-3 py-2.5 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                  />
                </div>

                {photoUrl && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-stone-50 rounded-lg border border-stone-200">
                    <img
                      src={photoUrl}
                      alt="Lab upload preview"
                      className="w-16 h-12 object-cover rounded border border-emerald-700/30"
                    />
                    <span className="text-[11px] text-emerald-800 font-medium">
                      Compressed &amp; ready to display in lab gallery
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Short Caption / Description
                </label>
                <input
                  type="text"
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  placeholder="Describe the apparatus or practical facility..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#064b36] hover:bg-[#042f28] text-white font-bold shadow flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Save Lab Photo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lab Photo Lightbox */}
      {previewPhoto && (
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
                <FlaskConical className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {previewPhoto.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPhoto(null)}
                className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
                aria-label="Close lab photo lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 max-h-[75vh] overflow-auto flex flex-col items-center justify-center gap-3">
              <img
                src={previewPhoto.src}
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
