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
    pinBg: 'bg-[#facc15]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-[#fef9c3]',
    ringGlow: 'bg-[#fde047]/55',
    hex: '#facc15',
    textClass: 'text-[#fde047]',
    activeBorder: 'border-[#facc15]',
    badgeBg: 'bg-[#facc15] text-emerald-950'
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
    pinBg: 'bg-[#34d399]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-[#d1fae5]',
    ringGlow: 'bg-[#6ee7b7]/45',
    hex: '#34d399',
    textClass: 'text-[#6ee7b7]',
    activeBorder: 'border-[#34d399]',
    badgeBg: 'bg-[#34d399] text-emerald-950'
  },
  'english-dept': {
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
  'mathematics-dept': {
    pinBg: 'bg-[#2dd4bf]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#ccfbf1]',
    ringGlow: 'bg-[#5eead4]/45',
    hex: '#2dd4bf',
    textClass: 'text-[#99f6e4]',
    activeBorder: 'border-[#2dd4bf]',
    badgeBg: 'bg-[#2dd4bf] text-slate-950'
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
    pinBg: 'bg-[#10b981]',
    pinText: 'text-white',
    pinBorder: 'border-[#d1fae5]',
    ringGlow: 'bg-[#34d399]/45',
    hex: '#10b981',
    textClass: 'text-[#a7f3d0]',
    activeBorder: 'border-[#10b981]',
    badgeBg: 'bg-[#10b981] text-white'
  },
  'botany-dept-lab': {
    pinBg: 'bg-[#a3e635]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-[#ecfccb]',
    ringGlow: 'bg-[#bef264]/45',
    hex: '#a3e635',
    textClass: 'text-[#d9f99d]',
    activeBorder: 'border-[#a3e635]',
    badgeBg: 'bg-[#a3e635] text-emerald-950'
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
  'urdu-dept': {
    pinBg: 'bg-[#f59e0b]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#fef3c7]',
    ringGlow: 'bg-[#fbbf24]/45',
    hex: '#fbbf24',
    textClass: 'text-[#fde68a]',
    activeBorder: 'border-[#fbbf24]',
    badgeBg: 'bg-[#f59e0b] text-slate-950'
  },
  'physical-education-dept': {
    pinBg: 'bg-[#4ade80]',
    pinText: 'text-emerald-950',
    pinBorder: 'border-[#dcfce7]',
    ringGlow: 'bg-[#86efac]/45',
    hex: '#4ade80',
    textClass: 'text-[#86efac]',
    activeBorder: 'border-[#4ade80]',
    badgeBg: 'bg-[#4ade80] text-emerald-950'
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
  },
  'sindhi-dept': {
    pinBg: 'bg-[#22d3ee]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#cffafe]',
    ringGlow: 'bg-[#67e8f9]/45',
    hex: '#22d3ee',
    textClass: 'text-[#a5f3fc]',
    activeBorder: 'border-[#22d3ee]',
    badgeBg: 'bg-[#22d3ee] text-slate-950'
  },
  'economics-dept': {
    pinBg: 'bg-[#fbbf24]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#fef3c7]',
    ringGlow: 'bg-[#fde68a]/45',
    hex: '#fbbf24',
    textClass: 'text-[#fde68a]',
    activeBorder: 'border-[#fbbf24]',
    badgeBg: 'bg-[#fbbf24] text-slate-950'
  },
  'physiology-dept': {
    pinBg: 'bg-[#f472b6]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#fce7f3]',
    ringGlow: 'bg-[#f9a8d4]/45',
    hex: '#f472b6',
    textClass: 'text-[#fbcfe8]',
    activeBorder: 'border-[#f472b6]',
    badgeBg: 'bg-[#f472b6] text-slate-950'
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
    return [GATE_COORDS, { x: 50, y: 83.8 }, { x, y }];
  }
  if (y > 65) {
    return [GATE_COORDS, { x: 50, y: 71.3 }, { x, y }];
  }
  return [
    GATE_COORDS,
    { x: 50, y: 71.3 },
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
    step2 = 'Walk straight across the Big Lawn to the Chemistry Labs & Principal’s Office line, then turn left.';
  } else if (dx <= -8) {
    turn = 'Bear Left';
    step2 =
      'Take the left path between two grills toward Computer Lab, Big Multimedia Room & Hostel or continue north toward the Tennis/Volleyball Ground.';
  } else if (dx >= 15 && y > 76) {
    turn = 'Turn Right';
    step2 = 'Upon entering the Main Gate, turn right past the College Canteen.';
  } else if (dx >= 8) {
    turn = dx >= 20 ? 'Turn Right' : 'Bear Right';
    step2 =
      'Walk straight along the twin grill paths crossing the Big Lawn past the Auditorium toward Principal’s Office, then bear right.';
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
    const len = Math.hypot((b.x - a.x) * 12, (b.y - a.y) * 7.8);
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
  const stepDist = 38;
  for (let d = 26; d < target - 14; d += stepDist) {
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

function WalkingCollegeGirl({
  x,
  y,
  scale = 1,
  dupattaColor = '#10b981',
  bookColor = '#facc15'
}: {
  x: number;
  y: number;
  scale?: number;
  dupattaColor?: string;
  bookColor?: string;
}) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <circle cx="0" cy="0" r="11" fill="#022c22" fillOpacity="0.92" stroke="#6ee7b7" strokeWidth="1.2" />
      {/* White dupatta / headscarf */}
      <circle cx="0" cy="-3.2" r="3" fill="#fef3c7" />
      <path d="M-3.4,-3.5 C-3.4,-6.8 3.4,-6.8 3.4,-3.5 L3.8,0 L-3.8,0 Z" fill="#ffffff" />
      {/* Green/emerald school uniform tunic */}
      <path d="M-4,5.4 C-3.8,0.6 3.8,0.6 4,5.4 Z" fill={dupattaColor} />
      <path d="M-2.2,1 L2.2,1 L1.5,5.2 L-1.5,5.2 Z" fill="#ffffff" fillOpacity="0.88" />
      {/* Notebook held in hand */}
      <rect x="-6.4" y="1" width="3.6" height="4.4" rx="0.6" fill={bookColor} stroke="#ffffff" strokeWidth="0.5" />
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

  const polylinePoints = activeRoute.map((pt) => `${pt.x * 12},${pt.y * 7.8}`).join(' ');

  const walkedTrail =
    walker && walker.active && typeof walker.progress === 'number'
      ? buildWalkedTrail(activeRoute, walker.progress)
      : { walkedPoints: [], footprints: [] };

  const walkedPolylinePoints = walkedTrail.walkedPoints
    .map((pt) => `${pt.x * 12},${pt.y * 7.8}`)
    .join(' ');

  return (
    <div className="space-y-4">
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

      {/* Enlarged Spacious Full-Width Map Viewport */}
      <div
        ref={containerRef}
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverCoords(null)}
        className={`relative w-full h-[620px] sm:h-[740px] lg:h-[850px] rounded-2xl overflow-hidden bg-[#021914] border-2 shadow-2xl select-none ${
          mapMode !== 'browse'
            ? 'border-amber-300 cursor-crosshair'
            : 'border-amber-300/50'
        }`}
      >
        {/* Architectural Cartographic SVG Ground Plan (1200 x 780 matches X*12, Y*7.8) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 780"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="campus-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path
                d="M 36 0 L 0 0 0 36"
                fill="none"
                stroke="#34d399"
                strokeWidth="0.6"
                strokeOpacity="0.11"
              />
            </pattern>
            <radialGradient id="campus-glow" cx="50%" cy="50%" r="62%">
              <stop offset="0%" stopColor="#065f46" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#021f19" stopOpacity="0.96" />
            </radialGradient>
            <linearGradient id="lawn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#15803d" stopOpacity="0.92" />
              <stop offset="50%" stopColor="#16a34a" stopOpacity="0.86" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.82" />
            </linearGradient>
            <linearGradient id="gold-principal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.96" />
              <stop offset="45%" stopColor="#eab308" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#92400e" stopOpacity="0.96" />
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
          <rect width="1200" height="780" fill="url(#campus-glow)" />
          <rect width="1200" height="780" fill="url(#campus-grid)" />

          {/* Architectural Compound Boundary Wall (Steps in at Lower-Right so Central Jail sits OUTSIDE College) */}
          <path
            d="M 48 18 L 1152 18 Q 1172 18 1172 38 L 1172 588 Q 1172 602 1154 602 L 902 602 Q 890 602 890 614 L 890 712 L 30 712 L 30 38 Q 30 18 48 18 Z"
            fill="#032b22"
            fillOpacity="0.68"
            stroke="#34d399"
            strokeOpacity="0.6"
            strokeWidth="3"
          />
          <path
            d="M 52 25 L 1148 25 Q 1164 25 1164 41 L 1164 584 Q 1164 594 1150 594 L 896 594 Q 882 594 882 608 L 882 704 L 38 704 L 38 41 Q 38 25 52 25 Z"
            fill="none"
            stroke="#fbbf24"
            strokeOpacity="0.2"
            strokeWidth="1.1"
            strokeDasharray="8 6"
          />

          {/* Vertical Sightline Guide showing Auditorium in direct line below Zoology & Botany */}
          <line
            x1="992"
            y1="118"
            x2="992"
            y2="496"
            stroke="#fb7185"
            strokeOpacity="0.28"
            strokeWidth="2.2"
            strokeDasharray="6 5"
          />

          {/* ================= NORTH-WEST SECTOR ================= */}

          {/* 22. Tennis Court & Volleyball Playing Ground (Adjacent Beside Hostel & Physical Education) */}
          <rect x="44" y="38" width="172" height="96" rx="12" fill="#713f12" fillOpacity="0.68" stroke="#facc15" strokeWidth="2.4" />
          <rect x="54" y="48" width="68" height="44" rx="3" fill="none" stroke="#fde047" strokeOpacity="0.65" strokeWidth="1.4" />
          <line x1="88" y1="48" x2="88" y2="92" stroke="#fde047" strokeOpacity="0.8" strokeWidth="1.2" strokeDasharray="3 2" />
          <rect x="136" y="48" width="70" height="44" rx="3" fill="none" stroke="#fef08a" strokeOpacity="0.65" strokeWidth="1.4" />
          <line x1="171" y1="48" x2="171" y2="92" stroke="#fef08a" strokeOpacity="0.8" strokeWidth="1.2" strokeDasharray="3 2" />
          <text x="130" y="122" textAnchor="middle" fontSize="11.5" fontWeight="900">
            <tspan fill="#fef08a">TENNIS</tspan>
            <tspan fill="#ffffff"> &amp; </tspan>
            <tspan fill="#fdba74">VOLLEYBALL</tspan>
          </text>

          {/* 19. BIG COLLEGE HOSTEL (Large Multi-Wing Residential Complex Beside Unified Corridor) */}
          <rect x="44" y="148" width="172" height="178" rx="14" fill="#7c2d12" fillOpacity="0.78" stroke="#fb923c" strokeWidth="2.8" />
          <rect x="54" y="170" width="44" height="106" rx="6" fill="#9a3412" fillOpacity="0.78" stroke="#fdba74" strokeOpacity="0.6" strokeWidth="1.4" />
          <rect x="162" y="170" width="44" height="106" rx="6" fill="#9a3412" fillOpacity="0.78" stroke="#fdba74" strokeOpacity="0.6" strokeWidth="1.4" />
          <rect x="106" y="182" width="48" height="74" rx="7" fill="#431407" fillOpacity="0.68" stroke="#fed7aa" strokeOpacity="0.55" strokeWidth="1.3" />
          {/* Sunlit Dormitory Windows */}
          <rect x="62" y="182" width="11" height="10" rx="2" fill="#fde68a" fillOpacity="0.82" />
          <rect x="78" y="182" width="11" height="10" rx="2" fill="#fde68a" fillOpacity="0.82" />
          <rect x="62" y="202" width="11" height="10" rx="2" fill="#fde68a" fillOpacity="0.82" />
          <rect x="78" y="202" width="11" height="10" rx="2" fill="#fde68a" fillOpacity="0.82" />
          <rect x="170" y="182" width="11" height="10" rx="2" fill="#fde68a" fillOpacity="0.82" />
          <rect x="186" y="182" width="11" height="10" rx="2" fill="#fde68a" fillOpacity="0.82" />
          <rect x="170" y="202" width="11" height="10" rx="2" fill="#fde68a" fillOpacity="0.82" />
          <rect x="186" y="202" width="11" height="10" rx="2" fill="#fde68a" fillOpacity="0.82" />
          <SolarPanelArray x={162} y={153} w={46} h={12} />
          <text x="130" y="298" textAnchor="middle" fill="#fed7aa" fontSize="13.5" fontWeight="900" letterSpacing="0.5">
            BIG COLLEGE HOSTEL
          </text>
          <text x="130" y="317" textAnchor="middle" fill="#fde68a" fontSize="9.8" fontWeight="800">
            (BESIDE UNIFIED CORRIDOR)
          </text>

          {/* UNIFIED SAME BUILDING BESIDE HOSTEL (Ground Floor: ONE CORRIDOR | 1st Floor: Commerce & Library) */}
          <rect x="228" y="34" width="282" height="292" rx="14" fill="#0f172a" fillOpacity="0.52" stroke="#cbd5e1" strokeOpacity="0.75" strokeWidth="2.6" />
          <rect x="242" y="26" width="254" height="16" rx="5" fill="#1e1b4b" stroke="#c084fc" strokeWidth="1.4" />
          <text x="369" y="37.5" textAnchor="middle" fill="#f5d0fe" fontSize="8.8" fontWeight="900" letterSpacing="0.4">
            SAME BUILDING · 1ST FLOOR COMMERCE · 1 CORRIDOR
          </text>

          {/* 26. Commerce Dept. & Commerce Library (1st Floor of SAME Building) */}
          <rect x="236" y="46" width="266" height="70" rx="10" fill="#581c87" fillOpacity="0.76" stroke="#a78bfa" strokeWidth="2.4" />
          <SolarPanelArray x={456} y={51} w={40} h={11} />
          <text x="348" y="65" textAnchor="middle" fontSize="11.8" fontWeight="900">
            <tspan fill="#f5d0fe">COMMERCE DEPT.</tspan>
            <tspan fill="#ffffff"> &amp; </tspan>
            <tspan fill="#fde68a">COMMERCE LIBRARY</tspan>
          </text>
          <text x="369" y="108" textAnchor="middle" fill="#e9d5ff" fontSize="9.6" fontWeight="900">
            (1ST FLOOR ABOVE CORRIDOR · SAME BUILDING)
          </text>

          {/* 23, 24, 25. SEPARATE ROOMS: Pakistan Studies | Urdu | Physical Education */}
          <rect x="236" y="124" width="86" height="94" rx="9" fill="#7f1d1d" fillOpacity="0.74" stroke="#f87171" strokeWidth="2.2" />
          <SolarPanelArray x={278} y={128} w={38} h={10} />
          <text x="279" y="148" textAnchor="middle" fill="#fca5a5" fontSize="10.2" fontWeight="900">
            PAK
          </text>
          <text x="279" y="160" textAnchor="middle" fill="#fca5a5" fontSize="10.2" fontWeight="900">
            STUDIES
          </text>

          <rect x="326" y="124" width="88" height="94" rx="9" fill="#78350f" fillOpacity="0.74" stroke="#fbbf24" strokeWidth="2.2" />
          <SolarPanelArray x={370} y={128} w={38} h={10} />
          <text x="370" y="152" textAnchor="middle" fill="#fde68a" fontSize="11.2" fontWeight="900">
            URDU
          </text>

          <rect x="418" y="124" width="84" height="94" rx="9" fill="#14532d" fillOpacity="0.78" stroke="#4ade80" strokeWidth="2.2" />
          <SolarPanelArray x={458} y={128} w={38} h={10} />
          <text x="460" y="148" textAnchor="middle" fill="#86efac" fontSize="10.2" fontWeight="900">
            PHYS.
          </text>
          <text x="460" y="160" textAnchor="middle" fill="#86efac" fontSize="10.2" fontWeight="900">
            ED.
          </text>

          {/* 20. Computer Lab & Computer Office */}
          <rect x="236" y="226" width="122" height="92" rx="10" fill="#075985" fillOpacity="0.78" stroke="#00d4ff" strokeWidth="2.4" />
          <SolarPanelArray x={242} y={230} w={36} h={10} />
          <rect x="292" y="232" width="22" height="14" rx="2.5" fill="#0c4a6e" stroke="#7dd3fc" strokeWidth="1.2" />
          <rect x="322" y="232" width="26" height="14" rx="2.5" fill="#1e293b" stroke="#bae6fd" strokeWidth="1.2" />
          <text x="297" y="297" textAnchor="middle" fill="#8ce9ff" fontSize="10.8" fontWeight="900">
            COMPUTER LAB
          </text>
          <text x="297" y="311" textAnchor="middle" fill="#fde68a" fontSize="9.8" fontWeight="900">
            &amp; OFFICE
          </text>

          {/* 21. BIG Computer Multimedia Room (Extra-Wide Hall) */}
          <rect x="364" y="226" width="138" height="92" rx="10" fill="#581c87" fillOpacity="0.78" stroke="#c084fc" strokeWidth="2.5" />
          <SolarPanelArray x={456} y={230} w={40} h={10} />
          <rect x="374" y="232" width="58" height="18" rx="3" fill="#1e1b4b" stroke="#e9d5ff" strokeWidth="1.3" />
          <polygon points="399,236 399,246 408,241" fill="#f0abfc" />
          <text x="433" y="296" textAnchor="middle" fill="#e9d5ff" fontSize="10.8" fontWeight="900">
            BIG MULTIMEDIA
          </text>
          <text x="433" y="310" textAnchor="middle" fill="#f9a8d4" fontSize="9.8" fontWeight="900">
            ROOM (WIDE HALL)
          </text>

          {/* Indoor Unified Corridor Tag */}
          <rect x="334" y="213" width="70" height="18" rx="5" fill="#021b15" stroke="#fde047" strokeWidth="1.3" />
          <text x="369" y="225" textAnchor="middle" fill="#fef08a" fontSize="8.2" fontWeight="900">
            1 CORRIDOR
          </text>

          {/* ================= NORTH STRAIGHT SECTOR (Ground FIRST, then Separate Sindhi, Economics, Physiology) ================= */}

          {/* 28, 29, 30. SEPARATE DEPARTMENT ROOMS BEYOND GROUND */}
          <rect x="522" y="36" width="76" height="72" rx="9" fill="#083344" fillOpacity="0.92" stroke="#22d3ee" strokeWidth="2.2" />
          <SolarPanelArray x={556} y={40} w={36} h={9.5} />
          <text x="560" y="60" textAnchor="middle" fill="#67e8f9" fontSize="11.2" fontWeight="900">
            SINDHI
          </text>

          <rect x="604" y="36" width="78" height="72" rx="9" fill="#78350f" fillOpacity="0.92" stroke="#fbbf24" strokeWidth="2.2" />
          <SolarPanelArray x={638} y={40} w={38} h={9.5} />
          <text x="643" y="60" textAnchor="middle" fill="#fde68a" fontSize="10.5" fontWeight="900">
            ECONOMICS
          </text>

          <rect x="688" y="36" width="78" height="72" rx="9" fill="#831843" fillOpacity="0.92" stroke="#f472b6" strokeWidth="2.2" />
          <SolarPanelArray x={722} y={40} w={38} h={9.5} />
          <text x="727" y="60" textAnchor="middle" fill="#fbcfe8" fontSize="10.2" fontWeight="900">
            PHYSIOLOGY
          </text>

          {/* 27. North Big Ground & Green Lawn FIRST along Straight Path North */}
          <rect x="522" y="116" width="244" height="108" rx="13" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.6" />
          <ellipse cx="644" cy="172" rx="90" ry="30" fill="#22c55e" fillOpacity="0.24" stroke="#d9f99d" strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="5 3" />
          {/* Gardener in North Big Ground */}
          <g transform="translate(556, 174)">
            <circle cx="0" cy="0" r="11" fill="#052e16" fillOpacity="0.9" stroke="#bef264" strokeWidth="1.4" />
            <ellipse cx="0" cy="-4.2" rx="6.2" ry="2" fill="#fde047" />
            <circle cx="0" cy="-2" r="2.4" fill="#fef3c7" />
            <path d="M-3.8,5 C-3.8,1 3.8,1 3.8,5 Z" fill="#4ade80" />
            <rect x="3.8" y="1" width="4" height="3" rx="0.6" fill="#38bdf8" />
          </g>
          <text x="652" y="138" textAnchor="middle" fill="#dcfce7" fontSize="12.2" fontWeight="900" letterSpacing="0.5">
            NORTH BIG GROUND &amp; LAWN (FIRST)
          </text>

          {/* ================= NORTH-EAST & RIGHT CORRIDORS ================= */}

          {/* 16. Assembly Ground, Flag Hoisting, Garden Lawn, Greenhouse & Prayer Room (Before Zoology) */}
          <rect x="778" y="118" width="144" height="96" rx="11" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.4" />
          <SolarPanelArray x={882} y={122} w={34} h={10} />
          {/* Assembly Dais & Pakistan Flag Pole */}
          <rect x="788" y="176" width="24" height="9" rx="2" fill="#d1fae5" fillOpacity="0.88" />
          <line x1="796" y1="176" x2="796" y2="140" stroke="#fde047" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="796" cy="139" r="2.2" fill="#fde047" />
          <rect x="797" y="141" width="7" height="15" fill="#ffffff" />
          <rect x="804" y="141" width="18" height="15" fill="#15803d" stroke="#bbf7d0" strokeWidth="0.7" />
          <circle cx="813" cy="148.5" r="3.2" fill="#ffffff" />
          <circle cx="814.3" cy="148.2" r="2.6" fill="#15803d" />
          {/* Greenhouse Dome + Prayer Crescent */}
          <path d="M830,180 C830,162 862,162 862,180 Z" fill="#38bdf8" fillOpacity="0.34" stroke="#7dd3fc" strokeWidth="1.4" />
          <circle cx="898" cy="164" r="10.5" fill="#064e3b" stroke="#86efac" strokeWidth="1.4" />
          <path d="M900,158.5 A5,5 0 1,0 900,169.5 A3.8,3.8 0 1,1 900,158.5 Z" fill="#fde047" />
          <text x="832" y="135" textAnchor="middle" fill="#86efac" fontSize="10.2" fontWeight="900">
            ASSEMBLY &amp; FLAG
          </text>
          <text x="850" y="205" textAnchor="middle" fontSize="8.8" fontWeight="900">
            <tspan fill="#bef264">LAWN</tspan>
            <tspan fill="#ffffff"> · </tspan>
            <tspan fill="#7dd3fc">GREENHOUSE</tspan>
            <tspan fill="#ffffff"> · </tspan>
            <tspan fill="#fde047">PRAYER</tspan>
          </text>

          {/* 17 & 18. SEPARATE DEPARTMENTS: Zoology & Zoology Lab | Botany & Botany Lab */}
          <rect x="928" y="118" width="112" height="96" rx="11" fill="#065f46" fillOpacity="0.82" stroke="#10b981" strokeWidth="2.4" />
          <SolarPanelArray x={998} y={122} w={36} h={10} />
          <text x="984" y="144" textAnchor="middle" fill="#a7f3d0" fontSize="11.2" fontWeight="900">
            ZOOLOGY
          </text>
          <text x="984" y="205" textAnchor="middle" fill="#6ee7b7" fontSize="9.4" fontWeight="900">
            &amp; ZOO LAB
          </text>

          <rect x="1048" y="118" width="112" height="96" rx="11" fill="#1a2e05" fillOpacity="0.82" stroke="#a3e635" strokeWidth="2.4" />
          <SolarPanelArray x={1118} y={122} w={36} h={10} />
          <text x="1104" y="144" textAnchor="middle" fill="#d9f99d" fontSize="11.2" fontWeight="900">
            BOTANY
          </text>
          <text x="1104" y="205" textAnchor="middle" fill="#bef264" fontSize="9.4" fontWeight="900">
            &amp; BOTANY LAB
          </text>

          {/* 13, 14, 15. SEPARATE DEPARTMENTS: Statistics | Mathematics | Physics, Lab & Optics Dark Room */}
          <rect x="778" y="228" width="110" height="82" rx="10" fill="#701a75" fillOpacity="0.72" stroke="#e879f9" strokeWidth="2.3" />
          <SolarPanelArray x={846} y={232} w={36} h={10} />
          <text x="833" y="252" textAnchor="middle" fill="#f0abfc" fontSize="10.8" fontWeight="900">
            STATISTICS
          </text>
          <text x="833" y="301" textAnchor="middle" fill="#f5d0fe" fontSize="8.8" fontWeight="800">
            (First Quantitative)
          </text>

          <rect x="896" y="228" width="110" height="82" rx="10" fill="#115e59" fillOpacity="0.76" stroke="#2dd4bf" strokeWidth="2.3" />
          <SolarPanelArray x={964} y={232} w={36} h={10} />
          <text x="951" y="252" textAnchor="middle" fill="#99f6e4" fontSize="10.6" fontWeight="900">
            MATHEMATICS
          </text>

          <rect x="1014" y="228" width="146" height="82" rx="10" fill="#1e3a8a" fillOpacity="0.78" stroke="#60a5fa" strokeWidth="2.3" />
          <SolarPanelArray x={1020} y={232} w={34} h={10} />
          <rect x="1116" y="236" width="36" height="24" rx="4" fill="#020617" stroke="#93c5fd" strokeWidth="1.3" />
          <text x="1087" y="252" textAnchor="middle" fill="#93c5fd" fontSize="11.2" fontWeight="900">
            PHYSICS &amp; LAB
          </text>
          <text x="1087" y="301" textAnchor="middle" fill="#fde047" fontSize="9.8" fontWeight="900">
            + OPTICS DARK ROOM
          </text>

          {/* ================= PRINCIPAL'S OFFICE (BIG & BRIGHT GOLDEN) + CHEMISTRY (LEFT) + 1ST FLOOR ROW ================= */}

          {/* 07. Chemistry & Chemistry Labs (In Line Left of Principal's Office — Prominent Wide Lab Block) */}
          <rect x="166" y="338" width="298" height="86" rx="12" fill="#164e63" fillOpacity="0.78" stroke="#22d3ee" strokeWidth="2.5" />
          <SolarPanelArray x={418} y={343} w={40} h={11} />
          <text x="315" y="362" textAnchor="middle" fill="#67e8f9" fontSize="12.8" fontWeight="900">
            CHEMISTRY &amp; CHEMISTRY LABS
          </text>
          <text x="315" y="414" textAnchor="middle" fill="#a5f3fc" fontSize="10.2" fontWeight="800">
            (Directly In Line Left of Principal&rsquo;s Office)
          </text>

          {/* 09. PRINCIPAL'S OFFICE (EXTRA BIG & ROYAL BRIGHT GOLDEN LANDMARK) */}
          <rect
            x="634"
            y="316"
            width="192"
            height="108"
            rx="15"
            fill="url(#gold-principal-grad)"
            fillOpacity="0.92"
            stroke="#fef08a"
            strokeWidth="3.8"
          />
          <rect
            x="640"
            y="322"
            width="180"
            height="96"
            rx="11"
            fill="#451a03"
            fillOpacity="0.45"
            stroke="#fde047"
            strokeWidth="1.4"
          />
          <SolarPanelArray x={644} y={325} w={38} h={11} />
          {/* Golden Crown / Star Accent */}
          <polygon
            points="798,325 802,334 812,334 804,340 807,349 798,344 789,349 792,340 784,334 794,334"
            fill="#fef08a"
            stroke="#92400e"
            strokeWidth="1"
          />
          <text x="730" y="352" textAnchor="middle" fill="#fef9c3" fontSize="14.5" fontWeight="900" letterSpacing="0.6">
            PRINCIPAL&rsquo;S OFFICE
          </text>
          <text x="730" y="410" textAnchor="middle" fill="#fef08a" fontSize="10.4" fontWeight="900">
            EXECUTIVE SUITE · BIG GOLDEN HALL
          </text>

          {/* 10. General Staff Room (1st Floor Right of Principal's Office) */}
          <rect x="834" y="324" width="106" height="84" rx="10" fill="#1e1b4b" fillOpacity="0.8" stroke="#818cf8" strokeWidth="2.3" />
          <SolarPanelArray x={896} y={328} w={36} h={10} />
          <text x="887" y="348" textAnchor="middle" fill="#a5b4fc" fontSize="10.5" fontWeight="900">
            STAFF ROOM
          </text>
          <text x="887" y="399" textAnchor="middle" fill="#c7d2fe" fontSize="9" fontWeight="800">
            (1st Fl. Right)
          </text>

          {/* 11. Islamiat & Islamic Culture (1st Floor Separate Dept) */}
          <rect x="948" y="324" width="108" height="84" rx="10" fill="#065f46" fillOpacity="0.76" stroke="#34d399" strokeWidth="2.3" />
          <SolarPanelArray x={1012} y={328} w={36} h={10} />
          <text x="1002" y="346" textAnchor="middle" fill="#6ee7b7" fontSize="10.5" fontWeight="900">
            ISLAMIAT &amp;
          </text>
          <text x="1002" y="358" textAnchor="middle" fill="#a7f3d0" fontSize="9.4" fontWeight="900">
            CULTURE (1st Fl)
          </text>

          {/* 12. Department of English (1st Floor Separate Dept) */}
          <rect x="1064" y="324" width="96" height="84" rx="10" fill="#831843" fillOpacity="0.76" stroke="#f472b6" strokeWidth="2.3" />
          <SolarPanelArray x={1116} y={328} w={36} h={10} />
          <text x="1112" y="348" textAnchor="middle" fill="#f9a8d4" fontSize="11.2" fontWeight="900">
            ENGLISH
          </text>
          <text x="1112" y="399" textAnchor="middle" fill="#fbcfe8" fontSize="9" fontWeight="800">
            (1st Floor)
          </text>

          {/* ================= AUDITORIUM BEFORE PRINCIPAL IN LINE OF ZOOLOGY & BOTANY + BIG LAWN ================= */}

          {/* 08. AUDITORIUM HALL (Right Before Principal's Office, Aligned Vertically Under Zoology & Botany) */}
          <rect x="842" y="422" width="218" height="78" rx="12" fill="#881337" fillOpacity="0.78" stroke="#fb7185" strokeWidth="2.6" />
          <SolarPanelArray x={1014} y={427} w={38} h={10} />
          <text x="932" y="446" textAnchor="middle" fill="#fda4af" fontSize="13.2" fontWeight="900">
            AUDITORIUM HALL
          </text>
          <text x="951" y="490" textAnchor="middle" fill="#fecdd3" fontSize="9.6" fontWeight="900">
            (BEFORE PRINCIPAL · LINE OF ZOOLOGY &amp; BOTANY)
          </text>

          {/* Big Walking Garden Lawn & Gardeners (Before Principal's Office) */}
          <rect x="634" y="432" width="196" height="74" rx="11" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.4" />
          <circle cx="662" cy="456" r="11" fill="#22c55e" fillOpacity="0.7" stroke="#bbf7d0" strokeWidth="1.4" />
          <circle cx="734" cy="450" r="10" fill="#22c55e" fillOpacity="0.7" stroke="#bbf7d0" strokeWidth="1.4" />
          <circle cx="802" cy="456" r="11" fill="#22c55e" fillOpacity="0.7" stroke="#bbf7d0" strokeWidth="1.4" />

          {/* Gardener 1 in Big Lawn */}
          <g transform="translate(692, 466)">
            <circle cx="0" cy="0" r="10.5" fill="#052e16" stroke="#a3e635" strokeWidth="1.4" />
            <ellipse cx="0" cy="-4" rx="6" ry="1.8" fill="#fde047" />
            <circle cx="0" cy="-1.8" r="2.4" fill="#fef3c7" />
            <path d="M-3.8,4.8 C-3.8,1 3.8,1 3.8,4.8 Z" fill="#4ade80" />
            <rect x="3.8" y="0.9" width="3.8" height="2.8" rx="0.6" fill="#38bdf8" />
          </g>
          {/* Gardener 2 in Big Lawn */}
          <g transform="translate(770, 466)">
            <circle cx="0" cy="0" r="10.5" fill="#052e16" stroke="#a3e635" strokeWidth="1.4" />
            <ellipse cx="0" cy="-4" rx="6" ry="1.8" fill="#fde047" />
            <circle cx="0" cy="-1.8" r="2.4" fill="#fef3c7" />
            <path d="M-3.8,4.8 C-3.8,1 3.8,1 3.8,4.8 Z" fill="#22c55e" />
            <circle cx="-5.5" cy="2.2" r="1.8" fill="#f472b6" />
          </g>
          <text x="732" y="497" textAnchor="middle" fill="#dcfce7" fontSize="10.6" fontWeight="900">
            BIG LAWN · GARDENERS (RIGHT)
          </text>

          {/* Lush Green West Garden Lawn & Shaded Trees */}
          <rect x="66" y="454" width="290" height="108" rx="14" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.4" />
          <circle cx="122" cy="500" r="18" fill="#22c55e" fillOpacity="0.68" stroke="#bbf7d0" strokeOpacity="0.85" strokeWidth="1.6" />
          <circle cx="212" cy="510" r="16" fill="#22c55e" fillOpacity="0.68" stroke="#bbf7d0" strokeOpacity="0.85" strokeWidth="1.6" />
          <circle cx="300" cy="498" r="18" fill="#22c55e" fillOpacity="0.68" stroke="#bbf7d0" strokeOpacity="0.85" strokeWidth="1.6" />
          <text x="211" y="546" textAnchor="middle" fill="#dcfce7" fontSize="11.6" fontWeight="900">
            WEST GARDEN LAWN &amp; SHADED TREES
          </text>

          {/* 04. Clerk Office (On Straight Path Very First on Right) */}
          <rect x="662" y="518" width="184" height="68" rx="11" fill="#115e59" fillOpacity="0.78" stroke="#2dd4bf" strokeWidth="2.4" />
          <SolarPanelArray x={800} y={523} w={38} h={10} />
          <text x="738" y="540" textAnchor="middle" fill="#5eead4" fontSize="12.2" fontWeight="900">
            CLERK OFFICE
          </text>
          <text x="754" y="576" textAnchor="middle" fill="#99f6e4" fontSize="9.8" fontWeight="800">
            (Very First on Right · Straight)
          </text>

          {/* 05. Central Library (After Walking Further Straight on Right) */}
          <rect x="902" y="514" width="244" height="74" rx="11" fill="#4c1d95" fillOpacity="0.76" stroke="#8b5cf6" strokeWidth="2.5" />
          <SolarPanelArray x={1098} y={519} w={40} h={11} />
          <text x="1008" y="537" textAnchor="middle" fill="#c4b5fd" fontSize="12.2" fontWeight="900">
            CENTRAL LIBRARY (RIGHT)
          </text>
          <text x="1024" y="578" textAnchor="middle" fill="#ddd6fe" fontSize="9.8" fontWeight="800">
            (Walk Straight Further &rarr; Right)
          </text>

          {/* 02. Waiting Room (Entrance Left) */}
          <rect x="164" y="612" width="234" height="72" rx="11" fill="#0c4a6e" fillOpacity="0.78" stroke="#0ea5e9" strokeWidth="2.4" />
          <SolarPanelArray x={172} y={617} w={38} h={10} />
          <text x="292" y="635" textAnchor="middle" fill="#7dd3fc" fontSize="12.2" fontWeight="900">
            WAITING ROOM (LEFT)
          </text>
          <text x="281" y="674" textAnchor="middle" fill="#bae6fd" fontSize="9.8" fontWeight="800">
            (First on Left Upon Entering)
          </text>

          {/* 03. College Canteen (Entrance Right Inside College Wall) */}
          <rect x="668" y="612" width="196" height="72" rx="11" fill="#9a3412" fillOpacity="0.78" stroke="#f97316" strokeWidth="2.4" />
          <SolarPanelArray x={818} y={617} w={38} h={10} />
          <text x="748" y="635" textAnchor="middle" fill="#fdba74" fontSize="12.2" fontWeight="900">
            CANTEEN (RIGHT)
          </text>
          <text x="766" y="674" textAnchor="middle" fill="#fed7aa" fontSize="9.8" fontWeight="800">
            (On Right Inside Main Gate)
          </text>

          {/* OUTSIDE College Boundary Wall (Entrance Far Right): Central Jail & Signal Jammers */}
          <rect x="904" y="614" width="280" height="86" rx="12" fill="#0f172a" fillOpacity="0.95" stroke="#ef4444" strokeWidth="2.6" strokeDasharray="7 4" />
          {/* Watchtower & Security Grille Bars */}
          <rect x="916" y="632" width="28" height="38" rx="4" fill="#020617" stroke="#f87171" strokeWidth="1.4" />
          <line x1="923" y1="632" x2="923" y2="670" stroke="#fca5a5" strokeOpacity="0.82" strokeWidth="1.4" />
          <line x1="930" y1="632" x2="930" y2="670" stroke="#fca5a5" strokeOpacity="0.82" strokeWidth="1.4" />
          <line x1="937" y1="632" x2="937" y2="670" stroke="#fca5a5" strokeOpacity="0.82" strokeWidth="1.4" />
          {/* Signal Jammer Towers & RF Jammer Waves */}
          <g transform="translate(1136, 650)">
            <path d="M-6,26 L0,-8 L6,26 Z" fill="none" stroke="#fde047" strokeWidth="1.6" />
            <circle cx="0" cy="-10" r="2.6" fill="#ef4444" />
            <path d="M-9,-14 A10,10 0 0,1 9,-14" fill="none" stroke="#38bdf8" strokeWidth="1.4" />
            <path d="M-13,-18 A14,14 0 0,1 13,-18" fill="none" stroke="#f87171" strokeWidth="1.3" strokeDasharray="2 1.5" />
          </g>
          <g transform="translate(1164, 656)">
            <path d="M-5,22 L0,-6 L5,22 Z" fill="none" stroke="#fde047" strokeWidth="1.5" />
            <circle cx="0" cy="-8" r="2.3" fill="#ef4444" />
            <path d="M-7,-12 A8,8 0 0,1 7,-12" fill="none" stroke="#38bdf8" strokeWidth="1.3" />
          </g>
          <text x="1036" y="636" textAnchor="middle" fontSize="12" fontWeight="900">
            <tspan fill="#fca5a5">CENTRAL JAIL</tspan>
          </text>
          <text x="1036" y="656" textAnchor="middle" fill="#fde047" fontSize="11.2" fontWeight="900">
            &amp; SIGNAL JAMMERS
          </text>
          <text x="1036" y="684" textAnchor="middle" fill="#7dd3fc" fontSize="9.6" fontWeight="900">
            (OUTSIDE COLLEGE · RIGHT)
          </text>

          {/* ================= PAVED WALKWAYS, GRILL PATHS & GIRLS WALKING TO COMPUTER LAB ================= */}

          {/* Entrance Cross Plaza (Waiting Room Left <-> Gate <-> Canteen Right) */}
          <line x1="280" y1="654" x2="766" y2="654" stroke="#94a3b8" strokeOpacity="0.3" strokeWidth="16" strokeLinecap="round" />
          {/* Entrance Stem up to Twin Grill Start */}
          <line x1="600" y1="710" x2="600" y2="604" stroke="#94a3b8" strokeOpacity="0.36" strokeWidth="22" strokeLinecap="round" />

          {/* Branch to Clerk Office & Central Library on Right */}
          <line x1="600" y1="556" x2="1016" y2="556" stroke="#94a3b8" strokeOpacity="0.3" strokeWidth="14" strokeLinecap="round" />
          {/* Branch up into Auditorium Hall before Principal */}
          <line x1="600" y1="461" x2="931" y2="461" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="13" strokeLinecap="round" />

          {/* CENTRAL TWIN PATHS SEPARATED BY SMALL GRILL (X=582 & X=618, Y=604 -> Y=224) */}
          <line x1="582" y1="604" x2="582" y2="224" stroke="#cbd5e1" strokeOpacity="0.36" strokeWidth="15" strokeLinecap="round" />
          <line x1="618" y1="604" x2="618" y2="224" stroke="#cbd5e1" strokeOpacity="0.36" strokeWidth="15" strokeLinecap="round" />
          <line
            x1="600"
            y1="596"
            x2="600"
            y2="232"
            stroke="#fbbf24"
            strokeWidth="3.6"
            strokeDasharray="7 5"
            strokeOpacity="0.96"
          />
          <rect
            x="546"
            y="530"
            width="108"
            height="22"
            rx="5"
            fill="#021b15"
            fillOpacity="0.96"
            stroke="#a3e635"
            strokeOpacity="0.9"
            strokeWidth="1.4"
          />
          <text x="600" y="545" textAnchor="middle" fill="#ecfccb" fontSize="10.2" fontWeight="900" letterSpacing="0.5">
            SMALL GRILL
          </text>

          {/* Principal's Office Horizontal Line (Chemistry Left <-> Golden Principal's Office & 1st Floor Right) */}
          <line x1="320" y1="376" x2="1110" y2="376" stroke="#94a3b8" strokeOpacity="0.3" strokeWidth="14" strokeLinecap="round" />

          {/* Upper-Right Academic & Life-Science Connections */}
          <line x1="730" y1="316" x2="730" y2="269" stroke="#94a3b8" strokeOpacity="0.26" strokeWidth="12" strokeLinecap="round" />
          <line x1="730" y1="269" x2="1087" y2="269" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="12" strokeLinecap="round" />
          <line x1="600" y1="224" x2="850" y2="166" stroke="#94a3b8" strokeOpacity="0.26" strokeWidth="12" strokeLinecap="round" />
          <line x1="850" y1="166" x2="1104" y2="166" stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="12" strokeLinecap="round" />

          {/* LEFT PATH BETWEEN TWO GRILLS -> GIRLS WALKING ON PATH OF COMPUTER LAB -> MULTIMEDIA, COMPUTER LAB & HOSTEL */}
          <line x1="582" y1="264" x2="502" y2="264" stroke="#cbd5e1" strokeOpacity="0.38" strokeWidth="12" strokeLinecap="round" />
          <line x1="582" y1="286" x2="502" y2="286" stroke="#cbd5e1" strokeOpacity="0.38" strokeWidth="12" strokeLinecap="round" />
          <line x1="578" y1="255" x2="504" y2="255" stroke="#fb923c" strokeWidth="2.5" strokeDasharray="5 3" strokeOpacity="0.92" />
          <line x1="578" y1="295" x2="504" y2="295" stroke="#fb923c" strokeWidth="2.5" strokeDasharray="5 3" strokeOpacity="0.92" />
          <line x1="502" y1="274" x2="216" y2="274" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="12" strokeLinecap="round" />

          {/* 2-Grill Path Label */}
          <rect x="507" y="298" width="84" height="19" rx="5" fill="#021b15" fillOpacity="0.96" stroke="#fb923c" strokeOpacity="0.9" strokeWidth="1.3" />
          <text x="549" y="311" textAnchor="middle" fill="#fed7aa" fontSize="8.8" fontWeight="900">
            2-GRILL LEFT
          </text>

          {/* GIRLS CORNER WALKING ON PATH OF COMPUTER LAB */}
          <WalkingCollegeGirl x={562} y={272} scale={0.96} dupattaColor="#10b981" bookColor="#facc15" />
          <WalkingCollegeGirl x={534} y={276} scale={0.96} dupattaColor="#06b6d4" bookColor="#fb923c" />
          <WalkingCollegeGirl x={508} y={272} scale={0.92} dupattaColor="#22c55e" bookColor="#f472b6" />
          <rect x="444" y="319" width="174" height="18" rx="5" fill="#022c22" fillOpacity="0.96" stroke="#6ee7b7" strokeWidth="1.2" />
          <text x="531" y="331.5" textAnchor="middle" fill="#a7f3d0" fontSize="8.8" fontWeight="900">
            GIRLS WALKING · COMPUTER LAB PATH
          </text>

          {/* Upper-Left Unified Corridor Spine */}
          <line x1="369" y1="274" x2="369" y2="81" stroke="#94a3b8" strokeOpacity="0.3" strokeWidth="12" strokeLinecap="round" />
          <line x1="236" y1="172" x2="130" y2="86" stroke="#94a3b8" strokeOpacity="0.26" strokeWidth="11" strokeLinecap="round" />

          {/* Straight North Spine -> North Big Ground FIRST -> Sindhi, Economics, Physiology */}
          <line x1="600" y1="224" x2="643" y2="72" stroke="#94a3b8" strokeOpacity="0.34" strokeWidth="16" strokeLinecap="round" />

          {/* ================= ROAD, MAIN GATE & SECURITY POST ================= */}

          <rect x="0" y="715" width="1200" height="65" fill="#0f172a" fillOpacity="0.96" />
          <line x1="24" y1="748" x2="1176" y2="748" stroke="#eab308" strokeOpacity="0.38" strokeWidth="2.4" strokeDasharray="18 15" />
          <text x="210" y="753" textAnchor="middle" fill="#cbd5e1" fillOpacity="0.9" fontSize="12" fontWeight="700" letterSpacing="1.1">
            PATHAN COLONY ROAD · HIRABAD
          </text>
          <text x="990" y="753" textAnchor="middle" fill="#cbd5e1" fillOpacity="0.9" fontSize="12" fontWeight="700" letterSpacing="1.1">
            GOVT. GIRLS ZUBAIDA COLLEGE
          </text>

          {/* Gate Entrance Opening & Security Guard Post */}
          <rect x="535" y="694" width="130" height="28" fill="#032b22" />
          <path d="M535 710 L535 684 M665 710 L665 684" stroke="#facc15" strokeWidth="4" />

          {/* Security Guard Cabin (Left of Gate) */}
          <rect x="456" y="674" width="72" height="29" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.8" />
          <text x="492" y="692" textAnchor="middle" fill="#e0f2fe" fontSize="9.4" fontWeight="900" letterSpacing="0.5">
            SECURITY
          </text>

          {/* Left Gate Security Guard */}
          <g transform="translate(553, 690)">
            <circle cx="0" cy="0" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.6" />
            <rect x="-4.8" y="-6.8" width="9.6" height="2.6" rx="1" fill="#38bdf8" />
            <circle cx="0" cy="-2.2" r="2.7" fill="#fef3c7" />
            <path d="M-4.6,5.8 C-4.6,1.2 4.6,1.2 4.6,5.8 Z" fill="#1d4ed8" />
            <path d="M4.6,0.5 L7.5,1.5 L7,4.5 L5.8,5.6 L4.8,4.5 Z" fill="#facc15" />
          </g>

          {/* Right Gate Security Guard */}
          <g transform="translate(647, 690)">
            <circle cx="0" cy="0" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.6" />
            <rect x="-4.8" y="-6.8" width="9.6" height="2.6" rx="1" fill="#38bdf8" />
            <circle cx="0" cy="-2.2" r="2.7" fill="#fef3c7" />
            <path d="M-4.6,5.8 C-4.6,1.2 4.6,1.2 4.6,5.8 Z" fill="#1d4ed8" />
            <path d="M-7.5,1.5 L-4.6,0.5 L-4.8,4.5 L-5.8,5.6 L-7,4.5 Z" fill="#facc15" />
          </g>
          <text x="647" y="670" textAnchor="middle" fill="#bae6fd" fontSize="8.8" fontWeight="800" letterSpacing="0.5">
            GATE GUARD
          </text>

          {/* ================= WALKING ROUTE & TRAIL OVERLAY ================= */}

          {/* Upcoming Planned Route */}
          {activeRoute.length >= 2 && (
            <polyline
              points={polylinePoints}
              fill="none"
              stroke="#facc15"
              strokeWidth="4.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="11 8"
              markerEnd="url(#route-arrow)"
              opacity="0.92"
            />
          )}

          {/* Solid Glowing Walked Trail */}
          {walkedTrail.walkedPoints.length >= 2 && (
            <polyline
              points={walkedPolylinePoints}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="6.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.95"
            />
          )}

          {/* Breadcrumb Footstep Dots Behind Visitor */}
          {walkedTrail.footprints.map((fp, i) => (
            <circle
              key={i}
              cx={fp.x * 12}
              cy={fp.y * 7.8}
              r="3.6"
              fill="#e0f2fe"
              opacity="0.9"
            />
          ))}
        </svg>

        {/* Compass Rose (Top Right Overlay) */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-[#021914]/92 backdrop-blur-sm border border-emerald-700/80 rounded-xl px-3.5 py-2 text-xs text-emerald-100 pointer-events-none shadow-lg">
          <Compass className="w-4 h-4 text-amber-300" />
          <div className="leading-tight">
            <span className="font-bold text-amber-300 block">Straight Ahead ↑</span>
            <span className="text-[11px] text-stone-300">← Left · Right →</span>
          </div>
        </div>

        {/* Gate Entry Callout (Bottom Center on Road) */}
        <div
          style={{ left: '50%', top: '96.5%' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <span className="px-3 py-1 rounded bg-emerald-500 text-white text-xs font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap border border-emerald-200">
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
                className={`relative w-11 h-11 rounded-full bg-sky-400 text-slate-950 border-2 border-white shadow-2xl flex items-center justify-center ${
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
              <span className="mt-1 px-2.5 py-0.5 rounded bg-sky-400 text-slate-950 font-extrabold text-[11px] whitespace-nowrap shadow-lg border border-white">
                {walker.isMoving ? 'Visitor Walking' : 'Visitor Here'}
              </span>
            </div>
          </div>
        )}

        {/* 30 Distinct Multi-Colored Map Stop Pins with ALWAYS-VISIBLE Large Labels for Visitors */}
        {stops.map((stop, idx) => {
          const isSelected = idx === selectedIndex;
          const isPrincipal = stop.id === 'principal-office';
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
                isSelected ? 'z-30 scale-110' : 'z-20 hover:z-30 hover:scale-105'
              } ${mapMode !== 'browse' ? 'opacity-65 pointer-events-none' : 'cursor-pointer'}`}
              title={`${stop.stopNumber}. ${stop.name} (${stop.gateDirections?.turn || ''})`}
              aria-label={`Select map stop ${stop.stopNumber}: ${stop.name}`}
            >
              {isSelected && (
                <span
                  className={`absolute inset-0 -m-2.5 rounded-full ${theme.ringGlow} animate-ping pointer-events-none`}
                />
              )}

              <span
                className={`relative rounded-full flex items-center justify-center font-mono font-extrabold border-2 shadow-xl transition-all ${
                  isPrincipal ? 'w-9 h-9 text-xs ring-2 ring-amber-200/80' : 'w-7 h-7 sm:w-8 sm:h-8 text-[11px]'
                } ${theme.pinBg} ${theme.pinText} ${
                  isSelected
                    ? 'border-white ring-4 ring-white/50 shadow-2xl'
                    : `${theme.pinBorder} opacity-95 group-hover:opacity-100`
                }`}
              >
                {stop.stopNumber}
              </span>

              <span
                className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-0.5 rounded-md bg-[#021611]/92 border whitespace-nowrap shadow-lg pointer-events-none transition-all ${
                  theme.textClass
                } ${
                  isPrincipal
                    ? 'text-xs sm:text-sm font-black border-amber-300 bg-[#451a03]/95 ring-1 ring-amber-300/60'
                    : isSelected
                      ? `text-xs sm:text-sm font-black ${theme.activeBorder} ring-1 ring-white/40`
                      : 'text-[10.5px] sm:text-xs font-extrabold border-emerald-800/90 group-hover:border-white/60'
                }`}
              >
                {stop.shortName || stop.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Map Legend & Route Caption Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-bold text-stone-200 px-1 pt-1">
        <div className="flex flex-wrap items-center gap-4">
          <span className={`inline-flex items-center gap-1.5 font-extrabold ${selectedTheme.textClass}`}>
            <span className={`w-3.5 h-3.5 rounded-full ${selectedTheme.pinBg} border border-white inline-block`} />
            <span>Selected: {selectedStop.shortName || selectedStop.name}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sky-300 font-bold">
            <span className="w-3 h-3 rounded-full bg-sky-400 border border-white inline-block" />
            <span>Visitor Walking</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-300 font-bold">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white inline-block" />
            <span>Girls Walking (Computer Lab Path)</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-300 font-bold">
            <span className="w-4 h-3 rounded-sm bg-yellow-400 border border-amber-100 inline-block" />
            <span>Principal&rsquo;s Office (Golden)</span>
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

        <span className="inline-flex items-center gap-1.5 font-extrabold text-amber-300">
          <Navigation className="w-4 h-4" />
          <span>{selectedStop.gateDirections.distanceFromGate}</span>
        </span>
      </div>
    </div>
  );
}
