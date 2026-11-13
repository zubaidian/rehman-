export interface DepartmentPhoto {
  id: string;
  title: string;
  category: 'lab' | 'faculty' | 'apparatus' | 'seminar' | 'classroom';
  caption: string;
  imageUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  faculty: 'Sciences & Computing' | 'Life Sciences' | 'Commerce & Economics' | 'Humanities & Social Sciences' | 'Languages & Literature' | 'Health & Physical Education';
  headOrLead: string;
  badge?: string;
  description: string;
  facilities: string[];
  programsServed: string[];
  keyCourses: string[];
  labsAvailable: string;
  achievements: string;
  photos: DepartmentPhoto[];
}

export const DEPARTMENTS_DATA: Department[] = [
  // 1. Physics
  {
    id: 'physics',
    name: 'Department of Physics',
    faculty: 'Sciences & Computing',
    headOrLead: 'Senior Physics Professors & Demonstrators',
    badge: 'Advanced Experimental Suite',
    description: 'Provides deep theoretical mastery and experimental verification of classical mechanics, wave optics, electromagnetism, and atomic physics.',
    facilities: [
      'Dedicated optical darkroom for spectroscopy and ray tracing',
      'Galvanometers, resistance boxes, potentiometers and circuits',
      'Compound pendulums, resonance tubes, and mechanics benches',
      'Digital vernier, micrometer screw gauges, spherometers'
    ],
    programsServed: [
      'HSC Pre-Engineering',
      'HSC Pre-Medical',
      'General Science (Computer Science)',
      'Associate Degree in Science (ADS)'
    ],
    keyCourses: [
      'Scalars, Vectors, Motion & Newton’s Laws',
      'Work, Energy, Gravitation & Rotational Dynamics',
      'Electrostatics, Current Electricity & Magnetism',
      'Geometrical & Physical Optics, Interference & Diffraction',
      'Nuclear, Quantum & Atomic Physics'
    ],
    labsAvailable: 'Physics Main Laboratory & Optical Darkroom (Science Wing)',
    achievements: 'Full practical board lab facilities with 100% practical exam compliance and distinction.',
    photos: [
      {
        id: 'phys-1',
        title: 'Physics Experimental Apparatus Hall',
        category: 'lab',
        caption: 'Apparatus for mechanics, wave resonance, and electrical circuit measurements.'
      },
      {
        id: 'phys-2',
        title: 'Optical Darkroom & Spectrometry Station',
        category: 'apparatus',
        caption: 'Precision lenses, prisms, and spectrometers for ray optics and interference experiments.'
      },
      {
        id: 'phys-3',
        title: 'Department Faculty & Demonstrators',
        category: 'faculty',
        caption: 'Senior faculty supervising practical electrical and physical experiments.'
      }
    ]
  },

  // 2. Computer Science
  {
    id: 'computer-science',
    name: 'Department of Computer Science & Information Technology',
    faculty: 'Sciences & Computing',
    headOrLead: 'Senior Subject Specialists & Lab Technologists',
    badge: 'Board 2nd & 4th Merit Positions',
    description: 'A premier computing department featuring a multi-terminal networked computer lab, high-speed broadband, and intensive hands-on programming instruction.',
    facilities: [
      '40+ high-speed desktop workstation lab',
      'Dedicated broadband fiber connectivity',
      'Multimedia smart display & interactive projector',
      'C/C++ compilers, database management engines'
    ],
    programsServed: [
      'General Science (Computer Science)',
      'Digital Literacy Certification',
      'Applied Computing Skills'
    ],
    keyCourses: [
      'Computer Science (Theory & Practical)',
      'Programming in C / C++',
      'Database Design & SQL Fundamentals',
      'Operating Systems & System Architecture',
      'Data Communication & Networking Essentials'
    ],
    labsAvailable: 'Main Computer Science Lab (Block B, 1st Floor)',
    achievements: 'Secured 2nd and 4th Positions in BISE Hyderabad Board Annual Examination with 100% pass rate.',
    photos: [
      {
        id: 'cs-lab-1',
        title: 'Modern Computing Laboratory',
        category: 'lab',
        caption: 'Workstations with high-speed internet and development tools for HSC Part I & II.'
      },
      {
        id: 'cs-faculty-1',
        title: 'Faculty Demonstration Suite',
        category: 'faculty',
        caption: 'Department instructors mentoring students during practical lab sessions.'
      },
      {
        id: 'cs-app-1',
        title: 'Networking & Hardware Workbench',
        category: 'apparatus',
        caption: 'Hands-on hardware and networking demonstration kits.'
      }
    ]
  },

  // 2. Mathematics (Separated)
  {
    id: 'mathematics',
    name: 'Department of Mathematics',
    faculty: 'Sciences & Computing',
    headOrLead: 'Senior Mathematics Lecturers (SPSC Qualified)',
    badge: 'Core Analytical Faculty',
    description: 'Cultivates abstract logical thinking, algebraic rigor, calculus applications, and higher-order mathematical deduction for engineering and physical sciences.',
    facilities: [
      'Geometry & spatial modeling demonstration instruments',
      'Calculus tutorial room with whiteboard problem walls',
      'Extensive past-papers and board exam solved series repository'
    ],
    programsServed: [
      'HSC Pre-Engineering',
      'General Science (Computer Science)',
      'Associate Degree in Science (ADS)'
    ],
    keyCourses: [
      'Differential & Integral Calculus',
      'Analytical Geometry & Vectors',
      'Trigonometry & Complex Number Systems',
      'Matrices, Determinants & Linear Systems',
      'Higher Algebra & Sequences/Series'
    ],
    labsAvailable: 'Mathematics Tutorial & Modeling Clinic',
    achievements: 'Students regularly score 95%+ marks in BISE Hyderabad Mathematics examinations.',
    photos: [
      {
        id: 'math-1',
        title: 'Mathematics Lecture & Problem-Solving Room',
        category: 'classroom',
        caption: 'Interactive blackboard & tutorial space for intensive calculus problem solving.'
      },
      {
        id: 'math-2',
        title: 'Department Faculty & Mentorship Desk',
        category: 'faculty',
        caption: 'Senior faculty members providing one-on-one coaching for engineering entry tests.'
      }
    ]
  },

  // 3. Statistics (Separated)
  {
    id: 'statistics',
    name: 'Department of Statistics',
    faculty: 'Sciences & Computing',
    headOrLead: 'Departmental Faculty in Applied Statistics',
    badge: 'Data & Applied Analysis',
    description: 'Imparts foundational and applied statistical science, data visualization, probability distributions, regression modeling, and sampling methodologies.',
    facilities: [
      'Statistical computation and table resources',
      'Data tabulation kits and scientific calculators suite',
      'Survey sampling and real-world demographic case files'
    ],
    programsServed: [
      'General Science (Statistics stream)',
      'Commerce (I.Com & AD Commerce)',
      'Associate Degree in Science & Arts'
    ],
    keyCourses: [
      'Introduction to Statistical Theory',
      'Measures of Central Tendency & Dispersion',
      'Probability & Probability Distributions',
      'Correlation, Regression & Time Series',
      'Index Numbers & Vital Statistics'
    ],
    labsAvailable: 'Statistical Data & Analysis Resource Room',
    achievements: 'Essential quantitative preparation for data analysts, economists, and civil service aspirants.',
    photos: [
      {
        id: 'stat-1',
        title: 'Statistics Analysis & Computation Lab',
        category: 'lab',
        caption: 'Resources for statistical sampling, tabulation, and computational probability.'
      },
      {
        id: 'stat-2',
        title: 'Faculty Tabulation & Research Desk',
        category: 'faculty',
        caption: 'Faculty coaching on board practical data distributions and index numbers.'
      }
    ]
  },

  // 5. Chemistry
  {
    id: 'chemistry',
    name: 'Department of Chemistry',
    faculty: 'Sciences & Computing',
    headOrLead: 'Professors & Analytical Chemistry Specialists',
    badge: 'Organic & Inorganic Labs',
    description: 'Equipped with chemical safety fume cupboards, analytical balances, volumetric apparatus, and reagents for thorough organic and inorganic laboratory investigations.',
    facilities: [
      'Chemical fume hood & ventilation exhaust system',
      'Analytical digital balances, pH meters & thermometers',
      'Volumetric titration benches with burettes and pipettes',
      'Secure chemical storage & reagent preparation counter'
    ],
    programsServed: [
      'HSC Pre-Medical',
      'HSC Pre-Engineering',
      'Associate Degree in Science (ADS)'
    ],
    keyCourses: [
      'Fundamental Chemical Concepts & Stoichiometry',
      'Atomic Structure, Periodic Properties & Chemical Bonding',
      'Physical Chemistry, Thermodynamics & Electrochemistry',
      'Inorganic Qualitative Salt Analysis (Cations & Anions)',
      'Organic Chemistry: Hydrocarbons, Functional Groups & Reaction Mechanisms'
    ],
    labsAvailable: 'Chemistry Laboratory (Ground Floor Science Block)',
    achievements: 'Students consistently achieve high distinction in Sindh Board chemical qualitative practicals.',
    photos: [
      {
        id: 'chem-1',
        title: 'Main Chemistry Laboratory',
        category: 'lab',
        caption: 'Volumetric titration tables, reagent racks, and analytical balances.'
      },
      {
        id: 'chem-2',
        title: 'Fume Hood & Qualitative Analysis Counter',
        category: 'apparatus',
        caption: 'Safety-certified fume cupboards for chemical heating and gas evolution.'
      },
      {
        id: 'chem-3',
        title: 'Faculty Mentorship & Practical Guidance',
        category: 'faculty',
        caption: 'Faculty guiding students in precise burette readings and salt identification.'
      }
    ]
  },

  // 6. Botany (Only Botany)
  {
    id: 'botany',
    name: 'Department of Botany',
    faculty: 'Life Sciences',
    headOrLead: 'Senior Botany Lecturers & Plant Taxonomists',
    badge: 'Herbarium & Plant Sciences',
    description: 'Exclusively dedicated to plant biology, plant morphology, cytology, physiology, taxonomy, and botanical conservation with regional herbarium collections.',
    facilities: [
      'Botanical specimen preservation and regional herbarium',
      'High-resolution compound microscopes for plant histology',
      'Microtome and plant tissue slide-staining preparation counter',
      'Campus botanical flora plots & live specimen garden'
    ],
    programsServed: [
      'HSC Pre-Medical',
      'Associate Degree in Science (ADS)',
      'Plant Biology Research Electives'
    ],
    keyCourses: [
      'Plant Diversity, Algae, Fungi & Bryophytes',
      'Vascular Plants, Gymnosperms & Angiosperm Anatomy',
      'Plant Physiology: Transpiration, Photosynthesis & Respiration',
      'Plant Taxonomy, Floral Formulas & Regional Flora of Sindh',
      'Environmental Botany & Plant Pathology'
    ],
    labsAvailable: 'Botany Laboratory & Herbarium Suite (Science Block)',
    achievements: 'Active plant conservation initiatives and stellar scores in BISE Hyderabad practical examinations.',
    photos: [
      {
        id: 'bot-1',
        title: 'Botany Laboratory & Microscope Suite',
        category: 'lab',
        caption: 'Compound microscopes and microtomes for plant section cutting and tissue examination.'
      },
      {
        id: 'bot-2',
        title: 'Campus Botanical Herbarium & Flora Collection',
        category: 'apparatus',
        caption: 'Specimen archives of regional flora, leaf mounts, and botanical charts.'
      },
      {
        id: 'bot-3',
        title: 'Botany Faculty & Field Demonstration',
        category: 'faculty',
        caption: 'Senior botanists training students in floral dissection and classification.'
      }
    ]
  },

  // 7. Zoology (Only Zoology)
  {
    id: 'zoology',
    name: 'Department of Zoology',
    faculty: 'Life Sciences',
    headOrLead: 'Senior Professors & Lecturers in Animal Sciences',
    badge: 'Flagship 4-Year BS Degree Center',
    description: 'Exclusively dedicated to animal biology, morphology, histology, genetics, entomology, and evolutionary biology. Serves as the college degree center for 4-Year BS Zoology affiliated with the University of Sindh.',
    facilities: [
      'Zoological specimen museum with diverse marine & terrestrial fauna',
      'Anatomical dissection benches with surgical kits',
      'Binocular and compound research microscopes',
      'Specimen preservation jars, incubator & microtome apparatus'
    ],
    programsServed: [
      '4-Year BS Zoology (Affiliated with University of Sindh Jamshoro)',
      'HSC Pre-Medical (Biology Group)',
      'Associate Degree in Science (ADS)'
    ],
    keyCourses: [
      'Invertebrate & Chordate Diversity & Comparative Anatomy',
      'Animal Cell Biology, Genetics & Molecular Genetics',
      'Animal Physiology, Endocrinology & Neurobiology',
      'Applied Entomology, Pest Control & Parasitology',
      'Wildlife Ecology, Conservation & Fisheries Management'
    ],
    labsAvailable: 'Zoology Research Laboratory & Fauna Museum (1st Floor Science Block)',
    achievements: 'Flagship university-affiliated 4-year degree department producing successful doctors, researchers, and public officers.',
    photos: [
      {
        id: 'zoo-1',
        title: 'Zoology Museum & Specimen Gallery',
        category: 'lab',
        caption: 'Preserved specimens illustrating invertebrate and vertebrate evolutionary biology.'
      },
      {
        id: 'zoo-2',
        title: 'Dissection & Microscopy Workstation',
        category: 'apparatus',
        caption: 'Individual dissection trays, surgical tools, and stereoscopic examination stations.'
      },
      {
        id: 'zoo-3',
        title: 'BS Zoology Faculty & Research Seminars',
        category: 'faculty',
        caption: 'University of Sindh affiliated professors supervising BS degree theses and lab studies.'
      }
    ]
  },

  // 8. Physiology (Separated / Added)
  {
    id: 'physiology',
    name: 'Department of Physiology',
    faculty: 'Life Sciences',
    headOrLead: 'Senior Lecturers in Human & Comparative Physiology',
    badge: 'Human Biology & Clinical Prep',
    description: 'Focused on the vital mechanisms, organ system dynamics, cardiovascular, respiratory, neural, and metabolic functions of the human body for pre-medical and health science students.',
    facilities: [
      'Sphygmomanometers, stethoscopes & blood pressure observation kits',
      'Hemoglobinometers, hemocytometers & blood grouping reagents',
      'Human anatomical models, reflex hammers & spirometry charts',
      'Physiological charts and simulation audiovisual resources'
    ],
    programsServed: [
      'Associate Degree in Physiology & Health Sciences (ADS)',
      'HSC Pre-Medical (Clinical Biology Stream)',
      'BS Zoology Human Physiology Modules',
      'Pre-Medical & Health Allied Preparation'
    ],
    keyCourses: [
      'Cellular Physiology & Membrane Transport Mechanisms',
      'Cardiovascular & Respiratory Physiology',
      'Neurophysiology, Reflexes & Sensory Systems',
      'Renal Function, Excretion & Osmoregulation',
      'Endocrine Regulation & Metabolic Homeostasis'
    ],
    labsAvailable: 'Physiology & Clinical Demonstration Laboratory',
    achievements: 'Direct preparation for medical college (MBBS, BDS, Pharm-D) entry exams and clinical foundational mastery.',
    photos: [
      {
        id: 'physio-1',
        title: 'Physiology Laboratory & Diagnostic Equipment',
        category: 'lab',
        caption: 'Kits for blood smear analysis, hemoglobin tests, and cardiovascular monitoring.'
      },
      {
        id: 'physio-2',
        title: 'Anatomical & Physiological Models',
        category: 'apparatus',
        caption: 'Detailed anatomical torsos, organ cross-sections, and neural pathway displays.'
      },
      {
        id: 'physio-3',
        title: 'Faculty Demonstration & Medical Mentorship',
        category: 'faculty',
        caption: 'Experienced faculty guiding pre-medical aspirants on clinical vital measurements.'
      }
    ]
  },

  // 9. Commerce
  {
    id: 'commerce',
    name: 'Department of Commerce',
    faculty: 'Commerce & Economics',
    headOrLead: 'Senior Commerce & Accounting Faculty',
    badge: 'I.Com + 2-Yr AD Commerce',
    description: 'Provides rigorous education in financial accounting, corporate governance, auditing, business taxation, and banking practices.',
    facilities: [
      'Business computing workstations and accounting software setups',
      'Commercial simulated accounting office and ledger practice tables',
      'Corporate law and taxation reference collection'
    ],
    programsServed: [
      'Intermediate Commerce (I.Com)',
      'Associate Degree in Commerce (AD Commerce / ADC)',
      'Professional CA & ACCA Foundation'
    ],
    keyCourses: [
      'Principles of Accounting & Financial Reporting',
      'Cost & Managerial Accounting',
      'Principles of Commerce & Commercial Geography',
      'Business Taxation, Mercantile Law & Auditing',
      'Banking Practice & Corporate Governance'
    ],
    labsAvailable: 'Commerce Resource & Financial Practice Suite',
    achievements: 'Smooth transition for students into 5th-semester BS Commerce, BBA, and CA firms.',
    photos: [
      {
        id: 'comm-1',
        title: 'Commerce Resource & Practice Room',
        category: 'lab',
        caption: 'Workstations with business software and financial record keeping templates.'
      },
      {
        id: 'comm-2',
        title: 'Commerce Faculty & Career Counseling',
        category: 'faculty',
        caption: 'Accounting professors guiding students toward chartered accountancy and banking careers.'
      }
    ]
  },

  // 10. Economics (Separated / Added)
  {
    id: 'economics',
    name: 'Department of Economics',
    faculty: 'Commerce & Economics',
    headOrLead: 'Senior Lecturers in Economics',
    badge: 'Micro & Macro Analytics',
    description: 'Imparts foundational microeconomics, macroeconomic theory, public finance, monetary policy, and developmental economics with focus on Pakistan’s economy.',
    facilities: [
      'Economic data and statistical bulletin archive',
      'State Bank of Pakistan and economic survey reference shelf',
      'Discussion forum for fiscal policy and market trends'
    ],
    programsServed: [
      'Intermediate Commerce (I.Com)',
      'Humanities / Arts Group (FA)',
      'Associate Degree in Commerce & Arts (ADC/ADA)'
    ],
    keyCourses: [
      'Principles of Microeconomics: Demand, Supply & Market Structures',
      'Macroeconomics: National Income, Inflation & Employment',
      'Money, Banking & Monetary Policy',
      'Public Finance, Taxation & Government Budgeting',
      'Economic Development & Emerging Challenges of Pakistan'
    ],
    labsAvailable: 'Economic Analysis & Case Study Seminar Room',
    achievements: 'Prepares students for economics degrees at top universities and civil service economics papers.',
    photos: [
      {
        id: 'econ-1',
        title: 'Economics Seminar & Discussion Forum',
        category: 'seminar',
        caption: 'Interactive seminar space for economic surveys and national budget debates.'
      },
      {
        id: 'econ-2',
        title: 'Economics Faculty Desk',
        category: 'faculty',
        caption: 'Faculty coaching students on graphical demand curves and economic models.'
      }
    ]
  },

  // 11. Geography (Separated / Added)
  {
    id: 'geography',
    name: 'Department of Geography',
    faculty: 'Humanities & Social Sciences',
    headOrLead: 'Senior Geography Lecturers & Cartographers',
    badge: 'Physical & Commercial Geography',
    description: 'Focuses on physical geomorphology, climatology, world regional geography, cartography, map reading, and commercial economic resources.',
    facilities: [
      'Topographical and geopolitical map drawing tables',
      'Globes, meteorological barometer & rain gauge demonstrations',
      'Cartographic projection instruments and tracing light tables',
      'Satellite and regional atlas archives of Sindh & Pakistan'
    ],
    programsServed: [
      'Intermediate Commerce (Commercial Geography)',
      'Humanities / Arts Group (FA Geography)',
      'Associate Degree in Arts & Science (ADA / ADS)'
    ],
    keyCourses: [
      'Physical Geography: Lithosphere, Atmosphere & Hydrosphere',
      'Commercial Geography of Pakistan and the World',
      'Cartography, Map Projections & Surveying',
      'Climatology, Natural Hazards & Environmental Geography',
      'Economic Resources: Agriculture, Minerals & Global Trade Routes'
    ],
    labsAvailable: 'Geography & Cartography Practical Laboratory',
    achievements: 'Exceptional map-drawing and topographical interpretation skills in board examinations.',
    photos: [
      {
        id: 'geo-1',
        title: 'Geography & Cartography Drawing Lab',
        category: 'lab',
        caption: 'Light tables and drawing boards for contour mapping and cartographic projection.'
      },
      {
        id: 'geo-2',
        title: 'Meteorological & Map Demonstration Archive',
        category: 'apparatus',
        caption: 'Relief globes, weather instruments, and large-format geographical surveys.'
      },
      {
        id: 'geo-3',
        title: 'Geography Faculty & Field Guide',
        category: 'faculty',
        caption: 'Senior lecturers conducting map-reading and geographical survey exercises.'
      }
    ]
  },

  // 12. English
  {
    id: 'english',
    name: 'Department of English',
    faculty: 'Languages & Literature',
    headOrLead: 'Senior English Faculty & Debating Society Mentors',
    badge: 'Language & Debating Forum',
    description: 'Dedicated to English language acquisition, critical reading, grammar, phonetics, composition, and literature across all academic disciplines.',
    facilities: [
      'Audio-lingual listening and pronunciation resources',
      'English debating podium and declamation practice arena',
      'Literary circle library featuring prose, poetry, and drama classics'
    ],
    programsServed: [
      'Compulsory English across all HSC streams',
      'Advanced Functional English for BS Zoology & Associate Degrees',
      'College English Literary & Debating Society'
    ],
    keyCourses: [
      'Functional English, Syntax & Grammar Mastery',
      'Reading Comprehension & Critical Analysis',
      'Academic Essay, Précis & Technical Report Writing',
      'English Prose, Short Stories & Classical Poetry',
      'Public Speaking, Oratory & Professional Communication'
    ],
    labsAvailable: 'English Language & Debating Forum (Main Hall Wing)',
    achievements: 'Students regularly represent the college and win top prizes in inter-collegiate English declamation contests.',
    photos: [
      {
        id: 'eng-1',
        title: 'English Literary & Language Forum',
        category: 'seminar',
        caption: 'Collegiate podium and acoustic seminar room for debates and recitation.'
      },
      {
        id: 'eng-2',
        title: 'Department Faculty & Literary Circle',
        category: 'faculty',
        caption: 'Faculty guiding students in creative writing and communicative English.'
      }
    ]
  },

  // 13. Urdu (Separated)
  {
    id: 'urdu',
    name: 'Department of Urdu',
    faculty: 'Languages & Literature',
    headOrLead: 'Senior Scholars in Classical & Modern Urdu Literature',
    badge: 'National Language & Literary Heritage',
    description: 'Promotes deep appreciation of national language literature, classical ghazal, nazm, Afsana, and rhetorical eloquence through Bait-Bazi and Mushairas.',
    facilities: [
      'Mirza Ghalib, Allama Iqbal & Faiz Ahmad Faiz literary collection',
      'Urdu Bait-Bazi and Mushaira stage arrangement',
      'Classical prose and critique reference section'
    ],
    programsServed: [
      'Urdu Normal / Compulsory (HSC all streams)',
      'Urdu Elective / Advance (Humanities & AD Arts)',
      'College Urdu Literary Society (Bazm-e-Adab)'
    ],
    keyCourses: [
      'Classical & Modern Urdu Poetry (Ghazal & Nazm)',
      'Urdu Prose, Drama & Short Stories (Afsana)',
      'Principles of Urdu Grammar, Insha & Essay Writing',
      'Literary Criticism & History of Urdu Literature',
      'Art of Declamation & Bait-Bazi'
    ],
    labsAvailable: 'Urdu Seminar Room & Bazm-e-Adab Hall',
    achievements: 'Champions in BISE Hyderabad inter-collegiate Bait-Bazi and annual youth literary festivals.',
    photos: [
      {
        id: 'urdu-1',
        title: 'Bazm-e-Adab & Urdu Seminar Room',
        category: 'seminar',
        caption: 'Setting for classical Bait-Bazi competitions, mushairas, and literary discussions.'
      },
      {
        id: 'urdu-2',
        title: 'Urdu Faculty & Manuscript Archives',
        category: 'faculty',
        caption: 'Faculty members mentoring students in classical Urdu poetic meters and rhetorical critique.'
      }
    ]
  },

  // 14. Sindhi (Separated)
  {
    id: 'sindhi',
    name: 'Department of Sindhi',
    faculty: 'Languages & Literature',
    headOrLead: 'Senior Scholars in Sindhi Adab & Folklore',
    badge: 'Sindh Cultural & Literary Glory',
    description: 'Dedicated to the study, preservation, and celebration of the Sindhi language, Shah Jo Risalo, classical Sufi poetry, modern prose, and regional Sindhi culture.',
    facilities: [
      'Shah Abdul Latif Bhittai, Sachal Sarmast & Mirza Qalich Baig study corner',
      'Sindhi Adabi Board publications and rare books collection',
      'Sindhi Cultural Day pavilion and folk art display'
    ],
    programsServed: [
      'Sindhi Normal & Sindhi Salees (HSC all streams)',
      'Sindhi Elective / Literature (Humanities & AD Arts)',
      'College Sindhi Cultural & Literary Forum'
    ],
    keyCourses: [
      'Shah Jo Risalo: Sur Kalyan, Yaman & Sarang Studies',
      'Sindhi Classical & Sufi Poetry Traditions',
      'Modern Sindhi Prose, Novel & Short Stories',
      'Sindhi Grammar, Orthography & Composition',
      'History & Evolution of Sindhi Language & Civilization'
    ],
    labsAvailable: 'Sindhi Adabi Corner & Cultural Hall',
    achievements: 'Organizes the annual grand Sindh Cultural Day, Sufi poetry recitations, and regional folk seminars.',
    photos: [
      {
        id: 'sindhi-1',
        title: 'Shah Abdul Latif Bhittai Study Corner',
        category: 'seminar',
        caption: 'Dedicated study space with Shah Jo Risalo volumes and Sindhi Adabi Board archives.'
      },
      {
        id: 'sindhi-2',
        title: 'Department Faculty & Cultural Pavilion',
        category: 'faculty',
        caption: 'Senior Sindhi scholars organizing cultural declamations and regional folklore exhibitions.'
      }
    ]
  },

  // 15. Islamiat / Islamic Studies (Separated)
  {
    id: 'islamiyat',
    name: 'Department of Islamiat (Islamic Studies)',
    faculty: 'Humanities & Social Sciences',
    headOrLead: 'Senior Lecturers in Islamic Studies & Jurisprudence',
    badge: 'Ethical & Quranic Education',
    description: 'Instills Islamic moral foundations, Quranic comprehension, Hadith sciences, Islamic jurisprudence, and ethical character building for all students.',
    facilities: [
      'Quranic Tafseer, Sahih Hadith compilations & reference library',
      'Seerat-un-Nabi (PBUH) lecture hall and conference stage',
      'Ethics curriculum corner for non-Muslim minority students'
    ],
    programsServed: [
      'Islamiat Compulsory (HSC Part-I all groups)',
      'Ethics Compulsory (For non-Muslim students)',
      'Islamiat Elective (Humanities & AD Arts)'
    ],
    keyCourses: [
      'Selected Quranic Surahs with Translation & Tafseer',
      'Forty Hadith of the Holy Prophet (PBUH) & Practical Application',
      'Pillars of Islam, Ibadat & Spiritual Development',
      'Islamic Ethical System, Family Values & Human Rights',
      'Islamic Shariah, Economics & Social Justice'
    ],
    labsAvailable: 'Islamic Studies Resource & Prayer Wing',
    achievements: 'Hosts annual Seerat Conferences, Husn-e-Qirat competitions, and inter-collegiate Naat contests.',
    photos: [
      {
        id: 'isl-1',
        title: 'Islamic Studies & Tafseer Reference Wing',
        category: 'seminar',
        caption: 'Rich repository of Quranic commentaries, Hadith collections, and Islamic ethical texts.'
      },
      {
        id: 'isl-2',
        title: 'Faculty Mentorship & Seerat Conference Desk',
        category: 'faculty',
        caption: 'Faculty organizing character-building seminars, Qirat, and Naat competitions.'
      }
    ]
  },

  // 16. Islamic Culture (Separated)
  {
    id: 'islamic-culture',
    name: 'Department of Islamic Culture',
    faculty: 'Humanities & Social Sciences',
    headOrLead: 'Departmental Faculty in Islamic Civilization & Arts',
    badge: 'Civilization & Cultural Heritage',
    description: 'Focuses on the rich historical development of Islamic civilization, architecture, scientific contributions of Muslim scholars, calligraphy, and social institutions.',
    facilities: [
      'Islamic architectural photography and monument archives',
      'Golden Age of Islamic Science charts and visual timelines',
      'Calligraphy display models and civilization manuscripts collection'
    ],
    programsServed: [
      'Islamic Culture (Elective for Humanities / Arts Group)',
      'Associate Degree in Arts (ADA) Cultural Studies'
    ],
    keyCourses: [
      'Origins & Foundations of Islamic Civilization',
      'Scientific & Philosophical Contributions of Muslim Scholars',
      'Islamic Architecture, Calligraphy & Geometric Arts',
      'Social & Legal Institutions in the Classical Islamic World',
      'Islamic Civilization’s Impact on Global Renaissance'
    ],
    labsAvailable: 'Islamic Civilization & Culture Seminar Room',
    achievements: 'Deeply equips students with scholarly understanding of Muslim intellectual heritage.',
    photos: [
      {
        id: 'isc-1',
        title: 'Islamic Civilization & Arts Showcase',
        category: 'seminar',
        caption: 'Visual archives of Islamic architecture, geometric arts, and historical manuscripts.'
      },
      {
        id: 'isc-2',
        title: 'Islamic Culture Faculty & Seminar Room',
        category: 'faculty',
        caption: 'Faculty guiding students in the study of classical Muslim science and intellectual heritage.'
      }
    ]
  },

  // 17. Muslim History (Separated)
  {
    id: 'muslim-history',
    name: 'Department of Muslim History',
    faculty: 'Humanities & Social Sciences',
    headOrLead: 'Senior Lecturers in Muslim History & Historiography',
    badge: 'Historiography & Caliphates',
    description: 'Explores the political, social, and cultural chronology of the Islamic world from the Khulafa-e-Rashideen, Umayyad and Abbasid eras through the Ottoman and Mughal empires.',
    facilities: [
      'Historical timeline maps of the Islamic Caliphates',
      'Historiographical reference books by Ibn Khaldun, Al-Tabari & Ibn Athir',
      'Audiovisual documentaries on the evolution of Muslim empires'
    ],
    programsServed: [
      'Muslim History (Elective for Humanities / Arts Group)',
      'Associate Degree in Arts (ADA)',
      'Civil Services History Preparation'
    ],
    keyCourses: [
      'Era of the Rightly Guided Caliphs (Khilafat-e-Rashida)',
      'The Umayyad Dynasty & Expansion of Islamic Lands',
      'The Golden Era of the Abbasid Caliphate in Baghdad',
      'Muslim Rule in Spain (Al-Andalus) & Fatimid Cairo',
      'The Ottoman Empire & Muslim Rule in South Asia'
    ],
    labsAvailable: 'Muslim History & Historical Maps Archive',
    achievements: 'A primary academic springboard for high-scoring papers in competitive CSS, PMS, and SPSC exams.',
    photos: [
      {
        id: 'mh-1',
        title: 'Muslim History Historical Maps & Chronology Room',
        category: 'seminar',
        caption: 'Chronological charts and historical territory maps of Islamic caliphates and dynasties.'
      },
      {
        id: 'mh-2',
        title: 'Faculty & Historiographical Research Desk',
        category: 'faculty',
        caption: 'Historians mentoring students on historical analysis and examination answer writing.'
      }
    ]
  },

  // 18. Pakistan Studies (Separated)
  {
    id: 'pakistan-studies',
    name: 'Department of Pakistan Studies',
    faculty: 'Humanities & Social Sciences',
    headOrLead: 'Senior Lecturers in Pakistan Affairs & Constitutional History',
    badge: 'Ideology & Nationhood',
    description: 'Dedicated to imparting comprehensive knowledge of the Pakistan Movement, Quaid-e-Azam’s vision, constitutional evolution, foreign policy, and socio-economic geography.',
    facilities: [
      'Pakistan Movement historical photos and speech archives',
      'Constitution of Pakistan (1973) reference volumes',
      'National Day exhibition panels and documentary screening setup'
    ],
    programsServed: [
      'Pakistan Studies Compulsory (HSC Part-II all groups)',
      'Pakistan Studies for Degree and Associate Degree Programs',
      'College Independence & Pakistan Day Committees'
    ],
    keyCourses: [
      'Historical Background of the Pakistan Movement (1857–1947)',
      'Role of Quaid-e-Azam Muhammad Ali Jinnah & Allama Iqbal',
      'Constitutional Evolution & the 1973 Constitution of Pakistan',
      'Land, Natural Resources & Geo-Strategic Importance of Pakistan',
      'Foreign Policy of Pakistan & Contemporary Global Challenges'
    ],
    labsAvailable: 'Pakistan Affairs Archives & Audio-Visual Hall',
    achievements: 'Organizes Independence Day, Defense Day, and Quaid Day grand declamations and quiz bowls.',
    photos: [
      {
        id: 'pak-1',
        title: 'Pakistan Movement Archives & Exhibition Hall',
        category: 'seminar',
        caption: 'Rare photographs of Quaid-e-Azam, Pakistan Resolution 1940, and freedom movement documentation.'
      },
      {
        id: 'pak-2',
        title: 'Pakistan Studies Faculty & Seminar Corner',
        category: 'faculty',
        caption: 'Faculty guiding students on constitutional history and contemporary geopolitical affairs.'
      }
    ]
  },

  // 19. Political Science & Civics
  {
    id: 'political-science',
    name: 'Department of Political Science & Civics',
    faculty: 'Humanities & Social Sciences',
    headOrLead: 'Senior Political Science Lecturers',
    badge: 'Governance & Legal Studies',
    description: 'Examines state systems, political theories, constitutional frameworks, comparative politics, and civic rights to prepare future leaders, diplomats, and legal scholars.',
    facilities: [
      'Model Parliament & Youth Assembly simulation stage',
      'Comparative constitutional law and governance journal library',
      'Civic awareness and legal rights reference section'
    ],
    programsServed: [
      'Civics / Political Science (Humanities HSC Group)',
      'Associate Degree in Arts (ADA)',
      'Pre-Law & Civil Services Mentorship'
    ],
    keyCourses: [
      'Principles of Political Science & Theory of State',
      'Forms of Government: Democracy, Parliamentary & Presidential Systems',
      'Comparative Constitutions: UK, USA & Pakistan',
      'International Relations & Global Organizations (UN, OIC)',
      'Public Administration & Local Government Systems'
    ],
    labsAvailable: 'Youth Assembly & Civic Forum Room',
    achievements: 'Produces prominent graduates entering Sindh Law College and provincial administration.',
    photos: [
      {
        id: 'pol-1',
        title: 'Civic Assembly & Model Parliament Chamber',
        category: 'seminar',
        caption: 'Mock legislative setup for practicing parliamentary debates and constitutional discussions.'
      },
      {
        id: 'pol-2',
        title: 'Political Science Faculty & Pre-Law Corner',
        category: 'faculty',
        caption: 'Faculty coaching students on comparative political systems and competitive exam papers.'
      }
    ]
  },

  // 20. Sociology & Psychology
  {
    id: 'sociology-psychology',
    name: 'Department of Sociology & Psychology',
    faculty: 'Humanities & Social Sciences',
    headOrLead: 'Faculty in Behavioral & Social Sciences',
    badge: 'Behavioral & Social Research',
    description: 'Explores social institutions, cultural dynamics, cognitive development, human behavior, mental health, and community counseling.',
    facilities: [
      'Psychological testing apparatus and cognitive assessment kits',
      'Confidential student counseling and mental wellness desk',
      'Sociological survey tabulation and field study records'
    ],
    programsServed: [
      'Sociology / Psychology Electives (Humanities Group)',
      'Associate Degree in Arts (ADA)',
      'Campus Wellness & Mentorship'
    ],
    keyCourses: [
      'Principles of Sociology: Culture, Socialization & Institutions',
      'Social Problems of Pakistan & Community Welfare',
      'General Psychology: Perception, Learning & Memory',
      'Human Development, Personality Theories & Mental Health',
      'Social Psychology & Group Dynamics'
    ],
    labsAvailable: 'Psychology Testing & Counseling Clinic',
    achievements: 'Conducts regular mental health awareness workshops and community development field surveys.',
    photos: [
      {
        id: 'soc-1',
        title: 'Psychology Testing & Counseling Clinic',
        category: 'lab',
        caption: 'Apparatus for sensory perception tests, memory evaluation, and confidential counseling.'
      },
      {
        id: 'soc-2',
        title: 'Department Faculty & Behavioral Research Desk',
        category: 'faculty',
        caption: 'Faculty supervising psychological experiments and community social research.'
      }
    ]
  },

  // 21. Physical Education
  {
    id: 'physical-education',
    name: 'Department of Physical Education',
    faculty: 'Health & Physical Education',
    headOrLead: 'Director of Physical Education & Sports Instructors',
    badge: 'Sports, Athletics & Wellness',
    description: 'Promotes physical fitness, sportsmanship, athletic excellence, and health education across the college through structured physical training, inter-class tournaments, and regional college sports.',
    facilities: [
      'Outdoor sports grounds & badminton courts',
      'Indoor table tennis, throwball & athletics equipment store',
      'Physical Education Desk with rackets, shuttlecocks & first-aid safety kits',
      'Annual Sports Week track & relay coordination suite'
    ],
    programsServed: [
      'Health & Physical Education (FA / Humanities Elective)',
      'Associate Degree in Arts (ADA) Physical Education',
      'All-College Sports Teams & Inter-Class Athletics (HSC, BS & AD)'
    ],
    keyCourses: [
      'Foundations of Health & Physical Education',
      'Sports Anatomy, Kinesiology & Physical Fitness',
      'Rules & Officiating of Badminton, Table Tennis & Throwball',
      'Track & Field Athletics, Relay Coordination & Gymnastics',
      'First Aid, Sports Safety & Nutrition Fundamentals'
    ],
    labsAvailable: 'Physical Education Desk, Sports Grounds & Badminton Courts',
    achievements: 'Organizes the Annual Inter-Class Sports Week, athletic championships, and prepares Zubaida College teams for BISE Hyderabad & inter-collegiate tournaments.',
    photos: [
      {
        id: 'pe-1',
        title: 'College Sports Grounds & Badminton Courts',
        category: 'lab',
        caption: 'Dedicated outdoor courts and recreation grounds for badminton, throwball, and track events.'
      },
      {
        id: 'pe-2',
        title: 'Sports Equipment & Safety Kit Suite',
        category: 'apparatus',
        caption: 'Rackets, shuttlecocks, nets, athletic track markers, and first-aid kits managed at the Physical Education Desk.'
      },
      {
        id: 'pe-3',
        title: 'Director of Physical Education & Team Coaching',
        category: 'faculty',
        caption: 'Supervising inter-class championships, physical conditioning, and annual sports day ceremonies.'
      }
    ]
  }
];
