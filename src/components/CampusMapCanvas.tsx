import React, { useRef, useState } from 'react';
import {
  DirectionTurn,
  GATE_COORDS,
  TourFacility
} from '../data/campusTourData';
import { Navigation, Compass, Crosshair } from 'lucide-react';

export type MapInteractionMode = 'browse' | 'insert' | 'reposition';

export interface VisitorWalkerState {
  x: number;
  y: number;
  angleDeg: number;
  active: boolean;
  isMoving?: boolean;
  progress?: number;
  stepLabel?: string;
}

export interface StopColorTheme {
  pinBg: string;
  pinText: string;
  pinBorder: string;
  ringGlow: string;
  hex: string;
  textClass: string;
  activeBorder: string;
  badgeBg: string;
}

const STOP_THEMES_BY_ID: Record<string, StopColorTheme> = {
  'historic-gateway': {
    pinBg: 'bg-[#10b981]',
    pinText: 'text-white',
    pinBorder: 'border-[#a7f3d0]',
    ringGlow: 'bg-[#34d399]/45',
    hex: '#34d399',
    textClass: 'text-[#6ee7b7]',
    activeBorder: 'border-[#34d399]',
    badgeBg: 'bg-[#10b981] text-white'
  },
  'waiting-room': {
    pinBg: 'bg-[#0ea5e9]',
    pinText: 'text-white',
    pinBorder: 'border-[#bae6fd]',
    ringGlow: 'bg-[#38bdf8]/45',
    hex: '#38bdf8',
    textClass: 'text-[#7dd3fc]',
    activeBorder: 'border-[#38bdf8]',
    badgeBg: 'bg-[#0ea5e9] text-white'
  },
  'college-canteen': {
    pinBg: 'bg-[#f97316]',
    pinText: 'text-white',
    pinBorder: 'border-[#fed7aa]',
    ringGlow: 'bg-[#fb923c]/45',
    hex: '#fb923c',
    textClass: 'text-[#fdba74]',
    activeBorder: 'border-[#fb923c]',
    badgeBg: 'bg-[#f97316] text-white'
  },
  'clerk-office': {
    pinBg: 'bg-[#14b8a6]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#ccfbf1]',
    ringGlow: 'bg-[#2dd4bf]/45',
    hex: '#2dd4bf',
    textClass: 'text-[#5eead4]',
    activeBorder: 'border-[#2dd4bf]',
    badgeBg: 'bg-[#14b8a6] text-slate-950'
  },
  'central-library': {
    pinBg: 'bg-[#8b5cf6]',
    pinText: 'text-white',
    pinBorder: 'border-[#ddd6fe]',
    ringGlow: 'bg-[#a78bfa]/45',
    hex: '#a78bfa',
    textClass: 'text-[#c4b5fd]',
    activeBorder: 'border-[#a78bfa]',
    badgeBg: 'bg-[#8b5cf6] text-white'
  },
  'grill-divided-walkway': {
    pinBg: 'bg-[#84cc16]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-[#ecfccb]',
    ringGlow: 'bg-[#a3e635]/45',
    hex: '#a3e635',
    textClass: 'text-[#bef264]',
    activeBorder: 'border-[#a3e635]',
    badgeBg: 'bg-[#84cc16] text-emerald-950'
  },
  'chemistry-labs': {
    pinBg: 'bg-[#06b6d4]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#cffafe]',
    ringGlow: 'bg-[#22d3ee]/45',
    hex: '#22d3ee',
    textClass: 'text-[#67e8f9]',
    activeBorder: 'border-[#22d3ee]',
    badgeBg: 'bg-[#06b6d4] text-slate-950'
  },
  'auditorium-hall': {
    pinBg: 'bg-[#f43f5e]',
    pinText: 'text-white',
    pinBorder: 'border-[#fecdd3]',
    ringGlow: 'bg-[#fb7185]/45',
    hex: '#fb7185',
    textClass: 'text-[#fda4af]',
    activeBorder: 'border-[#fb7185]',
    badgeBg: 'bg-[#f43f5e] text-white'
  },
  'principal-office': {
    pinBg: 'bg-[#f59e0b]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-[#fef3c7]',
    ringGlow: 'bg-[#fbbf24]/50',
    hex: '#fbbf24',
    textClass: 'text-[#fcd34d]',
    activeBorder: 'border-[#fbbf24]',
    badgeBg: 'bg-[#f59e0b] text-emerald-950'
  },
  'general-staff-room': {
    pinBg: 'bg-[#6366f1]',
    pinText: 'text-white',
    pinBorder: 'border-[#e0e7ff]',
    ringGlow: 'bg-[#818cf8]/45',
    hex: '#818cf8',
    textClass: 'text-[#a5b4fc]',
    activeBorder: 'border-[#818cf8]',
    badgeBg: 'bg-[#6366f1] text-white'
  },
  'islamiat-english': {
    pinBg: 'bg-[#ec4899]',
    pinText: 'text-white',
    pinBorder: 'border-[#fce7f3]',
    ringGlow: 'bg-[#f472b6]/45',
    hex: '#f472b6',
    textClass: 'text-[#f9a8d4]',
    activeBorder: 'border-[#f472b6]',
    badgeBg: 'bg-[#ec4899] text-white'
  },
  'statistics-mathematics': {
    pinBg: 'bg-[#d946ef]',
    pinText: 'text-white',
    pinBorder: 'border-[#fae8ff]',
    ringGlow: 'bg-[#e879f9]/45',
    hex: '#e879f9',
    textClass: 'text-[#f0abfc]',
    activeBorder: 'border-[#e879f9]',
    badgeBg: 'bg-[#d946ef] text-white'
  },
  'physics-lab-darkroom': {
    pinBg: 'bg-[#3b82f6]',
    pinText: 'text-white',
    pinBorder: 'border-[#dbeafe]',
    ringGlow: 'bg-[#60a5fa]/45',
    hex: '#60a5fa',
    textClass: 'text-[#93c5fd]',
    activeBorder: 'border-[#60a5fa]',
    badgeBg: 'bg-[#3b82f6] text-white'
  },
  'greenhouse-prayer-ground': {
    pinBg: 'bg-[#22c55e]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#dcfce7]',
    ringGlow: 'bg-[#4ade80]/45',
    hex: '#4ade80',
    textClass: 'text-[#86efac]',
    activeBorder: 'border-[#4ade80]',
    badgeBg: 'bg-[#22c55e] text-slate-950'
  },
  'zoology-botany-labs': {
    pinBg: 'bg-[#34d399]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-white',
    ringGlow: 'bg-[#6ee7b7]/45',
    hex: '#6ee7b7',
    textClass: 'text-[#a7f3d0]',
    activeBorder: 'border-[#6ee7b7]',
    badgeBg: 'bg-[#34d399] text-emerald-950'
  },
  'hostel-computer-lab': {
    pinBg: 'bg-[#fb923c]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#ffedd5]',
    ringGlow: 'bg-[#fdba74]/45',
    hex: '#fdba74',
    textClass: 'text-[#fed7aa]',
    activeBorder: 'border-[#fdba74]',
    badgeBg: 'bg-[#fb923c] text-slate-950'
  },
  'computer-lab': {
    pinBg: 'bg-[#00d4ff]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#e0f2fe]',
    ringGlow: 'bg-[#7dd3fc]/45',
    hex: '#00d4ff',
    textClass: 'text-[#8ce9ff]',
    activeBorder: 'border-[#00d4ff]',
    badgeBg: 'bg-[#00d4ff] text-slate-950'
  },
  'computer-multimedia-room': {
    pinBg: 'bg-[#c084fc]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#f3e8ff]',
    ringGlow: 'bg-[#d8b4fe]/45',
    hex: '#c084fc',
    textClass: 'text-[#e9d5ff]',
    activeBorder: 'border-[#c084fc]',
    badgeBg: 'bg-[#c084fc] text-slate-950'
  },
  'tennis-volleyball-grounds': {
    pinBg: 'bg-[#facc15]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#fef9c3]',
    ringGlow: 'bg-[#fde047]/50',
    hex: '#fde047',
    textClass: 'text-[#fef08a]',
    activeBorder: 'border-[#fde047]',
    badgeBg: 'bg-[#facc15] text-slate-950'
  },
  'pak-urdu-pe': {
    pinBg: 'bg-[#ef4444]',
    pinText: 'text-white',
    pinBorder: 'border-[#fee2e2]',
    ringGlow: 'bg-[#f87171]/45',
    hex: '#f87171',
    textClass: 'text-[#fca5a5]',
    activeBorder: 'border-[#f87171]',
    badgeBg: 'bg-[#ef4444] text-white'
  },
  'commerce-dept-library': {
    pinBg: 'bg-[#a855f7]',
    pinText: 'text-white',
    pinBorder: 'border-[#f3e8ff]',
    ringGlow: 'bg-[#c084fc]/45',
    hex: '#d8b4fe',
    textClass: 'text-[#f5d0fe]',
    activeBorder: 'border-[#d8b4fe]',
    badgeBg: 'bg-[#a855f7] text-white'
  },
  'sindhi-economics-physiology-ground': {
    pinBg: 'bg-[#bef264]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-white',
    ringGlow: 'bg-[#d9f99d]/45',
    hex: '#d9f99d',
    textClass: 'text-[#ecfccb]',
    activeBorder: 'border-[#d9f99d]',
    badgeBg: 'bg-[#bef264] text-emerald-950'
  }
};

const FALLBACK_THEMES: StopColorTheme[] = Object.values(STOP_THEMES_BY_ID);

export function getStopColorTheme(stopId: string, index: number): StopColorTheme {
  return STOP_THEMES_BY_ID[stopId] || FALLBACK_THEMES[index % FALLBACK_THEMES.length];
}

interface CampusMapCanvasProps {
  stops: TourFacility[];
  selectedIndex: number;
  onSelectStop: (index: number) => void;
  mapMode: MapInteractionMode;
  onMapCoordinatePick?: (x: number, y: number) => void;
  draftPinCoords?: { x: number; y: number } | null;
  walker?: VisitorWalkerState | null;
  customRoutePath?: { x: number; y: number }[] | null;
}

export function buildAutoRoutePath(x: number, y: number): { x: number; y: number }[] {
  if (Math.abs(x - GATE_COORDS.x) <= 7) {
    return [GATE_COORDS, { x, y }];
  }
  if (y > 78) {
    return [GATE_COORDS, { x: 50, y: 83.5 }, { x, y }];
  }
  if (y > 65) {
    return [GATE_COORDS, { x: 50, y: 72 }, { x, y }];
  }
  return [
    GATE_COORDS,
    { x: 50, y: 72 },
    { x: 50, y: Math.max(18, Math.min(60, y)) },
    { x, y }
  ];
}

export function suggestDirectionsFromGate(
  x: number,
  y: number,
  placeName?: string
): {
  turn: DirectionTurn;
  distanceFromGate: string;
  walkingSteps: string[];
  routePath: { x: number; y: number }[];
} {
  const label = placeName?.trim() || 'this campus point';
  const dx = x - GATE_COORDS.x;
  const dy = GATE_COORDS.y - y;
  const estMeters = Math.max(8, Math.round(Math.hypot(dx * 0.9, dy * 1.1)));

  let turn: DirectionTurn = 'Straight Ahead';
  let step2 =
    'Walk straight along the twin paths separated by the small grill, crossing the Big Lawn past the Clerk Office and Central Library on the right.';

  if (dy < 6 && Math.abs(dx) <= 6) {
    turn = 'Entry Gate';
    step2 = 'On your left is the Waiting Room and on your right is the College Canteen.';
  } else if (dx <= -15 && y > 76) {
    turn = 'Turn Left';
    step2 = 'Upon entering the Security Gate, turn left beside the Visitor Waiting Room.';
  } else if (dx <= -15 && y > 43) {
    turn = 'Turn Left';
    step2 = 'Walk straight across the Big Lawn to the Chemistry Labs & Auditorium line, then turn left.';
  } else if (dx <= -8) {
    turn = 'Bear Left';
    step2 =
      'Take the left path between two grills toward Hostel & Computer Lab or continue north toward the Tennis/Volleyball Ground.';
  } else if (dx >= 15 && y > 76) {
    turn = 'Turn Right';
    step2 = 'Upon entering the Main Gate, turn right past the College Canteen.';
  } else if (dx >= 8) {
    turn = dx >= 20 ? 'Turn Right' : 'Bear Right';
    step2 =
      'Walk straight along the twin grill paths crossing the Big Lawn toward Principal’s Office, then bear right.';
  }

  return {
    turn,
    distanceFromGate: `${estMeters} m ${
      turn === 'Straight Ahead'
        ? 'Straight'
        : turn === 'Entry Gate'
          ? '(At Gate)'
          : dx < 0
            ? 'Left'
            : 'Right'
    }`,
    walkingSteps: [
      'Enter through the Security-monitored Main College Gate (Waiting Room left, Canteen right).',
      step2,
      `Arrive at ${label} (approx. ${estMeters} meters inside the gate).`
    ],
    routePath: buildAutoRoutePath(x, y)
  };
}

function buildWalkedTrail(
  route: { x: number; y: number }[],
  progress: number
): { walkedPoints: { x: number; y: number }[]; footprints: { x: number; y: number }[] } {
  if (!route || route.length < 2 || progress <= 0.01) {
    return { walkedPoints: [], footprints: [] };
  }
  const clamped = Math.max(0, Math.min(1, progress));
  const segs: { a: { x: number; y: number }; b: { x: number; y: number }; len: number }[] = [];
  let total = 0;

  for (let i = 0; i < route.length - 1; i++) {
    const a = route[i];
    const b = route[i + 1];
    const len = Math.hypot((b.x - a.x) * 10, (b.y - a.y) * 6);
    if (len > 0.01) {
      segs.push({ a, b, len });
      total += len;
    }
  }

  if (total === 0) return { walkedPoints: [], footprints: [] };

  const target = clamped * total;
  const walkedPoints: { x: number; y: number }[] = [route[0]];
  let acc = 0;

  for (const seg of segs) {
    if (acc + seg.len < target) {
      walkedPoints.push(seg.b);
      acc += seg.len;
    } else {
      const t = (target - acc) / seg.len;
      walkedPoints.push({
        x: seg.a.x + (seg.b.x - seg.a.x) * t,
        y: seg.a.y + (seg.b.y - seg.a.y) * t
      });
      break;
    }
  }

  const footprints: { x: number; y: number }[] = [];
  const stepDist = 34;
  for (let d = 24; d < target - 14; d += stepDist) {
    let run = 0;
    for (const seg of segs) {
      if (run + seg.len >= d) {
        const t = (d - run) / seg.len;
        footprints.push({
          x: seg.a.x + (seg.b.x - seg.a.x) * t,
          y: seg.a.y + (seg.b.y - seg.a.y) * t
        });
        break;
      }
      run += seg.len;
    }
  }

  return { walkedPoints, footprints };
}

function SolarPanelArray({
  x,
  y,
  w = 34,
  h = 11
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
}) {
  const cols = 4;
  const colW = w / cols;
  return (
    <g opacity="0.96">
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="2"
        fill="#082f49"
        stroke="#7dd3fc"
        strokeWidth="1.05"
      />
      <rect x={x + 1.5} y={y + 1.5} width={w - 3} height={h - 3} rx="1" fill="#0369a1" />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="#bae6fd" strokeWidth="0.7" />
      {Array.from({ length: cols - 1 }).map((_, idx) => (
        <line
          key={idx}
          x1={x + colW * (idx + 1)}
          y1={y + 1}
          x2={x + colW * (idx + 1)}
          y2={y + h - 1}
          stroke="#bae6fd"
          strokeWidth="0.7"
        />
      ))}
      <line x1={x + 2} y1={y + 0.8} x2={x + w - 2} y2={y + 0.8} stroke="#fde047" strokeWidth="0.85" strokeOpacity="0.85" />
    </g>
  );
}

export function CampusMapCanvas({
  stops,
  selectedIndex,
  onSelectStop,
  mapMode,
  onMapCoordinatePick,
  draftPinCoords,
  walker,
  customRoutePath
}: CampusMapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverCoords, setHoverCoords] = useState<{ x: number; y: number } | null>(null);

  const selectedStop = stops[selectedIndex] || stops[0];
  const selectedTheme = getStopColorTheme(selectedStop.id, selectedIndex);

  const extractCoords = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const rawX = ((e.clientX - rect.left) / rect.width) * 100;
    const rawY = ((e.clientY - rect.top) / rect.height) * 100;
    const x = Math.round(Math.max(5, Math.min(95, rawX)) * 10) / 10;
    const y = Math.round(Math.max(7, Math.min(93, rawY)) * 10) / 10;
    return { x, y };
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mapMode === 'browse' || !onMapCoordinatePick) return;
    const coords = extractCoords(e);
    if (coords) {
      onMapCoordinatePick(coords.x, coords.y);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mapMode === 'browse') {
      if (hoverCoords) setHoverCoords(null);
      return;
    }
    const coords = extractCoords(e);
    if (coords) setHoverCoords(coords);
  };

  const activeRoute =
    customRoutePath && customRoutePath.length >= 2
      ? customRoutePath
      : selectedStop?.gateDirections?.routePath && selectedStop.gateDirections.routePath.length >= 2
        ? selectedStop.gateDirections.routePath
        : buildAutoRoutePath(selectedStop.mapX, selectedStop.mapY);

  const polylinePoints = activeRoute.map((pt) => `${pt.x * 10},${pt.y * 6}`).join(' ');

  const walkedTrail =
    walker && walker.active && typeof walker.progress === 'number'
      ? buildWalkedTrail(activeRoute, walker.progress)
      : { walkedPoints: [], footprints: [] };

  const walkedPolylinePoints = walkedTrail.walkedPoints
    .map((pt) => `${pt.x * 10},${pt.y * 6}`)
    .join(' ');

  return (
    <div className="space-y-3">
      {/* Interactive Mode Helper Banner */}
      {mapMode !== 'browse' && (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-amber-400/15 border border-amber-300/60 text-amber-200 text-xs">
          <span className="flex items-center gap-2 font-semibold">
            <Crosshair className="w-4 h-4 text-amber-300 shrink-0" />
            <span>
              {mapMode === 'insert'
                ? 'Click anywhere inside the Campus Map to place your new point & auto-calculate gate directions.'
                : `Click on the Campus Map to move "${selectedStop.shortName || selectedStop.name}" to a new spot.`}
            </span>
          </span>
          {hoverCoords && (
            <span className="font-mono text-[11px] text-amber-300 shrink-0">
              X:{Math.round(hoverCoords.x)}% · Y:{Math.round(hoverCoords.y)}%
            </span>
          )}
        </div>
      )}

      {/* Map Viewport */}
      <div
        ref={containerRef}
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverCoords(null)}
        className={`relative w-full h-[460px] sm:h-[540px] lg:h-[590px] rounded-2xl overflow-hidden bg-[#021914] border-2 shadow-2xl select-none ${
          mapMode !== 'browse'
            ? 'border-amber-300 cursor-crosshair'
            : 'border-amber-300/45'
        }`}
      >
        {/* Architectural Cartographic SVG Ground Plan (1000 x 600 matches X*10, Y*6) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="campus-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="#34d399"
                strokeWidth="0.55"
                strokeOpacity="0.11"
              />
            </pattern>
            <radialGradient id="campus-glow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#065f46" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#021f19" stopOpacity="0.95" />
            </radialGradient>
            <linearGradient id="lawn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#15803d" stopOpacity="0.92" />
              <stop offset="50%" stopColor="#16a34a" stopOpacity="0.86" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.80" />
            </linearGradient>
            <marker
              id="route-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0,1 L7,4 L0,7 Z" fill="#facc15" />
            </marker>
          </defs>

          {/* Rich Jewel Campus Backdrop & Blueprint Grid */}
          <rect width="1000" height="600" fill="url(#campus-glow)" />
          <rect width="1000" height="600" fill="url(#campus-grid)" />

          {/* Architectural Compound Boundary Wall (Steps in at Lower-Right so Central Jail sits OUTSIDE College) */}
          <path
            d="M 48 18 L 952 18 Q 970 18 970 36 L 970 456 Q 970 468 954 468 L 748 468 Q 738 468 738 478 L 738 548 L 30 548 L 30 36 Q 30 18 48 18 Z"
            fill="#032b22"
            fillOpacity="0.65"
            stroke="#34d399"
            strokeOpacity="0.55"
            strokeWidth="2.8"
          />
          <path
            d="M 50 24 L 950 24 Q 964 24 964 38 L 964 454 Q 964 462 952 462 L 744 462 Q 732 462 732 474 L 732 542 L 36 542 L 36 38 Q 36 24 50 24 Z"
            fill="none"
            stroke="#fbbf24"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="8 6"
          />

          {/* ================= NORTH-WEST SECTOR ================= */}

          {/* 19. Tennis Court & Volleyball Playing Ground (Adjacent Before Physical Education) */}
          <rect x="44" y="32" width="138" height="70" rx="10" fill="#713f12" fillOpacity="0.65" stroke="#facc15" strokeWidth="2.2" />
          <rect x="52" y="42" width="54" height="32" rx="2" fill="none" stroke="#fde047" strokeOpacity="0.6" strokeWidth="1.2" />
          <line x1="79" y1="42" x2="79" y2="74" stroke="#fde047" strokeOpacity="0.75" strokeWidth="1.1" strokeDasharray="2 2" />
          <rect x="118" y="42" width="54" height="32" rx="2" fill="none" stroke="#fef08a" strokeOpacity="0.6" strokeWidth="1.2" />
          <line x1="145" y1="42" x2="145" y2="74" stroke="#fef08a" strokeOpacity="0.75" strokeWidth="1.1" strokeDasharray="2 2" />
          <text x="113" y="92" textAnchor="middle" fontSize="8.8" fontWeight="900">
            <tspan fill="#fef08a">TENNIS</tspan>
            <tspan fill="#ffffff"> &amp; </tspan>
            <tspan fill="#fdba74">VOLLEYBALL</tspan>
          </text>

          {/* 16. BIG COLLEGE HOSTEL (Large Multi-Wing Residential Complex Beside Unified Corridor — Warm Tangerine) */}
          <rect x="44" y="114" width="138" height="136" rx="12" fill="#7c2d12" fillOpacity="0.76" stroke="#fb923c" strokeWidth="2.6" />
          <rect x="52" y="132" width="34" height="78" rx="5" fill="#9a3412" fillOpacity="0.75" stroke="#fdba74" strokeOpacity="0.55" strokeWidth="1.2" />
          <rect x="140" y="132" width="34" height="78" rx="5" fill="#9a3412" fillOpacity="0.75" stroke="#fdba74" strokeOpacity="0.55" strokeWidth="1.2" />
          <rect x="92" y="140" width="42" height="54" rx="6" fill="#431407" fillOpacity="0.65" stroke="#fed7aa" strokeOpacity="0.5" strokeWidth="1.2" />
          {/* Sunlit Dormitory Windows */}
          <rect x="58" y="140" width="9" height="8" rx="1.5" fill="#fde68a" fillOpacity="0.78" />
          <rect x="71" y="140" width="9" height="8" rx="1.5" fill="#fde68a" fillOpacity="0.78" />
          <rect x="58" y="155" width="9" height="8" rx="1.5" fill="#fde68a" fillOpacity="0.78" />
          <rect x="71" y="155" width="9" height="8" rx="1.5" fill="#fde68a" fillOpacity="0.78" />
          <rect x="146" y="140" width="9" height="8" rx="1.5" fill="#fde68a" fillOpacity="0.78" />
          <rect x="159" y="140" width="9" height="8" rx="1.5" fill="#fde68a" fillOpacity="0.78" />
          <rect x="146" y="155" width="9" height="8" rx="1.5" fill="#fde68a" fillOpacity="0.78" />
          <rect x="159" y="155" width="9" height="8" rx="1.5" fill="#fde68a" fillOpacity="0.78" />
          <SolarPanelArray x={136} y={118} w={38} h={11} />
          <text x="113" y="224" textAnchor="middle" fill="#fed7aa" fontSize="10.8" fontWeight="900" letterSpacing="0.5">
            COLLEGE HOSTEL
          </text>
          <text x="113" y="241" textAnchor="middle" fill="#fde68a" fontSize="8.4" fontWeight="800">
            BIG HOSTEL (BESIDE CORRIDOR)
          </text>

          {/* UNIFIED SAME BUILDING BESIDE HOSTEL (Ground Floor: ONE CORRIDOR | 1st Floor: Commerce & Commerce Library) */}
          <rect x="190" y="28" width="224" height="222" rx="13" fill="#0f172a" fillOpacity="0.48" stroke="#cbd5e1" strokeOpacity="0.7" strokeWidth="2.4" />
          {/* 1st Floor Label Badge on Building Crown */}
          <rect x="206" y="22" width="192" height="14" rx="4" fill="#1e1b4b" stroke="#c084fc" strokeWidth="1.2" />
          <text x="302" y="32" textAnchor="middle" fill="#f5d0fe" fontSize="7.6" fontWeight="900" letterSpacing="0.4">
            SAME BUILDING · 1ST FLOOR COMMERCE · 1 CORRIDOR
          </text>

          {/* 21. Commerce Dept. & Commerce Library (1st Floor of the SAME Building — Violet) */}
          <rect x="196" y="40" width="212" height="54" rx="9" fill="#581c87" fillOpacity="0.74" stroke="#a78bfa" strokeWidth="2.2" />
          <SolarPanelArray x={366} y={44} w={36} h={11} />
          <text x="288" y="56" textAnchor="middle" fontSize="9.8" fontWeight="900">
            <tspan fill="#f5d0fe">COMMERCE DEPT.</tspan>
            <tspan fill="#ffffff"> &amp; </tspan>
            <tspan fill="#fde68a">COMMERCE LIBRARY</tspan>
          </text>
          <text x="302" y="86" textAnchor="middle" fill="#e9d5ff" fontSize="8.6" fontWeight="900">
            (1ST FLOOR ABOVE CORRIDOR · SAME BUILDING)
          </text>

          {/* 20. Pakistan Studies, Urdu & Physical Education (Upper Section of ONE Ground-Floor Corridor — Coral Red) */}
          <rect x="196" y="100" width="212" height="62" rx="9" fill="#7f1d1d" fillOpacity="0.70" stroke="#f87171" strokeWidth="2.2" />
          <SolarPanelArray x={366} y={104} w={36} h={11} />
          <text x="286" y="117" textAnchor="middle" fontSize="9.6" fontWeight="900">
            <tspan fill="#fca5a5">PAK STUDIES</tspan>
            <tspan fill="#ffffff"> · </tspan>
            <tspan fill="#fde047">URDU</tspan>
          </text>
          <text x="302" y="153" textAnchor="middle" fill="#86efac" fontSize="9.2" fontWeight="900">
            PHYSICAL EDUCATION (SAME CORRIDOR)
          </text>

          {/* 17. Computer Lab & Computer Office (Ground Floor Corridor Beside Hostel — Cyan/Sky) */}
          <rect x="196" y="168" width="96" height="76" rx="9" fill="#075985" fillOpacity="0.76" stroke="#00d4ff" strokeWidth="2.2" />
          <SolarPanelArray x={202} y={172} w={30} h={10} />
          <rect x="240" y="173" width="16" height="11" rx="2" fill="#0c4a6e" stroke="#7dd3fc" strokeWidth="1.1" />
          <rect x="262" y="173" width="18" height="11" rx="2" fill="#1e293b" stroke="#bae6fd" strokeWidth="1.1" />
          <text x="244" y="226" textAnchor="middle" fill="#8ce9ff" fontSize="9" fontWeight="900">
            COMPUTER LAB
          </text>
          <text x="244" y="239" textAnchor="middle" fill="#fde68a" fontSize="8.6" fontWeight="900">
            &amp; COMPUTER OFFICE
          </text>

          {/* 18. BIG Computer Multimedia Room (Extra-Wide Ground Floor Corridor Room — Lavender Purple) */}
          <rect x="296" y="168" width="112" height="76" rx="9" fill="#581c87" fillOpacity="0.76" stroke="#c084fc" strokeWidth="2.4" />
          <SolarPanelArray x={368} y={172} w={34} h={10} />
          <rect x="304" y="173" width="46" height="15" rx="2.5" fill="#1e1b4b" stroke="#e9d5ff" strokeWidth="1.2" />
          <polygon points="324,177 324,184 331,180.5" fill="#f0abfc" />
          <text x="352" y="225" textAnchor="middle" fill="#e9d5ff" fontSize="9.1" fontWeight="900">
            BIG MULTIMEDIA
          </text>
          <text x="352" y="238" textAnchor="middle" fill="#f9a8d4" fontSize="8.8" fontWeight="900">
            ROOM (WIDE HALL)
          </text>

          {/* Indoor Unified Corridor Spine Linking Computer Lab, Office, Big Multimedia, Pak Studies, Urdu & PE */}
          <rect x="284" y="156" width="36" height="16" rx="4" fill="#021b15" stroke="#fde047" strokeWidth="1.2" />
          <text x="302" y="167" textAnchor="middle" fill="#fef08a" fontSize="7" fontWeight="900">
            CORRIDOR
          </text>

          {/* ================= NORTH STRAIGHT SECTOR (Ground FIRST, then Sindhi · Economics · Physiology) ================= */}

          {/* In-line Department Block BEYOND the Ground: Sindhi, Economics, Physiology */}
          <rect x="424" y="28" width="202" height="48" rx="9" fill="#064e3b" fillOpacity="0.92" stroke="#84cc16" strokeWidth="2" />
          <SolarPanelArray x={582} y={31} w={38} h={11} />
          <text x="510" y="48" textAnchor="middle" fontSize="10.2" fontWeight="900">
            <tspan fill="#67e8f9">SINDHI</tspan>
            <tspan fill="#ffffff"> · </tspan>
            <tspan fill="#fcd34d">ECONOMICS</tspan>
          </text>
          <text x="525" y="66" textAnchor="middle" fill="#f9a8d4" fontSize="10.2" fontWeight="900">
            PHYSIOLOGY (Beyond Ground)
          </text>

          {/* Big Ground & Green Lawn FIRST along Straight Path North */}
          <rect x="424" y="82" width="202" height="90" rx="12" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.4" />
          <ellipse cx="525" cy="128" rx="76" ry="26" fill="#22c55e" fillOpacity="0.24" stroke="#d9f99d" strokeOpacity="0.55" strokeWidth="1.4" strokeDasharray="5 3" />
          {/* Gardener in North Big Ground */}
          <g transform="translate(454, 126)">
            <circle cx="0" cy="0" r="10" fill="#052e16" fillOpacity="0.9" stroke="#bef264" strokeWidth="1.3" />
            <ellipse cx="0" cy="-4" rx="5.8" ry="1.8" fill="#fde047" />
            <circle cx="0" cy="-2" r="2.2" fill="#fef3c7" />
            <path d="M-3.5,4.6 C-3.5,1 3.5,1 3.5,4.6 Z" fill="#4ade80" />
            <rect x="3.5" y="0.8" width="3.6" height="2.6" rx="0.6" fill="#38bdf8" />
          </g>
          <text x="535" y="102" textAnchor="middle" fill="#dcfce7" fontSize="10.4" fontWeight="900" letterSpacing="0.5">
            BIG GROUND &amp; LAWN (First)
          </text>

          {/* ================= NORTH-EAST & RIGHT CORRIDORS ================= */}

          {/* 14. Assembly Ground, Flag Hoisting, Garden Lawn, Greenhouse & Prayer Room (Before Zoology Garden — Lush Green) */}
          <rect x="636" y="96" width="168" height="76" rx="10" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.4" />
          <SolarPanelArray x={765} y={99} w={34} h={10} />
          {/* Assembly Dais & Flag Hoisting Pole with Waving Pakistan Flag */}
          <rect x="646" y="140" width="22" height="8" rx="2" fill="#d1fae5" fillOpacity="0.85" />
          <line x1="654" y1="140" x2="654" y2="112" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
          <circle cx="654" cy="111" r="2" fill="#fde047" />
          <rect x="655" y="113" width="6" height="13" fill="#ffffff" />
          <rect x="661" y="113" width="16" height="13" fill="#15803d" stroke="#bbf7d0" strokeWidth="0.6" />
          <circle cx="669" cy="119.5" r="3" fill="#ffffff" />
          <circle cx="670.2" cy="119.2" r="2.4" fill="#15803d" />
          {/* Greenhouse Dome Icon + Crescent Prayer Accent */}
          <path d="M686,146 C686,130 714,130 714,146 Z" fill="#38bdf8" fillOpacity="0.32" stroke="#7dd3fc" strokeWidth="1.3" />
          <circle cx="782" cy="134" r="9" fill="#064e3b" stroke="#86efac" strokeWidth="1.3" />
          <path d="M784,129 A4.5,4.5 0 1,0 784,139 A3.5,3.5 0 1,1 784,129 Z" fill="#fde047" />
          <text x="703" y="109" textAnchor="middle" fill="#86efac" fontSize="9.1" fontWeight="900">
            ASSEMBLY &amp; FLAG HOISTING
          </text>
          <text x="720" y="165" textAnchor="middle" fontSize="8.6" fontWeight="800">
            <tspan fill="#bef264">GARDEN LAWN</tspan>
            <tspan fill="#ffffff"> · </tspan>
            <tspan fill="#7dd3fc">GREENHOUSE</tspan>
            <tspan fill="#ffffff"> · </tspan>
            <tspan fill="#fde047">PRAYER</tspan>
          </text>

          {/* 15. Zoology, Zoology Lab & Botany, Botany Lab (Deep Jade / Emerald-Mint) */}
          <rect x="814" y="96" width="142" height="76" rx="10" fill="#065f46" fillOpacity="0.74" stroke="#6ee7b7" strokeWidth="2.2" />
          <SolarPanelArray x={914} y={99} w={36} h={10} />
          <text x="866" y="114" textAnchor="middle" fill="#a7f3d0" fontSize="9.3" fontWeight="900">
            ZOOLOGY &amp; LAB
          </text>
          <text x="885" y="164" textAnchor="middle" fill="#bef264" fontSize="9.6" fontWeight="900">
            BOTANY &amp; BOTANY LAB
          </text>

          {/* 12. Statistics & Mathematics (Statistics Before Mathematics — Fuchsia) */}
          <rect x="646" y="190" width="156" height="58" rx="10" fill="#701a75" fillOpacity="0.66" stroke="#e879f9" strokeWidth="2.2" />
          <SolarPanelArray x={761} y={194} w={36} h={10} />
          <text x="708" y="208" textAnchor="middle" fill="#f0abfc" fontSize="9.6" fontWeight="900">
            STATISTICS (First)
          </text>
          <text x="724" y="241" textAnchor="middle" fill="#67e8f9" fontSize="9.8" fontWeight="900">
            MATHEMATICS
          </text>

          {/* 13. Physics, Physics Lab & Dark Room (Cobalt Blue) */}
          <rect x="812" y="190" width="144" height="58" rx="10" fill="#1e3a8a" fillOpacity="0.72" stroke="#60a5fa" strokeWidth="2.2" />
          <SolarPanelArray x={818} y={194} w={32} h={10} />
          <rect x="916" y="198" width="32" height="22" rx="3" fill="#020617" stroke="#93c5fd" strokeWidth="1.2" />
          <text x="883" y="208" textAnchor="middle" fill="#93c5fd" fontSize="9.4" fontWeight="900">
            PHYSICS &amp; LAB
          </text>
          <text x="884" y="241" textAnchor="middle" fill="#fde047" fontSize="9.4" fontWeight="900">
            OPTICS DARK ROOM
          </text>

          {/* ================= PRINCIPAL'S OFFICE ALIGNMENT LINE ================= */}

          {/* 08. Auditorium Hall (Left of Principal's Office Line — Rose Crimson) */}
          <rect x="46" y="264" width="118" height="64" rx="10" fill="#881337" fillOpacity="0.68" stroke="#fb7185" strokeWidth="2.2" />
          <SolarPanelArray x={52} y={267} w={30} h={9.5} />
          <text x="118" y="283" textAnchor="middle" fill="#fda4af" fontSize="9.8" fontWeight="900">
            AUDITORIUM
          </text>
          <text x="105" y="320" textAnchor="middle" fill="#fecdd3" fontSize="8.6" fontWeight="800">
            (Left of Principal)
          </text>

          {/* 07. Chemistry & Chemistry Labs (In Line Left of Principal's Office — Cyan) */}
          <rect x="174" y="264" width="208" height="64" rx="10" fill="#164e63" fillOpacity="0.72" stroke="#22d3ee" strokeWidth="2.2" />
          <SolarPanelArray x={340} y={268} w={36} h={10} />
          <text x="260" y="283" textAnchor="middle" fill="#67e8f9" fontSize="9.8" fontWeight="900">
            CHEMISTRY &amp; CHEMISTRY LABS
          </text>
          <text x="278" y="320" textAnchor="middle" fill="#a5f3fc" fontSize="8.6" fontWeight="800">
            (In Line Left of Principal)
          </text>

          {/* 09. Principal's Office (Right After Big Lawn — Imperial Gold) */}
          <rect x="526" y="264" width="124" height="60" rx="10" fill="#78350f" fillOpacity="0.76" stroke="#fbbf24" strokeWidth="2.6" />
          <SolarPanelArray x={531} y={267} w={28} h={9.5} />
          <text x="602" y="281" textAnchor="middle" fill="#fcd34d" fontSize="9.2" fontWeight="900">
            PRINCIPAL&rsquo;S OFFICE
          </text>
          <text x="588" y="317" textAnchor="middle" fill="#fde68a" fontSize="8.4" fontWeight="800">
            (Right Past Big Lawn)
          </text>

          {/* 10. General Staff Room (1st Floor Right of Principal's Office — Indigo) */}
          <rect x="658" y="264" width="120" height="60" rx="10" fill="#1e1b4b" fillOpacity="0.78" stroke="#818cf8" strokeWidth="2.2" />
          <SolarPanelArray x={742} y={267} w={30} h={9.5} />
          <text x="702" y="281" textAnchor="middle" fill="#a5b4fc" fontSize="9.1" fontWeight="900">
            GENERAL STAFF
          </text>
          <text x="718" y="317" textAnchor="middle" fill="#c7d2fe" fontSize="8.4" fontWeight="800">
            (1st Floor Right)
          </text>

          {/* 11. Islamiat, Islamic Culture & English (1st Floor Right — Flamingo Pink) */}
          <rect x="786" y="264" width="170" height="60" rx="10" fill="#831843" fillOpacity="0.68" stroke="#ec4899" strokeWidth="2.2" />
          <SolarPanelArray x={916} y={267} w={34} h={9.5} />
          <text x="852" y="281" textAnchor="middle" fontSize="8.8" fontWeight="900">
            <tspan fill="#6ee7b7">ISLAMIAT</tspan>
            <tspan fill="#ffffff"> · </tspan>
            <tspan fill="#7dd3fc">ISLAMIC CULTURE</tspan>
          </text>
          <text x="871" y="317" textAnchor="middle" fill="#f9a8d4" fontSize="9.4" fontWeight="900">
            ENGLISH (1st Floor)
          </text>

          {/* ================= BIG LAWN & LOWER-RIGHT / ENTRANCE ================= */}

          {/* Big Walking Garden Lawn & Gardeners (Right of Twin Grill Paths Before Principal's Office — Lush Green) */}
          <rect x="536" y="334" width="210" height="58" rx="10" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.4" />
          <circle cx="564" cy="354" r="10" fill="#22c55e" fillOpacity="0.68" stroke="#bbf7d0" strokeWidth="1.3" />
          <circle cx="642" cy="348" r="9" fill="#22c55e" fillOpacity="0.68" stroke="#bbf7d0" strokeWidth="1.3" />
          <circle cx="718" cy="354" r="10" fill="#22c55e" fillOpacity="0.68" stroke="#bbf7d0" strokeWidth="1.3" />

          {/* Gardener 1 in Big Lawn */}
          <g transform="translate(596, 360)">
            <circle cx="0" cy="0" r="9.5" fill="#052e16" stroke="#a3e635" strokeWidth="1.3" />
            <ellipse cx="0" cy="-3.8" rx="5.5" ry="1.7" fill="#fde047" />
            <circle cx="0" cy="-1.8" r="2.2" fill="#fef3c7" />
            <path d="M-3.5,4.4 C-3.5,1 3.5,1 3.5,4.4 Z" fill="#4ade80" />
            <rect x="3.5" y="0.8" width="3.5" height="2.6" rx="0.6" fill="#38bdf8" />
          </g>
          {/* Gardener 2 in Big Lawn */}
          <g transform="translate(684, 360)">
            <circle cx="0" cy="0" r="9.5" fill="#052e16" stroke="#a3e635" strokeWidth="1.3" />
            <ellipse cx="0" cy="-3.8" rx="5.5" ry="1.7" fill="#fde047" />
            <circle cx="0" cy="-1.8" r="2.2" fill="#fef3c7" />
            <path d="M-3.5,4.4 C-3.5,1 3.5,1 3.5,4.4 Z" fill="#22c55e" />
            <circle cx="-5" cy="2" r="1.6" fill="#f472b6" />
          </g>
          <text x="641" y="384" textAnchor="middle" fill="#dcfce7" fontSize="9.4" fontWeight="900">
            GARDEN &amp; BIG LAWN · GARDENERS (RIGHT)
          </text>

          {/* Lush Green West Garden Lawn & Shaded Trees (Across from Clerk Office & Big Lawn) */}
          <rect x="66" y="352" width="230" height="84" rx="12" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.2" />
          <circle cx="110" cy="388" r="15" fill="#22c55e" fillOpacity="0.65" stroke="#bbf7d0" strokeOpacity="0.8" strokeWidth="1.4" />
          <circle cx="180" cy="396" r="13" fill="#22c55e" fillOpacity="0.65" stroke="#bbf7d0" strokeOpacity="0.8" strokeWidth="1.4" />
          <circle cx="250" cy="386" r="15" fill="#22c55e" fillOpacity="0.65" stroke="#bbf7d0" strokeOpacity="0.8" strokeWidth="1.4" />
          <text x="181" y="424" textAnchor="middle" fill="#dcfce7" fontSize="9.8" fontWeight="900">
            WEST GARDEN LAWN &amp; SHADED TREES
          </text>

          {/* 04. Clerk Office (On Straight Path Very First on Right — Teal) */}
          <rect x="558" y="404" width="154" height="54" rx="10" fill="#115e59" fillOpacity="0.76" stroke="#2dd4bf" strokeWidth="2.2" />
          <SolarPanelArray x={672} y={407} w={34} h={10} />
          <text x="618" y="421" textAnchor="middle" fill="#5eead4" fontSize="10.2" fontWeight="900">
            CLERK OFFICE
          </text>
          <text x="635" y="451" textAnchor="middle" fill="#99f6e4" fontSize="8.4" fontWeight="800">
            (First on Right · Straight)
          </text>

          {/* 05. Central Library (After Some Walking Distance on Right — Violet) */}
          <rect x="752" y="400" width="200" height="62" rx="10" fill="#4c1d95" fillOpacity="0.72" stroke="#8b5cf6" strokeWidth="2.3" />
          <SolarPanelArray x={910} y={404} w={36} h={10} />
          <text x="836" y="418" textAnchor="middle" fill="#c4b5fd" fontSize="10.2" fontWeight="900">
            CENTRAL LIBRARY (RIGHT)
          </text>
          <text x="852" y="453" textAnchor="middle" fill="#ddd6fe" fontSize="8.6" fontWeight="800">
            (Walk Straight Further &rarr; Right)
          </text>

          {/* 02. Waiting Room (Entrance Left — Sky Blue) */}
          <rect x="136" y="472" width="206" height="56" rx="10" fill="#0c4a6e" fillOpacity="0.74" stroke="#0ea5e9" strokeWidth="2.2" />
          <SolarPanelArray x={142} y={476} w={36} h={10} />
          <text x="252" y="489" textAnchor="middle" fill="#7dd3fc" fontSize="10.4" fontWeight="900">
            WAITING ROOM (LEFT)
          </text>
          <text x="239" y="520" textAnchor="middle" fill="#bae6fd" fontSize="8.6" fontWeight="800">
            (First on Left When Entering)
          </text>

          {/* 03. College Canteen (Entrance Right Inside College Wall — Vibrant Orange) */}
          <rect x="560" y="472" width="164" height="56" rx="10" fill="#9a3412" fillOpacity="0.74" stroke="#f97316" strokeWidth="2.2" />
          <SolarPanelArray x={682} y={476} w={36} h={10} />
          <text x="628" y="489" textAnchor="middle" fill="#fdba74" fontSize="10.4" fontWeight="900">
            CANTEEN (RIGHT)
          </text>
          <text x="642" y="520" textAnchor="middle" fill="#fed7aa" fontSize="8.6" fontWeight="800">
            (First on Right Inside Gate)
          </text>

          {/* OUTSIDE College Boundary Wall (Entrance Far Right): Central Jail & Signal Jammers */}
          <rect x="752" y="476" width="234" height="66" rx="10" fill="#0f172a" fillOpacity="0.94" stroke="#ef4444" strokeWidth="2.4" strokeDasharray="6 3" />
          {/* Watchtower & Security Grille Bars */}
          <rect x="762" y="489" width="24" height="30" rx="3" fill="#020617" stroke="#f87171" strokeWidth="1.3" />
          <line x1="768" y1="489" x2="768" y2="519" stroke="#fca5a5" strokeOpacity="0.78" strokeWidth="1.3" />
          <line x1="774" y1="489" x2="774" y2="519" stroke="#fca5a5" strokeOpacity="0.78" strokeWidth="1.3" />
          <line x1="780" y1="489" x2="780" y2="519" stroke="#fca5a5" strokeOpacity="0.78" strokeWidth="1.3" />
          {/* Signal Jammer Towers & RF Jammer Waves */}
          <g transform="translate(946, 502)">
            <path d="M-5,22 L0,-6 L5,22 Z" fill="none" stroke="#fde047" strokeWidth="1.5" />
            <circle cx="0" cy="-8" r="2.3" fill="#ef4444" />
            <path d="M-7,-12 A8,8 0 0,1 7,-12" fill="none" stroke="#38bdf8" strokeWidth="1.3" />
            <path d="M-11,-15 A12,12 0 0,1 11,-15" fill="none" stroke="#f87171" strokeWidth="1.2" strokeDasharray="2 1.5" />
          </g>
          <g transform="translate(969, 508)">
            <path d="M-4,18 L0,-5 L4,18 Z" fill="none" stroke="#fde047" strokeWidth="1.4" />
            <circle cx="0" cy="-7" r="2.1" fill="#ef4444" />
            <path d="M-6,-10 A7,7 0 0,1 6,-10" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
          </g>
          <text x="862" y="494" textAnchor="middle" fontSize="10.2" fontWeight="900">
            <tspan fill="#fca5a5">CENTRAL JAIL</tspan>
          </text>
          <text x="862" y="510" textAnchor="middle" fill="#fde047" fontSize="9.4" fontWeight="900">
            &amp; SIGNAL JAMMERS
          </text>
          <text x="862" y="529" textAnchor="middle" fill="#7dd3fc" fontSize="8.2" fontWeight="900">
            (OUTSIDE COLLEGE · RIGHT)
          </text>

          {/* ================= PAVED WALKWAYS & GRILL PATHS ================= */}

          {/* Entrance Cross Plaza (Waiting Room Left <-> Gate <-> Canteen Right) */}
          <line x1="240" y1="500" x2="642" y2="500" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="14" strokeLinecap="round" />
          {/* Entrance Stem up to Twin Grill Start */}
          <line x1="500" y1="546" x2="500" y2="465" stroke="#94a3b8" strokeOpacity="0.34" strokeWidth="20" strokeLinecap="round" />

          {/* Branch to Clerk Office (First on Right) & Central Library (Right) */}
          <line x1="500" y1="432" x2="850" y2="432" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="12" strokeLinecap="round" />

          {/* CENTRAL TWIN PATHS SEPARATED BY SMALL GRILL (X=485 & X=515, Y=465 -> Y=165) */}
          <line x1="485" y1="465" x2="485" y2="165" stroke="#cbd5e1" strokeOpacity="0.35" strokeWidth="13" strokeLinecap="round" />
          <line x1="515" y1="465" x2="515" y2="165" stroke="#cbd5e1" strokeOpacity="0.35" strokeWidth="13" strokeLinecap="round" />
          <line
            x1="500"
            y1="458"
            x2="500"
            y2="176"
            stroke="#fbbf24"
            strokeWidth="3.2"
            strokeDasharray="6 4"
            strokeOpacity="0.95"
          />
          <rect
            x="452"
            y="410"
            width="96"
            height="19"
            rx="4"
            fill="#021b15"
            fillOpacity="0.96"
            stroke="#a3e635"
            strokeOpacity="0.85"
            strokeWidth="1.3"
          />
          <text x="500" y="423" textAnchor="middle" fill="#ecfccb" fontSize="9" fontWeight="900" letterSpacing="0.5">
            SMALL GRILL
          </text>

          {/* Principal's Office Horizontal Line (Auditorium & Chemistry Left <-> Principal & 1st Floor Right) */}
          <line x1="105" y1="294" x2="870" y2="294" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="12" strokeLinecap="round" />

          {/* Upper-Right Academic & Life-Science Connections */}
          <line x1="590" y1="294" x2="590" y2="219" stroke="#94a3b8" strokeOpacity="0.24" strokeWidth="10" strokeLinecap="round" />
          <line x1="590" y1="219" x2="885" y2="219" stroke="#94a3b8" strokeOpacity="0.26" strokeWidth="10" strokeLinecap="round" />
          <line x1="500" y1="174" x2="720" y2="132" stroke="#94a3b8" strokeOpacity="0.24" strokeWidth="10" strokeLinecap="round" />
          <line x1="720" y1="132" x2="885" y2="132" stroke="#94a3b8" strokeOpacity="0.26" strokeWidth="10" strokeLinecap="round" />

          {/* LEFT PATH BETWEEN TWO GRILLS -> BIG MULTIMEDIA ROOM, COMPUTER LAB, OFFICE & ONE CORRIDOR BESIDE HOSTEL */}
          <line x1="485" y1="200" x2="408" y2="200" stroke="#cbd5e1" strokeOpacity="0.34" strokeWidth="9" strokeLinecap="round" />
          <line x1="485" y1="214" x2="408" y2="214" stroke="#cbd5e1" strokeOpacity="0.34" strokeWidth="9" strokeLinecap="round" />
          <line x1="482" y1="194" x2="410" y2="194" stroke="#fb923c" strokeWidth="2.2" strokeDasharray="5 3" strokeOpacity="0.9" />
          <line x1="482" y1="220" x2="410" y2="220" stroke="#fb923c" strokeWidth="2.2" strokeDasharray="5 3" strokeOpacity="0.9" />
          <line x1="408" y1="206" x2="182" y2="206" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="10" strokeLinecap="round" />
          <rect x="415" y="198" width="76" height="17" rx="4" fill="#021b15" fillOpacity="0.96" stroke="#fb923c" strokeOpacity="0.85" strokeWidth="1.2" />
          <text x="453" y="210" textAnchor="middle" fill="#fed7aa" fontSize="7.6" fontWeight="900">
            2-GRILL LEFT
          </text>

          {/* Upper-Left One Corridor Spine (Computer Lab/Office & Big Multimedia -> Pak Studies/Urdu/PE & Tennis/Volleyball -> 1st Floor Commerce) */}
          <line x1="302" y1="206" x2="302" y2="68" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="10" strokeLinecap="round" />
          <line x1="196" y1="130" x2="113" y2="68" stroke="#94a3b8" strokeOpacity="0.24" strokeWidth="9" strokeLinecap="round" />

          {/* Straight North Spine -> Big Ground & Lawn FIRST -> Sindhi, Economics, Physiology */}
          <line x1="500" y1="165" x2="525" y2="54" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="14" strokeLinecap="round" />

          {/* ================= ROAD, MAIN GATE & SECURITY POST ================= */}

          <rect x="0" y="550" width="1000" height="50" fill="#0f172a" fillOpacity="0.95" />
          <line x1="20" y1="575" x2="980" y2="575" stroke="#eab308" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="16 14" />
          <text x="170" y="579" textAnchor="middle" fill="#cbd5e1" fillOpacity="0.85" fontSize="10" fontWeight="600" letterSpacing="1">
            PATHAN COLONY ROAD · HIRABAD
          </text>
          <text x="830" y="579" textAnchor="middle" fill="#cbd5e1" fillOpacity="0.85" fontSize="10" fontWeight="600" letterSpacing="1">
            GOVT. GIRLS ZUBAIDA COLLEGE
          </text>

          {/* Gate Entrance Opening & Security Guard Post */}
          <rect x="445" y="534" width="110" height="22" fill="#032b22" />
          <path d="M445 546 L445 526 M555 546 L555 526" stroke="#facc15" strokeWidth="3.5" />

          {/* Security Guard Cabin (Left of Gate) */}
          <rect x="386" y="518" width="54" height="24" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.6" />
          <text x="413" y="533" textAnchor="middle" fill="#e0f2fe" fontSize="7.5" fontWeight="800" letterSpacing="0.5">
            SECURITY
          </text>

          {/* Left Gate Security Guard */}
          <g transform="translate(460, 530)">
            <circle cx="0" cy="0" r="10.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="-4.2" y="-6" width="8.4" height="2.2" rx="1" fill="#38bdf8" />
            <circle cx="0" cy="-2" r="2.4" fill="#fef3c7" />
            <path d="M-4,5.2 C-4,1 4,1 4,5.2 Z" fill="#1d4ed8" />
            <path d="M4,0.4 L6.6,1.3 L6.2,4 L5.2,4.9 L4.2,4 Z" fill="#facc15" />
          </g>

          {/* Right Gate Security Guard */}
          <g transform="translate(540, 530)">
            <circle cx="0" cy="0" r="10.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="-4.2" y="-6" width="8.4" height="2.2" rx="1" fill="#38bdf8" />
            <circle cx="0" cy="-2" r="2.4" fill="#fef3c7" />
            <path d="M-4,5.2 C-4,1 4,1 4,5.2 Z" fill="#1d4ed8" />
            <path d="M-6.6,1.3 L-4,0.4 L-4.2,4 L-5.2,4.9 L-6.2,4 Z" fill="#facc15" />
          </g>
          <text x="540" y="515" textAnchor="middle" fill="#bae6fd" fontSize="7.3" fontWeight="700" letterSpacing="0.5">
            GATE GUARD
          </text>

          {/* ================= WALKING ROUTE & TRAIL OVERLAY ================= */}

          {/* Upcoming Planned Route */}
          {activeRoute.length >= 2 && (
            <polyline
              points={polylinePoints}
              fill="none"
              stroke="#facc15"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="10 7"
              markerEnd="url(#route-arrow)"
              opacity="0.9"
            />
          )}

          {/* Solid Glowing Walked Trail */}
          {walkedTrail.walkedPoints.length >= 2 && (
            <polyline
              points={walkedPolylinePoints}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.94"
            />
          )}

          {/* Breadcrumb Footstep Dots Behind Visitor */}
          {walkedTrail.footprints.map((fp, i) => (
            <circle
              key={i}
              cx={fp.x * 10}
              cy={fp.y * 6}
              r="3.2"
              fill="#e0f2fe"
              opacity="0.88"
            />
          ))}
        </svg>

        {/* Compass Rose (Top Right Overlay) */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-[#021914]/90 backdrop-blur-sm border border-emerald-700/70 rounded-xl px-3 py-1.5 text-[11px] text-emerald-100 pointer-events-none">
          <Compass className="w-4 h-4 text-amber-300" />
          <div className="leading-tight">
            <span className="font-bold text-amber-300 block">Straight Ahead ↑</span>
            <span className="text-[10px] text-stone-300">← Left · Right →</span>
          </div>
        </div>

        {/* Gate Entry Callout (Bottom Center on Road) */}
        <div
          style={{ left: '50%', top: '96%' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <span className="px-2.5 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md whitespace-nowrap border border-emerald-200">
            Enter Gate Here ↑
          </span>
        </div>

        {/* Hover Preview Crosshair Pin during Insert / Reposition */}
        {mapMode !== 'browse' && hoverCoords && (
          <div
            style={{ left: `${hoverCoords.x}%`, top: `${hoverCoords.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
          >
            <div className="w-7 h-7 rounded-full border-2 border-dashed border-amber-300 bg-amber-400/25 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-amber-300" />
            </div>
          </div>
        )}

        {/* Draft Pin Placed (Insert Mode) */}
        {draftPinCoords && (
          <div
            style={{ left: `${draftPinCoords.x}%`, top: `${draftPinCoords.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
          >
            <div className="w-8 h-8 rounded-full bg-sky-400 text-slate-950 border-2 border-white shadow-xl flex items-center justify-center font-bold text-xs animate-bounce">
              +
            </div>
          </div>
        )}

        {/* Animated Simulated Virtual Visitor Avatar */}
        {walker && walker.active && (
          <div
            style={{ left: `${walker.x}%`, top: `${walker.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
          >
            <span className="absolute -inset-3 rounded-full bg-sky-400/40 animate-ping" />
            <div className="relative flex flex-col items-center">
              <div
                className={`relative w-10 h-10 rounded-full bg-sky-400 text-slate-950 border-2 border-white shadow-2xl flex items-center justify-center ${
                  walker.isMoving ? 'animate-bounce' : ''
                }`}
              >
                <div
                  style={{ transform: `rotate(${walker.angleDeg}deg)` }}
                  className="absolute inset-0 flex items-start justify-center pointer-events-none"
                >
                  <span className="-mt-2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[7px] border-l-transparent border-r-transparent border-b-white drop-shadow" />
                </div>

                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-none stroke-slate-950"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="5" r="2" fill="currentColor" />
                  <path d="M9 20l2.2-6 1.8-3.5" />
                  <path d="M16 20l-2-5-2-3" />
                  <path d="M7.5 12.5l3.5-2 3 1 2.5-1.5" />
                </svg>
              </div>
              <span className="mt-1 px-2 py-0.5 rounded bg-sky-400 text-slate-950 font-bold text-[10px] whitespace-nowrap shadow-lg border border-white">
                {walker.isMoving ? 'Visitor Walking' : 'Visitor Here'}
              </span>
            </div>
          </div>
        )}

        {/* 20 Distinct Multi-Colored Map Stop Pins & Distinct Colored Tooltip Labels */}
        {stops.map((stop, idx) => {
          const isSelected = idx === selectedIndex;
          const theme = getStopColorTheme(stop.id, idx);
          return (
            <button
              key={stop.id}
              type="button"
              onClick={(e) => {
                if (mapMode !== 'browse') return;
                e.stopPropagation();
                onSelectStop(idx);
              }}
              style={{ left: `${stop.mapX}%`, top: `${stop.mapY}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform duration-150 ${
                isSelected ? 'z-30 scale-120' : 'z-20 hover:z-30 hover:scale-110'
              } ${mapMode !== 'browse' ? 'opacity-65 pointer-events-none' : 'cursor-pointer'}`}
              title={`${stop.stopNumber}. ${stop.name} (${stop.gateDirections?.turn || ''})`}
              aria-label={`Select map stop ${stop.stopNumber}: ${stop.name}`}
            >
              {isSelected && (
                <span
                  className={`absolute inset-0 -m-2 rounded-full ${theme.ringGlow} animate-ping pointer-events-none`}
                />
              )}

              <span
                className={`relative w-7 h-7 rounded-full flex items-center justify-center text-[10.5px] font-mono font-bold border-2 shadow-lg transition-all ${
                  theme.pinBg
                } ${theme.pinText} ${
                  isSelected
                    ? 'border-white ring-4 ring-white/45 shadow-2xl'
                    : `${theme.pinBorder} opacity-95 group-hover:opacity-100`
                }`}
              >
                {stop.stopNumber}
              </span>

              <span
                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 px-2.5 py-0.5 rounded bg-[#021611]/95 border text-[11px] sm:text-xs font-extrabold whitespace-nowrap shadow-lg transition-opacity pointer-events-none ${
                  theme.textClass
                } ${
                  isSelected
                    ? `opacity-100 ${theme.activeBorder}`
                    : 'opacity-0 group-hover:opacity-100 border-emerald-700'
                }`}
              >
                {stop.shortName || stop.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Map Legend & Route Caption Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-[13px] font-bold text-stone-200 px-1">
        <div className="flex flex-wrap items-center gap-3.5">
          <span className={`inline-flex items-center gap-1.5 font-extrabold ${selectedTheme.textClass}`}>
            <span className={`w-3 h-3 rounded-full ${selectedTheme.pinBg} border border-white inline-block`} />
            <span>Selected: {selectedStop.shortName || selectedStop.name}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sky-300 font-bold">
            <span className="w-3 h-3 rounded-full bg-sky-400 border border-white inline-block" />
            <span>Visitor Walking</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sky-200 font-bold">
            <span className="w-5 border-t-2 border-sky-400 inline-block" />
            <span>Walked Path</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-300 font-bold">
            <span className="w-5 border-t-2 border-dashed border-amber-400 inline-block" />
            <span>Route Ahead</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-cyan-200 font-bold">
            <span className="w-3 h-3 rounded-full bg-slate-900 border border-sky-400 inline-block" />
            <span>Gate Security</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-lime-200 font-bold">
            <span className="w-3 h-3 rounded-full bg-green-950 border border-lime-400 inline-block" />
            <span>Lawn Gardeners</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-rose-300 font-bold">
            <span className="w-3 h-3 rounded-sm bg-slate-800 border border-red-400 inline-block" />
            <span>Central Jail &amp; Jammers</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sky-300 font-bold">
            <span className="w-4 h-2.5 rounded-xs bg-sky-700 border border-sky-300 inline-block" />
            <span>Solar Panels (All Wings)</span>
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 font-bold text-amber-300">
          <Navigation className="w-3.5 h-3.5" />
          <span>{selectedStop.gateDirections.distanceFromGate}</span>
        </span>
      </div>
    </div>
  );
}
