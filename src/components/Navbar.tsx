import { useState, useEffect } from 'react';
import { COLLEGE_INFO } from '../data/collegeData';
import { Menu, X, GraduationCap, ChevronRight, Phone } from 'lucide-react';

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
    { label: 'Campus Tour', href: '#campus-tour' },
    { label: 'Digital Library', href: '#digital-library' },
    { label: 'Board Honors', href: '#board-results' },
    { label: 'Alumnae', href: '#alumnae' },
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
          ? 'bg-[#064b36] shadow-lg shadow-black/20 border-b border-amber-400/30 py-2.5'
          : 'bg-[#064b36] border-b border-emerald-800/80 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Zone */}
          <a
            href="#home"
            className="flex items-center gap-3.5 text-left group shrink-0"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
          >
            <div className="relative">
              <img
                src={COLLEGE_INFO.images.logo}
                alt="Govt Girls Zubaida College Emblem"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-amber-300/80 shadow-md object-contain bg-white p-0.5 group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <span className="block font-serif font-bold text-base sm:text-lg lg:text-xl text-amber-300 leading-tight tracking-tight group-hover:text-amber-200 transition-colors">
                Government Girls Zubaida College
              </span>
              <span className="block text-xs font-medium text-emerald-100/90 tracking-wide">
                Hyderabad, Sindh, Pakistan · Estd. 1953
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-emerald-100">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="whitespace-nowrap hover:text-amber-300 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-300 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Zone */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${COLLEGE_INFO.phoneRaw}`}
              className="px-3 py-2 text-xs font-semibold text-amber-300 hover:text-white bg-[#032922] hover:bg-[#021f19] border border-amber-400/40 transition-all rounded-md whitespace-nowrap flex items-center gap-1.5"
              title="Call College Office"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{COLLEGE_INFO.phone}</span>
            </a>
            <button
              onClick={onOpenEnquiry}
              className="px-3.5 py-2 text-xs font-semibold text-emerald-950 bg-amber-300 hover:bg-amber-200 active:scale-95 transition-all rounded-md shadow-sm whitespace-nowrap flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-900" />
              <span>Send Enquiry</span>
            </button>
            <a
              href="#admissions"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#admissions');
              }}
              className="px-3 py-2 text-xs font-semibold text-white bg-[#03241e] hover:bg-[#021c17] border border-amber-400/40 transition-all rounded-md whitespace-nowrap"
            >
              SECCAP Guide
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
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
          <div className="xl:hidden mt-3 pt-3 border-t border-emerald-800 bg-[#053d2c] rounded-lg p-4 shadow-xl">
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
                  className="px-3 py-2 text-sm font-medium text-emerald-50 hover:bg-emerald-800/60 hover:text-amber-300 rounded flex items-center justify-between"
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
