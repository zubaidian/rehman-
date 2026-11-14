import React, { useRef, useState } from 'react';
import {
  DirectionTurn,
  GATE_COORDS,
  TourFacility
} from '../data/campusTourData';
import { Navigation, Compass, Crosshair } from 'lucide-react';

export type MapInteractionMode = 'browse' | 'insert' | 'reposition';

interface CampusMapCanvasProps {
  stops: TourFacility[];
  selectedIndex: number;
  onSelectStop: (index: number) => void;
  mapMode: MapInteractionMode;
  onMapCoordinatePick?: (x: number, y: number) => void;
  draftPinCoords?: { x: number; y: number } | null;
}

export function buildAutoRoutePath(x: number, y: number): { x: number; y: number }[] {
  // Starting from Gate (50, 89) -> route along main central spine before turning left/right
  if (Math.abs(x - GATE_COORDS.x) <= 8) {
    return [GATE_COORDS, { x, y }];
  }
  if (y > 75) {
    return [GATE_COORDS, { x: 50, y: 82 }, { x, y }];
  }
  return [GATE_COORDS, { x: 50, y: Math.max(40, Math.min(70, y + 10)) }, { x, y }];
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
  const dx = x - GATE_COORDS.x; // negative = left (west), positive = right (east)
  const dy = GATE_COORDS.y - y; // positive = walking deeper north inside campus
  const estMeters = Math.max(8, Math.round(Math.hypot(dx * 0.9, dy * 1.1)));

  let turn: DirectionTurn = 'Straight Ahead';
  let step2 = 'Continue straight north along the central paved courtyard path.';

  if (dy < 6 && Math.abs(dx) <= 6) {
    turn = 'Entry Gate';
    step2 = 'You are right inside the Main College Gate entrance plaza.';
  } else if (dx <= -20) {
    turn = 'Turn Left';
    step2 =
      y > 72
        ? 'Turn left immediately inside the gate past the Security Desk.'
        : 'Walk straight toward the Assembly Courtyard, then turn left toward the West Wing corridor.';
  } else if (dx <= -8) {
    turn = 'Bear Left';
    step2 = 'Walk straight into the courtyard and bear left along the shaded west veranda.';
  } else if (dx >= 20) {
    turn = 'Turn Right';
    step2 =
      y > 72
        ? 'Turn right immediately inside the gate past the Notice & SECCAP Help Desk.'
        : 'Walk straight to the Assembly Courtyard, then turn right toward the East Science & IT corridor.';
  } else if (dx >= 8) {
    turn = 'Bear Right';
    step2 = 'Walk straight into the courtyard and bear right along the shaded east veranda.';
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
      'Enter through the Main College Iron Archway on Pathan Colony Road.',
      step2,
      `Arrive at ${label} (approx. ${estMeters} meters inside the campus gate).`
    ],
    routePath: buildAutoRoutePath(x, y)
  };
}

export function CampusMapCanvas({
  stops,
  selectedIndex,
  onSelectStop,
  mapMode,
  onMapCoordinatePick,
  draftPinCoords
}: CampusMapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverCoords, setHoverCoords] = useState<{ x: number; y: number } | null>(null);

  const selectedStop = stops[selectedIndex] || stops[0];

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
    selectedStop?.gateDirections?.routePath && selectedStop.gateDirections.routePath.length >= 2
      ? selectedStop.gateDirections.routePath
      : buildAutoRoutePath(selectedStop.mapX, selectedStop.mapY);

  const polylinePoints = activeRoute.map((pt) => `${pt.x * 10},${pt.y * 6}`).join(' ');

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
        className={`relative w-full h-[420px] sm:h-[490px] lg:h-[520px] rounded-2xl overflow-hidden bg-[#021d17] border-2 shadow-2xl select-none ${
          mapMode !== 'browse'
            ? 'border-amber-300 cursor-crosshair'
            : 'border-amber-300/40'
        }`}
      >
        {/* Architectural Cartographic SVG Ground Plan (1000 x 600 coordinate space matches X*10, Y*6) */}
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
                strokeOpacity="0.12"
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
            x="45"
            y="26"
            width="910"
            height="512"
            rx="16"
            fill="#043026"
            stroke="#34d399"
            strokeOpacity="0.35"
            strokeWidth="2.5"
          />

          {/* North Sports Lawn & Recreation Field (Top Center) */}
          <rect
            x="375"
            y="42"
            width="280"
            height="92"
            rx="10"
            fill="#064e3b"
            fillOpacity="0.65"
            stroke="#34d399"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
          <line x1="515" y1="52" x2="515" y2="124" stroke="#6ee7b7" strokeOpacity="0.3" strokeWidth="1.2" />
          <text
            x="515"
            y="62"
            textAnchor="middle"
            fill="#a7f3d0"
            fillOpacity="0.7"
            fontSize="11"
            fontWeight="700"
            letterSpacing="1.5"
          >
            NORTH SPORTS LAWN
          </text>

          {/* Academic Wing 4 (Top-Left) */}
          <rect
            x="230"
            y="108"
            width="135"
            height="72"
            rx="8"
            fill="#064b36"
            stroke="#d4af37"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
          <text x="297" y="135" textAnchor="middle" fill="#fde68a" fillOpacity="0.75" fontSize="11" fontWeight="700">
            WING 4
          </text>

          {/* Academic Wing 3 (Top-Right) */}
          <rect
            x="680"
            y="114"
            width="180"
            height="74"
            rx="8"
            fill="#064b36"
            stroke="#d4af37"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
          <text x="770" y="140" textAnchor="middle" fill="#fde68a" fillOpacity="0.75" fontSize="11" fontWeight="700">
            WING 3 · LIFE SCIENCES
          </text>

          {/* Auditorium Hall (Upper-Center) */}
          <rect
            x="405"
            y="168"
            width="190"
            height="92"
            rx="12"
            fill="#07503d"
            stroke="#facc15"
            strokeOpacity="0.45"
            strokeWidth="1.8"
          />
          <text x="500" y="192" textAnchor="middle" fill="#fef08a" fillOpacity="0.85" fontSize="12" fontWeight="700">
            AUDITORIUM HALL
          </text>

          {/* Block A: Central Library & Admin Wing (Left Side) */}
          <rect
            x="82"
            y="196"
            width="185"
            height="196"
            rx="10"
            fill="#054132"
            stroke="#d4af37"
            strokeOpacity="0.45"
            strokeWidth="1.6"
          />
          <text x="174" y="218" textAnchor="middle" fill="#fde68a" fillOpacity="0.8" fontSize="11" fontWeight="700">
            BLOCK A · LIBRARY &amp; ADMIN
          </text>

          {/* Academic Wing 1 & Wing 2 Corridors */}
          <rect
            x="284"
            y="246"
            width="110"
            height="80"
            rx="8"
            fill="#064b36"
            stroke="#34d399"
            strokeOpacity="0.35"
            strokeWidth="1.4"
          />
          <rect
            x="606"
            y="224"
            width="112"
            height="82"
            rx="8"
            fill="#064b36"
            stroke="#34d399"
            strokeOpacity="0.35"
            strokeWidth="1.4"
          />

          {/* Block B: Natural Science Wing (Middle Right) */}
          <rect
            x="732"
            y="262"
            width="175"
            height="108"
            rx="10"
            fill="#054132"
            stroke="#d4af37"
            strokeOpacity="0.45"
            strokeWidth="1.6"
          />
          <text x="820" y="286" textAnchor="middle" fill="#fde68a" fillOpacity="0.8" fontSize="11" fontWeight="700">
            BLOCK B · SCIENCE LABS
          </text>

          {/* IT Complex (Lower Right) */}
          <rect
            x="684"
            y="392"
            width="225"
            height="96"
            rx="10"
            fill="#054132"
            stroke="#38bdf8"
            strokeOpacity="0.4"
            strokeWidth="1.6"
          />
          <text x="796" y="476" textAnchor="middle" fill="#bae6fd" fillOpacity="0.8" fontSize="11" fontWeight="700">
            IT COMPLEX · CS LAB &amp; MULTIMEDIA
          </text>

          {/* Canteen & Masjid Garden Zone (Lower Left) */}
          <rect
            x="84"
            y="412"
            width="196"
            height="88"
            rx="10"
            fill="#054132"
            stroke="#34d399"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          <text x="182" y="488" textAnchor="middle" fill="#a7f3d0" fillOpacity="0.75" fontSize="11" fontWeight="700">
            CANTEEN &amp; PRAYER HALL
          </text>

          {/* Central Shaded Assembly Courtyard */}
          <rect
            x="404"
            y="314"
            width="192"
            height="136"
            rx="16"
            fill="#065f46"
            fillOpacity="0.5"
            stroke="#6ee7b7"
            strokeOpacity="0.35"
            strokeDasharray="6 4"
            strokeWidth="1.5"
          />
          <text x="500" y="346" textAnchor="middle" fill="#d1fae5" fillOpacity="0.7" fontSize="11" fontWeight="700">
            ASSEMBLY COURTYARD
          </text>

          {/* Paved Campus Walkways Network */}
          <g stroke="#94a3b8" strokeOpacity="0.28" strokeWidth="14" strokeLinecap="round" fill="none">
            {/* Main Central Spine from Gate */}
            <line x1="500" y1="538" x2="500" y2="140" />
            {/* Entrance Plaza Crossbar */}
            <line x1="200" y1="492" x2="800" y2="492" />
            {/* Courtyard Crossbar */}
            <line x1="240" y1="395" x2="780" y2="395" />
          </g>

          {/* Pathan Colony Road outside the Main Gate */}
          <rect x="0" y="546" width="1000" height="54" fill="#0f172a" fillOpacity="0.88" />
          <line x1="20" y1="573" x2="980" y2="573" stroke="#eab308" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="16 14" />
          <text
            x="170"
            y="578"
            textAnchor="middle"
            fill="#cbd5e1"
            fillOpacity="0.8"
            fontSize="11"
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
            fillOpacity="0.8"
            fontSize="11"
            fontWeight="600"
            letterSpacing="1"
          >
            OPPOSITE CENTRAL JAIL
          </text>

          {/* Gate Entrance Opening */}
          <rect x="445" y="528" width="110" height="22" fill="#043026" />
          <path d="M445 538 L445 524 M555 538 L555 524" stroke="#facc15" strokeWidth="3.5" />

          {/* Active Walking Route from Main Gate to Selected Point */}
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
              opacity="0.95"
            />
          )}
        </svg>

        {/* Compass Rose (Top Right Overlay) */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-[#021914]/90 backdrop-blur-sm border border-emerald-700/70 rounded-xl px-3 py-1.5 text-[11px] text-emerald-100 pointer-events-none">
          <Compass className="w-4 h-4 text-amber-300" />
          <div className="leading-tight">
            <span className="font-bold text-amber-300 block">N · Straight In</span>
            <span className="text-[10px] text-stone-300">W Left · E Right</span>
          </div>
        </div>

        {/* Gate Entry Callout Badge (Bottom Center near Gate) */}
        <div
          style={{ left: '50%', top: '94%' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <span className="px-2.5 py-0.5 rounded bg-amber-400 text-emerald-950 text-[10px] font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
            Enter College Gate ↑
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

        {/* Map Stop Pins */}
        {stops.map((stop, idx) => {
          const isSelected = idx === selectedIndex;
          const isGate = stop.id === 'historic-gateway';
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
                isSelected ? 'z-30 scale-115' : 'z-20 hover:z-30 hover:scale-110'
              } ${mapMode !== 'browse' ? 'opacity-65 pointer-events-none' : 'cursor-pointer'}`}
              title={`${stop.stopNumber}. ${stop.name} (${stop.gateDirections?.turn || ''})`}
              aria-label={`Select map stop ${stop.stopNumber}: ${stop.name}`}
            >
              {/* Active ping ring */}
              {isSelected && (
                <span className="absolute inset-0 -m-1.5 rounded-full bg-amber-400/35 animate-ping pointer-events-none" />
              )}

              {/* Pin Circle */}
              <span
                className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] font-mono font-bold border-2 shadow-lg transition-colors ${
                  isSelected
                    ? 'bg-amber-400 text-emerald-950 border-white ring-2 ring-amber-300/60'
                    : isGate
                      ? 'bg-emerald-500 text-white border-amber-200'
                      : stop.isCustom
                        ? 'bg-sky-600 text-white border-sky-200 hover:bg-sky-500'
                        : 'bg-[#064b36] text-amber-200 border-amber-300/70 hover:bg-amber-400 hover:text-emerald-950'
                }`}
              >
                {stop.stopNumber}
              </span>

              {/* Floating Pin Label (Always shown on active or hovered pin) */}
              <span
                className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 px-2 py-0.5 rounded bg-[#021611]/95 border text-[10px] font-semibold whitespace-nowrap shadow-lg transition-opacity pointer-events-none ${
                  isSelected
                    ? 'opacity-100 border-amber-300 text-amber-200'
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
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-amber-200 inline-block" />
            <span>01 Main Gate</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400 border border-white inline-block" />
            <span>Selected Stop</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-5 border-t-2 border-dashed border-amber-400 inline-block" />
            <span>Walking Route from Gate</span>
          </span>
          {stops.some((s) => s.isCustom) && (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-sky-600 border border-sky-200 inline-block" />
              <span>Added Point</span>
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 font-medium text-amber-300">
          <Navigation className="w-3.5 h-3.5" />
          <span>{selectedStop.gateDirections.distanceFromGate}</span>
        </span>
      </div>
    </div>
  );
}
