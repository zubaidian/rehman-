import { useState } from 'react';
import { TopUtilityBar } from './components/TopUtilityBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BoardHonorsSection } from './components/BoardHonorsSection';
import { StudentAchievementsSection } from './components/StudentAchievementsSection';
import { NoticesSection } from './components/NoticesSection';
import { FacebookEventsTracker } from './components/FacebookEventsTracker';
import { AboutAndHistory } from './components/AboutAndHistory';
import { PrincipalSection } from './components/PrincipalSection';
import { AcademicsSection } from './components/AcademicsSection';
import { DepartmentsSection } from './components/DepartmentsSection';
import { VirtualCampusTour } from './components/VirtualCampusTour';
import { CollegeLibrarySection } from './components/CollegeLibrarySection';
import { CollegeLabsSection } from './components/CollegeLabsSection';
import { DigitalLibrarySection } from './components/DigitalLibrarySection';
import { AlumnaeSection } from './components/AlumnaeSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { StudentResourcesSection } from './components/StudentResourcesSection';
import { CemisAttendanceSection } from './components/CemisAttendanceSection';
import { GallerySection } from './components/GallerySection';
import { FacebookCommunitySection } from './components/FacebookCommunitySection';
import { ContactAndLocation } from './components/ContactAndLocation';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { FloatingCallWidget } from './components/FloatingCallWidget';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { AdminInboxModal } from './components/AdminInboxModal';

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
        {/* Hero Section */}
        <Hero onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />

        {/* Board Examination Honors & Top Positions Spotlight */}
        <BoardHonorsSection />

        {/* Student Achievements & Roll of Honor (Featured + Admin Firestore Additions) */}
        <StudentAchievementsSection />

        {/* Official News & Announcements Board */}
        <NoticesSection />

        {/* Facebook 2026 Live College Events Scrolling Window Tracker */}
        <FacebookEventsTracker />

        {/* 70-Year History, Legacy & Core Pillars */}
        <AboutAndHistory />

        {/* Principal's Desk: Prof. Yasmeen Panhwar */}
        <PrincipalSection />

        {/* Academic Faculties & Programs Explorer */}
        <AcademicsSection />

        {/* Academic Departments, Laboratories & Subject Chairs */}
        <DepartmentsSection onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />

        {/* Interactive Virtual Campus Tour */}
        <VirtualCampusTour />

        {/* Central College Library: Photos, Collections & Membership Rules */}
        <CollegeLibrarySection />

        {/* College Laboratories: Computer Science, Physics, Chemistry, Zoology & Botany */}
        <CollegeLabsSection />

        {/* Digital Library: Syllabus Book Photos & Internet Links */}
        <DigitalLibrarySection />

        {/* Alumnae Success Stories */}
        <AlumnaeSection />

        {/* SECCAP Centralized Admissions Guide */}
        <AdmissionsSection />

        {/* Student Resources: Downloadable Forms, Enrollment Slips & Registration Guides */}
        <StudentResourcesSection />

        {/* CEMIS Biometric Attendance & Faculty Portal (Sindh College Education Dept) */}
        <CemisAttendanceSection />

        {/* Campus Gallery & Archives */}
        <GallerySection />

        {/* Official Facebook Community Updates */}
        <FacebookCommunitySection />

        {/* Location, Google Map, QR Code, Working Contact Form & FAQs */}
        <ContactAndLocation />
      </main>

      {/* Institutional Footer */}
      <Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />

      {/* Quick Access Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />

      {/* Admin Enquiries & Subscribers Inbox Modal */}
      <AdminInboxModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
    </FirebaseProvider>
  );
}
