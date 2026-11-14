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

export const GATE_COORDS = { x: 50, y: 91 };

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
    label: 'Entering Main College Gate (Security Check)',
    leftView: 'Security Post & Waiting Room (Entrance Left)',
    aheadView: 'Gate Security Guards & Straight Central Walkway',
    rightView: 'College Canteen Inside Right · Central Jail & Signal Jammers Outside College Right'
  },
  {
    progress: 0.25,
    label: 'Entering Two Paths Separated by Small Grill',
    leftView: 'Waiting Room Courtyard & West Path',
    aheadView: 'Two parallel paths separated down the center by a small grill',
    rightView: 'Clerk Office (first on right) & Central Library ahead on right'
  },
  {
    progress: 0.52,
    label: 'Walking Straight Along Twin Grill Paths & Big Lawn',
    leftView: 'Chemistry, Chemistry Labs & Left Twin-Grill Branch ahead',
    aheadView: 'Straight path crossing the Big Lawn to Principal’s Office',
    rightView: 'Central Library passed · Big Walking Lawn & Gardeners on right'
  },
  {
    progress: 0.78,
    label: 'Crossing Big Lawn Toward Principal’s Office Line',
    leftView: 'Chemistry & Chemistry Labs + Auditorium (Left in line)',
    aheadView: 'Big Ground & Green Lawn FIRST, then Sindhi, Economics & Physiology straight north',
    rightView: 'Principal’s Office & 1st Floor General Staff Room / Humanities on right'
  },
  {
    progress: 1,
    label: 'Arrived at Principal’s Office (Right Side)',
    leftView: 'Chemistry & Chemistry Labs & Auditorium directly across',
    aheadView: 'Straight north: Big Ground & Lawn first, then Sindhi, Economics & Physiology',
    rightView: 'Principal’s Office · 1st Floor Staff Room, Islamiat, English, Stats, Maths & Physics'
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
      'Enter Government Girls Zubaida College through the Security-monitored 1953 Main Gate on Pathan Colony Road. Immediately on your left is the Waiting Room and on your right is the College Canteen; walking straight inside brings you onto two paths separated by a small grill past the Clerk Office and Central Library on your right, crossing the Big Lawn to reach the Principal’s Office.',
    keySpecs: [
      { label: 'Security', value: '24/7 Gate Guards' },
      { label: 'Entrance Left', value: 'Waiting Room' },
      { label: 'Entrance Right', value: 'College Canteen' },
      { label: 'Straight Path', value: 'Twin Grill Walkways' }
    ],
    highlights: [
      'Gate Security Cabin & uniformed security guards stationed at the entrance',
      'First on your left upon entering: Visitor Waiting Room',
      'On your right at entrance: College Canteen adjacent to Central Jail & Signal Jammers, with Central Library further straight'
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
        label: 'Canteen (Right)',
        description: 'Located immediately on your right when entering the gate.',
        xPercent: 80,
        yPercent: 78
      }
    ],
    locationNote: 'South Boundary · Pathan Colony Road (Security Gate)',
    mapX: 50,
    mapY: 91,
    gateDirections: {
      turn: 'Entry Gate',
      distanceFromGate: '0 m (Start Point)',
      walkingSteps: [
        'Enter through the Security-monitored Main College Gate (Waiting Room on left, Canteen on right).',
        'Walk straight onto the two paths separated by a small grill (Clerk Office first on right, then Central Library on right).',
        'Cross the Big Lawn (with Gardeners) to reach the Principal’s Office line.'
      ],
      routePath: [{ x: 50, y: 91 }]
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
    mapX: 24,
    mapY: 83.5,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '14 m Left',
      walkingSteps: [
        'Enter through the Security-monitored Main Gate.',
        'Turn left immediately upon entering.',
        'First comes the Visitor Waiting Room on your left.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 83.5 },
        { x: 24, y: 83.5 }
      ]
    }
  },
  {
    id: 'college-canteen',
    name: 'College Canteen',
    shortName: 'Canteen',
    subtitle: 'On Your Right Side Immediately After Entering the Main Gate',
    category: 'Student Life',
    stopNumber: '03',
    svgType: 'courtyard',
    badge: 'Entrance Right · Student Refreshments',
    description:
      'When a visitor enters through the Main Gate, the College Canteen stands right on the right side—serving students and visitors with refreshments, snacks, tea, and chilled drinking water.',
    keySpecs: [
      { label: 'Direction', value: 'Entrance Right' },
      { label: 'Walk Time', value: '14 Meters Right' },
      { label: 'Further Straight', value: 'Clerk Office & Library' },
      { label: 'Services', value: 'Snacks & Cool Water' }
    ],
    highlights: [
      'Located right on your right side inside the Main Gate (with Central Jail & Signal Jammers outside the right perimeter wall)',
      'Fresh snacks, tea counter, and chilled drinking water stations',
      'Walking straight past the canteen leads onto the twin grill paths'
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
    locationNote: 'Entrance Courtyard Inside Gate · Right Side',
    mapX: 64.2,
    mapY: 83.5,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '14 m Right',
      walkingSteps: [
        'Enter through the Main College Gate.',
        'Turn right immediately inside the gate (outside the right boundary sits Central Jail & Signal Jammers).',
        'The College Canteen sits right there on your right.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 83.5 },
        { x: 64.2, y: 83.5 }
      ]
    }
  },
  {
    id: 'clerk-office',
    name: 'Clerk Office & Student Records',
    shortName: 'Clerk Office',
    subtitle: 'Walking Straight Along Grill Path · Very First Office on the Right',
    category: 'Administration',
    stopNumber: '04',
    svgType: 'principal-office',
    badge: 'Straight Path · First on Right',
    description:
      'As you walk straight onto the two paths separated by the small grill, the very first office on your right side is the Clerk Office—handling student enrollment forms, verification, bonafide certificates, and official records.',
    keySpecs: [
      { label: 'Direction', value: 'Straight · First Right' },
      { label: 'Distance', value: '24 Meters Straight' },
      { label: 'Office Hours', value: '8:00 AM – 2:00 PM' },
      { label: 'Services', value: 'Records & Verification' }
    ],
    highlights: [
      'Very first office on the right side when walking straight along the twin grill path',
      'Handles SECCAP admissions, enrollment slips & document verification',
      'Just before the Central Library and Big Walking Lawn further along on the right'
    ],
    hotspots: [
      {
        id: 'clerk-counter',
        label: 'Student Records Window',
        description: 'Bonafide certificates, marksheet verification, and admission counters.',
        xPercent: 36,
        yPercent: 52
      },
      {
        id: 'clerk-archive',
        label: 'Admissions & Files Desk',
        description: 'BISE and University of Sindh affiliation record counters.',
        xPercent: 72,
        yPercent: 48
      }
    ],
    locationNote: 'Twin Grill Path · Very First Office on Right',
    mapX: 63.5,
    mapY: 72,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '24 m Straight · First Right',
      walkingSteps: [
        'Enter the Main Gate (passing Canteen on right and Waiting Room on left).',
        'Walk straight onto the central pathway separated by the small grill.',
        'The Clerk Office is the very first office on your right side.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 72 },
        { x: 63.5, y: 72 }
      ]
    }
  },
  {
    id: 'central-library',
    name: 'Central College Library & Reading Wing',
    shortName: 'Central Library',
    subtitle: 'After Walking Some Distance Straight on the Right · 15,000+ Volumes',
    category: 'Library',
    stopNumber: '05',
    svgType: 'library',
    badge: 'Right Side · 15,000+ Books',
    description:
      'After walking some distance straight past the Canteen and Clerk Office turn-off, the Central College Library opens on your right side—housing over 15,000 books, the free Government Book Bank, and 120 silent study seats.',
    keySpecs: [
      { label: 'Direction', value: 'Straight · Right Side' },
      { label: 'Book Capacity', value: '15,000+ Volumes' },
      { label: 'Reading Seats', value: '120 Students' },
      { label: 'Lending Scheme', value: 'Free Book Bank' }
    ],
    highlights: [
      'Located on the right side after walking some distance straight past the Canteen & Clerk Office',
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
    locationNote: 'Right Side Past Clerk Office · Some Distance Inside Gate',
    mapX: 85,
    mapY: 72,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '38 m Straight · Right',
      walkingSteps: [
        'Enter the Main Gate (Canteen on right) and walk straight forward.',
        'Pass the Clerk Office turn-off on your right.',
        'Continue along the right side to enter the Central College Library.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 72 },
        { x: 85, y: 72 }
      ]
    }
  },
  {
    id: 'grill-divided-walkway',
    name: 'Twin Paths (Small Grill) & Big Lawn',
    shortName: 'Twin Grill & Big Lawn',
    subtitle: 'Two Paths Separated by Small Grill · Crossing Big Lawn (with Gardeners) to Principal’s Office',
    category: 'Student Life',
    stopNumber: '06',
    svgType: 'courtyard',
    badge: 'Central Promenade · Big Lawn',
    description:
      'Along the central axis, two parallel paved pathways are separated down the center by a small iron grill. As you walk straight, you cross the lush green Big Lawn tended by college gardeners on the right before reaching the Principal’s Office.',
    keySpecs: [
      { label: 'Pathway', value: 'Two Grill-Divided Paths' },
      { label: 'Lawn Side', value: 'Big Lawn on Right' },
      { label: 'Care Staff', value: 'Campus Gardeners' },
      { label: 'Straight Ahead', value: 'Principal’s Office' }
    ],
    highlights: [
      'Two clean parallel walkways separated by a small central iron grill',
      'Big green walking lawn tended by college gardeners on your right side',
      'Crossing the Big Lawn leads straight to the Principal’s Office on the right'
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
        label: 'Big Lawn & Gardeners (Right)',
        description: 'Expansive green lawn, trees, and flowerbeds tended by gardeners.',
        xPercent: 75,
        yPercent: 55
      }
    ],
    locationNote: 'Central Spine · Twin Grill Paths & Big Walking Lawn',
    mapX: 50,
    mapY: 62,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '35 m Straight',
      walkingSteps: [
        'Enter Main Gate (Security) and walk straight past Waiting Room (left) and Canteen (right).',
        'Step onto the two parallel paths separated by a small central grill past the Clerk Office.',
        'Cross beside the Big Lawn (with Gardeners) on your right toward the Principal’s Office line.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 62 }
      ]
    }
  },
  {
    id: 'chemistry-labs',
    name: 'Department of Chemistry & Chemistry Labs',
    shortName: 'Chemistry & Labs',
    subtitle: 'Directly In Line with Principal’s Office on the Left Side',
    category: 'Laboratories',
    stopNumber: '07',
    svgType: 'science-lab',
    badge: 'In Line with Principal · Left',
    description:
      'Directly across on the left side—in exact alignment with the Principal’s Office—stand the Department of Chemistry lecture rooms and Chemistry Laboratories equipped with titration benches, reagent cabinets, and fume hoods.',
    keySpecs: [
      { label: 'Alignment', value: 'In Line · Left Side' },
      { label: 'Facilities', value: 'Chemistry Lecture & Labs' },
      { label: 'Safety', value: 'Fume Hoods & Eye-Wash' },
      { label: 'Capacity', value: '40 Students / Lab' }
    ],
    highlights: [
      'Positioned directly in line with the Principal’s Office on the left side',
      'Dedicated organic, inorganic, and analytical Chemistry practical benches',
      'Just beside the College Auditorium on the left'
    ],
    hotspots: [
      {
        id: 'chem-benches',
        label: 'Titration & Practical Benches',
        description: 'Lab tables outfitted with burettes, Bunsen burners, and sinks.',
        xPercent: 35,
        yPercent: 52
      },
      {
        id: 'chem-hood',
        label: 'Reagent & Fume Chamber',
        description: 'Ventilated chemical preparation and safety stations.',
        xPercent: 74,
        yPercent: 40
      }
    ],
    locationNote: 'Left Side · In Line with Principal’s Office',
    mapX: 28,
    mapY: 49.5,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '52 m Straight · Left',
      walkingSteps: [
        'Walk straight along the twin grill paths past the Clerk Office and Big Lawn.',
        'When you reach the Principal’s Office line, look directly to your left.',
        'Enter the Department of Chemistry & Chemistry Labs.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 62 },
        { x: 50, y: 49.5 },
        { x: 28, y: 49.5 }
      ]
    }
  },
  {
    id: 'auditorium-hall',
    name: 'College Auditorium Hall',
    shortName: 'Auditorium',
    subtitle: 'Left Side of Principal’s Office Line · Past Chemistry Labs',
    category: 'Student Life',
    stopNumber: '08',
    svgType: 'auditorium',
    badge: 'Left Side Hall · 600+ Seats',
    description:
      'Located on the left side aligned with the Principal’s Office and Chemistry corridor, the College Auditorium Hall hosts convocations, Seerat conferences, Naat recitals, debates, and prize ceremonies.',
    keySpecs: [
      { label: 'Seating', value: '600+ Attendees' },
      { label: 'Audio/Visual', value: 'Full PA & Stage Lights' },
      { label: 'Alignment', value: 'Left of Principal Line' },
      { label: 'Events', value: 'Convocations & Debates' }
    ],
    highlights: [
      'Positioned on the left side in line with the Principal’s Office past Chemistry Labs',
      'Elevated stage with formal Principal podium and acoustics',
      'Spacious assembly hall for major college ceremonies'
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
    locationNote: 'Far Left · In Line with Principal’s Office & Chemistry',
    mapX: 10.5,
    mapY: 49.5,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '62 m Straight · Far Left',
      walkingSteps: [
        'Walk straight along the twin grill paths across the Big Lawn to the Principal’s Office line.',
        'Turn left past Chemistry & Chemistry Labs.',
        'Enter the College Auditorium Hall on the left.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 49.5 },
        { x: 10.5, y: 49.5 }
      ]
    }
  },
  {
    id: 'principal-office',
    name: 'Principal’s Office & Executive Suite',
    shortName: 'Principal’s Office',
    subtitle: 'Walking Straight Crossing Big Lawn · Located on the Right Side',
    category: 'Administration',
    stopNumber: '09',
    svgType: 'principal-office',
    badge: 'College Leadership · Right Side',
    description:
      'Walking straight along the twin grill-divided paths and crossing the Big Lawn brings you directly to the Principal’s Office on your right side—the executive office of Principal Prof. Yasmeen Panhwar, aligned directly opposite Chemistry & Labs and Auditorium on the left.',
    keySpecs: [
      { label: 'Principal', value: 'Prof. Yasmeen Panhwar' },
      { label: 'Direction', value: 'Straight · Right Past Lawn' },
      { label: 'Opposite Left', value: 'Chemistry & Auditorium' },
      { label: 'Office Hours', value: '8:00 AM – 2:00 PM' }
    ],
    highlights: [
      'Positioned on the right side right after crossing the Big Walking Lawn',
      'In line with Chemistry & Chemistry Labs and Auditorium on the left',
      'Right & 1st Floor beside it connect to General Staff Room & Humanities/Science departments'
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
    locationNote: 'Right Side · Immediately After Crossing Big Lawn',
    mapX: 59,
    mapY: 49,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '48 m Straight · Right',
      walkingSteps: [
        'Enter Main Gate (Security) and walk straight past Canteen & Clerk Office onto the twin grill paths.',
        'Walk straight crossing the Big Lawn (with Gardeners) on your right.',
        'Right past the Big Lawn, turn right into the Principal’s Office.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 62 },
        { x: 50, y: 49 },
        { x: 59, y: 49 }
      ]
    }
  },
  {
    id: 'general-staff-room',
    name: 'General Staff Room (1st Floor)',
    shortName: 'General Staff Room',
    subtitle: 'On the Right of Principal’s Office · 1st Floor Faculty Lounge',
    category: 'Administration',
    stopNumber: '10',
    svgType: 'academic-wing',
    badge: '1st Floor · Right of Principal',
    description:
      'Situated on the 1st Floor immediately to the right of the Principal’s Office, the General Staff Room serves as the central faculty lounge and academic planning suite for professors across departments.',
    keySpecs: [
      { label: 'Floor', value: '1st Floor' },
      { label: 'Location', value: 'Right of Principal’s Office' },
      { label: 'Next Along', value: 'Islamiat & English' },
      { label: 'Purpose', value: 'Faculty Suite' }
    ],
    highlights: [
      'First room on the 1st Floor turning right from the Principal’s Office',
      'Central faculty coordination room overlooking the Big Lawn',
      'Connects directly into Islamiat, Islamic Culture, English, Statistics, Mathematics & Physics'
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
    locationNote: '1st Floor · Immediately Right of Principal’s Office',
    mapX: 72,
    mapY: 49,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '55 m Right · 1st Floor',
      walkingSteps: [
        'Walk straight past the Big Lawn to the Principal’s Office on the right.',
        'Take the stairs right beside the Principal’s Office up to the 1st Floor.',
        'Enter the General Staff Room immediately on the right corridor.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 49 },
        { x: 72, y: 49 }
      ]
    }
  },
  {
    id: 'islamiat-english',
    name: 'Islamiat, Islamic Culture & English',
    shortName: 'Islamiat, Islamic Culture & English',
    subtitle: '1st Floor Right of Principal’s Office · Along with General Staff Room',
    category: 'Academics',
    stopNumber: '11',
    svgType: 'academic-wing',
    badge: '1st Floor · Humanities Suite',
    description:
      'Continuing on the 1st Floor to the right of the Principal’s Office alongside the General Staff Room sit the Departments of Islamiat, Islamic Culture, and English—hosting lecture rooms, Seerat study seminars, and literary workshops.',
    keySpecs: [
      { label: 'Departments', value: 'Islamiat, Islamic Culture & English' },
      { label: 'Floor', value: '1st Floor Right' },
      { label: 'Adjacent To', value: 'General Staff Room' },
      { label: 'Next Ahead', value: 'Statistics & Mathematics' }
    ],
    highlights: [
      'Department of Islamiat & Department of Islamic Culture classrooms',
      'Department of English composition, grammar & literary studies rooms',
      'Located on the 1st Floor right of the Principal’s Office next to General Staff Room'
    ],
    hotspots: [
      {
        id: 'islamiat-room',
        label: 'Islamiat & Islamic Culture',
        description: 'Dedicated lecture rooms for Islamic Studies & Culture.',
        xPercent: 32,
        yPercent: 48
      },
      {
        id: 'english-room',
        label: 'Department of English',
        description: 'Classrooms for English literature and academic composition.',
        xPercent: 72,
        yPercent: 48
      }
    ],
    locationNote: '1st Floor · East Corridor Past General Staff Room',
    mapX: 87,
    mapY: 49,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '62 m Right · 1st Floor',
      walkingSteps: [
        'Walk straight across the Big Lawn to the Principal’s Office on the right.',
        'Go to the 1st Floor past the General Staff Room.',
        'Enter Islamiat, Islamic Culture & English along the right corridor.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 49 },
        { x: 87, y: 49 }
      ]
    }
  },
  {
    id: 'statistics-mathematics',
    name: 'Statistics & Mathematics Departments',
    shortName: 'Statistics & Mathematics',
    subtitle: 'Statistics Before Mathematics · Right Side Corridor Past Principal’s Office',
    category: 'Academics',
    stopNumber: '12',
    svgType: 'academic-wing',
    badge: 'Quantitative Dept. · Right Side',
    description:
      'Along the right-side academic corridor past the Principal’s Office & 1st Floor Humanities rooms, Statistics comes right before Mathematics—serving ICS, Pre-Engineering, Commerce, and General Science students.',
    keySpecs: [
      { label: 'Sequence', value: 'Statistics → Mathematics' },
      { label: 'Streams', value: 'ICS, Pre-Eng & Commerce' },
      { label: 'Side', value: 'Right Corridor' },
      { label: 'Next East', value: 'Physics, Lab & Dark Room' }
    ],
    highlights: [
      'Department of Statistics (positioned immediately before Mathematics)',
      'Department of Mathematics calculus, algebra & analytical geometry halls',
      'Connects directly eastward to Physics, Physics Lab & Dark Room'
    ],
    hotspots: [
      {
        id: 'stats-room',
        label: 'Department of Statistics',
        description: 'Positioned before Mathematics for probability & data analysis.',
        xPercent: 34,
        yPercent: 50
      },
      {
        id: 'math-room',
        label: 'Department of Mathematics',
        description: 'Pure & applied mathematics classrooms.',
        xPercent: 72,
        yPercent: 50
      }
    ],
    locationNote: 'Right Academic Corridor · Statistics Before Mathematics',
    mapX: 72.5,
    mapY: 36.5,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '64 m Right Side',
      walkingSteps: [
        'Walk straight across the Big Lawn to the Principal’s Office line.',
        'Turn right alongside General Staff Room & Islamiat/English corridor.',
        'Continue into Statistics (first) and Mathematics immediately beyond it.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 49 },
        { x: 59, y: 49 },
        { x: 72.5, y: 36.5 }
      ]
    }
  },
  {
    id: 'physics-lab-darkroom',
    name: 'Physics, Physics Lab & Dark Room',
    shortName: 'Physics, Lab & Dark Room',
    subtitle: 'East Right Corridor Past Mathematics · Optics Dark Room & Mechanics Lab',
    category: 'Laboratories',
    stopNumber: '13',
    svgType: 'science-lab',
    badge: 'Physics & Dark Room · Right Side',
    description:
      'Past Statistics and Mathematics along the right-hand academic corridor sit the Department of Physics, the Physics Practical Laboratory, and the specialized Optics Dark Room for light, prism, spectrometer, and laser experiments.',
    keySpecs: [
      { label: 'Facilities', value: 'Dept, Lab & Dark Room' },
      { label: 'Optics Room', value: 'Light-Sealed Dark Room' },
      { label: 'Equipment', value: 'Spectrometers & Circuits' },
      { label: 'Side', value: 'East Right Corridor' }
    ],
    highlights: [
      'Department of Physics theory lecture rooms',
      'Full Physics Laboratory for mechanics, electricity & magnetism practicals',
      'Dedicated Dark Room for optical refraction, diffraction & wave experiments'
    ],
    hotspots: [
      {
        id: 'physics-lab-bench',
        label: 'Physics Practical Hall',
        description: 'Electrical bridges, pendulums, and mechanics apparatus.',
        xPercent: 36,
        yPercent: 50
      },
      {
        id: 'optics-dark-room',
        label: 'Physics Optics Dark Room',
        description: 'Light-controlled chamber for optical bench and prism practicals.',
        xPercent: 78,
        yPercent: 50
      }
    ],
    locationNote: 'East Right Corridor · Past Mathematics',
    mapX: 88.5,
    mapY: 36.5,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '72 m Right Side',
      walkingSteps: [
        'Walk straight across the Big Lawn to the Principal’s Office and turn right.',
        'Pass the General Staff Room, Islamiat/English, Statistics, and Mathematics.',
        'Enter Physics, the Physics Lab, and the Optics Dark Room.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 49 },
        { x: 59, y: 49 },
        { x: 88.5, y: 36.5 }
      ]
    }
  },
  {
    id: 'greenhouse-prayer-ground',
    name: 'Assembly Ground, Flag Hoisting, Greenhouse & Prayer Room',
    shortName: 'Assembly, Flag, Greenhouse & Prayer',
    subtitle: 'Before Zoology & Botany Garden · Morning Assembly, Flag Hoisting, Lawn, Greenhouse & Prayer Room',
    category: 'Student Life',
    stopNumber: '14',
    svgType: 'courtyard',
    badge: 'Before Zoology · Assembly & Flag',
    description:
      'Directly before the Zoology & Botany garden and laboratories on the upper-right campus sits the Morning Assembly & Flag Hoisting Ground with its flagpole and dais, alongside the green Lawn, Botanical Greenhouse, and quiet Prayer Room (Namaz Hall).',
    keySpecs: [
      { label: 'Main Feature', value: 'Assembly & Flag Hoisting' },
      { label: 'Garden & Ground', value: 'Lawn & Playing Ground' },
      { label: 'Facilities', value: 'Greenhouse & Prayer Room' },
      { label: 'Next Ahead', value: 'Zoology & Botany Labs' }
    ],
    highlights: [
      'Morning Assembly Courtyard & National Flag Hoisting Podium right before Zoology & Botany',
      'Green Lawn, open Playing Ground, and Botanical Greenhouse for live specimen cultivation',
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
    mapX: 72,
    mapY: 22,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '74 m North-East',
      walkingSteps: [
        'Walk straight across the Big Lawn past the Principal’s Office line.',
        'Bear right toward the upper-right campus past Physics & Mathematics.',
        'Arrive at the Assembly & Flag Hoisting Ground, Lawn, Greenhouse & Prayer Room right before Zoology & Botany.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 29 },
        { x: 72, y: 22 }
      ]
    }
  },
  {
    id: 'zoology-botany-labs',
    name: 'Zoology, Zoology Lab & Botany, Botany Lab',
    shortName: 'Zoology & Botany Labs',
    subtitle: 'Upper-Right Past Assembly, Flag Hoisting, Garden, Greenhouse & Prayer Room',
    category: 'Laboratories',
    stopNumber: '15',
    svgType: 'science-lab',
    badge: 'Life Sciences · Right North',
    description:
      'Immediately beyond the Assembly & Flag Hoisting Ground, Garden Lawn, Greenhouse, and Prayer Room on the upper-right side sit the Departments of Zoology and Botany along with the dedicated Zoology Lab, Botany Lab, microscopy stations, and specimen archives.',
    keySpecs: [
      { label: 'Departments', value: 'Zoology & Botany' },
      { label: 'Labs', value: 'Zoology Lab & Botany Lab' },
      { label: 'Programs', value: 'Pre-Medical & BS Zoology' },
      { label: 'Before It', value: 'Assembly, Flag & Garden' }
    ],
    highlights: [
      'Department of Zoology & Zoology Lab with comparative anatomy specimens',
      'Department of Botany & Botany Lab connected to the Greenhouse flora',
      'Preceded directly by Assembly Ground, Flag Hoisting, Lawn, Greenhouse & Prayer Room'
    ],
    hotspots: [
      {
        id: 'zoo-lab',
        label: 'Zoology & Zoology Lab',
        description: 'Microscopes, anatomical charts, and zoology specimen archives.',
        xPercent: 32,
        yPercent: 48
      },
      {
        id: 'botany-lab',
        label: 'Botany & Botany Lab',
        description: 'Plant taxonomy lab and preserved herbarium hall.',
        xPercent: 72,
        yPercent: 48
      }
    ],
    locationNote: 'Upper-Right Campus · Past Assembly, Flag & Greenhouse',
    mapX: 88.5,
    mapY: 22,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '82 m North-East',
      walkingSteps: [
        'Walk straight from the Main Gate past the Big Lawn and Principal’s Office line.',
        'Bear right through the Assembly & Flag Hoisting Ground, Greenhouse & Prayer Room.',
        'Arrive at Zoology, Zoology Lab, Botany, and Botany Lab.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 29 },
        { x: 72, y: 22 },
        { x: 88.5, y: 22 }
      ]
    }
  },
  {
    id: 'hostel-computer-lab',
    name: 'College Hostel (Main Residential Block)',
    shortName: 'College Hostel',
    subtitle: 'Right Beside the Unified IT & Humanities Corridor · Solar-Powered Multi-Wing Hostel',
    category: 'Student Life',
    stopNumber: '16',
    svgType: 'courtyard',
    badge: 'West Campus · Big Hostel Block',
    description:
      'Turning left onto the pathway between two grills brings you past the unified corridor building (housing Computer Lab, Computer Office, Big Multimedia Room, Pakistan Studies, Urdu & Physical Education with 1st-Floor Commerce above) straight into Government Girls Zubaida College’s large, solar-equipped Residential Hostel.',
    keySpecs: [
      { label: 'Approach', value: 'Left Path Between 2 Grills' },
      { label: 'Scale', value: 'Large Residential Block' },
      { label: 'Beside It', value: 'One-Corridor Building' },
      { label: 'Power', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Expansive multi-wing girls hostel equipped with rooftop solar panels for uninterrupted power',
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
    mapX: 11.3,
    mapY: 30.5,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '78 m Straight · Left Grill Path',
      walkingSteps: [
        'Walk straight from the Main Gate past the Big Lawn and Principal’s Office/Chemistry line.',
        'Turn left onto the pathway enclosed between two grills.',
        'Pass the Big Multimedia Room and Computer Lab & Computer Office straight into the Big College Hostel.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 34.5 },
        { x: 35.2, y: 34.5 },
        { x: 24.4, y: 34.5 },
        { x: 11.3, y: 30.5 }
      ]
    }
  },
  {
    id: 'computer-lab',
    name: 'Computer Lab & Computer Office',
    shortName: 'Computer Lab & Office',
    subtitle: 'Beside Hostel in One Corridor (with Big Multimedia, Pak Studies, Urdu & PE)',
    category: 'Laboratories',
    stopNumber: '17',
    svgType: 'computer-lab',
    badge: 'One Corridor Beside Hostel · Solar Roof',
    description:
      'Located right beside the large College Hostel in one continuous ground-floor corridor—connected with the Big Computer Multimedia Room, Pakistan Studies, Urdu, and Physical Education (under 1st-floor Commerce)—the Computer Lab & Computer Office feature modern desktop terminals, fiber networking, and solar-backed power.',
    keySpecs: [
      { label: 'Workstations', value: 'Modern Desktop Systems' },
      { label: 'Same Corridor', value: 'Big Multimedia, Pak Studies, Urdu, PE' },
      { label: '1st Floor Above', value: 'Commerce & Library' },
      { label: 'Energy', value: 'Rooftop Solar Panels' }
    ],
    highlights: [
      'Situated directly beside the Big College Hostel inside one unified ground-floor corridor',
      'Houses both the practical Computer Lab workstations and Computer Office administration',
      'Connected directly in-corridor to Big Multimedia Room, Pakistan Studies, Urdu & Physical Education'
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
    mapX: 24.4,
    mapY: 34.5,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '70 m Straight · Left Grill Path',
      walkingSteps: [
        'Walk straight from the Main Gate past the Big Lawn and Principal’s Office/Chemistry line.',
        'Turn left onto the path between two grills past the Big Computer Multimedia Room.',
        'Enter the Computer Lab & Computer Office right beside the Hostel in the same corridor.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 34.5 },
        { x: 35.2, y: 34.5 },
        { x: 24.4, y: 34.5 }
      ]
    }
  },
  {
    id: 'computer-multimedia-room',
    name: 'Big Computer Multimedia Room & Smart Hall',
    shortName: 'Big Multimedia Room',
    subtitle: 'Extra-Large Smart Hall in One Corridor Beside Computer Office, Hostel & Humanities',
    category: 'Laboratories',
    stopNumber: '18',
    svgType: 'multimedia-room',
    badge: 'One Corridor · Wide Smart Hall',
    description:
      'Occupying an extra-spacious hall at the entry of the unified corridor beside the Computer Office, Computer Lab, and College Hostel—and linked directly in one corridor to Pakistan Studies, Urdu, and Physical Education below the 1st-floor Commerce wing—the Big Computer Multimedia Room hosts HD smart projections, seminars, and software demos.',
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
    mapX: 35.2,
    mapY: 34.5,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '64 m Straight · Left Grill Path',
      walkingSteps: [
        'Walk straight from the Main Gate past the Big Lawn and Chemistry/Principal line.',
        'Turn left onto the pathway enclosed between two grills.',
        'Enter the Big Computer Multimedia Room inside the same corridor alongside Computer Lab, Computer Office & Hostel.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 34.5 },
        { x: 35.2, y: 34.5 }
      ]
    }
  },
  {
    id: 'tennis-volleyball-grounds',
    name: 'Tennis Court & Volleyball Playing Ground',
    shortName: 'Tennis & Volleyball Court',
    subtitle: 'Beside Hostel & Opening Directly Into Physical Education Corridor',
    category: 'Student Life',
    stopNumber: '19',
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
      'Connects straight into the Physical Education, Urdu & Pak Studies corridor'
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
    mapX: 11.3,
    mapY: 11.2,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '82 m North-West',
      walkingSteps: [
        'Walk straight from the Main Gate past the Big Lawn and turn left onto the two-grill path.',
        'Walk along the unified corridor past Computer Lab, Computer Office & Pak Studies/Urdu/Physical Education.',
        'Step out beside Physical Education directly onto the Tennis Court & Volleyball Ground.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 34.5 },
        { x: 30.3, y: 34.5 },
        { x: 30.3, y: 21.8 },
        { x: 11.3, y: 11.2 }
      ]
    }
  },
  {
    id: 'pak-urdu-pe',
    name: 'Pakistan Studies, Urdu & Physical Education',
    shortName: 'Pak Studies, Urdu & Physical Ed.',
    subtitle: 'Same Ground-Floor Corridor with Computer Lab, Computer Office & Big Multimedia Room',
    category: 'Academics',
    stopNumber: '20',
    svgType: 'academic-wing',
    badge: 'One Corridor · Same Building',
    description:
      'Inside the very same ground-floor corridor alongside the Computer Lab, Computer Office, and Big Computer Multimedia Room beside the Hostel sit the Departments of Pakistan Studies, Urdu Literature, and Physical Education—opening onto the Tennis & Volleyball Ground and sitting directly beneath the 1st-floor Commerce Department & Commerce Library in the same building.',
    keySpecs: [
      { label: 'In Same Corridor', value: 'Comp Lab/Office & Multimedia' },
      { label: 'Departments', value: 'Pak Studies, Urdu, Phys. Ed.' },
      { label: 'Same Building (1st Fl.)', value: 'Commerce Dept. & Library' },
      { label: 'Rooftop', value: 'Solar Panels Equipped' }
    ],
    highlights: [
      'Shares ONE unified ground-floor corridor with Computer Lab, Computer Office & Big Multimedia Room beside Hostel',
      'Houses Pakistan Studies, Urdu Literature, and Physical Education next to the Tennis & Volleyball Ground',
      'Directly below 1st-Floor Commerce Department & Commerce Library inside the same solar-powered building'
    ],
    hotspots: [
      {
        id: 'urdu-pak',
        label: 'Pakistan Studies & Urdu',
        description: 'Lecture rooms for Urdu literature and Pakistan Studies inside the unified corridor.',
        xPercent: 35,
        yPercent: 48
      },
      {
        id: 'pe-office',
        label: 'Physical Education Dept.',
        description: 'Sports faculty desk opening onto the adjacent Tennis & Volleyball grounds.',
        xPercent: 74,
        yPercent: 52
      }
    ],
    locationNote: 'Ground Floor Same Corridor Beside Hostel · Solar Powered',
    mapX: 30.3,
    mapY: 21.8,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '80 m North-West',
      walkingSteps: [
        'Walk straight along the twin grill path past the Big Lawn and turn left onto the two-grill corridor.',
        'Enter the unified corridor past the Big Multimedia Room and Computer Lab/Computer Office beside the Hostel.',
        'Continue straight down the same corridor to Pakistan Studies, Urdu & Physical Education.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 34.5 },
        { x: 30.3, y: 34.5 },
        { x: 30.3, y: 21.8 }
      ]
    }
  },
  {
    id: 'commerce-dept-library',
    name: 'Commerce Department & Commerce Library (1st Floor)',
    shortName: 'Commerce Dept. & Library (1st Fl.)',
    subtitle: '1st Floor of the Same Corridor Building (Above Computer Lab, Multimedia, Pak Studies, Urdu & PE)',
    category: 'Academics',
    stopNumber: '21',
    svgType: 'library',
    badge: '1st Floor · Same Building · Solar Roof',
    description:
      'Located on the 1st Floor of the EXACT SAME building directly above the ground-floor corridor (Computer Lab, Computer Office, Big Multimedia Room, Pakistan Studies, Urdu & Physical Education) beside the Hostel, the Commerce Department and specialized Commerce Library house accounting, finance, banking, and business studies resources under solar-powered rooftops.',
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
    mapX: 30.3,
    mapY: 10.8,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '84 m North-West · 1st Floor Same Bldg',
      walkingSteps: [
        'Walk straight past the Big Lawn and turn left onto the two-grill corridor beside the Hostel.',
        'Walk along the unified ground-floor corridor housing Computer Lab, Computer Office, Big Multimedia, Pak Studies, Urdu & PE.',
        'Take the staircase inside the SAME building up to the 1st Floor Commerce Department & Commerce Library.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 34.5 },
        { x: 30.3, y: 34.5 },
        { x: 30.3, y: 21.8 },
        { x: 30.3, y: 10.8 }
      ]
    }
  },
  {
    id: 'sindhi-economics-physiology-ground',
    name: 'Big Ground, Lawn → Sindhi, Economics & Physiology',
    shortName: 'Big Ground → Sindhi, Econ & Physiology',
    subtitle: 'Straight Path North: Big Ground & Green Lawn First, Then Sindhi, Economics & Physiology',
    category: 'Academics',
    stopNumber: '22',
    svgType: 'sports',
    badge: 'North Straight · Ground First',
    description:
      'Following the straight path north past the Principal’s Office and Chemistry line brings you FIRST onto Zubaida College’s spacious North Big Ground & Green Lawn; walking across the ground directly ahead leads to the in-line Departments of Sindhi, Economics, and Physiology.',
    keySpecs: [
      { label: 'Comes First', value: 'Big Ground & Green Lawn' },
      { label: 'Next Ahead', value: 'Sindhi, Economics, Physiology' },
      { label: 'Pathway', value: 'Straight North Spine' },
      { label: 'Care Staff', value: 'Lawn Gardener' }
    ],
    highlights: [
      'Big Ground & Green Lawn appear FIRST along the straight north path',
      'Immediately beyond the ground stand the in-line Departments of Sindhi, Economics & Physiology',
      'Maintained by campus gardeners with shaded trees and athletics lawn'
    ],
    hotspots: [
      {
        id: 'big-ground-north',
        label: 'North Big Ground & Lawn (First)',
        description: 'Expansive enclosed green sports ground and lawn encountered first walking straight.',
        xPercent: 50,
        yPercent: 68
      },
      {
        id: 'sep-depts',
        label: 'Sindhi, Economics & Physiology',
        description: 'Three adjacent departments positioned immediately beyond the Big Ground.',
        xPercent: 48,
        yPercent: 28
      }
    ],
    locationNote: 'North Campus · Ground First, Then Sindhi, Economics & Physiology',
    mapX: 52.5,
    mapY: 9,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '92 m Straight North',
      walkingSteps: [
        'Walk straight from the Main Gate along the twin grill paths past the Clerk Office and Big Lawn.',
        'Continue straight north past the Principal’s Office / Chemistry line onto the Big Ground & Green Lawn FIRST.',
        'Walk straight across the Big Ground to reach Sindhi, Economics, and Physiology beyond it.'
      ],
      routePath: [
        { x: 50, y: 91 },
        { x: 50, y: 49 },
        { x: 52.5, y: 21 },
        { x: 52.5, y: 9 }
      ]
    }
  }
];
