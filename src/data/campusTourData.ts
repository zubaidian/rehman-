export interface FacilityHotspot {
  id: string;
  label: string;
  description: string;
  xPercent: number; // 0-100% position on container
  yPercent: number;
}

export type DirectionTurn =
  | 'Entry Gate'
  | 'Straight Ahead'
  | 'Turn Left'
  | 'Turn Right'
  | 'Bear Left'
  | 'Bear Right'
  | 'Upstairs (1st Floor)';

export interface GateDirections {
  turn: DirectionTurn;
  distanceFromGate: string;
  walkingSteps: string[];
  routePath: { x: number; y: number }[];
}

export interface TourFacility {
  id: string;
  name: string;
  shortName?: string;
  subtitle: string;
  category: 'Administration' | 'Academics' | 'Laboratories' | 'Library' | 'Student Life';
  stopNumber: string;
  imageSrc?: string;
  svgType:
    | 'principal-office'
    | 'library'
    | 'computer-lab'
    | 'science-lab'
    | 'auditorium'
    | 'courtyard'
    | 'sports'
    | 'multimedia-room'
    | 'academic-wing';
  badge: string;
  description: string;
  keySpecs: { label: string; value: string }[];
  highlights: string[];
  hotspots: FacilityHotspot[];
  locationNote: string;
  mapX: number; // 0-100% horizontal coordinate on campus map
  mapY: number; // 0-100% vertical coordinate on campus map (91 = Main Gate, 8 = North Back Campus)
  gateDirections: GateDirections;
  isCustom?: boolean;
}

export const GATE_COORDS = { x: 50, y: 92.6 };

export interface SimulationCheckpoint {
  progress: number; // 0 to 1
  label: string;
  leftView: string;
  aheadView: string;
  rightView: string;
}

export const GATE_TO_PRINCIPAL_CHECKPOINTS: SimulationCheckpoint[] = [
  {
    progress: 0,
    label: 'Entering Main College Gate (Golden Boundary Wall)',
    leftView: 'Security Post & Waiting Room (Entrance Left)',
    aheadView: 'Gate Security Guards & Straight Twin-Grill Walkway',
    rightView: 'Canteen & Central Library Right · Central Jail & Jammers Outside Golden Boundary'
  },
  {
    progress: 0.30,
    label: 'Passing Canteen & Central Library (~25m Walking Distance) → Garden Ahead',
    leftView: 'Waiting Room Courtyard & West Garden Lawn',
    aheadView: 'Garden & Gardeners straight ahead BEFORE Big Clerk Office Corridor',
    rightView: 'Canteen & Central Library passed · Garden & Gardeners on right before Clerk Office'
  },
  {
    progress: 0.56,
    label: 'Garden & Gardeners on Right (Before Big Clerk Office Corridor)',
    leftView: 'West Garden Lawn & Central Courtyard ahead',
    aheadView: 'Big Clerk Office Corridor & Principal’s Office / Chemistry Lab line ahead',
    rightView: 'Garden & Gardeners on right right BEFORE Big Clerk Office & Corridor'
  },
  {
    progress: 0.80,
    label: 'Passing Big Clerk Office Corridor Toward Principal & Chemistry Line',
    leftView: 'Central Courtyard & Left 2-Grill Computer Lab Path ahead',
    aheadView: 'Big Ground & Green Lawn FIRST, then Sindhi, Economics & Physiology straight north',
    rightView: 'Big Clerk Office Corridor · Principal’s Office, Chemistry Lab, Stairs & Auditorium right'
  },
  {
    progress: 1,
    label: 'Arrived at Grand Golden Principal’s Office (In Line with Chemistry Lab, Stairs & Auditorium)',
    leftView: 'Central Courtyard Promenade directly across',
    aheadView: 'Straight north: Big Ground & Lawn first, then Sindhi, Economics & Physiology',
    rightView: 'Principal’s Office → Chemistry Lab → Stairs → Auditorium Hall · 1st Floor: Staff Room, English, Physics Lab/Office/Dark Room & Maths'
  }
];

export const CAMPUS_TOUR_STOPS: TourFacility[] = [
  {
    id: 'historic-gateway',
    name: 'Main College Gate & Security Post',
    shortName: 'Main Gate',
    subtitle: 'Visitor Entry Point · Security Guards · Waiting Room (Left) · Canteen (Right)',
    category: 'Administration',
    stopNumber: '01',
    imageSrc: '/assets/college/campus_86930cb8.jpg',
    svgType: 'courtyard',
    badge: 'Entry Point · Estd 1953',
    description:
      'Enter Government Girls Zubaida College through the Security-monitored 1953 Main Gate inside the Golden Boundary Wall on Pathan Colony Road. Immediately on your left is the Waiting Room and on your right is the College Canteen with the Central Library directly on the right of the Canteen (outside the golden wall sits Central Jail & Signal Jammers). Walking straight along the twin grill paths past ~25m walking distance brings you first to the Garden & Gardeners, then to the Big Clerk Office Corridor right beside the Corridor of Principal’s Office & Chemistry Office and Lab.',
    keySpecs: [
      { label: 'Security', value: '24/7 Gate Guards' },
      { label: 'Entrance Left', value: 'Waiting Room' },
      { label: 'Entrance Right', value: 'Canteen → Central Library' },
      { label: 'Straight Path', value: 'Garden → Big Clerk Corridor' }
    ],
    highlights: [
      'Gate Security Cabin & uniformed security guards stationed inside the Golden Boundary Wall',
      'First on your left upon entering: Visitor Waiting Room',
      'On your right at entrance: Canteen & Central Library; walking straight reaches Garden BEFORE Big Clerk Office Corridor'
    ],
    hotspots: [
      {
        id: 'gate-security',
        label: 'Gate Security Post',
        description: 'Trained campus security guards stationed right at the entrance gate.',
        xPercent: 25,
        yPercent: 72
      },
      {
        id: 'arch',
        label: 'Historic Archway',
        description: 'The iconic 1953 wrought-iron archway welcoming students and visitors.',
        xPercent: 50,
        yPercent: 22
      },
      {
        id: 'canteen-right',
        label: 'Canteen & Central Library (Right)',
        description: 'Located on your right inside the golden boundary when entering the gate.',
        xPercent: 80,
        yPercent: 78
      }
    ],
    locationNote: 'South Boundary · Pathan Colony Road (Security Gate)',
    mapX: 50,
    mapY: 92.6,
    gateDirections: {
      turn: 'Entry Gate',
      distanceFromGate: '0 m (Start Point)',
      walkingSteps: [
        'Enter through the Security-monitored Main Gate inside the Golden Boundary Wall (Waiting Room on left, Canteen & Central Library on right).',
        'Walk straight along the twin grill path past ~25m walking distance into the Garden BEFORE the Big Clerk Office Corridor.',
        'Pass the Big Clerk Office Corridor & Auditorium Hall into the Principal & Chemistry Office/Lab Corridor.'
      ],
      routePath: [{ x: 50, y: 92.6 }]
    }
  },
  {
    id: 'waiting-room',
    name: 'Visitor Waiting Room & Entrance Reception',
    shortName: 'Waiting Room',
    subtitle: 'First Stop on the Left Immediately Upon Entering the Main Gate',
    category: 'Administration',
    stopNumber: '02',
    svgType: 'courtyard',
    badge: 'Entrance Left · Visitor Lounge',
    description:
      'Immediately on the left side as visitors enter the Main College Gate sits the Waiting Room, providing shaded comfortable seating for parents, guardians, and guests alongside campus notices and guidance.',
    keySpecs: [
      { label: 'Position', value: 'Entrance Left' },
      { label: 'Distance', value: '14 Meters Left' },
      { label: 'Opposite Side', value: 'College Canteen' },
      { label: 'Purpose', value: 'Parent & Guest Seating' }
    ],
    highlights: [
      'First room on your left side right after entering the Security Gate',
      'Dedicated reception seating and campus notice boards for parents and visitors',
      'Directly opposite the College Canteen across the entrance courtyard'
    ],
    hotspots: [
      {
        id: 'waiting-seating',
        label: 'Parent Waiting Lounge',
        description: 'Shaded indoor-outdoor seating for visiting parents and guardians.',
        xPercent: 45,
        yPercent: 52
      },
      {
        id: 'notice-display',
        label: 'Entrance Notice Display',
        description: 'Daily college circulars, timetables, and admission notices.',
        xPercent: 72,
        yPercent: 40
      }
    ],
    locationNote: 'Entrance Courtyard · First Room on Left',
    mapX: 22.0,
    mapY: 86.2,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '14 m Left',
      walkingSteps: [
        'Enter through the Security-monitored Main Gate.',
        'Turn left immediately upon entering.',
        'First comes the Visitor Waiting Room on your left.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 86.2 },
        { x: 22.0, y: 86.2 }
      ]
    }
  },
  {
    id: 'college-canteen',
    name: 'College Canteen',
    shortName: 'Canteen',
    subtitle: 'On Your Right Entering Main Gate · Central Library Immediately to Its Right',
    category: 'Student Life',
    stopNumber: '03',
    svgType: 'courtyard',
    badge: 'Entrance Right · Library Next Right',
    description:
      'When a visitor enters through the Main Gate, the College Canteen stands immediately on the right side—serving snacks, tea, and cool water—with the Central College Library positioned directly to its right inside the Golden College Boundary.',
    keySpecs: [
      { label: 'Direction', value: 'Entrance Right' },
      { label: 'On Its Right', value: 'Central Library' },
      { label: 'Walk Time', value: '12 Meters Right' },
      { label: 'Services', value: 'Snacks & Cool Water' }
    ],
    highlights: [
      'Located immediately on your right upon entering the Main Gate',
      'Central College Library sits directly on the right side of the Canteen inside the Golden Boundary',
      'Walking straight past Canteen leads across ~25m walking distance to the Garden before Big Clerk Office Corridor'
    ],
    hotspots: [
      {
        id: 'canteen-counter',
        label: 'Refreshments Counter',
        description: 'Student snack and tea counter on the right side after the gate.',
        xPercent: 38,
        yPercent: 54
      },
      {
        id: 'canteen-seating',
        label: 'Shaded Seating Area',
        description: 'Clean shaded seating benches for break times.',
        xPercent: 70,
        yPercent: 58
      }
    ],
    locationNote: 'Entrance Right · Central Library Directly on Its Right',
    mapX: 59.3,
    mapY: 86.2,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '12 m Right',
      walkingSteps: [
        'Enter through the Main College Gate.',
        'Turn right immediately inside the Golden College Boundary.',
        'The College Canteen sits on your right (with Central Library directly on its right).'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 86.2 },
        { x: 59.3, y: 86.2 }
      ]
    }
  },
  {
    id: 'clerk-office',
    name: 'Big Clerk Office & Corridor',
    shortName: 'Clerk Office',
    subtitle: 'Big Clerk Office Corridor After Garden · On Right of Principal & Chemistry Corridor',
    category: 'Administration',
    stopNumber: '04',
    svgType: 'principal-office',
    badge: 'Big Corridor · Right of Principal/Chem Corridor',
    description:
      'Walking straight along the twin-grill path past the Canteen, ~25m walking distance, and the lush Garden & Gardeners brings you into the spacious Big Clerk Office & Big Clerk Office Corridor on the right—directly connecting to the Corridor of Principal’s Office & Chemistry Office and Lab.',
    keySpecs: [
      { label: 'Corridor', value: 'Big Clerk Office Corridor' },
      { label: 'Approach', value: 'After Garden (Before Principal)' },
      { label: 'Office Hours', value: '8:00 AM – 2:00 PM' },
      { label: 'Services', value: 'Records & Verification' }
    ],
    highlights: [
      'Wide colonnaded Big Clerk Office Corridor linking directly to Principal & Chemistry Office Corridor',
      'Positioned right after the Garden & Gardeners on the right side',
      'Handles admissions, student certificates, BISE verification & academic archives'
    ],
    hotspots: [
      {
        id: 'clerk-counter',
        label: 'Student Records Windows',
        description: 'Bonafide certificates, marksheet verification, and admission counters along the corridor.',
        xPercent: 36,
        yPercent: 52
      },
      {
        id: 'clerk-archive',
        label: 'Big Clerk Office Corridor Gallery',
        description: 'Covered veranda corridor linking straight up to Principal’s Office & Chemistry Office/Lab.',
        xPercent: 72,
        yPercent: 68
      }
    ],
    locationNote: 'After Garden · Big Corridor Below Principal & Chemistry Line',
    mapX: 70.0,
    mapY: 53.5,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '46 m Straight · After Garden',
      walkingSteps: [
        'Enter Main Gate (Canteen & Central Library on your right) and walk across ~25m walking distance.',
        'Pass the Garden & Gardeners on your right (located directly before Clerk Office).',
        'Step into the Big Clerk Office Corridor right below the Principal & Chemistry Lab line.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 59.0 },
        { x: 70.0, y: 59.0 },
        { x: 70.0, y: 53.5 }
      ]
    }
  },
  {
    id: 'central-library',
    name: 'Central College Library & Reading Wing',
    shortName: 'Central Library',
    subtitle: 'Directly on the Right of College Canteen Inside Golden Boundary · 15,000+ Books',
    category: 'Library',
    stopNumber: '05',
    svgType: 'library',
    badge: 'Right of Canteen · 15,000+ Books',
    description:
      'Located directly on the right side of the College Canteen inside the Golden Boundary Wall (just inside from Central Jail & Signal Jammers outside), the Central College Library houses over 15,000 books, the free Book Bank, and 120 silent reading seats.',
    keySpecs: [
      { label: 'Position', value: 'Right of Canteen' },
      { label: 'Book Capacity', value: '15,000+ Volumes' },
      { label: 'Reading Seats', value: '120 Students' },
      { label: 'Lending Scheme', value: 'Free Book Bank' }
    ],
    highlights: [
      'Positioned directly on the right side of the College Canteen inside the Golden Boundary',
      'Free Government Book Bank lending scheme for enrolled students',
      'Quiet reading hall for Pre-Medical, Engineering, Commerce, Arts & BS programs'
    ],
    hotspots: [
      {
        id: 'stacks',
        label: 'Main Book Stacks',
        description: 'Open-access shelves organized by subject discipline.',
        xPercent: 32,
        yPercent: 40
      },
      {
        id: 'reading-tables',
        label: 'Silent Study Desks',
        description: 'Daylit study desks accommodating 120 students.',
        xPercent: 68,
        yPercent: 65
      },
      {
        id: 'desk',
        label: "Librarian's Issue Desk",
        description: 'Library membership cards and textbook lending counter.',
        xPercent: 18,
        yPercent: 60
      }
    ],
    locationNote: 'Right of Canteen Inside Golden Wall',
    mapX: 72.6,
    mapY: 86.2,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '24 m Right (Past Canteen)',
      walkingSteps: [
        'Enter the Main Gate and turn right inside the Golden Boundary Wall.',
        'Pass immediately past the College Canteen on your right.',
        'Enter the Central College Library directly on the right of the Canteen.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 86.2 },
        { x: 72.6, y: 86.2 }
      ]
    }
  },
  {
    id: 'grill-divided-walkway',
    name: 'Garden (Before Clerk) & Twin Grill Paths',
    shortName: 'Garden & Twin Grill',
    subtitle: 'Garden & Gardeners Before Big Clerk Office Corridor · On Right of Corridor',
    category: 'Student Life',
    stopNumber: '06',
    svgType: 'courtyard',
    badge: 'Before Clerk Office · Right of Corridor',
    description:
      'Along the central twin paths divided by a small iron grill, you first reach the lush green Garden tended by college gardeners on the right side—situated directly BEFORE the Big Clerk Office & Corridor leading to Principal’s Office and Chemistry Office/Lab.',
    keySpecs: [
      { label: 'Garden Spot', value: 'Before Big Clerk Office' },
      { label: 'Pathway', value: 'Two Grill-Divided Paths' },
      { label: 'Care Staff', value: 'Campus Gardeners' },
      { label: 'Next Ahead', value: 'Big Clerk Corridor & Principal' }
    ],
    highlights: [
      'Expansive Garden tended by college gardeners appears BEFORE the Big Clerk Office Corridor',
      'Two clean parallel walkways separated by a small central iron grill',
      'Leads directly past Big Clerk Office Corridor into Principal’s Office & Chemistry Corridor'
    ],
    hotspots: [
      {
        id: 'small-grill',
        label: 'Small Center Grill Divider',
        description: 'Low iron grill separating the twin central walkways.',
        xPercent: 50,
        yPercent: 52
      },
      {
        id: 'big-lawn-gardeners',
        label: 'Garden & Gardeners (Before Clerk)',
        description: 'Expansive green lawn, shaded trees, and flowerbeds tended by gardeners before Clerk Office.',
        xPercent: 75,
        yPercent: 55
      }
    ],
    locationNote: 'Central Spine · Garden on Right Before Big Clerk Office Corridor',
    mapX: 50,
    mapY: 67.5,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '32 m Straight · Before Clerk Office',
      walkingSteps: [
        'Enter Main Gate (Security) with Canteen & Central Library on right and Waiting Room on left.',
        'Walk straight along the twin paths separated by the small grill past ~25m walking distance.',
        'Reach the lush Garden & Gardeners on your right directly BEFORE the Big Clerk Office Corridor.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 67.5 }
      ]
    }
  },
  {
    id: 'chemistry-labs',
    name: 'Chemistry Lab & Chemistry Office',
    shortName: 'Chemistry Lab',
    subtitle: 'Right In Line of Principal’s Office · Before Stairs & Shifted Auditorium Hall',
    category: 'Laboratories',
    stopNumber: '07',
    svgType: 'science-lab',
    badge: 'In Line of Principal · Before Stairs',
    description:
      'Located right in line beside the Principal’s Office (where the earlier hall stood), the Chemistry Lab and Chemistry Office house titration benches, reagent chambers, and fume hoods—with the Staircase in between leading to the 1st floor and the shifted Auditorium Hall further right.',
    keySpecs: [
      { label: 'Alignment', value: 'In Line of Principal’s Office' },
      { label: 'Next Right', value: 'Stairs → Auditorium Hall' },
      { label: 'Above (1st Fl)', value: 'Staff Room, English, Physics & Maths' },
      { label: 'Capacity', value: '40 Students / Lab' }
    ],
    highlights: [
      'Positioned directly in line beside Principal’s Office on the Ground Floor',
      'Houses both the Chemistry Practical Lab and Chemistry Office',
      'Staircase sits immediately to the right between Chemistry Lab and Auditorium Hall'
    ],
    hotspots: [
      {
        id: 'chem-benches',
        label: 'Chemistry Practical Lab',
        description: 'Lab tables outfitted with burettes, Bunsen burners, and sinks.',
        xPercent: 32,
        yPercent: 52
      },
      {
        id: 'chem-hood',
        label: 'Chemistry Faculty Office',
        description: 'Chemistry department faculty & preparation office right beside the stairs.',
        xPercent: 78,
        yPercent: 48
      }
    ],
    locationNote: 'Ground Floor · In Line of Principal’s Office (Before Stairs)',
    mapX: 73.9,
    mapY: 41.8,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '58 m Straight · Right',
      walkingSteps: [
        'Walk straight along the twin grill paths past the Garden and Big Clerk Office Corridor.',
        'Turn right past the Golden Principal’s Office along the same line.',
        'Enter the Chemistry Lab & Office immediately before the Stairs and Auditorium Hall.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.8 },
        { x: 73.9, y: 41.8 }
      ]
    }
  },
  {
    id: 'auditorium-hall',
    name: 'College Auditorium Hall',
    shortName: 'Auditorium Hall',
    subtitle: 'Shifted on the Right Past the Stairs In Between · In Line of Zoology & Botany',
    category: 'Student Life',
    stopNumber: '08',
    svgType: 'auditorium',
    badge: 'Shifted Right · Past Stairs In Between',
    description:
      'Shifted to the far right wing just past the central Staircase (in between Chemistry Lab / 1st-Floor Wing and Auditorium Hall) and aligned vertically beneath Zoology & Botany, the College Auditorium Hall hosts convocations, Seerat conferences, and prize ceremonies.',
    keySpecs: [
      { label: 'Seating', value: '600+ Attendees' },
      { label: 'Position', value: 'Shifted Right Past Stairs' },
      { label: 'In Between', value: 'Stairs to 1st Floor Wing' },
      { label: 'Alignment', value: 'Zoology & Botany Line' }
    ],
    highlights: [
      'Shifted to the right beyond the Stairs sitting in between Chemistry Lab and Auditorium',
      'Directly in vertical alignment below the Botany & Zoology labs',
      'Elevated stage with formal Principal podium and solar-powered acoustics'
    ],
    hotspots: [
      {
        id: 'podium',
        label: "Principal's Podium",
        description: 'Formal ceremonial stage lectern.',
        xPercent: 50,
        yPercent: 35
      },
      {
        id: 'seating',
        label: 'Auditorium Seating',
        description: 'Accommodates 600+ students, faculty, and parents.',
        xPercent: 30,
        yPercent: 72
      }
    ],
    locationNote: 'Far Right Wing · Past Stairs (Below Botany & Zoology Line)',
    mapX: 91.5,
    mapY: 46.3,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '68 m Straight · Far Right',
      walkingSteps: [
        'Walk straight along the twin grill paths past the Garden and Big Clerk Office Corridor.',
        'Pass the Principal’s Office, Chemistry Lab & Office, and the Stairs in between.',
        'Enter the Auditorium Hall shifted on the far right.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.8 },
        { x: 83.3, y: 41.8 },
        { x: 91.5, y: 46.3 }
      ]
    }
  },
  {
    id: 'principal-office',
    name: 'Principal’s Office & Executive Suite',
    shortName: 'Principal’s Office',
    subtitle: 'Grand Golden Landmark · Directly In Line with Chemistry Lab, Stairs & Auditorium',
    category: 'Administration',
    stopNumber: '09',
    svgType: 'principal-office',
    badge: 'Executive Suite · Right Side',
    description:
      'Walking straight past the Garden and Big Clerk Office Corridor brings you to the prominent Golden Principal’s Office—the executive office of Principal Prof. Yasmeen Panhwar—sitting directly in line with the Chemistry Lab, Stairs in between, and the shifted Auditorium Hall on the right.',
    keySpecs: [
      { label: 'Principal', value: 'Prof. Yasmeen Panhwar' },
      { label: 'In Line Right', value: 'Chemistry Lab → Stairs → Auditorium' },
      { label: 'Above (1st Fl)', value: 'Staff Room, English, Physics, Maths' },
      { label: 'Office Hours', value: '8:00 AM – 2:00 PM' }
    ],
    highlights: [
      'Positioned prominently right past the Garden & Big Clerk Office Corridor',
      'Directly in line on the right with Chemistry Lab, Stairs, and Auditorium Hall',
      'Stairs in between lead up to 1st Floor: General Staff Room, English Classes, Physics Lab/Office/Dark Room & Mathematics'
    ],
    hotspots: [
      {
        id: 'principal-desk',
        label: 'Principal’s Executive Desk',
        description: 'Office of Prof. Yasmeen Panhwar guiding academic excellence.',
        xPercent: 50,
        yPercent: 42
      },
      {
        id: 'honor-roll-wall',
        label: '1953 Legacy & Merit Wall',
        description: 'Archival honor roll showcasing BISE toppers since 1953.',
        xPercent: 22,
        yPercent: 34
      }
    ],
    locationNote: 'Right Side · In Line with Chemistry Lab, Stairs & Auditorium Hall',
    mapX: 60.0,
    mapY: 41.8,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '58 m Straight · Right',
      walkingSteps: [
        'Enter Main Gate (Canteen & Central Library on your right) and walk straight past ~25m walking distance.',
        'Pass the Garden (before Clerk Office) and Big Clerk Office Corridor.',
        'Turn right into the grand Golden Principal’s Office (in line with Chemistry Lab, Stairs & Auditorium).'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 67.5 },
        { x: 50, y: 41.8 },
        { x: 60.0, y: 41.8 }
      ]
    }
  },
  {
    id: 'general-staff-room',
    name: 'General Staff Room (1st Floor Building)',
    shortName: 'General Staff Room',
    subtitle: '1st Floor Building via Stairs · With English, Physics Lab/Office/Dark Room & Maths',
    category: 'Administration',
    stopNumber: '10',
    svgType: 'academic-wing',
    badge: '1st Floor · Via Stairs',
    description:
      'Climbing the Stairs in between Chemistry Lab and Auditorium Hall brings you to the 1st Floor Building housing the General Staff Room, English Classes, Physics Lab, Physics Office & Optics Dark Room, and Department of Mathematics.',
    keySpecs: [
      { label: 'Floor', value: '1st Floor Building' },
      { label: 'Access', value: 'Stairs In Between' },
      { label: 'Same Floor', value: 'English, Physics & Maths' },
      { label: 'Purpose', value: 'Faculty Suite' }
    ],
    highlights: [
      'First suite in the 1st Floor Building reached via the central Stairs',
      'Shares the 1st floor with English Classes, Physics Lab/Office/Dark Room & Mathematics',
      'Equipped with rooftop solar power for year-round faculty operations'
    ],
    hotspots: [
      {
        id: 'staff-lounge',
        label: 'Faculty Workstations',
        description: 'Faculty seating, timetable planning boards, and academic lockers.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: '1st Floor Building · Above Principal’s Office (Via Stairs)',
    mapX: 58.2,
    mapY: 29.2,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '68 m · 1st Floor via Stairs',
      walkingSteps: [
        'Walk past Principal’s Office and Chemistry Lab to the Stairs in between.',
        'Climb the Stairs up to the 1st Floor Building.',
        'Walk along the 1st Floor corridor to the General Staff Room.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.8 },
        { x: 83.3, y: 41.8 },
        { x: 83.3, y: 29.2 },
        { x: 58.2, y: 29.2 }
      ]
    }
  },
  {
    id: 'islamiat-english',
    name: 'Department of Islamiat & Islamic Culture',
    shortName: 'Islamiat & Culture',
    subtitle: 'North-East Academic Wing · Separate Department Point Above Assembly Ground',
    category: 'Academics',
    stopNumber: '11',
    svgType: 'academic-wing',
    badge: 'Separate Dept. · North-East',
    description:
      'In the dedicated North-East wing overlooking the Assembly & Flag Hoisting Ground and Campus Prayer Room sit the Departments of Islamiat and Islamic Culture—hosting compulsory Islamiat lectures, Quranic & Hadith studies, and Seerat seminars.',
    keySpecs: [
      { label: 'Department', value: 'Islamiat & Islamic Culture' },
      { label: 'Adjacent To', value: 'Prayer Room & Statistics' },
      { label: 'Streams', value: 'HSC, BA & ADS' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Dedicated classrooms for Islamiat & Islamic Culture degree and HSC groups',
      'Hosts annual Seerat-un-Nabi and Qirat competitions',
      'Right beside the Statistics Dept. and Assembly & Prayer wing'
    ],
    hotspots: [
      {
        id: 'islamiat-room',
        label: 'Islamiat & Islamic Culture Hall',
        description: 'Dedicated lecture rooms for Islamic Studies & Culture.',
        xPercent: 50,
        yPercent: 48
      }
    ],
    locationNote: 'North-East Wing · Above Assembly Ground & Prayer Room',
    mapX: 70.8,
    mapY: 7.0,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '78 m North-East',
      walkingSteps: [
        'Walk straight along the twin grill spine toward North Big Ground.',
        'Bear right through the Assembly & Prayer wing.',
        'Arrive at the Department of Islamiat & Islamic Culture.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 70.8, y: 16.8 },
        { x: 70.8, y: 7.0 }
      ]
    }
  },
  {
    id: 'english-dept',
    name: 'English Classes & Department of English',
    shortName: 'English Classes',
    subtitle: '1st Floor Building Beside General Staff Room · Literature & Composition',
    category: 'Academics',
    stopNumber: '12',
    svgType: 'academic-wing',
    badge: '1st Floor · Beside Staff Room',
    description:
      'Located inside the 1st Floor Building right between the General Staff Room and Physics Lab/Office/Dark Room, the English Classes teach composition, prose, poetry, and academic communication across HSC and Degree cohorts.',
    keySpecs: [
      { label: 'Department', value: 'English Classes' },
      { label: 'Floor', value: '1st Floor Building' },
      { label: 'Between', value: 'Staff Room & Physics Lab' },
      { label: 'Focus', value: 'Literature & Rhetoric' }
    ],
    highlights: [
      'Dedicated English lecture classes in the 1st Floor Building',
      'Direct access via the central Stairs between Chemistry Lab and Auditorium',
      'Adjacent to General Staff Room and Physics Lab / Office / Dark Room'
    ],
    hotspots: [
      {
        id: 'english-room',
        label: 'English Lecture Rooms',
        description: 'Classrooms for English literature and academic composition.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: '1st Floor Building · Between Staff Room & Physics Lab/Office/Dark Room',
    mapX: 66.8,
    mapY: 29.2,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '68 m · 1st Floor via Stairs',
      walkingSteps: [
        'Walk past Principal’s Office and Chemistry Lab to the Stairs in between.',
        'Climb the Stairs up to the 1st Floor Building.',
        'Enter English Classes right next to the General Staff Room.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.8 },
        { x: 83.3, y: 41.8 },
        { x: 83.3, y: 29.2 },
        { x: 66.8, y: 29.2 }
      ]
    }
  },
  {
    id: 'statistics-mathematics',
    name: 'Department of Statistics',
    shortName: 'Statistics Dept.',
    subtitle: 'Upper-Right Quantitative Room Above Zoology · Probability & Applied Data',
    category: 'Academics',
    stopNumber: '13',
    svgType: 'academic-wing',
    badge: 'Separate Dept. · Quantitative',
    description:
      'Positioned in the upper-right quantitative block beside Islamiat & overlooking the Zoology & Assembly zone, the Department of Statistics teaches probability, biostatistics, sampling theory, and economic data analysis for ICS, Commerce, and Science students.',
    keySpecs: [
      { label: 'Department', value: 'Statistics' },
      { label: 'Location', value: 'North-East Quantitative Block' },
      { label: 'Streams', value: 'ICS, Commerce & B.Sc/AD' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Separate dedicated point & lecture room for Statistics',
      'Covers applied probability, statistical inference, and quantitative analysis',
      'Close connection to Assembly Ground and Mathematics wing'
    ],
    hotspots: [
      {
        id: 'stats-room',
        label: 'Statistics Lecture Room',
        description: 'Dedicated lecture room for probability & data analysis.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'North-East Quantitative Block · Beside Islamiat',
    mapX: 82.7,
    mapY: 7.0,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '82 m North-East',
      walkingSteps: [
        'Walk straight along the twin grill spine toward North Big Ground.',
        'Bear right past Assembly Ground & Islamiat.',
        'Enter the Department of Statistics.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 70.8, y: 16.8 },
        { x: 70.8, y: 7.0 },
        { x: 82.7, y: 7.0 }
      ]
    }
  },
  {
    id: 'mathematics-dept',
    name: 'Department of Mathematics',
    shortName: 'Mathematics Dept.',
    subtitle: '1st Floor Building Beside Physics Lab, Physics Office & Dark Room',
    category: 'Academics',
    stopNumber: '14',
    svgType: 'academic-wing',
    badge: '1st Floor · Quantitative',
    description:
      'Located at the eastern end of the 1st Floor Building right next to Physics Lab, Physics Office & Optics Dark Room (above the shifted Auditorium / Stairs wing), the Department of Mathematics conducts Pre-Engineering, ICS, and Associate Degree lectures.',
    keySpecs: [
      { label: 'Department', value: 'Mathematics' },
      { label: 'Floor', value: '1st Floor Building' },
      { label: 'Adjacent To', value: 'Physics Lab, Office & Dark Room' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Dedicated Mathematics classrooms inside the 1st Floor Building via Stairs',
      'Shares the 1st Floor corridor with General Staff Room, English Classes & Physics Lab/Office/Dark Room',
      'Prepares students for BISE Engineering honors and university STEM degrees'
    ],
    hotspots: [
      {
        id: 'math-room',
        label: 'Mathematics Classrooms',
        description: 'Pure & applied mathematics classrooms on the 1st Floor.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: '1st Floor Building · Beside Physics Lab, Physics Office & Dark Room',
    mapX: 92.2,
    mapY: 29.2,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '74 m · 1st Floor via Stairs',
      walkingSteps: [
        'Walk past Principal’s Office and Chemistry Lab to the Stairs in between.',
        'Climb the Stairs up to the 1st Floor Building.',
        'Turn right past Physics Lab, Physics Office & Dark Room into Mathematics.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.8 },
        { x: 83.3, y: 41.8 },
        { x: 83.3, y: 29.2 },
        { x: 92.2, y: 29.2 }
      ]
    }
  },
  {
    id: 'physics-lab-darkroom',
    name: 'Physics Lab, Physics Office & Dark Room',
    shortName: 'Physics Lab, Office & Dark Room',
    subtitle: '1st Floor Building Right at Top of Stairs · Between English Classes & Mathematics',
    category: 'Laboratories',
    stopNumber: '15',
    svgType: 'science-lab',
    badge: '1st Floor · Lab, Office & Dark Room',
    description:
      'Directly at the top of the central Staircase inside the 1st Floor Building (between English Classes and Mathematics) sit the Physics Practical Laboratory, the dedicated Physics Faculty Office, and the light-sealed Optics Dark Room.',
    keySpecs: [
      { label: 'Floor', value: '1st Floor Building' },
      { label: 'Sections', value: 'Physics Lab · Office · Dark Room' },
      { label: 'Access', value: 'Direct Top of Stairs' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Contains three distinct sections in the 1st Floor Building: Physics Lab, Physics Office & Dark Room',
      'Accessible directly at the top of the Stairs between Chemistry Lab and Auditorium Hall',
      'Adjacent to English Classes on the left and Mathematics on the right'
    ],
    hotspots: [
      {
        id: 'physics-lab-bench',
        label: 'Physics Practical Hall',
        description: 'Electrical bridges, pendulums, and mechanics apparatus.',
        xPercent: 25,
        yPercent: 52
      },
      {
        id: 'physics-office-room',
        label: 'Physics Office',
        description: 'Physics department office & apparatus store between Lab and Dark Room.',
        xPercent: 55,
        yPercent: 52
      },
      {
        id: 'optics-dark-room',
        label: 'Physics Optics Dark Room',
        description: 'Light-controlled chamber for optical bench and prism practicals.',
        xPercent: 85,
        yPercent: 52
      }
    ],
    locationNote: '1st Floor Building · Top of Stairs (Between English & Maths)',
    mapX: 79.3,
    mapY: 29.2,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '68 m · 1st Floor via Stairs',
      walkingSteps: [
        'Walk past Principal’s Office and Chemistry Lab to the Stairs in between.',
        'Climb the Stairs straight up into the 1st Floor Building.',
        'Step directly into the Physics Lab, Physics Office, and Optics Dark Room.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.8 },
        { x: 83.3, y: 41.8 },
        { x: 83.3, y: 29.2 },
        { x: 79.3, y: 29.2 }
      ]
    }
  },
  {
    id: 'greenhouse-prayer-ground',
    name: 'Assembly Ground, Flag Hoisting, Greenhouse & Prayer Room',
    shortName: 'Assembly, Flag & Prayer',
    subtitle: 'Before Zoology & Botany Garden · Morning Assembly, Flag Hoisting, Lawn & Prayer Room',
    category: 'Student Life',
    stopNumber: '16',
    svgType: 'courtyard',
    badge: 'Before Zoology · Assembly & Flag',
    description:
      'Directly before the Zoology and Botany departments on the upper-right campus sits the Morning Assembly & Flag Hoisting Ground with its flagpole and dais, alongside the green Garden Lawn, Botanical Greenhouse, and quiet Prayer Room (Namaz Hall).',
    keySpecs: [
      { label: 'Main Feature', value: 'Assembly & Flag Hoisting' },
      { label: 'Garden & Ground', value: 'Green Lawn & Greenhouse' },
      { label: 'Facility', value: 'Prayer Room (Namaz Hall)' },
      { label: 'Next Ahead', value: 'Zoology & Botany Labs' }
    ],
    highlights: [
      'Morning Assembly Courtyard & National Flag Hoisting Podium right before Zoology & Botany',
      'Lush green Garden Lawn and Botanical Greenhouse for live plant cultivation',
      'Clean, peaceful Prayer Room (Namaz Hall) for students and faculty'
    ],
    hotspots: [
      {
        id: 'assembly-flag',
        label: 'Assembly & Flag Hoisting',
        description: 'Campus flagpole dais for morning assembly and national celebrations.',
        xPercent: 28,
        yPercent: 48
      },
      {
        id: 'greenhouse',
        label: 'Botanical Greenhouse',
        description: 'Glass-roofed botanical plant nursery right beside the assembly lawn.',
        xPercent: 58,
        yPercent: 34
      },
      {
        id: 'prayer-room',
        label: 'Campus Prayer Room',
        description: 'Peaceful Prayer Room (Namaz Hall) for students and staff.',
        xPercent: 80,
        yPercent: 64
      }
    ],
    locationNote: 'Upper-Right Campus · Assembly Ground Before Zoology & Botany',
    mapX: 70.8,
    mapY: 16.8,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '76 m North-East',
      walkingSteps: [
        'Walk straight across the twin grill spine toward North Big Ground.',
        'Bear right toward the upper-right campus above the 1st Floor Building.',
        'Arrive at the Assembly & Flag Hoisting Ground, Lawn, Greenhouse & Prayer Room right before Zoology.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 70.8, y: 16.8 }
      ]
    }
  },
  {
    id: 'zoology-botany-labs',
    name: 'Department of Zoology & Zoology Lab',
    shortName: 'Zoology & Zoo Lab',
    subtitle: 'Separate Point Right Past Assembly & Flag Ground · Pre-Medical & BS Zoology',
    category: 'Laboratories',
    stopNumber: '17',
    svgType: 'science-lab',
    badge: 'Separate Dept. · BS Zoology',
    description:
      'Immediately beyond the Assembly & Flag Hoisting Ground stands the dedicated Department of Zoology and Zoology Laboratory—supporting our flagship 4-year BS Zoology degree, Pre-Medical practicals, microscopy stations, and preserved zoological specimen archives.',
    keySpecs: [
      { label: 'Department', value: 'Zoology & Zoology Lab' },
      { label: 'Programs', value: 'Pre-Medical & 4-Yr BS Zoology' },
      { label: 'Before It', value: 'Assembly & Flag Ground' },
      { label: 'Next Beside', value: 'Botany & Botany Lab' }
    ],
    highlights: [
      'Separate dedicated point & laboratory wing for Zoology & BS Zoology',
      'Equipped with high-power compound microscopes, dissection stations & specimens',
      'Solar-backed power for continuous lab work and specimen preservation'
    ],
    hotspots: [
      {
        id: 'zoo-lab',
        label: 'Zoology Practical Lab',
        description: 'Microscopes, anatomical models, and preserved zoology archives.',
        xPercent: 50,
        yPercent: 48
      }
    ],
    locationNote: 'Upper-Right Campus · Past Assembly & Flag Ground',
    mapX: 82.0,
    mapY: 16.8,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '82 m North-East',
      walkingSteps: [
        'Walk straight from the Main Gate past the Big Lawn and Principal’s Office line.',
        'Bear right through the Assembly & Flag Hoisting Ground.',
        'Enter the Department of Zoology & Zoology Lab.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 70.8, y: 16.8 },
        { x: 82.0, y: 16.8 }
      ]
    }
  },
  {
    id: 'botany-dept-lab',
    name: 'Department of Botany & Botany Lab',
    shortName: 'Botany & Botany Lab',
    subtitle: 'Separate Point Adjacent to Zoology · Herbarium, Plant Physiology & Taxonomy',
    category: 'Laboratories',
    stopNumber: '18',
    svgType: 'science-lab',
    badge: 'Separate Dept. · Botany Lab',
    description:
      'Beside Zoology on the north-east wing sits the dedicated Department of Botany and Botany Laboratory—housing a curated Sindh regional herbarium, plant anatomy slides, botanical charts, and direct access to the campus Greenhouse.',
    keySpecs: [
      { label: 'Department', value: 'Botany & Botany Lab' },
      { label: 'Adjacent To', value: 'Zoology & Greenhouse' },
      { label: 'Programs', value: 'Pre-Medical & B.Sc/AD' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Separate dedicated point & lab for Botany, plant taxonomy, and physiology',
      'Herbarium specimen collections and botanical slide microscopy hall',
      'Aligned vertically in the same line above the Auditorium & 1st Floor Wing'
    ],
    hotspots: [
      {
        id: 'botany-lab',
        label: 'Botany & Herbarium Lab',
        description: 'Plant taxonomy lab and preserved herbarium hall.',
        xPercent: 50,
        yPercent: 48
      }
    ],
    locationNote: 'North-East Corner · Right Past Zoology & Zoo Lab',
    mapX: 92.0,
    mapY: 16.8,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '88 m North-East',
      walkingSteps: [
        'Walk straight past the Big Lawn and Principal’s Office line.',
        'Bear right past Assembly & Flag Ground and Zoology & Zoo Lab.',
        'Enter the Department of Botany & Botany Lab at the north-east wing.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 70.8, y: 16.8 },
        { x: 92.0, y: 16.8 }
      ]
    }
  },
  {
    id: 'hostel-computer-lab',
    name: 'College Hostel (Main Residential Block)',
    shortName: 'College Hostel',
    subtitle: 'Right Beside the Unified IT & Humanities Corridor · Solar-Powered Multi-Wing Hostel',
    category: 'Student Life',
    stopNumber: '19',
    svgType: 'courtyard',
    badge: 'West Campus · Big Hostel Block',
    description:
      'Turning left onto the pathway between two grills (where students walk toward the IT corridor) brings you past Computer Lab, Computer Office & Big Multimedia Room straight into Government Girls Zubaida College’s large, solar-equipped Residential Hostel.',
    keySpecs: [
      { label: 'Approach', value: 'Left Path Between 2 Grills' },
      { label: 'Scale', value: 'Large Residential Block' },
      { label: 'Beside It', value: 'One-Corridor Building' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Expansive multi-wing girls hostel equipped with rooftop solar panels',
      'Positioned directly beside the unified corridor of Computer Lab, Computer Office, Big Multimedia Room, Pak Studies, Urdu & Physical Education',
      'Directly reachable via the left pathway enclosed between two grills'
    ],
    hotspots: [
      {
        id: 'hostel-courtyard',
        label: 'Hostel Residential Wings',
        description: 'Large secure student hostel complex with enclosed courtyard and rooftop solar array.',
        xPercent: 46,
        yPercent: 48
      },
      {
        id: 'hostel-warden',
        label: 'Warden & Study Hall',
        description: 'Supervised hostel study room and warden office beside the IT corridor.',
        xPercent: 75,
        yPercent: 62
      }
    ],
    locationNote: 'West Campus · Large Residential Hostel Beside Unified Corridor',
    mapX: 10.3,
    mapY: 26.2,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '78 m Straight · Left Grill Path',
      walkingSteps: [
        'Walk straight from the Main Gate past the Big Lawn and Principal’s Office/Chemistry line.',
        'Turn left onto the 2-grill Computer Lab pathway alongside walking students.',
        'Pass Big Multimedia Room and Computer Lab & Office straight into the Big College Hostel.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 36.2, y: 30.4 },
        { x: 24.6, y: 30.4 },
        { x: 10.3, y: 26.2 }
      ]
    }
  },
  {
    id: 'computer-lab',
    name: 'Computer Lab & Computer Office',
    shortName: 'Computer Lab & Office',
    subtitle: 'Beside Hostel in One Corridor (with Big Multimedia, Pak Studies, Urdu & PE)',
    category: 'Laboratories',
    stopNumber: '20',
    svgType: 'computer-lab',
    badge: 'One Corridor Beside Hostel · Solar Roof',
    description:
      'Located right beside the large College Hostel in one continuous ground-floor corridor—connected with Big Computer Multimedia Room, Pakistan Studies, Urdu, and Physical Education (under 1st-floor Commerce)—the Computer Lab & Computer Office feature modern desktop terminals and solar-backed power.',
    keySpecs: [
      { label: 'Workstations', value: 'Modern Desktop Systems' },
      { label: 'Same Corridor', value: 'Big Multimedia, Pak Studies, Urdu, PE' },
      { label: '1st Floor Above', value: 'Commerce & Library' },
      { label: 'Energy', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Situated directly beside the Big College Hostel inside one unified ground-floor corridor',
      'Houses both the practical Computer Lab workstations and Computer Office administration',
      'Reachable along the dedicated 2-grill Computer Lab walkway'
    ],
    hotspots: [
      {
        id: 'pcs',
        label: 'Computer Lab Workstations',
        description: 'Desktop computers for Computer Science practicals powered by solar energy.',
        xPercent: 42,
        yPercent: 52
      },
      {
        id: 'lab-office',
        label: 'Computer Office',
        description: 'IT faculty & Computer Office right beside the lab inside the same corridor.',
        xPercent: 78,
        yPercent: 42
      }
    ],
    locationNote: 'Beside Hostel · One Unified Corridor (Ground Floor)',
    mapX: 24.6,
    mapY: 30.4,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '70 m Straight · Left Grill Path',
      walkingSteps: [
        'Walk straight from the Main Gate past the Big Lawn and Principal’s Office/Chemistry line.',
        'Turn left onto the 2-grill Computer Lab path past the Big Computer Multimedia Room.',
        'Enter the Computer Lab & Computer Office right beside the Hostel in the same corridor.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 36.2, y: 30.4 },
        { x: 24.6, y: 30.4 }
      ]
    }
  },
  {
    id: 'computer-multimedia-room',
    name: 'Big Computer Multimedia Room & Smart Hall',
    shortName: 'Big Multimedia Room',
    subtitle: 'Extra-Large Smart Hall in One Corridor Beside Computer Office, Hostel & Humanities',
    category: 'Laboratories',
    stopNumber: '21',
    svgType: 'multimedia-room',
    badge: 'One Corridor · Wide Smart Hall',
    description:
      'Occupying an extra-spacious hall at the entry of the unified corridor beside the Computer Office, Computer Lab, and College Hostel—and linked directly in one corridor to Pakistan Studies, Urdu, and Physical Education below 1st-floor Commerce—the Big Computer Multimedia Room hosts HD smart projections and seminars.',
    keySpecs: [
      { label: 'Hall Size', value: 'Big Multimedia Room' },
      { label: 'Same Corridor', value: 'Comp Lab/Office, Pak Studies, Urdu, PE' },
      { label: 'Same Building', value: 'Commerce 1st Floor Above' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Extra-large Big Computer Multimedia Room right next to Computer Office & Computer Lab',
      'Shares one continuous ground-floor corridor with Pakistan Studies, Urdu & Physical Education beside Hostel',
      'Supported by rooftop solar panels mounted across every building wing'
    ],
    hotspots: [
      {
        id: 'smart-screen',
        label: 'HD Smart Screen Wall',
        description: 'High-definition interactive projection wall in the spacious multimedia hall.',
        xPercent: 50,
        yPercent: 30
      },
      {
        id: 'media-podium',
        label: 'Multimedia Control Console',
        description: 'Audio-visual switching desk for seminars and smart classes.',
        xPercent: 25,
        yPercent: 60
      }
    ],
    locationNote: 'Unified Corridor Beside Computer Office & Hostel · Solar Powered',
    mapX: 36.2,
    mapY: 30.4,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '64 m Straight · Left Grill Path',
      walkingSteps: [
        'Walk straight from the Main Gate past the Big Lawn and Chemistry/Principal line.',
        'Turn left onto the 2-grill pathway heading into the IT corridor.',
        'Enter the Big Computer Multimedia Room right alongside Computer Lab, Computer Office & Hostel.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 36.2, y: 30.4 }
      ]
    }
  },
  {
    id: 'tennis-volleyball-grounds',
    name: 'Tennis Court & Volleyball Playing Ground',
    shortName: 'Tennis & Volleyball',
    subtitle: 'Beside Hostel & Opening Directly Into Physical Education Corridor',
    category: 'Student Life',
    stopNumber: '22',
    svgType: 'sports',
    badge: 'Outdoor Courts · Beside Physical Ed.',
    description:
      'Located right alongside the College Hostel and opening directly into Physical Education along the unified ground-floor corridor, this outdoor sports arena features a marked Tennis Court and a full Volleyball Ground for inter-class tournaments and daily athletics.',
    keySpecs: [
      { label: 'Courts', value: 'Tennis & Volleyball' },
      { label: 'Next To', value: 'Physical Education Corridor' },
      { label: 'Privacy', value: 'Enclosed Girls Arena' },
      { label: 'Activities', value: 'Inter-Class Matches' }
    ],
    highlights: [
      'Marked outdoor Tennis Court for student training and matches',
      'Full-size Volleyball Ground directly adjacent beside the Hostel',
      'Connects straight into Physical Education, Urdu & Pakistan Studies'
    ],
    hotspots: [
      {
        id: 'tennis-court',
        label: 'Tennis Court',
        description: 'Marked campus tennis court for student athletics.',
        xPercent: 34,
        yPercent: 50
      },
      {
        id: 'volleyball-ground',
        label: 'Volleyball Ground',
        description: 'Dedicated outdoor volleyball ground beside the tennis court.',
        xPercent: 72,
        yPercent: 52
      }
    ],
    locationNote: 'North-West Sports Zone · Beside Hostel & Physical Education',
    mapX: 10.3,
    mapY: 8.8,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '82 m North-West',
      walkingSteps: [
        'Walk straight from the Main Gate past the Big Lawn and turn left onto the two-grill Computer Lab path.',
        'Walk along the unified corridor past Pak Studies, Urdu & Physical Education.',
        'Step out directly onto the Tennis Court & Volleyball Ground.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 30.6, y: 30.4 },
        { x: 30.6, y: 17.6 },
        { x: 10.3, y: 8.8 }
      ]
    }
  },
  {
    id: 'pak-urdu-pe',
    name: 'Department of Pakistan Studies',
    shortName: 'Pak Studies',
    subtitle: 'Separate Point in Same Corridor with Urdu, PE, Computer Lab & Big Multimedia',
    category: 'Academics',
    stopNumber: '23',
    svgType: 'academic-wing',
    badge: 'Separate Dept. · One Corridor',
    description:
      'Positioned inside the same ground-floor corridor alongside Computer Lab, Computer Office, Big Multimedia Room, Urdu, and Physical Education (directly below 1st-floor Commerce), the Department of Pakistan Studies teaches constitutional history, geography, and civic heritage.',
    keySpecs: [
      { label: 'Department', value: 'Pakistan Studies' },
      { label: 'Same Corridor', value: 'Urdu, PE, Comp Lab & Multimedia' },
      { label: '1st Floor Above', value: 'Commerce Dept. & Library' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Separate dedicated point inside the unified corridor beside the Hostel',
      'Compulsory and elective civic & historical studies classrooms',
      'Connected directly in-corridor to Urdu and Physical Education'
    ],
    hotspots: [
      {
        id: 'pak-studies-room',
        label: 'Pakistan Studies Lecture Hall',
        description: 'Classrooms for Pakistan Studies and civic heritage.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Ground Floor Same Corridor Beside Hostel · Separate Point',
    mapX: 22.9,
    mapY: 17.6,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '78 m North-West',
      walkingSteps: [
        'Walk straight along the twin grill path past the Big Lawn and turn left onto the two-grill Computer Lab corridor.',
        'Continue past the Computer Lab & Computer Office inside the same building.',
        'Enter the Department of Pakistan Studies.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 22.9, y: 30.4 },
        { x: 22.9, y: 17.6 }
      ]
    }
  },
  {
    id: 'urdu-dept',
    name: 'Department of Urdu',
    shortName: 'Urdu Dept.',
    subtitle: 'Separate Point Between Pakistan Studies & Physical Education in Same Corridor',
    category: 'Academics',
    stopNumber: '24',
    svgType: 'academic-wing',
    badge: 'Separate Dept. · One Corridor',
    description:
      'Situated centrally in the same ground-floor corridor between Pakistan Studies and Physical Education—right above Computer Lab and Big Multimedia Room and directly below 1st-floor Commerce—the Department of Urdu celebrates classical poetry, prose, and literary societies.',
    keySpecs: [
      { label: 'Department', value: 'Department of Urdu' },
      { label: 'Same Corridor', value: 'Pak Studies, PE, IT Wing' },
      { label: '1st Floor Above', value: 'Commerce Dept. & Library' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Separate dedicated map pin for the Department of Urdu inside the unified corridor',
      'Hosts Mushaira gatherings, Iqbal Day seminars, and Urdu prose studies',
      'Shares the same solar-powered building as 1st-floor Commerce'
    ],
    hotspots: [
      {
        id: 'urdu-hall',
        label: 'Urdu Literature Hall',
        description: 'Lecture rooms and literary society room for Urdu.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Ground Floor Same Corridor · Center Point',
    mapX: 30.6,
    mapY: 17.6,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '78 m North-West',
      walkingSteps: [
        'Walk straight past the Big Lawn and turn left onto the 2-grill Computer Lab path.',
        'Walk along the unified ground-floor corridor past Big Multimedia Room.',
        'Enter the Department of Urdu between Pakistan Studies and Physical Education.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 30.6, y: 30.4 },
        { x: 30.6, y: 17.6 }
      ]
    }
  },
  {
    id: 'physical-education-dept',
    name: 'Department of Physical Education',
    shortName: 'Phys. Ed.',
    subtitle: 'Separate Point Beside Urdu & Opening Directly to Tennis & Volleyball Courts',
    category: 'Academics',
    stopNumber: '25',
    svgType: 'sports',
    badge: 'Separate Dept. · Sports Hub',
    description:
      'At the upper corridor end alongside Urdu and Pakistan Studies (directly above Big Computer Multimedia Room and under 1st-floor Commerce), the Department of Physical Education coordinates athletics, inter-collegiate tournaments, and equipment for the adjacent Tennis & Volleyball grounds.',
    keySpecs: [
      { label: 'Department', value: 'Physical Education' },
      { label: 'Courts Access', value: 'Tennis & Volleyball' },
      { label: 'Same Corridor', value: 'Pak Studies, Urdu & IT Wing' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Separate dedicated point for Physical Education & Sports Faculty Office',
      'Direct corridor link onto the Tennis Court & Volleyball Ground',
      'Part of the unified solar-powered ground-floor corridor beside the Hostel'
    ],
    hotspots: [
      {
        id: 'pe-office',
        label: 'Physical Education Desk',
        description: 'Sports faculty office managing athletics and court schedules.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Ground Floor Same Corridor · Next to Sports Ground',
    mapX: 38.3,
    mapY: 17.6,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '80 m North-West',
      walkingSteps: [
        'Walk straight past the Big Lawn and turn left onto the 2-grill Computer Lab path.',
        'Proceed along the unified corridor past Big Multimedia Room and Urdu.',
        'Reach the Department of Physical Education opening toward the Tennis & Volleyball Ground.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 38.3, y: 30.4 },
        { x: 38.3, y: 17.6 }
      ]
    }
  },
  {
    id: 'commerce-dept-library',
    name: 'Commerce Department & Commerce Library (1st Floor)',
    shortName: 'Commerce & Library (1st Fl.)',
    subtitle: '1st Floor of the Same Corridor Building (Above Computer Lab, Multimedia, Pak Studies, Urdu & PE)',
    category: 'Academics',
    stopNumber: '26',
    svgType: 'library',
    badge: '1st Floor · Same Building · Solar Roof',
    description:
      'Located on the 1st Floor of the EXACT SAME building directly above the ground-floor corridor (Computer Lab, Computer Office, Big Multimedia Room, Pakistan Studies, Urdu & Physical Education) beside the Hostel, the Commerce Department and specialized Commerce Library house accounting, finance, banking, and business studies resources.',
    keySpecs: [
      { label: 'Floor & Building', value: '1st Floor · Same Building' },
      { label: 'Ground Floor Below', value: 'IT, Pak Studies, Urdu & PE Corridor' },
      { label: 'Facilities', value: 'Commerce Dept. & Library' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Situated on the 1st Floor inside the SAME building above Computer Lab/Office, Big Multimedia, Pak Studies, Urdu & PE',
      'Dedicated Commerce Library stocked with accounting, auditing, banking & business volumes',
      'Solar panel array mounted on the building rooftop powering all wings cleanly'
    ],
    hotspots: [
      {
        id: 'commerce-lib',
        label: 'Commerce Library (1st Floor)',
        description: 'Subject-specific reference library for Commerce & Accounting upstairs in the same building.',
        xPercent: 34,
        yPercent: 45
      },
      {
        id: 'commerce-halls',
        label: 'Commerce Classrooms (1st Floor)',
        description: 'Accounting, banking, and business lecture rooms directly above the ground corridor.',
        xPercent: 72,
        yPercent: 52
      }
    ],
    locationNote: '1st Floor Same Building Above Unified Corridor · Solar Powered',
    mapX: 30.7,
    mapY: 7.6,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '84 m North-West · 1st Floor Same Bldg',
      walkingSteps: [
        'Walk straight past the Big Lawn and turn left onto the two-grill corridor beside the Hostel.',
        'Walk along the unified ground-floor corridor housing Computer Lab, Computer Office, Big Multimedia, Pak Studies, Urdu & PE.',
        'Take the staircase inside the SAME building up to the 1st Floor Commerce Department & Commerce Library.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 30.7, y: 30.4 },
        { x: 30.7, y: 17.6 },
        { x: 30.7, y: 7.6 }
      ]
    }
  },
  {
    id: 'sindhi-economics-physiology-ground',
    name: 'North Big Ground & Green Lawn (Comes First)',
    shortName: 'Big Ground & Lawn (First)',
    subtitle: 'Straight Path North: Enormous Green Playing Ground & Lawn First Before Sindhi, Economics & Physiology',
    category: 'Student Life',
    stopNumber: '27',
    svgType: 'sports',
    badge: 'North Straight · Ground First',
    description:
      'Following the straight central path north past the Principal’s Office line brings you FIRST onto Zubaida College’s expansive green North Big Ground & Lawn tended by campus gardeners, immediately preceding the three separate departments of Sindhi, Economics, and Physiology.',
    keySpecs: [
      { label: 'Sequence', value: 'Comes First Walking North' },
      { label: 'Next Beyond', value: 'Sindhi, Economics, Physiology' },
      { label: 'Care Staff', value: 'Campus Lawn Gardener' },
      { label: 'Feature', value: 'Lush Green Playing Lawn' }
    ],
    highlights: [
      'Expansive green lawn and enclosed playing ground encountered FIRST walking straight north',
      'Maintained by college gardeners with shaded trees',
      'Directly in front of Sindhi, Economics, and Physiology departments'
    ],
    hotspots: [
      {
        id: 'big-ground-north',
        label: 'North Big Ground & Lawn',
        description: 'Spacious enclosed green lawn encountered first straight ahead.',
        xPercent: 50,
        yPercent: 55
      }
    ],
    locationNote: 'North Straight Campus · Ground Comes First Before Northern Depts.',
    mapX: 53.7,
    mapY: 17.8,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '80 m Straight North',
      walkingSteps: [
        'Walk straight from the Main Gate along the twin grill paths past Clerk Office & Principal’s Office line.',
        'Continue straight north onto the Big Ground & Green Lawn FIRST.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 42.1 },
        { x: 53.7, y: 17.8 }
      ]
    }
  },
  {
    id: 'sindhi-dept',
    name: 'Department of Sindhi',
    shortName: 'Sindhi',
    subtitle: 'Beyond North Big Ground · Separate Point for Sindhi Literature & Language',
    category: 'Academics',
    stopNumber: '28',
    svgType: 'academic-wing',
    badge: 'Separate Dept. · Beyond Ground',
    description:
      'Located immediately beyond the North Big Ground & Lawn on the northern campus wing, the Department of Sindhi preserves and teaches Sindhi language, Shah Abdul Latif Bhittai’s poetry, classical prose, and regional literary research.',
    keySpecs: [
      { label: 'Department', value: 'Department of Sindhi' },
      { label: 'Before It', value: 'North Big Ground (First)' },
      { label: 'Next Beside', value: 'Dept. of Economics' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Separate dedicated point & lecture room for the Department of Sindhi beyond the ground',
      'Classical Sindhi literature, Latifiyat seminars, and undergraduate programs',
      'Solar-equipped northern academic block'
    ],
    hotspots: [
      {
        id: 'sindhi-hall',
        label: 'Sindhi Lecture Hall',
        description: 'Dedicated classrooms for Sindhi literature & language.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'North Wing Beyond Ground · Separate Dept.',
    mapX: 46.8,
    mapY: 7.2,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '92 m Straight North',
      walkingSteps: [
        'Walk straight north past the Principal’s Office line onto the North Big Ground FIRST.',
        'Cross the ground straight ahead to reach the Department of Sindhi.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 17.8 },
        { x: 46.8, y: 7.2 }
      ]
    }
  },
  {
    id: 'economics-dept',
    name: 'Department of Economics',
    shortName: 'Economics',
    subtitle: 'Beyond North Big Ground · Between Sindhi & Physiology',
    category: 'Academics',
    stopNumber: '29',
    svgType: 'academic-wing',
    badge: 'Separate Dept. · Beyond Ground',
    description:
      'Situated right beside Sindhi beyond the North Big Ground, the Department of Economics teaches microeconomics, macroeconomics, development economics, and economic policy of Pakistan across Intermediate, Associate Degree, and Commerce programs.',
    keySpecs: [
      { label: 'Department', value: 'Department of Economics' },
      { label: 'Between', value: 'Sindhi & Physiology' },
      { label: 'Before It', value: 'North Big Ground (First)' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Separate dedicated point & classrooms for the Department of Economics',
      'Micro/macro theory and Pakistan development studies beyond the North Big Ground',
      'Mounted with rooftop solar arrays cleanly powering classrooms'
    ],
    hotspots: [
      {
        id: 'econ-hall',
        label: 'Economics Lecture Hall',
        description: 'Classrooms for Microeconomics, Macroeconomics & Development Studies.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'North Wing Beyond Ground · Separate Dept.',
    mapX: 53.5,
    mapY: 7.2,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '92 m Straight North',
      walkingSteps: [
        'Walk straight north past the Principal’s Office line onto the North Big Ground FIRST.',
        'Cross the ground directly ahead to reach the Department of Economics.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 17.8 },
        { x: 53.5, y: 7.2 }
      ]
    }
  },
  {
    id: 'physiology-dept',
    name: 'Department of Physiology',
    shortName: 'Physiology',
    subtitle: 'Beyond North Big Ground · Adjacent to Economics on the Northern Wing',
    category: 'Laboratories',
    stopNumber: '30',
    svgType: 'science-lab',
    badge: 'Separate Dept. · Beyond Ground',
    description:
      'Completing the northern academic row beyond the Big Ground beside Economics is the Department of Physiology—supporting our distinctive Associate Degree in Physiology & Health Sciences (ADS) with physiological models, blood-pressure/hematology apparatus, and Pre-Medical foundations.',
    keySpecs: [
      { label: 'Department', value: 'Department of Physiology' },
      { label: 'Program', value: 'AD Physiology & Health (ADS)' },
      { label: 'Before It', value: 'North Big Ground (First)' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Separate dedicated point & practical room for the Department of Physiology',
      'Supports Zubaida College’s specialized Physiology & Health Sciences degree track',
      'Equipped with rooftop solar panels like all campus wings'
    ],
    hotspots: [
      {
        id: 'physiology-lab',
        label: 'Physiology Practical Lab',
        description: 'Hematology, anatomical physiology charts, and diagnostic models.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'North Wing Beyond Ground · Separate Dept.',
    mapX: 60.5,
    mapY: 7.2,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '93 m Straight North',
      walkingSteps: [
        'Walk straight north past the Principal’s Office line onto the North Big Ground FIRST.',
        'Cross the ground past Economics to enter the Department of Physiology.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 17.8 },
        { x: 60.5, y: 7.2 }
      ]
    }
  }
];
