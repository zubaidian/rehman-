import React, { useState, useEffect, useMemo } from 'react';
import {
  CAMPUS_TOUR_STOPS,
  DirectionTurn,
  FacilityHotspot,
  TourFacility
} from '../data/campusTourData';
import { FacilityGraphic } from './FacilityGraphic';
import {
  buildAutoRoutePath,
  CampusMapCanvas,
  MapInteractionMode,
  suggestDirectionsFromGate
} from './CampusMapCanvas';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MapPin,
  CheckCircle2,
  Map as MapIcon,
  Eye,
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
  Navigation,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  CornerUpLeft,
  CornerUpRight,
  Compass,
  Move,
  Wand2,
  X,
  Save
} from 'lucide-react';

const TOUR_STORAGE_KEY = 'ggzc_campus_tour_map_stops_v1';

const DIRECTION_OPTIONS: DirectionTurn[] = [
  'Entry Gate',
  'Straight Ahead',
  'Turn Left',
  'Bear Left',
  'Turn Right',
  'Bear Right',
  'Upstairs (1st Floor)'
];

function DirectionIcon({ turn }: { turn: DirectionTurn }) {
  switch (turn) {
    case 'Turn Left':
      return <CornerUpLeft className="w-4 h-4 text-amber-300 shrink-0" />;
    case 'Bear Left':
      return <ArrowUpLeft className="w-4 h-4 text-amber-300 shrink-0" />;
    case 'Turn Right':
      return <CornerUpRight className="w-4 h-4 text-amber-300 shrink-0" />;
    case 'Bear Right':
      return <ArrowUpRight className="w-4 h-4 text-amber-300 shrink-0" />;
    case 'Entry Gate':
      return <Compass className="w-4 h-4 text-emerald-300 shrink-0" />;
    default:
      return <ArrowUp className="w-4 h-4 text-amber-300 shrink-0" />;
  }
}

interface PointFormState {
  editingId: string | null; // null = inserting new stop
  name: string;
  shortName: string;
  subtitle: string;
  category: TourFacility['category'];
  locationNote: string;
  description: string;
  mapX: number;
  mapY: number;
  turn: DirectionTurn;
  distanceFromGate: string;
  walkingStepsText: string;
}

export function VirtualCampusTour() {
  const [stops, setStops] = useState<TourFacility[]>(() => {
    try {
      const saved = localStorage.getItem(TOUR_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to default stops
    }
    return CAMPUS_TOUR_STOPS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeView, setActiveView] = useState<'map' | 'interior'>('map');
  const [activeHotspot, setActiveHotspot] = useState<FacilityHotspot | null>(null);

  // Map Editor States
  const [mapMode, setMapMode] = useState<MapInteractionMode>('browse');
  const [draftPinCoords, setDraftPinCoords] = useState<{ x: number; y: number } | null>(null);
  const [formState, setFormState] = useState<PointFormState | null>(null);

  // Persist custom/edited map stops to localStorage
  const hasCustomChanges = useMemo(() => {
    return JSON.stringify(stops) !== JSON.stringify(CAMPUS_TOUR_STOPS);
  }, [stops]);

  useEffect(() => {
    try {
      if (hasCustomChanges) {
        localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(stops));
      } else {
        localStorage.removeItem(TOUR_STORAGE_KEY);
      }
    } catch {
      // Ignore storage quota issues
    }
  }, [stops, hasCustomChanges]);

  // Keep currentIndex bounded safely if stops change
  const safeIndex = currentIndex >= stops.length ? 0 : currentIndex;
  const currentFacility: TourFacility = stops[safeIndex] || CAMPUS_TOUR_STOPS[0];

  // Sync with menu shortcuts like #central-library
  useEffect(() => {
    const selectStopById = (stopId: string) => {
      const idx = stops.findIndex((s) => s.id === stopId);
      if (idx !== -1) {
        setCurrentIndex(idx);
        setActiveHotspot(null);
      }
    };

    const handleCustomSelect = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) selectStopById(detail);
    };

    const handleHash = () => {
      if (window.location.hash === '#central-library') {
        selectStopById('central-library');
      }
    };

    handleHash();
    window.addEventListener('campus-tour:select-stop', handleCustomSelect);
    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('campus-tour:select-stop', handleCustomSelect);
      window.removeEventListener('hashchange', handleHash);
    };
  }, [stops]);

  // Auto-tour timer (pauses automatically while editing map or open form)
  useEffect(() => {
    if (!isPlaying || mapMode !== 'browse' || formState) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stops.length);
      setActiveHotspot(null);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, stops.length, mapMode, formState]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stops.length);
    setActiveHotspot(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stops.length) % stops.length);
    setActiveHotspot(null);
  };

  const handleSelectFacility = (index: number) => {
    setCurrentIndex(index);
    setActiveHotspot(null);
  };

  // Start inserting a new map point
  const startInsertMode = () => {
    setActiveView('map');
    setIsPlaying(false);
    setFormState(null);
    setDraftPinCoords(null);
    setMapMode((prev) => (prev === 'insert' ? 'browse' : 'insert'));
  };

  // Start repositioning the currently selected point
  const startRepositionMode = () => {
    setActiveView('map');
    setIsPlaying(false);
    setFormState(null);
    setDraftPinCoords(null);
    setMapMode((prev) => (prev === 'reposition' ? 'browse' : 'reposition'));
  };

  // Open edit modal for current point
  const openEditCurrentPoint = () => {
    setIsPlaying(false);
    setMapMode('browse');
    setDraftPinCoords(null);
    setFormState({
      editingId: currentFacility.id,
      name: currentFacility.name,
      shortName: currentFacility.shortName || currentFacility.name,
      subtitle: currentFacility.subtitle,
      category: currentFacility.category,
      locationNote: currentFacility.locationNote,
      description: currentFacility.description,
      mapX: currentFacility.mapX,
      mapY: currentFacility.mapY,
      turn: currentFacility.gateDirections.turn,
      distanceFromGate: currentFacility.gateDirections.distanceFromGate,
      walkingStepsText: currentFacility.gateDirections.walkingSteps.join('\n')
    });
  };

  // Handle user clicking coordinates on CampusMapCanvas
  const handleMapCoordinatePick = (x: number, y: number) => {
    if (mapMode === 'insert') {
      const suggestion = suggestDirectionsFromGate(x, y, 'New Campus Point');
      setDraftPinCoords({ x, y });
      setMapMode('browse');
      setFormState({
        editingId: null,
        name: '',
        shortName: '',
        subtitle: 'Added Campus Map Point & Gate Navigation Stop',
        category: 'Academics',
        locationNote: `Campus Zone · X:${Math.round(x)}% Y:${Math.round(y)}%`,
        description:
          'Custom campus landmark added to help students and visitors navigate smoothly from the Main College Gate.',
        mapX: x,
        mapY: y,
        turn: suggestion.turn,
        distanceFromGate: suggestion.distanceFromGate,
        walkingStepsText: suggestion.walkingSteps.join('\n')
      });
    } else if (mapMode === 'reposition') {
      const target = stops[safeIndex];
      if (!target) return;
      const suggestion = suggestDirectionsFromGate(x, y, target.name);
      setStops((prev) =>
        prev.map((item, idx) =>
          idx === safeIndex
            ? {
                ...item,
                mapX: x,
                mapY: y,
                gateDirections: {
                  ...item.gateDirections,
                  turn: suggestion.turn,
                  distanceFromGate: suggestion.distanceFromGate,
                  routePath: suggestion.routePath
                }
              }
            : item
        )
      );
      setMapMode('browse');
    }
  };

  const handleAutoAssistDirections = () => {
    if (!formState) return;
    const suggestion = suggestDirectionsFromGate(
      formState.mapX,
      formState.mapY,
      formState.name || formState.shortName || 'this point'
    );
    setFormState({
      ...formState,
      turn: suggestion.turn,
      distanceFromGate: suggestion.distanceFromGate,
      walkingStepsText: suggestion.walkingSteps.join('\n')
    });
  };

  const handleSavePointForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState) return;

    const cleanName = formState.name.trim() || 'Campus Point';
    const cleanShort = formState.shortName.trim() || cleanName;
    const steps = formState.walkingStepsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const routePath = buildAutoRoutePath(formState.mapX, formState.mapY);

    if (formState.editingId) {
      setStops((prev) =>
        prev.map((s) =>
          s.id === formState.editingId
            ? {
                ...s,
                name: cleanName,
                shortName: cleanShort,
                subtitle: formState.subtitle.trim() || s.subtitle,
                category: formState.category,
                locationNote: formState.locationNote.trim() || s.locationNote,
                description: formState.description.trim() || s.description,
                mapX: formState.mapX,
                mapY: formState.mapY,
                gateDirections: {
                  turn: formState.turn,
                  distanceFromGate: formState.distanceFromGate.trim() || 'Inside Campus Gate',
                  walkingSteps:
                    steps.length > 0 ? steps : s.gateDirections.walkingSteps,
                  routePath
                }
              }
            : s
        )
      );
    } else {
      const nextNum = String(stops.length + 1).padStart(2, '0');
      const newStop: TourFacility = {
        id: `custom-point-${Date.now()}`,
        name: cleanName,
        shortName: cleanShort,
        subtitle: formState.subtitle.trim() || 'Campus Map Point & Gate Navigation Stop',
        category: formState.category,
        stopNumber: nextNum,
        svgType: 'courtyard',
        badge: `${formState.category} · Gate Map Stop`,
        description:
          formState.description.trim() ||
          `Located ${formState.distanceFromGate} when entering the Main College Gate.`,
        keySpecs: [
          { label: 'Turn from Gate', value: formState.turn },
          { label: 'Approx. Walk', value: formState.distanceFromGate },
          { label: 'Category', value: formState.category },
          { label: 'Entry Point', value: 'Main Gate' }
        ],
        highlights:
          steps.length > 0
            ? steps
            : ['Reachable via paved walkways starting from the Main College Gate.'],
        hotspots: [
          {
            id: `hs-${Date.now()}`,
            label: cleanShort,
            description:
              formState.description.trim() || 'Campus point added via interactive map.',
            xPercent: 50,
            yPercent: 50
          }
        ],
        locationNote:
          formState.locationNote.trim() || 'Inside Main College Gate',
        mapX: formState.mapX,
        mapY: formState.mapY,
        gateDirections: {
          turn: formState.turn,
          distanceFromGate: formState.distanceFromGate.trim() || 'Inside Gate',
          walkingSteps:
            steps.length > 0
              ? steps
              : suggestDirectionsFromGate(formState.mapX, formState.mapY, cleanName).walkingSteps,
          routePath
        },
        isCustom: true
      };

      const nextStops = [...stops, newStop];
      setStops(nextStops);
      setCurrentIndex(nextStops.length - 1);
    }

    setFormState(null);
    setDraftPinCoords(null);
  };

  const handleDeleteCustomStop = (stopId: string) => {
    const filtered = stops
      .filter((s) => s.id !== stopId)
      .map((s, idx) => ({
        ...s,
        stopNumber: String(idx + 1).padStart(2, '0')
      }));
    setStops(filtered);
    setCurrentIndex(0);
    setFormState(null);
  };

  const handleResetDefaultMap = () => {
    setStops(CAMPUS_TOUR_STOPS);
    setCurrentIndex(0);
    setMapMode('browse');
    setDraftPinCoords(null);
    setFormState(null);
    try {
      localStorage.removeItem(TOUR_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <section id="campus-tour" className="py-16 sm:py-24 bg-[#042f28] text-white relative overflow-hidden">
      {/* Subtle Ambient Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
            Interactive Campus Map &amp; Gate-Entry Tour
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Start right as you enter the Main College Gate on Pathan Colony Road—click any point on the campus map for step-by-step walking directions, or insert new campus points and custom routes.
          </p>
        </div>

        {/* Facility & Map Stop Selector Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2 mb-8">
          {stops.map((stop, idx) => {
            const isActive = idx === safeIndex;
            return (
              <button
                key={stop.id}
                onClick={() => handleSelectFacility(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 border ${
                  isActive
                    ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md font-bold'
                    : 'bg-[#063f35] text-stone-200 border-emerald-800 hover:bg-[#074c3f] hover:text-white'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono tabular-nums ${
                    isActive
                      ? 'bg-emerald-950 text-amber-300 font-bold'
                      : stop.isCustom
                        ? 'bg-sky-600 text-white'
                        : 'bg-black/30 text-amber-200'
                  }`}
                >
                  {stop.stopNumber}
                </span>
                <span>{stop.shortName || stop.name.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Main Map & Tour Showcase Container */}
        <div className="bg-[#03241e] border border-amber-300/35 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
          {/* Top Control Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-800/80 pb-5">
            {/* Left Metadata + Mode Switcher */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-stone-300">
                <span className="text-amber-300 font-bold uppercase tracking-wider tabular-nums">
                  Point {currentFacility.stopNumber} of {String(stops.length).padStart(2, '0')}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-200 font-medium">{currentFacility.category}</span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <span className="text-amber-200 hidden sm:inline">
                  {currentFacility.gateDirections.turn} ({currentFacility.gateDirections.distanceFromGate})
                </span>
              </div>

              {/* View Tabs: Campus Map vs Facility Interior */}
              <div className="flex items-center gap-1 p-1 bg-[#021914] rounded-xl border border-emerald-800/80">
                <button
                  onClick={() => setActiveView('map')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors ${
                    activeView === 'map'
                      ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Campus Map</span>
                </button>
                <button
                  onClick={() => {
                    setActiveView('interior');
                    setMapMode('browse');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors ${
                    activeView === 'interior'
                      ? 'bg-amber-400 text-emerald-950 font-bold shadow-sm'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Facility View</span>
                </button>
              </div>
            </div>

            {/* Right Controls: Map Edit Actions & Tour Playback */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={startInsertMode}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 border transition-colors ${
                  mapMode === 'insert'
                    ? 'bg-sky-500 text-slate-950 border-sky-300 font-bold'
                    : 'bg-[#063f35] text-amber-200 border-emerald-700 hover:bg-emerald-800'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{mapMode === 'insert' ? 'Cancel Insert' : 'Insert Point'}</span>
              </button>

              <button
                onClick={openEditCurrentPoint}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 bg-[#063f35] text-stone-200 border border-emerald-700 hover:bg-emerald-800 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Point</span>
              </button>

              <button
                onClick={startRepositionMode}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 border transition-colors ${
                  mapMode === 'reposition'
                    ? 'bg-amber-400 text-emerald-950 border-amber-300 font-bold'
                    : 'bg-[#063f35] text-stone-200 border-emerald-700 hover:bg-emerald-800'
                }`}
                title="Move selected point on the map"
              >
                <Move className="w-3.5 h-3.5" />
                <span>{mapMode === 'reposition' ? 'Pick New Spot...' : 'Move Pin'}</span>
              </button>

              {hasCustomChanges && (
                <button
                  onClick={handleResetDefaultMap}
                  className="px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 bg-rose-950/60 text-rose-200 border border-rose-800/70 hover:bg-rose-900/70 transition-colors"
                  title="Restore default college map stops"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Map</span>
                </button>
              )}

              <div className="h-5 w-px bg-emerald-800 mx-0.5 hidden sm:block" />

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors border ${
                  isPlaying
                    ? 'bg-amber-400 text-emerald-950 border-amber-300 font-bold'
                    : 'bg-[#063f35] text-stone-200 border-emerald-700 hover:bg-emerald-800'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause Tour' : 'Auto Tour'}</span>
              </button>

              <button
                onClick={handlePrev}
                className="p-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 transition-colors"
                aria-label="Previous stop"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 transition-colors"
                aria-label="Next stop"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Inline Insert / Edit Point Form Panel (Opens cleanly above/inside showcase when triggered) */}
          {formState && (
            <form
              onSubmit={handleSavePointForm}
              className="bg-[#021914] border border-amber-300/60 rounded-2xl p-5 sm:p-6 space-y-5 text-left"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800/80 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                    {formState.editingId
                      ? 'Edit Campus Map Point & Directions'
                      : 'Insert New Point on Campus Map'}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {formState.editingId
                      ? `Editing: ${formState.name || 'Campus Point'}`
                      : `New Map Pin Placed at X:${Math.round(formState.mapX)}% · Y:${Math.round(formState.mapY)}%`}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAutoAssistDirections}
                    className="px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-amber-200 border border-emerald-600 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    title="Auto-calculate walking steps from the Main Gate based on map coordinates"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Auto-Fill Directions from Gate</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormState(null);
                      setDraftPinCoords(null);
                    }}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
                    aria-label="Close form"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Point Title (Required)
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g., Girls Common Room or Exam Controller Desk"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Short Map Label
                  </label>
                  <input
                    type="text"
                    value={formState.shortName}
                    onChange={(e) => setFormState({ ...formState, shortName: e.target.value })}
                    placeholder="e.g., Common Room"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Campus Category
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        category: e.target.value as TourFacility['category']
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white focus:outline-none focus:border-amber-300"
                  >
                    <option value="Administration">Administration</option>
                    <option value="Academics">Academics</option>
                    <option value="Laboratories">Laboratories</option>
                    <option value="Library">Library</option>
                    <option value="Student Life">Student Life</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Turn Direction When Entering Gate
                  </label>
                  <select
                    value={formState.turn}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        turn: e.target.value as DirectionTurn
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white focus:outline-none focus:border-amber-300"
                  >
                    {DIRECTION_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Distance / Walk Time
                  </label>
                  <input
                    type="text"
                    value={formState.distanceFromGate}
                    onChange={(e) =>
                      setFormState({ ...formState, distanceFromGate: e.target.value })
                    }
                    placeholder="e.g., 30 m Left"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Wing / Floor Location Note
                  </label>
                  <input
                    type="text"
                    value={formState.locationNote}
                    onChange={(e) =>
                      setFormState({ ...formState, locationNote: e.target.value })
                    }
                    placeholder="e.g., Ground Floor · West Courtyard Corridor"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Step-by-Step Walking Directions from Main Gate (one step per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formState.walkingStepsText}
                    onChange={(e) =>
                      setFormState({ ...formState, walkingStepsText: e.target.value })
                    }
                    placeholder="1. Enter Main Gate&#10;2. Walk straight into courtyard..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-emerald-200 mb-1.5">
                    Point Description &amp; Purpose
                  </label>
                  <textarea
                    rows={3}
                    value={formState.description}
                    onChange={(e) =>
                      setFormState({ ...formState, description: e.target.value })
                    }
                    placeholder="Describe what students or visitors find at this spot..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#042f28] border border-emerald-700 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-300"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-emerald-800/70">
                <div>
                  {formState.editingId && currentFacility.isCustom && (
                    <button
                      type="button"
                      onClick={() => handleDeleteCustomStop(formState.editingId!)}
                      className="px-4 py-2 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-semibold flex items-center gap-1.5 border border-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Added Point</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormState(null);
                      setDraftPinCoords(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{formState.editingId ? 'Save Map Point' : 'Add Point to Map'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Interactive Map / Facility Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Interactive Campus Map OR Facility Graphic */}
            <div className="lg:col-span-7">
              {activeView === 'map' ? (
                <CampusMapCanvas
                  stops={stops}
                  selectedIndex={safeIndex}
                  onSelectStop={handleSelectFacility}
                  mapMode={mapMode}
                  onMapCoordinatePick={handleMapCoordinatePick}
                  draftPinCoords={draftPinCoords}
                />
              ) : (
                <div>
                  <FacilityGraphic
                    facility={currentFacility}
                    activeHotspot={activeHotspot}
                    onSelectHotspot={setActiveHotspot}
                  />
                  <div className="mt-3 flex items-center justify-between text-xs text-stone-400 px-1">
                    <span>Click info pins on the graphic to inspect facility features</span>
                    <button
                      onClick={() => setActiveView('map')}
                      className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1"
                    >
                      <MapIcon className="w-3.5 h-3.5" />
                      <span>Back to Campus Map</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 Columns: Selected Stop + Gate-Entry Walking Directions */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-amber-300 font-semibold mb-1.5">
                  <span>{currentFacility.badge}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-200">
                    Point {currentFacility.stopNumber}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {currentFacility.name}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200 mt-1 font-medium">
                  {currentFacility.subtitle}
                </p>
              </div>

              {/* Gate-Entry Directions Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#04362c] border border-amber-300/35 space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-emerald-700/70 pb-2.5">
                  <div className="flex items-center gap-2">
                    <DirectionIcon turn={currentFacility.gateDirections.turn} />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Directions From Main Gate
                    </span>
                  </div>
                  <span className="text-xs font-mono tabular-nums text-emerald-100">
                    {currentFacility.gateDirections.turn} · {currentFacility.gateDirections.distanceFromGate}
                  </span>
                </div>

                <ol className="space-y-2">
                  {currentFacility.gateDirections.walkingSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-100 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/40 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Description */}
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                {currentFacility.description}
              </p>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 gap-2.5">
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

              {/* Highlights */}
              {currentFacility.highlights.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-emerald-800/80">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                    Facility Highlights
                  </span>
                  <div className="space-y-1.5">
                    {currentFacility.highlights.slice(0, 4).map((hl, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-stone-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Action Bar */}
              <div className="pt-3 border-t border-emerald-800/80 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-stone-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{currentFacility.locationNote}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setActiveView((v) => (v === 'map' ? 'interior' : 'map'))
                    }
                    className="px-3.5 py-2 bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    {activeView === 'map' ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Facility</span>
                      </>
                    ) : (
                      <>
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Show on Map</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-lg shadow transition-all flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <span>Next Point</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
