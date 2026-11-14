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

export const GATE_COORDS = { x: 50, y: 89 };

export const CAMPUS_TOUR_STOPS: TourFacility[] = [
  {
    id: 'historic-gateway',
    name: 'Main College Gate & Historic Archway',
    shortName: 'Main Gate',
    subtitle: 'Entry Point · 1953 Wrought-Iron Archway on Pathan Colony Road',
    category: 'Administration',
    stopNumber: '01',
    imageSrc: '/assets/aistudio/campus_86930cb8.jpg',
    svgType: 'courtyard',
    badge: 'Entry Point · Estd 1953',
    description:
      'Your campus walkthrough begins right here at the iconic 1953 entrance archway opposite Hyderabad Central Jail in Pathan Colony, Hirabad. Stepping through the double-gated entrance opens directly onto the campus reception plaza with clear pathways straight into the courtyard, left toward Administration & Library, and right toward Science & IT.',
    keySpecs: [
      { label: 'Founded', value: '1953' },
      { label: 'Gate Security', value: '24/7 Guarded' },
      { label: 'Immediate Left', value: 'Security & Admin' },
      { label: 'Immediate Right', value: 'Help Desk & IT' }
    ],
    highlights: [
      'Historic iron arch bearing "Govt College for Women 1953"',
      'Secure double-gate boundary wall with dedicated student entry lane',
      'Direct sightline straight ahead into the Assembly Courtyard',
      'Orientation board displaying Campus Wing map for first-time visitors'
    ],
    hotspots: [
      {
        id: 'arch',
        label: 'Historic Archway',
        description: 'The iconic 1953 wrought-iron archway dedicated to female higher education.',
        xPercent: 50,
        yPercent: 22
      },
      {
        id: 'security',
        label: 'Security Checkpoint',
        description: 'Dedicated campus security desk ensuring a safe sanctuary for all students.',
        xPercent: 18,
        yPercent: 78
      },
      {
        id: 'courtyard-trees',
        label: 'Assembly Courtyard',
        description: 'Shaded green grounds visible straight ahead inside the gate.',
        xPercent: 78,
        yPercent: 65
      }
    ],
    locationNote: 'South Boundary · Pathan Colony Road (Opposite Central Jail)',
    mapX: 50,
    mapY: 89,
    gateDirections: {
      turn: 'Entry Gate',
      distanceFromGate: '0 m (Start Point)',
      walkingSteps: [
        'Enter through the Main College Iron Archway from Pathan Colony Road.',
        'Security Post is immediately on your left; Notice Board & SECCAP Desk are on your right.',
        'Walk straight north along the central paved walkway to enter the main campus courtyard.'
      ],
      routePath: [{ x: 50, y: 89 }]
    }
  },
  {
    id: 'gate-security-desk',
    name: 'Gate Security Post & Visitor Reception',
    shortName: 'Security Desk',
    subtitle: 'Student ID Verification, Parent Sign-In & Campus Safety Booth',
    category: 'Administration',
    stopNumber: '02',
    svgType: 'courtyard',
    badge: 'Gate Entry · Left Side',
    description:
      'Located immediately to the left upon stepping inside the Main Gate, the Guard & Visitor Reception booth verifies student college ID cards, logs parent/guardian visits, and guides visitors toward the Registrar or Principal’s Office.',
    keySpecs: [
      { label: 'Position', value: 'Left of Main Gate' },
      { label: 'Distance', value: '8 Meters Inside' },
      { label: 'Duty Hours', value: '8:00 AM – 2:30 PM' },
      { label: 'Services', value: 'Visitor Pass & Safety' }
    ],
    highlights: [
      'Mandatory student ID card verification ensuring a safe women-only campus',
      'Visitor pass issuance and directional guidance for parents & guardians',
      'Direct footpath continuing left toward Canteen & Prayer Room or straight to Admin'
    ],
    hotspots: [
      {
        id: 'guard-window',
        label: 'Visitor Sign-In Counter',
        description: 'Register guest arrival and receive directions to the Registrar or Principal Office.',
        xPercent: 35,
        yPercent: 52
      },
      {
        id: 'id-lane',
        label: 'Student Entry Lane',
        description: 'Dedicated morning lane for Intermediate and BS degree students.',
        xPercent: 65,
        yPercent: 62
      }
    ],
    locationNote: 'Immediate Left Inside Main Gate · Entrance Plaza',
    mapX: 35,
    mapY: 82,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '8 m Left',
      walkingSteps: [
        'Step inside the Main College Gate.',
        'Look immediately to your left (8 meters) at the shaded Security & Reception Booth.',
        'Present student ID or sign the parent visitor log before proceeding inward.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 50, y: 82 },
        { x: 35, y: 82 }
      ]
    }
  },
  {
    id: 'seccap-help-desk',
    name: 'Notice Board Plaza & SECCAP Help Desk',
    shortName: 'Notice & SECCAP Desk',
    subtitle: 'Merit Lists, Exam Schedules & Admission Guidance Right Inside the Gate',
    category: 'Administration',
    stopNumber: '03',
    svgType: 'courtyard',
    badge: 'Gate Entry · Right Side',
    description:
      'Placed immediately to the right inside the Main Gate entrance so new applicants and students can check daily college circulars, BISE exam timetables, merit lists, and SECCAP admission instructions before walking to the classrooms.',
    keySpecs: [
      { label: 'Position', value: 'Right of Main Gate' },
      { label: 'Distance', value: '10 Meters Inside' },
      { label: 'Displays', value: 'Merit Lists & Datesheets' },
      { label: 'Support', value: 'Admission Queries' }
    ],
    highlights: [
      'Glass-enclosed campus Notice Boards updated with daily CED & BISE circulars',
      'Seasonal SECCAP & BS University of Sindh Admission Verification Desk',
      'Starting turn-off on the right walkway leading to Computer Science & Science Labs'
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
    locationNote: 'Immediate Right Inside Main Gate · Entrance Plaza',
    mapX: 65,
    mapY: 82,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '10 m Right',
      walkingSteps: [
        'Enter through the Main College Gate archway.',
        'Turn right immediately across the entrance plaza (10 meters).',
        'Check the glass Notice Boards or speak with staff at the SECCAP Admission Help Desk.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 50, y: 82 },
        { x: 65, y: 82 }
      ]
    }
  },
  {
    id: 'assembly-courtyard',
    name: 'Morning Assembly Courtyard & Gardens',
    shortName: 'Assembly Courtyard',
    subtitle: 'Central Shaded Lawn Connecting All Academic Wings',
    category: 'Student Life',
    stopNumber: '04',
    svgType: 'courtyard',
    badge: 'Central Hub · Straight Ahead',
    description:
      'Walking straight ahead from the Main Gate brings you into the heart of the college: a lush, tree-shaded assembly courtyard where daily morning prayers and national anthems take place, and from which verandas branch left and right to every department.',
    keySpecs: [
      { label: 'Direction', value: 'Straight Ahead' },
      { label: 'Distance', value: '25 Meters North' },
      { label: 'Gatherings', value: 'Morning Assembly' },
      { label: 'Junction', value: 'Connects All Wings' }
    ],
    highlights: [
      'Central paved walkway lined with heritage neem and shade trees',
      'Daily morning assembly ground for students and faculty',
      'Central navigation fork: Admin/Library to Left, Science Labs to Right, Auditorium Straight Ahead'
    ],
    hotspots: [
      {
        id: 'assembly-stage',
        label: 'Assembly Podium',
        description: 'Morning announcements, Tilawat, and student honor citations.',
        xPercent: 50,
        yPercent: 44
      },
      {
        id: 'veranda-paths',
        label: 'Shaded Brick Walkways',
        description: 'Covered pathways linking Block A, Block B, and Academic Wings.',
        xPercent: 75,
        yPercent: 65
      }
    ],
    locationNote: 'Center Campus · Straight Ahead from Main Gate',
    mapX: 50,
    mapY: 66,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '25 m Straight',
      walkingSteps: [
        'Enter the Main College Gate and keep walking straight north along the central walkway.',
        'Pass between the Security Booth (left) and Notice Plaza (right).',
        'At 25 meters, step directly into the open shaded Morning Assembly Courtyard.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 50, y: 66 }
      ]
    }
  },
  {
    id: 'principal-office',
    name: 'Principal’s Office & Administrative Wing',
    shortName: 'Principal’s Office',
    subtitle: 'Executive Leadership Suite of Prof. Yasmeen Panhwar & Registrar Counters',
    category: 'Administration',
    stopNumber: '05',
    svgType: 'principal-office',
    badge: 'Administration · Block A Ground',
    description:
      'Located in Block A on the left side of the Assembly Courtyard, the Principal’s Office oversees collegiate governance, admissions verification, bonafide/character certificates, faculty coordination, and student welfare.',
    keySpecs: [
      { label: 'Principal', value: 'Prof. Yasmeen Panhwar' },
      { label: 'Office Hours', value: '8:00 AM – 2:00 PM' },
      { label: 'Block', value: 'Block A · Ground Floor' },
      { label: 'Counters', value: 'Registrar & Accounts' }
    ],
    highlights: [
      'Direct executive office overseeing Intermediate, Associate & BS 4-Year programs',
      'Parent consultation waiting veranda and Registrar document desk',
      'Academic Honor Wall celebrating Zubaida College’s BISE toppers since 1953'
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
        label: 'Admissions & Registrar Desk',
        description: 'Counter for SECCAP enrollment, bonafide certificates, and migration forms.',
        xPercent: 78,
        yPercent: 62
      }
    ],
    locationNote: 'Block A · Ground Floor (Left of Assembly Courtyard)',
    mapX: 24,
    mapY: 60,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '35 m Left of Courtyard',
      walkingSteps: [
        'Enter the Main Gate and walk straight 20 meters toward the Assembly Courtyard.',
        'Turn left onto the shaded Block A veranda.',
        'The Principal’s Office & Registrar Counters are the main double doors straight ahead on the ground floor.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 50, y: 70 },
        { x: 24, y: 60 }
      ]
    }
  },
  {
    id: 'central-library',
    name: 'Central College Library & Reading Wing',
    shortName: 'Central Library',
    subtitle: 'Quiet Sanctuary of 15,000+ Books, Reference Archives & Reading Hall',
    category: 'Library',
    stopNumber: '06',
    svgType: 'library',
    badge: 'Knowledge Hub · 15,000+ Volumes',
    description:
      'Situated on the 1st Floor of Block A above the Administration Wing, the Central Library houses over 15,000 volumes in sciences, literature, commerce, and past BISE board archives alongside 120 quiet reading seats.',
    keySpecs: [
      { label: 'Book Capacity', value: '15,000+ Volumes' },
      { label: 'Reading Seats', value: '120 Students' },
      { label: 'Lending Scheme', value: 'Free Book Bank' },
      { label: 'Floor', value: 'Block A · 1st Floor' }
    ],
    highlights: [
      'Government Book Bank offering free textbook lending for students',
      'Dedicated Reference Section for BS Zoology, Sciences & Commerce',
      'Quiet daylight reading hall with archive of past BISE Hyderabad papers'
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
        description: 'Individual and group study tables with dedicated lighting.',
        xPercent: 68,
        yPercent: 65
      },
      {
        id: 'desk',
        label: "Librarian's Issue Desk",
        description: 'Library card issuing, return counter, and catalog assistance.',
        xPercent: 15,
        yPercent: 60
      }
    ],
    locationNote: 'Block A · 1st Floor North Wing (Above Principal’s Office)',
    mapX: 20,
    mapY: 40,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '55 m Left & Upstairs',
      walkingSteps: [
        'From the Main Gate, walk straight into the Assembly Courtyard and turn left into Block A.',
        'Walk past the Principal’s Office to the main Block A staircase.',
        'Climb to the 1st Floor and turn right into the Central College Library double doors.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 50, y: 70 },
        { x: 24, y: 60 },
        { x: 20, y: 40 }
      ]
    }
  },
  {
    id: 'canteen-prayer-hall',
    name: 'Student Canteen & Prayer Room (Masjid)',
    shortName: 'Canteen & Masjid',
    subtitle: 'Fresh Refreshments Tuck Shop, Water Coolers & Peaceful Prayer Hall',
    category: 'Student Life',
    stopNumber: '07',
    svgType: 'courtyard',
    badge: 'Student Amenities · West Corner',
    description:
      'Tucked neatly along the shaded west garden pathway to the left of the Security Booth, students find filtered chilled water stations, hygienic snacks at the Student Canteen, and a serene carpeted Prayer Hall with wuzu facilities.',
    keySpecs: [
      { label: 'Location', value: 'South-West Corner' },
      { label: 'Amenities', value: 'Tuck Shop & Filtered Water' },
      { label: 'Prayer Area', value: 'Carpeted Masjid & Wuzu' },
      { label: 'Access', value: 'Immediate West Path' }
    ],
    highlights: [
      'Dedicated Student Canteen offering affordable refreshments and seating',
      'Clean, quiet Prayer Hall (Masjid) with enclosed wuzu area',
      'Filtered chilled drinking water dispensers along the west veranda'
    ],
    hotspots: [
      {
        id: 'canteen-counter',
        label: 'Refreshments Counter',
        description: 'Fresh snacks, tea, and bottled beverages managed for college students.',
        xPercent: 30,
        yPercent: 55
      },
      {
        id: 'prayer-room',
        label: 'Student Prayer Hall',
        description: 'Peaceful carpeted room for daily prayers and quiet reflection.',
        xPercent: 72,
        yPercent: 45
      }
    ],
    locationNote: 'South-West Garden · Left Path Past Security Desk',
    mapX: 16,
    mapY: 74,
    gateDirections: {
      turn: 'Turn Left',
      distanceFromGate: '32 m Far Left',
      walkingSteps: [
        'Enter the Main Gate and turn left directly past the Security Desk.',
        'Follow the shaded west garden footpath past the drinking water station.',
        'The Student Canteen and Prayer Hall sit together at the south-west corner.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 35, y: 82 },
        { x: 16, y: 74 }
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
    badge: 'Science Wing · East Block B',
    description:
      'Situated on the eastern (right) side of the courtyard in Blocks B1 & B2, these five dedicated scientific laboratories serve Pre-Medical, Pre-Engineering, and BS Life Sciences practicals with microscopes, chemical benches, and physics optics apparatus.',
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
    locationNote: 'Science Wing · East Side (Blocks B1 & B2)',
    mapX: 78,
    mapY: 54,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '45 m East Wing',
      walkingSteps: [
        'Enter the Main Gate and walk straight 25 meters to the Assembly Courtyard.',
        'Turn right onto the East Courtyard Path toward Block B.',
        'Enter Science Wing Blocks B1 & B2 housing Physics, Chemistry, Botany, Zoology, and Physiology labs.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 50, y: 66 },
        { x: 78, y: 54 }
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
    badge: 'Central Hall · 600+ Seats',
    description:
      'Directly facing you across the far end of the Morning Assembly Courtyard, the Grand College Auditorium hosts annual prize distributions, Seerat-un-Nabi ﷺ conferences, debates, and degree convocations.',
    keySpecs: [
      { label: 'Seating', value: '600+ Attendees' },
      { label: 'Audio/Visual', value: 'Full PA & Lighting' },
      { label: 'Events', value: 'Debates, Drama, Naat' },
      { label: 'Position', value: 'North-Center Hall' }
    ],
    highlights: [
      'Large elevated wooden stage with formal podium for Principal addresses',
      'Acoustically tuned hall for Seerat conferences and literary galas',
      'Adjacent backstage rooms and central foyer facing the courtyard'
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
    locationNote: 'Central North Block · Straight Across Assembly Courtyard',
    mapX: 50,
    mapY: 36,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '60 m Straight North',
      walkingSteps: [
        'Walk straight north from the Main College Gate through the central walkway.',
        'Cross the entire length of the Morning Assembly Courtyard.',
        'The wide arched double doors directly ahead lead into the College Auditorium Hall.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 50, y: 36 }
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
      'Academic Wing 1 sits along the inner left corridor beside the Assembly Courtyard, connecting Commerce, Computer Science, Urdu Literature, Physical Education, and Pakistan Studies lecture halls.',
    keySpecs: [
      { label: 'Departments', value: '5 Subjects Housed' },
      { label: 'Streams', value: 'Commerce, CS, Humanities' },
      { label: 'Facilities', value: 'Lecture Rooms & Labs' },
      { label: 'Access', value: 'West Inner Corridor' }
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
    locationNote: 'West Inner Corridor · Wing 1',
    mapX: 35,
    mapY: 48,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '48 m North-West',
      walkingSteps: [
        'Enter the Main Gate and walk straight into the Assembly Courtyard.',
        'Bear left along the inner west veranda toward the covered corridor.',
        'Academic Wing 1 classrooms begin immediately along this corridor before the Auditorium.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 50, y: 66 },
        { x: 35, y: 48 }
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
      'Located along the east inner corridor opposite Wing 1, Academic Wing 2 houses Physics, Mathematics, Statistics, English, and Islamiyat lecture rooms.',
    keySpecs: [
      { label: 'Departments', value: '5 Subjects Housed' },
      { label: 'Focus', value: 'STEM, English & Islamiyat' },
      { label: 'Streams', value: 'Pre-Eng, ICS & General' },
      { label: 'Access', value: 'East Inner Corridor' }
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
    locationNote: 'East Inner Corridor · Wing 2',
    mapX: 65,
    mapY: 44,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '50 m North-East',
      walkingSteps: [
        'Enter the Main Gate and walk straight to the center of the Assembly Courtyard.',
        'Bear right toward the eastern arcade near the Science Wing.',
        'Enter Academic Wing 2 for Physics, Mathematics, Statistics, English, and Islamiyat rooms.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 50, y: 66 },
        { x: 65, y: 44 }
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
      'Continuing north along the eastern academic corridor past Wing 2 leads into Academic Wing 3—our dedicated Life Sciences hub housing the Departments of Botany and Zoology, specimen museums, and herbarium archives.',
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
    mapX: 78,
    mapY: 28,
    gateDirections: {
      turn: 'Bear Right',
      distanceFromGate: '72 m North-East',
      walkingSteps: [
        'Walk straight from the Main Gate into the Assembly Courtyard and bear right to Academic Wing 2.',
        'Continue north along the covered East Corridor past the Science Wing junction.',
        'Enter Academic Wing 3 housing the Botany and Zoology specimen museums and lecture rooms.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 50, y: 66 },
        { x: 65, y: 44 },
        { x: 78, y: 28 }
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
      'At the north-west end of the academic quadrangle beyond Wing 1 and the Library corridor lies Academic Wing 4, uniting Sindhi Literature, Economics, and Human Physiology.',
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
    mapX: 33,
    mapY: 25,
    gateDirections: {
      turn: 'Bear Left',
      distanceFromGate: '72 m North-West',
      walkingSteps: [
        'Enter the Main Gate, cross into the Assembly Courtyard, and follow the left corridor past Wing 1.',
        'Continue north beside the Library Wing toward the back quadrangle.',
        'Academic Wing 4 (Sindhi, Economics, Physiology) sits on your left facing the northern lawn.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 50, y: 66 },
        { x: 35, y: 48 },
        { x: 33, y: 25 }
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
      'Located on the south-east side of the campus just right of the Notice Plaza, the Advanced Computer Science & IT Lab powers HSC Computer Science practicals with modern desktop workstations, fiber networking, and solar/UPS backup.',
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
    locationNote: 'IT Complex Ground Floor · Right of Main Gate Plaza',
    mapX: 84,
    mapY: 70,
    gateDirections: {
      turn: 'Turn Right',
      distanceFromGate: '38 m Far Right',
      walkingSteps: [
        'Enter the Main Gate and turn right immediately past the Notice Board & SECCAP Desk.',
        'Follow the paved east entrance walkway directly to the IT Complex.',
        'Enter the double glass doors on the Ground Floor for the Computer Science Lab.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 65, y: 82 },
        { x: 84, y: 70 }
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
      'Directly above the Computer Science Lab on the 1st Floor of the IT Complex, the Multimedia Room hosts smart-board seminars, Python coding demos, Figma design critiques, and visual lectures.',
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
    mapX: 73,
    mapY: 72,
    gateDirections: {
      turn: 'Upstairs (1st Floor)',
      distanceFromGate: '40 m Right & Upstairs',
      walkingSteps: [
        'Enter the Main Gate and turn right past the Notice Board & SECCAP Desk toward the IT Complex.',
        'Take the IT Complex stairwell next to the Computer Science Lab up to the 1st Floor.',
        'The Multimedia Room & Smart Learning Studio is directly at the top of the stairs.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 65, y: 82 },
        { x: 73, y: 72 }
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
      'At the peaceful northern end of the campus behind the Auditorium Hall, our enclosed private sports ground offers girls a secure arena for badminton tournaments, throwball, athletics, and shaded lunch seating.',
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
    mapY: 14,
    gateDirections: {
      turn: 'Straight Ahead',
      distanceFromGate: '90 m Straight North',
      walkingSteps: [
        'Walk straight north from the Main Gate across the Assembly Courtyard.',
        'Pass along either side corridor of the College Auditorium Hall.',
        'Step out onto the open green Recreation Lawn & Badminton Courts at the north end of campus.'
      ],
      routePath: [
        { x: 50, y: 89 },
        { x: 50, y: 36 },
        { x: 52, y: 14 }
      ]
    }
  }
];
