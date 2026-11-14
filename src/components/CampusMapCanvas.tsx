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
  badgeBg: string;
}

const STOP_THEMES_BY_ID: Record<string, StopColorTheme> = {
  'historic-gateway': {
    pinBg: 'bg-emerald-500',
    pinText: 'text-white',
    pinBorder: 'border-emerald-200',
    ringGlow: 'bg-emerald-400/45',
    hex: '#10b981',
    badgeBg: 'bg-emerald-500 text-white'
  },
  'college-canteen': {
    pinBg: 'bg-orange-500',
    pinText: 'text-white',
    pinBorder: 'border-orange-200',
    ringGlow: 'bg-orange-400/45',
    hex: '#f97316',
    badgeBg: 'bg-orange-500 text-white'
  },
  'central-library': {
    pinBg: 'bg-violet-500',
    pinText: 'text-white',
    pinBorder: 'border-violet-200',
    ringGlow: 'bg-violet-400/45',
    hex: '#8b5cf6',
    badgeBg: 'bg-violet-500 text-white'
  },
  'clerk-office': {
    pinBg: 'bg-teal-400',
    pinText: 'text-slate-950',
    pinBorder: 'border-teal-100',
    ringGlow: 'bg-teal-300/45',
    hex: '#2dd4bf',
    badgeBg: 'bg-teal-400 text-slate-950'
  },
  'grill-divided-walkway': {
    pinBg: 'bg-lime-400',
    pinText: 'text-emerald-950',
    pinBorder: 'border-lime-100',
    ringGlow: 'bg-lime-400/45',
    hex: '#a3e635',
    badgeBg: 'bg-lime-400 text-emerald-950'
  },
  'principal-office': {
    pinBg: 'bg-amber-400',
    pinText: 'text-emerald-950',
    pinBorder: 'border-amber-100',
    ringGlow: 'bg-amber-300/50',
    hex: '#fbbf24',
    badgeBg: 'bg-amber-400 text-emerald-950'
  },
  'seccap-help-desk': {
    pinBg: 'bg-sky-500',
    pinText: 'text-white',
    pinBorder: 'border-sky-200',
    ringGlow: 'bg-sky-400/45',
    hex: '#0ea5e9',
    badgeBg: 'bg-sky-500 text-white'
  },
  'science-labs': {
    pinBg: 'bg-fuchsia-500',
    pinText: 'text-white',
    pinBorder: 'border-fuchsia-200',
    ringGlow: 'bg-fuchsia-400/45',
    hex: '#d946ef',
    badgeBg: 'bg-fuchsia-500 text-white'
  },
  'auditorium-hall': {
    pinBg: 'bg-rose-500',
    pinText: 'text-white',
    pinBorder: 'border-rose-200',
    ringGlow: 'bg-rose-400/45',
    hex: '#f43f5e',
    badgeBg: 'bg-rose-500 text-white'
  },
  'wing-1': {
    pinBg: 'bg-blue-500',
    pinText: 'text-white',
    pinBorder: 'border-blue-200',
    ringGlow: 'bg-blue-400/45',
    hex: '#3b82f6',
    badgeBg: 'bg-blue-500 text-white'
  },
  'wing-2': {
    pinBg: 'bg-cyan-400',
    pinText: 'text-slate-950',
    pinBorder: 'border-cyan-100',
    ringGlow: 'bg-cyan-300/45',
    hex: '#22d3ee',
    badgeBg: 'bg-cyan-400 text-slate-950'
  },
  'wing-3': {
    pinBg: 'bg-purple-500',
    pinText: 'text-white',
    pinBorder: 'border-purple-200',
    ringGlow: 'bg-purple-400/45',
    hex: '#a855f7',
    badgeBg: 'bg-purple-500 text-white'
  },
  'wing-4': {
    pinBg: 'bg-pink-500',
    pinText: 'text-white',
    pinBorder: 'border-pink-200',
    ringGlow: 'bg-pink-400/45',
    hex: '#ec4899',
    badgeBg: 'bg-pink-500 text-white'
  },
  'computer-lab': {
    pinBg: 'bg-indigo-500',
    pinText: 'text-white',
    pinBorder: 'border-indigo-200',
    ringGlow: 'bg-indigo-400/45',
    hex: '#6366f1',
    badgeBg: 'bg-indigo-500 text-white'
  },
  'multimedia-room': {
    pinBg: 'bg-yellow-400',
    pinText: 'text-slate-950',
    pinBorder: 'border-yellow-100',
    ringGlow: 'bg-yellow-300/50',
    hex: '#facc15',
    badgeBg: 'bg-yellow-400 text-slate-950'
  },
  'sports-lawn': {
    pinBg: 'bg-green-500',
    pinText: 'text-white',
    pinBorder: 'border-green-200',
    ringGlow: 'bg-green-400/45',
    hex: '#22c55e',
    badgeBg: 'bg-green-500 text-white'
  }
};

const FALLBACK_THEMES: StopColorTheme[] = [
  STOP_THEMES_BY_ID['seccap-help-desk'],
  STOP_THEMES_BY_ID['college-canteen'],
  STOP_THEMES_BY_ID['central-library'],
  STOP_THEMES_BY_ID['auditorium-hall'],
  STOP_THEMES_BY_ID['clerk-office'],
  STOP_THEMES_BY_ID['science-labs'],
  STOP_THEMES_BY_ID['principal-office']
];

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
  if (y > 76) {
    return [GATE_COORDS, { x: 50, y: 81 }, { x, y }];
  }
  if (y > 65) {
    return [GATE_COORDS, { x: 50, y: 72 }, { x, y }];
  }
  return [
    GATE_COORDS,
    { x: 50, y: 72 },
    { x: 50, y: Math.max(24, Math.min(60, y)) },
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
  const dx = x - GATE_COORDS.x; // negative = left, positive = right
  const dy = GATE_COORDS.y - y; // positive = straight inward
  const estMeters = Math.max(8, Math.round(Math.hypot(dx * 0.9, dy * 1.1)));

  let turn: DirectionTurn = 'Straight Ahead';
  let step2 =
    'Walk straight past the Clerk Office on your left and through the twin pathways separated by the small grill.';

  if (dy < 6 && Math.abs(dx) <= 6) {
    turn = 'Entry Gate';
    step2 = 'On your right sits the College Canteen; walking straight inside brings you to Central Library on the right.';
  } else if (dx <= -15 && y > 74) {
    turn = 'Turn Left';
    step2 = 'Upon entering the Main Gate, turn left near the Notice Board & SECCAP Desk.';
  } else if (dx <= -15 && y > 45) {
    turn = 'Bear Left';
    step2 = 'Walk straight past the Clerk Office on your left toward the west campus block.';
  } else if (dx <= -8) {
    turn = y <= 45 ? 'Turn Left' : 'Bear Left';
    step2 =
      'Walk straight along the two grill-separated paths (passing the walking lawn on the right), then bear left.';
  } else if (dx >= 15 && y > 74) {
    turn = 'Turn Right';
    step2 = 'Upon entering the Main Gate, turn right past the College Canteen walkway.';
  } else if (dx >= 8) {
    turn = dx >= 20 ? 'Turn Right' : 'Bear Right';
    step2 =
      'Walk straight past Central Library and along the twin grill paths (with walking lawn on your right), then turn right.';
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
      'Enter through the Main College Gate (with College Canteen right after the gate on your right).',
      step2,
      `Arrive at ${label} (approx. ${estMeters} meters inside the gate).`
    ],
    routePath: buildAutoRoutePath(x, y)
  };
}

/**
 * Computes the already-walked portion of `route` up to fractional `progress` (0..1)
 * plus evenly spaced breadcrumb footprints along the walked path.
 */
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

  // Generate subtle breadcrumb dots along the walked distance every ~32 SVG units
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
    const x = Math.round(Math.max(6, Math.min(94, rawX)) * 10) / 10;
    const y = Math.round(Math.max(8, Math.min(92, rawY)) * 10) / 10;
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
        className={`relative w-full h-[430px] sm:h-[500px] lg:h-[540px] rounded-2xl overflow-hidden bg-[#021d17] border-2 shadow-2xl select-none ${
          mapMode !== 'browse'
            ? 'border-amber-300 cursor-crosshair'
            : 'border-amber-300/40'
        }`}
      >
        {/* Architectural Cartographic SVG Ground Plan (1000 x 600 matches X*10, Y*6) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="campus-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#10b981"
                strokeWidth="0.6"
                strokeOpacity="0.1"
              />
            </pattern>
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

          {/* Campus Base & Architectural Grid */}
          <rect width="1000" height="600" fill="#03261e" />
          <rect width="1000" height="600" fill="url(#campus-grid)" />

          {/* Campus Compound Boundary Wall */}
          <rect
            x="40"
            y="22"
            width="920"
            height="520"
            rx="16"
            fill="#043026"
            stroke="#34d399"
            strokeOpacity="0.35"
            strokeWidth="2.5"
          />

          {/* North Sports Lawn & Recreation Field (Green) */}
          <rect
            x="385"
            y="36"
            width="255"
            height="72"
            rx="10"
            fill="#14532d"
            fillOpacity="0.72"
            stroke="#4ade80"
            strokeOpacity="0.65"
            strokeWidth="1.8"
          />
          <text
            x="512"
            y="56"
            textAnchor="middle"
            fill="#bbf7d0"
            fontSize="10"
            fontWeight="700"
            letterSpacing="1.2"
          >
            NORTH SPORTS LAWN
          </text>
          {/* Gardener in North Sports Lawn */}
          <g transform="translate(422, 82)">
            <circle cx="0" cy="0" r="11" fill="#052e16" fillOpacity="0.85" stroke="#86efac" strokeWidth="1.3" />
            {/* Sun hat + head + body */}
            <ellipse cx="0" cy="-4.5" rx="6.5" ry="2" fill="#fde047" />
            <circle cx="0" cy="-2.5" r="2.6" fill="#fef3c7" />
            <path d="M-4,5 C-4,1 4,1 4,5 Z" fill="#4ade80" />
            {/* Watering can */}
            <rect x="4.2" y="1" width="4" height="3.2" rx="0.8" fill="#38bdf8" />
            <path d="M4.2,2.5 L2.5,1" stroke="#38bdf8" strokeWidth="1" />
          </g>
          <text x="422" y="101" textAnchor="middle" fill="#bbf7d0" fontSize="7.5" fontWeight="700">
            GARDENER
          </text>

          {/* Academic Wing 4 (Pink / Berry) */}
          <rect
            x="275"
            y="78"
            width="140"
            height="58"
            rx="8"
            fill="#831843"
            fillOpacity="0.48"
            stroke="#f472b6"
            strokeOpacity="0.7"
            strokeWidth="1.8"
          />
          <text x="345" y="102" textAnchor="middle" fill="#fbcfe8" fontSize="10" fontWeight="700">
            WING 4
          </text>

          {/* Auditorium Hall (Rose / Crimson) */}
          <rect
            x="420"
            y="112"
            width="165"
            height="68"
            rx="10"
            fill="#881337"
            fillOpacity="0.52"
            stroke="#fb7185"
            strokeOpacity="0.75"
            strokeWidth="2"
          />
          <text x="502" y="135" textAnchor="middle" fill="#fecdd3" fontSize="11" fontWeight="700">
            AUDITORIUM HALL
          </text>

          {/* Academic Wing 3 (Purple) */}
          <rect
            x="730"
            y="82"
            width="175"
            height="66"
            rx="8"
            fill="#581c87"
            fillOpacity="0.52"
            stroke="#c084fc"
            strokeOpacity="0.7"
            strokeWidth="1.8"
          />
          <text x="817" y="106" textAnchor="middle" fill="#e9d5ff" fontSize="10" fontWeight="700">
            WING 3 · LIFE SCIENCES
          </text>

          {/* Academic Wing 1 (Cobalt Blue) */}
          <rect
            x="130"
            y="148"
            width="145"
            height="68"
            rx="8"
            fill="#1e3a8a"
            fillOpacity="0.52"
            stroke="#60a5fa"
            strokeOpacity="0.7"
            strokeWidth="1.8"
          />
          <text x="202" y="172" textAnchor="middle" fill="#bfdbfe" fontSize="10" fontWeight="700">
            WING 1
          </text>

          {/* WEST SHADED COURTYARD GARDEN (Left Mid-West) */}
          <rect
            x="66"
            y="286"
            width="160"
            height="92"
            rx="10"
            fill="#064e3b"
            fillOpacity="0.45"
            stroke="#34d399"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          <circle cx="105" cy="322" r="13" fill="#10b981" fillOpacity="0.32" stroke="#6ee7b7" strokeOpacity="0.55" strokeWidth="1.2" />
          <circle cx="185" cy="342" r="12" fill="#10b981" fillOpacity="0.32" stroke="#6ee7b7" strokeOpacity="0.55" strokeWidth="1.2" />
          <text x="146" y="366" textAnchor="middle" fill="#a7f3d0" fillOpacity="0.8" fontSize="9.5" fontWeight="700">
            WEST SHADED COURTYARD
          </text>

          {/* NOTICE BOARD & SECCAP DESK (Left Inside Gate) */}
          <rect
            x="190"
            y="456"
            width="160"
            height="62"
            rx="10"
            fill="#0c4a6e"
            fillOpacity="0.62"
            stroke="#38bdf8"
            strokeOpacity="0.85"
            strokeWidth="2"
          />
          <text x="270" y="476" textAnchor="middle" fill="#bae6fd" fontSize="10" fontWeight="700">
            NOTICE &amp; SECCAP DESK
          </text>

          {/* CLERK OFFICE (Straight from Gate, on Left Side) */}
          <rect
            x="275"
            y="396"
            width="145"
            height="54"
            rx="8"
            fill="#115e59"
            fillOpacity="0.68"
            stroke="#2dd4bf"
            strokeOpacity="0.85"
            strokeWidth="2"
          />
          <text x="347" y="416" textAnchor="middle" fill="#99f6e4" fontSize="10.5" fontWeight="700">
            CLERK OFFICE (LEFT)
          </text>

          {/* COLLEGE CANTEEN (On Right Side After Entrance Gate) */}
          <rect
            x="565"
            y="462"
            width="145"
            height="58"
            rx="10"
            fill="#9a3412"
            fillOpacity="0.62"
            stroke="#fb923c"
            strokeOpacity="0.9"
            strokeWidth="2"
          />
          <text x="637" y="482" textAnchor="middle" fill="#fed7aa" fontSize="10.5" fontWeight="700">
            CANTEEN (RIGHT)
          </text>

          {/* CENTRAL COLLEGE LIBRARY (Royal Violet — Walk Straight Inside, on Right Side) */}
          <rect
            x="675"
            y="354"
            width="190"
            height="78"
            rx="10"
            fill="#4c1d95"
            fillOpacity="0.62"
            stroke="#a78bfa"
            strokeOpacity="0.9"
            strokeWidth="2.2"
          />
          <text x="770" y="378" textAnchor="middle" fill="#ddd6fe" fontSize="10.5" fontWeight="700">
            CENTRAL LIBRARY (RIGHT)
          </text>
          <text x="770" y="420" textAnchor="middle" fill="#c4b5fd" fontSize="9">
            (Straight Inside &rarr; Right)
          </text>

          {/* WALKING LAWN, TREES & GARDENERS (Vibrant Emerald & Lime — On Right Side of Twin Grill Paths) */}
          <rect
            x="542"
            y="256"
            width="115"
            height="108"
            rx="12"
            fill="#166534"
            fillOpacity="0.74"
            stroke="#84cc16"
            strokeOpacity="0.7"
            strokeWidth="1.8"
          />
          <circle cx="566" cy="276" r="12" fill="#22c55e" fillOpacity="0.48" stroke="#a3e635" strokeOpacity="0.85" strokeWidth="1.4" />
          <circle cx="634" cy="276" r="12" fill="#22c55e" fillOpacity="0.48" stroke="#a3e635" strokeOpacity="0.85" strokeWidth="1.4" />

          {/* Gardener 1 (Left in Lawn — Watering Plants) */}
          <g transform="translate(568, 312)">
            <circle cx="0" cy="0" r="11.5" fill="#052e16" fillOpacity="0.9" stroke="#a3e635" strokeWidth="1.4" />
            <ellipse cx="0" cy="-4.5" rx="6.8" ry="2" fill="#fde047" />
            <circle cx="0" cy="-2.2" r="2.6" fill="#fef3c7" />
            <path d="M-4,5.2 C-4,1 4,1 4,5.2 Z" fill="#4ade80" />
            {/* Watering Can */}
            <rect x="4" y="1" width="4.2" height="3.2" rx="0.8" fill="#38bdf8" />
            <path d="M8.2,2.2 L10.2,0.8" stroke="#38bdf8" strokeWidth="1.1" />
          </g>

          {/* Gardener 2 (Right in Lawn — Trimming & Flowers) */}
          <g transform="translate(630, 312)">
            <circle cx="0" cy="0" r="11.5" fill="#052e16" fillOpacity="0.9" stroke="#a3e635" strokeWidth="1.4" />
            <ellipse cx="0" cy="-4.5" rx="6.8" ry="2" fill="#fde047" />
            <circle cx="0" cy="-2.2" r="2.6" fill="#fef3c7" />
            <path d="M-4,5.2 C-4,1 4,1 4,5.2 Z" fill="#22c55e" />
            {/* Flower Accent */}
            <circle cx="-6" cy="2.5" r="2" fill="#f472b6" />
            <circle cx="-6" cy="2.5" r="0.8" fill="#fef08a" />
          </g>

          <text x="600" y="344" textAnchor="middle" fill="#ecfccb" fontSize="8.8" fontWeight="700">
            WALKING LAWN
          </text>
          <text x="600" y="356" textAnchor="middle" fill="#bbf7d0" fontSize="8" fontWeight="700">
            Gardeners (Right)
          </text>

          {/* PRINCIPAL'S OFFICE (Imperial Gold — Straight Past Lawn, on Right Side) */}
          <rect
            x="575"
            y="184"
            width="160"
            height="62"
            rx="10"
            fill="#78350f"
            fillOpacity="0.65"
            stroke="#fbbf24"
            strokeOpacity="0.92"
            strokeWidth="2.2"
          />
          <text x="655" y="204" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="700">
            PRINCIPAL&rsquo;S OFFICE (RIGHT)
          </text>

          {/* Academic Wing 2 (Cyan — East past Principal's Office) */}
          <rect
            x="755"
            y="166"
            width="130"
            height="66"
            rx="8"
            fill="#164e63"
            fillOpacity="0.58"
            stroke="#22d3ee"
            strokeOpacity="0.75"
            strokeWidth="1.8"
          />
          <text x="820" y="188" textAnchor="middle" fill="#a5f3fc" fontSize="10" fontWeight="700">
            WING 2
          </text>

          {/* Block B Science Wing (Fuchsia / Magenta — Upper-Right above Central Library) */}
          <rect
            x="765"
            y="252"
            width="180"
            height="82"
            rx="10"
            fill="#701a75"
            fillOpacity="0.55"
            stroke="#e879f9"
            strokeOpacity="0.8"
            strokeWidth="1.8"
          />
          <text x="855" y="276" textAnchor="middle" fill="#f5d0fe" fontSize="10" fontWeight="700">
            SCIENCE LABS
          </text>

          {/* IT Complex (Indigo — Far South-East past Canteen) */}
          <rect
            x="742"
            y="450"
            width="200"
            height="70"
            rx="10"
            fill="#1e1b4b"
            fillOpacity="0.65"
            stroke="#818cf8"
            strokeOpacity="0.8"
            strokeWidth="1.8"
          />
          <text x="842" y="512" textAnchor="middle" fill="#c7d2fe" fontSize="9.5" fontWeight="700">
            IT COMPLEX (CS &amp; MULTIMEDIA)
          </text>

          {/* PAVED CAMPUS WALKWAYS NETWORK */}
          <line x1="500" y1="540" x2="500" y2="390" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="20" strokeLinecap="round" />
          <line x1="270" y1="486" x2="890" y2="486" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="14" strokeLinecap="round" />
          <line x1="350" y1="426" x2="500" y2="426" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="12" strokeLinecap="round" />
          <line x1="500" y1="393" x2="770" y2="393" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="12" strokeLinecap="round" />

          {/* TWIN WAYS SEPARATED BY SMALL GRILL */}
          <line x1="485" y1="390" x2="485" y2="215" stroke="#cbd5e1" strokeOpacity="0.34" strokeWidth="14" strokeLinecap="round" />
          <line x1="515" y1="390" x2="515" y2="215" stroke="#cbd5e1" strokeOpacity="0.34" strokeWidth="14" strokeLinecap="round" />
          <line
            x1="500"
            y1="382"
            x2="500"
            y2="238"
            stroke="#fbbf24"
            strokeWidth="3.2"
            strokeDasharray="6 4"
            strokeOpacity="0.95"
          />
          <rect
            x="456"
            y="302"
            width="88"
            height="18"
            rx="4"
            fill="#021b15"
            fillOpacity="0.95"
            stroke="#a3e635"
            strokeOpacity="0.7"
            strokeWidth="1.2"
          />
          <text x="500" y="314" textAnchor="middle" fill="#ecfccb" fontSize="8.5" fontWeight="700" letterSpacing="0.5">
            SMALL GRILL
          </text>

          {/* Upper Spine connecting straight to Principal's Office (Right) & Auditorium */}
          <line x1="500" y1="215" x2="500" y2="78" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="14" strokeLinecap="round" />
          <line x1="500" y1="216" x2="655" y2="216" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="12" strokeLinecap="round" />

          {/* Pathan Colony Road outside the Main Gate */}
          <rect x="0" y="548" width="1000" height="52" fill="#0f172a" fillOpacity="0.92" />
          <line x1="20" y1="574" x2="980" y2="574" stroke="#eab308" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="16 14" />
          <text
            x="170"
            y="578"
            textAnchor="middle"
            fill="#cbd5e1"
            fillOpacity="0.85"
            fontSize="10.5"
            fontWeight="600"
            letterSpacing="1"
          >
            PATHAN COLONY ROAD · HIRABAD
          </text>
          <text
            x="830"
            y="578"
            textAnchor="middle"
            fill="#cbd5e1"
            fillOpacity="0.85"
            fontSize="10.5"
            fontWeight="600"
            letterSpacing="1"
          >
            OPPOSITE CENTRAL JAIL
          </text>

          {/* Gate Entrance Opening & Security Guard Post */}
          <rect x="445" y="530" width="110" height="22" fill="#043026" />
          <path d="M445 540 L445 522 M555 540 L555 522" stroke="#facc15" strokeWidth="3.5" />

          {/* Security Guard Cabin (Left of Main Gate) */}
          <rect
            x="386"
            y="514"
            width="54"
            height="24"
            rx="5"
            fill="#1e293b"
            stroke="#38bdf8"
            strokeWidth="1.6"
          />
          <text x="413" y="529" textAnchor="middle" fill="#e0f2fe" fontSize="7.5" fontWeight="800" letterSpacing="0.5">
            SECURITY
          </text>

          {/* Left Gate Security Guard */}
          <g transform="translate(460, 524)">
            <circle cx="0" cy="0" r="11" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Security Peaked Cap + Head + Uniform */}
            <rect x="-4.5" y="-6.2" width="9" height="2.4" rx="1" fill="#38bdf8" />
            <circle cx="0" cy="-2.2" r="2.6" fill="#fef3c7" />
            <path d="M-4.2,5.5 C-4.2,1.2 4.2,1.2 4.2,5.5 Z" fill="#1d4ed8" />
            {/* Shield Emblem */}
            <path d="M4.2,0.5 L7,1.4 L6.5,4.2 L5.5,5.2 L4.5,4.2 Z" fill="#facc15" />
          </g>

          {/* Right Gate Security Guard */}
          <g transform="translate(540, 524)">
            <circle cx="0" cy="0" r="11" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <rect x="-4.5" y="-6.2" width="9" height="2.4" rx="1" fill="#38bdf8" />
            <circle cx="0" cy="-2.2" r="2.6" fill="#fef3c7" />
            <path d="M-4.2,5.5 C-4.2,1.2 4.2,1.2 4.2,5.5 Z" fill="#1d4ed8" />
            <path d="M-7,1.4 L-4.2,0.5 L-4.5,4.2 L-5.5,5.2 L-6.5,4.2 Z" fill="#facc15" />
          </g>
          <text x="540" y="509" textAnchor="middle" fill="#bae6fd" fontSize="7.5" fontWeight="700" letterSpacing="0.5">
            GATE GUARD
          </text>

          {/* Upcoming Planned Walking Route Polyline */}
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
              opacity="0.88"
            />
          )}

          {/* Solid Glowing Trail Already Walked by Visitor */}
          {walkedTrail.walkedPoints.length >= 2 && (
            <polyline
              points={walkedPolylinePoints}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.92"
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
              opacity="0.85"
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

        {/* Gate Entry Callout (Bottom Center) */}
        <div
          style={{ left: '50%', top: '95%' }}
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
              {/* Directional heading pointer + walking person icon */}
              <div
                className={`relative w-10 h-10 rounded-full bg-sky-400 text-slate-950 border-2 border-white shadow-2xl flex items-center justify-center ${
                  walker.isMoving ? 'animate-bounce' : ''
                }`}
              >
                {/* Rotating heading chevron around the circle edge */}
                <div
                  style={{ transform: `rotate(${walker.angleDeg}deg)` }}
                  className="absolute inset-0 flex items-start justify-center pointer-events-none"
                >
                  <span className="-mt-2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[7px] border-l-transparent border-r-transparent border-b-white drop-shadow" />
                </div>

                {/* Clear Walking Visitor Silhouette */}
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

        {/* Multi-Colored Map Stop Pins */}
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
                className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] font-mono font-bold border-2 shadow-lg transition-all ${
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
                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 px-2 py-0.5 rounded bg-[#021611]/95 border text-[10px] font-semibold whitespace-nowrap shadow-lg transition-opacity pointer-events-none ${
                  isSelected
                    ? 'opacity-100 border-white/80 text-white'
                    : 'opacity-0 group-hover:opacity-100 border-emerald-700 text-white'
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
          <span className="inline-flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-full ${selectedTheme.pinBg} border border-white inline-block`} />
            <span>Selected: {selectedStop.shortName || selectedStop.name}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-400 border border-white inline-block" />
            <span>Visitor Walking</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-5 border-t-2 border-sky-400 inline-block" />
            <span>Walked Path</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-5 border-t-2 border-dashed border-amber-400 inline-block" />
            <span>Route Ahead</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-900 border border-sky-400 inline-block" />
            <span>Gate Security</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
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
