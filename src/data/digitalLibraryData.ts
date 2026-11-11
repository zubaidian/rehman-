export interface LibraryResource {
  id: string;
  title: string;
  subject: string;
  category: 'past-papers' | 'textbooks' | 'model-papers' | 'reference';
  level: 'Class XI' | 'Class XII' | 'BS Zoology' | 'AD Commerce' | 'All Classes';
  publisher: string;
  year: string;
  fileFormat: string;
  fileSize: string;
  pages: number;
  description: string;
  keyTopics: string[];
  downloadsCount: number;
  featured?: boolean;
}

export const LIBRARY_RESOURCES: LibraryResource[] = [
  {
    id: "cs-past-papers-5yr",
    title: "BISE Hyderabad 5-Year Solved Past Papers: Computer Science (HSC II)",
    subject: "Computer Science",
    category: "past-papers",
    level: "Class XII",
    publisher: "BISE Hyderabad & College Faculty Compilation",
    year: "2022–2026 Edition",
    fileFormat: "PDF",
    fileSize: "6.8 MB",
    pages: 142,
    description: "Comprehensive 5-year solved board examination questions covering C++ programming, database systems, computer architecture, and practical exam viva rubrics. Curated by the faculty who mentored our 2nd & 4th Board Position holders.",
    keyTopics: ["C++ Arrays, Functions & Pointers", "Relational Database Management", "Computer Architecture & Logic Gates", "Board Solved Numericals & MCQs"],
    downloadsCount: 1420,
    featured: true
  },
  {
    id: "biology-stbb-xi",
    title: "Sindh Textbook Board: Biology Class XI (Botany & Zoology)",
    subject: "Biology",
    category: "textbooks",
    level: "Class XI",
    publisher: "Sindh Textbook Board, Jamshoro",
    year: "Latest Curriculum Edition",
    fileFormat: "PDF",
    fileSize: "18.4 MB",
    pages: 288,
    description: "Official provincial textbook for Pre-Medical students in Sindh. Contains complete illustrations, chapter review questions, glossary of biological nomenclature, and board revision summaries.",
    keyTopics: ["Cell Structure & Biological Molecules", "Variety of Life & Kingdom Animalia", "Bioenergetics & Respiration", "Nutrition & Digestion Mechanisms"],
    downloadsCount: 2850,
    featured: true
  },
  {
    id: "pre-med-past-papers",
    title: "BISE Hyderabad Past Papers: Biology, Physics & Chemistry (Class XII)",
    subject: "Pre-Medical Sciences",
    category: "past-papers",
    level: "Class XII",
    publisher: "Board of Intermediate & Secondary Education Hyderabad",
    year: "2021–2025 Compilation",
    fileFormat: "PDF",
    fileSize: "12.1 MB",
    pages: 210,
    description: "Authentic board question paper repository for Pre-Medical candidates with subjective essay prompts, practical experiments diagrams, and marks distribution guidelines.",
    keyTopics: ["Organic Reaction Mechanisms", "Genetics & Biotechnology", "Nuclear Physics & Modern Electronics", "Botany Reproduction Systems"],
    downloadsCount: 3120,
    featured: true
  },
  {
    id: "physics-stbb-xii",
    title: "Sindh Textbook Board: Physics Class XII (Theory & Practical Manual)",
    subject: "Physics",
    category: "textbooks",
    level: "Class XII",
    publisher: "Sindh Textbook Board, Jamshoro",
    year: "Academic Year 2025–2026",
    fileFormat: "PDF",
    fileSize: "15.7 MB",
    pages: 312,
    description: "Standard physics curriculum covering electrostatics, current electricity, electromagnetism, atomic spectra, and laboratory experiment manuals.",
    keyTopics: ["Gauss's Law & Capacitors", "Biot-Savart Law & Induction", "Special Theory of Relativity", "Spectrometer Practical Guides"],
    downloadsCount: 1980
  },
  {
    id: "maths-model-paper-2026",
    title: "BISE Hyderabad Model Examination Paper & Scheme of Studies: Mathematics (HSC I & II)",
    subject: "Mathematics",
    category: "model-papers",
    level: "Class XI",
    publisher: "Directorate of Curriculum & BISE Hyderabad",
    year: "2026 Model Paper",
    fileFormat: "PDF",
    fileSize: "3.4 MB",
    pages: 48,
    description: "Official model test paper illustrating the revised multiple-choice question (MCQ) format, short questions rubric, and detailed question weightage.",
    keyTopics: ["Matrices & Determinants", "Trigonometric Identities & Functions", "Conic Sections & Analytical Geometry", "Calculus & Limits Evaluation"],
    downloadsCount: 1650
  },
  {
    id: "chemistry-stbb-xi",
    title: "Sindh Textbook Board: Chemistry Class XI",
    subject: "Chemistry",
    category: "textbooks",
    level: "Class XI",
    publisher: "Sindh Textbook Board, Jamshoro",
    year: "Latest Official Printing",
    fileFormat: "PDF",
    fileSize: "14.2 MB",
    pages: 260,
    description: "Fundamental physical and inorganic chemistry curriculum introducing atomic structure, gas laws, chemical bonding, thermodynamics, and equilibrium.",
    keyTopics: ["Stoichiometry & Mole Calculations", "Quantum Numbers & Orbital Theory", "Gas Laws & Kinetic Molecular Theory", "Chemical Equilibrium & pH Scale"],
    downloadsCount: 2240
  },
  {
    id: "bs-zoology-invertebrate-handbook",
    title: "Principles of Animal Diversity & Invertebrate Zoology (BS Zoology)",
    subject: "Zoology & Life Sciences",
    category: "reference",
    level: "BS Zoology",
    publisher: "Department of Zoology, Zubaida College & Univ. of Sindh Guidelines",
    year: "University of Sindh Syllabus Edition",
    fileFormat: "PDF",
    fileSize: "8.4 MB",
    pages: 210,
    description: "Curated academic handbook and laboratory manual for 4-Year BS Zoology students covering evolutionary phylogenetics, invertebrate structural anatomy, physiological systems, and microscopy protocols.",
    keyTopics: ["Evolutionary Origins & Protozoa to Echinoderms", "Comparative Animal Anatomy & Physiology", "Cellular Genetics & Ecological Adaptation", "Zoological Dissection & Laboratory Techniques"],
    downloadsCount: 1120,
    featured: true
  },
  {
    id: "ad-commerce-financial-accounting",
    title: "Advanced Financial Accounting & Practical Auditing: Course Manual (AD Commerce)",
    subject: "Commerce & Accountancy",
    category: "reference",
    level: "AD Commerce",
    publisher: "Faculty of Commerce, Zubaida College & Univ. of Sindh Syllabus",
    year: "2026 Academic Edition",
    fileFormat: "PDF",
    fileSize: "6.2 MB",
    pages: 180,
    description: "Comprehensive study and exercise companion for Associate Degree in Commerce (ADC) students covering partnership dissolutions, corporate stock equity, consignment accounts, and audit standards.",
    keyTopics: ["Corporate Joint Stock Company Accounts", "Consignment & Branch Accounting", "Internal Audit & Verification Standards", "Taxation Principles & Financial Ratios"],
    downloadsCount: 960,
    featured: true
  },
  {
    id: "commerce-accounting-past-papers",
    title: "Principles of Accounting & Economics: 5-Year Solved Papers (I.Com)",
    subject: "Commerce",
    category: "past-papers",
    level: "Class XI",
    publisher: "Sindh Commerce Education Faculty",
    year: "2021–2025 Solved",
    fileFormat: "PDF",
    fileSize: "5.5 MB",
    pages: 110,
    description: "Step-by-step solved balance sheets, journal ledger entries, bank reconciliation statements, and microeconomic supply-demand curves.",
    keyTopics: ["Double-Entry Bookkeeping", "Bank Reconciliation Statements", "Depreciation Methods", "Law of Diminishing Marginal Utility"],
    downloadsCount: 1150
  },
  {
    id: "english-compulsory-xi",
    title: "Intermediate English Compulsory: Prose, Poetry & Grammar Guide",
    subject: "English",
    category: "textbooks",
    level: "Class XI",
    publisher: "Sindh Textbook Board & Zubaida Faculty Notes",
    year: "2025–2026 Edition",
    fileFormat: "PDF",
    fileSize: "9.3 MB",
    pages: 176,
    description: "Includes official textbook essays, poetic analyses, summary writing guidelines, letter and application formats, and comprehension passages.",
    keyTopics: ["Character Sketches & Essay Guides", "Poetic Rhyme & Thematic Stanzas", "Formal Letters to Official Authorities", "Grammar: Active/Passive & Direct/Indirect"],
    downloadsCount: 3410
  },
  {
    id: "urdu-sindhi-compendium",
    title: "Sindhi Normal & Urdu Compulsory: Model Question Papers & Literary Essays",
    subject: "Languages & Literature",
    category: "model-papers",
    level: "Class XII",
    publisher: "College Language Department",
    year: "2026 Revised Syllabus",
    fileFormat: "PDF",
    fileSize: "4.8 MB",
    pages: 88,
    description: "Model essays, classical Ghazals explanation, grammar rules, and translation passages for both Sindhi Normal and Urdu Compulsory examinations.",
    keyTopics: ["Shah Abdul Latif Bhittai Sur Analyses", "Mirza Ghalib & Iqbal Poetry Explanations", "National & Social Essay Topics", "Idioms, Proverbs & Sentence Correction"],
    downloadsCount: 1780
  }
];

export const DIGITAL_LIBRARY_STATS = [
  { value: "100+", label: "Digital Textbooks", sub: "Sindh Textbook Board" },
  { value: "10 Yrs", label: "Board Past Papers", sub: "BISE Hyderabad archives" },
  { value: "100%", label: "Free Student Access", sub: "Zero subscription fees" },
  { value: "15,000+", label: "Physical Library Books", sub: "Available on campus" }
];
