export interface CollegeEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  displayDate: string;
  time: string;
  category: 'academic' | 'holiday' | 'cultural' | 'sports';
  categoryLabel: string;
  venue: string;
  organizer: string;
  summary: string;
  details: string;
  targetAudience: string;
  featured?: boolean;
}

export const COLLEGE_EVENTS: CollegeEvent[] = [
  {
    id: "seerat-naat-2026",
    title: "Annual Seerat-un-Nabi (PBUH) Conference & Naat Competition",
    date: "2026-11-24",
    displayDate: "November 24, 2026",
    time: "9:30 AM – 1:00 PM",
    category: "cultural",
    categoryLabel: "Cultural & Spiritual",
    venue: "College Main Auditorium",
    organizer: "Islamic Studies & Literary Society",
    summary: "Annual inter-class recitation of Hamd, Naat-e-Rasool-e-Maqbool (PBUH), and inspirational lectures by faculty and distinguished scholars on the life of the Holy Prophet.",
    details: "All enrolled students from Intermediate (Science, Arts, Commerce), BS Zoology, and Associate Degree Programs (AD Commerce, AD Science, AD Arts) are eligible to participate. Trophies and certificates of merit will be awarded by Principal Prof. Yasmeen Panhwar to the top three positions in both Urdu and Sindhi Naat categories.",
    targetAudience: "All Students, Faculty & Parents",
    featured: true
  },
  {
    id: "sindh-culture-day",
    title: "Sindh Cultural Heritage & Unity Day Celebration",
    date: "2026-12-06",
    displayDate: "December 06, 2026",
    time: "9:00 AM – 2:00 PM",
    category: "cultural",
    categoryLabel: "Cultural & Arts",
    venue: "Central Courtyard & Auditorium Stage",
    organizer: "Department of Sindhi Literature & Arts Council",
    summary: "A vibrant collegiate celebration honoring the centuries-old cultural heritage of Sindh with traditional Ajrak, Sindhi cap displays, folklore poetry recitations, and tableau performances.",
    details: "The day features student performances reflecting the poetry of Hazrat Shah Abdul Latif Bhittai and Sachal Sarmast, a handicraft exhibit showcasing traditional Rilli and pottery, and speeches on peaceful co-existence and the history of Hyderabad.",
    targetAudience: "Open to All Zubeidians",
    featured: true
  },
  {
    id: "bise-roll-number-slips",
    title: "BISE Hyderabad HSC Examination Form Submission & Slip Verification",
    date: "2026-12-15",
    displayDate: "December 15, 2026",
    time: "8:30 AM – 1:30 PM",
    category: "academic",
    categoryLabel: "Academic & Board",
    venue: "Student Affairs & Examination Branch (Room 12)",
    organizer: "College Examination Committee",
    summary: "Final deadline for HSC Part-I & Part-II students to submit annual examination enrolment verification and collect computerized roll number slips.",
    details: "Students must bring their college identity card, recent passport photographs with blue background, and previous marksheet copies for verification before endorsement by the Principal.",
    targetAudience: "Class XI & XII Students"
  },
  {
    id: "winter-vacations-2026",
    title: "Winter Vacations Notice (Government of Sindh)",
    date: "2026-12-22",
    displayDate: "December 22, 2026 – January 01, 2027",
    time: "College Closed",
    category: "holiday",
    categoryLabel: "Public Holiday",
    venue: "Campus-wide",
    organizer: "College Education Department, Government of Sindh",
    summary: "Official winter recess announced across all public colleges and universities in Sindh. College offices and academic sessions will resume on January 02, 2027.",
    details: "During the vacation period, students are encouraged to utilize the college Digital Library portal for winter assignment completion and past paper preparation. Emergency administrative inquiries will be monitored via email.",
    targetAudience: "Students & Staff"
  },
  {
    id: "annual-sports-week-2027",
    title: "Annual College Sports Week & Inter-Class Tournament",
    date: "2027-01-18",
    displayDate: "January 18 – 22, 2027",
    time: "9:00 AM – 1:30 PM",
    category: "sports",
    categoryLabel: "Sports & Athletics",
    venue: "College Sports Grounds & Badminton Arena",
    organizer: "Department of Physical Education & Sports Committee",
    summary: "A full week of competitive sports including badminton singles and doubles, table tennis championships, 100m sprint races, tug-of-war, and throwball matches.",
    details: "Classes will compete for the coveted Overall Sports Championship Shield. The opening ceremony will feature an athlete march-past and torch lighting, concluded with an awards ceremony presided over by regional sports dignitaries.",
    targetAudience: "All Registered Student Athletes & Teams",
    featured: true
  },
  {
    id: "it-science-exhibition",
    title: "All-Sindh Colleges Science & IT Exhibition 2027",
    date: "2027-02-10",
    displayDate: "February 10, 2027",
    time: "9:30 AM – 2:00 PM",
    category: "academic",
    categoryLabel: "Academic & Science",
    venue: "Computer Science Wing & Science Labs",
    organizer: "Faculty of Natural Sciences & IT Society",
    summary: "Showcasing student-built working robotics, automated software applications, chemical electrolysis experiments, and biological anatomical models.",
    details: "Special showcase spotlighting our 2nd & 4th Board Position holders in Computer Science. Visiting faculty from Mehran University (MUET) and Sindh University will evaluate projects and award research commendation medals.",
    targetAudience: "Students, Visiting Colleges & Parents"
  },
  {
    id: "pakistan-day-celebration",
    title: "Youm-e-Pakistan (Pakistan Resolution Day) & Flag Hoisting",
    date: "2027-03-23",
    displayDate: "March 23, 2027",
    time: "8:30 AM – 11:30 AM",
    category: "holiday",
    categoryLabel: "National Observance",
    venue: "Central Courtyard & Main Flag Post",
    organizer: "National Cadet Corps (NCC) & Student Council",
    summary: "Formal national flag hoisting, playing of the national anthem, and student declamation contest commemorating the historic Lahore Resolution of 1940.",
    details: "Principal Prof. Yasmeen Panhwar will hoist the national flag, followed by patriotic songs, speech contests on female leadership in the Pakistan Movement, and distribution of commemorative shields.",
    targetAudience: "All Students, Faculty & Alumni"
  },
  {
    id: "hsc-board-exams-2027",
    title: "Commencement of HSC Part-I & Part-II Annual Board Examinations",
    date: "2027-04-15",
    displayDate: "April 15 – May 10, 2027",
    time: "Morning (9:00 AM) & Evening (2:00 PM) Shifts",
    category: "academic",
    categoryLabel: "Board Examination",
    venue: "Designated Examination Centres · BISE Hyderabad",
    organizer: "Board of Intermediate & Secondary Education Hyderabad",
    summary: "Official start of the annual intermediate examinations for Pre-Medical, Pre-Engineering, Computer Science, Commerce, and Humanities candidates.",
    details: "Strict anti-cheating guidelines, electronic surveillance, and biometric check-ins will be in force across all examination centres. Students must be present 45 minutes prior to paper start with verified admit cards.",
    targetAudience: "Intermediate Candidates"
  }
];
