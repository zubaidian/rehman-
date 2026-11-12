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
  subtitle: string;
  category: 'Administration' | 'Academics' | 'Laboratories' | 'Library' | 'Student Life';
  stopNumber: string;
  imageSrc?: string;
  svgType: 'library' | 'computer-lab' | 'science-lab' | 'auditorium' | 'courtyard' | 'sports';
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
    id: "computer-lab",
    name: "Advanced Computer Science & IT Lab",
    subtitle: "Home to Sindh Board 2nd & 4th Position Achievers with High-Speed Workstations",
    category: "Laboratories",
    stopNumber: "03",
    svgType: "computer-lab",
    badge: "Top Merit · 100% Pass Record",
    description: "Our pride facility where students secured the 2nd and 4th Positions in BISE Hyderabad Computer Science Group. Equipped with modern workstations, high-speed networking, programming compilers, and multimedia projectors for practical hands-on software training.",
    keySpecs: [
      { label: "Workstations", value: "60+ Modern PCs" },
      { label: "Internet", value: "Fiber-Optic Bandwidth" },
      { label: "Curriculum", value: "C++, Database, Web" },
      { label: "Backup", value: "Continuous Solar/UPS" }
    ],
    highlights: [
      "Mentorship hub for our provincial Board Position holders (916/1100 marks)",
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
    id: "science-labs",
    name: "Natural Science & Medical Laboratories",
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
    id: "sports-lawn",
    name: "Student Recreation Lawn & Sports Grounds",
    subtitle: "Outdoor Courtyard for Badminton, Table Tennis, Throwball & Relaxation",
    category: "Student Life",
    stopNumber: "06",
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
