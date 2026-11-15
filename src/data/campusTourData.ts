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
    label: 'Passing Canteen & Central Library (Walking Distance) → Big Clerk Corridor Ahead',
    leftView: 'Waiting Room Courtyard & West Garden Lawn',
    aheadView: 'Big Clerk Office & Corridor straight ahead BEFORE Garden & Gardeners',
    rightView: 'Canteen & Central Library passed · Big Clerk Office Corridor on right before Garden'
  },
  {
    progress: 0.56,
    label: 'Big Clerk Office Corridor on Right (Before Garden & Gardeners)',
    leftView: 'West Garden Lawn & Central Courtyard ahead',
    aheadView: 'Garden & Gardeners & Principal’s Office / Chemistry Lab line ahead',
    rightView: 'Big Clerk Office Corridor on right directly BEFORE Garden & Gardeners'
  },
  {
    progress: 0.80,
    label: 'Passing Garden & Gardeners Toward Principal & Chemistry Line',
    leftView: 'Central Courtyard, Small Garden & Left 2-Grill Path · Tennis & Volleyball Left of Pak Studies',
    aheadView: 'Assembly, Zoology & Botany Lab → Straight Long Path → Ground → Garden → Straight Long Corridor (Sindhi, Physiology, Economics, Geography, Psychology)',
    rightView: 'Garden & Gardeners · Principal’s Office, Chemistry Lab, Stairs & Auditorium right'
  },
  {
    progress: 1,
    label: 'Arrived at Grand Golden Principal’s Office (Path to Auditorium Hall & 6 Depts By Stairs)',
    leftView: 'Central Courtyard Promenade, Small Garden, Computer Lab & Tennis/Volleyball Left of Pak Studies',
    aheadView: 'Straight north: Assembly, Zoology & Botany Lab → Straight Long Path → Ground → Garden → Straight Long Corridor (Sindhi, Physiology, Economics, Geography)',
    rightView: 'Principal’s Office → Chemistry Lab → Stairs (↑ 6 Depts: Staff Room, Islamiat, English, Stats, Maths, Physics) → Path to Auditorium Hall'
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
      'Enter Government Girls Zubaida College through the Security-monitored 1953 Main Gate inside the Golden Boundary Wall on Pathan Colony Road. Immediately on your left is the Waiting Room and on your right is the College Canteen with the Central Library directly on the right of the Canteen (outside the golden wall sits Central Jail & Signal Jammers). Walking straight along the twin grill paths across the walking distance brings you first to the Big Clerk Office Corridor, and then to the Garden & Gardeners right before Principal’s Office & Chemistry Office and Lab.',
    keySpecs: [
      { label: 'Security', value: '24/7 Gate Guards' },
      { label: 'Entrance Left', value: 'Waiting Room' },
      { label: 'Entrance Right', value: 'Canteen → Central Library' },
      { label: 'Straight Path', value: 'Big Clerk Corridor → Garden' }
    ],
    highlights: [
      'Gate Security Cabin & uniformed security guards stationed inside the Golden Boundary Wall',
      'First on your left upon entering: Visitor Waiting Room',
      'On your right at entrance: Canteen & Central Library; walking straight reaches Big Clerk Office Corridor BEFORE Garden & Gardeners'
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
        'Walk straight along the twin grill path across the walking distance to the Big Clerk Office Corridor BEFORE the Garden & Gardeners.',
        'Pass the Garden & Gardeners into the Principal & Chemistry Office/Lab Corridor and Auditorium Hall.'
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
      'Walking straight past Canteen leads across the walking distance to the Big Clerk Office Corridor before the Garden'
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
    subtitle: 'Big Clerk Office Corridor Before Garden & Gardeners · Straight Past Walking Distance',
    category: 'Administration',
    stopNumber: '04',
    svgType: 'principal-office',
    badge: 'Big Corridor · Before Garden',
    description:
      'Walking straight along the twin-grill path past the Canteen and across the extended walking distance brings you first into the spacious Big Clerk Office & Big Clerk Office Corridor on the right—situated directly BEFORE the lush Garden & Gardeners that lead up to Principal’s Office & Chemistry Office and Lab.',
    keySpecs: [
      { label: 'Corridor', value: 'Big Clerk Office Corridor' },
      { label: 'Approach', value: 'Before Garden (Past Walking Distance)' },
      { label: 'Office Hours', value: '8:00 AM – 2:00 PM' },
      { label: 'Services', value: 'Records & Verification' }
    ],
    highlights: [
      'Wide colonnaded Big Clerk Office Corridor encountered immediately past the walking distance from Canteen',
      'Positioned on the right directly BEFORE the Garden & Gardeners and Principal’s Office line',
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
        description: 'Covered veranda corridor positioned before Garden & Gardeners leading up to Principal’s Office.',
        xPercent: 72,
        yPercent: 68
      }
    ],
    locationNote: 'Before Garden · Right of Corridor Past Walking Distance',
    mapX: 70.0,
    mapY: 63.2,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '32 m Straight · Before Garden',
      walkingSteps: [
        'Enter Main Gate (Canteen & Central Library on your right) and walk across the walking distance.',
        'Turn right immediately into the Big Clerk Office Corridor (located directly before Garden & Gardeners).',
        'Access Student Records & Admissions Windows inside the Big Clerk Office.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 68.3 },
        { x: 70.0, y: 68.3 },
        { x: 70.0, y: 63.2 }
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
    name: 'Garden (After Clerk) & Twin Grill Paths',
    shortName: 'Garden & Twin Grill',
    subtitle: 'Garden & Gardeners After Big Clerk Office Corridor · Before Principal & Chemistry Line',
    category: 'Student Life',
    stopNumber: '06',
    svgType: 'courtyard',
    badge: 'After Clerk Office · Right of Corridor',
    description:
      'Along the central twin paths divided by a small iron grill, passing past the Big Clerk Office Corridor brings you to the lush green Garden tended by college gardeners on the right side—situated directly AFTER Big Clerk Office and right before Principal’s Office & Chemistry Office/Lab.',
    keySpecs: [
      { label: 'Garden Spot', value: 'After Big Clerk Office' },
      { label: 'Pathway', value: 'Two Grill-Divided Paths' },
      { label: 'Care Staff', value: 'Campus Gardeners' },
      { label: 'Next Ahead', value: 'Principal’s Office & Chem Lab' }
    ],
    highlights: [
      'Expansive Garden tended by college gardeners appears AFTER the Big Clerk Office Corridor',
      'Two clean parallel walkways separated by a small central iron grill',
      'Leads directly up to Principal’s Office, Chemistry Lab & Stairs'
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
        label: 'Garden & Gardeners (After Clerk)',
        description: 'Expansive green lawn, shaded trees, and flowerbeds tended by gardeners after Clerk Office.',
        xPercent: 75,
        yPercent: 55
      }
    ],
    locationNote: 'Central Spine · Garden on Right After Big Clerk Office Corridor',
    mapX: 50,
    mapY: 53.6,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '46 m Straight · After Clerk Office',
      walkingSteps: [
        'Enter Main Gate (Security) with Canteen & Central Library on right and Waiting Room on left.',
        'Walk straight along the twin paths separated by the small grill past the walking distance and Big Clerk Office Corridor.',
        'Reach the lush Garden & Gardeners on your right directly AFTER Big Clerk Office Corridor.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 53.6 }
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
    mapX: 69.4,
    mapY: 41.9,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '58 m Straight · Right',
      walkingSteps: [
        'Walk straight along the twin grill paths past Big Clerk Office Corridor and the Garden.',
        'Turn right past the Golden Principal’s Office along the same line.',
        'Enter the Chemistry Lab & Office immediately before the Stairs and Auditorium Hall.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 69.4, y: 41.9 }
      ]
    }
  },
  {
    id: 'auditorium-hall',
    name: 'College Auditorium Hall',
    shortName: 'Auditorium Hall',
    subtitle: 'Upper-Right Wing · Dedicated Path from Principal’s Office Past Chemistry Lab & Stairs',
    category: 'Student Life',
    stopNumber: '08',
    svgType: 'auditorium',
    badge: 'Dedicated Path from Principal',
    description:
      'Located beside the 6-department By-Stairs 1st-Floor wing, the College Auditorium Hall is reached via a dedicated walking corridor directly from the Principal’s Office past Chemistry Lab and the Stairs.',
    keySpecs: [
      { label: 'Seating', value: '600+ Attendees' },
      { label: 'Position', value: 'Right of 1st-Fl By-Stairs Wing' },
      { label: 'Direct Access', value: 'Path from Principal’s Office' },
      { label: 'East Corridor', value: 'Sindhi, Economics & Physiology' }
    ],
    highlights: [
      'Connected directly by a marked walking path from Principal’s Office past Chemistry Lab & Stairs',
      'Positioned cleanly right of the 6-department By-Stairs 1st-Floor Building',
      'Spacious ceremonial hall for convocation, debates, and academic gatherings'
    ],
    hotspots: [
      {
        id: 'podium',
        label: "Principal's Podium",
        description: 'Formal ceremonial stage lectern directly connected from Principal’s Office.',
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
    locationNote: 'Upper-Right Wing · Direct Path from Principal’s Office',
    mapX: 83.8,
    mapY: 25.0,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '72 m · Path from Principal Office',
      walkingSteps: [
        'Walk straight along the twin grill paths past Big Clerk Office Corridor and the Garden to the Principal’s Office.',
        'Follow the dedicated Principal-to-Auditorium path east past Chemistry Lab & the Stairs in between.',
        'Turn straight up into the College Auditorium Hall.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 58.8, y: 41.9 },
        { x: 83.8, y: 41.9 },
        { x: 83.8, y: 25.0 }
      ]
    }
  },
  {
    id: 'principal-office',
    name: 'Principal’s Office & Executive Suite',
    shortName: 'Principal’s Office',
    subtitle: 'Grand Golden Landmark · Direct Path to Auditorium Hall & Stairs to 6 Departments',
    category: 'Administration',
    stopNumber: '09',
    svgType: 'principal-office',
    badge: 'Executive Suite · Path to Auditorium',
    description:
      'Walking straight past Big Clerk Office Corridor and the Garden & Gardeners brings you to the prominent Golden Principal’s Office—the executive office of Principal Prof. Yasmeen Panhwar—with a direct marked corridor running east past Chemistry Lab & the central Stairs straight into the Auditorium Hall.',
    keySpecs: [
      { label: 'Principal', value: 'Prof. Yasmeen Panhwar' },
      { label: 'Direct Path', value: 'To Auditorium Hall → ↑' },
      { label: 'By Stairs (6)', value: 'Staff Room, Islamiat, English, Stats, Maths, Physics' },
      { label: 'Office Hours', value: '8:00 AM – 2:00 PM' }
    ],
    highlights: [
      'Positioned prominently right past Big Clerk Office Corridor and the Garden & Gardeners',
      'Direct marked walkway leads from Principal’s Office past Chemistry Lab & Stairs straight up to Auditorium Hall',
      'Stairs in between lead up to all 6 adjusted 1st-floor suites: General Staff Room, Islamiat & Islamic Culture, English, Statistics (before Dark Room), Mathematics & Physics Lab/Office/Dark Room'
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
    locationNote: 'Right Side · Direct Path East to Auditorium Hall & Stairs to 6 Depts.',
    mapX: 58.8,
    mapY: 41.9,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '58 m Straight · Right',
      walkingSteps: [
        'Enter Main Gate (Canteen & Central Library on your right) and walk straight past the walking distance.',
        'Pass the Big Clerk Office Corridor and Garden & Gardeners.',
        'Turn right into the grand Golden Principal’s Office, with the direct path east to Auditorium Hall.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 53.6 },
        { x: 50, y: 41.9 },
        { x: 58.8, y: 41.9 }
      ]
    }
  },
  {
    id: 'general-staff-room',
    name: 'General Staff Room (By Stairs · 1st Floor)',
    shortName: 'General Staff Room',
    subtitle: 'By Stairs (1st Floor) · Adjusted with Physics, English, Maths, Statistics & Islamiat',
    category: 'Administration',
    stopNumber: '10',
    svgType: 'academic-wing',
    badge: 'By Stairs · 1st Floor',
    description:
      'Climbing the central Stairs beside Chemistry Lab brings you up into the adjusted 1st-Floor wing housing all six By-Stairs departments: General Staff Room, English Classes, Physics Lab/Office/Dark Room, Islamiat & Islamic Culture, Statistics, and Mathematics.',
    keySpecs: [
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Wing Neighbors', value: 'English, Physics, Islamiat, Stats, Maths' },
      { label: 'Below', value: 'Principal’s Office & Chem Lab' },
      { label: 'Purpose', value: 'Faculty Lounge Suite' }
    ],
    highlights: [
      'Positioned inside the unified 1st-Floor Building clearly accessed By Stairs',
      'Grouped together with Islamiat & Islamic Culture, English, Statistics, Mathematics & Physics Lab/Office/Dark Room',
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
    locationNote: '1st Floor Building (By Stairs) · Beside English Classes',
    mapX: 54.7,
    mapY: 30.0,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '70 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office and Chemistry Lab to the central Stairs.',
        'Climb the Stairs up to the 1st Floor Building housing all 6 adjusted departments.',
        'Walk past Statistics and Physics into the General Staff Room.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 76.8, y: 41.9 },
        { x: 76.8, y: 27.9 },
        { x: 54.7, y: 27.9 },
        { x: 54.7, y: 30.0 }
      ]
    }
  },
  {
    id: 'islamiat-english',
    name: 'Department of Islamiat & Islamic Culture (By Stairs · 1st Floor)',
    shortName: 'Islamiat & Culture',
    subtitle: 'By Stairs (1st Floor) · Adjusted Beside Mathematics & Above Staff Room / English',
    category: 'Academics',
    stopNumber: '11',
    svgType: 'academic-wing',
    badge: 'By Stairs · 1st Floor',
    description:
      'Adjusted into the 1st-Floor wing reached directly via the central Stairs alongside General Staff Room, Statistics, Mathematics, English Classes, and Physics Lab/Office/Dark Room, the Department of Islamiat & Islamic Culture hosts Quranic, Hadith, and Islamic heritage classes.',
    keySpecs: [
      { label: 'Department', value: 'Islamiat & Islamic Culture' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Adjacent To', value: 'Mathematics & Staff Room' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Adjusted into the unified 6-department 1st-Floor Building reached By Stairs',
      'Right above General Staff Room & English Classes beside Mathematics',
      'Hosts annual Seerat-un-Nabi and Qirat academic seminars'
    ],
    hotspots: [
      {
        id: 'islamiat-room',
        label: 'Islamiat & Islamic Culture Hall',
        description: 'Dedicated 1st-floor lecture rooms for Islamic Studies & Culture.',
        xPercent: 50,
        yPercent: 48
      }
    ],
    locationNote: '1st Floor Building (By Stairs) · Above Staff Room Beside Mathematics',
    mapX: 59.4,
    mapY: 17.9,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '72 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office and Chemistry Lab to the central Stairs.',
        'Climb the Stairs up to the upper tier of the 1st Floor Building.',
        'Walk past Mathematics into Islamiat & Islamic Culture.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 76.8, y: 41.9 },
        { x: 76.8, y: 17.9 },
        { x: 59.4, y: 17.9 }
      ]
    }
  },
  {
    id: 'english-dept',
    name: 'English Classes & Department of English (By Stairs · 1st Floor)',
    shortName: 'English Classes',
    subtitle: 'By Stairs (1st Floor) · Between General Staff Room & Largest Physics Department',
    category: 'Academics',
    stopNumber: '12',
    svgType: 'academic-wing',
    badge: 'By Stairs · 1st Floor',
    description:
      'Located inside the 1st-Floor Building reached directly By Stairs—right between the General Staff Room and the expansive Physics Department (Lab/Office/Dark Room)—the English Classes teach composition, prose, poetry, and academic communication across HSC and Degree cohorts.',
    keySpecs: [
      { label: 'Department', value: 'English Classes' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Between', value: 'Staff Room & Physics Dept.' },
      { label: 'Focus', value: 'Literature & Rhetoric' }
    ],
    highlights: [
      'Dedicated English lecture classes inside the By-Stairs 1st-Floor Building',
      'Direct access via the central Stairs between Chemistry Lab and Auditorium path',
      'Adjacent to General Staff Room and the largest Physics Department row'
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
    locationNote: '1st Floor Building (By Stairs) · Between Staff Room & Physics Dept.',
    mapX: 59.0,
    mapY: 25.5,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '68 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office and Chemistry Lab to the Stairs.',
        'Climb the Stairs up to the 1st Floor Building.',
        'Enter English Classes right beside the large Physics Department and General Staff Room.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 76.8, y: 41.9 },
        { x: 76.8, y: 25.5 },
        { x: 59.0, y: 25.5 }
      ]
    }
  },
  {
    id: 'statistics-mathematics',
    name: 'Department of Statistics (By Stairs · 1st Floor)',
    shortName: 'Statistics Dept.',
    subtitle: 'By Stairs (1st Floor) · Directly Before Dark Room & Right at Top of Stairs',
    category: 'Academics',
    stopNumber: '13',
    svgType: 'academic-wing',
    badge: 'By Stairs · Before Dark Room',
    description:
      'Positioned inside the 1st-Floor Building reached directly By Stairs—immediately BEFORE the Physics Dark Room and right alongside the Physics Department—the Department of Statistics teaches probability, biostatistics, sampling theory, and economic data analysis for ICS, Commerce, and Science students.',
    keySpecs: [
      { label: 'Department', value: 'Statistics' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Position', value: 'Immediately Before Dark Room' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Positioned right at the top of the Stairs immediately BEFORE the Dark Room',
      'Stands in the 1st-floor row directly beside Physics Office/Lab and Dark Room',
      'Covers applied probability, statistical inference, and quantitative analysis'
    ],
    hotspots: [
      {
        id: 'stats-room',
        label: 'Statistics Lecture Room',
        description: 'Dedicated 1st-floor room right before Dark Room for probability & data analysis.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: '1st Floor Building (By Stairs) · Directly Before Dark Room',
    mapX: 74.7,
    mapY: 25.5,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '65 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office and Chemistry Lab to the central Stairs.',
        'Climb the Stairs straight up to the 1st Floor Building.',
        'Arrive immediately at the Department of Statistics directly before Dark Room.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 76.8, y: 41.9 },
        { x: 76.8, y: 25.5 },
        { x: 74.7, y: 25.5 }
      ]
    }
  },
  {
    id: 'mathematics-dept',
    name: 'Department of Mathematics (By Stairs · 1st Floor)',
    shortName: 'Mathematics Dept.',
    subtitle: 'By Stairs (1st Floor) · Beside Islamiat Above Physics, Statistics & Dark Room',
    category: 'Academics',
    stopNumber: '14',
    svgType: 'academic-wing',
    badge: 'By Stairs · 1st Floor',
    description:
      'Adjusted into the unified By-Stairs 1st-Floor Building right above Physics, Statistics & Dark Room and beside Islamiat, the Department of Mathematics conducts Pre-Engineering, ICS, and Associate Degree lectures.',
    keySpecs: [
      { label: 'Department', value: 'Mathematics' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Beside', value: 'Islamiat & Auditorium Hall' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Adjusted right inside the 6-department 1st-Floor Building reached By Stairs',
      'Shares the By-Stairs wing with Statistics (before Dark Room), Islamiat, General Staff Room, English & Physics',
      'Prepares students for BISE Engineering honors and university STEM degrees'
    ],
    hotspots: [
      {
        id: 'math-room',
        label: 'Mathematics Classrooms',
        description: 'Pure & applied mathematics classrooms at the top of the 1st-Floor Stairs.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: '1st Floor Building (By Stairs) · Above Physics, Statistics & Dark Room',
    mapX: 73.2,
    mapY: 17.9,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '68 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office and Chemistry Lab to the central Stairs.',
        'Climb the Stairs straight up to the upper tier of the 1st Floor Building.',
        'Step directly into the Department of Mathematics beside Islamiat.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 76.8, y: 41.9 },
        { x: 76.8, y: 17.9 },
        { x: 73.2, y: 17.9 }
      ]
    }
  },
  {
    id: 'physics-lab-darkroom',
    name: 'Physics Department (Physics Lab, Physics Office & Dark Room)',
    shortName: 'Physics Dept. & Dark Room',
    subtitle: 'Largest Campus Department · By Stairs in Row with English, Staff Room & Statistics Before Dark Room',
    category: 'Laboratories',
    stopNumber: '15',
    svgType: 'science-lab',
    badge: 'Largest Dept. · By Stairs (1st Fl)',
    description:
      'Spanning the largest departmental footprint on campus right in its 1st-Floor row beside English Classes and General Staff Room (with Statistics positioned immediately before the Optics Dark Room at the right end of the wing), the Physics Department houses the expansive Physics Practical Laboratory, dedicated Physics Faculty Office, and light-sealed Dark Room.',
    keySpecs: [
      { label: 'Scale', value: 'Largest Department on Campus' },
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Sections', value: 'Physics Lab · Office · Dark Room' },
      { label: 'Row With', value: 'English, Staff Room & Stats Before Dark Room' }
    ],
    highlights: [
      'Largest single department wing on campus, prominently spanning the lower tier of the 1st-Floor By-Stairs Building',
      'Houses Physics Practical Lab & Physics Faculty Office beside English Classes, with Statistics right before the Optics Dark Room',
      'Accessible directly via the central Stairs between Chemistry Lab and the Auditorium path'
    ],
    hotspots: [
      {
        id: 'physics-lab-bench',
        label: 'Physics Practical Hall',
        description: 'Expansive electrical bridges, pendulums, and mechanics apparatus hall.',
        xPercent: 25,
        yPercent: 52
      },
      {
        id: 'physics-office-room',
        label: 'Physics Office',
        description: 'Physics department faculty office & apparatus store beside Physics Lab.',
        xPercent: 55,
        yPercent: 52
      },
      {
        id: 'optics-dark-room',
        label: 'Physics Optics Dark Room',
        description: 'Light-controlled chamber right after Statistics Dept. for optical bench & prism practicals.',
        xPercent: 85,
        yPercent: 52
      }
    ],
    locationNote: '1st Floor Building (By Stairs) · Largest Dept. in Row with English & Staff Room',
    mapX: 66.9,
    mapY: 30.0,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '66 m · By Stairs (1st Floor)',
      walkingSteps: [
        'Walk past Principal’s Office and Chemistry Lab to the central Stairs.',
        'Climb the Stairs straight up into the 1st Floor Building (passing Statistics before Dark Room).',
        'Step directly into the expansive Physics Department (Lab, Office & Dark Room) beside English Classes.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 76.8, y: 41.9 },
        { x: 76.8, y: 27.9 },
        { x: 66.9, y: 27.9 },
        { x: 66.9, y: 30.0 }
      ]
    }
  },
  {
    id: 'greenhouse-prayer-ground',
    name: 'Assembly Ground, Flag Hoisting, Greenhouse & Prayer Room',
    shortName: 'Assembly & Flag',
    subtitle: 'Before Zoology & Botany Labs · Morning Assembly, Flag Hoisting, Lawn & Prayer Room',
    category: 'Student Life',
    stopNumber: '16',
    svgType: 'courtyard',
    badge: 'Before Zoology · Assembly & Flag',
    description:
      'Directly before the Zoology and Botany departments along the northern campus wing sits the Morning Assembly & Flag Hoisting Ground with its flagpole and dais, alongside the green Garden Lawn, Botanical Greenhouse, and quiet Prayer Room (Namaz Hall).',
    keySpecs: [
      { label: 'Main Feature', value: 'Assembly & Flag Hoisting' },
      { label: 'Garden & Ground', value: 'Green Lawn & Greenhouse' },
      { label: 'Facility', value: 'Prayer Room (Namaz Hall)' },
      { label: 'Next Ahead', value: 'Zoology & Botany → Long Distance' }
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
    locationNote: 'North Wing · Assembly Ground Before Zoology & Botany',
    mapX: 48.3,
    mapY: 7.6,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '82 m North',
      walkingSteps: [
        'Walk straight across the twin grill spine past Principal’s Office line toward the northern row.',
        'Arrive at the Assembly & Flag Hoisting Ground, Lawn, Greenhouse & Prayer Room right before Zoology & Botany.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 48.3, y: 7.6 }
      ]
    }
  },
  {
    id: 'zoology-botany-labs',
    name: 'Department of Zoology & Zoology Lab',
    shortName: 'Zoology Lab',
    subtitle: 'Right Past Assembly & Flag Ground · Pre-Medical & BS Zoology',
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
      { label: 'After Next', value: 'Botany Lab → Long Distance' }
    ],
    highlights: [
      'Separate dedicated point & laboratory wing for Zoology & BS Zoology',
      'Equipped with high-power compound microscopes, dissection stations & specimens',
      'Followed by Botany Lab and then a Long Distance walkway to Ground & Garden'
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
    locationNote: 'North Wing · Past Assembly & Flag Ground (Before Long Distance)',
    mapX: 57.2,
    mapY: 7.6,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '86 m North-East',
      walkingSteps: [
        'Walk straight from the Main Gate past the Garden and Principal’s Office line.',
        'Proceed north through the Assembly & Flag Hoisting Ground.',
        'Enter the Department of Zoology & Zoology Lab.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 48.3, y: 7.6 },
        { x: 57.2, y: 7.6 }
      ]
    }
  },
  {
    id: 'botany-dept-lab',
    name: 'Department of Botany & Botany Lab',
    shortName: 'Botany Lab',
    subtitle: 'Beside Zoology Lab · Followed by Straight Long Path to Ground, Garden & Straight Long Corridor',
    category: 'Laboratories',
    stopNumber: '18',
    svgType: 'science-lab',
    badge: 'Before Straight Long Path · Botany Lab',
    description:
      'Beside Zoology sits the dedicated Department of Botany and Botany Laboratory—housing a curated Sindh regional herbarium, plant anatomy slides, and botanical charts. Directly past Botany Lab, a paved Straight Long Path leads east to the Playing Ground and Garden, opening into the Straight Long Corridor housing Sindhi, Physiology, Economics, Geography, and Psychology.',
    keySpecs: [
      { label: 'Department', value: 'Botany & Botany Lab' },
      { label: 'Adjacent To', value: 'Zoology & Zoo Lab' },
      { label: 'After It', value: 'Straight Long Path → Ground → Garden' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Separate dedicated point & lab for Botany, plant taxonomy, and physiology',
      'Herbarium specimen collections and botanical slide microscopy hall',
      'Starts the Straight Long Path directly leading to Ground, Garden & Straight Long Corridor (Sindhi, Physiology, Economics, Geography)'
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
    locationNote: 'North Wing · Right Past Zoology (Start of Straight Long Path)',
    mapX: 65.0,
    mapY: 7.6,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '90 m North-East',
      walkingSteps: [
        'Walk straight past the Garden and Principal’s Office line.',
        'Bear right past Assembly & Flag Ground and Zoology & Zoo Lab.',
        'Enter the Department of Botany & Botany Lab right at the start of the Straight Long Path.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 48.3, y: 7.6 },
        { x: 65.0, y: 7.6 }
      ]
    }
  },
  {
    id: 'hostel-computer-lab',
    name: 'College Hostel (Main Residential Block)',
    shortName: 'College Hostel',
    subtitle: 'Below Small Garden & Computer Lab · Above West Garden Lawn & Straight N-W Trees Line',
    category: 'Student Life',
    stopNumber: '19',
    svgType: 'courtyard',
    badge: 'Below Small Garden · Above West Garden',
    description:
      'Positioned cleanly between the Small Garden & Computer Department above and West Garden Lawn & Trees below—along the Straight North-West Trees line—Government Girls Zubaida College’s large solar-equipped Residential Hostel gives students quiet, green views.',
    keySpecs: [
      { label: 'Location', value: 'Below Small Garden & Comp Lab' },
      { label: 'Scale', value: 'Large Residential Block' },
      { label: 'Below It', value: 'West Garden Lawn & Trees' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Positioned right below the Small Garden & Computer Lab and directly above West Garden Lawn & Trees',
      'Bordered on the west by the Straight North-West Trees line',
      'Expansive multi-wing girls hostel equipped with rooftop solar panels'
    ],
    hotspots: [
      {
        id: 'hostel-courtyard',
        label: 'Hostel Residential Wings',
        description: 'Large secure student hostel complex between Small Garden and West Garden Lawn.',
        xPercent: 46,
        yPercent: 48
      },
      {
        id: 'hostel-warden',
        label: 'Warden & Study Hall',
        description: 'Supervised hostel study room and warden office overlooking West Garden & Small Garden.',
        xPercent: 75,
        yPercent: 62
      }
    ],
    locationNote: 'West Campus · Below Small Garden & Computer Lab · Above West Garden',
    mapX: 17.1,
    mapY: 55.4,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '58 m Straight · Left Above West Garden',
      walkingSteps: [
        'Walk straight from the Main Gate past the Waiting Room, West Garden Lawn, and Clerk Office Corridor.',
        'Turn left cleanly above West Garden Lawn (below the Small Garden & Computer Lab).',
        'Arrive at the Big College Hostel connected to the Straight North-West Trees line.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 58.3 },
        { x: 32.0, y: 58.3 },
        { x: 17.1, y: 55.4 }
      ]
    }
  },
  {
    id: 'computer-lab',
    name: 'Computer Department · Computer Lab & Computer Office',
    shortName: 'Computer Lab & Office',
    subtitle: 'Computer Department · Directly Behind Small Garden (with Big Multimedia, Pak Studies, Urdu & Physical Education)',
    category: 'Laboratories',
    stopNumber: '20',
    svgType: 'computer-lab',
    badge: 'Computer Department · Past Small Garden',
    description:
      'Part of the labeled Computer Department wing positioned right behind the Small Garden (before Computer Lab) in one continuous ground-floor corridor—alongside Big Computer Multimedia Room, Pakistan Studies, Urdu, and Physical Education (under 1st-floor Commerce)—the Computer Lab & Computer Office feature modern desktop terminals and solar-backed power.',
    keySpecs: [
      { label: 'Department', value: 'Computer Department' },
      { label: 'Before Entry', value: 'Small Garden' },
      { label: 'Same Corridor', value: 'Big Multimedia, Pak Studies, Urdu, Physical Education' },
      { label: 'Energy', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Labeled Computer Department wing directly preceded by the lush Small Garden before Computer Lab',
      'Situated in one unified ground-floor corridor with Pak Studies, Urdu & Physical Education',
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
        description: 'IT faculty & Computer Office right beside the lab inside the Computer Department.',
        xPercent: 78,
        yPercent: 42
      }
    ],
    locationNote: 'Computer Department · Directly Past Small Garden · Unified Ground Corridor',
    mapX: 24.8,
    mapY: 28.8,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '70 m Straight · Left Grill Path',
      walkingSteps: [
        'Walk straight from the Main Gate past the Garden, Clerk Corridor, and Principal’s Office line.',
        'Turn left onto the 2-grill Computer Lab path (passing right beside the Small Garden before Computer Lab).',
        'Enter the Computer Lab & Computer Office beside Big Multimedia Room.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 36.1, y: 30.4 },
        { x: 24.8, y: 28.8 }
      ]
    }
  },
  {
    id: 'computer-multimedia-room',
    name: 'Computer Department · Big Computer Multimedia Room & Smart Hall',
    shortName: 'Big Multimedia Room',
    subtitle: 'Computer Department · Extra-Large Smart Hall Beside Computer Lab & Office, Hostel & Humanities',
    category: 'Laboratories',
    stopNumber: '21',
    svgType: 'multimedia-room',
    badge: 'Computer Department · Wide Smart Hall',
    description:
      'Housed inside the Computer Department at the entry of the unified corridor beside Computer Office & Computer Lab and just above the College Hostel—and linked directly in one corridor to Pakistan Studies, Urdu, and Physical Education below 1st-floor Commerce (reached via Stairs)—the Big Computer Multimedia Room hosts HD smart projections and seminars.',
    keySpecs: [
      { label: 'Department', value: 'Computer Department' },
      { label: 'Same Corridor', value: 'Comp Lab/Office, Pak Studies, Urdu, Physical Education' },
      { label: 'Same Building', value: 'Commerce 1st Floor (By Stairs)' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Extra-large Big Computer Multimedia Room inside the labeled Computer Department wing',
      'Shares one continuous ground-floor corridor with Pakistan Studies, Urdu & Physical Education above Hostel',
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
    locationNote: 'Computer Department · Unified Corridor Above Hostel · Solar Powered',
    mapX: 36.1,
    mapY: 28.8,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '64 m Straight · Left Grill Path',
      walkingSteps: [
        'Walk straight from the Main Gate past the Garden and Chemistry/Principal line.',
        'Turn left onto the 2-grill pathway heading into the Computer Department.',
        'Enter the Big Computer Multimedia Room right alongside Computer Lab & Computer Office.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 36.1, y: 28.8 }
      ]
    }
  },
  {
    id: 'pak-urdu-pe',
    name: 'Department of Pakistan Studies',
    shortName: 'Pak Studies',
    subtitle: 'Separate Point in Same Corridor · Tennis Court & Volleyball Directly on Left of Pakistan Studies',
    category: 'Academics',
    stopNumber: '22',
    svgType: 'academic-wing',
    badge: 'Separate Dept. · Tennis/Volleyball Left',
    description:
      'Positioned inside the same ground-floor corridor alongside Computer Department, Urdu, and Physical Education (under 1st-floor Commerce reached By Stairs)—with the Tennis Court & Volleyball ground immediately on its left beside the North-West Trees—the Department of Pakistan Studies teaches constitutional history, geography, and civic heritage.',
    keySpecs: [
      { label: 'Department', value: 'Pakistan Studies' },
      { label: 'On Its Left', value: 'Tennis Court & Volleyball' },
      { label: 'Same Corridor', value: 'Urdu, Physical Education & Computer Dept.' },
      { label: '1st Floor Above', value: 'Commerce Dept. (By Stairs)' }
    ],
    highlights: [
      'Tennis Court & Volleyball ground sit immediately to the left of Pakistan Studies',
      'Compulsory and elective civic & historical studies classrooms',
      'Connected directly in-corridor to Urdu and Physical Education'
    ],
    hotspots: [
      {
        id: 'pak-studies-room',
        label: 'Pakistan Studies Lecture Hall',
        description: 'Classrooms for Pakistan Studies right beside Tennis Court & Volleyball on the left.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Ground Floor Same Corridor · Tennis & Volleyball Directly on Left',
    mapX: 22.9,
    mapY: 15.0,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '78 m North-West',
      walkingSteps: [
        'Walk straight along the twin grill path past West Garden & Garden and turn left onto the two-grill Computer Lab corridor.',
        'Continue past the Computer Department inside the same building.',
        'Enter the Department of Pakistan Studies.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 22.9, y: 30.4 },
        { x: 22.9, y: 15.0 }
      ]
    }
  },
  {
    id: 'urdu-dept',
    name: 'Department of Urdu',
    shortName: 'Urdu Dept.',
    subtitle: 'Separate Point Between Pakistan Studies & Physical Education in Same Corridor',
    category: 'Academics',
    stopNumber: '23',
    svgType: 'academic-wing',
    badge: 'Separate Dept. · One Corridor',
    description:
      'Situated centrally in the same ground-floor corridor between Pakistan Studies and Physical Education—right above the Computer Department and directly below 1st-floor Commerce (reached By Stairs)—the Department of Urdu celebrates classical poetry, prose, and literary societies.',
    keySpecs: [
      { label: 'Department', value: 'Department of Urdu' },
      { label: 'Same Corridor', value: 'Pak Studies, Physical Education, Computer Dept.' },
      { label: '1st Floor Above', value: 'Commerce Dept. (By Stairs)' },
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
    mapY: 15.0,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '78 m North-West',
      walkingSteps: [
        'Walk straight past the Garden and turn left onto the 2-grill Computer Lab path.',
        'Walk along the unified ground-floor corridor past the Computer Department.',
        'Enter the Department of Urdu between Pakistan Studies and Physical Education.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 30.6, y: 30.4 },
        { x: 30.6, y: 15.0 }
      ]
    }
  },
  {
    id: 'physical-education-dept',
    name: 'Department of Physical Education',
    shortName: 'Physical Education',
    subtitle: 'Separate Point Beside Urdu & Pakistan Studies in Same Unified Corridor',
    category: 'Academics',
    stopNumber: '24',
    svgType: 'sports',
    badge: 'Separate Dept. · Sports Hub',
    description:
      'At the upper corridor end alongside Urdu and Pakistan Studies (directly above Big Computer Multimedia Room in the Computer Department and under 1st-floor Commerce), the Department of Physical Education coordinates athletics, inter-collegiate tournaments, and sports programs.',
    keySpecs: [
      { label: 'Department', value: 'Physical Education' },
      { label: 'Programs', value: 'Athletics & Sports Science' },
      { label: 'Same Corridor', value: 'Pak Studies, Urdu & Computer Dept.' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Separate dedicated point for Physical Education & Sports Faculty Office',
      'Coordinates student athletics, track training, and inter-college sports tournaments',
      'Part of the unified solar-powered ground-floor corridor above the Hostel'
    ],
    hotspots: [
      {
        id: 'pe-office',
        label: 'Physical Education Desk',
        description: 'Sports faculty office managing athletics and tournament schedules.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Ground Floor Same Corridor · Above Hostel & Computer Department',
    mapX: 38.3,
    mapY: 15.0,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '80 m North-West',
      walkingSteps: [
        'Walk straight past the Garden and turn left onto the 2-grill Computer Lab path.',
        'Proceed along the unified corridor past the Computer Department and Urdu.',
        'Reach the Department of Physical Education.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 38.3, y: 30.4 },
        { x: 38.3, y: 15.0 }
      ]
    }
  },
  {
    id: 'commerce-dept-library',
    name: 'Commerce Department & Commerce Library (By Stairs · 1st Floor)',
    shortName: 'Commerce & Library (1st Fl.)',
    subtitle: 'By Stairs (1st Floor) · Same Building Above Computer Department, Pak Studies, Urdu & Physical Education',
    category: 'Academics',
    stopNumber: '25',
    svgType: 'library',
    badge: 'By Stairs · 1st Floor Same Building',
    description:
      'Located on the 1st Floor of the EXACT SAME building reached via the Commerce Stairs beside the ground-floor corridor (Computer Department, Pakistan Studies, Urdu & Physical Education) north of the Hostel, the Commerce Department and specialized Commerce Library house accounting, finance, banking, and business studies resources.',
    keySpecs: [
      { label: 'Access', value: 'By Stairs (1st Floor)' },
      { label: 'Ground Floor Below', value: 'Computer Dept., Pak Studies, Urdu & Physical Education' },
      { label: 'Facilities', value: 'Commerce Dept. & Library' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Reached By Stairs (1st Floor) right on the side of the unified building above Computer Department, Pak Studies, Urdu & Physical Education',
      'Dedicated Commerce Library stocked with accounting, auditing, banking & business volumes',
      'Solar panel array mounted on the building rooftop powering all wings cleanly'
    ],
    hotspots: [
      {
        id: 'commerce-lib',
        label: 'Commerce Library (1st Floor)',
        description: 'Subject-specific reference library for Commerce & Accounting reached by stairs.',
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
    locationNote: 'By Stairs (1st Floor) · Above Computer Dept. & Unified Corridor',
    mapX: 30.7,
    mapY: 7.1,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '84 m North-West · By Stairs (1st Fl)',
      walkingSteps: [
        'Walk straight past the Garden and turn left onto the two-grill Computer Lab corridor.',
        'Pass the Computer Department and 1 Corridor entrance to the Commerce Stairs on the right side of the building.',
        'Climb the Stairs up to the 1st Floor Commerce Department & Commerce Library.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 44.3, y: 30.4 },
        { x: 44.3, y: 20.5 },
        { x: 44.3, y: 7.1 },
        { x: 30.7, y: 7.1 }
      ]
    }
  },
  {
    id: 'sindhi-economics-physiology-ground',
    name: 'Ground & Playing Lawn (After Straight Long Path)',
    shortName: 'Ground',
    subtitle: 'After Straight Long Path Past Zoology & Botany Lab · Preceding Garden & Straight Long Corridor',
    category: 'Student Life',
    stopNumber: '26',
    svgType: 'sports',
    badge: 'After Straight Long Path · Ground',
    description:
      'Walking straight east past Assembly, Zoology & Botany Lab along the Straight Long Path brings you directly into this expansive green Playing Ground & Lawn, immediately followed by the East Garden and the Straight Long Corridor housing Sindhi, Physiology, Economics, Geography, and Psychology.',
    keySpecs: [
      { label: 'Sequence', value: 'After Straight Long Path' },
      { label: 'Next Stop', value: 'East Garden' },
      { label: 'Then Follow', value: 'Straight Long Corridor (Sindhi, Physiology, Economics, Geography)' },
      { label: 'Feature', value: 'Open Green Playing Ground' }
    ],
    highlights: [
      'Reached straight along the Straight Long Path past Zoology & Botany Lab',
      'Open green playing ground immediately preceding the Garden',
      'Flows directly into the Garden & Straight Long Corridor departments'
    ],
    hotspots: [
      {
        id: 'east-playing-ground',
        label: 'Playing Ground & Lawn',
        description: 'Expansive green lawn situated directly after the Straight Long Path.',
        xPercent: 50,
        yPercent: 55
      }
    ],
    locationNote: 'North-East Wing · Ground Right After Straight Long Path',
    mapX: 83.8,
    mapY: 7.6,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '110 m · Straight Long Path',
      walkingSteps: [
        'Walk straight north from Main Gate past Principal’s Office line to Assembly, Zoology & Botany Lab.',
        'Follow the Straight Long Path directly east past Botany Lab.',
        'Arrive at the Playing Ground & Lawn right before the Garden.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 48.3, y: 7.6 },
        { x: 65.0, y: 7.6 },
        { x: 83.8, y: 7.6 }
      ]
    }
  },
  {
    id: 'east-garden',
    name: 'East Campus Garden & Trees (After Ground)',
    shortName: 'Garden',
    subtitle: 'Directly After Ground · Opening Into the Straight Long Corridor',
    category: 'Student Life',
    stopNumber: '27',
    svgType: 'courtyard',
    badge: 'After Ground · Corridor Gateway',
    description:
      'Positioned immediately after the Playing Ground at the end of the Straight Long Path, this flowering Garden opens directly into the Straight Long Corridor housing the Departments of Sindhi, Physiology, Economics, Geography, and Psychology.',
    keySpecs: [
      { label: 'Sequence', value: 'Directly After Ground' },
      { label: 'Care Staff', value: 'Campus Gardeners' },
      { label: 'Next South', value: 'Straight Long Corridor (Sindhi, Physiology, Economics, Geography, Psychology)' },
      { label: 'Environment', value: 'Shaded Trees & Flower Beds' }
    ],
    highlights: [
      'Situated cleanly between the Playing Ground and the Straight Long Corridor',
      'Tended daily with flowering beds and shaded green trees',
      'Direct entrance downward into Sindhi, Physiology, Economics, Geography & Psychology'
    ],
    hotspots: [
      {
        id: 'east-garden-beds',
        label: 'Garden Flowerbeds & Trees',
        description: 'Lush shaded garden sitting right after Ground at the start of Straight Long Corridor.',
        xPercent: 50,
        yPercent: 52
      }
    ],
    locationNote: 'North-East Corner · Garden Directly Before Straight Long Corridor',
    mapX: 92.8,
    mapY: 7.6,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '118 m · Past Ground on Straight Long Path',
      walkingSteps: [
        'Walk straight north to Assembly, Zoology & Botany Lab.',
        'Follow the Straight Long Path east past the Ground.',
        'Arrive at the Garden right at the entrance of the Straight Long Corridor.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 48.3, y: 7.6 },
        { x: 65.0, y: 7.6 },
        { x: 83.8, y: 7.6 },
        { x: 92.8, y: 7.6 }
      ]
    }
  },
  {
    id: 'sindhi-dept',
    name: 'Department of Sindhi (Straight Long Corridor)',
    shortName: 'Sindhi',
    subtitle: 'First Stop Inside Straight Long Corridor After Garden · Followed by Physiology, Economics & Geography',
    category: 'Academics',
    stopNumber: '28',
    svgType: 'academic-wing',
    badge: 'Straight Long Corridor · 1st Room',
    description:
      'Located first inside the Straight Long Corridor descending south from the Garden (past the Straight Long Path and Ground beyond Zoology & Botany Lab), the Department of Sindhi preserves and teaches Sindhi language, Shah Abdul Latif Bhittai’s poetry, classical prose, and regional literary research.',
    keySpecs: [
      { label: 'Department', value: 'Department of Sindhi' },
      { label: 'Corridor', value: 'Straight Long Corridor (1st Room)' },
      { label: 'Before It', value: 'Straight Long Path → Ground → Garden' },
      { label: 'Next South', value: 'Physiology → Economics → Geography' }
    ],
    highlights: [
      'First department inside the continuous Straight Long Corridor right after Garden',
      'Classical Sindhi literature, Latifiyat seminars, and undergraduate programs',
      'Solar-equipped Straight Long Corridor wing'
    ],
    hotspots: [
      {
        id: 'sindhi-hall',
        label: 'Sindhi Lecture Hall',
        description: 'Dedicated classrooms for Sindhi literature inside the Straight Long Corridor.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Straight Long Corridor · 1st Department After Garden',
    mapX: 93.4,
    mapY: 21.3,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '124 m · Straight Long Corridor',
      walkingSteps: [
        'Walk north to Assembly, Zoology & Botany Lab, then follow the Straight Long Path east through Ground & Garden.',
        'Step straight south into the Straight Long Corridor immediately past Garden.',
        'Enter the Department of Sindhi (first department in the corridor).'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 48.3, y: 7.6 },
        { x: 88.8, y: 7.6 },
        { x: 88.8, y: 21.3 },
        { x: 93.4, y: 21.3 }
      ]
    }
  },
  {
    id: 'physiology-dept',
    name: 'Department of Physiology (Straight Long Corridor)',
    shortName: 'Physiology',
    subtitle: 'Straight Long Corridor · Between Sindhi & Economics',
    category: 'Laboratories',
    stopNumber: '29',
    svgType: 'science-lab',
    badge: 'Straight Long Corridor · 2nd Room',
    description:
      'Second inside the Straight Long Corridor directly after Sindhi (past the Straight Long Path, Ground & Garden), the Department of Physiology supports our distinctive Associate Degree in Physiology & Health Sciences (ADS) with physiological models, blood-pressure/hematology apparatus, and Pre-Medical foundations.',
    keySpecs: [
      { label: 'Department', value: 'Department of Physiology' },
      { label: 'Corridor', value: 'Straight Long Corridor (2nd Room)' },
      { label: 'Between', value: 'Sindhi & Economics' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Positioned inside the Straight Long Corridor right after Sindhi and before Economics',
      'Supports Zubaida College’s specialized Physiology & Health Sciences degree track',
      'Equipped with rooftop solar panels like all campus wings'
    ],
    hotspots: [
      {
        id: 'physiology-lab',
        label: 'Physiology Practical Lab',
        description: 'Hematology, anatomical physiology charts, and diagnostic models inside the Straight Long Corridor.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Straight Long Corridor · Between Sindhi & Economics',
    mapX: 93.4,
    mapY: 33.0,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '130 m · Straight Long Corridor',
      walkingSteps: [
        'Follow the Straight Long Path east past Ground & Garden into the Straight Long Corridor.',
        'Walk straight down the corridor past Sindhi.',
        'Enter the Department of Physiology.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 48.3, y: 7.6 },
        { x: 88.8, y: 7.6 },
        { x: 88.8, y: 33.0 },
        { x: 93.4, y: 33.0 }
      ]
    }
  },
  {
    id: 'economics-dept',
    name: 'Department of Economics (Straight Long Corridor)',
    shortName: 'Economics',
    subtitle: 'Straight Long Corridor · Between Physiology & Geography',
    category: 'Academics',
    stopNumber: '30',
    svgType: 'academic-wing',
    badge: 'Straight Long Corridor · 3rd Room',
    description:
      'Situated centrally in the Straight Long Corridor between Physiology and Geography (after Straight Long Path, Ground & Garden), the Department of Economics teaches microeconomics, macroeconomics, development economics, and economic policy of Pakistan across Intermediate, Associate Degree, and Commerce programs.',
    keySpecs: [
      { label: 'Department', value: 'Department of Economics' },
      { label: 'Corridor', value: 'Straight Long Corridor (3rd Room)' },
      { label: 'Between', value: 'Physiology & Geography' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Positioned inside the Straight Long Corridor between Physiology and Geography',
      'Micro/macro theory and Pakistan development studies classrooms',
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
    locationNote: 'Straight Long Corridor · Between Physiology & Geography',
    mapX: 93.4,
    mapY: 44.6,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '136 m · Straight Long Corridor',
      walkingSteps: [
        'Follow the Straight Long Path east past Ground & Garden into the Straight Long Corridor.',
        'Walk straight down the corridor past Sindhi and Physiology.',
        'Enter the Department of Economics.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 48.3, y: 7.6 },
        { x: 88.8, y: 7.6 },
        { x: 88.8, y: 44.6 },
        { x: 93.4, y: 44.6 }
      ]
    }
  },
  {
    id: 'geography-dept',
    name: 'Department of Geography (Straight Long Corridor)',
    shortName: 'Geography',
    subtitle: 'Straight Long Corridor · After Economics & Before Psychology',
    category: 'Academics',
    stopNumber: '31',
    svgType: 'academic-wing',
    badge: 'Straight Long Corridor · 4th Room',
    description:
      'Located inside the Straight Long Corridor right after Sindhi, Physiology, and Economics (following Straight Long Path, Ground & Garden), the Department of Geography houses physical and commercial geography maps, globes, cartography tables, and environmental survey instruments.',
    keySpecs: [
      { label: 'Department', value: 'Department of Geography' },
      { label: 'Corridor', value: 'Straight Long Corridor (4th Room)' },
      { label: 'Between', value: 'Economics & Psychology' },
      { label: 'Programs', value: 'I.Com & FA Geography' }
    ],
    highlights: [
      'Integrated seamlessly inside the Straight Long Corridor right after Economics',
      'Cartography & physical geography practical hall with regional Sindh & Pakistan maps',
      'Supports Commercial Geography (I.Com) and FA Humanities Geography groups'
    ],
    hotspots: [
      {
        id: 'geography-cartography',
        label: 'Geography & Cartography Lab',
        description: 'Topographical map tables, globes, and survey instruments inside the Straight Long Corridor.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Straight Long Corridor · Between Economics & Psychology',
    mapX: 93.4,
    mapY: 56.3,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '142 m · Straight Long Corridor',
      walkingSteps: [
        'Follow the Straight Long Path east past Ground & Garden into the Straight Long Corridor.',
        'Walk straight down the corridor past Sindhi, Physiology, and Economics.',
        'Enter the Department of Geography.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 48.3, y: 7.6 },
        { x: 88.8, y: 7.6 },
        { x: 88.8, y: 56.3 },
        { x: 93.4, y: 56.3 }
      ]
    }
  },
  {
    id: 'psychology-dept',
    name: 'Department of Psychology (Straight Long Corridor)',
    shortName: 'Psychology',
    subtitle: 'Straight Long Corridor · Following Sindhi, Physiology, Economics & Geography',
    category: 'Academics',
    stopNumber: '32',
    svgType: 'academic-wing',
    badge: 'Straight Long Corridor · End Room',
    description:
      'Completing the Straight Long Corridor directly south of Geography (after Sindhi, Physiology, and Economics past Ground and Garden), the Department of Psychology hosts behavioral sciences lectures, cognitive testing exercises, and student counseling orientation.',
    keySpecs: [
      { label: 'Department', value: 'Department of Psychology' },
      { label: 'Corridor', value: 'Straight Long Corridor (5th Room)' },
      { label: 'Before It', value: 'Sindhi, Physiology, Economics, Geography' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Dedicated Psychology lecture room & counseling testing suite at the southern end of Straight Long Corridor',
      'Serves Intermediate Humanities and Associate Degree in Arts (ADA) cohorts',
      'Positioned cleanly inside the Golden College Boundary just north of Central Jail'
    ],
    hotspots: [
      {
        id: 'psychology-lab',
        label: 'Psychology Testing & Counseling Room',
        description: 'Apparatus for perception, memory experiments, and student counseling.',
        xPercent: 50,
        yPercent: 50
      }
    ],
    locationNote: 'Straight Long Corridor · After Geography (Inside Golden Boundary)',
    mapX: 93.4,
    mapY: 68.0,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '148 m · Straight Long Corridor',
      walkingSteps: [
        'Follow the Straight Long Path east past Ground & Garden into the Straight Long Corridor.',
        'Proceed down the Straight Long Corridor past Sindhi, Physiology, Economics, and Geography.',
        'Arrive at the Department of Psychology inside the Golden Boundary.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 25.0 },
        { x: 48.3, y: 7.6 },
        { x: 88.8, y: 7.6 },
        { x: 88.8, y: 68.0 },
        { x: 93.4, y: 68.0 }
      ]
    }
  },
  {
    id: 'small-garden-computer-lab',
    name: 'Small Garden (Before Computer Lab)',
    shortName: 'Small Garden',
    subtitle: 'Green Pocket Garden Directly Before Computer Lab & Above Big College Hostel',
    category: 'Student Life',
    stopNumber: '33',
    svgType: 'courtyard',
    badge: 'Right Before Computer Lab',
    description:
      'Nestled directly in front of the Computer Lab & Computer Office (and above the Big College Hostel right beside the Central Courtyard Promenade), this welcoming Small Garden frames the entry to the Computer Department with shaded greenery and colorful flowerbeds.',
    keySpecs: [
      { label: 'Location', value: 'Before Computer Lab' },
      { label: 'Directly North', value: 'Computer Lab & Office' },
      { label: 'Directly South', value: 'Big College Hostel' },
      { label: 'West Neighbor', value: 'Straight North-West Trees' }
    ],
    highlights: [
      'Green pocket garden positioned directly before Computer Lab & Computer Office',
      'Shades the walkway linking Central Courtyard, Computer Department, and Big College Hostel',
      'Connects seamlessly westward into the Straight North-West Trees line'
    ],
    hotspots: [
      {
        id: 'small-garden-lawn',
        label: 'Small Garden Flowerbeds',
        description: 'Neat manicured greenery directly before the Computer Lab entrance.',
        xPercent: 50,
        yPercent: 52
      }
    ],
    locationNote: 'Directly Before Computer Lab · Between Computer Dept. & Hostel',
    mapX: 24.1,
    mapY: 39.5,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '62 m · Directly Before Computer Lab',
      walkingSteps: [
        'Walk straight along the twin grill path past Big Clerk Office Corridor and the Garden.',
        'Turn left across Central Courtyard Promenade toward the Computer Department.',
        'Pause at the Small Garden positioned directly before Computer Lab & Office.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 41.9 },
        { x: 30.2, y: 41.9 },
        { x: 24.1, y: 39.5 }
      ]
    }
  },
  {
    id: 'tennis-volleyball-grounds',
    name: 'Tennis Court & Volleyball Ground (Left of Pakistan Studies)',
    shortName: 'Tennis & Volleyball',
    subtitle: 'Directly on the Left of Pakistan Studies · Above Straight North-West Trees & Hostel',
    category: 'Student Life',
    stopNumber: '34',
    svgType: 'sports',
    badge: 'Left of Pakistan Studies · Courts',
    description:
      'Located directly on the left of the Department of Pakistan Studies (above the Straight North-West Trees, Small Garden & College Hostel and alongside Physical Education, Urdu & Commerce), these twin outdoor courts support inter-collegiate girls’ Tennis and Volleyball matches.',
    keySpecs: [
      { label: 'Location', value: 'On Left of Pakistan Studies' },
      { label: 'Courts', value: 'Tennis Court & Volleyball Court' },
      { label: 'South Neighbor', value: 'North-West Trees & Hostel' },
      { label: 'Department', value: 'Physical Education' }
    ],
    highlights: [
      'Positioned cleanly on the immediate left of Pakistan Studies inside the Golden Boundary Wall',
      'Marked hard-surface Tennis Court and lined Volleyball Court side-by-side',
      'Connected directly south through the Straight North-West Trees to Small Garden & Computer Lab'
    ],
    hotspots: [
      {
        id: 'tennis-court-zone',
        label: 'Tennis Court (Left)',
        description: 'Marked college tennis court beside the Volleyball Court.',
        xPercent: 32,
        yPercent: 50
      },
      {
        id: 'volleyball-court-zone',
        label: 'Volleyball Court (Right)',
        description: 'Volleyball court positioned directly adjacent to Pakistan Studies.',
        xPercent: 68,
        yPercent: 50
      }
    ],
    locationNote: 'North-West Sports Zone · Directly on Left of Pakistan Studies',
    mapX: 10.8,
    mapY: 12.9,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '92 m North-West',
      walkingSteps: [
        'Walk straight along the twin grill path past the Garden and turn left onto the two-grill Computer Lab walkway.',
        'Proceed past the Computer Department, Small Garden, and North-West Trees.',
        'Arrive at the Tennis Court & Volleyball Ground directly on the left of Pakistan Studies.'
      ],
      routePath: [
        { x: 50, y: 92.6 },
        { x: 50, y: 30.4 },
        { x: 10.8, y: 30.4 },
        { x: 10.8, y: 12.9 }
      ]
    }
  }
];
