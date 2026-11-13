export interface FacilityHotspot {
  id: string;
  label: string;
  description: string;
  xPercent: number; // 0-100% position on container
  yPercent: number;
}

export interface TourFacility {
  id: string;
  name: string;
  shortName?: string;
  subtitle: string;
  category: 'Administration' | 'Academics' | 'Laboratories' | 'Library' | 'Student Life';
  stopNumber: string;
  imageSrc?: string;
  svgType: 'principal-office' | 'library' | 'computer-lab' | 'science-lab' | 'auditorium' | 'courtyard' | 'sports' | 'multimedia-room' | 'academic-wing';
  badge: string;
  description: string;
  keySpecs: { label: string; value: string }[];
  highlights: string[];
  hotspots: FacilityHotspot[];
  locationNote: string;
}

export const CAMPUS_TOUR_STOPS: TourFacility[] = [
  {
    id: "historic-gateway",
    name: "Historic Gateway & Campus Courtyard",
    shortName: "Historic Gateway",
    subtitle: "The Majestic 1953 Entrance Archway and Shaded Assembly Grounds",
    category: "Administration",
    stopNumber: "01",
    imageSrc: "/assets/aistudio/campus_86930cb8.jpg",
    svgType: "courtyard",
    badge: "Historic Landmark · Estd 1953",
    description: "The revered iron-arched gateway of Government Girls Zubaida College stands as a historic beacon for women's education in Sindh. Stepping through the gates leads students into a serene, secure, and tree-lined central courtyard bordered by green verandas where morning assemblies and collegiate events take place.",
    keySpecs: [
      { label: "Founded", value: "1953" },
      { label: "Security", value: "24/7 Guarded" },
      { label: "Environment", value: "Lush & Shaded" },
      { label: "Atmosphere", value: "Peaceful & Safe" }
    ],
    highlights: [
      "Historic iron arch bearing 'Govt College for Women 1953'",
      "Secure double-gate boundary wall ensuring student safety",
      "Spacious shaded courtyard for daily morning assemblies",
      "Direct pathway connecting Academic Block A & Science Wing"
    ],
    hotspots: [
      {
        id: "arch",
        label: "Historic Archway",
        description: "The iconic 1953 wrought-iron archway dedicated to female higher education.",
        xPercent: 50,
        yPercent: 22
      },
      {
        id: "security",
        label: "Security Checkpoint",
        description: "Dedicated campus security desk ensuring a safe sanctuary for all girls.",
        xPercent: 18,
        yPercent: 78
      },
      {
        id: "courtyard-trees",
        label: "Assembly Courtyard",
        description: "Shaded green grounds hosting morning prayers, national anthem, and student roll calls.",
        xPercent: 78,
        yPercent: 65
      }
    ],
    locationNote: "Main Campus Entrance · Pathan Colony, Hirabad (Opposite Central Jail), Hyderabad"
  },
  {
    id: "central-library",
    name: "Central College Library & Reading Wing",
    shortName: "Central Library",
    subtitle: "A Quiet Sanctuary of 15,000+ Books, Textbooks & Literary Archives",
    category: "Library",
    stopNumber: "02",
    svgType: "library",
    badge: "Knowledge Hub · 15,000+ Volumes",
    description: "The Central Library is the intellectual heart of Zubaida College. It features comprehensive collections in English, Urdu, and Sindhi literature, reference encyclopedias, board curriculum textbooks, past 10-year exam papers, and scientific journals with quiet individual study carrels.",
    keySpecs: [
      { label: "Book Capacity", value: "15,000+ Volumes" },
      { label: "Reading Seats", value: "120 Students" },
      { label: "Lending Scheme", value: "Free Book Bank" },
      { label: "Sections", value: "Ref, Sciences, Arts" }
    ],
    highlights: [
      "Government Book Bank offering free textbook lending for needy students",
      "Dedicated Reference Section for BS Zoology, Life Sciences & Commerce research",
      "Air-conditioned quiet reading hall with natural daylight",
      "Archive of BISE Hyderabad past board examination papers"
    ],
    hotspots: [
      {
        id: "stacks",
        label: "Main Book Stacks",
        description: "Open-access shelving categorized by Dewey Decimal & subject disciplines.",
        xPercent: 32,
        yPercent: 40
      },
      {
        id: "reading-tables",
        label: "Silent Study Desks",
        description: "Individual and group study tables with dedicated desk lamps.",
        xPercent: 68,
        yPercent: 65
      },
      {
        id: "desk",
        label: "Librarian's Issue Desk",
        description: "Library card issuing, return counter, and digital catalog assistance.",
        xPercent: 15,
        yPercent: 60
      }
    ],
    locationNote: "Academic Block A · 1st Floor North Wing"
  },
  {
    id: "principal-office",
    name: "Principal’s Office & Administrative Wing",
    shortName: "Principal’s Office",
    subtitle: "Executive Leadership Suite of Prof. Yasmeen Panhwar & Campus Administration",
    category: "Administration",
    stopNumber: "03",
    svgType: "principal-office",
    badge: "College Leadership · Block A",
    description: "The Principal’s Office serves as the administrative and academic command center of Government Girls Zubaida College. Led by Principal Prof. Yasmeen Panhwar, this suite oversees collegiate governance, admissions verification, faculty coordination, student welfare, and academic excellence.",
    keySpecs: [
      { label: "Principal", value: "Prof. Yasmeen Panhwar" },
      { label: "Office Hours", value: "8:00 AM – 2:00 PM (Mon–Sat)" },
      { label: "Functions", value: "Admissions & Governance" },
      { label: "Support", value: "Student & Parent Desk" }
    ],
    highlights: [
      "Direct executive office overseeing all Intermediate, Associate, and BS 4-Year programs",
      "Dedicated reception and parent consultation area for admissions and scholarship inquiries",
      "Academic honor wall showcasing Zubaida College’s BISE Hyderabad top position holders since 1953",
      "Adjacent Registrar, Student Affairs, and Accounts counters for document verification"
    ],
    hotspots: [
      {
        id: "principal-desk",
        label: "Principal’s Executive Desk",
        description: "Office of Prof. Yasmeen Panhwar guiding institutional standards, faculty mentorship, and student welfare.",
        xPercent: 50,
        yPercent: 42
      },
      {
        id: "honor-roll-wall",
        label: "1953 Legacy & Merit Wall",
        description: "Archival display honoring past Principals, distinguished alumnae, and provincial board toppers.",
        xPercent: 22,
        yPercent: 34
      },
      {
        id: "admin-counter",
        label: "Admissions & Registrar Desk",
        description: "Administrative coordination counter for SECCAP enrollment, bonafide certificates, and migration forms.",
        xPercent: 78,
        yPercent: 62
      }
    ],
    locationNote: "Main Administration Block · Ground Floor (Near Entrance Courtyard)"
  },
  {
    id: "science-labs",
    name: "Natural Science & Medical Laboratories",
    shortName: "Natural Science Lab",
    subtitle: "Specialized Physics, Chemistry, Botany, Zoology & Physiology Practical Theatres",
    category: "Laboratories",
    stopNumber: "04",
    svgType: "science-lab",
    badge: "Pre-Medical, Physiology & Engineering Labs",
    description: "Comprising five dedicated scientific laboratories: Physics, Organic & Inorganic Chemistry, Botany, Zoology, and Human Physiology. Each lab is equipped with compound microscopes, precision balances, optical spectrometers, clinical diagnostic kits, reagent cabinets, and individual gas/water points meeting BISE Board and University standards.",
    keySpecs: [
      { label: "Laboratories", value: "5 Specialized Wings" },
      { label: "Equipment", value: "Microscopes, Diagnostics, Optics" },
      { label: "Safety", value: "Eye-wash & Extinguishers" },
      { label: "Capacity", value: "40 Students / Lab" }
    ],
    highlights: [
      "Individual practical desks with burner outlets, sinks, and safety shields",
      "High-power biological microscopes and specimen collections for Botany, Zoology & Physiology",
      "Human physiological diagnostic kits for blood pressure, reflex arcs, and hematology",
      "Advanced physics apparatus for mechanics, electricity, and optics experiments",
      "Comprehensive chemical inventory maintained under strict faculty supervision"
    ],
    hotspots: [
      {
        id: "fume-hood",
        label: "Chemical Preparation Bench",
        description: "Ventilated chemical workstations and secure acid/base reagent storage.",
        xPercent: 28,
        yPercent: 38
      },
      {
        id: "microscopes",
        label: "Microscopy Station",
        description: "Precision optical compound microscopes for cellular and tissue analysis.",
        xPercent: 62,
        yPercent: 52
      },
      {
        id: "physiology-diag",
        label: "Physiology Diagnostic Station",
        description: "Blood pressure sphygmomanometers, stethoscopes, and human anatomical models.",
        xPercent: 46,
        yPercent: 44
      },
      {
        id: "physics-optics",
        label: "Optical Bench",
        description: "Light refraction, prism benches, and spectrometer measurement tools.",
        xPercent: 84,
        yPercent: 65
      }
    ],
    locationNote: "Science Wing · Blocks B1 & B2"
  },
  {
    id: "auditorium-hall",
    name: "College Auditorium & Assembly Hall",
    shortName: "Auditorium",
    subtitle: "A Regal Venue for Naat Competitions, Debates, Convocations & Literary Galas",
    category: "Student Life",
    stopNumber: "05",
    svgType: "auditorium",
    badge: "Cultural & Academic Assembly",
    description: "The grand college auditorium serves as the epicenter of collegiate co-curricular life. Equipped with acoustic sound systems, a raised theatrical stage, and gold-trimmed proscenium, it hosts annual prize distributions, Seerat-un-Nabi conferences, debates, and degree convocations.",
    keySpecs: [
      { label: "Seating", value: "600+ Attendees" },
      { label: "Audio/Visual", value: "Full PA & Stage Lighting" },
      { label: "Events", value: "Debates, Drama, Naat" },
      { label: "Ventilation", value: "Air-Cooled Hall" }
    ],
    highlights: [
      "Large elevated wooden stage with formal podium for Principal addresses",
      "Acoustically tuned interior for unamplified and amplified vocal clarity",
      "Green rooms and backstage preparation areas for student performances",
      "Venue for annual board position felicitation and graduation ceremonies"
    ],
    hotspots: [
      {
        id: "podium",
        label: "Principal's Podium",
        description: "The formal gilded lectern where college dignitaries deliver keynotes.",
        xPercent: 50,
        yPercent: 35
      },
      {
        id: "seating",
        label: "Auditorium Seating",
        description: "Tiered seating accommodating over 600 students, faculty, and visiting parents.",
        xPercent: 25,
        yPercent: 75
      },
      {
        id: "stage-lighting",
        label: "Stage Illuminators",
        description: "Spotlights and presentation banners celebrating academic milestones.",
        xPercent: 78,
        yPercent: 20
      }
    ],
    locationNote: "Central Block · Ground Floor Auditorium Complex"
  },
  {
    id: "wing-1",
    name: "Academic Wing 1",
    shortName: "Wing 1",
    subtitle: "Commerce · Computer Science · Urdu · Physical Education · Pakistan Studies",
    category: "Academics",
    stopNumber: "06",
    svgType: "academic-wing",
    badge: "Wing 1 · 5 Academic Departments",
    description: "Academic Wing 1 brings together five vital collegiate disciplines under one accessible corridor: Commerce, Computer Science, Urdu Literature, Physical Education, and Pakistan Studies—connecting business studies, computing labs, national language scholarship, civic history, and student athletics.",
    keySpecs: [
      { label: "Departments", value: "5 Subjects Housed" },
      { label: "Streams", value: "Commerce, CS, Humanities" },
      { label: "Facilities", value: "Lecture Rooms & Labs" },
      { label: "Access", value: "Direct Ground & 1st Floor" }
    ],
    highlights: [
      "Department of Commerce: Accounting, Banking & Business Economics classrooms",
      "Department of Computer Science: Computing instruction & project mentoring",
      "Department of Urdu: Classic & modern Urdu prose, poetry, and literary seminars",
      "Department of Physical Education: Health sciences, sports theory & fitness coordination",
      "Department of Pakistan Studies: National history, constitutional studies & civic awareness"
    ],
    hotspots: [
      {
        id: "wing1-commerce-cs",
        label: "Commerce & Computer Science",
        description: "Adjacent classrooms and practical mentoring rooms for I.Com, B.Com, and HSC Computer Science students.",
        xPercent: 25,
        yPercent: 38
      },
      {
        id: "wing1-urdu-pak",
        label: "Urdu & Pakistan Studies",
        description: "Humanities lecture halls dedicated to Urdu literature, national heritage, and constitutional studies.",
        xPercent: 54,
        yPercent: 52
      },
      {
        id: "wing1-pe",
        label: "Physical Education Suite",
        description: "Faculty office and theory room coordinating campus sports, athletics, and wellness programs.",
        xPercent: 80,
        yPercent: 40
      }
    ],
    locationNote: "Campus Academic Block · Wing 1"
  },
  {
    id: "wing-2",
    name: "Academic Wing 2",
    shortName: "Wing 2",
    subtitle: "Physics · English · Islamiyat · Statistics · Mathematics",
    category: "Academics",
    stopNumber: "07",
    svgType: "academic-wing",
    badge: "Wing 2 · 5 Academic Departments",
    description: "Academic Wing 2 houses the quantitative sciences alongside English and Islamic Studies: Physics, English, Islamiyat, Statistics, and Mathematics. Students move seamlessly between analytical problem-solving lectures, physics practical prep, language communication classes, and ethical studies.",
    keySpecs: [
      { label: "Departments", value: "5 Subjects Housed" },
      { label: "Focus", value: "STEM, English & Islamiyat" },
      { label: "Streams", value: "Pre-Eng, ICS & General" },
      { label: "Support", value: "Faculty Consultation Desks" }
    ],
    highlights: [
      "Department of Physics: Mechanics, optics, electromagnetism & practical exam coaching",
      "Department of Mathematics & Statistics: Calculus, algebra, probability & statistical modeling",
      "Department of English: Academic writing, comprehension & English literature halls",
      "Department of Islamiyat: Quranic studies, Hadith, Islamic history & moral philosophy"
    ],
    hotspots: [
      {
        id: "wing2-physics",
        label: "Physics & Quantitative Wing",
        description: "Dedicated lecture rooms for Physics, Mathematics, and Statistics problem-solving workshops.",
        xPercent: 26,
        yPercent: 42
      },
      {
        id: "wing2-english",
        label: "English Language Rooms",
        description: "Interactive classrooms for essay composition, grammar, and literary studies.",
        xPercent: 55,
        yPercent: 32
      },
      {
        id: "wing2-islamiyat",
        label: "Islamiyat Faculty Suite",
        description: "Dedicated department room for Islamic Studies lectures and Seerat conference preparation.",
        xPercent: 79,
        yPercent: 58
      }
    ],
    locationNote: "Campus Academic Block · Wing 2"
  },
  {
    id: "wing-3",
    name: "Academic Wing 3",
    shortName: "Wing 3",
    subtitle: "Botany · Zoology",
    category: "Laboratories",
    stopNumber: "08",
    svgType: "academic-wing",
    badge: "Wing 3 · Life Sciences",
    description: "Academic Wing 3 is the dedicated Life Sciences corridor hosting the Departments of Botany and Zoology. Designed for Pre-Medical and BS Life Sciences scholars, this wing integrates specimen museums, microscopy benches, herbarium archives, and biological research rooms.",
    keySpecs: [
      { label: "Departments", value: "Botany & Zoology" },
      { label: "Programs", value: "Pre-Medical & BS Zoology" },
      { label: "Archives", value: "Herbarium & Specimen Hall" },
      { label: "Labs", value: "Microscopy & Dissection" }
    ],
    highlights: [
      "Department of Botany: Plant physiology, taxonomy, mycology & preserved herbarium sheets",
      "Department of Zoology: Comparative anatomy, genetics, entomology & microscopy suites",
      "Hands-on practical preparation for BISE Pre-Medical and BS 4-Year University degrees",
      "Quiet specimen study and faculty guidance booths for biological illustrations"
    ],
    hotspots: [
      {
        id: "wing3-botany",
        label: "Department of Botany",
        description: "Botanical lecture room and preserved plant taxonomy & herbarium specimen collection.",
        xPercent: 32,
        yPercent: 46
      },
      {
        id: "wing3-zoology",
        label: "Department of Zoology",
        description: "Zoology museum specimens, compound microscope stations, and BS research desk.",
        xPercent: 68,
        yPercent: 46
      }
    ],
    locationNote: "Life Sciences Complex · Wing 3"
  },
  {
    id: "wing-4",
    name: "Academic Wing 4",
    shortName: "Wing 4",
    subtitle: "Sindhi · Economics · Physiology",
    category: "Academics",
    stopNumber: "09",
    svgType: "academic-wing",
    badge: "Wing 4 · 3 Academic Departments",
    description: "Academic Wing 4 unites regional literary heritage with social and human sciences, hosting the Departments of Sindhi, Economics, and Physiology—offering specialized lecture halls alongside physiological demonstration resources.",
    keySpecs: [
      { label: "Departments", value: "Sindhi, Economics, Physiology" },
      { label: "Streams", value: "Arts, Commerce & Sciences" },
      { label: "Highlights", value: "Literary & Diagnostic Rooms" },
      { label: "Access", value: "Shaded Courtyard Corridor" }
    ],
    highlights: [
      "Department of Sindhi: Classical Shah Latif studies, Sindhi prose, poetry & regional culture",
      "Department of Economics: Microeconomics, macroeconomics, public finance & Pakistan economy",
      "Department of Physiology: Human organ systems, hematology & physiological practical training"
    ],
    hotspots: [
      {
        id: "wing4-sindhi",
        label: "Department of Sindhi",
        description: "Regional language & literature hall celebrating Sindhi classics and student literary societies.",
        xPercent: 24,
        yPercent: 48
      },
      {
        id: "wing4-economics",
        label: "Department of Economics",
        description: "Lecture suite covering economic theory, fiscal policy, and applied statistical charts.",
        xPercent: 52,
        yPercent: 35
      },
      {
        id: "wing4-physiology",
        label: "Department of Physiology",
        description: "Human anatomy models and physiological practical equipment for applied biological study.",
        xPercent: 78,
        yPercent: 56
      }
    ],
    locationNote: "Campus Academic Block · Wing 4"
  },
  {
    id: "computer-lab",
    name: "Advanced Computer Science & IT Lab",
    shortName: "Computer Science Lab",
    subtitle: "Home to Sindh Board 2nd & 4th Position Achievers with High-Speed Workstations",
    category: "Laboratories",
    stopNumber: "10",
    svgType: "computer-lab",
    badge: "Top Merit · 100% Pass Record",
    description: "Our pride facility where students secured the 2nd and 4th Positions in BISE Hyderabad Computer Science Group. Equipped with modern workstations, high-speed networking, Python & Figma workspaces, and multimedia projectors for practical hands-on software and UI/UX training.",
    keySpecs: [
      { label: "Workstations", value: "Modern Desktop Systems" },
      { label: "Internet", value: "Fiber-Optic Bandwidth" },
      { label: "Curriculum", value: "Python, Figma" },
      { label: "Backup", value: "Continuous Solar/UPS" }
    ],
    highlights: [
      "Mentorship hub for our provincial Board Position holders (916/1100 marks)",
      "Hands-on lab modules covering Python programming, Figma UI/UX design, C++, and database fundamentals",
      "High-speed fiber connectivity for educational research and software labs",
      "Multimedia projector and smart teaching screen for practical coding demos",
      "Uninterrupted power supply ensuring zero downtime during board practicals"
    ],
    hotspots: [
      {
        id: "pcs",
        label: "Computing Workstations",
        description: "Modern desktop terminals running development environments and tools.",
        xPercent: 45,
        yPercent: 55
      },
      {
        id: "projector",
        label: "Interactive Smart Screen",
        description: "High-definition projection system for lectures and live programming demos.",
        xPercent: 82,
        yPercent: 28
      },
      {
        id: "server",
        label: "Campus Network Hub",
        description: "Dedicated servers, managed switches, and secure student firewalls.",
        xPercent: 18,
        yPercent: 45
      }
    ],
    locationNote: "Information Technology Complex · Ground Floor"
  },
  {
    id: "multimedia-room",
    name: "Multimedia Room & Smart Learning Studio",
    shortName: "Multimedia Room",
    subtitle: "Interactive Digital Projection, Audio-Visual Seminars & Collaborative Workshops",
    category: "Academics",
    stopNumber: "11",
    svgType: "multimedia-room",
    badge: "Audio-Visual & Smart Classroom",
    description: "The dedicated Multimedia Room provides faculty and students with an interactive smart-display environment for Python coding demonstrations, Figma design critiques, science visualizations, digital presentations, and guest academic lectures.",
    keySpecs: [
      { label: "Display", value: "HD Smart Projector & Screen" },
      { label: "Audio", value: "Surround Sound & Wireless Mic" },
      { label: "Use Cases", value: "Presentations, Coding, Design" },
      { label: "Environment", value: "Air-Conditioned Media Suite" }
    ],
    highlights: [
      "Large-format HD projection and interactive smart board for visual teaching across all faculties",
      "Live walkthrough space for Python programming, Figma UI prototypes, and science simulations",
      "Acoustic sound reinforcement and lecturer podium for seminars and student project defenses",
      "Comfortable tiered media seating supporting group workshops and career counseling sessions"
    ],
    hotspots: [
      {
        id: "smart-screen",
        label: "HD Projection Screen",
        description: "Wide-format display used for Python live coding, Figma design reviews, and visual lectures.",
        xPercent: 50,
        yPercent: 28
      },
      {
        id: "av-podium",
        label: "Multimedia Control Podium",
        description: "Central instructor console managing audio, projection switching, and digital media.",
        xPercent: 20,
        yPercent: 60
      },
      {
        id: "media-seating",
        label: "Seminar Seating Area",
        description: "Collaborative viewing and workshop seating designed for clear sightlines and note-taking.",
        xPercent: 78,
        yPercent: 68
      }
    ],
    locationNote: "Information Technology & Academic Complex · 1st Floor"
  },
  {
    id: "sports-lawn",
    name: "Student Recreation Lawn & Sports Grounds",
    shortName: "Sports Lawn",
    subtitle: "Outdoor Courtyard for Badminton, Table Tennis, Throwball & Relaxation",
    category: "Student Life",
    stopNumber: "12",
    svgType: "sports",
    badge: "Wellness & Physical Fitness",
    description: "Encouraging a healthy mind in a healthy body, our private campus sports ground offers female students a secure, secluded outdoor arena for badminton tournaments, table tennis, athletic sprint meets, and shaded benches for discussions during class intervals.",
    keySpecs: [
      { label: "Courts", value: "Badminton & Table Tennis" },
      { label: "Privacy", value: "100% Enclosed Female Campus" },
      { label: "Recreation", value: "Lawn Garden & Benches" },
      { label: "Annual Sports", value: "Inter-Class Championship" }
    ],
    highlights: [
      "Completely private walled sports arena ensuring total comfort and dignity for girls",
      "Outdoor badminton courts and indoor table tennis tables with college gear",
      "Flower-bordered grass lawns for quiet lunchtime reading and reflection",
      "Annual College Sports Week organizing competitive athletics and relay games"
    ],
    hotspots: [
      {
        id: "badminton",
        label: "Badminton Court",
        description: "Marked hard-surface court for inter-class tournaments and physical fitness.",
        xPercent: 40,
        yPercent: 60
      },
      {
        id: "gardens",
        label: "Shaded Green Lawn",
        description: "Flowered garden borders with benches beneath indigenous shade trees.",
        xPercent: 75,
        yPercent: 45
      },
      {
        id: "sports-office",
        label: "Physical Education Desk",
        description: "Sports instructor office providing rackets, shuttlecocks, and safety kits.",
        xPercent: 18,
        yPercent: 40
      }
    ],
    locationNote: "South Campus · Behind Academic Block B"
  }
];
