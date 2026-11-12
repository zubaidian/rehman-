export interface AlumnaReferenceLink {
  label: string;
  url: string;
}

export interface AlumnaProfile {
  id: string;
  name: string;
  photo: string;
  photoFit: 'contain' | 'cover';
  documentedAttendance: string;
  stream: string;
  associationRole?: string;
  role: string;
  rolesList: string[];
  organization: string;
  category:
    | 'Public Service & Media'
    | 'Law Enforcement & Administration'
    | 'Academia & Literature'
    | 'Poetry & Human Rights';
  achievementBadge: string;
  summaryHighlight: string;
  story: string;
  legacyNote: string;
  keyCareerHighlights: string[];
  referenceLinks: AlumnaReferenceLink[];
}

export const ALUMNAE_PROFILES: AlumnaProfile[] = [
  {
    id: 'mahtab-akbar-rashdi',
    name: 'Mahtab Akbar Rashdi',
    photo: '/assets/alumnae/mahtab-akbar-rashdi-extracted.jpg',
    photoFit: 'cover',
    documentedAttendance: 'Her B.A. was from Zubeda Government Girls College, Hyderabad',
    stream: 'B.A. · Zubeda Government Girls College',
    associationRole: 'President, Zubeda College Alumnae Association',
    role: 'Educationist, Broadcaster, Senior Government Officer & Member of the National Assembly',
    rolesList: [
      'Educationist and professor',
      'Television presenter and media personality',
      'Senior government officer and former MPA',
      'Member of the National Assembly'
    ],
    organization: 'National Assembly of Pakistan · President, Zubeda College Alumnae',
    category: 'Public Service & Media',
    achievementBadge: 'Pride of Performance · MNA & President Zubeda College Alumnae',
    summaryHighlight:
      'College attendance documented: Her B.A. was from Zubeda Government Girls College, Hyderabad. Serves as President of the Zubeda College Alumnae Association alongside her distinguished national career.',
    story:
      'Mahtab Akbar Rashdi earned her Bachelor of Arts (B.A.) from Government Girls Zubaida College, Hyderabad, before completing her M.A. in Political Science and B.Ed. at the University of Sindh and pursuing a Fulbright Master’s degree at the University of Massachusetts. She served as Professor and Chairperson of International Relations at the University of Sindh and Director of the Institute of Sindhology, became a household name as a Pakistan Television (PTV) presenter and media personality, held senior administrative secretaryships across Government of Sindh departments (1988–2007), served as MPA Sindh (2013–2018), and serves as Member of the National Assembly.',
    legacyNote:
      'Conferred the President’s Pride of Performance in 2004 for outstanding contributions to education, broadcasting, literature, and public administration.',
    keyCareerHighlights: [
      'Her B.A. was from Zubeda Government Girls College, Hyderabad; Fulbright Scholar (UMass)',
      'President, Zubeda College Alumnae Association ("Together for a Stronger Tomorrow")',
      'Television presenter, media personality, university professor & senior Sindh government officer',
      'Former Member of the Provincial Assembly (MPA) and Member of the National Assembly (MNA)'
    ],
    referenceLinks: [
      {
        label: 'Official National Assembly Profile',
        url: 'https://na.gov.pk/en/profile.php?uid=1688'
      },
      {
        label: 'Biography & Achievements',
        url: 'https://en.wikipedia.org/wiki/Mahtab_Akbar_Rashdi'
      }
    ]
  },
  {
    id: 'anisa-memon',
    name: 'Anisa Memon',
    photo: '/assets/alumnae/anisa-memon-extracted.jpg',
    photoFit: 'cover',
    documentedAttendance: 'Alumna of Government Girls Zubaida College, Hyderabad',
    stream: 'Zubaida College Alumna · M.A. International Relations',
    role: 'Educationist, Cultural Leader, Literary Activist & Women’s Rights Advocate',
    rolesList: [
      'Educationist & Principal, AIM Institute Karachi',
      'Secretary, Siraj Institute of Sindh Studies (SISS)',
      'Secretary, Sindh Education Trust',
      'Former Resident Director, Pakistan National Center'
    ],
    organization: 'Siraj Institute of Sindh Studies · Sindh Education Trust',
    category: 'Academia & Literature',
    achievementBadge: 'Educationist, Cultural Leader & Literary Activist',
    summaryHighlight:
      'Born in Tando Jam (Hyderabad District) into a renowned Sindhi literary family, Anisa Memon is a distinguished educationist, cultural organizer, and women’s rights advocate.',
    story:
      'Born in May 1952 in Tando Jam, Hyderabad District, into a prominent literary family tied to celebrated Sindhi novelist and scholar Siraj-ul-Haq Memon, Anisa Memon is an accomplished alumna of Government Girls Zubaida College, Hyderabad, and holds a Master’s degree in International Relations. Over decades of public and academic leadership, she served as Principal of the AIM Institute in Karachi and Resident Director at the Pakistan National Center—where she organized landmark cultural initiatives including the International Sufi Conference in Karachi and the Revival of Indus Valley Civilization program with Pakistan International Airlines (PIA). She also serves as Secretary of the Sindh Education Trust and the Siraj Institute of Sindh Studies (SISS), actively championing Sindhi literature, Shah Abdul Latif Bhittai’s heritage, and women’s empowerment.',
    legacyNote:
      'Dedicated to preserving the cultural, literary, and educational heritage of Sindh while championing women’s education and regional literature.',
    keyCareerHighlights: [
      'Born in Tando Jam, Hyderabad District; holds a Master’s degree in International Relations',
      'Former Resident Director, Pakistan National Center & Principal, AIM Institute Karachi',
      'Organized the International Sufi Conference and Revival of Indus Valley Civilization initiatives',
      'Secretary, Sindh Education Trust & Siraj Institute of Sindh Studies (SISS); active women’s rights advocate'
    ],
    referenceLinks: [
      {
        label: 'Literary & Cultural Coverage',
        url: 'https://tribune.com.pk/'
      }
    ]
  },
  {
    id: 'suhai-aziz-talpur',
    name: 'Suhai Aziz Talpur',
    photo: '/assets/alumnae/suhai-aziz-talpur-extracted.jpg',
    photoFit: 'cover',
    documentedAttendance: 'Holds a B.Com from Zubaida Girls College, Hyderabad',
    stream: 'B.Com · Zubaida Girls College',
    associationRole: 'Member, Executive Committee, Zubeda College Alumnae',
    role: 'Senior Police Officer (SSP, Police Service of Pakistan)',
    rolesList: [
      'Senior police officer (SSP, Sindh Police)',
      'Holds a B.Com from Zubaida Girls College',
      'Law enforcement & protection of citizens’ rights',
      'Career closely connected to the administration of law'
    ],
    organization: 'Police Service of Pakistan (PSP) · Sindh Police',
    category: 'Law Enforcement & Administration',
    achievementBadge: 'Quaid-e-Azam Police Medal Nominee · First Female PSP Officer from Lower Sindh',
    summaryHighlight:
      'Confirmed alumna: Holds a B.Com from Zubaida Girls College. Although not a lawyer, her career as a senior police officer centers on law enforcement, public safety, the protection of citizens’ rights, and the administration of law.',
    story:
      'Suhai Aziz Talpur earned her Bachelor of Commerce (B.Com) degree from Government Girls Zubaida College, Hyderabad, before completing an M.A. in Economics from the University of Sindh and studying Chartered Accountancy. After qualifying through the Central Superior Services (CSS) examination, she joined the Police Service of Pakistan (PSP), becoming the first female PSP officer from lower Sindh and rising to Senior Superintendent of Police (SSP). She gained international acclaim for leading the courageous security response during the 2018 Karachi Chinese Consulate attack, becoming the first female officer nominated for the prestigious Quaid-e-Azam Police Medal (QPM).',
    legacyNote:
      'While not a practicing lawyer, her frontline leadership in policing, civic protection, and upholding constitutional order places her career at the heart of the administration of law and citizens’ rights in Pakistan.',
    keyCareerHighlights: [
      'Confirmed alumna: Earned her B.Com from Zubaida Girls College, Hyderabad',
      'Member, Executive Committee, Zubeda College Alumnae Association',
      'First female PSP officer from lower Sindh; Senior Superintendent of Police (SSP)',
      'First female officer nominated for the Quaid-e-Azam Police Medal (QPM) for exceptional bravery'
    ],
    referenceLinks: [
      {
        label: 'Biography & Achievements',
        url: 'https://en.wikipedia.org/wiki/Suhai_Aziz_Talpur'
      }
    ]
  },
  {
    id: 'dr-seher-imdad',
    name: 'Dr. Seher Imdad (Dr. Sahar Imdad Hussaini)',
    photo: '/assets/alumnae/dr-seher-imdad-extracted.jpg',
    photoFit: 'cover',
    documentedAttendance: 'Completed Intermediate and B.A. Part I at Zubaida Girls College',
    stream: 'Intermediate & B.A. Part I · Zubaida Girls College',
    associationRole: 'Member, Executive Committee, Zubeda College Alumnae',
    role: 'Poet, Writer, Educationist, Literary Critic & Scholar',
    rolesList: [
      'Poet and writer',
      'Educationist',
      'Literary critic and scholar'
    ],
    organization: 'Professor (Retd.), University of Sindh · Executive Committee, Zubeda College Alumnae',
    category: 'Academia & Literature',
    achievementBadge: 'Tamgha-e-Imtiaz · Executive Committee Zubeda College Alumnae',
    summaryHighlight:
      'College attendance documented: Completed Intermediate and B.A. Part I at Zubaida Girls College before earning national renown as a poet, writer, educationist, and literary critic.',
    story:
      'Dr. Seher Imdad (Dr. Sahar Imdad Hussaini) completed her Intermediate and B.A. Part I at Government Girls Zubaida College, Hyderabad. She earned her Ph.D. from the University of Sindh, Jamshoro, where she served as a professor for over 35 years (1976–2012) and later taught as Associate Professor at Habib University, Karachi. Alongside her academic career and broadcasting contributions on PTV and Radio Pakistan Hyderabad, she has authored around ten acclaimed books spanning Sindhi and Urdu poetry, literary criticism, and scholarly translation.',
    legacyNote:
      'Awarded Pakistan’s prestigious Tamgha-e-Imtiaz in 2009 in recognition of her lifelong literary, scholarly, and educational service.',
    keyCareerHighlights: [
      'Completed Intermediate and B.A. Part I at Zubaida Girls College, Hyderabad',
      'Member, Executive Committee, Zubeda College Alumnae Association',
      'Over 35 years of university teaching at University of Sindh and Habib University, Karachi',
      'Author of ~10 books of poetry, literary criticism, and research; recipient of Tamgha-e-Imtiaz (2009)'
    ],
    referenceLinks: [
      {
        label: 'Biography & Literary Profile',
        url: 'https://www.karachiliteraturefestival.com/speakers/sahar-imdad/'
      }
    ]
  },
  {
    id: 'fahmida-riaz',
    name: 'Fahmida Riaz',
    photo: '/assets/alumnae/fahmida-riaz-clean.jpg',
    photoFit: 'cover',
    documentedAttendance: 'Graduated from Government Girls Zubaida College, Hyderabad',
    stream: 'Undergraduate · Zubaida Government Girls College',
    role: 'Renowned Urdu Poetess, Progressive Writer & Human Rights Activist',
    rolesList: [
      'Celebrated progressive Urdu poetess & author',
      'Novelist, essayist & literary translator',
      'Human rights & women’s empowerment advocate'
    ],
    organization: 'Eminent South Asian Poetess · Former Managing Director, National Book Foundation',
    category: 'Poetry & Human Rights',
    achievementBadge: 'Sitara-e-Imtiaz & Pride of Performance · Literary Icon',
    summaryHighlight:
      'College attendance documented: Attended and graduated from Government Girls Zubaida College, Hyderabad in the early 1960s, where her earliest poetry and student leadership emerged.',
    story:
      'Fahmida Riaz (1946–2018) spent her formative academic years in Hyderabad and graduated from Government Girls Zubaida College, Hyderabad in the early 1960s. During her time at Zubaida College, she participated actively in the student union and began publishing poetry in respected literary journals such as Funun before pursuing postgraduate studies at the University of Sindh. Going on to become one of South Asia’s most influential progressive writers, she authored over 15 books including Badan Dareeda, Godaavari, Khatt-e Marmuz, and Khana-e-Aab-o-Gil, as well as the first rhymed Urdu translation of Rumi’s Masnavi.',
    legacyNote:
      'Honored with Pakistan’s Pride of Performance and Sitara-e-Imtiaz, Fahmida Riaz left an indelible mark on Urdu literature and women’s rights across South Asia.',
    keyCareerHighlights: [
      'Attended and graduated from Government Girls Zubaida College, Hyderabad (early 1960s)',
      'Published landmark collections of poetry, fiction, and social essays across five decades',
      'Completed the first rhymed Urdu translation of Jalaluddin Rumi’s Masnavi from Persian',
      'Recipient of Sitara-e-Imtiaz, Pride of Performance, and Hemmett-Hellman Human Rights Award'
    ],
    referenceLinks: [
      {
        label: 'Biography & Literary Works',
        url: 'https://en.wikipedia.org/wiki/Fahmida_Riaz'
      }
    ]
  }
];

export const ALUMNAE_IMPACT_METRICS = [
  { value: '70+', label: 'Years of Alumni Legacy', sub: 'Since founding in 1953' },
  { value: '5,000+', label: 'Serving Medical Professionals', sub: 'Doctors, specialists & nurses' },
  { value: '1,200+', label: 'Educators & Professors', sub: 'Teaching in colleges & universities' },
  { value: '100+', label: 'Civil Servants & Judiciary', sub: 'Officers across federal & Sindh depts' }
];
