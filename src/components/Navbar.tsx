import { useState, useEffect } from 'react';
import { COLLEGE_INFO } from '../data/collegeData';
import { Menu, X, ChevronRight, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: () => void;
}

export function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#home' },
    { label: 'About & History', href: '#about' },
    { label: 'Principal’s Desk', href: '#principal' },
    { label: 'Events', href: '#events' },
    { label: 'Academics', href: '#academics' },
    { label: 'Departments', href: '#departments' },
    { label: 'Campus Tour', href: '#campus-tour' },
    { label: 'College Library', href: '#college-library' },
    { label: 'College Labs', href: '#college-labs' },
    { label: 'Digital Library', href: '#digital-library' },
    { label: 'Board Honors', href: '#board-results' },
    { label: 'Student Achievements', href: '#student-achievements' },
    { label: 'Distinguished Alumnae', href: '#alumnae' },
    { label: 'Facebook Live', href: '#facebook-updates' },
    { label: 'Admissions & SECCAP', href: '#admissions' },
    { label: 'Campus Gallery', href: '#gallery' },
    { label: 'Location & Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#064b36] shadow-lg shadow-black/20 border-b border-amber-400/30 py-2'
          : 'bg-[#064b36] border-b border-emerald-800/80 py-2.5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo in Left Corner */}
          <a
            href="#home"
            className="flex items-center text-left group shrink-0"
            aria-label="Government Girls Zubaida College"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
          >
            <img
              src={COLLEGE_INFO.images.logo}
              alt="Govt Girls Zubaida College Emblem"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-amber-300/80 shadow-md object-contain bg-white p-0.5 group-hover:scale-105 transition-transform"
            />
          </a>

          {/* Menu Bar Inline Next to Logo (wraps cleanly so all links stay visible) */}
          <nav className="hidden lg:flex flex-1 min-w-0 flex-wrap items-center justify-center gap-x-3.5 xl:gap-x-4 gap-y-1 text-[13px] font-medium text-emerald-100">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="whitespace-nowrap hover:text-amber-300 transition-colors py-0.5 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-300 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${COLLEGE_INFO.phoneRaw}`}
              className="sm:hidden p-2 rounded-md bg-[#03241e] text-amber-300 border border-amber-400/40"
              title="Call College Office"
              aria-label="Call College"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenEnquiry}
              className="sm:hidden px-2.5 py-1.5 text-xs font-semibold text-emerald-950 bg-amber-300 rounded shadow-sm"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-amber-200 hover:text-white hover:bg-emerald-800/80 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-emerald-800 bg-[#053d2c] rounded-lg p-4 shadow-xl max-h-[75vh] overflow-y-auto">
            {/* Quick Call Row on Mobile */}
            <div className="mb-3 pb-3 border-b border-emerald-800 flex items-center justify-between px-1">
              <div>
                <span className="text-[10px] text-amber-200 uppercase tracking-widest block font-bold">
                  College Office Phone
                </span>
                <span className="text-sm font-mono font-bold text-white">
                  {COLLEGE_INFO.phone}
                </span>
              </div>
              <a
                href={`tel:${COLLEGE_INFO.phoneRaw}`}
                className="px-3 py-1.5 bg-amber-300 hover:bg-amber-200 text-emerald-950 text-xs font-bold rounded flex items-center gap-1 shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-3 py-2 text-[15px] font-medium text-emerald-50 hover:bg-emerald-800/60 hover:text-amber-300 rounded flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-emerald-800/80 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full py-2.5 px-4 text-sm font-bold text-center text-emerald-950 bg-amber-300 hover:bg-amber-200 rounded shadow"
                >
                  Send Admission Enquiry
                </button>
                <a
                  href={`tel:${COLLEGE_INFO.helplineRaw}`}
                  className="w-full py-2 px-4 text-xs font-semibold text-center text-amber-200 bg-[#03241e] border border-amber-400/40 rounded flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3 h-3 text-amber-300" />
                  <span>Admission Helpline: {COLLEGE_INFO.helpline}</span>
                </a>
                <a
                  href={COLLEGE_INFO.seccapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-sm font-semibold text-center text-white bg-[#03241e] border border-amber-300/40 rounded"
                >
                  Visit Official SECCAP Portal ↗
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
