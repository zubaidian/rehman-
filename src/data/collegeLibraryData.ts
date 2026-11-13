export interface LibraryWingInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface LibraryPhotoItem {
  id: string;
  title: string;
  category: 'reading-hall' | 'book-stacks' | 'book-bank' | 'reference-wing';
  caption: string;
  imageUrl?: string;
}

export const COLLEGE_LIBRARY_INFO = {
  heading: 'College Library & Reading Wing',
  subheading:
    'Established alongside the college in 1953, the Zubaida College Library is an intellectual sanctuary housing over 15,000 volumes, quiet study carrels, academic journals, and a Free Government Book Bank.',
  location: 'Academic Block A · 1st Floor North Wing',
  timings: 'Monday – Saturday · 8:00 AM – 2:00 PM (PKT)',
  stats: [
    { label: 'Total Collection', value: '15,000+ Volumes' },
    { label: 'Reading Hall Capacity', value: '120 Study Seats' },
    { label: 'Student Support', value: 'Free Book Bank' },
    { label: 'Languages', value: 'English · Urdu · Sindhi' },
  ],
  wings: [
    {
      id: 'literary-archives',
      title: 'English, Urdu & Sindhi Literature Archives',
      subtitle: 'Regional Heritage & Classical Collections',
      description:
        'Comprehensive holdings spanning English prose and poetry, classical Urdu literary criticism, and rich Sindhi scholarship including Shah Abdul Latif Bhittai studies and Sindh historical chronicles.',
      highlights: [
        'Bilingual dictionaries, encyclopedias, and literary journals',
        'Complete Intermediate & Associate Arts humanities reference shelf',
      ],
    },
    {
      id: 'science-reference',
      title: 'Science, Computing & BS Research Wing',
      subtitle: 'Pre-Medical, Pre-Engineering, CS & BS Zoology',
      description:
        'Dedicated academic textbooks and practical reference guides supporting HSC science groups alongside 4-Year BS Zoology, Botany, Chemistry, Physics, Mathematics, and Computer Science.',
      highlights: [
        'University-level biology, taxonomy, physiology & lab manuals',
        'Modern programming, database, and quantitative problem guides',
      ],
    },
    {
      id: 'commerce-social',
      title: 'Commerce, Economics & Humanities Section',
      subtitle: 'I.Com, B.Com & Social Sciences',
      description:
        'Curated resources in principles of accounting, banking, business mathematics, macroeconomics, Islamic studies, Pakistan history, and constitutional civics.',
      highlights: [
        'Sindh Board and University of Sindh commerce syllabi',
        'Current affairs digests and national economic periodicals',
      ],
    },
    {
      id: 'book-bank-archives',
      title: 'Government Book Bank & Past Paper Archive',
      subtitle: 'Textbook Lending & Exam Preparation',
      description:
        'Operated to ensure every deserving scholar has full access to course textbooks without financial barriers, paired with a curated 10-year archive of BISE Hyderabad and university past papers.',
      highlights: [
        'Free annual textbook sets issued to eligible students',
        'Model question papers and board practical guides',
      ],
    },
  ] as LibraryWingInfo[],
  guidelines: [
    'Students must carry their valid College ID and Library Membership Card to borrow books or use reference desks.',
    'Up to 2 textbooks may be borrowed for a 14-day period and renewed once at the Librarian’s Issue Desk.',
    'Complete silence and mobile-free discipline must be maintained inside the 120-seat Reading Hall.',
    'Government Book Bank sets issued for the academic session must be returned in good condition after final examinations.',
  ],
};

export const DEFAULT_LIBRARY_PHOTO_SLOTS: LibraryPhotoItem[] = [
  {
    id: 'lib-reading-hall',
    title: 'Main Reading Hall & Study Desks',
    category: 'reading-hall',
    caption: 'Quiet, naturally lit study space accommodating 120 students for focused reading and exam preparation.',
  },
  {
    id: 'lib-book-stacks',
    title: 'Central Book Stacks & Dewey Catalog',
    category: 'book-stacks',
    caption: 'Over 15,000 organized volumes across Sciences, Literature, History, Commerce, and Computing.',
  },
  {
    id: 'lib-book-bank',
    title: 'Librarian Issue Desk & Book Bank',
    category: 'book-bank',
    caption: 'Dedicated lending counter issuing library cards, BISE past papers, and free Book Bank sets.',
  },
  {
    id: 'lib-reference-wing',
    title: 'BS & Science Reference Corner',
    category: 'reference-wing',
    caption: 'Specialized reference encyclopedias, zoological manuals, and scientific periodicals.',
  },
];
