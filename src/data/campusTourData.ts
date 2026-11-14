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
  mapY: number; // 0-100% vertical coordinate on campus map (90 = bottom Main Gate, 10 = north back campus)
  gateDirections: GateDirections;
  isCustom?: boolean;
}

export const GATE_COORDS = { x: 50, y: 90 };

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
    label: 'Entering Main College Gate',
    leftView: 'College Canteen (near) & Central Library (at a distance)',
    aheadView: 'Straight entrance walkway into campus',
    rightView: 'Notice Board & Admission Help Desk'
  },
  {
    progress: 0.28,
    label: 'Moving Straight Past Entrance Plaza',
    leftView: 'Clerk Office on your left · Central Library deeper left',
    aheadView: 'Twin paths separated by small central grill',
    rightView: 'Walkway toward IT Complex & Science Wing'
  },
  {
    progress: 0.58,
    label: 'Walking Along Twin Ways Separated by Small Grill',
    leftView: 'Shaded green lawn & trees on your left side',
    aheadView: 'Twin divided lanes continuing forward',
    rightView: 'Shaded green lawn & trees on your right side'
  },
  {
    progress: 0.85,
    label: 'Completing Lawn Stretch',
    leftView: 'Principal’s Office entrance coming up on left',
    aheadView: 'Central Auditorium ahead',
    rightView: 'Academic Wing 2 & Science Block B'
  },
  {
    progress: 1,
    label: 'Arrived at Principal’s Office (Left Side)',
    leftView: 'Principal’s Office & Executive Suite',
    aheadView: 'North Auditorium & Sports Lawn',
    rightView: 'East Campus Courtyard'
  }
];

export const CAMPUS_TOUR_STOPS: TourFacility[] = [
  {
    id: 'historic-gateway',
    name: 'Main College Gate & Historic Archway',
    shortName: 'Main Gate',
    subtitle: 'Visitor Entry Point · Canteen on Left & Central Library at a Distance',
    category: 'Administration',
    stopNumber: '01',
    imageSrc: '/assets/aistudio/campus_86930cb8.jpg',
    svgType: 'courtyard',
    badge: 'Entry Point · Estd 1953',
    description:
      'Step inside the 1953 iron-arched Main Gate of Government Girls Zubaida College from Pathan Colony Road. Immediately on your left sits the College Canteen, with the Central Library visible further left in the distance, while the main pathway leads straight ahead past the Clerk Office toward the shaded twin lawns and Principal’s Office.',
    keySpecs: [
      { label: 'Founded', value: '1953' },
      { label: 'Immediate Left', value: 'Canteen & Library' },
      { label: 'Walk Straight', value: 'Clerk Office (Left)' },
      { label: 'Further Straight', value: 'Twin Lawns & Principal' }
    ],
    highlights: [
      'On your immediate left upon entering: College Canteen',
      'Visible further left at a distance: Central College Library',
      'Straight ahead walkway leads past the Clerk Office on the left',
      'Continues through twin walkways separated by a small grill with trees and lawns on both sides'
    ],
    hotspots: [
      {
        id: 'arch',
        label: 'Historic Archway',
        description: 'The iconic 1953 wrought-iron archway welcoming students and visitors.',
        xPercent: 50,
        yPercent: 22
      },
      {
        id: 'canteen-left',
        label: 'Canteen (Left)',
        description: 'Located on your left side right after entering the Main Gate.',
        xPercent: 18,
        yPercent: 78
      },
      {
        id: 'straight-path',
        label: 'Straight Central Path',
        description: 'Walk straight forward toward Clerk Office, twin grill walkways, and Principal’s Office.',
        xPercent: 52,
        yPercent: 68
      }
    ],
    locationNote: 'South Boundary · Pathan Colony Road (Opposite Central Jail)',
    mapX: 50,
    mapY: 90,
    gateDirections: {
      turn: 'Entry Gate',
      distanceFromGate: '0 m (Start Point)',
      walkingSteps: [
        'Enter through the Main College Gate archway.',
        'Look to your left for the College Canteen, with the Central Library further left at a distance.',
        'Walk straight forward to reach the Clerk Office (left), twin grill-divided lawn pathways, and Principal’s Office (left).'
      ],
      routePath: [{ x: 50, y: 90 }]
    }
  },
  {
    id: 'college-canteen',
    name: 'College Canteen',
    shortName: 'Canteen',
    subtitle: 'On Your Left Immediately Upon Entering the Main Gate',
    category: 'Student Life',
    stopNumber: '02',
    svgType: 'courtyard',
    badge: 'Left Inside Gate · Student Refreshments',
    description:
      'As soon as a visitor enters the Main College Gate, the College Canteen is situated right on the left side—providing students and visitors with refreshments, snacks, tea, and shaded seating near the entrance plaza.',
    keySpecs: [
      { label: 'Direction', value: 'On Left at Gate' },
      { label: 'Walk Time', value: '15 Meters Left' },
      { label: 'Beyond Canteen', value: 'Central Library' },
      { label: 'Services', value: 'Snacks & Cool Water' }
    ],
    highlights: [
      'Positioned immediately on your left as you step inside the College Gate',
      'Hygienic student tuck shop with chilled drinking water dispensers',
      'Pathway continues further left at a distance toward the Central College Library'
    ],
    hotspots: [
      {
        id: 'canteen-counter',
        label: 'Refreshments Counter',
        description: 'Student snack and tea counter located on the left side inside the gate.',
        xPercent: 36,
        yPercent: 54
      },
      {
        id: 'canteen-seating',
        label: 'Shaded Seating Area',
        description: 'Clean benches under trees for break-time refreshments.',
        xPercent: 68,
        yPercent: 60
      }
    ],
    locationNote: 'Left Side Inside Main Gate',
    mapX: 27,
    mapY: 81,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '15 m Left',
      walkingSteps: [
        'Enter through the Main College Gate.',
        'Turn immediately to your left side.',
        'You will see the College Canteen right beside the entrance area.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 81 },
        { x: 27, y: 81 }
      ]
    }
  },
  {
    id: 'central-library',
    name: 'Central College Library & Reading Wing',
    shortName: 'Central Library',
    subtitle: 'On the Left Side at a Distance Past the Canteen · 15,000+ Books',
    category: 'Library',
    stopNumber: '03',
    svgType: 'library',
    badge: 'Left Side at a Distance · 15,000+ Volumes',
    description:
      'Looking to the left at a distance as you enter the Main College Gate—past the College Canteen—stands the Central College Library. It holds over 15,000 volumes, Government Book Bank textbooks, past BISE papers, and 120 quiet reading seats.',
    keySpecs: [
      { label: 'Direction', value: 'Left at a Distance' },
      { label: 'Book Capacity', value: '15,000+ Volumes' },
      { label: 'Reading Seats', value: '120 Students' },
      { label: 'Lending Scheme', value: 'Free Book Bank' }
    ],
    highlights: [
      'Located on the left side at a distance when entering from the Main Gate',
      'Government Book Bank offering free textbook lending for students',
      'Reference Hall for Pre-Medical, Computer Science, Commerce & BS Zoology'
    ],
    hotspots: [
      {
        id: 'stacks',
        label: 'Main Book Stacks',
        description: 'Open-access shelving categorized by Dewey Decimal & subject disciplines.',
        xPercent: 32,
        yPercent: 40
      },
      {
        id: 'reading-tables',
        label: 'Silent Study Desks',
        description: 'Individual and group study tables with natural daylight.',
        xPercent: 68,
        yPercent: 65
      },
      {
        id: 'desk',
        label: "Librarian's Issue Desk",
        description: 'Library card issuing and book bank counter.',
        xPercent: 15,
        yPercent: 60
      }
    ],
    locationNote: 'Left Campus Zone (At a Distance Past Canteen)',
    mapX: 14,
    mapY: 56,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '55 m Left (At a Distance)',
      walkingSteps: [
        'Enter the Main College Gate and look toward your left past the College Canteen.',
        'Follow the left-side campus pathway continuing further inward at a distance.',
        'Arrive at the Central College Library & Reading Wing on the left.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 81 },
        { x: 27, y: 81 },
        { x: 14, y: 56 }
      ]
    }
  },
  {
    id: 'clerk-office',
    name: 'Clerk Office & Student Records',
    shortName: 'Clerk Office',
    subtitle: 'Walk Straight from the Gate · Located on Your Left Side',
    category: 'Administration',
    stopNumber: '04',
    svgType: 'principal-office',
    badge: 'Straight Ahead · Left Side',
    description:
      'Walking straight forward from the Main Gate entrance brings visitors right to the Clerk Office on the left side—handling student enrollment forms, marksheet verification, bonafide certificates, SECCAP admission slips, and official correspondence.',
    keySpecs: [
      { label: 'Direction', value: 'Straight · Left Side' },
      { label: 'Distance', value: '25 Meters Straight' },
      { label: 'Office Hours', value: '8:00 AM – 2:00 PM' },
      { label: 'Services', value: 'Records & Verification' }
    ],
    highlights: [
      'Directly reachable by walking straight inside the gate and checking the left side',
      'Handles SECCAP admission verification, enrollment slips & student records',
      'Sits just before the twin grill-separated lawn walkways leading to the Principal’s Office'
    ],
    hotspots: [
      {
        id: 'clerk-counter',
        label: 'Student Records Window',
        description: 'Document verification, bonafide certificates, and enrollment registration.',
        xPercent: 32,
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
    locationNote: 'Central Walkway · On the Left Side After Entering Straight',
    mapX: 35,
    mapY: 72,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '25 m Straight · Left',
      walkingSteps: [
        'Enter the Main College Gate and walk straight forward along the main path.',
        'Move straight past the entrance plaza (passing Canteen turn-off on the far left).',
        'On your left side sits the Clerk Office.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 72 },
        { x: 35, y: 72 }
      ]
    }
  },
  {
    id: 'grill-divided-walkway',
    name: 'Twin Ways (Small Grill) & Shaded Lawns',
    shortName: 'Twin Grill Lawns',
    subtitle: 'Straight Past Clerk Office · Two Ways Separated by Small Grill with Trees Left & Right',
    category: 'Student Life',
    stopNumber: '05',
    svgType: 'courtyard',
    badge: 'Central Promenade · Trees Left & Right',
    description:
      'Moving straight forward past the Clerk Office brings you to Zubaida College’s signature shaded central promenade: two parallel paved walking lanes separated down the middle by a small iron grill, bordered on both the left and right sides by lush green lawns and tall shade trees.',
    keySpecs: [
      { label: 'Layout', value: 'Two Divided Lanes' },
      { label: 'Center Divider', value: 'Small Iron Grill' },
      { label: 'Greenery', value: 'Lawn & Trees Both Sides' },
      { label: 'Ahead Left', value: 'Principal’s Office' }
    ],
    highlights: [
      'Two clean parallel walkways separated by a small central iron grill',
      'Shaded lawns and mature trees lining both the left and right sides',
      'Leads straight ahead toward the Principal’s Office on the left side after some walking distance'
    ],
    hotspots: [
      {
        id: 'small-grill',
        label: 'Small Center Grill Divider',
        description: 'Decorative low grill neatly separating the twin pedestrian lanes.',
        xPercent: 50,
        yPercent: 52
      },
      {
        id: 'left-lawn-trees',
        label: 'Left Lawn & Shade Trees',
        description: 'Lush manicured lawn bordered by tall trees on the left side.',
        xPercent: 24,
        yPercent: 55
      },
      {
        id: 'right-lawn-trees',
        label: 'Right Lawn & Shade Trees',
        description: 'Shaded green garden lawn along the right side of the twin walkway.',
        xPercent: 76,
        yPercent: 55
      }
    ],
    locationNote: 'Central Promenade · Between Clerk Office & Principal’s Office',
    mapX: 50,
    mapY: 54,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '45 m Straight',
      walkingSteps: [
        'From the Main Gate, walk straight forward past the Clerk Office on your left.',
        'Step onto the twin parallel walkways separated down the center by a small grill.',
        'Enjoy green lawns and trees on both your left and right as you continue straight ahead.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 72 },
        { x: 50, y: 54 }
      ]
    }
  },
  {
    id: 'principal-office',
    name: 'Principal’s Office & Executive Suite',
    shortName: 'Principal’s Office',
    subtitle: 'After Walking Straight Through the Grill-Divided Lawn Way · On Your Left Side',
    category: 'Administration',
    stopNumber: '06',
    svgType: 'principal-office',
    badge: 'College Leadership · Left Side Ahead',
    description:
      'Continuing straight along the twin walkways separated by the small grill—with lawns and trees on both left and right—after some walking distance you reach the Principal’s Office on your left side, serving as the executive office of Principal Prof. Yasmeen Panhwar.',
    keySpecs: [
      { label: 'Principal', value: 'Prof. Yasmeen Panhwar' },
      { label: 'Direction', value: 'Straight · Left Side' },
      { label: 'Distance', value: '68 Meters Inside' },
      { label: 'Office Hours', value: '8:00 AM – 2:00 PM' }
    ],
    highlights: [
      'Positioned on the left side after walking past the twin grill-divided lawn path',
      'Executive office overseeing Intermediate, Associate & BS 4-Year degree programs',
      'Academic Honor Wall showcasing Zubaida College’s BISE toppers since 1953'
    ],
    hotspots: [
      {
        id: 'principal-desk',
        label: 'Principal’s Executive Desk',
        description: 'Office of Prof. Yasmeen Panhwar guiding institutional standards and student welfare.',
        xPercent: 50,
        yPercent: 42
      },
      {
        id: 'honor-roll-wall',
        label: '1953 Legacy & Merit Wall',
        description: 'Archival display honoring past Principals and provincial board toppers.',
        xPercent: 22,
        yPercent: 34
      },
      {
        id: 'admin-counter',
        label: 'Visitor Waiting Veranda',
        description: 'Shaded entrance veranda facing the lawn walkway for parents and guests.',
        xPercent: 78,
        yPercent: 62
      }
    ],
    locationNote: 'Left Side · Past Twin Grill-Divided Lawn Walkway',
    mapX: 35,
    mapY: 38,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '68 m Straight · Left',
      walkingSteps: [
        'Enter the Main Gate and walk straight forward past the Clerk Office on your left.',
        'Continue straight along the twin ways separated by a small grill, with lawns and trees on left and right.',
        'After walking past the lawn stretch, turn to your left side to enter the Principal’s Office.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 72 },
        { x: 50, y: 54 },
        { x: 50, y: 38 },
        { x: 35, y: 38 }
      ]
    }
  },
  {
    id: 'seccap-help-desk',
    name: 'Notice Board Plaza & SECCAP Help Desk',
    shortName: 'Notice & SECCAP Desk',
    subtitle: 'Merit Lists, Exam Schedules & Admission Guidance Inside Gate Right Side',
    category: 'Administration',
    stopNumber: '07',
    svgType: 'courtyard',
    badge: 'Gate Entry · Right Side',
    description:
      'Located to the right inside the Main Gate entrance plaza so applicants and visitors can check daily circulars, BISE timetables, merit lists, and SECCAP admission instructions upon arrival.',
    keySpecs: [
      { label: 'Position', value: 'Right of Main Gate' },
      { label: 'Distance', value: '15 Meters Right' },
      { label: 'Displays', value: 'Merit Lists & Datesheets' },
      { label: 'Support', value: 'Admission Queries' }
    ],
    highlights: [
      'Glass-enclosed campus Notice Boards updated with daily CED & BISE circulars',
      'Seasonal SECCAP & BS University of Sindh Admission Verification Desk',
      'Right pathway continues toward Computer Science & Science Labs'
    ],
    hotspots: [
      {
        id: 'notice-board',
        label: 'Central Notice Boards',
        description: 'Daily academic schedules, scholarship notices, and exam roll number alerts.',
        xPercent: 45,
        yPercent: 40
      },
      {
        id: 'seccap-table',
        label: 'Admission Help Table',
        description: 'Faculty volunteers assisting Class XI and BS degree applicants.',
        xPercent: 72,
        yPercent: 65
      }
    ],
    locationNote: 'Right Side Inside Main Gate · Entrance Plaza',
    mapX: 72,
    mapY: 81,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '15 m Right',
      walkingSteps: [
        'Enter through the Main College Gate archway.',
        'Turn right immediately across the entrance plaza.',
        'View the glass Notice Boards and SECCAP Admission Help Desk.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 81 },
        { x: 72, y: 81 }
      ]
    }
  },
  {
    id: 'science-labs',
    name: 'Natural Science & Medical Laboratories',
    shortName: 'Natural Science Lab',
    subtitle: 'Physics, Chemistry, Botany, Zoology & Physiology Practical Theatres',
    category: 'Laboratories',
    stopNumber: '08',
    svgType: 'science-lab',
    badge: 'East Wing · Blocks B1 & B2',
    description:
      'Located along the eastern right-hand corridor past the right lawn & trees, these five specialized laboratories serve Pre-Medical, Pre-Engineering, and BS Life Sciences practicals.',
    keySpecs: [
      { label: 'Laboratories', value: '5 Specialized Wings' },
      { label: 'Equipment', value: 'Microscopes & Optics' },
      { label: 'Safety', value: 'Eye-Wash & Extinguishers' },
      { label: 'Capacity', value: '40 Students / Lab' }
    ],
    highlights: [
      'Individual practical benches with burner outlets, sinks, and safety shields',
      'Compound biological microscopes and specimen jars for Botany & Zoology',
      'Human physiological diagnostic kits and optical spectrometer benches'
    ],
    hotspots: [
      {
        id: 'fume-hood',
        label: 'Chemical Preparation Bench',
        description: 'Ventilated chemical workstations and secure reagent storage.',
        xPercent: 28,
        yPercent: 38
      },
      {
        id: 'microscopes',
        label: 'Microscopy Station',
        description: 'Precision optical compound microscopes for cellular analysis.',
        xPercent: 62,
        yPercent: 52
      },
      {
        id: 'physics-optics',
        label: 'Optical Bench',
        description: 'Light refraction, prism benches, and spectrometer tools.',
        xPercent: 84,
        yPercent: 65
      }
    ],
    locationNote: 'East Side Past Right Lawn · Blocks B1 & B2',
    mapX: 80,
    mapY: 56,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '55 m Right Side',
      walkingSteps: [
        'Enter the Main Gate and walk straight past the Clerk Office onto the twin lawn walkway.',
        'Turn right past the right-side lawn and shade trees.',
        'Enter Science Wing Blocks B1 & B2 for Physics, Chemistry, Botany, Zoology & Physiology labs.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 54 },
        { x: 80, y: 56 }
      ]
    }
  },
  {
    id: 'auditorium-hall',
    name: 'College Auditorium & Assembly Hall',
    shortName: 'Auditorium',
    subtitle: 'Regal Venue for Naat Competitions, Debates & Convocations',
    category: 'Student Life',
    stopNumber: '09',
    svgType: 'auditorium',
    badge: 'Central North Hall · 600+ Seats',
    description:
      'Continuing straight north beyond the twin grill walkways and the Principal’s Office brings visitors directly to the Grand College Auditorium for annual prize distributions, Seerat-un-Nabi ﷺ conferences, debates, and convocations.',
    keySpecs: [
      { label: 'Seating', value: '600+ Attendees' },
      { label: 'Audio/Visual', value: 'Full PA & Lighting' },
      { label: 'Events', value: 'Debates, Drama, Naat' },
      { label: 'Position', value: 'North-Center Hall' }
    ],
    highlights: [
      'Large elevated wooden stage with formal podium for Principal addresses',
      'Acoustically tuned hall for Seerat conferences and literary galas',
      'Directly ahead past the twin-lane central lawn promenade'
    ],
    hotspots: [
      {
        id: 'podium',
        label: "Principal's Podium",
        description: 'Formal lectern where college dignitaries deliver keynotes.',
        xPercent: 50,
        yPercent: 35
      },
      {
        id: 'seating',
        label: 'Auditorium Seating',
        description: 'Seating accommodating over 600 students, faculty, and parents.',
        xPercent: 25,
        yPercent: 75
      },
      {
        id: 'stage-lighting',
        label: 'Stage Illuminators',
        description: 'Spotlights and ceremonial banners celebrating academic milestones.',
        xPercent: 78,
        yPercent: 20
      }
    ],
    locationNote: 'North-Center Campus · Straight Beyond Principal’s Office Turn',
    mapX: 50,
    mapY: 24,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '80 m Straight North',
      walkingSteps: [
        'Walk straight from the Main Gate past the Clerk Office and along the twin grill-divided walkways.',
        'Continue straight past the Principal’s Office turn-off on the left.',
        'The arched double doors straight ahead open into the College Auditorium Hall.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 54 },
        { x: 50, y: 24 }
      ]
    }
  },
  {
    id: 'wing-1',
    name: 'Academic Wing 1',
    shortName: 'Wing 1',
    subtitle: 'Commerce · Computer Science · Urdu · Physical Education · Pakistan Studies',
    category: 'Academics',
    stopNumber: '10',
    svgType: 'academic-wing',
    badge: 'Wing 1 · 5 Departments',
    description:
      'Accessible on the north-west side just beyond the Principal’s Office corridor, Academic Wing 1 connects Commerce, Computer Science, Urdu Literature, Physical Education, and Pakistan Studies.',
    keySpecs: [
      { label: 'Departments', value: '5 Subjects Housed' },
      { label: 'Streams', value: 'Commerce, CS, Humanities' },
      { label: 'Facilities', value: 'Lecture Rooms & Labs' },
      { label: 'Access', value: 'West Upper Corridor' }
    ],
    highlights: [
      'Department of Commerce & Accounting classrooms',
      'Department of Computer Science theory & mentoring rooms',
      'Departments of Urdu, Physical Education & Pakistan Studies'
    ],
    hotspots: [
      {
        id: 'wing1-commerce-cs',
        label: 'Commerce & Computer Science',
        description: 'Adjacent classrooms for I.Com, AD Commerce, and HSC Computer Science.',
        xPercent: 25,
        yPercent: 38
      },
      {
        id: 'wing1-urdu-pak',
        label: 'Urdu & Pakistan Studies',
        description: 'Humanities lecture halls dedicated to Urdu literature and national heritage.',
        xPercent: 54,
        yPercent: 52
      },
      {
        id: 'wing1-pe',
        label: 'Physical Education Suite',
        description: 'Faculty office coordinating campus sports and fitness programs.',
        xPercent: 80,
        yPercent: 40
      }
    ],
    locationNote: 'West Corridor · Beyond Principal’s Office',
    mapX: 21,
    mapY: 31,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '75 m North-West',
      walkingSteps: [
        'Walk straight along the twin grill-divided walkways past the left and right lawns.',
        'Turn left past the Principal’s Office veranda.',
        'Continue slightly inward to enter Academic Wing 1.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 38 },
        { x: 35, y: 38 },
        { x: 21, y: 31 }
      ]
    }
  },
  {
    id: 'wing-2',
    name: 'Academic Wing 2',
    shortName: 'Wing 2',
    subtitle: 'Physics · English · Islamiyat · Statistics · Mathematics',
    category: 'Academics',
    stopNumber: '11',
    svgType: 'academic-wing',
    badge: 'Wing 2 · 5 Departments',
    description:
      'Located along the east corridor on the right side of the twin lawn promenade, Academic Wing 2 houses Physics, Mathematics, Statistics, English, and Islamiyat lecture rooms.',
    keySpecs: [
      { label: 'Departments', value: '5 Subjects Housed' },
      { label: 'Focus', value: 'STEM, English & Islamiyat' },
      { label: 'Streams', value: 'Pre-Eng, ICS & General' },
      { label: 'Access', value: 'East Corridor' }
    ],
    highlights: [
      'Department of Physics theory & practical prep classes',
      'Departments of Mathematics & Statistics analytical workshops',
      'Departments of English & Islamic Studies classrooms'
    ],
    hotspots: [
      {
        id: 'wing2-physics',
        label: 'Physics & Quantitative Wing',
        description: 'Lecture rooms for Physics, Mathematics, and Statistics.',
        xPercent: 26,
        yPercent: 42
      },
      {
        id: 'wing2-english',
        label: 'English Language Rooms',
        description: 'Classrooms for academic composition and literary studies.',
        xPercent: 55,
        yPercent: 32
      },
      {
        id: 'wing2-islamiyat',
        label: 'Islamiyat Faculty Suite',
        description: 'Department room for Islamic Studies and Seerat preparation.',
        xPercent: 79,
        yPercent: 58
      }
    ],
    locationNote: 'East Inner Corridor · Right of Twin Lawn Promenade',
    mapX: 68,
    mapY: 42,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '62 m North-East',
      walkingSteps: [
        'Walk straight along the twin grill-divided walkways passing the Clerk Office.',
        'At the shaded right-side lawn, bear right toward the east arcade.',
        'Enter Academic Wing 2 for Physics, Mathematics, Statistics, English, and Islamiyat.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 42 },
        { x: 68, y: 42 }
      ]
    }
  },
  {
    id: 'wing-3',
    name: 'Academic Wing 3',
    shortName: 'Wing 3',
    subtitle: 'Botany · Zoology (Life Sciences Complex)',
    category: 'Laboratories',
    stopNumber: '12',
    svgType: 'academic-wing',
    badge: 'Wing 3 · Life Sciences',
    description:
      'Continuing north along the east corridor past Wing 2 leads into Academic Wing 3—our Life Sciences hub housing the Departments of Botany and Zoology, specimen museums, and herbarium archives.',
    keySpecs: [
      { label: 'Departments', value: 'Botany & Zoology' },
      { label: 'Programs', value: 'Pre-Medical & BS Zoology' },
      { label: 'Archives', value: 'Herbarium & Specimen Hall' },
      { label: 'Position', value: 'North-East Wing' }
    ],
    highlights: [
      'Department of Botany taxonomy & herbarium specimen archives',
      'Department of Zoology comparative anatomy museum & BS study hall',
      'Connected directly to the Natural Science microscopy laboratories'
    ],
    hotspots: [
      {
        id: 'wing3-botany',
        label: 'Department of Botany',
        description: 'Botanical lecture room and preserved plant herbarium collection.',
        xPercent: 32,
        yPercent: 46
      },
      {
        id: 'wing3-zoology',
        label: 'Department of Zoology',
        description: 'Zoology museum specimens and BS research consultation desk.',
        xPercent: 68,
        yPercent: 46
      }
    ],
    locationNote: 'North-East Life Sciences Corridor · Wing 3',
    mapX: 79,
    mapY: 28,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '78 m North-East',
      walkingSteps: [
        'Walk straight from the Main Gate along the twin grill-divided walkway past the right lawn.',
        'Turn right toward Academic Wing 2 and continue north along the east corridor.',
        'Enter Academic Wing 3 for Botany and Zoology rooms.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 42 },
        { x: 68, y: 42 },
        { x: 79, y: 28 }
      ]
    }
  },
  {
    id: 'wing-4',
    name: 'Academic Wing 4',
    shortName: 'Wing 4',
    subtitle: 'Sindhi · Economics · Physiology',
    category: 'Academics',
    stopNumber: '13',
    svgType: 'academic-wing',
    badge: 'Wing 4 · 3 Departments',
    description:
      'On the north-west side just past the Principal’s Office and Wing 1 lies Academic Wing 4, uniting Sindhi Literature, Economics, and Human Physiology.',
    keySpecs: [
      { label: 'Departments', value: 'Sindhi, Economics, Physiology' },
      { label: 'Streams', value: 'Arts, Commerce & Sciences' },
      { label: 'Highlights', value: 'Literary & Diagnostic Rooms' },
      { label: 'Position', value: 'North-West Wing' }
    ],
    highlights: [
      'Department of Sindhi classical literature and regional studies',
      'Department of Economics theory and applied statistical charts',
      'Department of Physiology human anatomy models and practical training'
    ],
    hotspots: [
      {
        id: 'wing4-sindhi',
        label: 'Department of Sindhi',
        description: 'Regional language hall celebrating Sindhi classics and literary societies.',
        xPercent: 24,
        yPercent: 48
      },
      {
        id: 'wing4-economics',
        label: 'Department of Economics',
        description: 'Lecture suite covering microeconomics and fiscal policy.',
        xPercent: 52,
        yPercent: 35
      },
      {
        id: 'wing4-physiology',
        label: 'Department of Physiology',
        description: 'Anatomical models and physiological practical equipment.',
        xPercent: 78,
        yPercent: 56
      }
    ],
    locationNote: 'North-West Academic Corridor · Wing 4',
    mapX: 35,
    mapY: 18,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '82 m North-West',
      walkingSteps: [
        'Walk straight from the Main Gate along the twin grill-divided walkways.',
        'Pass the Principal’s Office turn-off on the left and bear left before the Auditorium.',
        'Academic Wing 4 (Sindhi, Economics, Physiology) sits along the north-west block.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 30 },
        { x: 35, y: 18 }
      ]
    }
  },
  {
    id: 'computer-lab',
    name: 'Advanced Computer Science & IT Lab',
    shortName: 'Computer Science Lab',
    subtitle: 'Home to Sindh Board 2nd & 4th Position Achievers · Python & Figma Studios',
    category: 'Laboratories',
    stopNumber: '14',
    svgType: 'computer-lab',
    badge: 'IT Complex · Ground Floor',
    description:
      'Located on the south-east side of the campus past the Notice Plaza, the Advanced Computer Science & IT Lab powers HSC Computer Science practicals with modern desktop workstations and fiber networking.',
    keySpecs: [
      { label: 'Workstations', value: 'Modern Desktop Systems' },
      { label: 'Internet', value: 'Fiber-Optic Bandwidth' },
      { label: 'Curriculum', value: 'Python, Figma' },
      { label: 'Backup', value: 'Continuous Solar/UPS' }
    ],
    highlights: [
      'Mentorship hub for provincial BISE Board Position holders',
      'Practical training in Python programming, Figma UI/UX, C++ & databases',
      'Uninterrupted solar/UPS power supply during board practicals'
    ],
    hotspots: [
      {
        id: 'pcs',
        label: 'Computing Workstations',
        description: 'Modern desktop terminals running development environments and tools.',
        xPercent: 45,
        yPercent: 55
      },
      {
        id: 'projector',
        label: 'Interactive Smart Screen',
        description: 'High-definition projection system for live programming demos.',
        xPercent: 82,
        yPercent: 28
      },
      {
        id: 'server',
        label: 'Campus Network Hub',
        description: 'Managed switches and secure student network servers.',
        xPercent: 18,
        yPercent: 45
      }
    ],
    locationNote: 'IT Complex Ground Floor · Right Side Past Notice Plaza',
    mapX: 83,
    mapY: 74,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '38 m Right Side',
      walkingSteps: [
        'Enter the Main Gate and turn right past the Notice & SECCAP Desk.',
        'Follow the east entrance pathway directly to the IT Complex.',
        'Enter the Ground Floor doors for the Computer Science Lab.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 81 },
        { x: 72, y: 81 },
        { x: 83, y: 74 }
      ]
    }
  },
  {
    id: 'multimedia-room',
    name: 'Multimedia Room & Smart Learning Studio',
    shortName: 'Multimedia Room',
    subtitle: 'Interactive HD Projection, Audio-Visual Seminars & Design Workshops',
    category: 'Academics',
    stopNumber: '15',
    svgType: 'multimedia-room',
    badge: 'IT Complex · 1st Floor',
    description:
      'Situated on the 1st Floor of the IT Complex on the right-hand side of campus, the Multimedia Room hosts smart-board seminars, Python coding demos, Figma design critiques, and visual lectures.',
    keySpecs: [
      { label: 'Display', value: 'HD Smart Projector' },
      { label: 'Audio', value: 'Surround Sound & Mic' },
      { label: 'Use Cases', value: 'Presentations & Demos' },
      { label: 'Floor', value: 'IT Complex · 1st Floor' }
    ],
    highlights: [
      'Large-format HD projection and smart board across all faculties',
      'Live walkthrough space for Python code, Figma prototypes & science visuals',
      'Air-conditioned tiered media seating for seminars & workshops'
    ],
    hotspots: [
      {
        id: 'smart-screen',
        label: 'HD Projection Screen',
        description: 'Wide-format display for Python demos, Figma reviews, and lectures.',
        xPercent: 50,
        yPercent: 28
      },
      {
        id: 'av-podium',
        label: 'Multimedia Control Podium',
        description: 'Instructor console managing audio and projection switching.',
        xPercent: 20,
        yPercent: 60
      },
      {
        id: 'media-seating',
        label: 'Seminar Seating Area',
        description: 'Collaborative workshop seating with clear sightlines.',
        xPercent: 78,
        yPercent: 68
      }
    ],
    locationNote: 'IT Complex 1st Floor · Right Side Past Notice Plaza',
    mapX: 69,
    mapY: 70,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '35 m Right & Upstairs',
      walkingSteps: [
        'Enter the Main Gate and turn right toward the IT Complex.',
        'Take the IT Complex staircase to the 1st Floor.',
        'The Multimedia Room & Smart Learning Studio is at the top of the stairs.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 81 },
        { x: 69, y: 70 }
      ]
    }
  },
  {
    id: 'sports-lawn',
    name: 'Student Recreation Lawn & Sports Grounds',
    shortName: 'Sports Lawn',
    subtitle: 'Enclosed North Campus Courtyard for Badminton, Table Tennis & Athletics',
    category: 'Student Life',
    stopNumber: '16',
    svgType: 'sports',
    badge: 'North Campus · Private Arena',
    description:
      'At the northern end of the campus behind the Auditorium Hall, our enclosed private sports ground offers girls a secure arena for badminton tournaments, throwball, athletics, and shaded lunch seating.',
    keySpecs: [
      { label: 'Courts', value: 'Badminton & Throwball' },
      { label: 'Privacy', value: '100% Enclosed Campus' },
      { label: 'Recreation', value: 'Garden Lawns & Benches' },
      { label: 'Annual Sports', value: 'Inter-Class Championship' }
    ],
    highlights: [
      'Private high-walled outdoor sports ground exclusively for college students',
      'Marked badminton courts and indoor table tennis setup',
      'Shaded green lawn benches between Academic Wings 3 & 4'
    ],
    hotspots: [
      {
        id: 'badminton',
        label: 'Badminton Court',
        description: 'Marked court for inter-class tournaments and fitness.',
        xPercent: 40,
        yPercent: 60
      },
      {
        id: 'gardens',
        label: 'Shaded Green Lawn',
        description: 'Garden borders with benches beneath indigenous shade trees.',
        xPercent: 75,
        yPercent: 45
      },
      {
        id: 'sports-office',
        label: 'Physical Education Desk',
        description: 'Sports instructor desk issuing rackets and athletics equipment.',
        xPercent: 18,
        yPercent: 40
      }
    ],
    locationNote: 'North Campus Lawn · Behind College Auditorium',
    mapX: 52,
    mapY: 12,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '95 m Straight North',
      walkingSteps: [
        'Walk straight from the Main Gate past the Clerk Office and through the twin grill-divided lawn pathways.',
        'Pass the Principal’s Office turn-off and walk around the College Auditorium Hall.',
        'Arrive at the enclosed North Sports Lawn & Badminton Courts.'
      ],
      routePath: [
        { x: 50, y: 90 },
        { x: 50, y: 24 },
        { x: 52, y: 12 }
      ]
    }
  }
];
