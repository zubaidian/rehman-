export interface AcademicProgram {
  id: string;
  category: 'intermediate' | 'degree' | 'associate';
  title: string;
  duration: string;
  department: string;
  overview: string;
  subjects: string[];
  eligibility: string;
  futureProspects: string[];
  featured?: boolean;
}

export interface BoardHonor {
  position: string;
  candidateName: string;
  fatherName: string;
  rollNumber: string;
  marks: string;
  totalMarks: string;
  exam: string;
  group: string;
  board: string;
  details: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Admissions' | 'Examinations' | 'Announcements' | 'Campus';
  urgent?: boolean;
  summary: string;
  details: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: 'campus' | 'honors' | 'academics' | 'faculty';
  caption: string;
  highlight?: boolean;
}

export const COLLEGE_INFO = {
  name: "Government Girls Zubaida College Hyderabad",
  shortName: "Govt Girls Zubaida College",
  abbreviation: "GGZC",
  motto: "SERVICE ABOVE SELF",
  totalEnrolledStudents: 2000,
  totalStudentsFormatted: "2,000",
  establishedYear: 1953,
  charterYear: 1954,
  location: "Opposite Hyderabad Central Jail, Pathan Colony, Hirabad, Hyderabad, Sindh, Pakistan",
  email: "zubaidagirls907@gmail.com",
  phone: "(022) 9210196",
  phoneRaw: "+92229210196",
  helpline: "0304-3094606",
  helplineRaw: "+923043094606",
  officeHours: "Monday–Saturday: 8:00 AM – 2:00 PM (PKT) · Sunday Closed",
  facebookUrl: "https://www.facebook.com/profile.php?id=100064211700343",
  seccapUrl: "https://seccap.dgcs.gos.pk/",
  principalName: "Prof. Yasmeen Panhwar",
  principalTitle: "Principal, Govt Girls Zubaida College Hyderabad",
  images: {
    logo: "/assets/aistudio/college-logo_075efbff.jpg",
    campus: "/assets/aistudio/campus_86930cb8.jpg",
    principal: "/assets/aistudio/principal-photo_e6a19362.jpg",
    qr: "/assets/aistudio/college-location-qr_602c0c79.png",
    boardResultsFlyer: "/assets/aistudio/817460125_1493703939446649_9144013667062097966_n_92b09ca6.jpg",
    boardResultsOfficial: "/assets/aistudio/815703728_1493032862847090_3032195106224050107_n_6a280dce.jpg",
  }
};

export const BOARD_HONORS: BoardHonor[] = [
  {
    position: "2nd Position in Sindh Board",
    candidateName: "Maryam Bibi",
    fatherName: "Muhammad Aslam",
    rollNumber: "79256",
    marks: "916",
    totalMarks: "1100",
    exam: "HSC Part-II (Class XII) Annual Examination",
    group: "Computer Science Group",
    board: "Board of Intermediate & Secondary Education (BISE) Hyderabad",
    details: "Distinguished achievement representing Govt Girls College Hyd (Zubaida) at the top provincial level."
  },
  {
    position: "4th Position in Sindh Board",
    candidateName: "Top Achiever",
    fatherName: "Proud Zubeidan",
    rollNumber: "Top Merit",
    marks: "900+",
    totalMarks: "1100",
    exam: "HSC Part-II (Class XII) Annual Examination",
    group: "Computer Science Group",
    board: "BISE Hyderabad",
    details: "Outstanding performance securing another Top 5 merit slot for Zubaida College."
  }
];

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    id: "pre-medical",
    category: "intermediate",
    title: "Pre-Medical Group (HSC)",
    duration: "2 Years (Class XI & XII)",
    department: "Faculty of Natural Sciences",
    overview: "Rigorous preparation for careers in Medicine (MBBS), Dental Surgery (BDS), Pharmacy, Biotechnology, and Allied Health Sciences.",
    subjects: ["Biology (Botany & Zoology)", "Chemistry", "Physics", "English", "Urdu / Sindhi Normal", "Islamic Studies / Ethics & Pakistan Studies"],
    eligibility: "Matriculation (SSC) with Science / Biology from any recognized Board with high merit.",
    futureProspects: ["MBBS / BDS Medical Colleges", "Doctor of Pharmacy (Pharm-D)", "Biotechnology & Biochemistry", "Nursing & Public Health Sciences"],
    featured: true
  },
  {
    id: "pre-engineering",
    category: "intermediate",
    title: "Pre-Engineering Group (HSC)",
    duration: "2 Years (Class XI & XII)",
    department: "Faculty of Applied Sciences & Mathematics",
    overview: "Strong foundation in higher mathematics and physical sciences for entry into Mehran UET, NED, and top engineering institutions.",
    subjects: ["Mathematics", "Physics", "Chemistry", "English", "Urdu / Sindhi", "Islamic Studies & Pakistan Studies"],
    eligibility: "SSC with Science / Mathematics from any recognized Board of Secondary Education.",
    futureProspects: ["Civil, Electrical & Software Engineering", "Architecture & Town Planning", "Data Science & Artificial Intelligence", "Actuarial Science & Space Tech"]
  },
  {
    id: "computer-science",
    category: "intermediate",
    title: "General Science (Computer Science)",
    duration: "2 Years (Class XI & XII)",
    department: "Department of Computer Science",
    overview: "Premier stream with proven Board Top Positions (2nd & 4th in Hyderabad Board), modern computer labs, and 100% exam pass records.",
    subjects: ["Computer Science (Theory & Practical)", "Mathematics", "Physics / Statistics", "English", "Urdu / Sindhi", "Islamic Studies & Pakistan Studies"],
    eligibility: "SSC Matriculation with Science / General Science with minimum eligibility requirements.",
    futureProspects: ["BS Computer Science (BSCS)", "Software Engineering & Web Dev", "Cybersecurity & Cloud Computing", "Information Technology Leadership"],
    featured: true
  },
  {
    id: "commerce",
    category: "intermediate",
    title: "Commerce Group (I.Com)",
    duration: "2 Years (Class XI & XII)",
    department: "Department of Commerce & Accounting",
    overview: "Comprehensive grounding in business mathematics, accounting, commercial geography, and economic principles.",
    subjects: ["Principles of Accounting", "Principles of Commerce", "Principles of Economics", "Business Mathematics", "English & Urdu", "Pak Studies"],
    eligibility: "SSC Matriculation in any stream with aptitude for business and finance.",
    futureProspects: ["BBA / BS Accounting & Finance", "Chartered Accountancy (CA / ACCA)", "Banking & Corporate Finance", "Public Administration"]
  },
  {
    id: "humanities",
    category: "intermediate",
    title: "Humanities / Arts Group (FA)",
    duration: "2 Years (Class XI & XII)",
    department: "Faculty of Arts & Humanities",
    overview: "Cultivating critical thinking, social awareness, literature, and analytical skills for civil service, legal studies, and media.",
    subjects: ["Islamic History / World History", "Civics / Political Science", "Education / Sociology", "Psychology", "Languages (Sindhi, Urdu, Arabic)", "English"],
    eligibility: "SSC Matriculation in Science or Arts.",
    futureProspects: ["CSS / PMS Civil Services", "LLB Law & Judiciary", "Journalism & Mass Media", "Education & University Professorships"]
  },
  {
    id: "bs-zoology",
    category: "degree",
    title: "BS Zoology (4 Years Degree)",
    duration: "4 Years (8 Semesters)",
    department: "Department of Zoology & Life Sciences",
    overview: "Premier 4-year undergraduate degree program affiliated with the University of Sindh, Jamshoro. Equips students with in-depth knowledge in animal diversity, cell biology, genetics, physiology, endocrinology, entomology, wildlife conservation, and modern biological lab techniques.",
    subjects: ["Animal Diversity (Invertebrates & Chordates)", "Cell & Molecular Biology", "Animal Physiology & Endocrinology", "Genetics & Evolutionary Biology", "Environmental Biology & Wildlife Ecology", "Applied Entomology & Fisheries", "Biostatistics & Lab Techniques"],
    eligibility: "Intermediate (HSC) Pre-Medical or equivalent biological sciences group with minimum 45% marks as per University of Sindh criteria.",
    futureProspects: ["Wildlife Biologist & Conservation Officer", "Clinical & Medical Diagnostic Laboratories", "Fisheries & Livestock Research Departments", "Environmental Protection Agencies (SEPA)", "Lectureship & Academic Research (MPhil/PhD)", "Civil Services (CSS / PMS)"],
    featured: true
  },
  {
    id: "ad-commerce",
    category: "associate",
    title: "Associate Degree in Commerce (AD Commerce / ADC)",
    duration: "2 Years (4 Semesters)",
    department: "Faculty of Commerce & Business Studies",
    overview: "Comprehensive 2-year university associate degree affiliated with the University of Sindh. Provides thorough grounding in corporate accounting, taxation, business auditing, cost accounting, and business laws with seamless lateral entry into 5th semester BS Commerce / BBA.",
    subjects: ["Advanced Financial Accounting", "Business Taxation & Fiscal Laws", "Auditing & Corporate Governance", "Cost & Managerial Accounting", "Business Communication & Report Writing", "Banking Law & Practice", "Economics & Business Mathematics"],
    eligibility: "HSC Commerce (I.Com), F.Sc, FA, or equivalent intermediate qualification.",
    futureProspects: ["Lateral transition to 5th semester BS Commerce / BBA", "Corporate Accountant & Audit Assistant", "Taxation & Financial Consultancy", "Commercial & Microfinance Banking", "Public & Private Sector Financial Administration"],
    featured: true
  },
  {
    id: "ad-science",
    category: "associate",
    title: "Associate Degree in Science (AD Science / ADS)",
    duration: "2 Years (4 Semesters)",
    department: "Faculty of Sciences",
    overview: "Rigorous 2-year post-intermediate science program offering pathways into 5th semester BS degree transitions.",
    subjects: ["Botany / Zoology / Chemistry combinations", "Mathematics / Physics combinations", "Applied Research Labs"],
    eligibility: "HSC Pre-Medical or Pre-Engineering with minimum pass marks.",
    futureProspects: ["Transition into 5th semester BS programs", "Laboratory Technologist", "Science Education"]
  },
  {
    id: "ad-arts",
    category: "associate",
    title: "Associate Degree in Arts (AD Arts / ADA)",
    duration: "2 Years (4 Semesters)",
    department: "Faculty of Social Sciences",
    overview: "Modern 2-year university associate program designed for flexible career building in social sciences, education, and public administration.",
    subjects: ["Sociology", "Political Science", "Islamic Culture & History", "English Language Studies"],
    eligibility: "HSC in any group.",
    futureProspects: ["Lateral entry to BS 5th semester", "Public Sector Recruitment", "Community Development"]
  },
  {
    id: "ad-physiology",
    category: "associate",
    title: "Associate Degree in Physiology & Health Sciences (ADS Physiology)",
    duration: "2 Years (4 Semesters)",
    department: "Department of Physiology & Life Sciences",
    overview: "Specialized 2-year university associate degree affiliated with the University of Sindh Jamshoro. Focuses on cellular mechanisms, human cardiovascular dynamics, clinical diagnostics, neurophysiology, endocrine pathways, and clinical laboratory investigations with seamless transition to BS 5th semester.",
    subjects: [
      "Human Anatomy & Organ Systems",
      "Cellular Physiology & Biochemistry",
      "Cardiovascular & Respiratory Dynamics",
      "Neurophysiology & Endocrinology",
      "Clinical Diagnostics & Lab Techniques",
      "Pathology & Microbiology Fundamentals"
    ],
    eligibility: "HSC Pre-Medical or equivalent biological science stream with minimum 45% marks.",
    futureProspects: [
      "Lateral entry to 5th semester BS Physiology / Medical Lab Tech",
      "Diagnostic & Clinical Laboratory Technologist",
      "Allied Health Sciences & Hospital Administration",
      "Pharmaceutical Research & Clinical Diagnostics",
      "Public Health Organizations & Civil Services (CSS/PMS)"
    ],
    featured: true
  }
];

export const NOTICES: Notice[] = [
  {
    id: "notice-seccap-2024-25",
    title: "SECCAP Centralized Admissions for Intermediate Class XI",
    date: "Current Academic Session",
    category: "Admissions",
    urgent: true,
    summary: "Admissions open in XI for Pre-Medical, Pre-Engineering, Computer Science, Commerce, and Humanities through SECCAP.",
    details: "Government Girls Zubaida College welcomes new applicants through the Sindh Electronic Centralized College Admission Program (SECCAP). Apply online via seccap.dgcs.gos.pk using your IX / Matric roll number and B-Form. Free admission policy applies as per College Education Department guidelines."
  },
  {
    id: "notice-board-results-cs",
    title: "Heartiest Congratulations on Outstanding Board Results in Computer Science",
    date: "Annual Examination 2026",
    category: "Examinations",
    urgent: false,
    summary: "Zubaida College clinches 2nd & 4th Board Positions with zero failures and dominant A1 & A grades.",
    details: "Principal Prof. Yasmeen Panhwar and faculty members congratulate student Maryam Bibi (Roll # 79256, Marks 916/1100) for bagging 2nd Position in BISE Hyderabad, as well as our 4th position achiever and all successful candidates."
  },
  {
    id: "notice-bs-zoology-sindh-uni",
    title: "BS Zoology 4-Year Degree & AD Commerce Admission Form Verification",
    date: "Academic Year 2026–2027",
    category: "Admissions",
    urgent: false,
    summary: "Degree admissions schedule in affiliation with University of Sindh Jamshoro.",
    details: "Candidates applying for BS Zoology (4-Year) or Associate Degree Programs (AD Commerce, AD Science, AD Arts) affiliated with University of Sindh Jamshoro are requested to bring attested copies of marksheet, CNIC/B-Form, and domicile to the College Admission Desk between 8:30 AM and 1:30 PM."
  },
  {
    id: "notice-library-computer-labs",
    title: "Upgradation of High-Speed Computer Lab and Digital Library Access",
    date: "Campus Facilities",
    category: "Campus",
    urgent: false,
    summary: "New workstations and high-speed internet installed for Computer Science students.",
    details: "To support our high-achieving Computer Science and General Science departments, additional multimedia computing terminals and e-library access have been commissioned."
  }
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "photo-campus-gate",
    src: "/assets/aistudio/campus_86930cb8.jpg",
    title: "Historic Campus Entrance",
    category: "campus",
    caption: "The majestic arched gateway of Government Girls Zubaida College Hyderabad, welcoming students since 1953.",
    highlight: true
  },
  {
    id: "photo-board-banner",
    src: "/assets/aistudio/817460125_1493703939446649_9144013667062097966_n_92b09ca6.jpg",
    title: "Outstanding Board Results Celebration",
    category: "honors",
    caption: "Felicitation banner honouring 2nd & 4th Board positions and zero failures in HSC Part-II Computer Science Group.",
    highlight: true
  },
  {
    id: "photo-position-gazette",
    src: "/assets/aistudio/815703728_1493032862847090_3032195106224050107_n_6a280dce.jpg",
    title: "BISE Hyderabad Official Position Holders",
    category: "honors",
    caption: "Official Gazette confirmation of Maryam Bibi securing 2nd Position (916 marks) for Govt Girls College Hyd (Zubaida).",
    highlight: true
  },
  {
    id: "photo-principal",
    src: "/assets/aistudio/principal-photo_e6a19362.jpg",
    title: "Principal Prof. Yasmeen Panhwar Address",
    category: "faculty",
    caption: "Principal addressing the faculty and student assembly on academic distinction and Islamic values.",
    highlight: true
  },
  {
    id: "photo-emblem",
    src: "/assets/aistudio/college-logo_075efbff.jpg",
    title: "Official College Crest",
    category: "campus",
    caption: "The revered emblem of Govt Girls Zubaida College bearing the timeless motto: SERVICE ABOVE SELF (ESTD 1954).",
    highlight: false
  },
  {
    id: "photo-location-qr",
    src: "/assets/aistudio/college-location-qr_602c0c79.png",
    title: "Campus Location QR Code",
    category: "campus",
    caption: "Official GPS navigation QR code for visitors and prospective students traveling to our campus opposite Hyderabad Central Jail in Pathan Colony, Hirabad, Hyderabad.",
    highlight: false
  }
];

export const TIMELINE_EVENTS = [
  {
    year: "1953–1954",
    title: "Founding of the College",
    desc: "Established during a time when higher education opportunities for girls in Hyderabad were exceedingly rare. Founded to empower women with knowledge and moral leadership under the motto 'SERVICE ABOVE SELF'."
  },
  {
    year: "1960s–1980s",
    title: "Golden Expansion Era",
    desc: "Expanded into comprehensive Intermediate science, pre-medical, and arts faculties. Hundreds of alumni moved on to become prominent physicians, professors, and civil servants."
  },
  {
    year: "2000s–2010s",
    title: "Modern Computer Science & Sciences",
    desc: "State-of-the-art computer science laboratories and specialized physics, chemistry, and biology labs were instituted to prepare girls for the modern digital economy."
  },
  {
    year: "Present Day",
    title: "Provincial Distinction & Degree Excellence",
    desc: "Offering 4-Year BS Zoology and Associate Degree programs (AD Commerce, AD Science, AD Arts) and bagging top positions (2nd & 4th in BISE Hyderabad Board) while providing free admissions through SECCAP."
  }
];

export const FAQS = [
  {
    question: "How do I apply for Intermediate (Class XI) admission at Zubaida College?",
    answer: "Admissions to Class XI (First Year) are processed centrally online through the Sindh Electronic Centralized College Admission Program (SECCAP) at seccap.dgcs.gos.pk. Candidates enter their Class IX / Matric roll number and B-Form to submit their choices. Our college code is selected during application."
  },
  {
    question: "Is there an admission fee for Intermediate students?",
    answer: "As per the policy of the College Education Department, Government of Sindh, public colleges provide free admission for eligible students admitted through the SECCAP merit process."
  },
  {
    question: "What intermediate study streams are available at Zubaida College?",
    answer: "We offer 5 intermediate groups: Pre-Medical, Pre-Engineering, General Science (Computer Science), Commerce (I.Com), and Humanities / Arts (FA)."
  },
  {
    question: "Does the college offer 4-year BS Degree and Associate Degree programs?",
    answer: "Yes, Government Girls Zubaida College offers a 4-Year BS Zoology degree program affiliated with the University of Sindh, Jamshoro, along with 2-Year Associate Degree programs in Commerce (AD Commerce / ADC), Science (AD Science / ADS), and Arts (AD Arts / ADA)."
  },
  {
    question: "What are the college timings and office visiting hours?",
    answer: "The college operates Monday through Saturday from 8:00 AM to 2:00 PM (Pakistan Standard Time). The college remains closed on Sundays and officially declared public holidays."
  },
  {
    question: "Where is the college campus located in Hyderabad?",
    answer: "The college is located opposite the Hyderabad Central Jail in Pathan Colony, Hirabad, Hyderabad, Sindh, Pakistan. You can easily find us on Google Maps or scan the official QR code available in the 'Find Us' section of this portal."
  }
];
