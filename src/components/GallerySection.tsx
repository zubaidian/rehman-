import { useState, useEffect, useRef } from 'react';
import { GALLERY_PHOTOS, GalleryPhoto } from '../data/collegeData';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Images
} from 'lucide-react';

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'campus' | 'honors' | 'faculty'>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activePhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  const filteredPhotos = selectedCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  const categoryLabels: Record<GalleryPhoto['category'], string> = {
    campus: 'Campus',
    honors: 'Board Honors',
    academics: 'Academics',
    faculty: 'Leadership'
  };

  // Reset scroll to start when category filter changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [selectedCategory]);

  // Smooth continuous auto-scroll tracker
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isPaused || isHovered || activePhoto || filteredPhotos.length <= 1) {
      return;
    }

    const delay = scrollSpeed === 'slow' ? 40 : scrollSpeed === 'fast' ? 18 : 22;
    const step = scrollSpeed === 'fast' ? 2 : 1;

    const interval = setInterval(() => {
      if (!container) return;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 4) return;

      if (container.scrollLeft >= maxScroll - 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += step;
      }
    }, delay);

    return () => clearInterval(interval);
  }, [isPaused, isHovered, activePhoto, scrollSpeed, filteredPhotos.length]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#f8faf7] text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            Life at Zubaida College
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            A visual chronicle of our historic campus, high-achieving scholars, leadership addresses, and academic pride.
          </p>
        </div>

        {/* Category Filters & Scroll Tracker Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#064b36] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              All Photos ({GALLERY_PHOTOS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('honors')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'honors'
                  ? 'bg-[#064b36] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              Board Honors &amp; Results
            </button>
            <button
              onClick={() => setSelectedCategory('campus')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'campus'
                  ? 'bg-[#064b36] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              Campus Grounds &amp; Emblem
            </button>
            <button
              onClick={() => setSelectedCategory('faculty')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'faculty'
                  ? 'bg-[#064b36] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              Leadership &amp; Assemblies
            </button>
          </div>

          {/* Tracker Playback & Scroll Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-xs font-semibold text-stone-500 hidden sm:inline-flex items-center gap-1.5 mr-1">
              <Images className="w-3.5 h-3.5 text-[#064b36]" />
              {filteredPhotos.length} {filteredPhotos.length === 1 ? 'Photo' : 'Photos'}
            </span>

            {/* Play / Pause & Speed */}
            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-xl border border-stone-200 shadow-sm text-xs">
              <button
                onClick={() => setIsPaused((prev) => !prev)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isPaused
                    ? 'bg-amber-400 text-emerald-950 font-bold'
                    : 'text-[#064b36] hover:bg-stone-100'
                }`}
                title={isPaused ? 'Resume photo scroll' : 'Pause photo scroll'}
                aria-label={isPaused ? 'Resume photo scroll' : 'Pause photo scroll'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
              </button>

              <div className="h-4 w-px bg-stone-200 mx-1" />

              {(['slow', 'normal', 'fast'] as const).map((speed) => (
                <button
                  key={speed}
                  onClick={() => setScrollSpeed(speed)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize transition-colors ${
                    scrollSpeed === speed
                      ? 'bg-[#064b36] text-white'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>

            {/* Left / Right Navigation Arrows */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleManualScroll('left')}
                className="p-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-[#064b36] shadow-sm transition-colors"
                title="Scroll Left"
                aria-label="Scroll gallery left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleManualScroll('right')}
                className="p-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-[#064b36] shadow-sm transition-colors"
                title="Scroll Right"
                aria-label="Scroll gallery right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Bar / Photo Tracker Window */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto pb-5 pt-1 cursor-grab active:cursor-grabbing select-none"
        >
          {filteredPhotos.map((photo) => {
            const isEmblemOrQr = photo.id === 'photo-emblem' || photo.id === 'photo-location-qr';
            const isPortrait = photo.id === 'photo-principal';

            return (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="w-72 sm:w-80 lg:w-[340px] shrink-0 group rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between text-left"
              >
                {/* Card Image */}
                <div
                  className={`relative h-60 sm:h-64 overflow-hidden border-b border-stone-200 flex items-center justify-center ${
                    isEmblemOrQr ? 'bg-white p-6' : 'bg-stone-900'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    draggable={false}
                    className={
                      isEmblemOrQr
                        ? 'w-full h-full object-contain transition-transform duration-500 group-hover:scale-105'
                        : `w-full h-full object-cover ${isPortrait ? 'object-top' : 'object-center'} transition-transform duration-500 group-hover:scale-105`
                    }
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/95 text-[#064b36] text-xs font-bold shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Full Photo</span>
                    </span>
                  </div>
                </div>

                {/* Card Caption */}
                <div className="p-5 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                    {categoryLabels[photo.category]}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#064b36] group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Scroll Hint */}
        <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <span>
            Hover over any photo to pause the scrolling showcase, drag the scrollbar, or click a photo to expand.
          </span>
          <span className="font-medium text-[#064b36]">
            {isPaused ? 'Auto-scroll paused' : isHovered ? 'Paused on hover' : `Auto-scrolling (${scrollSpeed})`}
          </span>
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
                referrerPolicy="no-referrer"
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
