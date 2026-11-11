import { useState } from 'react';
import { GALLERY_PHOTOS, GalleryPhoto } from '../data/collegeData';
import { Image as ImageIcon, Maximize2, X, Sparkles } from 'lucide-react';

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'campus' | 'honors' | 'faculty'>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos = selectedCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#f8faf7] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-[#064b36] text-xs font-bold tracking-wider uppercase">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Campus Gallery &amp; Archive</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            Life at Zubaida College
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            A visual chronicle of our historic campus, high-achieving scholars, leadership addresses, and academic pride.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#064b36] text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            All Photos ({GALLERY_PHOTOS.length})
          </button>
          <button
            onClick={() => setSelectedCategory('honors')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'honors'
                ? 'bg-[#064b36] text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            Board Honors &amp; Results
          </button>
          <button
            onClick={() => setSelectedCategory('campus')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'campus'
                ? 'bg-[#064b36] text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            Campus Grounds &amp; Emblem
          </button>
          <button
            onClick={() => setSelectedCategory('faculty')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'faculty'
                ? 'bg-[#064b36] text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
            }`}
          >
            Leadership &amp; Assemblies
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 flex items-center justify-center p-2">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Click to expand image</span>
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex items-start gap-3 bg-white border-t border-stone-100">
                <span className="font-serif text-xl font-bold text-emerald-800 tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#064b36] group-hover:text-emerald-700 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-stone-900 border border-stone-700 rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Govt Girls Zubaida College Gallery
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5">
                  {activePhoto.title}
                </h3>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800"
                aria-label="Close photo view"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="my-4 max-h-[65vh] overflow-auto flex items-center justify-center bg-black/40 rounded-xl p-2">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="pt-3 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-300">
              <p className="leading-relaxed max-w-2xl">{activePhoto.caption}</p>
              <button
                onClick={() => setActivePhoto(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg font-medium shrink-0"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
