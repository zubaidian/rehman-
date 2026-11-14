import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  CAMPUS_TOUR_STOPS,
  DirectionTurn,
  FacilityHotspot,
  GATE_COORDS,
  GATE_TO_PRINCIPAL_CHECKPOINTS,
  TourFacility
} from '../data/campusTourData';
import { FacilityGraphic } from './FacilityGraphic';
import {
  buildAutoRoutePath,
  CampusMapCanvas,
  getStopColorTheme,
  MapInteractionMode,
  suggestDirectionsFromGate,
  VisitorWalkerState
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
  Save,
  Footprints,
  Square
} from 'lucide-react';

const TOUR_STORAGE_KEY = 'ggzc_campus_tour_map_stops_v5';

type SimTargetMode = 'guided-principal' | 'selected-stop';

function interpolateWalkerOnRoute(
  route: { x: number; y: number }[],
  progress: number
): VisitorWalkerState {
  if (!route || route.length === 0) {
    return { x: GATE_COORDS.x, y: GATE_COORDS.y, angleDeg: 0, active: false };
  }
  if (route.length === 1) {
    return { x: route[0].x, y: route[0].y, angleDeg: 0, active: true };
  }

  const clamped = Math.max(0, Math.min(1, progress));
  const segments: {
    start: { x: number; y: number };
    end: { x: number; y: number };
    len: number;
    angleDeg: number;
  }[] = [];
  let totalLength = 0;

  for (let i = 0; i < route.length - 1; i++) {
    const start = route[i];
    const end = route[i + 1];
    // Scale to 1000x600 SVG aspect ratio for natural walking speed & heading
    const dxSvg = (end.x - start.x) * 10;
    const dySvg = (end.y - start.y) * 6;
    const len = Math.hypot(dxSvg, dySvg);
    if (len > 0.01) {
      const angleDeg = (Math.atan2(dxSvg, -dySvg) * 180) / Math.PI;
      segments.push({ start, end, len, angleDeg });
      totalLength += len;
    }
  }

  if (segments.length === 0 || totalLength === 0) {
    return { x: route[0].x, y: route[0].y, angleDeg: 0, active: true };
  }

  const targetDist = clamped * totalLength;
  let accumulated = 0;

  for (const seg of segments) {
    if (accumulated + seg.len >= targetDist) {
      const localT = (targetDist - accumulated) / seg.len;
      return {
        x: seg.start.x + (seg.end.x - seg.start.x) * localT,
        y: seg.start.y + (seg.end.y - seg.start.y) * localT,
        angleDeg: seg.angleDeg,
        active: true
      };
    }
    accumulated += seg.len;
  }

  const last = segments[segments.length - 1];
  return {
    x: last.end.x,
    y: last.end.y,
    angleDeg: last.angleDeg,
    active: true
  };
}

function getSurroundingsAtCoord(
  x: number,
  y: number,
  targetStop: TourFacility,
  progress: number,
  simTarget: SimTargetMode
) {
  if (simTarget === 'guided-principal') {
    let matched = GATE_TO_PRINCIPAL_CHECKPOINTS[0];
    for (const cp of GATE_TO_PRINCIPAL_CHECKPOINTS) {
      if (progress >= cp.progress - 0.05) {
        matched = cp;
      }
    }
    return {
      stageLabel: matched.label,
      leftView: matched.leftView,
      aheadView: matched.aheadView,
      rightView: matched.rightView
    };
  }

  if (y >= 80 && Math.abs(x - 50) <= 10) {
    return {
      stageLabel: 'Entering Main College Gate (Security Check)',
      leftView: 'Security Post & Guard · Notice Board Plaza & SECCAP Desk',
      aheadView: 'Gate Security Guards & straight walkway toward Clerk Office (Left) & Central Library (Right)',
      rightView: 'Gate Guard · College Canteen right after entrance gate'
    };
  }

  if (progress >= 0.96) {
    return {
      stageLabel: `Arrived at ${targetStop.shortName || targetStop.name}`,
      leftView: targetStop.mapX < 45 ? `${targetStop.shortName || targetStop.name} entrance` : 'Central promenade & west wing corridor',
      aheadView: targetStop.locationNote,
      rightView: targetStop.mapX > 55 ? `${targetStop.shortName || targetStop.name} entrance` : 'Walking lawn, gardeners & right campus wing'
    };
  }

  return {
    stageLabel: `Walking toward ${targetStop.shortName || targetStop.name}`,
    leftView:
      y < 62 && y > 35
        ? 'West courtyard & shaded walkway'
        : x < 45
          ? `${targetStop.shortName || targetStop.name} side walkway`
          : 'Clerk Office & Twin Grill Paths',
    aheadView: `${targetStop.shortName || targetStop.name} (${targetStop.gateDirections.turn})`,
    rightView:
      y < 62 && y > 35
        ? 'Walking Lawn, Trees & Gardeners (Right of Path) · Principal’s Office ahead'
        : x > 55
          ? `${targetStop.shortName || targetStop.name} side walkway`
          : 'College Canteen, Central Library & Walking Lawn (Right)'
  };
}

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

  // Virtual Visitor Walk Simulation States (starts active so visitor is visibly walking)
  const [simTarget, setSimTarget] = useState<SimTargetMode>('guided-principal');
  const [simActive, setSimActive] = useState(true);
  const [isSimulating, setIsSimulating] = useState(true);
  const [autoLoopWalk, setAutoLoopWalk] = useState(true);
  const [simProgress, setSimProgress] = useState(0);
  const [simSpeed, setSimSpeed] = useState<1 | 2>(1);
  const lastFrameRef = useRef<number | null>(null);

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

  const principalStop = useMemo(
    () => stops.find((s) => s.id === 'principal-office') || stops[0],
    [stops]
  );

  // Active route for the visitor simulation
  const simulationRoute = useMemo(() => {
    if (simTarget === 'guided-principal') {
      return (
        principalStop?.gateDirections?.routePath || [
          { x: 50, y: 90 },
          { x: 50, y: 71 },
          { x: 50, y: 54 },
          { x: 50, y: 36 },
          { x: 65.5, y: 36 }
        ]
      );
    }
    const stopRoute = currentFacility.gateDirections?.routePath;
    if (stopRoute && stopRoute.length >= 2) return stopRoute;
    // Fallback if user selected Main Gate itself while in 'selected-stop' mode
    return buildAutoRoutePath(currentFacility.mapX, currentFacility.mapY);
  }, [simTarget, principalStop, currentFacility]);

  const walkerState: VisitorWalkerState | null = useMemo(() => {
    if (!simActive) return null;
    const base = interpolateWalkerOnRoute(simulationRoute, simProgress);
    return {
      ...base,
      isMoving: isSimulating,
      progress: simProgress
    };
  }, [simActive, simulationRoute, simProgress, isSimulating]);

  const activeSimDestination = simTarget === 'guided-principal' ? principalStop : currentFacility;

  const visitorHorizon = useMemo(() => {
    const pos = walkerState || { x: GATE_COORDS.x, y: GATE_COORDS.y };
    return getSurroundingsAtCoord(
      pos.x,
      pos.y,
      activeSimDestination,
      simActive ? simProgress : 0,
      simTarget
    );
  }, [walkerState, activeSimDestination, simActive, simProgress, simTarget]);

  // Smooth requestAnimationFrame loop for virtual visitor walking
  useEffect(() => {
    if (!isSimulating || mapMode !== 'browse' || formState || activeView !== 'map') {
      lastFrameRef.current = null;
      return;
    }

    const durationMs = simSpeed === 2 ? 6500 : 12500;
    let frameId = 0;

    const tick = (now: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = now;
      }
      const dt = now - lastFrameRef.current;
      lastFrameRef.current = now;

      setSimProgress((prev) => {
        const next = prev + dt / durationMs;
        if (next >= 1) {
          setIsSimulating(false);
          return 1;
        }
        return next;
      });

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      lastFrameRef.current = null;
    };
  }, [isSimulating, simSpeed, mapMode, formState, activeView]);

  // Gently restart walk from Main Gate after pausing briefly at destination when Auto-Loop is enabled
  useEffect(() => {
    if (
      !autoLoopWalk ||
      !simActive ||
      isSimulating ||
      simProgress < 0.999 ||
      mapMode !== 'browse' ||
      formState ||
      activeView !== 'map'
    ) {
      return;
    }
    const restartTimer = setTimeout(() => {
      setSimProgress(0);
      setIsSimulating(true);
    }, 2200);
    return () => clearTimeout(restartTimer);
  }, [autoLoopWalk, simActive, isSimulating, simProgress, mapMode, formState, activeView]);

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

  // Auto-tour timer (pauses automatically while editing map or open form or simulating walk)
  useEffect(() => {
    if (!isPlaying || isSimulating || mapMode !== 'browse' || formState) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stops.length);
      setActiveHotspot(null);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, isSimulating, stops.length, mapMode, formState]);

  const handleToggleWalkSimulation = () => {
    setActiveView('map');
    setIsPlaying(false);
    setMapMode('browse');

    if (simTarget === 'selected-stop' && currentFacility.id === 'historic-gateway') {
      const pIdx = stops.findIndex((s) => s.id === 'principal-office');
      if (pIdx !== -1) setCurrentIndex(pIdx);
    } else if (simTarget === 'guided-principal') {
      const pIdx = stops.findIndex((s) => s.id === 'principal-office');
      if (pIdx !== -1) setCurrentIndex(pIdx);
    }

    if (isSimulating) {
      setIsSimulating(false);
      setAutoLoopWalk(false);
    } else {
      setSimActive(true);
      if (simProgress >= 0.99) {
        setSimProgress(0);
      }
      setIsSimulating(true);
    }
  };

  const handleReplayWalk = () => {
    setActiveView('map');
    setIsPlaying(false);
    setMapMode('browse');
    if (simTarget === 'guided-principal') {
      const pIdx = stops.findIndex((s) => s.id === 'principal-office');
      if (pIdx !== -1) setCurrentIndex(pIdx);
    }
    setSimActive(true);
    setAutoLoopWalk(true);
    setSimProgress(0);
    setIsSimulating(true);
  };

  const handleStopWalkSimulation = () => {
    setIsSimulating(false);
    setAutoLoopWalk(false);
    setSimActive(false);
    setSimProgress(0);
  };

  const handleStepWalkCheckpoint = (direction: -1 | 1) => {
    setActiveView('map');
    setIsPlaying(false);
    setIsSimulating(false);
    setAutoLoopWalk(false);
    setSimActive(true);
    if (simTarget === 'guided-principal') {
      const pIdx = stops.findIndex((s) => s.id === 'principal-office');
      if (pIdx !== -1) setCurrentIndex(pIdx);
      const pts = GATE_TO_PRINCIPAL_CHECKPOINTS.map((c) => c.progress);
      if (direction > 0) {
        const nextPt = pts.find((p) => p > simProgress + 0.02);
        setSimProgress(nextPt !== undefined ? nextPt : 1);
      } else {
        const prevPts = pts.filter((p) => p < simProgress - 0.02);
        setSimProgress(prevPts.length > 0 ? prevPts[prevPts.length - 1] : 0);
      }
    } else {
      setSimProgress((prev) => Math.max(0, Math.min(1, prev + direction * 0.25)));
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stops.length);
    setActiveHotspot(null);
    if (simTarget === 'selected-stop' && simActive) {
      setSimProgress(0);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stops.length) % stops.length);
    setActiveHotspot(null);
    if (simTarget === 'selected-stop' && simActive) {
      setSimProgress(0);
    }
  };

  const handleSelectFacility = (index: number) => {
    setCurrentIndex(index);
    setActiveHotspot(null);
    const picked = stops[index];
    if (picked && picked.id !== 'historic-gateway') {
      setSimTarget('selected-stop');
      setSimActive(true);
      setSimProgress(0);
      setIsSimulating(true);
    }
  };

  // Start inserting a new map point
  const startInsertMode = () => {
    setActiveView('map');
    setIsPlaying(false);
    setIsSimulating(false);
    setFormState(null);
    setDraftPinCoords(null);
    setMapMode((prev) => (prev === 'insert' ? 'browse' : 'insert'));
  };

  // Start repositioning the currently selected point
  const startRepositionMode = () => {
    setActiveView('map');
    setIsPlaying(false);
    setIsSimulating(false);
    setFormState(null);
    setDraftPinCoords(null);
    setMapMode((prev) => (prev === 'reposition' ? 'browse' : 'reposition'));
  };

  // Open edit modal for current point
  const openEditCurrentPoint = () => {
    setIsPlaying(false);
    setIsSimulating(false);
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
            {import.meta.env.DEV
              ? 'Start right as you enter the Main College Gate on Pathan Colony Road—click any point on the campus map for step-by-step walking directions, or insert new campus points and custom routes.'
              : 'Start right as you enter the Main College Gate on Pathan Colony Road—click any point on the campus map for step-by-step walking directions to each wing, office, and laboratory.'}
          </p>
        </div>

        {/* Facility & Map Stop Selector Strip (Color-Matched to Map Pins) */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2 mb-8">
          {stops.map((stop, idx) => {
            const isActive = idx === safeIndex;
            const theme = getStopColorTheme(stop.id, idx);
            return (
              <button
                key={stop.id}
                onClick={() => handleSelectFacility(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 border ${
                  isActive
                    ? 'bg-white text-emerald-950 border-white shadow-lg font-bold'
                    : 'bg-[#063f35] text-stone-100 border-emerald-800 hover:bg-[#074c3f] hover:text-white'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold tabular-nums shadow-sm ${theme.pinBg} ${theme.pinText}`}
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

            {/* Right Controls: Map Edit Actions (Dev/Edit Only) & Tour Playback */}
            <div className="flex flex-wrap items-center gap-2">
              {import.meta.env.DEV && (
                <>
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
                </>
              )}

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

          {/* Inline Insert / Edit Point Form Panel (Edit / Development Mode Only) */}
          {import.meta.env.DEV && formState && (
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
            {/* Left 7 Columns: Interactive Campus Map + Virtual Visitor Walk Simulation OR Facility Graphic */}
            <div className="lg:col-span-7 space-y-4">
              {activeView === 'map' ? (
                <>
                  <CampusMapCanvas
                    stops={stops}
                    selectedIndex={safeIndex}
                    onSelectStop={handleSelectFacility}
                    mapMode={mapMode}
                    onMapCoordinatePick={handleMapCoordinatePick}
                    draftPinCoords={draftPinCoords}
                    walker={walkerState}
                    customRoutePath={simActive ? simulationRoute : null}
                  />

                  {/* Virtual Visitor Walk Simulator Bar & Live Horizon Viewfinder */}
                  <div className="bg-[#021914] border border-emerald-700/70 rounded-2xl p-4 sm:p-5 space-y-4 text-left">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-300 shrink-0">
                          <Footprints className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300 block">
                            Virtual Visitor Walk Simulation
                          </span>
                          <h4 className="text-sm font-semibold text-white">
                            {simActive
                              ? visitorHorizon.stageLabel
                              : 'Walk virtually from the Main Gate & see what is Left, Ahead, and Right'}
                          </h4>
                        </div>
                      </div>

                      {/* Route Target Switcher */}
                      <div className="flex items-center gap-1 p-1 rounded-lg bg-[#042f28] border border-emerald-800">
                        <button
                          type="button"
                          onClick={() => {
                            setSimTarget('guided-principal');
                            setSimActive(true);
                            setAutoLoopWalk(true);
                            setSimProgress(0);
                            setIsSimulating(true);
                            const pIdx = stops.findIndex((s) => s.id === 'principal-office');
                            if (pIdx !== -1) setCurrentIndex(pIdx);
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition-colors ${
                            simTarget === 'guided-principal'
                              ? 'bg-sky-400 text-slate-950 font-bold'
                              : 'text-stone-300 hover:text-white'
                          }`}
                        >
                          Gate → Principal’s Office
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSimTarget('selected-stop');
                            setSimActive(true);
                            setAutoLoopWalk(true);
                            setSimProgress(0);
                            setIsSimulating(true);
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold whitespace-nowrap transition-colors ${
                            simTarget === 'selected-stop'
                              ? 'bg-sky-400 text-slate-950 font-bold'
                              : 'text-stone-300 hover:text-white'
                          }`}
                        >
                          Walk to Selected Pin
                        </button>
                      </div>
                    </div>

                    {/* Simulation Playback Controls & Progress Scrubber */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleToggleWalkSimulation}
                        className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors shadow ${
                          isSimulating
                            ? 'bg-amber-400 text-emerald-950 hover:bg-amber-300'
                            : 'bg-sky-400 text-slate-950 hover:bg-sky-300'
                        }`}
                      >
                        {isSimulating ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pause Walk</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>
                              {simActive && simProgress > 0.01 && simProgress < 0.99
                                ? 'Resume Walk'
                                : 'Simulate Walk'}
                            </span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStepWalkCheckpoint(-1)}
                        className="px-2.5 py-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-stone-200 border border-emerald-700 text-xs font-semibold flex items-center gap-1 whitespace-nowrap shrink-0"
                        title="Step backward along path"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span>Step Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStepWalkCheckpoint(1)}
                        className="px-2.5 py-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-stone-200 border border-emerald-700 text-xs font-semibold flex items-center gap-1 whitespace-nowrap shrink-0"
                        title="Step forward along path"
                      >
                        <span>Step Forward</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleReplayWalk}
                        className="p-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 transition-colors"
                        title="Replay walk from Main Gate"
                        aria-label="Replay walk from Main Gate"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSimSpeed((s) => (s === 1 ? 2 : 1))}
                        className="px-2.5 py-2 rounded-lg bg-[#063f35] hover:bg-emerald-800 text-amber-200 border border-emerald-700 text-xs font-mono font-bold whitespace-nowrap shrink-0"
                        title="Toggle walking simulation speed"
                      >
                        {simSpeed}x
                      </button>

                      {simActive && (
                        <button
                          type="button"
                          onClick={handleStopWalkSimulation}
                          className="p-2 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors"
                          title="Clear visitor marker"
                          aria-label="Clear visitor marker"
                        >
                          <Square className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <div className="flex-1 min-w-[140px] flex items-center gap-2 pl-1">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={Math.round(simProgress * 100)}
                          onChange={(e) => {
                            const val = Number(e.target.value) / 100;
                            setIsSimulating(false);
                            setAutoLoopWalk(false);
                            setSimActive(true);
                            setSimProgress(val);
                          }}
                          aria-label="Walk simulation progress"
                          className="w-full accent-sky-400 cursor-pointer"
                        />
                        <span className="text-[11px] font-mono tabular-nums text-sky-300 w-9 text-right">
                          {Math.round(simProgress * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Live 3-Direction Visitor Horizon Viewfinder */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-emerald-800/80">
                      <div className="p-2.5 rounded-xl bg-[#042f28] border border-emerald-800/80">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                          <ArrowUpLeft className="w-3 h-3" />
                          <span>On Your Left</span>
                        </span>
                        <p className="text-xs text-stone-100 mt-1 leading-snug">
                          {visitorHorizon.leftView}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#042f28] border border-sky-500/40">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1">
                          <ArrowUp className="w-3 h-3" />
                          <span>Straight Ahead</span>
                        </span>
                        <p className="text-xs text-stone-100 mt-1 leading-snug">
                          {visitorHorizon.aheadView}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#042f28] border border-emerald-800/80">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" />
                          <span>On Your Right</span>
                        </span>
                        <p className="text-xs text-stone-100 mt-1 leading-snug">
                          {visitorHorizon.rightView}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
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
