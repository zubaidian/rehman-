import preMedicalPhoto from '../assets/images/syllabus_pre_medical_1794548286634.jpg';
import compMathPhoto from '../assets/images/syllabus_comp_math_1794548287014.jpg';
import commerceArtsPhoto from '../assets/images/syllabus_commerce_arts_1794548287828.jpg';
import bsZoologyPhoto from '../assets/images/syllabus_bs_zoology_clean_1794548303965.jpg';
import associateDegreePhoto from '../assets/images/syllabus_associate_degree_1794548288731.jpg';

export interface SyllabusLink {
  label: string;
  url: string;
}

export interface SyllabusBookItem {
  id: string;
  title: string;
  level: 'intermediate' | 'degree';
  levelLabel: string;
  authority: string;
  subjectsSummary: string;
  photo: string;
  primaryLink: SyllabusLink;
  secondaryLink?: SyllabusLink;
}

export const SYLLABUS_BOOKS: SyllabusBookItem[] = [
  {
    id: 'syllabus-hsc-pre-medical',
    title: 'HSC Pre-Medical Syllabus Books (XI & XII)',
    level: 'intermediate',
    levelLabel: 'Intermediate · Classes XI & XII',
    authority: 'Sindh Textbook Board & BISE Hyderabad',
    subjectsSummary: 'Biology XI–XII, Chemistry XI–XII, Physics XI–XII & Compulsory Subjects',
    photo: preMedicalPhoto,
    primaryLink: {
      label: 'STBB Official eBooks Portal',
      url: 'https://ebooks.stbb.edu.pk/'
    },
    secondaryLink: {
      label: 'BISE Hyderabad Portal',
      url: 'https://biseh.edu.pk/'
    }
  },
  {
    id: 'syllabus-hsc-cs-engineering',
    title: 'Pre-Engineering & Computer Science Syllabus (XI & XII)',
    level: 'intermediate',
    levelLabel: 'Intermediate · Classes XI & XII',
    authority: 'Sindh Textbook Board & BISE Hyderabad',
    subjectsSummary: 'Computer Science XI–XII, Mathematics XI–XII, Physics & Chemistry',
    photo: compMathPhoto,
    primaryLink: {
      label: 'STBB eBooks Directory',
      url: 'https://portal.stbb.edu.pk/ebooks'
    },
    secondaryLink: {
      label: 'BISE Hyderabad Portal',
      url: 'https://biseh.edu.pk/'
    }
  },
  {
    id: 'syllabus-hsc-commerce-arts',
    title: 'Commerce, Humanities & Compulsory Syllabus (XI & XII)',
    level: 'intermediate',
    levelLabel: 'Intermediate · Classes XI & XII',
    authority: 'Sindh Textbook Board & BISE Hyderabad',
    subjectsSummary: 'I.Com Principles, Humanities, English, Gulzar-e-Urdu, Sindhi & Islamiyat',
    photo: commerceArtsPhoto,
    primaryLink: {
      label: 'Sindh Textbook Board',
      url: 'https://stbb.edu.pk/'
    },
    secondaryLink: {
      label: 'BISE Hyderabad Portal',
      url: 'https://biseh.edu.pk/'
    }
  },
  {
    id: 'syllabus-bs-zoology',
    title: 'BS Zoology (4-Year Degree) Curriculum & Syllabus',
    level: 'degree',
    levelLabel: 'BS 4-Year · 8 Semesters',
    authority: 'University of Sindh & HEC Pakistan',
    subjectsSummary: 'Animal Diversity, Cell Biology, Genetics, Physiology, Ecology & Lab Courses',
    photo: bsZoologyPhoto,
    primaryLink: {
      label: 'HEC Revised Curricula',
      url: 'https://hec.gov.pk/english/services/universities/RevisedCurricula/Pages/default.aspx'
    },
    secondaryLink: {
      label: 'University of Sindh Portal',
      url: 'https://usindh.edu.pk/'
    }
  },
  {
    id: 'syllabus-associate-degree',
    title: 'Associate Degree Programs Syllabus (ADC, ADS, ADA & Physiology)',
    level: 'degree',
    levelLabel: 'Associate Degree · 2 Years',
    authority: 'University of Sindh Jamshoro & HEC',
    subjectsSummary: 'AD Commerce, AD Science, AD Arts & AD Physiology Course Schemes',
    photo: associateDegreePhoto,
    primaryLink: {
      label: 'University of Sindh Portal',
      url: 'https://usindh.edu.pk/'
    },
    secondaryLink: {
      label: 'HEC Curriculum Framework',
      url: 'https://hec.gov.pk/english/services/universities/RevisedCurricula/Pages/default.aspx'
    }
  }
];
