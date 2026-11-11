export interface FAQItem {
  id: string;
  category: 'admissions' | 'uniform' | 'documents' | 'campus';
  categoryLabel: string;
  question: string;
  answer: string;
  keyPoints?: string[];
  importantNotice?: string;
}

export const DETAILED_FAQS: FAQItem[] = [
  // ADMISSIONS
  {
    id: "faq-seccap-process",
    category: "admissions",
    categoryLabel: "Admissions & SECCAP",
    question: "How do I apply for Intermediate Class XI admission at Govt Girls Zubaida College?",
    answer: "Admissions to Class XI (First Year) across all groups (Pre-Medical, Pre-Engineering, Computer Science, Commerce, and Humanities) are conducted online through the Sindh Electronic Centralized College Admission Program (SECCAP).",
    keyPoints: [
      "Visit the official portal at seccap.dgcs.gos.pk.",
      "Click 'New Application' and enter your Class IX / SSC Roll Number and NADRA B-Form number.",
      "Select 'Govt Girls Zubaida College Hyderabad' as your primary college choice.",
      "Choose your preferred academic faculty stream (e.g. Computer Science, Pre-Medical).",
      "Print your submitted online application and wait for the official SECCAP placement merit list."
    ],
    importantNotice: "Admission into Class XI is granted purely on merit based on your Class IX/X board examination marks."
  },
  {
    id: "faq-admission-fee",
    category: "admissions",
    categoryLabel: "Admissions & SECCAP",
    question: "Is there any admission or monthly tuition fee for Intermediate students?",
    answer: "No. Under the educational directive of the College Education Department, Government of Sindh, admission to Intermediate Class XI and XII in public colleges is 100% free of tuition fees for eligible candidates admitted through the centralized SECCAP system.",
    keyPoints: [
      "Zero tuition fee for qualified students enrolled through SECCAP.",
      "Free textbook bank sets available through the College Central Library.",
      "Only nominal board examination registration fees payable directly to BISE Hyderabad as per board schedule."
    ]
  },
  {
    id: "faq-degree-admissions",
    category: "admissions",
    categoryLabel: "Admissions & University Programs",
    question: "What is the admission procedure for the 4-Year BS Zoology Degree Program?",
    answer: "Admissions to the 4-Year BS Zoology Undergraduate Degree Program are conducted under affiliation with the University of Sindh, Jamshoro.",
    keyPoints: [
      "Eligibility requires Intermediate (HSC) Pre-Medical or equivalent biological science stream with at least 45% marks.",
      "Admission forms are issued at the College Degree Admission Desk following the University of Sindh schedule.",
      "Curriculum covers animal diversity, cellular genetics, physiology, entomology, fisheries, and advanced biological laboratory training."
    ]
  },
  {
    id: "faq-ad-commerce-programs",
    category: "admissions",
    categoryLabel: "Admissions & University Programs",
    question: "What are the Associate Degree Programs (AD Commerce, AD Science, AD Arts)?",
    answer: "Zubaida College offers 2-Year Associate Degree Programs (ADP) affiliated with University of Sindh Jamshoro, including our popular Associate Degree in Commerce (AD Commerce / ADC).",
    keyPoints: [
      "AD Commerce (2 Years / 4 Semesters) provides comprehensive skills in Advanced Accounting, Auditing, Business Taxation, Costing, and Banking.",
      "Enables direct employment as junior accountants, audit assistants, tax associates, or lateral transition into 5th semester BS Commerce / BBA.",
      "AD Science (ADS) and AD Arts (ADA) pathways are also available for pre-medical/pre-engineering and humanities graduates."
    ]
  },

  // UNIFORM & DRESS CODE
  {
    id: "faq-uniform-daily",
    category: "uniform",
    categoryLabel: "Uniform & Dress Code",
    question: "What is the mandatory daily uniform for students at Govt Girls Zubaida College?",
    answer: "All enrolled students are required to wear the official college uniform from their very first day on campus. The prescribed uniform reflects simplicity, equality, discipline, and Islamic modesty.",
    keyPoints: [
      "Qameez: Simple, modest white cotton or lawn qameez with appropriate knee length and modest full or three-quarter sleeves.",
      "Shalwar: Plain white cotton shalwar (tight trousers, tights, or bell-bottom cuts are strictly prohibited).",
      "Dupatta / Scarf: Prescribed college white dupatta or white headscarf (chador/hijab) neatly pinned.",
      "College Badge: Official metal college crest pin worn on the left chest side.",
      "Footwear: Plain black or dark closed shoes or flat sandals. High heels and loud footwear are not permitted."
    ],
    importantNotice: "Every student must wear her college uniform whenever entering the campus, taking examinations, or visiting college administrative offices."
  },
  {
    id: "faq-uniform-winter",
    category: "uniform",
    categoryLabel: "Uniform & Dress Code",
    question: "What is the prescribed winter uniform and sweater regulation?",
    answer: "During winter months (November through February), students may supplement their white uniform with approved warm outerwear adhering to college decorum.",
    keyPoints: [
      "Sweater / Cardigan: Plain V-neck or front-buttoned sweater in black or dark emerald green.",
      "Blazer: Plain black or dark green single-breasted blazer.",
      "Shawl / Chador: Plain black, dark green, or plain white winter woolen shawl.",
      "Flashy multi-colored jackets, printed hoodies, or denim outerwear are not permitted on campus."
    ]
  },
  {
    id: "faq-uniform-id-card",
    category: "uniform",
    categoryLabel: "Uniform & Dress Code",
    question: "Is wearing the College Digital Identity Card mandatory with the uniform?",
    answer: "Yes. For student security and campus discipline, every student must wear her official College Student Identity Card (affixed with lanyard) around her neck at all times on campus premises and at examination centres.",
    keyPoints: [
      "Issued by the college administration upon completion of document verification.",
      "Required for entering through the main campus gate, issuing library books, and sitting in board examinations.",
      "Digital student ID card can also be generated through the SECCAP portal."
    ]
  },

  // DOCUMENTATION REQUIREMENTS
  {
    id: "faq-documents-intermediate",
    category: "documents",
    categoryLabel: "Documentation Checklist",
    question: "What documents must I bring for final admission verification after SECCAP selection?",
    answer: "Once your name appears on the official SECCAP placement list for Govt Girls Zubaida College, you must visit the College Admission Desk with the following original documents and photocopies.",
    keyPoints: [
      "Original Matriculation (SSC) Marks Certificate and Provisional Certificate plus 3 attested photocopies.",
      "Original School Leaving Certificate (SLC) / Character Certificate from your previous school.",
      "Candidate's NADRA B-Form or CNIC photocopy (bring original for on-the-spot verification).",
      "Father's or Legal Guardian's CNIC photocopy.",
      "4 recent passport-size photographs (light blue or white background, with name written on back).",
      "Printout of the online SECCAP Application Form and Placement Slip.",
      "Affidavit of Good Conduct and Attendance Undertaking signed by parent/guardian."
    ],
    importantNotice: "Original marksheets are inspected by the admission committee and returned immediately or kept securely as per Board registration rules."
  },
  {
    id: "faq-documents-migration",
    category: "documents",
    categoryLabel: "Documentation Checklist",
    question: "Do I need a Board Migration Certificate (NOC) if I passed Matric from outside BISE Hyderabad?",
    answer: "Yes. Candidates who completed their Matriculation (SSC) from any Board other than the Board of Intermediate & Secondary Education (BISE) Hyderabad (such as BISE Karachi, Sukkur, Mirpurkhas, Larkana, Federal Board, or Aga Khan Board) must provide an official Migration Certificate.",
    keyPoints: [
      "Obtain an official NOC / Migration Certificate from your parent secondary education board.",
      "Submit the original NOC to the Zubaida College Admission Office within 30 days of admission confirmation.",
      "Students who passed their Matriculation within BISE Hyderabad jurisdiction do not require an NOC."
    ]
  },
  {
    id: "faq-documents-attestation",
    category: "documents",
    categoryLabel: "Documentation Checklist",
    question: "Who can attest my application document photocopies?",
    answer: "All document photocopies (marksheets, CNIC, B-Form, certificates) must be attested by a gazetted government officer (Grade 17 or above), such as a government high school headmaster, college professor, or civil officer.",
    keyPoints: [
      "The attestation stamp must clearly show the officer's full name, designation, and official department seal.",
      "Keep at least 5 attested sets of all documents for future scholarship and board registration needs."
    ]
  },

  // CAMPUS LIFE & TIMINGS
  {
    id: "faq-campus-timings",
    category: "campus",
    categoryLabel: "Timings & Attendance",
    question: "What are the daily class timings and attendance requirements?",
    answer: "The college academic day commences promptly at 8:00 AM with the morning assembly, national anthem, and recitation. Classes conclude at 2:00 PM Monday through Saturday (with Friday concluding earlier for Jummah prayers).",
    keyPoints: [
      "College Gates open at 7:30 AM and close promptly at 8:15 AM for morning assembly.",
      "Minimum 75% attendance in theory lectures and science laboratory practicals is strictly mandatory to be eligible for BISE Hyderabad board examinations.",
      "Shortage of attendance leads to detention from board examination roll number slips as per government regulations."
    ]
  },
  {
    id: "faq-campus-safety",
    category: "campus",
    categoryLabel: "Campus Safety & Environment",
    question: "What safety, transport, and dignity measures are in place for female students?",
    answer: "Government Girls Zubaida College maintains an uncompromising commitment to female safety, dignity, and positive learning in the heart of Hyderabad.",
    keyPoints: [
      "Completely enclosed boundary walls with 24/7 security personnel and CCTV camera surveillance.",
      "Strict restriction on unauthorized male visitors during college operational hours.",
      "Dedicated college common room with female attendants, prayer area, and clean sanitized washrooms.",
      "Conveniently situated opposite Hyderabad Central Jail in Pathan Colony, Hirabad with frequent Suzuki, Qingqi rickshaws, and public transport routes connecting Latifabad, Qasimabad, and all parts of Hyderabad."
    ]
  }
];
