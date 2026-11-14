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
    pinBg: 'bg-emerald-500',
    pinText: 'text-white',
    pinBorder: 'border-emerald-200',
    ringGlow: 'bg-emerald-400/45',
    hex: '#10b981',
    textClass: 'text-emerald-300',
    activeBorder: 'border-emerald-400',
    badgeBg: 'bg-emerald-500 text-white'
  },
  'waiting-room': {
    pinBg: 'bg-sky-500',
    pinText: 'text-white',
    pinBorder: 'border-sky-200',
    ringGlow: 'bg-sky-400/45',
    hex: '#0ea5e9',
    textClass: 'text-sky-300',
    activeBorder: 'border-sky-400',
    badgeBg: 'bg-sky-500 text-white'
  },
  'college-canteen': {
    pinBg: 'bg-orange-500',
    pinText: 'text-white',
    pinBorder: 'border-orange-200',
    ringGlow: 'bg-orange-400/45',
    hex: '#f97316',
    textClass: 'text-orange-300',
    activeBorder: 'border-orange-400',
    badgeBg: 'bg-orange-500 text-white'
  },
  'clerk-office': {
    pinBg: 'bg-teal-400',
    pinText: 'text-slate-950',
    pinBorder: 'border-teal-100',
    ringGlow: 'bg-teal-300/45',
    hex: '#2dd4bf',
    textClass: 'text-teal-300',
    activeBorder: 'border-teal-300',
    badgeBg: 'bg-teal-400 text-slate-950'
  },
  'central-library': {
    pinBg: 'bg-violet-500',
    pinText: 'text-white',
    pinBorder: 'border-violet-200',
    ringGlow: 'bg-violet-400/45',
    hex: '#8b5cf6',
    textClass: 'text-violet-300',
    activeBorder: 'border-violet-400',
    badgeBg: 'bg-violet-500 text-white'
  },
  'grill-divided-walkway': {
    pinBg: 'bg-lime-400',
    pinText: 'text-emerald-950',
    pinBorder: 'border-lime-100',
    ringGlow: 'bg-lime-400/45',
    hex: '#a3e635',
    textClass: 'text-lime-300',
    activeBorder: 'border-lime-300',
    badgeBg: 'bg-lime-400 text-emerald-950'
  },
  'chemistry-labs': {
    pinBg: 'bg-cyan-400',
    pinText: 'text-slate-950',
    pinBorder: 'border-cyan-100',
    ringGlow: 'bg-cyan-300/45',
    hex: '#22d3ee',
    textClass: 'text-cyan-300',
    activeBorder: 'border-cyan-300',
    badgeBg: 'bg-cyan-400 text-slate-950'
  },
  'auditorium-hall': {
    pinBg: 'bg-rose-500',
    pinText: 'text-white',
    pinBorder: 'border-rose-200',
    ringGlow: 'bg-rose-400/45',
    hex: '#f43f5e',
    textClass: 'text-rose-300',
    activeBorder: 'border-rose-400',
    badgeBg: 'bg-rose-500 text-white'
  },
  'principal-office': {
    pinBg: 'bg-amber-400',
    pinText: 'text-emerald-950',
    pinBorder: 'border-amber-100',
    ringGlow: 'bg-amber-300/50',
    hex: '#fbbf24',
    textClass: 'text-amber-300',
    activeBorder: 'border-amber-300',
    badgeBg: 'bg-amber-400 text-emerald-950'
  },
  'general-staff-room': {
    pinBg: 'bg-indigo-500',
    pinText: 'text-white',
    pinBorder: 'border-indigo-200',
    ringGlow: 'bg-indigo-400/45',
    hex: '#818cf8',
    textClass: 'text-indigo-300',
    activeBorder: 'border-indigo-400',
    badgeBg: 'bg-indigo-500 text-white'
  },
  'islamiat-english': {
    pinBg: 'bg-pink-500',
    pinText: 'text-white',
    pinBorder: 'border-pink-200',
    ringGlow: 'bg-pink-400/45',
    hex: '#ec4899',
    textClass: 'text-pink-300',
    activeBorder: 'border-pink-400',
    badgeBg: 'bg-pink-500 text-white'
  },
  'statistics-mathematics': {
    pinBg: 'bg-fuchsia-500',
    pinText: 'text-white',
    pinBorder: 'border-fuchsia-200',
    ringGlow: 'bg-fuchsia-400/45',
    hex: '#e879f9',
    textClass: 'text-fuchsia-300',
    activeBorder: 'border-fuchsia-400',
    badgeBg: 'bg-fuchsia-500 text-white'
  },
  'physics-lab-darkroom': {
    pinBg: 'bg-blue-500',
    pinText: 'text-white',
    pinBorder: 'border-blue-200',
    ringGlow: 'bg-blue-400/45',
    hex: '#3b82f6',
    textClass: 'text-blue-300',
    activeBorder: 'border-blue-400',
    badgeBg: 'bg-blue-500 text-white'
  },
  'greenhouse-prayer-ground': {
    pinBg: 'bg-green-500',
    pinText: 'text-white',
    pinBorder: 'border-green-200',
    ringGlow: 'bg-green-400/45',
    hex: '#22c55e',
    textClass: 'text-green-300',
    activeBorder: 'border-green-400',
    badgeBg: 'bg-green-500 text-white'
  },
  'zoology-botany-labs': {
    pinBg: 'bg-emerald-300',
    pinText: 'text-emerald-950',
    pinBorder: 'border-white',
    ringGlow: 'bg-emerald-200/45',
    hex: '#6ee7b7',
    textClass: 'text-emerald-200',
    activeBorder: 'border-emerald-200',
    badgeBg: 'bg-emerald-300 text-emerald-950'
  },
  'hostel-computer-lab': {
    pinBg: 'bg-amber-600',
    pinText: 'text-white',
    pinBorder: 'border-amber-200',
    ringGlow: 'bg-amber-500/45',
    hex: '#fb923c',
    textClass: 'text-orange-200',
    activeBorder: 'border-orange-300',
    badgeBg: 'bg-amber-600 text-white'
  },
  'tennis-volleyball-grounds': {
    pinBg: 'bg-yellow-400',
    pinText: 'text-slate-950',
    pinBorder: 'border-yellow-100',
    ringGlow: 'bg-yellow-300/50',
    hex: '#facc15',
    textClass: 'text-yellow-300',
    activeBorder: 'border-yellow-300',
    badgeBg: 'bg-yellow-400 text-slate-950'
  },
  'pak-urdu-pe': {
    pinBg: 'bg-red-500',
    pinText: 'text-white',
    pinBorder: 'border-red-200',
    ringGlow: 'bg-red-400/45',
    hex: '#f87171',
    textClass: 'text-red-300',
    activeBorder: 'border-red-400',
    badgeBg: 'bg-red-500 text-white'
  },
  'commerce-dept-library': {
    pinBg: 'bg-purple-500',
    pinText: 'text-white',
    pinBorder: 'border-purple-200',
    ringGlow: 'bg-purple-400/45',
    hex: '#a855f7',
    textClass: 'text-purple-300',
    activeBorder: 'border-purple-400',
    badgeBg: 'bg-purple-500 text-white'
  },
  'sindhi-economics-physiology-ground': {
    pinBg: 'bg-lime-300',
    pinText: 'text-emerald-950',
    pinBorder: 'border-white',
    ringGlow: 'bg-lime-200/45',
    hex: '#bef264',
    textClass: 'text-lime-200',
    activeBorder: 'border-lime-200',
    badgeBg: 'bg-lime-300 text-emerald-950'
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
              <stop offset="0%" stopColor="#14532d" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#166534" stopOpacity="0.72" />
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

          {/* Architectural Compound Boundary Wall */}
          <rect
            x="30"
            y="18"
            width="940"
            height="530"
            rx="18"
            fill="#032b22"
            fillOpacity="0.65"
            stroke="#34d399"
            strokeOpacity="0.45"
            strokeWidth="2.5"
          />
          <rect
            x="36"
            y="24"
            width="928"
            height="518"
            rx="14"
            fill="none"
            stroke="#fbbf24"
            strokeOpacity="0.16"
            strokeWidth="1"
            strokeDasharray="8 6"
          />

          {/* ================= NORTH-WEST SECTOR ================= */}

          {/* 19. Commerce Dept. & Commerce Library (1st Floor — Purple) */}
          <rect x="252" y="34" width="160" height="62" rx="10" fill="#581c87" fillOpacity="0.66" stroke="#a855f7" strokeWidth="2" />
          <text x="332" y="51" textAnchor="middle" fill="#e9d5ff" fontSize="9.2" fontWeight="800">
            COMMERCE DEPT. &amp; LIBRARY
          </text>
          <text x="332" y="88" textAnchor="middle" fill="#d8b4fe" fontSize="7.6" fontWeight="600">
            (1st Floor Above Sports)
          </text>

          {/* 18. Pakistan Studies, Urdu & Physical Education (Coral Red) */}
          <rect x="48" y="64" width="190" height="64" rx="10" fill="#7f1d1d" fillOpacity="0.64" stroke="#f87171" strokeWidth="2" />
          <text x="143" y="81" textAnchor="middle" fill="#fecaca" fontSize="8.8" fontWeight="800">
            PAK STUDIES · URDU
          </text>
          <text x="143" y="119" textAnchor="middle" fill="#fca5a5" fontSize="8.2" fontWeight="700">
            PHYSICAL EDUCATION
          </text>

          {/* 17. Tennis Court & Volleyball Playing Ground (Sun Yellow) */}
          <rect x="252" y="112" width="160" height="62" rx="10" fill="#713f12" fillOpacity="0.58" stroke="#facc15" strokeWidth="2" />
          {/* Mini Tennis & Volleyball Court Lines */}
          <rect x="266" y="124" width="56" height="36" rx="2" fill="none" stroke="#fde047" strokeOpacity="0.45" strokeWidth="1" />
          <line x1="294" y1="124" x2="294" y2="160" stroke="#fde047" strokeOpacity="0.65" strokeWidth="1" strokeDasharray="2 2" />
          <rect x="342" y="124" width="56" height="36" rx="2" fill="none" stroke="#fef08a" strokeOpacity="0.45" strokeWidth="1" />
          <line x1="370" y1="124" x2="370" y2="160" stroke="#fef08a" strokeOpacity="0.65" strokeWidth="1" />
          <text x="332" y="168" textAnchor="middle" fill="#fef08a" fontSize="8.2" fontWeight="800">
            TENNIS &amp; VOLLEYBALL GROUND
          </text>

          {/* 16. Hostel, Computer Lab & Computer Lab Office (Tangerine / Amber-Orange) */}
          <rect x="48" y="184" width="220" height="64" rx="10" fill="#7c2d12" fillOpacity="0.65" stroke="#fb923c" strokeWidth="2" />
          <line x1="158" y1="190" x2="158" y2="242" stroke="#fdba74" strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x="103" y="203" textAnchor="middle" fill="#ffedd5" fontSize="9" fontWeight="800">
            COLLEGE HOSTEL
          </text>
          <text x="214" y="202" textAnchor="middle" fill="#fed7aa" fontSize="8.5" fontWeight="800">
            COMPUTER LAB
          </text>
          <text x="214" y="240" textAnchor="middle" fill="#fdba74" fontSize="7.6" fontWeight="700">
            &amp; COMPUTER LAB OFFICE
          </text>

          {/* ================= NORTH STRAIGHT SECTOR ================= */}

          {/* 20. Big Ground & Lawn + Sindhi, Economics, Physiology (Spring Chartreuse) */}
          <rect x="424" y="30" width="202" height="142" rx="12" fill="url(#lawn-grad)" stroke="#bef264" strokeWidth="2" />
          {/* Oval Athletics Track Accent */}
          <ellipse cx="525" cy="70" rx="76" ry="26" fill="#22c55e" fillOpacity="0.18" stroke="#d9f99d" strokeOpacity="0.45" strokeWidth="1.3" strokeDasharray="5 3" />
          {/* Gardener in North Big Ground */}
          <g transform="translate(454, 68)">
            <circle cx="0" cy="0" r="10" fill="#052e16" fillOpacity="0.9" stroke="#bef264" strokeWidth="1.3" />
            <ellipse cx="0" cy="-4" rx="5.8" ry="1.8" fill="#fde047" />
            <circle cx="0" cy="-2" r="2.2" fill="#fef3c7" />
            <path d="M-3.5,4.6 C-3.5,1 3.5,1 3.5,4.6 Z" fill="#4ade80" />
            <rect x="3.5" y="0.8" width="3.6" height="2.6" rx="0.6" fill="#38bdf8" />
          </g>
          <text x="535" y="51" textAnchor="middle" fill="#ecfccb" fontSize="9.8" fontWeight="800" letterSpacing="0.8">
            BIG GROUND &amp; LAWN
          </text>
          {/* In-line Department Bar: Sindhi, Economics, Physiology */}
          <rect x="434" y="118" width="182" height="46" rx="7" fill="#064e3b" fillOpacity="0.88" stroke="#84cc16" strokeWidth="1.5" />
          <text x="525" y="137" textAnchor="middle" fill="#d9f99d" fontSize="8.8" fontWeight="800">
            SINDHI · ECONOMICS
          </text>
          <text x="525" y="153" textAnchor="middle" fill="#bef264" fontSize="8.8" fontWeight="800">
            PHYSIOLOGY
          </text>

          {/* ================= NORTH-EAST & RIGHT CORRIDORS ================= */}

          {/* 14. Playing Ground, Lawn, Greenhouse & Prayer Room (Before Zoology & Botany — Mint Green) */}
          <rect x="636" y="96" width="168" height="76" rx="10" fill="#14532d" fillOpacity="0.72" stroke="#22c55e" strokeWidth="2" />
          {/* Greenhouse Dome Icon + Crescent Prayer Accent */}
          <path d="M652,130 C652,116 680,116 680,130 Z" fill="#38bdf8" fillOpacity="0.28" stroke="#7dd3fc" strokeWidth="1.2" />
          <circle cx="776" cy="122" r="8" fill="#064e3b" stroke="#86efac" strokeWidth="1.2" />
          <path d="M778,117 A4.5,4.5 0 1,0 778,127 A3.5,3.5 0 1,1 778,117 Z" fill="#fde047" />
          <text x="720" y="112" textAnchor="middle" fill="#bbf7d0" fontSize="8.4" fontWeight="800">
            GROUND &amp; LAWN
          </text>
          <text x="720" y="164" textAnchor="middle" fill="#86efac" fontSize="7.8" fontWeight="700">
            GREENHOUSE · PRAYER ROOM
          </text>

          {/* 15. Zoology, Zoology Lab & Botany, Botany Lab (Deep Jade / Emerald-Mint) */}
          <rect x="814" y="96" width="142" height="76" rx="10" fill="#065f46" fillOpacity="0.72" stroke="#6ee7b7" strokeWidth="2" />
          <text x="885" y="113" textAnchor="middle" fill="#d1fae5" fontSize="8.6" fontWeight="800">
            ZOOLOGY &amp; ZOO LAB
          </text>
          <text x="885" y="163" textAnchor="middle" fill="#a7f3d0" fontSize="8.6" fontWeight="800">
            BOTANY &amp; BOTANY LAB
          </text>

          {/* 12. Statistics & Mathematics (Statistics Before Mathematics — Fuchsia) */}
          <rect x="646" y="190" width="156" height="58" rx="10" fill="#701a75" fillOpacity="0.62" stroke="#e879f9" strokeWidth="2" />
          <text x="724" y="207" textAnchor="middle" fill="#fae8ff" fontSize="8.8" fontWeight="800">
            STATISTICS (First)
          </text>
          <text x="724" y="241" textAnchor="middle" fill="#f0abfc" fontSize="8.8" fontWeight="800">
            MATHEMATICS
          </text>

          {/* 13. Physics, Physics Lab & Dark Room (Cobalt Blue) */}
          <rect x="812" y="190" width="144" height="58" rx="10" fill="#1e3a8a" fillOpacity="0.68" stroke="#60a5fa" strokeWidth="2" />
          {/* Dark Room Black Box Accent */}
          <rect x="916" y="200" width="30" height="20" rx="3" fill="#020617" stroke="#93c5fd" strokeWidth="1" />
          <text x="876" y="207" textAnchor="middle" fill="#dbeafe" fontSize="8.6" fontWeight="800">
            PHYSICS &amp; LAB
          </text>
          <text x="884" y="241" textAnchor="middle" fill="#93c5fd" fontSize="8.4" fontWeight="800">
            OPTICS DARK ROOM
          </text>

          {/* ================= PRINCIPAL'S OFFICE ALIGNMENT LINE ================= */}

          {/* 08. Auditorium Hall (Left of Principal's Office Line — Rose Crimson) */}
          <rect x="46" y="264" width="118" height="64" rx="10" fill="#881337" fillOpacity="0.64" stroke="#fb7185" strokeWidth="2" />
          <text x="105" y="282" textAnchor="middle" fill="#ffe4e6" fontSize="9.2" fontWeight="800">
            AUDITORIUM
          </text>
          <text x="105" y="320" textAnchor="middle" fill="#fda4af" fontSize="7.8" fontWeight="600">
            (Left of Principal)
          </text>

          {/* 07. Chemistry & Chemistry Labs (In Line Left of Principal's Office — Cyan) */}
          <rect x="174" y="264" width="208" height="64" rx="10" fill="#164e63" fillOpacity="0.68" stroke="#22d3ee" strokeWidth="2" />
          <text x="278" y="282" textAnchor="middle" fill="#cffafe" fontSize="9.2" fontWeight="800">
            CHEMISTRY &amp; CHEMISTRY LABS
          </text>
          <text x="278" y="320" textAnchor="middle" fill="#67e8f9" fontSize="7.8" fontWeight="600">
            (In Line Left of Principal)
          </text>

          {/* 09. Principal's Office (Right After Big Lawn — Imperial Gold) */}
          <rect x="526" y="264" width="124" height="60" rx="10" fill="#78350f" fillOpacity="0.72" stroke="#fbbf24" strokeWidth="2.4" />
          <text x="588" y="281" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="800">
            PRINCIPAL&rsquo;S OFFICE
          </text>
          <text x="588" y="317" textAnchor="middle" fill="#fcd34d" fontSize="7.5" fontWeight="700">
            (Right Past Big Lawn)
          </text>

          {/* 10. General Staff Room (1st Floor Right of Principal's Office — Indigo) */}
          <rect x="658" y="264" width="120" height="60" rx="10" fill="#1e1b4b" fillOpacity="0.74" stroke="#818cf8" strokeWidth="2" />
          <text x="718" y="281" textAnchor="middle" fill="#e0e7ff" fontSize="8.5" fontWeight="800">
            GENERAL STAFF RM
          </text>
          <text x="718" y="317" textAnchor="middle" fill="#a5b4fc" fontSize="7.5" fontWeight="700">
            (1st Floor Right)
          </text>

          {/* 11. Islamiat, Islamic Culture & English (1st Floor Right — Flamingo Pink) */}
          <rect x="786" y="264" width="170" height="60" rx="10" fill="#831843" fillOpacity="0.64" stroke="#ec4899" strokeWidth="2" />
          <text x="871" y="280" textAnchor="middle" fill="#fce7f3" fontSize="8.3" fontWeight="800">
            ISLAMIAT · ISLAMIC CULTURE
          </text>
          <text x="871" y="317" textAnchor="middle" fill="#f9a8d4" fontSize="8.5" fontWeight="800">
            ENGLISH (1st Floor)
          </text>

          {/* ================= BIG LAWN & LOWER-RIGHT / ENTRANCE ================= */}

          {/* Big Walking Lawn & Gardeners (Right of Twin Grill Paths Before Principal's Office) */}
          <rect x="536" y="334" width="210" height="58" rx="10" fill="url(#lawn-grad)" stroke="#84cc16" strokeWidth="1.9" />
          <circle cx="564" cy="354" r="9.5" fill="#22c55e" fillOpacity="0.52" stroke="#a3e635" strokeWidth="1.2" />
          <circle cx="642" cy="348" r="8.5" fill="#22c55e" fillOpacity="0.52" stroke="#a3e635" strokeWidth="1.2" />
          <circle cx="718" cy="354" r="9.5" fill="#22c55e" fillOpacity="0.52" stroke="#a3e635" strokeWidth="1.2" />

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
          <text x="641" y="384" textAnchor="middle" fill="#ecfccb" fontSize="8.4" fontWeight="800">
            BIG WALKING LAWN · GARDENERS (RIGHT)
          </text>

          {/* Shaded West Courtyard (Across from Clerk Office & Big Lawn) */}
          <rect x="66" y="352" width="230" height="84" rx="12" fill="#064e3b" fillOpacity="0.42" stroke="#34d399" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx="110" cy="388" r="14" fill="#10b981" fillOpacity="0.3" stroke="#6ee7b7" strokeOpacity="0.5" strokeWidth="1.2" />
          <circle cx="180" cy="396" r="12" fill="#10b981" fillOpacity="0.3" stroke="#6ee7b7" strokeOpacity="0.5" strokeWidth="1.2" />
          <circle cx="250" cy="386" r="14" fill="#10b981" fillOpacity="0.3" stroke="#6ee7b7" strokeOpacity="0.5" strokeWidth="1.2" />
          <text x="181" y="424" textAnchor="middle" fill="#a7f3d0" fillOpacity="0.85" fontSize="8.8" fontWeight="700">
            WEST SHADED TREES &amp; COURTYARD
          </text>

          {/* 04. Clerk Office (On Straight Path Very First on Right — Teal) */}
          <rect x="558" y="404" width="154" height="54" rx="10" fill="#115e59" fillOpacity="0.72" stroke="#2dd4bf" strokeWidth="2" />
          <text x="635" y="421" textAnchor="middle" fill="#ccfbf1" fontSize="9.2" fontWeight="800">
            CLERK OFFICE
          </text>
          <text x="635" y="451" textAnchor="middle" fill="#5eead4" fontSize="7.6" fontWeight="700">
            (First on Right · Straight)
          </text>

          {/* 05. Central Library (After Some Walking Distance on Right — Violet) */}
          <rect x="752" y="400" width="200" height="62" rx="10" fill="#4c1d95" fillOpacity="0.68" stroke="#8b5cf6" strokeWidth="2.2" />
          <text x="852" y="418" textAnchor="middle" fill="#ede9fe" fontSize="9.6" fontWeight="800">
            CENTRAL LIBRARY (RIGHT)
          </text>
          <text x="852" y="453" textAnchor="middle" fill="#c4b5fd" fontSize="7.8" fontWeight="600">
            (Walk Straight Further &rarr; Right)
          </text>

          {/* 02. Waiting Room (Entrance Left — Sky Blue) */}
          <rect x="136" y="472" width="206" height="56" rx="10" fill="#0c4a6e" fillOpacity="0.7" stroke="#0ea5e9" strokeWidth="2" />
          <text x="239" y="489" textAnchor="middle" fill="#e0f2fe" fontSize="9.4" fontWeight="800">
            WAITING ROOM (LEFT)
          </text>
          <text x="239" y="520" textAnchor="middle" fill="#7dd3fc" fontSize="7.8" fontWeight="600">
            (First on Left When Entering)
          </text>

          {/* 03. College Canteen (Entrance Right — Vibrant Orange) */}
          <rect x="572" y="472" width="166" height="56" rx="10" fill="#9a3412" fillOpacity="0.68" stroke="#f97316" strokeWidth="2" />
          <text x="655" y="489" textAnchor="middle" fill="#ffedd5" fontSize="9.4" fontWeight="800">
            CANTEEN (RIGHT)
          </text>
          <text x="655" y="520" textAnchor="middle" fill="#fdba74" fontSize="7.8" fontWeight="600">
            (First on Right After Gate)
          </text>

          {/* ================= PAVED WALKWAYS & GRILL PATHS ================= */}

          {/* Entrance Cross Plaza (Waiting Room Left <-> Gate <-> Canteen Right) */}
          <line x1="240" y1="500" x2="655" y2="500" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="14" strokeLinecap="round" />
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
            x="456"
            y="412"
            width="88"
            height="17"
            rx="4"
            fill="#021b15"
            fillOpacity="0.95"
            stroke="#a3e635"
            strokeOpacity="0.75"
            strokeWidth="1.2"
          />
          <text x="500" y="423.5" textAnchor="middle" fill="#ecfccb" fontSize="8" fontWeight="800" letterSpacing="0.5">
            SMALL GRILL
          </text>

          {/* Principal's Office Horizontal Line (Auditorium & Chemistry Left <-> Principal & 1st Floor Right) */}
          <line x1="105" y1="294" x2="870" y2="294" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="12" strokeLinecap="round" />

          {/* Upper-Right Academic & Life-Science Connections */}
          <line x1="590" y1="294" x2="590" y2="219" stroke="#94a3b8" strokeOpacity="0.24" strokeWidth="10" strokeLinecap="round" />
          <line x1="590" y1="219" x2="885" y2="219" stroke="#94a3b8" strokeOpacity="0.26" strokeWidth="10" strokeLinecap="round" />
          <line x1="500" y1="174" x2="720" y2="132" stroke="#94a3b8" strokeOpacity="0.24" strokeWidth="10" strokeLinecap="round" />
          <line x1="720" y1="132" x2="885" y2="132" stroke="#94a3b8" strokeOpacity="0.26" strokeWidth="10" strokeLinecap="round" />

          {/* LEFT PATH BETWEEN TWO GRILLS -> HOSTEL & COMPUTER LAB */}
          <line x1="485" y1="226" x2="268" y2="226" stroke="#cbd5e1" strokeOpacity="0.34" strokeWidth="10" strokeLinecap="round" />
          <line x1="485" y1="242" x2="268" y2="242" stroke="#cbd5e1" strokeOpacity="0.34" strokeWidth="10" strokeLinecap="round" />
          <line x1="480" y1="220" x2="274" y2="220" stroke="#fb923c" strokeWidth="2.2" strokeDasharray="5 3" strokeOpacity="0.85" />
          <line x1="480" y1="248" x2="274" y2="248" stroke="#fb923c" strokeWidth="2.2" strokeDasharray="5 3" strokeOpacity="0.85" />
          <rect x="330" y="226" width="114" height="16" rx="4" fill="#021b15" fillOpacity="0.95" stroke="#fb923c" strokeOpacity="0.8" strokeWidth="1" />
          <text x="387" y="237" textAnchor="middle" fill="#fed7aa" fontSize="7.4" fontWeight="800">
            2-GRILL LEFT PATH
          </text>

          {/* Upper-Left Sports & Corridor Branch (Tennis/Volleyball -> Pak Studies/Urdu/PE & Commerce) */}
          <line x1="330" y1="226" x2="330" y2="66" stroke="#94a3b8" strokeOpacity="0.26" strokeWidth="10" strokeLinecap="round" />
          <line x1="330" y1="144" x2="145" y2="96" stroke="#94a3b8" strokeOpacity="0.26" strokeWidth="10" strokeLinecap="round" />

          {/* Straight North Spine -> Sindhi, Economics, Physiology & Big Ground */}
          <line x1="500" y1="165" x2="525" y2="78" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="14" strokeLinecap="round" />

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
                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 px-2 py-0.5 rounded bg-[#021611]/95 border text-[10px] font-bold whitespace-nowrap shadow-lg transition-opacity pointer-events-none ${
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
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300 px-1">
        <div className="flex flex-wrap items-center gap-3.5">
          <span className={`inline-flex items-center gap-1.5 font-semibold ${selectedTheme.textClass}`}>
            <span className={`w-3 h-3 rounded-full ${selectedTheme.pinBg} border border-white inline-block`} />
            <span>Selected: {selectedStop.shortName || selectedStop.name}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sky-300">
            <span className="w-3 h-3 rounded-full bg-sky-400 border border-white inline-block" />
            <span>Visitor Walking</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sky-200">
            <span className="w-5 border-t-2 border-sky-400 inline-block" />
            <span>Walked Path</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-300">
            <span className="w-5 border-t-2 border-dashed border-amber-400 inline-block" />
            <span>Route Ahead</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-cyan-200">
            <span className="w-3 h-3 rounded-full bg-slate-900 border border-sky-400 inline-block" />
            <span>Gate Security</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-lime-200">
            <span className="w-3 h-3 rounded-full bg-green-950 border border-lime-400 inline-block" />
            <span>Lawn Gardeners</span>
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 font-medium text-amber-300">
          <Navigation className="w-3.5 h-3.5" />
          <span>{selectedStop.gateDirections.distanceFromGate}</span>
        </span>
      </div>
    </div>
  );
}
