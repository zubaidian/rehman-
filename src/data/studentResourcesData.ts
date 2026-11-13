export type ResourceCategory =
  | 'Admission Forms'
  | 'Enrollment Slips'
  | 'Semester Registration Guides';

export interface StudentResourceDoc {
  id: string;
  code: string;
  title: string;
  category: ResourceCategory;
  audience: string;
  description: string;
  includedItems: string[];
  pdfUrl: string;
  fileName: string;
  fileSize: string;
  updatedLabel: string;
}

export const STUDENT_RESOURCES: StudentResourceDoc[] = [
  {
    id: 'hsc-admission-form',
    code: 'GGZC-ADM-HSC-2026',
    title: 'HSC Part-I & II Admission Form (SECCAP Follow-Up)',
    category: 'Admission Forms',
    audience: 'Pre-Medical · Pre-Engineering · Computer Science · Commerce · Humanities',
    description:
      'Printable admission application form required after SECCAP placement allocation for verification at Block A Administration Counter.',
    includedItems: [
      'Candidate & guardian particulars block',
      'Matriculation marks & stream selection checkboxes',
      'Mandatory SECCAP & attested documents checklist',
    ],
    pdfUrl: '/assets/pdfs/ggzc-hsc-admission-form.pdf',
    fileName: 'ggzc-hsc-admission-form.pdf',
    fileSize: '5 KB · PDF',
    updatedLabel: 'Session 2026–27',
  },
  {
    id: 'bs-degree-admission-form',
    code: 'GGZC-ADM-DEG-2026',
    title: 'BS 4-Year & Associate Degree (ADA / ADC / ADS) Admission Form',
    category: 'Admission Forms',
    audience: 'BS Zoology (4-Year) · ADA · ADC · ADS (University of Sindh)',
    description:
      'Official college degree-cell admission form for 4-Year BS Zoology and 2-Year Associate Degree programs affiliated with the University of Sindh.',
    includedItems: [
      'Degree stream & Intermediate qualification section',
      'University of Sindh merit & NOC enclosures checklist',
      'Admission Committee & Principal Office seal block',
    ],
    pdfUrl: '/assets/pdfs/ggzc-bs-degree-admission-form.pdf',
    fileName: 'ggzc-bs-degree-admission-form.pdf',
    fileSize: '5 KB · PDF',
    updatedLabel: 'Session 2026–27',
  },
  {
    id: 'bise-enrollment-slip',
    code: 'GGZC-ENR-BISE-2026',
    title: 'BISE Hyderabad Intermediate Enrollment Slip',
    category: 'Enrollment Slips',
    audience: 'Class XI & XII Students (BISE Hyderabad)',
    description:
      'Official enrollment verification proforma used to record elective subject combinations, challan numbers, and college roll numbers for BISE Hyderabad.',
    includedItems: [
      'Elective & compulsory subject confirmation table',
      'Board challan deposit & college roll number fields',
      'Class Advisor & Registrar counter verification lines',
    ],
    pdfUrl: '/assets/pdfs/ggzc-bise-enrollment-slip.pdf',
    fileName: 'ggzc-bise-enrollment-slip.pdf',
    fileSize: '5 KB · PDF',
    updatedLabel: 'Annual Exam Cycle',
  },
  {
    id: 'uos-enrollment-slip',
    code: 'GGZC-ENR-UOS-2026',
    title: 'University Semester Enrollment & Course Registration Slip',
    category: 'Enrollment Slips',
    audience: 'BS Zoology (Semesters I–VIII) & Associate Degree Candidates',
    description:
      'Semester-wise enrollment and credit-hour registration slip endorsed by the respective Head of Department before submission to the Degree Examination Cell.',
    includedItems: [
      'University enrollment ID & semester credit-hour grid',
      'Theory & practical laboratory course code table',
      '75% attendance & Library clearance checkboxes',
    ],
    pdfUrl: '/assets/pdfs/ggzc-uos-enrollment-slip.pdf',
    fileName: 'ggzc-uos-enrollment-slip.pdf',
    fileSize: '5 KB · PDF',
    updatedLabel: 'Semester 2026',
  },
  {
    id: 'semester-registration-guide',
    code: 'GGZC-GDE-REG-2026',
    title: 'Semester & Annual Registration Step-by-Step Guide',
    category: 'Semester Registration Guides',
    audience: 'All New & Continuing GGZC Scholars',
    description:
      'Complete four-step roadmap explaining SECCAP merit reporting, document attestation, bank fee challan submission, and semester course selection.',
    includedItems: [
      'SECCAP & College Admission Cell reporting workflow',
      'Gazetted attestation & white-BG photo guidelines',
      '75% attendance requirement & Book Bank instructions',
    ],
    pdfUrl: '/assets/pdfs/ggzc-semester-registration-guide.pdf',
    fileName: 'ggzc-semester-registration-guide.pdf',
    fileSize: '4 KB · PDF',
    updatedLabel: '2026 Handbook',
  },
  {
    id: 'student-registration-handbook',
    code: 'GGZC-GDE-HBK-2026',
    title: 'Student Orientation, Uniform & Library Card Guide',
    category: 'Semester Registration Guides',
    audience: 'Newly Enrolled Students & Parents',
    description:
      'Essential campus compliance handbook detailing official college uniform specifications, college timings, Reading Hall discipline, and Book Bank membership.',
    includedItems: [
      'Official green-dupatta & science lab coat uniform code',
      'College hours (8:00 AM – 2:00 PM PKT) & discipline policy',
      'Central Library card issuance & 14-day borrowing guide',
    ],
    pdfUrl: '/assets/pdfs/ggzc-student-registration-handbook.pdf',
    fileName: 'ggzc-student-registration-handbook.pdf',
    fileSize: '4 KB · PDF',
    updatedLabel: '2026 Edition',
  },
];
