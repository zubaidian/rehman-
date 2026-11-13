import { COLLEGE_INFO } from './collegeData';

export type AchievementCategory =
  | 'Board & Academic'
  | 'Co-Curricular & Religious'
  | 'Science & Computing'
  | 'Sports & Leadership';

export interface StudentAchievementItem {
  id: string;
  studentName: string;
  fatherOrGuardian?: string;
  rollNumber?: string;
  program: string;
  achievementTitle: string;
  category: AchievementCategory;
  dateLabel: string;
  metric: string;
  details: string;
  image?: string;
  secondaryImage?: string;
  secondaryImageTitle?: string;
  source: 'official' | 'firestore';
}

export const FEATURED_STUDENT_ACHIEVEMENTS: StudentAchievementItem[] = [
  {
    id: 'ach-maryam-bibi',
    studentName: 'Maryam Bibi',
    fatherOrGuardian: 'Daughter of Muhammad Aslam',
    rollNumber: 'Roll No. 79256',
    program: 'HSC Part-II (Class XII) · Computer Science Group',
    achievementTitle: '2nd Position in BISE Hyderabad Board',
    category: 'Board & Academic',
    dateLabel: 'Annual Examination · 2026',
    metric: '916 / 1100 Marks',
    details:
      'Maryam Bibi (Roll No. 79256) represented 1080. Government Girls College Hyderabad (Zubaida) in the Higher Secondary Certificate (HSC Part-II) Annual Examination conducted by the Board of Intermediate & Secondary Education (BISE) Hyderabad, securing 2nd Position across the entire board in the Computer Science Group with 916 out of 1100 marks.',
    image: COLLEGE_INFO.images.boardResultsFlyer,
    secondaryImage: COLLEGE_INFO.images.boardResultsOfficial,
    secondaryImageTitle: 'BISE Hyderabad Official Position Holders Gazette Sheet',
    source: 'official',
  },
  {
    id: 'ach-maheen-khan',
    studentName: 'Maheen Khan',
    program: 'Class XI · Computer Science',
    achievementTitle: '1st Position in Naat — District Level Hyderabad',
    category: 'Co-Curricular & Religious',
    dateLabel: '1 September 2026',
    metric: '1st Position · District Level',
    details:
      'Maheen Khan, a dedicated student of Class XI Computer Science at Government Girls Zubaida College, Hyderabad, won 1st Position in the Naat recitation competition at the Hyderabad District Level on 1 September 2026, bringing pride to the college faculty and student body.',
    source: 'official',
  },
];
