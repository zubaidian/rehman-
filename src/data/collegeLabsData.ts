export type LabSlug =
  | 'computer-science'
  | 'physics'
  | 'chemistry'
  | 'zoology'
  | 'botany';

export interface CollegeLabInfo {
  id: LabSlug;
  name: string;
  location: string;
  programs: string;
  summary: string;
  equipment: string[];
  defaultPhotoTitle: string;
  defaultPhotoCaption: string;
}

export interface LabPhotoItem {
  id: string;
  labId: LabSlug;
  title: string;
  caption: string;
  imageUrl: string;
}

export const COLLEGE_LABS: CollegeLabInfo[] = [
  {
    id: 'computer-science',
    name: 'Computer Science Lab',
    location: 'Information Technology Complex · Ground Floor',
    programs: 'HSC Computer Science · General Science · Digital Skills',
    summary:
      'Equipped with modern desktop systems, high-speed fiber networking, smart projection screens, and continuous solar/UPS backup—supporting our BISE Hyderabad Board position achievers.',
    equipment: [
      'Modern desktop computing workstations & fiber-optic internet',
      'Curriculum environments for Python, Figma UI/UX, C++, and Databases',
      'Interactive multimedia projector & continuous solar/UPS power backup',
    ],
    defaultPhotoTitle: 'Computer Science & IT Lab',
    defaultPhotoCaption:
      'Desktop workstations, smart display screen, and coding environment for Python, Figma, and C++.',
  },
  {
    id: 'physics',
    name: 'Physics Lab',
    location: 'Science Wing · Block B1',
    programs: 'HSC Pre-Engineering · Pre-Medical · General Science',
    summary:
      'Hands-on experimental hall covering mechanics, optics, electricity, magnetism, and wave motion aligned with BISE Hyderabad practical examination standards.',
    equipment: [
      'Optical benches, prisms, spectrometers & spherometers',
      'Electrical bridge circuits, galvanometers & oscillation setups',
      'Vernier calipers, screw gauges & precision measurement apparatus',
    ],
    defaultPhotoTitle: 'Physics Practical Laboratory',
    defaultPhotoCaption:
      'Apparatus benches for optics, mechanics, electromagnetism, and board practical experiments.',
  },
  {
    id: 'chemistry',
    name: 'Chemistry Lab',
    location: 'Science Wing · Block B1',
    programs: 'HSC Pre-Medical · Pre-Engineering · Applied Sciences',
    summary:
      'Ventilated organic, inorganic, and volumetric analysis laboratory outfitted with individual gas/water taps, reagent shelves, and campus safety stations.',
    equipment: [
      'Volumetric titration burettes, pipettes & analytical digital balances',
      'Organized acid/base & salt analysis reagent cabinets',
      'Fume ventilation, safety goggles, eye-wash & fire extinguishers',
    ],
    defaultPhotoTitle: 'Chemistry Laboratory & Titration Benches',
    defaultPhotoCaption:
      'Individual practical workstations with titration glassware, reagents, and fume safety gear.',
  },
  {
    id: 'zoology',
    name: 'Zoology Lab',
    location: 'Life Sciences Wing · Block B2',
    programs: 'HSC Pre-Medical · BS 4-Year Zoology',
    summary:
      'Comprehensive biological laboratory and museum collection supporting comparative anatomy, microscopy, genetics, and undergraduate zoological research.',
    equipment: [
      'High-power compound & dissecting optical microscopes',
      'Preserved zoological specimen museum & osteology skeletal models',
      'Prepared histology slides & cellular biology demonstration kits',
    ],
    defaultPhotoTitle: 'Zoology Lab & Specimen Museum',
    defaultPhotoCaption:
      'Compound microscopy stations, anatomical models, and preserved zoological specimen shelves.',
  },
  {
    id: 'botany',
    name: 'Botany Lab',
    location: 'Life Sciences Wing · Block B2',
    programs: 'HSC Pre-Medical · BS Life Sciences',
    summary:
      'Dedicated plant sciences practical hall housing regional Sindh flora herbarium archives, botanical microscopy benches, and plant physiology equipment.',
    equipment: [
      'Preserved plant herbarium sheets & taxonomic specimen jars',
      'Optical microscopy stations for plant anatomy & mycology slides',
      'Seed germination, transpiration & photosynthesis apparatus',
    ],
    defaultPhotoTitle: 'Botany Lab & Herbarium Collection',
    defaultPhotoCaption:
      'Plant anatomy microscopy benches and preserved regional botanical specimen archives.',
  },
];
