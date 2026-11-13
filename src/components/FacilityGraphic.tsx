import { FacilityHotspot, TourFacility } from '../data/campusTourData';
import { BookOpen, Monitor, FlaskConical, Mic, Dumbbell, Compass, Info } from 'lucide-react';

interface FacilityGraphicProps {
  facility: TourFacility;
  activeHotspot: FacilityHotspot | null;
  onSelectHotspot: (hotspot: FacilityHotspot | null) => void;
}

export function FacilityGraphic({
  facility,
  activeHotspot,
  onSelectHotspot
}: FacilityGraphicProps) {
  // If a real image exists (e.g. for the historic gateway)
  if (facility.imageSrc) {
    return (
      <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-2xl overflow-hidden bg-stone-900 border-2 border-amber-300/40 shadow-2xl select-none group">
        <img
          src={facility.imageSrc}
          alt={facility.name}
          className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.05]"
        />
        {/* Subtle vignette scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 pointer-events-none" />

        {/* Hotspot Markers */}
        {facility.hotspots.map((hs) => {
          const isSelected = activeHotspot?.id === hs.id;
          return (
            <div
              key={hs.id}
              style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHotspot(isSelected ? null : hs);
                }}
                className={`group/pin relative flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${
                  isSelected ? 'scale-125' : ''
                }`}
                aria-label={`View ${hs.label}`}
              >
                <span className="absolute w-8 h-8 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg border-2 ${
                    isSelected
                      ? 'bg-amber-300 text-emerald-950 border-white'
                      : 'bg-[#064b36] text-amber-300 border-amber-300 hover:bg-amber-400 hover:text-emerald-950'
                  }`}
                >
                  <Info className="w-4 h-4" />
                </span>
                <span className="hidden sm:inline-block ml-2 px-2.5 py-1 bg-black/80 backdrop-blur-md text-amber-200 text-[11px] font-semibold rounded-md border border-amber-400/40 whitespace-nowrap shadow-md">
                  {hs.label}
                </span>
              </button>

              {/* Popover Bubble */}
              {isSelected && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3.5 bg-stone-900/95 backdrop-blur-md text-white rounded-xl border border-amber-300/60 shadow-2xl z-30 text-left text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="font-bold text-amber-300 text-sm mb-1 flex items-center justify-between">
                    <span>{hs.label}</span>
                    <button
                      onClick={() => onSelectHotspot(null)}
                      className="text-stone-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-stone-200 text-xs leading-relaxed">{hs.description}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-stone-900" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Visual SVG Architectural Illustrations for other campus wings
  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#03241e] via-[#04332a] to-[#021c17] border-2 border-amber-300/40 shadow-2xl select-none flex items-center justify-center">
      {/* Background Architectural Canvas */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        {facility.svgType === 'library' && (
          <svg className="w-full h-full" viewBox="0 0 800 500" fill="none" preserveAspectRatio="none">
            {/* Library perspective shelves */}
            <rect width="800" height="500" fill="#042f28" />
            <path d="M0 0 L250 150 L250 500 L0 500 Z" fill="#064032" opacity="0.8" />
            <path d="M800 0 L550 150 L550 500 L800 500 Z" fill="#064032" opacity="0.8" />
            {/* Shelves horizontal lines */}
            {[50, 100, 150, 200, 250, 300, 350, 400, 450].map((y) => (
              <line key={y} x1="250" y1={y} x2="550" y2={y} stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.4" />
            ))}
            {/* Classical arched windows */}
            <path d="M300 200 Q400 120 500 200 L500 350 L300 350 Z" stroke="#f2d77a" strokeWidth="2" strokeOpacity="0.5" fill="#073d32" />
          </svg>
        )}

        {facility.svgType === 'computer-lab' && (
          <svg className="w-full h-full" viewBox="0 0 800 500" fill="none" preserveAspectRatio="none">
            <rect width="800" height="500" fill="#02211b" />
            {/* Digital isometric grid */}
            {[0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="#10b981" strokeWidth="1" strokeOpacity="0.15" />
            ))}
            {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500].map((y) => (
              <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#10b981" strokeWidth="1" strokeOpacity="0.15" />
            ))}
            {/* Workstation blocks */}
            <rect x="150" y="240" width="120" height="70" rx="6" fill="#064b36" stroke="#34d399" strokeWidth="2" strokeOpacity="0.6" />
            <rect x="340" y="240" width="120" height="70" rx="6" fill="#064b36" stroke="#34d399" strokeWidth="2" strokeOpacity="0.6" />
            <rect x="530" y="240" width="120" height="70" rx="6" fill="#064b36" stroke="#34d399" strokeWidth="2" strokeOpacity="0.6" />
          </svg>
        )}

        {facility.svgType === 'science-lab' && (
          <svg className="w-full h-full" viewBox="0 0 800 500" fill="none" preserveAspectRatio="none">
            <rect width="800" height="500" fill="#03251e" />
            {/* Lab benches */}
            <rect x="80" y="320" width="640" height="130" fill="#064032" stroke="#d4af37" strokeWidth="2" strokeOpacity="0.5" />
            {/* Apparatus outlines */}
            <circle cx="250" cy="270" r="30" stroke="#f2d77a" strokeWidth="2" strokeOpacity="0.7" fill="#073d32" />
            <path d="M250 240 L250 180" stroke="#f2d77a" strokeWidth="2" strokeOpacity="0.7" />
            <path d="M400 320 L400 200 L440 250" stroke="#34d399" strokeWidth="2.5" strokeOpacity="0.6" />
            <circle cx="550" cy="260" r="35" stroke="#f2d77a" strokeWidth="2" strokeOpacity="0.7" fill="#073d32" />
          </svg>
        )}

        {facility.svgType === 'auditorium' && (
          <svg className="w-full h-full" viewBox="0 0 800 500" fill="none" preserveAspectRatio="none">
            <rect width="800" height="500" fill="#042821" />
            {/* Proscenium curtain arch */}
            <path d="M100 0 C250 100 550 100 700 0 L700 500 L100 500 Z" fill="#073b30" stroke="#d4af37" strokeWidth="2" strokeOpacity="0.5" />
            {/* Stage floor */}
            <polygon points="120,380 680,380 750,500 50,500" fill="#064b36" stroke="#f2d77a" strokeWidth="2" strokeOpacity="0.6" />
          </svg>
        )}

        {facility.svgType === 'sports' && (
          <svg className="w-full h-full" viewBox="0 0 800 500" fill="none" preserveAspectRatio="none">
            <rect width="800" height="500" fill="#053327" />
            {/* Court boundary */}
            <rect x="150" y="160" width="500" height="260" rx="8" stroke="#f2d77a" strokeWidth="2" strokeOpacity="0.6" fill="#074435" />
            <line x1="400" y1="160" x2="400" y2="420" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.7" />
            <circle cx="400" cy="290" r="50" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.5" />
          </svg>
        )}
      </div>

      {/* Central Visual Icon & Crest Seal */}
      <div className="relative z-10 text-center space-y-3 p-6 max-w-md">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl bg-[#064b36]/90 border-2 border-amber-300 flex items-center justify-center shadow-xl">
          {facility.svgType === 'library' && <BookOpen className="w-10 h-10 text-amber-300" />}
          {facility.svgType === 'computer-lab' && <Monitor className="w-10 h-10 text-amber-300" />}
          {facility.svgType === 'science-lab' && <FlaskConical className="w-10 h-10 text-amber-300" />}
          {facility.svgType === 'auditorium' && <Mic className="w-10 h-10 text-amber-300" />}
          {facility.svgType === 'sports' && <Dumbbell className="w-10 h-10 text-amber-300" />}
          {facility.svgType === 'courtyard' && <Compass className="w-10 h-10 text-amber-300" />}
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
            Govt Girls Zubaida College Campus Facility
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            {facility.name}
          </h3>
          <p className="text-xs text-emerald-200 mt-1">{facility.subtitle}</p>
        </div>
      </div>

      {/* Hotspots for Illustrated Facilities */}
      {facility.hotspots.map((hs) => {
        const isSelected = activeHotspot?.id === hs.id;
        return (
          <div
            key={hs.id}
            style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectHotspot(isSelected ? null : hs);
              }}
              className={`group/pin relative flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${
                isSelected ? 'scale-125' : ''
              }`}
              aria-label={`View ${hs.label}`}
            >
              <span className="absolute w-8 h-8 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />
              <span
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg border-2 ${
                  isSelected
                    ? 'bg-amber-300 text-emerald-950 border-white'
                    : 'bg-[#064b36] text-amber-300 border-amber-300 hover:bg-amber-400 hover:text-emerald-950'
                }`}
              >
                <Info className="w-4 h-4" />
              </span>
              <span className="hidden sm:inline-block ml-2 px-2.5 py-1 bg-black/80 backdrop-blur-md text-amber-200 text-[11px] font-semibold rounded-md border border-amber-400/40 whitespace-nowrap shadow-md">
                {hs.label}
              </span>
            </button>

            {/* Popover Bubble */}
            {isSelected && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3.5 bg-stone-900/95 backdrop-blur-md text-white rounded-xl border border-amber-300/60 shadow-2xl z-30 text-left text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="font-bold text-amber-300 text-sm mb-1 flex items-center justify-between">
                  <span>{hs.label}</span>
                  <button
                    onClick={() => onSelectHotspot(null)}
                    className="text-stone-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-stone-200 text-xs leading-relaxed">{hs.description}</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-stone-900" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
