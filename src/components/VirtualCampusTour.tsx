import { useState, useEffect } from 'react';
import { CAMPUS_TOUR_STOPS, FacilityHotspot, TourFacility } from '../data/campusTourData';
import { FacilityGraphic } from './FacilityGraphic';
import {
  Compass,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MapPin,
  CheckCircle2,
  Sparkles,
  Maximize2
} from 'lucide-react';

export function VirtualCampusTour() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<FacilityHotspot | null>(null);

  const currentFacility: TourFacility = CAMPUS_TOUR_STOPS[currentIndex];

  // Auto-tour timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % CAMPUS_TOUR_STOPS.length);
        setActiveHotspot(null);
      }, 6000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAMPUS_TOUR_STOPS.length);
    setActiveHotspot(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAMPUS_TOUR_STOPS.length) % CAMPUS_TOUR_STOPS.length);
    setActiveHotspot(null);
  };

  const handleSelectFacility = (index: number) => {
    setCurrentIndex(index);
    setActiveHotspot(null);
  };

  return (
    <section id="campus-tour" className="py-16 sm:py-24 bg-[#042f28] text-white relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064b36] border border-amber-300/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Campus Exploration</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Virtual Campus Tour
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Take a digital walkthrough of Government Girls Zubaida College&rsquo;s historic gateway, central library, high-tech IT labs, science facilities, and auditorium.
          </p>
        </div>

        {/* Facility Selector Strip */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CAMPUS_TOUR_STOPS.map((stop, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={stop.id}
                onClick={() => handleSelectFacility(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 border ${
                  isActive
                    ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md font-bold scale-[1.02]'
                    : 'bg-[#063f35] text-stone-200 border-emerald-800 hover:bg-[#074c3f] hover:text-white'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                    isActive ? 'bg-emerald-950 text-amber-300 font-bold' : 'bg-black/30 text-amber-200'
                  }`}
                >
                  {stop.stopNumber}
                </span>
                <span>{stop.name.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Main Tour Showcase Card */}
        <div className="bg-[#03241e] border-2 border-amber-300/40 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-8">
          {/* Tour Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-800/80 pb-5">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
                Stop {currentFacility.stopNumber} of 0{CAMPUS_TOUR_STOPS.length}
              </span>
              <span className="text-xs text-emerald-200 font-medium hidden sm:inline">
                {currentFacility.category}
              </span>
            </div>

            {/* Navigation and Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                  isPlaying
                    ? 'bg-amber-400 text-emerald-950 border-amber-300'
                    : 'bg-[#063f35] text-stone-200 border-emerald-700 hover:bg-emerald-800'
                }`}
                title={isPlaying ? 'Pause automated tour' : 'Start auto tour walkthrough'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Auto-Tour Active' : 'Start Auto Tour'}</span>
              </button>

              <button
                onClick={handlePrev}
                className="p-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 transition-colors"
                aria-label="Previous facility"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 transition-colors"
                aria-label="Next facility"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Graphic & Description Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Screen with Hotspots */}
            <div className="lg:col-span-7">
              <FacilityGraphic
                facility={currentFacility}
                activeHotspot={activeHotspot}
                onSelectHotspot={setActiveHotspot}
              />
              <div className="mt-3 flex items-center justify-between text-xs text-stone-400 px-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                  <span>Click interactive info pins to inspect facility equipment</span>
                </span>
                <span className="font-mono text-amber-300/80">
                  {currentFacility.locationNote}
                </span>
              </div>
            </div>

            {/* Overlay Description & Facility Specifications */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-300 bg-[#063f35] px-2.5 py-0.5 rounded border border-amber-300/20 mb-2">
                  {currentFacility.badge}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {currentFacility.name}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200 mt-1 font-medium">
                  {currentFacility.subtitle}
                </p>
              </div>

              {/* In-depth Description */}
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                {currentFacility.description}
              </p>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {currentFacility.keySpecs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#063f35] border border-emerald-700/60"
                  >
                    <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wider block">
                      {spec.label}
                    </span>
                    <span className="font-serif font-bold text-sm text-white block mt-0.5">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key Highlights Checklist */}
              <div className="space-y-2 pt-2 border-t border-emerald-800/80">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Facility Highlights:
                </span>
                <div className="space-y-1.5">
                  {currentFacility.highlights.map((hl, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-stone-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Action */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>{currentFacility.locationNote}</span>
                </span>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-lg shadow transition-all flex items-center gap-1"
                >
                  <span>Next Stop</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
