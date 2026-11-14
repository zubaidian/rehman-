import { lazy, Suspense, useState } from 'react';
import { TopUtilityBar } from './components/TopUtilityBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FloatingCallWidget } from './components/FloatingCallWidget';
import { FirebaseProvider } from './contexts/FirebaseContext';

const BoardHonorsSection = lazy(() =>
  import('./components/BoardHonorsSection').then((m) => ({ default: m.BoardHonorsSection }))
);
const StudentAchievementsSection = lazy(() =>
  import('./components/StudentAchievementsSection').then((m) => ({
    default: m.StudentAchievementsSection,
  }))
);
const NoticesSection = lazy(() =>
  import('./components/NoticesSection').then((m) => ({ default: m.NoticesSection }))
);
const FacebookEventsTracker = lazy(() =>
  import('./components/FacebookEventsTracker').then((m) => ({
    default: m.FacebookEventsTracker,
  }))
);
const AboutAndHistory = lazy(() =>
  import('./components/AboutAndHistory').then((m) => ({ default: m.AboutAndHistory }))
);
const PrincipalSection = lazy(() =>
  import('./components/PrincipalSection').then((m) => ({ default: m.PrincipalSection }))
);
const AcademicsSection = lazy(() =>
  import('./components/AcademicsSection').then((m) => ({ default: m.AcademicsSection }))
);
const DepartmentsSection = lazy(() =>
  import('./components/DepartmentsSection').then((m) => ({ default: m.DepartmentsSection }))
);
const VirtualCampusTour = lazy(() =>
  import('./components/VirtualCampusTour').then((m) => ({ default: m.VirtualCampusTour }))
);
const CollegeLibrarySection = lazy(() =>
  import('./components/CollegeLibrarySection').then((m) => ({
    default: m.CollegeLibrarySection,
  }))
);
const CollegeLabsSection = lazy(() =>
  import('./components/CollegeLabsSection').then((m) => ({ default: m.CollegeLabsSection }))
);
const DigitalLibrarySection = lazy(() =>
  import('./components/DigitalLibrarySection').then((m) => ({
    default: m.DigitalLibrarySection,
  }))
);
const AlumnaeSection = lazy(() =>
  import('./components/AlumnaeSection').then((m) => ({ default: m.AlumnaeSection }))
);
const AdmissionsSection = lazy(() =>
  import('./components/AdmissionsSection').then((m) => ({ default: m.AdmissionsSection }))
);
const StudentResourcesSection = lazy(() =>
  import('./components/StudentResourcesSection').then((m) => ({
    default: m.StudentResourcesSection,
  }))
);
const CemisAttendanceSection = lazy(() =>
  import('./components/CemisAttendanceSection').then((m) => ({
    default: m.CemisAttendanceSection,
  }))
);
const GallerySection = lazy(() =>
  import('./components/GallerySection').then((m) => ({ default: m.GallerySection }))
);
const FacebookCommunitySection = lazy(() =>
  import('./components/FacebookCommunitySection').then((m) => ({
    default: m.FacebookCommunitySection,
  }))
);
const ContactAndLocation = lazy(() =>
  import('./components/ContactAndLocation').then((m) => ({ default: m.ContactAndLocation }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);
const EnquiryModal = lazy(() =>
  import('./components/EnquiryModal').then((m) => ({ default: m.EnquiryModal }))
);
const AdminInboxModal = lazy(() =>
  import('./components/AdminInboxModal').then((m) => ({ default: m.AdminInboxModal }))
);

function SectionPlaceholder({ id }: { id: string }) {
  return <section id={id} className="min-h-[160px]" aria-hidden="true" />;
}

export default function App() {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <FirebaseProvider>
      <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-emerald-950">
        {/* Top Utility Bar with Live PKT Time & Office Status */}
        <TopUtilityBar />

        {/* Main Navigation Bar */}
        <Navbar onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />

        {/* Quick Floating Call Helpline Widget */}
        <FloatingCallWidget />

        {/* Main Page Sections */}
        <main className="flex-1">
          {/* Hero Section (Eager Above-the-Fold) */}
          <Hero onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />

          {/* Board Examination Honors & Top Positions Spotlight */}
          <Suspense fallback={<SectionPlaceholder id="board-results" />}>
            <BoardHonorsSection />
          </Suspense>

          {/* Student Achievements & Roll of Honor */}
          <Suspense fallback={<SectionPlaceholder id="student-achievements" />}>
            <StudentAchievementsSection />
          </Suspense>

          {/* Official News & Announcements Board */}
          <Suspense fallback={<SectionPlaceholder id="notices" />}>
            <NoticesSection />
          </Suspense>

          {/* Facebook 2026 Live College Events Scrolling Window Tracker */}
          <Suspense fallback={<SectionPlaceholder id="events" />}>
            <FacebookEventsTracker />
          </Suspense>

          {/* 70-Year History, Legacy & Core Pillars */}
          <Suspense fallback={<SectionPlaceholder id="about" />}>
            <AboutAndHistory />
          </Suspense>

          {/* Principal's Desk: Prof. Yasmeen Panhwar */}
          <Suspense fallback={<SectionPlaceholder id="principal" />}>
            <PrincipalSection />
          </Suspense>

          {/* Academic Faculties & Programs Explorer */}
          <Suspense fallback={<SectionPlaceholder id="academics" />}>
            <AcademicsSection />
          </Suspense>

          {/* Academic Departments, Laboratories & Subject Chairs */}
          <Suspense fallback={<SectionPlaceholder id="departments" />}>
            <DepartmentsSection onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />
          </Suspense>

          {/* Interactive Virtual Campus Tour */}
          <Suspense fallback={<SectionPlaceholder id="campus-tour" />}>
            <VirtualCampusTour />
          </Suspense>

          {/* Central College Library: Photos, Collections & Membership Rules */}
          <Suspense fallback={<SectionPlaceholder id="college-library" />}>
            <CollegeLibrarySection />
          </Suspense>

          {/* College Laboratories: Computer Science, Physics, Chemistry, Zoology & Botany */}
          <Suspense fallback={<SectionPlaceholder id="college-labs" />}>
            <CollegeLabsSection />
          </Suspense>

          {/* Digital Library: Syllabus Book Photos & Internet Links */}
          <Suspense fallback={<SectionPlaceholder id="digital-library" />}>
            <DigitalLibrarySection />
          </Suspense>

          {/* Alumnae Success Stories */}
          <Suspense fallback={<SectionPlaceholder id="alumnae" />}>
            <AlumnaeSection />
          </Suspense>

          {/* SECCAP Centralized Admissions Guide */}
          <Suspense fallback={<SectionPlaceholder id="admissions" />}>
            <AdmissionsSection />
          </Suspense>

          {/* Student Resources: Downloadable Forms, Enrollment Slips & Registration Guides */}
          <Suspense fallback={<SectionPlaceholder id="student-resources" />}>
            <StudentResourcesSection />
          </Suspense>

          {/* CEMIS Biometric Attendance & Faculty Portal (Sindh College Education Dept) */}
          <Suspense fallback={<SectionPlaceholder id="cemis-attendance" />}>
            <CemisAttendanceSection />
          </Suspense>

          {/* Campus Gallery & Archives */}
          <Suspense fallback={<SectionPlaceholder id="gallery" />}>
            <GallerySection />
          </Suspense>

          {/* Official Facebook Community Updates */}
          <Suspense fallback={<SectionPlaceholder id="facebook-community" />}>
            <FacebookCommunitySection />
          </Suspense>

          {/* Location, Google Map, QR Code, Working Contact Form & FAQs */}
          <Suspense fallback={<SectionPlaceholder id="contact" />}>
            <ContactAndLocation />
          </Suspense>
        </main>

        {/* Institutional Footer */}
        <Suspense fallback={<div className="min-h-[160px] bg-[#021914]" />}>
          <Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />
        </Suspense>

        {/* Lazy-loaded Modals (only downloaded when opened) */}
        {isEnquiryModalOpen && (
          <Suspense fallback={null}>
            <EnquiryModal
              isOpen={isEnquiryModalOpen}
              onClose={() => setIsEnquiryModalOpen(false)}
            />
          </Suspense>
        )}

        {isAdminModalOpen && (
          <Suspense fallback={null}>
            <AdminInboxModal
              isOpen={isAdminModalOpen}
              onClose={() => setIsAdminModalOpen(false)}
            />
          </Suspense>
        )}
      </div>
    </FirebaseProvider>
  );
}
