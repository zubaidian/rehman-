import React, { useRef, useState } from 'react';
import {
  DirectionTurn,
  GATE_COORDS,
  TourFacility
} from '../data/campusTourData';
import { Navigation, Compass, Crosshair, ZoomIn, Maximize2 } from 'lucide-react';

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
  },
  'east-garden': {
    pinBg: 'bg-[#10b981]',
    pinText: 'text-white',
    pinBorder: 'border-[#d1fae5]',
    ringGlow: 'bg-[#34d399]/45',
    hex: '#10b981',
    textClass: 'text-[#a7f3d0]',
    activeBorder: 'border-[#10b981]',
    badgeBg: 'bg-[#10b981] text-white'
  },
  'psychology-dept': {
    pinBg: 'bg-[#a855f7]',
    pinText: 'text-white',
    pinBorder: 'border-[#f3e8ff]',
    ringGlow: 'bg-[#c084fc]/45',
    hex: '#c084fc',
    textClass: 'text-[#e9d5ff]',
    activeBorder: 'border-[#c084fc]',
    badgeBg: 'bg-[#a855f7] text-white'
  },
  'geography-dept': {
    pinBg: 'bg-[#38bdf8]',
    pinText: 'text-slate-950',
    pinBorder: 'border-[#e0f2fe]',
    ringGlow: 'bg-[#7dd3fc]/45',
    hex: '#38bdf8',
    textClass: 'text-[#bae6fd]',
    activeBorder: 'border-[#38bdf8]',
    badgeBg: 'bg-[#38bdf8] text-slate-950'
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
  if (y > 76) {
    return [GATE_COORDS, { x: 50, y: 87.2 }, { x, y }];
  }
  if (y > 58) {
    return [GATE_COORDS, { x: 50, y: 63.2 }, { x, y }];
  }
  return [
    GATE_COORDS,
    { x: 50, y: 63.2 },
    { x: 50, y: Math.max(15, Math.min(54, y)) },
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
    'Walk straight along the twin paths separated by the small grill, passing the walking distance to Clerk Office, Garden, and Central Library on the right.';

  if (dy < 6 && Math.abs(dx) <= 6) {
    turn = 'Entry Gate';
    step2 = 'On your left is the Waiting Room and on your right are the Front Garden & Canteen inside the Golden Boundary Wall.';
  } else if (dx <= -15 && y > 76) {
    turn = 'Turn Left';
    step2 = 'Upon entering the Security Gate, turn left beside the Visitor Waiting Room.';
  } else if (dx <= -15 && y > 38) {
    turn = 'Turn Left';
    step2 = 'Walk straight past the Clerk Office, Front Garden, and Big Lawn to the Chemistry Labs & Principal’s Office line, then turn left.';
  } else if (dx <= -8) {
    turn = 'Bear Left';
    step2 =
      'Take the left path between two grills toward Computer Lab, Big Multimedia Room & Hostel or continue north-west toward the Tennis/Volleyball Ground.';
  } else if (dx >= 15 && y > 76) {
    turn = 'Turn Right';
    step2 = 'Upon entering the Main Gate, turn right past the Front Garden to the College Canteen inside the Golden Boundary.';
  } else if (dx >= 8) {
    turn = dx >= 20 ? 'Turn Right' : 'Bear Right';
    step2 =
      'Walk straight along the twin grill paths past the walking distance, Clerk Office, Garden & Auditorium toward Principal’s Office, then bear right.';
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
      'Enter through the Security-monitored Main College Gate inside the Golden Boundary Wall (Waiting Room left, Front Garden & Canteen right).',
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
    const len = Math.hypot((b.x - a.x) * 12, (b.y - a.y) * 8.4);
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
  const stepDist = 40;
  for (let d = 28; d < target - 14; d += stepDist) {
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
  w = 36,
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
      <circle cx="0" cy="-3.2" r="3" fill="#fef3c7" />
      <path d="M-3.4,-3.5 C-3.4,-6.8 3.4,-6.8 3.4,-3.5 L3.8,0 L-3.8,0 Z" fill="#ffffff" />
      <path d="M-4,5.4 C-3.8,0.6 3.8,0.6 4,5.4 Z" fill={dupattaColor} />
      <path d="M-2.2,1 L2.2,1 L1.5,5.2 L-1.5,5.2 Z" fill="#ffffff" fillOpacity="0.88" />
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
  const [isMagnified, setIsMagnified] = useState(false);

  const selectedStop = stops[selectedIndex] || stops[0];
  const selectedTheme = getStopColorTheme(selectedStop.id, selectedIndex);

  const extractCoords = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const rawX = ((e.clientX - rect.left) / rect.width) * 100;
    const rawY = ((e.clientY - rect.top) / rect.height) * 100;
    const x = Math.round(Math.max(5, Math.min(95, rawX)) * 10) / 10;
    const y = Math.round(Math.max(6, Math.min(94, rawY)) * 10) / 10;
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

  const polylinePoints = activeRoute.map((pt) => `${pt.x * 12},${pt.y * 8.4}`).join(' ');

  const walkedTrail =
    walker && walker.active && typeof walker.progress === 'number'
      ? buildWalkedTrail(activeRoute, walker.progress)
      : { walkedPoints: [], footprints: [] };

  const walkedPolylinePoints = walkedTrail.walkedPoints
    .map((pt) => `${pt.x * 12},${pt.y * 8.4}`)
    .join(' ');

  return (
    <div className="space-y-4">
      {/* Visibility & Zoom Utility Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-amber-200">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400/15 border border-amber-300/60 text-amber-200">
            <span className="w-3 h-3 rounded-xs bg-amber-400 inline-block" />
            <span>Golden College Boundary Wall</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#021914]/90 border border-amber-300/50 text-emerald-100">
            <Compass className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="font-black text-amber-300">Straight Ahead ↑</span>
            <span className="text-stone-300">· ← Left · Right →</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-900/70 border border-emerald-600/70 text-emerald-100">
            <span>After Zoology &amp; Botany → Long Distance → Ground → Garden → Sindhi, Economics, Physiology, Psychology &amp; Geography</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsMagnified((v) => !v)}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold border flex items-center gap-2 transition-all shadow ${
            isMagnified
              ? 'bg-amber-400 text-emerald-950 border-amber-200'
              : 'bg-[#063f35] hover:bg-emerald-800 text-amber-200 border-amber-300/50'
          }`}
        >
          {isMagnified ? <Maximize2 className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          <span>{isMagnified ? 'Fit Whole Map View' : 'Enlarge Map 1.35×'}</span>
        </button>
      </div>

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

      {/* Extra-Large High-Visibility Map Viewport */}
      <div className="w-full overflow-x-auto rounded-2xl border-2 border-amber-300/60 bg-[#021914] shadow-2xl">
        <div
          ref={containerRef}
          onClick={handleMapClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverCoords(null)}
          style={isMagnified ? { minWidth: '1500px', height: '1080px' } : undefined}
          className={`relative w-full ${
            isMagnified ? '' : 'h-[700px] sm:h-[850px] lg:h-[980px]'
          } overflow-hidden bg-[#021914] select-none ${
            mapMode !== 'browse' ? 'cursor-crosshair' : ''
          }`}
        >
          {/* Architectural Cartographic SVG Ground Plan (1200 x 840 matches X*12, Y*8.4) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 840"
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
            <rect width="1200" height="840" fill="url(#campus-glow)" />
            <rect width="1200" height="840" fill="url(#campus-grid)" />

            {/* HIGHLIGHTED GOLDEN COLLEGE BOUNDARY WALL (Steps around Central Jail so Jail sits OUTSIDE at same lower-right spot, keeping Canteen & Central Library inside) */}
            <path
              d="M 46 16 L 1156 16 Q 1176 16 1176 36 L 1176 648 Q 1176 664 1158 664 L 972 664 Q 958 664 958 678 L 958 774 L 28 774 L 28 36 Q 28 16 46 16 Z"
              fill="#032b22"
              fillOpacity="0.68"
              stroke="#fbbf24"
              strokeOpacity="0.32"
              strokeWidth="11"
            />
            <path
              d="M 46 16 L 1156 16 Q 1176 16 1176 36 L 1176 648 Q 1176 664 1158 664 L 972 664 Q 958 664 958 678 L 958 774 L 28 774 L 28 36 Q 28 16 46 16 Z"
              fill="none"
              stroke="#facc15"
              strokeOpacity="0.98"
              strokeWidth="4.6"
            />
            <path
              d="M 52 24 L 1148 24 Q 1166 24 1166 42 L 1166 644 Q 1166 656 1152 656 L 964 656 Q 950 656 950 670 L 950 766 L 36 766 L 36 42 Q 36 24 52 24 Z"
              fill="none"
              stroke="#fef08a"
              strokeOpacity="0.62"
              strokeWidth="1.4"
              strokeDasharray="10 6"
            />

            {/* Golden College Boundary Badges */}
            <rect x="64" y="6" width="224" height="19" rx="5" fill="#451a03" stroke="#facc15" strokeWidth="1.6" />
            <text x="176" y="19" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="900" letterSpacing="0.7">
              GOLDEN COLLEGE BOUNDARY WALL
            </text>

            {/* Clear Boundary Divider Label at Central Jail Step */}
            <rect x="904" y="654" width="168" height="19" rx="5" fill="#451a03" stroke="#facc15" strokeWidth="1.6" />
            <text x="988" y="667" textAnchor="middle" fill="#fef08a" fontSize="9.2" fontWeight="900">
              INSIDE COLLEGE | OUTSIDE JAIL →
            </text>

            {/* Vertical Sightline Guide showing Auditorium Hall on Principal Path */}
            <line
              x1="1013"
              y1="126"
              x2="1013"
              y2="302"
              stroke="#fb7185"
              strokeOpacity="0.28"
              strokeWidth="2.2"
              strokeDasharray="6 5"
            />

            {/* ================= NORTH-WEST SECTOR ================= */}

            {/* TENNIS COURTS (On the Left of Commerce, Pakistan Studies, Urdu & Physical Education) */}
            <rect x="44" y="30" width="170" height="148" rx="13" fill="#713f12" fillOpacity="0.82" stroke="#facc15" strokeWidth="2.8" />
            <rect x="54" y="40" width="70" height="82" rx="4" fill="none" stroke="#fde047" strokeOpacity="0.85" strokeWidth="1.6" />
            <line x1="54" y1="81" x2="124" y2="81" stroke="#fde047" strokeOpacity="0.92" strokeWidth="1.4" strokeDasharray="3 2" />
            <rect x="134" y="40" width="70" height="82" rx="4" fill="none" stroke="#fef08a" strokeOpacity="0.85" strokeWidth="1.6" />
            <line x1="134" y1="81" x2="204" y2="81" stroke="#fef08a" strokeOpacity="0.92" strokeWidth="1.4" strokeDasharray="3 2" />
            <text x="129" y="143" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="900">
              TENNIS COURTS
            </text>
            <text x="129" y="158" textAnchor="middle" fill="#fde68a" fontSize="7.4" fontWeight="900">
              LEFT OF COMMERCE · PAK STUDIES
            </text>
            <text x="129" y="170" textAnchor="middle" fill="#fde68a" fontSize="7.4" fontWeight="900">
              URDU &amp; PHYSICAL EDUCATION
            </text>

            {/* West Sports & Hostel Courtyard Connector (Left of Computer Dept., Linking Tennis Courts to Hostel) */}
            <rect x="44" y="186" width="170" height="98" rx="12" fill="#022c22" fillOpacity="0.62" stroke="#34d399" strokeOpacity="0.52" strokeWidth="1.8" strokeDasharray="5 3" />
            <text x="129" y="220" textAnchor="middle" fill="#a7f3d0" fontSize="8.8" fontWeight="900">
              WEST COURTYARD WALKWAY
            </text>
            <text x="129" y="235" textAnchor="middle" fill="#fef08a" fontSize="7.8" fontWeight="900">
              ↑ TENNIS COURTS · COMPUTER →
            </text>
            <text x="129" y="249" textAnchor="middle" fill="#fdba74" fontSize="7.8" fontWeight="900">
              ↓ TO BIG COLLEGE HOSTEL
            </text>

            {/* UNIFIED SAME BUILDING (Ground Floor: ONE CORRIDOR + COMPUTER DEPARTMENT | 1st Floor: Commerce & Library BY STAIRS) */}
            <rect x="224" y="26" width="288" height="264" rx="14" fill="#0f172a" fillOpacity="0.54" stroke="#cbd5e1" strokeOpacity="0.78" strokeWidth="2.6" />
            <rect x="230" y="18" width="276" height="17" rx="5" fill="#1e1b4b" stroke="#c084fc" strokeWidth="1.4" />
            <text x="368" y="30" textAnchor="middle" fill="#f5d0fe" fontSize="9.1" fontWeight="900" letterSpacing="0.35">
              SAME BUILDING · COMMERCE (BY STAIRS ↑) · 1 CORRIDOR
            </text>

            {/* 26. Commerce Dept. & Commerce Library (1st Floor of SAME Building — Reached By Stairs) */}
            <rect x="232" y="36" width="272" height="48" rx="10" fill="#581c87" fillOpacity="0.78" stroke="#a78bfa" strokeWidth="2.4" />
            <SolarPanelArray x={458} y={39} w={40} h={9.5} />
            <text x="348" y="52" textAnchor="middle" fontSize="12.2" fontWeight="900">
              <tspan fill="#f5d0fe">COMMERCE</tspan>
              <tspan fill="#ffffff"> &amp; </tspan>
              <tspan fill="#fde68a">COMMERCE LIBRARY</tspan>
            </text>
            <text x="368" y="79" textAnchor="middle" fill="#e9d5ff" fontSize="9.2" fontWeight="900">
              (1ST FLOOR · USE STAIRS ↑ ON RIGHT)
            </text>

            {/* 23, 24, 25. SEPARATE ROOMS: Pakistan Studies | Urdu | Physical Education */}
            <rect x="232" y="89" width="86" height="72" rx="9" fill="#7f1d1d" fillOpacity="0.76" stroke="#f87171" strokeWidth="2.2" />
            <SolarPanelArray x={274} y={92} w={38} h={8.5} />
            <text x="275" y="114" textAnchor="middle" fill="#fca5a5" fontSize="10.8" fontWeight="900">
              PAK
            </text>
            <text x="275" y="127" textAnchor="middle" fill="#fca5a5" fontSize="10.8" fontWeight="900">
              STUDIES
            </text>

            <rect x="324" y="89" width="86" height="72" rx="9" fill="#78350f" fillOpacity="0.76" stroke="#fbbf24" strokeWidth="2.2" />
            <SolarPanelArray x={366} y={92} w={38} h={8.5} />
            <text x="367" y="120" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="900">
              URDU
            </text>

            <rect x="416" y="89" width="88" height="72" rx="9" fill="#14532d" fillOpacity="0.82" stroke="#4ade80" strokeWidth="2.2" />
            <SolarPanelArray x={460} y={92} w={38} h={8.5} />
            <text x="460" y="114" textAnchor="middle" fill="#86efac" fontSize="9.8" fontWeight="900">
              PHYSICAL
            </text>
            <text x="460" y="126" textAnchor="middle" fill="#86efac" fontSize="9.4" fontWeight="900">
              EDUCATION
            </text>

            {/* Indoor Unified Corridor Tag */}
            <rect x="322" y="164" width="92" height="14" rx="4" fill="#021b15" stroke="#fde047" strokeWidth="1.3" />
            <text x="368" y="174" textAnchor="middle" fill="#fef08a" fontSize="8.2" fontWeight="900">
              1 CORRIDOR
            </text>

            {/* COMPUTER DEPARTMENT Group Frame Embracing Computer Lab & Big Multimedia Room */}
            <rect
              x="230"
              y="188"
              width="276"
              height="98"
              rx="11"
              fill="#082f49"
              fillOpacity="0.34"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="6 3"
            />
            <rect x="284" y="180" width="168" height="17" rx="5" fill="#082f49" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="368" y="191.5" textAnchor="middle" fill="#bae6fd" fontSize="9.4" fontWeight="900" letterSpacing="0.5">
              COMPUTER DEPARTMENT
            </text>

            {/* 20. Computer Lab & Computer Office */}
            <rect x="235" y="201" width="124" height="80" rx="9" fill="#075985" fillOpacity="0.82" stroke="#00d4ff" strokeWidth="2.3" />
            <SolarPanelArray x={241} y={205} w={36} h={9} />
            <rect x="294" y="207" width="22" height="13" rx="2.5" fill="#0c4a6e" stroke="#7dd3fc" strokeWidth="1.2" />
            <rect x="323" y="207" width="26" height="13" rx="2.5" fill="#1e293b" stroke="#bae6fd" strokeWidth="1.2" />
            <text x="297" y="263" textAnchor="middle" fill="#8ce9ff" fontSize="11.4" fontWeight="900">
              COMPUTER LAB
            </text>
            <text x="297" y="275" textAnchor="middle" fill="#fde68a" fontSize="10.2" fontWeight="900">
              &amp; OFFICE
            </text>

            {/* 21. BIG Computer Multimedia Room (Extra-Wide Hall) */}
            <rect x="365" y="201" width="136" height="80" rx="9" fill="#581c87" fillOpacity="0.82" stroke="#c084fc" strokeWidth="2.4" />
            <SolarPanelArray x={456} y={205} w={38} h={9} />
            <rect x="374" y="207" width="56" height="17" rx="3" fill="#1e1b4b" stroke="#e9d5ff" strokeWidth="1.3" />
            <polygon points="398,211 398,220 407,215.5" fill="#f0abfc" />
            <text x="433" y="263" textAnchor="middle" fill="#e9d5ff" fontSize="11.4" fontWeight="900">
              BIG MULTIMEDIA
            </text>
            <text x="433" y="275" textAnchor="middle" fill="#f9a8d4" fontSize="10.2" fontWeight="900">
              ROOM (WIDE HALL)
            </text>

            {/* COMMERCE STAIRS (↑ 1st Floor Commerce & Commerce Library) */}
            <rect
              x="510"
              y="120"
              width="44"
              height="94"
              rx="7"
              fill="#1e293b"
              fillOpacity="0.96"
              stroke="#facc15"
              strokeWidth="2.2"
            />
            <line x1="516" y1="136" x2="548" y2="136" stroke="#fde047" strokeWidth="2.2" />
            <line x1="516" y1="145" x2="548" y2="145" stroke="#fde047" strokeWidth="2.2" />
            <line x1="516" y1="154" x2="548" y2="154" stroke="#fde047" strokeWidth="2.2" />
            <line x1="516" y1="163" x2="548" y2="163" stroke="#fde047" strokeWidth="2.2" />
            <line x1="516" y1="172" x2="548" y2="172" stroke="#fde047" strokeWidth="2.2" />
            <line x1="532" y1="133" x2="532" y2="178" stroke="#38bdf8" strokeWidth="2" />
            <polygon points="527,137 532,126 537,137" fill="#38bdf8" />
            <text x="532" y="192" textAnchor="middle" fill="#fef08a" fontSize="8.6" fontWeight="900">
              STAIRS
            </text>
            <text x="532" y="204" textAnchor="middle" fill="#f5d0fe" fontSize="6.8" fontWeight="900">
              ↑ COMMERCE
            </text>

            {/* ================= NORTH & EAST SEQUENCE: ASSEMBLY · ZOOLOGY · BOTANY → LONG DISTANCE → GROUND → GARDEN → SINDHI / ECONOMICS / PHYSIOLOGY / PSYCHOLOGY / GEOGRAPHY ================= */}

            {/* 16. Assembly Ground, Flag Hoisting, Garden Lawn, Greenhouse & Prayer Room */}
            <rect x="524" y="26" width="112" height="80" rx="10" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.3" />
            <SolarPanelArray x={600} y={30} w={30} h={8} />
            <rect x="530" y="70" width="20" height="7" rx="2" fill="#d1fae5" fillOpacity="0.88" />
            <line x1="538" y1="70" x2="538" y2="43" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
            <circle cx="538" cy="42" r="1.8" fill="#fde047" />
            <rect x="539" y="44" width="6" height="12" fill="#ffffff" />
            <rect x="545" y="44" width="15" height="12" fill="#15803d" stroke="#bbf7d0" strokeWidth="0.7" />
            <circle cx="552.5" cy="50" r="2.5" fill="#ffffff" />
            <circle cx="553.6" cy="49.7" r="2" fill="#15803d" />
            <path d="M566,74 C566,60 594,60 594,74 Z" fill="#38bdf8" fillOpacity="0.34" stroke="#7dd3fc" strokeWidth="1.3" />
            <circle cx="618" cy="64" r="9" fill="#064e3b" stroke="#86efac" strokeWidth="1.3" />
            <path d="M620,60 A4,4 0 1,0 620,68 A3.1,3.1 0 1,1 620,60 Z" fill="#fde047" />
            <text x="564" y="39" textAnchor="middle" fill="#86efac" fontSize="8.8" fontWeight="900">
              ASSEMBLY &amp; FLAG
            </text>
            <text x="580" y="99" textAnchor="middle" fontSize="7.5" fontWeight="900">
              <tspan fill="#bef264">LAWN</tspan>
              <tspan fill="#ffffff">·</tspan>
              <tspan fill="#7dd3fc">GREENHOUSE</tspan>
              <tspan fill="#ffffff">·</tspan>
              <tspan fill="#fde047">PRAYER</tspan>
            </text>

            {/* 17 & 18. SEPARATE DEPARTMENTS: Zoology & Zoo Lab | Botany & Botany Lab */}
            <rect x="642" y="26" width="88" height="80" rx="10" fill="#065f46" fillOpacity="0.86" stroke="#10b981" strokeWidth="2.3" />
            <SolarPanelArray x={692} y={30} w={32} h={8} />
            <text x="686" y="47" textAnchor="middle" fill="#a7f3d0" fontSize="10.6" fontWeight="900">
              ZOOLOGY
            </text>
            <text x="686" y="99" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="900">
              &amp; ZOO LAB
            </text>

            <rect x="736" y="26" width="88" height="80" rx="10" fill="#1a2e05" fillOpacity="0.86" stroke="#a3e635" strokeWidth="2.3" />
            <SolarPanelArray x={786} y={30} w={32} h={8} />
            <text x="780" y="47" textAnchor="middle" fill="#d9f99d" fontSize="10.6" fontWeight="900">
              BOTANY
            </text>
            <text x="780" y="99" textAnchor="middle" fill="#bef264" fontSize="8.8" fontWeight="900">
              &amp; BOTANY LAB
            </text>

            {/* LONG DISTANCE ZONE AFTER ZOOLOGY & BOTANY LAB (Like Walking Distance Before in South) */}
            <rect
              x="830"
              y="26"
              width="118"
              height="80"
              rx="10"
              fill="#022c22"
              fillOpacity="0.86"
              stroke="#facc15"
              strokeOpacity="0.88"
              strokeWidth="2.2"
              strokeDasharray="6 4"
            />
            <line x1="842" y1="48" x2="928" y2="48" stroke="#fde047" strokeWidth="2.8" strokeDasharray="6 4" />
            <line x1="842" y1="42" x2="842" y2="54" stroke="#fde047" strokeWidth="2" />
            <polygon points="928,42 940,48 928,54" fill="#fde047" />
            <text x="889" y="70" textAnchor="middle" fill="#fef08a" fontSize="10.6" fontWeight="900" letterSpacing="0.5">
              LONG DISTANCE
            </text>
            <text x="889" y="85" textAnchor="middle" fill="#a7f3d0" fontSize="7.7" fontWeight="800">
              After Zoology &amp; Botany
            </text>
            <text x="889" y="97" textAnchor="middle" fill="#fde68a" fontSize="7.7" fontWeight="800">
              → Ground &amp; Garden
            </text>

            {/* 27. GROUND (Right After Long Distance Past Zoology & Botany Lab) */}
            <rect x="954" y="26" width="102" height="80" rx="10" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.4" />
            <ellipse cx="1005" cy="68" rx="38" ry="18" fill="#22c55e" fillOpacity="0.24" stroke="#d9f99d" strokeOpacity="0.65" strokeWidth="1.4" strokeDasharray="5 3" />
            <text x="1005" y="42" textAnchor="middle" fill="#dcfce7" fontSize="11.4" fontWeight="900" letterSpacing="0.5">
              GROUND
            </text>
            <text x="1005" y="99" textAnchor="middle" fill="#ecfccb" fontSize="8.1" fontWeight="900">
              PLAYING LAWN
            </text>

            {/* 28. GARDEN (Directly After Ground) */}
            <rect x="1062" y="26" width="102" height="80" rx="10" fill="url(#lawn-grad)" stroke="#34d399" strokeWidth="2.4" />
            <circle cx="1084" cy="64" r="10" fill="#22c55e" fillOpacity="0.78" stroke="#bbf7d0" strokeWidth="1.3" />
            <circle cx="1142" cy="64" r="10" fill="#22c55e" fillOpacity="0.78" stroke="#bbf7d0" strokeWidth="1.3" />
            <circle cx="1096" cy="80" r="2.2" fill="#f472b6" />
            <circle cx="1130" cy="80" r="2.2" fill="#fde047" />
            <g transform="translate(1113, 76)">
              <circle cx="0" cy="0" r="8" fill="#052e16" stroke="#a3e635" strokeWidth="1.3" />
              <ellipse cx="0" cy="-3" rx="4.5" ry="1.4" fill="#fde047" />
              <circle cx="0" cy="-1.2" r="1.8" fill="#fef3c7" />
              <path d="M-3,3.8 C-3,0.8 3,0.8 3,3.8 Z" fill="#4ade80" />
            </g>
            <text x="1113" y="42" textAnchor="middle" fill="#dcfce7" fontSize="11.4" fontWeight="900" letterSpacing="0.5">
              GARDEN
            </text>
            <text x="1113" y="99" textAnchor="middle" fill="#fef08a" fontSize="8.1" fontWeight="900">
              TREES &amp; FLOWERS
            </text>

            {/* EAST ACADEMIC WING AFTER GARDEN (29. SINDHI → 30. ECONOMICS → 31. PHYSIOLOGY → 32. PSYCHOLOGY → 33. GEOGRAPHY) */}
            <rect x="1070" y="124" width="94" height="92" rx="9" fill="#083344" fillOpacity="0.94" stroke="#22d3ee" strokeWidth="2.2" />
            <SolarPanelArray x={1122} y={128} w={36} h={8} />
            <text x="1117" y="149" textAnchor="middle" fill="#67e8f9" fontSize="10.8" fontWeight="900">
              SINDHI
            </text>
            <text x="1117" y="209" textAnchor="middle" fill="#a5f3fc" fontSize="7.8" fontWeight="800">
              AFTER GARDEN
            </text>

            <rect x="1070" y="226" width="94" height="92" rx="9" fill="#78350f" fillOpacity="0.94" stroke="#fbbf24" strokeWidth="2.2" />
            <SolarPanelArray x={1122} y={230} w={36} h={8} />
            <text x="1117" y="251" textAnchor="middle" fill="#fde68a" fontSize="10.2" fontWeight="900">
              ECONOMICS
            </text>
            <text x="1117" y="311" textAnchor="middle" fill="#fef3c7" fontSize="7.8" fontWeight="800">
              DEPARTMENT
            </text>

            <rect x="1070" y="328" width="94" height="92" rx="9" fill="#831843" fillOpacity="0.94" stroke="#f472b6" strokeWidth="2.2" />
            <SolarPanelArray x={1122} y={332} w={36} h={8} />
            <text x="1117" y="353" textAnchor="middle" fill="#fbcfe8" fontSize="9.8" fontWeight="900">
              PHYSIOLOGY
            </text>
            <text x="1117" y="413" textAnchor="middle" fill="#fce7f3" fontSize="7.8" fontWeight="800">
              DEPARTMENT
            </text>

            <rect x="1070" y="430" width="94" height="92" rx="9" fill="#581c87" fillOpacity="0.94" stroke="#c084fc" strokeWidth="2.2" />
            <SolarPanelArray x={1122} y={434} w={36} h={8} />
            <text x="1117" y="455" textAnchor="middle" fill="#e9d5ff" fontSize="9.6" fontWeight="900">
              PSYCHOLOGY
            </text>
            <text x="1117" y="515" textAnchor="middle" fill="#f3e8ff" fontSize="7.8" fontWeight="800">
              DEPARTMENT
            </text>

            <rect x="1070" y="532" width="94" height="92" rx="9" fill="#0c4a6e" fillOpacity="0.94" stroke="#38bdf8" strokeWidth="2.2" />
            <SolarPanelArray x={1122} y={536} w={36} h={8} />
            <text x="1117" y="557" textAnchor="middle" fill="#bae6fd" fontSize="9.8" fontWeight="900">
              GEOGRAPHY
            </text>
            <text x="1117" y="617" textAnchor="middle" fill="#e0f2fe" fontSize="7.8" fontWeight="800">
              DEPARTMENT
            </text>

            {/* ================= BY STAIRS — 1ST FLOOR BUILDING (6 DEPARTMENTS WITH LARGEST PHYSICS DEPT & STATISTICS BEFORE DARK ROOM) & AUDITORIUM HALL ================= */}

            <rect
              x="626"
              y="124"
              width="336"
              height="170"
              rx="13"
              fill="#0f172a"
              fillOpacity="0.78"
              stroke="#93c5fd"
              strokeWidth="2.5"
            />
            <rect x="630" y="114" width="328" height="17" rx="5" fill="#1e1b4b" stroke="#fde047" strokeWidth="1.5" />
            <text x="794" y="125.5" textAnchor="middle" fill="#fef08a" fontSize="7.6" fontWeight="900" letterSpacing="0.2">
              ↑ BY STAIRS (1ST FL): STAFF · ENGLISH · PHYSICS (LARGEST) · STATS BEFORE DARK ROOM
            </text>

            {/* Upper Tier of 1st Floor By Stairs (Y=133..172): 11. Islamiat | 14. Mathematics */}
            <rect x="632" y="133" width="162" height="39" rx="8" fill="#065f46" fillOpacity="0.86" stroke="#34d399" strokeWidth="2.1" />
            <SolarPanelArray x={758} y={136} w={30} h={7} />
            <text x="695" y="149" textAnchor="middle" fill="#6ee7b7" fontSize="8.8" fontWeight="900">
              ISLAMIAT &amp; CULTURE
            </text>
            <text x="713" y="167" textAnchor="middle" fill="#a7f3d0" fontSize="7.4" fontWeight="800">
              BY STAIRS (1ST FL)
            </text>

            <rect x="800" y="133" width="156" height="39" rx="8" fill="#115e59" fillOpacity="0.86" stroke="#2dd4bf" strokeWidth="2.1" />
            <SolarPanelArray x={920} y={136} w={30} h={7} />
            <text x="862" y="149" textAnchor="middle" fill="#99f6e4" fontSize="9.2" fontWeight="900">
              MATHEMATICS
            </text>
            <text x="878" y="167" textAnchor="middle" fill="#ccfbf1" fontSize="7.4" fontWeight="800">
              BY STAIRS (1ST FL)
            </text>

            {/* Lower Tier of 1st Floor By Stairs (Y=177..290, H=113): 10. General Staff Room | 12. English | 15. LARGEST PHYSICS DEPT | 13. STATISTICS BEFORE DARK ROOM | DARK ROOM */}
            <rect x="632" y="177" width="48" height="113" rx="8" fill="#1e1b4b" fillOpacity="0.9" stroke="#818cf8" strokeWidth="2.1" />
            <SolarPanelArray x={642} y={180} w={28} h={7} />
            <text x="656" y="201" textAnchor="middle" fill="#a5b4fc" fontSize="7.4" fontWeight="900">
              GENERAL
            </text>
            <text x="656" y="211" textAnchor="middle" fill="#c7d2fe" fontSize="7.4" fontWeight="900">
              STAFF
            </text>
            <text x="656" y="221" textAnchor="middle" fill="#c7d2fe" fontSize="7.4" fontWeight="900">
              ROOM
            </text>

            <rect x="684" y="177" width="48" height="113" rx="8" fill="#831843" fillOpacity="0.86" stroke="#f472b6" strokeWidth="2.1" />
            <SolarPanelArray x={694} y={180} w={28} h={7} />
            <text x="708" y="202" textAnchor="middle" fill="#f9a8d4" fontSize="7.8" fontWeight="900">
              ENGLISH
            </text>
            <text x="708" y="212" textAnchor="middle" fill="#fbcfe8" fontSize="7.2" fontWeight="900">
              CLASSES
            </text>

            {/* 15. PHYSICS DEPARTMENT — LARGEST DEPARTMENT ON ENTIRE MAP (134 x 113 = 15,142 px² + Optics Dark Room) */}
            <rect
              x="736"
              y="177"
              width="134"
              height="113"
              rx="10"
              fill="#1e3a8a"
              fillOpacity="0.95"
              stroke="#38bdf8"
              strokeWidth="3.2"
            />
            <rect
              x="739.5"
              y="180.5"
              width="127"
              height="106"
              rx="7"
              fill="none"
              stroke="#bae6fd"
              strokeOpacity="0.5"
              strokeWidth="1.2"
              strokeDasharray="6 3"
            />
            <SolarPanelArray x={741} y={181} w={26} h={8} />
            <rect x="770" y="181" width="96" height="15" rx="4" fill="#0c4a6e" stroke="#7dd3fc" strokeWidth="1" />
            <text x="818" y="191" textAnchor="middle" fill="#e0f2fe" fontSize="7.2" fontWeight="900" letterSpacing="0.2">
              PHYSICS (LARGEST)
            </text>
            <rect x="742" y="203" width="64" height="79" rx="5" fill="#1d4ed8" fillOpacity="0.55" stroke="#93c5fd" strokeWidth="1.2" />
            <text x="774" y="232" textAnchor="middle" fill="#dbeafe" fontSize="8.4" fontWeight="900">
              PHYSICS
            </text>
            <text x="774" y="244" textAnchor="middle" fill="#dbeafe" fontSize="8.4" fontWeight="900">
              LAB
            </text>
            <rect x="810" y="203" width="54" height="79" rx="5" fill="#1e40af" fillOpacity="0.7" stroke="#bae6fd" strokeWidth="1.2" />
            <text x="837" y="232" textAnchor="middle" fill="#fef08a" fontSize="7.8" fontWeight="900">
              PHYSICS
            </text>
            <text x="837" y="244" textAnchor="middle" fill="#fef08a" fontSize="7.8" fontWeight="900">
              OFFICE
            </text>

            {/* 13. STATISTICS DEPARTMENT (Directly BEFORE Dark Room & Right at Top of Stairs) */}
            <rect x="874" y="177" width="44" height="113" rx="8" fill="#701a75" fillOpacity="0.88" stroke="#e879f9" strokeWidth="2.2" />
            <SolarPanelArray x={882} y={180} w={28} h={7} />
            <text x="896" y="201" textAnchor="middle" fill="#f0abfc" fontSize="7.2" fontWeight="900">
              STATS
            </text>
            <text x="896" y="211" textAnchor="middle" fill="#f5d0fe" fontSize="6.8" fontWeight="900">
              DEPT.
            </text>
            <text x="896" y="226" textAnchor="middle" fill="#fef08a" fontSize="5.8" fontWeight="900">
              (BEFORE
            </text>
            <text x="896" y="235" textAnchor="middle" fill="#fef08a" fontSize="5.8" fontWeight="900">
              DARK RM)
            </text>

            {/* DARK ROOM (After Statistics Department on Right End of 1st-Floor Row) */}
            <rect x="922" y="177" width="34" height="113" rx="7" fill="#020617" stroke="#60a5fa" strokeWidth="2" />
            <text x="939" y="200" textAnchor="middle" fill="#93c5fd" fontSize="6.4" fontWeight="900">
              OPTICS
            </text>
            <text x="939" y="222" textAnchor="middle" fill="#fde047" fontSize="7.4" fontWeight="900">
              DARK
            </text>
            <text x="939" y="233" textAnchor="middle" fill="#fde047" fontSize="7.4" fontWeight="900">
              ROOM
            </text>

            {/* 08. AUDITORIUM HALL (DIRECTLY ACCESSIBLE FROM PRINCIPAL OFFICE PATH) */}
            <rect x="968" y="126" width="90" height="166" rx="12" fill="#881337" fillOpacity="0.88" stroke="#fb7185" strokeWidth="2.6" />
            <SolarPanelArray x={1020} y={130} w={32} h={8} />
            <text x="1013" y="160" textAnchor="middle" fill="#fda4af" fontSize="10.2" fontWeight="900">
              AUDITORIUM
            </text>
            <text x="1013" y="174" textAnchor="middle" fill="#fda4af" fontSize="10.2" fontWeight="900">
              HALL
            </text>
            <text x="1013" y="268" textAnchor="middle" fill="#fecdd3" fontSize="7.2" fontWeight="900">
              FROM PRINCIPAL
            </text>
            <text x="1013" y="280" textAnchor="middle" fill="#fef08a" fontSize="7.4" fontWeight="900">
              OFFICE PATH ↑
            </text>

            {/* ================= GROUND FLOOR: PRINCIPAL'S OFFICE → CHEMISTRY LAB → STAIRS (TO 6 DEPTS) → PATH TO AUDITORIUM HALL ================= */}

            {/* Open Shaded West Courtyard Plaza */}
            <rect
              x="362"
              y="330"
              width="206"
              height="56"
              rx="10"
              fill="#022c22"
              fillOpacity="0.58"
              stroke="#34d399"
              strokeOpacity="0.45"
              strokeWidth="1.4"
              strokeDasharray="6 4"
            />
            <text x="465" y="353" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="900">
              CENTRAL COURTYARD &amp; PROMENADE
            </text>
            <text x="465" y="370" textAnchor="middle" fill="#fef08a" fontSize="8.6" fontWeight="800">
              ← HOSTEL · PRINCIPAL &amp; AUDITORIUM →
            </text>

            {/* 09. PRINCIPAL'S OFFICE (EXTRA BIG & ROYAL BRIGHT GOLDEN LANDMARK) */}
            <rect
              x="642"
              y="302"
              width="126"
              height="100"
              rx="13"
              fill="url(#gold-principal-grad)"
              fillOpacity="0.94"
              stroke="#fef08a"
              strokeWidth="3.8"
            />
            <rect
              x="648"
              y="308"
              width="114"
              height="88"
              rx="9"
              fill="#451a03"
              fillOpacity="0.45"
              stroke="#fde047"
              strokeWidth="1.5"
            />
            <SolarPanelArray x={652} y={311} w={32} h={8} />
            <polygon
              points="746,311 750,318 758,318 752,323 754,330 746,326 738,330 740,323 734,318 742,318"
              fill="#fef08a"
              stroke="#92400e"
              strokeWidth="1"
            />
            <text x="705" y="338" textAnchor="middle" fill="#fef9c3" fontSize="11.6" fontWeight="900" letterSpacing="0.3">
              PRINCIPAL&rsquo;S OFFICE
            </text>
            <text x="705" y="391" textAnchor="middle" fill="#fef08a" fontSize="8.6" fontWeight="900">
              GOLDEN EXECUTIVE HALL
            </text>

            {/* 07. CHEMISTRY LAB & CHEMISTRY OFFICE (In Line of Principal's Office) */}
            <rect
              x="774"
              y="302"
              width="118"
              height="100"
              rx="12"
              fill="#164e63"
              fillOpacity="0.9"
              stroke="#22d3ee"
              strokeWidth="2.6"
            />
            <SolarPanelArray x={854} y={306} w={32} h={8} />
            <rect x="780" y="334" width="64" height="42" rx="6" fill="#0e7490" fillOpacity="0.65" stroke="#67e8f9" strokeWidth="1.2" />
            <text x="812" y="358" textAnchor="middle" fill="#cffafe" fontSize="8.6" fontWeight="900">
              CHEM. LAB
            </text>
            <rect x="848" y="334" width="38" height="42" rx="6" fill="#155e75" fillOpacity="0.82" stroke="#a5f3fc" strokeWidth="1.2" />
            <text x="867" y="352" textAnchor="middle" fill="#fef08a" fontSize="7.4" fontWeight="900">
              CHEM
            </text>
            <text x="867" y="363" textAnchor="middle" fill="#fef08a" fontSize="7.4" fontWeight="900">
              OFFICE
            </text>
            <text x="816" y="324" textAnchor="middle" fill="#67e8f9" fontSize="10.2" fontWeight="900">
              CHEMISTRY LAB
            </text>
            <text x="833" y="394" textAnchor="middle" fill="#a5f3fc" fontSize="7.8" fontWeight="900">
              (IN LINE OF PRINCIPAL)
            </text>

            {/* STAIRS TO 1ST FLOOR DEPARTMENTS (Directly Below Statistics & Leading Up to All 6 Departments) */}
            <rect
              x="898"
              y="302"
              width="48"
              height="100"
              rx="8"
              fill="#1e293b"
              fillOpacity="0.96"
              stroke="#facc15"
              strokeWidth="2.3"
            />
            <line x1="904" y1="318" x2="940" y2="318" stroke="#fde047" strokeWidth="2.2" />
            <line x1="904" y1="328" x2="940" y2="328" stroke="#fde047" strokeWidth="2.2" />
            <line x1="904" y1="338" x2="940" y2="338" stroke="#fde047" strokeWidth="2.2" />
            <line x1="904" y1="348" x2="940" y2="348" stroke="#fde047" strokeWidth="2.2" />
            <line x1="904" y1="358" x2="940" y2="358" stroke="#fde047" strokeWidth="2.2" />
            <line x1="904" y1="368" x2="940" y2="368" stroke="#fde047" strokeWidth="2.2" />
            <line x1="922" y1="315" x2="922" y2="372" stroke="#38bdf8" strokeWidth="2.1" />
            <polygon points="917,319 922,307 927,319" fill="#38bdf8" />
            <text x="922" y="385" textAnchor="middle" fill="#fef08a" fontSize="8.8" fontWeight="900">
              STAIRS
            </text>
            <text x="922" y="397" textAnchor="middle" fill="#bae6fd" fontSize="7" fontWeight="900">
              ↑ 6 DEPTS
            </text>

            {/* DEDICATED DIRECT PATH BOX: PRINCIPAL OFFICE → AUDITORIUM HALL */}
            <rect
              x="952"
              y="302"
              width="106"
              height="100"
              rx="11"
              fill="#4c0519"
              fillOpacity="0.58"
              stroke="#fb7185"
              strokeOpacity="0.9"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <path d="M 958 352 L 1013 352 L 1013 308" fill="none" stroke="#fde047" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="1007,314 1013,302 1019,314" fill="#fde047" />
            <text x="1005" y="370" textAnchor="middle" fill="#fef08a" fontSize="7.8" fontWeight="900">
              PATH: PRINCIPAL
            </text>
            <text x="1005" y="384" textAnchor="middle" fill="#fda4af" fontSize="7.8" fontWeight="900">
              → AUDITORIUM ↑
            </text>

            {/* ================= ON RIGHT OF CORRIDOR: GARDEN & GARDENERS (EXCHANGED — NOW ABOVE CLERK OFFICE BEFORE PRINCIPAL) ================= */}

            <rect x="642" y="410" width="326" height="80" rx="13" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.6" />
            <circle cx="682" cy="436" r="13" fill="#22c55e" fillOpacity="0.78" stroke="#bbf7d0" strokeWidth="1.5" />
            <circle cx="805" cy="428" r="12" fill="#22c55e" fillOpacity="0.78" stroke="#bbf7d0" strokeWidth="1.5" />
            <circle cx="928" cy="436" r="13" fill="#22c55e" fillOpacity="0.78" stroke="#bbf7d0" strokeWidth="1.5" />
            {/* Gardener 1 in Garden */}
            <g transform="translate(744, 444)">
              <circle cx="0" cy="0" r="11" fill="#052e16" stroke="#a3e635" strokeWidth="1.5" />
              <ellipse cx="0" cy="-4.2" rx="6.2" ry="1.9" fill="#fde047" />
              <circle cx="0" cy="-1.8" r="2.5" fill="#fef3c7" />
              <path d="M-4,5 C-4,1 4,1 4,5 Z" fill="#4ade80" />
              <rect x="4" y="0.9" width="4" height="3" rx="0.6" fill="#38bdf8" />
            </g>
            {/* Gardener 2 in Garden */}
            <g transform="translate(868, 444)">
              <circle cx="0" cy="0" r="11" fill="#052e16" stroke="#a3e635" strokeWidth="1.5" />
              <ellipse cx="0" cy="-4.2" rx="6.2" ry="1.9" fill="#fde047" />
              <circle cx="0" cy="-1.8" r="2.5" fill="#fef3c7" />
              <path d="M-4,5 C-4,1 4,1 4,5 Z" fill="#22c55e" />
              <circle cx="-5.8" cy="2.2" r="2" fill="#f472b6" />
            </g>
            <text x="805" y="472" textAnchor="middle" fill="#dcfce7" fontSize="13" fontWeight="900">
              GARDEN &amp; GARDENERS (AFTER CLERK OFFICE)
            </text>
            <text x="805" y="485" textAnchor="middle" fill="#fef08a" fontSize="9.1" fontWeight="900">
              ON RIGHT OF CORRIDOR · BEFORE PRINCIPAL &amp; CHEM LAB
            </text>

            {/* 19. BIG COLLEGE HOSTEL (Positioned Directly BETWEEN Computer Lab Above & Tennis Court Below) */}
            <rect x="64" y="310" width="282" height="134" rx="14" fill="#7c2d12" fillOpacity="0.86" stroke="#fb923c" strokeWidth="3" />
            <rect x="78" y="328" width="66" height="74" rx="7" fill="#9a3412" fillOpacity="0.82" stroke="#fdba74" strokeOpacity="0.68" strokeWidth="1.4" />
            <rect x="266" y="328" width="66" height="74" rx="7" fill="#9a3412" fillOpacity="0.82" stroke="#fdba74" strokeOpacity="0.68" strokeWidth="1.4" />
            <rect x="154" y="336" width="102" height="58" rx="8" fill="#431407" fillOpacity="0.72" stroke="#fed7aa" strokeOpacity="0.62" strokeWidth="1.3" />
            <rect x="90" y="338" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="112" y="338" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="90" y="358" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="112" y="358" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="278" y="338" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="300" y="338" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="278" y="358" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <rect x="300" y="358" width="14" height="11" rx="2" fill="#fde68a" fillOpacity="0.86" />
            <SolarPanelArray x={282} y={314} w={50} h={10} />
            <text x="205" y="421" textAnchor="middle" fill="#fed7aa" fontSize="13.8" fontWeight="900" letterSpacing="0.5">
              BIG COLLEGE HOSTEL
            </text>
            <text x="205" y="436" textAnchor="middle" fill="#fde68a" fontSize="9.2" fontWeight="900">
              (BETWEEN COMPUTER LAB &amp; TENNIS COURT)
            </text>

            {/* 22. TENNIS COURT & VOLLEYBALL PLAYING GROUND (Replaced North-West Trees — Directly Below Hostel & Above West Garden Lawn) */}
            <rect x="64" y="458" width="282" height="100" rx="13" fill="#713f12" fillOpacity="0.78" stroke="#facc15" strokeWidth="2.8" />
            <rect x="82" y="470" width="104" height="46" rx="4" fill="none" stroke="#fde047" strokeOpacity="0.78" strokeWidth="1.6" />
            <line x1="134" y1="470" x2="134" y2="516" stroke="#fde047" strokeOpacity="0.9" strokeWidth="1.4" strokeDasharray="3 2" />
            <rect x="224" y="470" width="104" height="46" rx="4" fill="none" stroke="#fef08a" strokeOpacity="0.78" strokeWidth="1.6" />
            <line x1="276" y1="470" x2="276" y2="516" stroke="#fef08a" strokeOpacity="0.9" strokeWidth="1.4" strokeDasharray="3 2" />
            <text x="205" y="535" textAnchor="middle" fontSize="12.5" fontWeight="900">
              <tspan fill="#fef08a">TENNIS COURT</tspan>
              <tspan fill="#ffffff"> &amp; </tspan>
              <tspan fill="#fdba74">VOLLEYBALL GROUND</tspan>
            </text>
            <text x="205" y="550" textAnchor="middle" fill="#fde68a" fontSize="8.8" fontWeight="900">
              (BETWEEN HOSTEL &amp; WEST GARDEN LAWN)
            </text>

            {/* Lush Green West Garden Lawn & Shaded Trees (Below Tennis Court) */}
            <rect x="64" y="572" width="282" height="96" rx="14" fill="url(#lawn-grad)" stroke="#4ade80" strokeWidth="2.4" />
            <circle cx="116" cy="608" r="16" fill="#22c55e" fillOpacity="0.68" stroke="#bbf7d0" strokeOpacity="0.85" strokeWidth="1.6" />
            <circle cx="205" cy="616" r="15" fill="#22c55e" fillOpacity="0.68" stroke="#bbf7d0" strokeOpacity="0.85" strokeWidth="1.6" />
            <circle cx="294" cy="606" r="16" fill="#22c55e" fillOpacity="0.68" stroke="#bbf7d0" strokeOpacity="0.85" strokeWidth="1.6" />
            <text x="205" y="654" textAnchor="middle" fill="#dcfce7" fontSize="11.8" fontWeight="900">
              WEST GARDEN LAWN &amp; TREES
            </text>

            {/* ================= 04. BIG CLERK OFFICE & BIG CLERK OFFICE CORRIDOR (BEFORE GARDEN PAST WALKING DISTANCE) ================= */}

            <rect
              x="642"
              y="498"
              width="326"
              height="92"
              rx="13"
              fill="#0f292e"
              fillOpacity="0.92"
              stroke="#5eead4"
              strokeWidth="2.8"
            />
            {/* Wide L-Shaped Big Clerk Office Corridor Gallery */}
            <path
              d="M 644 500 L 714 500 L 714 562 L 966 562 L 966 588 L 644 588 Z"
              fill="#134e4a"
              fillOpacity="0.74"
              stroke="#99f6e4"
              strokeOpacity="0.62"
              strokeWidth="1.4"
              strokeDasharray="6 4"
            />
            {/* Corridor Architectural Pillars */}
            <circle cx="678" cy="514" r="4" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.2" />
            <circle cx="678" cy="538" r="4" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.2" />
            <circle cx="678" cy="562" r="4" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.2" />
            <circle cx="764" cy="575" r="4" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.2" />
            <circle cx="854" cy="575" r="4" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.2" />
            <circle cx="944" cy="575" r="4" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.2" />
            <text x="812" y="579" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="900" letterSpacing="0.7">
              BIG CLERK OFFICE CORRIDOR (RIGHT OF CORRIDOR)
            </text>

            {/* Big Clerk Office Main Administrative Wing */}
            <rect
              x="718"
              y="502"
              width="244"
              height="58"
              rx="10"
              fill="#115e59"
              fillOpacity="0.92"
              stroke="#2dd4bf"
              strokeWidth="2.4"
            />
            <SolarPanelArray x={916} y={506} w={40} h={9} />
            <rect x="728" y="508" width="22" height="10" rx="2" fill="#042f2e" stroke="#99f6e4" strokeWidth="1" />
            <rect x="756" y="508" width="22" height="10" rx="2" fill="#042f2e" stroke="#99f6e4" strokeWidth="1" />
            <rect x="784" y="508" width="22" height="10" rx="2" fill="#042f2e" stroke="#99f6e4" strokeWidth="1" />
            <text x="840" y="529" textAnchor="middle" fill="#5eead4" fontSize="13.8" fontWeight="900">
              BIG CLERK OFFICE
            </text>
            <text x="840" y="553" textAnchor="middle" fill="#ccfbf1" fontSize="9.3" fontWeight="800">
              RECORDS · ADMISSIONS · BEFORE GARDEN
            </text>

            {/* ================= INCREASED WALKING DISTANCE ZONE (BETWEEN CANTEEN & CLERK OFFICE — NO 25m) ================= */}

            <rect
              x="642"
              y="598"
              width="308"
              height="78"
              rx="11"
              fill="#022c22"
              fillOpacity="0.82"
              stroke="#facc15"
              strokeOpacity="0.85"
              strokeWidth="2.2"
              strokeDasharray="7 4"
            />
            <line x1="658" y1="622" x2="924" y2="622" stroke="#fde047" strokeWidth="3" strokeDasharray="7 5" />
            <line x1="658" y1="615" x2="658" y2="629" stroke="#fde047" strokeWidth="2.2" />
            <polygon points="924,616 938,622 924,628" fill="#fde047" />
            <text x="796" y="647" textAnchor="middle" fill="#fef08a" fontSize="13.6" fontWeight="900" letterSpacing="0.8">
              WALKING DISTANCE
            </text>
            <text x="796" y="666" textAnchor="middle" fill="#a7f3d0" fontSize="9.5" fontWeight="800">
              Straight Past Canteen → Clerk Corridor → Garden
            </text>

            {/* ================= ENTRANCE ROW: WAITING ROOM (LEFT) | CANTEEN + CENTRAL LIBRARY ON RIGHT OF CANTEEN | JAIL OUTSIDE ================= */}

            {/* 02. Waiting Room (Entrance Left) */}
            <rect x="144" y="684" width="240" height="76" rx="11" fill="#0c4a6e" fillOpacity="0.82" stroke="#0ea5e9" strokeWidth="2.5" />
            <SolarPanelArray x={152} y={689} w={38} h={10} />
            <text x="274" y="708" textAnchor="middle" fill="#7dd3fc" fontSize="13.2" fontWeight="900">
              WAITING ROOM (LEFT)
            </text>
            <text x="264" y="751" textAnchor="middle" fill="#bae6fd" fontSize="10.2" fontWeight="800">
              (First on Left Upon Entering)
            </text>

            {/* 03. College Canteen (Entrance Right Inside Golden Boundary) */}
            <rect x="642" y="684" width="140" height="76" rx="11" fill="#9a3412" fillOpacity="0.84" stroke="#f97316" strokeWidth="2.5" />
            <SolarPanelArray x={736} y={689} w={38} h={10} />
            <text x="702" y="708" textAnchor="middle" fill="#fdba74" fontSize="13" fontWeight="900">
              CANTEEN
            </text>
            <text x="712" y="751" textAnchor="middle" fill="#fed7aa" fontSize="9.8" fontWeight="800">
              (Entrance Right)
            </text>

            {/* 05. CENTRAL LIBRARY (DIRECTLY ON THE RIGHT OF CANTEEN INSIDE GOLDEN BOUNDARY) */}
            <rect x="792" y="684" width="158" height="76" rx="11" fill="#4c1d95" fillOpacity="0.82" stroke="#8b5cf6" strokeWidth="2.5" />
            <SolarPanelArray x={902} y={689} w={40} h={10} />
            <text x="861" y="707" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="900">
              CENTRAL LIBRARY
            </text>
            <text x="871" y="751" textAnchor="middle" fill="#ddd6fe" fontSize="9.6" fontWeight="800">
              (Right of Canteen)
            </text>

            {/* OUTSIDE Golden College Boundary Wall (Exact Lower-Right Position): CENTRAL JAIL & SIGNAL JAMMERS */}
            <rect x="974" y="676" width="216" height="96" rx="12" fill="#0f172a" fillOpacity="0.96" stroke="#ef4444" strokeWidth="2.8" strokeDasharray="7 4" />
            <rect x="984" y="698" width="24" height="38" rx="4" fill="#020617" stroke="#f87171" strokeWidth="1.5" />
            <line x1="990" y1="698" x2="990" y2="736" stroke="#fca5a5" strokeOpacity="0.85" strokeWidth="1.4" />
            <line x1="996" y1="698" x2="996" y2="736" stroke="#fca5a5" strokeOpacity="0.85" strokeWidth="1.4" />
            <line x1="1002" y1="698" x2="1002" y2="736" stroke="#fca5a5" strokeOpacity="0.85" strokeWidth="1.4" />
            {/* Signal Jammer Towers & RF Jammer Waves */}
            <g transform="translate(1152, 718)">
              <path d="M-5,26 L0,-8 L5,26 Z" fill="none" stroke="#fde047" strokeWidth="1.5" />
              <circle cx="0" cy="-10" r="2.5" fill="#ef4444" />
              <path d="M-8,-14 A9,9 0 0,1 8,-14" fill="none" stroke="#38bdf8" strokeWidth="1.4" />
              <path d="M-12,-18 A13,13 0 0,1 12,-18" fill="none" stroke="#f87171" strokeWidth="1.2" strokeDasharray="2 1.5" />
            </g>
            <g transform="translate(1174, 724)">
              <path d="M-4,22 L0,-6 L4,22 Z" fill="none" stroke="#fde047" strokeWidth="1.4" />
              <circle cx="0" cy="-8" r="2.2" fill="#ef4444" />
              <path d="M-6,-12 A7,7 0 0,1 6,-12" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
            </g>
            <text x="1082" y="702" textAnchor="middle" fontSize="12.5" fontWeight="900">
              <tspan fill="#fca5a5">CENTRAL JAIL</tspan>
            </text>
            <text x="1082" y="724" textAnchor="middle" fill="#fde047" fontSize="11.2" fontWeight="900">
              &amp; SIGNAL JAMMERS
            </text>
            <text x="1082" y="756" textAnchor="middle" fill="#7dd3fc" fontSize="9.4" fontWeight="900">
              (OUTSIDE GOLDEN BOUNDARY)
            </text>

            {/* ================= PAVED WALKWAYS, GRILL PATHS & GIRLS WALKING TO COMPUTER LAB ================= */}

            {/* Entrance Cross Plaza (Waiting Room Left <-> Gate <-> Canteen <-> Central Library Right) */}
            <line x1="264" y1="724" x2="871" y2="724" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="16" strokeLinecap="round" />
            {/* Entrance Stem up to Twin Grill Start */}
            <line x1="600" y1="776" x2="600" y2="670" stroke="#94a3b8" strokeOpacity="0.38" strokeWidth="22" strokeLinecap="round" />

            {/* Branch into Big Clerk Office Corridor (Lower Right Before Garden) */}
            <line x1="600" y1="574" x2="644" y2="574" stroke="#cbd5e1" strokeOpacity="0.45" strokeWidth="16" strokeLinecap="round" />
            {/* Branch to Garden (After Clerk Office) on Right */}
            <line x1="600" y1="450" x2="642" y2="450" stroke="#94a3b8" strokeOpacity="0.34" strokeWidth="14" strokeLinecap="round" />
            {/* Vertical Connector Linking Garden & Right Corridor up to Principal's Office, Chemistry Lab & Stairs */}
            <line x1="678" y1="410" x2="678" y2="351" stroke="#cbd5e1" strokeOpacity="0.42" strokeWidth="16" strokeLinecap="round" />

            {/* CENTRAL TWIN PATHS SEPARATED BY SMALL GRILL (X=582 & X=618, Y=670 -> Y=210) */}
            <line x1="582" y1="670" x2="582" y2="210" stroke="#cbd5e1" strokeOpacity="0.38" strokeWidth="15" strokeLinecap="round" />
            <line x1="618" y1="670" x2="618" y2="210" stroke="#cbd5e1" strokeOpacity="0.38" strokeWidth="15" strokeLinecap="round" />
            <line
              x1="600"
              y1="664"
              x2="600"
              y2="218"
              stroke="#fbbf24"
              strokeWidth="3.8"
              strokeDasharray="7 5"
              strokeOpacity="0.96"
            />
            <rect
              x="558"
              y="396"
              width="84"
              height="21"
              rx="5"
              fill="#021b15"
              fillOpacity="0.96"
              stroke="#a3e635"
              strokeOpacity="0.92"
              strokeWidth="1.5"
            />
            <text x="600" y="410.5" textAnchor="middle" fill="#ecfccb" fontSize="9.8" fontWeight="900" letterSpacing="0.4">
              SMALL GRILL
            </text>

            {/* Horizontal Corridor & Dedicated Path from Principal's Office -> Chemistry Lab -> Stairs -> Auditorium Hall */}
            <line x1="362" y1="352" x2="1013" y2="352" stroke="#94a3b8" strokeOpacity="0.38" strokeWidth="16" strokeLinecap="round" />
            <line x1="705" y1="352" x2="1013" y2="352" stroke="#fb7185" strokeOpacity="0.58" strokeWidth="6" strokeDasharray="8 5" strokeLinecap="round" />
            <line x1="1013" y1="352" x2="1013" y2="292" stroke="#fb7185" strokeOpacity="0.58" strokeWidth="6" strokeDasharray="8 5" strokeLinecap="round" />

            {/* Stairs Vertical Link up to ALL 6 Departments By Stairs */}
            <line x1="922" y1="302" x2="922" y2="152" stroke="#fde047" strokeOpacity="0.46" strokeWidth="12" strokeLinecap="round" />
            <line x1="656" y1="234" x2="939" y2="234" stroke="#94a3b8" strokeOpacity="0.3" strokeWidth="11" strokeLinecap="round" />
            <line x1="713" y1="152" x2="922" y2="152" stroke="#94a3b8" strokeOpacity="0.3" strokeWidth="11" strokeLinecap="round" />

            {/* North & East Sequence Walkways: Spine -> Assembly -> Zoology -> Botany -> Long Distance -> Ground -> Garden -> Sindhi/Economics/Physiology/Psychology/Geography */}
            <line x1="600" y1="210" x2="580" y2="66" stroke="#94a3b8" strokeOpacity="0.34" strokeWidth="14" strokeLinecap="round" />
            <line x1="580" y1="66" x2="1113" y2="66" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="12" strokeLinecap="round" />
            <line x1="1064" y1="106" x2="1064" y2="578" stroke="#94a3b8" strokeOpacity="0.34" strokeWidth="10" strokeLinecap="round" />
            <line x1="1064" y1="170" x2="1070" y2="170" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="6" />
            <line x1="1064" y1="272" x2="1070" y2="272" stroke="#fbbf24" strokeOpacity="0.55" strokeWidth="6" />
            <line x1="1064" y1="374" x2="1070" y2="374" stroke="#f472b6" strokeOpacity="0.55" strokeWidth="6" />
            <line x1="1064" y1="476" x2="1070" y2="476" stroke="#c084fc" strokeOpacity="0.55" strokeWidth="6" />
            <line x1="1064" y1="578" x2="1070" y2="578" stroke="#38bdf8" strokeOpacity="0.55" strokeWidth="6" />

            {/* LEFT PATH BETWEEN TWO GRILLS -> GIRLS WALKING ON PATH OF COMPUTER LAB + COMMERCE STAIRS + DIRECT HOSTEL & SPORTS LINKS */}
            <line x1="582" y1="244" x2="504" y2="244" stroke="#cbd5e1" strokeOpacity="0.4" strokeWidth="12" strokeLinecap="round" />
            <line x1="582" y1="266" x2="504" y2="266" stroke="#cbd5e1" strokeOpacity="0.4" strokeWidth="12" strokeLinecap="round" />
            <line x1="578" y1="235" x2="506" y2="235" stroke="#fb923c" strokeWidth="2.5" strokeDasharray="5 3" strokeOpacity="0.92" />
            <line x1="578" y1="275" x2="506" y2="275" stroke="#fb923c" strokeWidth="2.5" strokeDasharray="5 3" strokeOpacity="0.92" />
            <line x1="504" y1="255" x2="129" y2="255" stroke="#94a3b8" strokeOpacity="0.34" strokeWidth="12" strokeLinecap="round" />
            <line x1="504" y1="172" x2="532" y2="172" stroke="#fde047" strokeOpacity="0.58" strokeWidth="9" strokeLinecap="round" />
            <line x1="532" y1="172" x2="532" y2="60" stroke="#fde047" strokeOpacity="0.55" strokeWidth="8" strokeDasharray="6 4" strokeLinecap="round" />
            <line x1="532" y1="60" x2="504" y2="60" stroke="#fde047" strokeOpacity="0.58" strokeWidth="8" strokeLinecap="round" />
            <line x1="297" y1="286" x2="297" y2="310" stroke="#fb923c" strokeOpacity="0.65" strokeWidth="10" strokeLinecap="round" />
            <line x1="129" y1="178" x2="129" y2="310" stroke="#facc15" strokeOpacity="0.6" strokeWidth="10" strokeLinecap="round" />
            <line x1="346" y1="358" x2="362" y2="358" stroke="#94a3b8" strokeOpacity="0.42" strokeWidth="12" strokeLinecap="round" />
            <line x1="205" y1="444" x2="205" y2="458" stroke="#facc15" strokeOpacity="0.6" strokeWidth="10" strokeLinecap="round" />
            <line x1="205" y1="558" x2="205" y2="572" stroke="#4ade80" strokeOpacity="0.6" strokeWidth="10" strokeLinecap="round" />
            <line x1="582" y1="508" x2="346" y2="508" stroke="#94a3b8" strokeOpacity="0.34" strokeWidth="12" strokeLinecap="round" />
            <line x1="582" y1="622" x2="346" y2="622" stroke="#94a3b8" strokeOpacity="0.3" strokeWidth="10" strokeLinecap="round" />

            <rect x="506" y="278" width="88" height="19" rx="5" fill="#021b15" fillOpacity="0.96" stroke="#fb923c" strokeOpacity="0.92" strokeWidth="1.4" />
            <text x="550" y="291" textAnchor="middle" fill="#fed7aa" fontSize="9.4" fontWeight="900">
              2-GRILL LEFT
            </text>

            {/* GIRLS WALKING ON PATH OF COMPUTER LAB */}
            <WalkingCollegeGirl x={562} y={252} scale={1.0} dupattaColor="#10b981" bookColor="#facc15" />
            <WalkingCollegeGirl x={534} y={256} scale={1.0} dupattaColor="#06b6d4" bookColor="#fb923c" />
            <WalkingCollegeGirl x={508} y={252} scale={0.96} dupattaColor="#22c55e" bookColor="#f472b6" />
            <rect x="444" y="299" width="182" height="19" rx="5" fill="#022c22" fillOpacity="0.97" stroke="#6ee7b7" strokeWidth="1.3" />
            <text x="535" y="312" textAnchor="middle" fill="#a7f3d0" fontSize="9.4" fontWeight="900">
              GIRLS WALKING · COMPUTER LAB PATH
            </text>

            {/* Upper-Left Unified Corridor Spine */}
            <line x1="368" y1="255" x2="368" y2="126" stroke="#94a3b8" strokeOpacity="0.32" strokeWidth="12" strokeLinecap="round" />

            {/* ================= ROAD, MAIN GATE & SECURITY POST ================= */}

            <rect x="0" y="778" width="1200" height="62" fill="#0f172a" fillOpacity="0.96" />
            <line x1="24" y1="810" x2="1176" y2="810" stroke="#eab308" strokeOpacity="0.4" strokeWidth="2.4" strokeDasharray="18 15" />
            <text x="210" y="815" textAnchor="middle" fill="#cbd5e1" fillOpacity="0.92" fontSize="13" fontWeight="800" letterSpacing="1.1">
              PATHAN COLONY ROAD · HIRABAD
            </text>
            <text x="990" y="815" textAnchor="middle" fill="#cbd5e1" fillOpacity="0.92" fontSize="13" fontWeight="800" letterSpacing="1.1">
              GOVT. GIRLS ZUBAIDA COLLEGE
            </text>

            {/* Gate Entrance Opening & Security Guard Post */}
            <rect x="535" y="758" width="130" height="26" fill="#032b22" />
            <path d="M535 774 L535 748 M665 774 L665 748" stroke="#facc15" strokeWidth="4.5" />

            {/* Security Guard Cabin (Left of Gate) */}
            <rect x="454" y="738" width="76" height="30" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.9" />
            <text x="492" y="757" textAnchor="middle" fill="#e0f2fe" fontSize="10.2" fontWeight="900" letterSpacing="0.5">
              SECURITY
            </text>

            {/* Left Gate Security Guard */}
            <g transform="translate(553, 754)">
              <circle cx="0" cy="0" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.6" />
              <rect x="-4.8" y="-6.8" width="9.6" height="2.6" rx="1" fill="#38bdf8" />
              <circle cx="0" cy="-2.2" r="2.7" fill="#fef3c7" />
              <path d="M-4.6,5.8 C-4.6,1.2 4.6,1.2 4.6,5.8 Z" fill="#1d4ed8" />
              <path d="M4.6,0.5 L7.5,1.5 L7,4.5 L5.8,5.6 L4.8,4.5 Z" fill="#facc15" />
            </g>

            {/* Right Gate Security Guard */}
            <g transform="translate(647, 754)">
              <circle cx="0" cy="0" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.6" />
              <rect x="-4.8" y="-6.8" width="9.6" height="2.6" rx="1" fill="#38bdf8" />
              <circle cx="0" cy="-2.2" r="2.7" fill="#fef3c7" />
              <path d="M-4.6,5.8 C-4.6,1.2 4.6,1.2 4.6,5.8 Z" fill="#1d4ed8" />
              <path d="M-7.5,1.5 L-4.6,0.5 L-4.8,4.5 L-5.8,5.6 L-7,4.5 Z" fill="#facc15" />
            </g>
            <text x="647" y="734" textAnchor="middle" fill="#bae6fd" fontSize="9.4" fontWeight="800" letterSpacing="0.5">
              GATE GUARD
            </text>

            {/* ================= WALKING ROUTE & TRAIL OVERLAY ================= */}

            {activeRoute.length >= 2 && (
              <polyline
                points={polylinePoints}
                fill="none"
                stroke="#facc15"
                strokeWidth="4.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="11 8"
                markerEnd="url(#route-arrow)"
                opacity="0.94"
              />
            )}

            {walkedTrail.walkedPoints.length >= 2 && (
              <polyline
                points={walkedPolylinePoints}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="6.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.96"
              />
            )}

            {walkedTrail.footprints.map((fp, i) => (
              <circle
                key={i}
                cx={fp.x * 12}
                cy={fp.y * 8.4}
                r="3.8"
                fill="#e0f2fe"
                opacity="0.92"
              />
            ))}
          </svg>

          {/* Compass Overlay removed from top-right corner so Garden & East Wing remain unobstructed; shown in Utility Bar above */}

          {/* Gate Entry Callout (Bottom Center on Road) */}
          <div
            style={{ left: '50%', top: '97.2%' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
          >
            <span className="px-3.5 py-1 rounded-md bg-emerald-500 text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg whitespace-nowrap border-2 border-emerald-200">
              Enter Gate Here ↑
            </span>
          </div>

          {/* Hover Preview Crosshair Pin during Insert / Reposition */}
          {mapMode !== 'browse' && hoverCoords && (
            <div
              style={{ left: `${hoverCoords.x}%`, top: `${hoverCoords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
            >
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-amber-300 bg-amber-400/25 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              </div>
            </div>
          )}

          {/* Draft Pin Placed (Insert Mode) */}
          {draftPinCoords && (
            <div
              style={{ left: `${draftPinCoords.x}%`, top: `${draftPinCoords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
            >
              <div className="w-9 h-9 rounded-full bg-sky-400 text-slate-950 border-2 border-white shadow-xl flex items-center justify-center font-bold text-sm animate-bounce">
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
                  className={`relative w-12 h-12 rounded-full bg-sky-400 text-slate-950 border-2 border-white shadow-2xl flex items-center justify-center ${
                    walker.isMoving ? 'animate-bounce' : ''
                  }`}
                >
                  <div
                    style={{ transform: `rotate(${walker.angleDeg}deg)` }}
                    className="absolute inset-0 flex items-start justify-center pointer-events-none"
                  >
                    <span className="-mt-2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-white drop-shadow" />
                  </div>

                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-none stroke-slate-950"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="5" r="2" fill="currentColor" />
                    <path d="M9 20l2.2-6 1.8-3.5" />
                    <path d="M16 20l-2-5-2-3" />
                    <path d="M7.5 12.5l3.5-2 3 1 2.5-1.5" />
                  </svg>
                </div>
                <span className="mt-1 px-3 py-0.5 rounded bg-sky-400 text-slate-950 font-black text-xs whitespace-nowrap shadow-lg border border-white">
                  {walker.stepLabel || (walker.isMoving ? 'Visitor Walking' : 'Visitor Here')}
                </span>
              </div>
            </div>
          )}

          {/* 33 Distinct Multi-Colored Map Stop Pins with EXTRA-BIG Always-Visible Visitor Labels */}
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
                  className={`relative rounded-full flex items-center justify-center font-mono font-black border-2 shadow-xl transition-all ${
                    isPrincipal
                      ? 'w-11 h-11 text-sm ring-2 ring-amber-200'
                      : 'w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-[13px]'
                  } ${theme.pinBg} ${theme.pinText} ${
                    isSelected
                      ? 'border-white ring-4 ring-white/55 shadow-2xl'
                      : `${theme.pinBorder} opacity-95 group-hover:opacity-100`
                  }`}
                >
                  {stop.stopNumber}
                </span>

                <span
                  className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2.5 py-0.5 rounded-md bg-[#021611]/95 border whitespace-nowrap shadow-xl pointer-events-none transition-all ${
                    theme.textClass
                  } ${
                    isPrincipal
                      ? 'text-xs sm:text-sm md:text-[15px] font-black border-amber-300 bg-[#451a03]/95 ring-2 ring-amber-300/70'
                      : isSelected
                        ? `text-xs sm:text-sm font-black ${theme.activeBorder} ring-2 ring-white/45`
                        : 'text-[11.5px] sm:text-[12.5px] font-black border-emerald-700/95 group-hover:border-white/70'
                  }`}
                >
                  {stop.shortName || stop.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Legend & Route Caption Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-bold text-stone-200 px-1 pt-1">
        <div className="flex flex-wrap items-center gap-4">
          <span className={`inline-flex items-center gap-1.5 font-extrabold ${selectedTheme.textClass}`}>
            <span className={`w-3.5 h-3.5 rounded-full ${selectedTheme.pinBg} border border-white inline-block`} />
            <span>Selected: {selectedStop.shortName || selectedStop.name}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-amber-300 font-bold">
            <span className="w-4 h-3 rounded-sm bg-yellow-400 border border-amber-100 inline-block" />
            <span>Golden Boundary &amp; Principal&rsquo;s Office</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-rose-300 font-bold">
            <span className="w-3.5 h-3.5 rounded-sm bg-slate-800 border-2 border-dashed border-red-400 inline-block" />
            <span>Central Jail &amp; Jammers (Outside Boundary)</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sky-300 font-bold">
            <span className="w-3 h-3 rounded-full bg-sky-400 border border-white inline-block" />
            <span>Visitor Walking</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-emerald-300 font-bold">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white inline-block" />
            <span>Girls Walking (Computer Lab Path)</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-lime-200 font-bold">
            <span className="w-3 h-3 rounded-full bg-green-950 border border-lime-400 inline-block" />
            <span>Gardeners</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sky-300 font-bold">
            <span className="w-4 h-2.5 rounded-xs bg-sky-700 border border-sky-300 inline-block" />
            <span>Solar Panels</span>
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
