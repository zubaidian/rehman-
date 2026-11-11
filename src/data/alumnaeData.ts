export interface AlumnaProfile {
  id: string;
  name: string;
  batchYear: string;
  stream: string;
  role: string;
  organization: string;
  category: 'Medicine' | 'Technology' | 'Civil Services' | 'Academia' | 'Research' | 'Law';
  achievementBadge: string;
  quote: string;
  story: string;
  adviceToStudents: string;
  keyCareerHighlights: string[];
}

export const ALUMNAE_PROFILES: AlumnaProfile[] = [
  {
    id: "dr-farzana-baloch",
    name: "Dr. Farzana Baloch",
    batchYear: "Class of 1994",
    stream: "HSC Pre-Medical",
    role: "Head of Pediatric Cardiology & Associate Professor",
    organization: "Liaquat University of Medical & Health Sciences (LUMHS), Jamshoro",
    category: "Medicine",
    achievementBadge: "FCPS · Pediatric Cardiology Specialist",
    quote: "Zubaida College taught me that a daughter of Sindh can reach any height when backed by knowledge and grounded in moral values. 'Service Above Self' has been my operating compass in the pediatric ICU for over twenty years.",
    story: "After securing top marks in her Intermediate Pre-Medical exams at Zubaida College, Dr. Farzana earned her MBBS and FCPS qualifications. Today, she leads one of Sindh's premier pediatric cardiology units, performing life-saving interventions for thousands of children annually.",
    adviceToStudents: "Never let self-doubt dim your ambitions. Study with deep curiosity rather than rote memorization, and treat your education as a divine trust to uplift our communities.",
    keyCareerHighlights: [
      "Recipient of Provincial Excellence Award in Child Healthcare",
      "Over 40 published clinical research papers in international medical journals",
      "Mentored more than 150 female medical students through house job residencies"
    ]
  },
  {
    id: "engr-sadia-abbasi",
    name: "Engr. Sadia Abbasi",
    batchYear: "Class of 2012",
    stream: "HSC Computer Science",
    role: "Principal Cloud Solutions Architect",
    organization: "Global Cloud & AI Infrastructure Solutions",
    category: "Technology",
    achievementBadge: "Gold Medalist · Mehran UET Software Alumna",
    quote: "Our computer lab at Zubaida College was where I compiled my very first C++ program. That classroom sparked a career that now designs distributed cloud systems handling millions of transactions every second.",
    story: "Following her outstanding performance in Intermediate Computer Science at Zubaida College, Sadia entered Mehran University of Engineering & Technology (MUET), graduating with a university Gold Medal in Software Engineering. She has worked across multinational enterprise tech firms in Karachi and abroad.",
    adviceToStudents: "Technology belongs to young women just as much as anyone else. Embrace coding, data, and problem solving early. The digital world has boundless room for your talent.",
    keyCareerHighlights: [
      "Keynote speaker at Women in Tech Pakistan conventions",
      "Architected national banking payment gateway infrastructure",
      "Founder of 'Code For Daughters' scholarship fund in Hyderabad"
    ]
  },
  {
    id: "shazia-qazi-pas",
    name: "Shazia Qazi",
    batchYear: "Class of 2005",
    stream: "HSC Humanities & English",
    role: "Additional Secretary (Planning & Development)",
    organization: "Government of Sindh Civil Secretariat",
    category: "Civil Services",
    achievementBadge: "CSS / PMS Officer · Public Administration",
    quote: "The debates and literary societies at Zubaida College gave me my voice. Public service demands both sharp analytical intellect and deep empathy — values our professors instilled in us every single day.",
    story: "A brilliant humanities student, Shazia excelled in the Central Superior Services (CSS) examination and joined the provincial administrative service. She has spearheaded landmark educational reforms, maternal health initiatives, and public infrastructure projects across rural and urban Sindh.",
    adviceToStudents: "Read widely beyond textbooks. Understand the social and economic challenges of our province, and prepare yourself to lead from the front with integrity and dignity.",
    keyCareerHighlights: [
      "Led educational enrollment drives that returned 12,000 out-of-school girls to classrooms",
      "Distinguished service certificate from the Chief Secretary of Sindh",
      "Former Assistant Commissioner and Sub-Divisional Magistrate"
    ]
  },
  {
    id: "prof-dr-tahira-memon",
    name: "Prof. Dr. Tahira Memon",
    batchYear: "Class of 1986",
    stream: "HSC Pre-Engineering & Mathematics",
    role: "Dean of Natural Sciences & Senior Professor",
    organization: "University of Sindh, Jamshoro",
    category: "Academia",
    achievementBadge: "Ph.D. in Applied Mathematics · HEC Approved Supervisor",
    quote: "When I arrived at Zubaida College in 1984, few girls pursued advanced mathematics. My teachers believed in me before I knew how to believe in myself. That mentorship shaped my lifelong dedication to academic teaching.",
    story: "Prof. Dr. Tahira transitioned from Zubaida College to become one of the province's most respected mathematicians. She earned her doctorate, supervised dozens of M.Phil and Ph.D. scholars, and has served on national curriculum advisory boards.",
    adviceToStudents: "Consistency beats talent when talent forgets to be consistent. Do not fear difficult formulas or challenging subjects; persistence unlocks every scientific mystery.",
    keyCareerHighlights: [
      "Over 35 years of teaching at higher education institutions in Sindh",
      "Author of 3 textbooks on differential calculus and numerical analysis",
      "Supervised 18 doctoral and post-graduate dissertations"
    ]
  },
  {
    id: "dr-anila-shah",
    name: "Dr. Anila Shah",
    batchYear: "Class of 2008",
    stream: "HSC Pre-Medical",
    role: "Senior Scientist & Molecular Genetics Researcher",
    organization: "National Institute of Biotechnology & Genetic Engineering (NIBGE)",
    category: "Research",
    achievementBadge: "Post-Doc Fellow · Agricultural Biotechnology",
    quote: "Zubaida College was the launchpad where my fascination with botany and genetic traits turned into a serious research career. Our practical biology lab sessions laid the groundwork for my laboratory discipline.",
    story: "Dr. Anila pursued genetics following her stellar intermediate science coursework at Zubaida College. She conducted pioneering research into drought-resistant crop genomes, presenting her findings at international plant genetics summits in Turkey and Germany.",
    adviceToStudents: "Science requires patience and honest inquiry. Celebrate every small laboratory discovery, and remember that local Pakistani challenges need homegrown Pakistani scientific solutions.",
    keyCareerHighlights: [
      "Co-inventor on 2 patents for drought-resilient cotton seed variants",
      "Recipient of HEC International Postdoctoral Fellowship",
      "Regular reviewer for prestigious agricultural biotechnology journals"
    ]
  },
  {
    id: "adv-nida-soomro",
    name: "Advocate Nida Soomro",
    batchYear: "Class of 2015",
    stream: "Degree Program (Associate Degree / Arts)",
    role: "Advocate High Court & Legal Aid Director",
    organization: "Sindh High Court Bar Association",
    category: "Law",
    achievementBadge: "LL.M. Human Rights · Legal Rights Counselor",
    quote: "Zubaida College nurtured my courage to stand up for justice. The moral grounding and critical thinking fostered in our literature classes made me realize that law is a tool to protect the vulnerable.",
    story: "After completing her undergraduate studies at Zubaida College, Nida graduated with honors from law school, earning her LL.M. in Human Rights Law. She now represents women and underprivileged families pro bono in property, civil protection, and workplace rights cases across Sindh.",
    adviceToStudents: "Know your constitutional rights and never accept injustice as normal. With education and an ethical compass, you have the power to transform society.",
    keyCareerHighlights: [
      "Handled over 300 pro bono human rights and legal aid cases",
      "Elected Member of the Sindh High Court Legal Rights Committee",
      "Conducts free legal literacy workshops for young women across Hyderabad"
    ]
  }
];

export const ALUMNAE_IMPACT_METRICS = [
  { value: "70+", label: "Years of Alumni Legacy", sub: "Since founding in 1953" },
  { value: "5,000+", label: "Serving Medical Professionals", sub: "Doctors, specialists & nurses" },
  { value: "1,200+", label: "Educators & Professors", sub: "Teaching in colleges & universities" },
  { value: "100+", label: "Civil Servants & Judiciary", sub: "Officers across federal & Sindh depts" }
];
