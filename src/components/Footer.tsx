import React, { useState } from 'react';
import { COLLEGE_INFO } from '../data/collegeData';
import { ArrowUp, ShieldCheck, Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Bell, Sparkles } from 'lucide-react';

export function Footer() {
  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmed = newsletterEmail.trim();
    if (!trimmed) {
      setNewsletterStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setNewsletterStatus('error');
      setErrorMessage('Please enter a valid email address (e.g., name@example.com).');
      return;
    }

    setNewsletterStatus('loading');

    // Simulate immediate confirmation and subscription
    setTimeout(() => {
      setSubscribedEmail(trimmed);
      setNewsletterStatus('success');
      setNewsletterEmail('');
    }, 600);
  };

  const handleResetNewsletter = () => {
    setNewsletterStatus('idle');
    setErrorMessage('');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#03241e] text-stone-300 border-t-2 border-amber-400/40 pt-16 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Newsletter Subscription Banner Section */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#064b36] via-[#053d2c] to-[#042f28] border-2 border-amber-300/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-44 h-44 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Newsletter Copy */}
            <div className="lg:col-span-6 space-y-2 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-bold uppercase tracking-wider">
                <Bell className="w-3.5 h-3.5" />
                <span>Zubaida College Gazette &amp; Bulletins</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Subscribe for College News &amp; Upcoming Events
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                Receive verified updates on SECCAP admissions, BISE board examination results, holidays, and campus assemblies directly in your inbox.
              </p>
            </div>

            {/* Newsletter Form & State Handling */}
            <div className="lg:col-span-6 text-left">
              {newsletterStatus === 'success' ? (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#04241d] border border-amber-300/60 shadow-inner flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-white">
                        Subscription Confirmed!
                      </h4>
                      <p className="text-xs text-stone-200 mt-0.5">
                        Thank you for subscribing. Official bulletins and event alerts will be sent to <strong className="text-amber-200 font-mono">{subscribedEmail}</strong>.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleResetNewsletter}
                    className="text-xs text-amber-300 hover:text-white underline whitespace-nowrap self-end sm:self-center"
                  >
                    Subscribe Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => {
                          setNewsletterEmail(e.target.value);
                          if (newsletterStatus === 'error') setNewsletterStatus('idle');
                        }}
                        placeholder="Enter your email (e.g., student@example.com)..."
                        disabled={newsletterStatus === 'loading'}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-emerald-700 bg-[#021c17] text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder:text-stone-400 disabled:opacity-50"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={newsletterStatus === 'loading'}
                      className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0 active:scale-95 disabled:opacity-50"
                    >
                      {newsletterStatus === 'loading' ? (
                        <span>Subscribing...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-emerald-950" />
                          <span>Subscribe</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Error Feedback */}
                  {newsletterStatus === 'error' && errorMessage && (
                    <div className="flex items-center gap-1.5 text-rose-300 text-xs">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Privacy & Cadence Disclaimer */}
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>🔒 Official college bulletins only. Zero spam.</span>
                    <span className="text-amber-200/80">Monthly Gazette &amp; Alerts</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/60">
          {/* Identity & Motto */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <img
                src={COLLEGE_INFO.images.logo}
                alt="Govt Girls Zubaida College Logo"
                className="w-14 h-14 rounded-full border-2 border-amber-300 bg-white p-0.5 object-contain"
              />
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-amber-300 leading-tight">
                  Government Girls Zubaida College
                </h3>
                <span className="text-xs text-emerald-200">
                  Hyderabad, Sindh, Pakistan
                </span>
              </div>
            </div>

            <p className="text-stone-300 leading-relaxed text-xs">
              Sindh&rsquo;s premier public collegiate institution for women since 1953. Currently educating over 2,000 enrolled students across intermediate HSC, 4-year BS, and 2-year associate degree faculties.
            </p>

            <div className="pt-2 text-xs text-amber-200 font-serif italic">
              &ldquo;SERVICE ABOVE SELF&rdquo;
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3 text-left">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-amber-300 transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors">
                  About &amp; History
                </a>
              </li>
              <li>
                <a href="#principal" className="hover:text-amber-300 transition-colors">
                  Principal&rsquo;s Desk
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-amber-300 transition-colors">
                  Live 2026 Events Tracker
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-300 transition-colors">
                  Academics
                </a>
              </li>
              <li>
                <a href="#departments" className="hover:text-amber-300 transition-colors">
                  Academic Departments
                </a>
              </li>
              <li>
                <a href="#campus-tour" className="hover:text-amber-300 transition-colors">
                  Virtual Campus Tour
                </a>
              </li>
              <li>
                <a href="#digital-library" className="hover:text-amber-300 transition-colors">
                  Digital Library &amp; Past Papers
                </a>
              </li>
              <li>
                <a href="#board-results" className="hover:text-amber-300 transition-colors">
                  2026 Board Honors
                </a>
              </li>
              <li>
                <a href="#alumnae" className="hover:text-amber-300 transition-colors">
                  Alumnae Success Stories
                </a>
              </li>
              <li>
                <a href="#admissions" className="hover:text-amber-300 transition-colors">
                  SECCAP Admissions
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition-colors">
                  Campus Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-300 transition-colors">
                  Find Us &amp; Contact
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-300 transition-colors">
                  Admissions, Uniforms &amp; Document FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Academic Streams */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Study Pathways
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#academics" className="hover:text-amber-300 transition-colors">
                  HSC Pre-Medical
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-300 transition-colors">
                  HSC Pre-Engineering
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-200">
                  <span>General Science (Computer Science)</span>
                  <span className="text-[10px] bg-amber-400 text-emerald-950 font-bold px-1.5 py-0.2 rounded">
                    Top Merit
                  </span>
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-300 transition-colors">
                  Commerce Group (I.Com)
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-300 transition-colors">
                  Humanities &amp; Arts (FA)
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-300 transition-colors">
                  BS Zoology (4 Years Degree)
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-200">
                  <span>AD Commerce (2 Years)</span>
                  <span className="text-[10px] bg-amber-400 text-emerald-950 font-bold px-1.5 py-0.2 rounded">
                    New
                  </span>
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-300 transition-colors">
                  Associate Degree in Science &amp; Arts (ADS / ADA)
                </a>
              </li>
              <li>
                <a href="#academics" className="hover:text-amber-300 transition-colors">
                  AD Physiology &amp; Health Sciences (ADS)
                </a>
              </li>
            </ul>
          </div>

          {/* Affiliation & Official Inquiries */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Affiliation &amp; Campus
            </h4>
            <div className="space-y-2 text-stone-300 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>Opposite Hyderabad Central Jail, Pathan Colony, Hirabad, Hyderabad, Sindh, Pakistan</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${COLLEGE_INFO.phoneRaw}`} className="text-amber-300 hover:underline font-mono font-semibold block">
                    {COLLEGE_INFO.phone}
                  </a>
                  <span className="text-[10px] text-stone-400">
                    Helpline: <a href={`tel:${COLLEGE_INFO.helplineRaw}`} className="text-stone-300 hover:text-white">{COLLEGE_INFO.helpline}</a>
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <a href={`mailto:${COLLEGE_INFO.email}`} className="text-amber-300 hover:underline">
                  {COLLEGE_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>Affiliated with BISE Hyderabad &amp; University of Sindh Jamshoro</span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href={COLLEGE_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px]"
              >
                Official Facebook Channel ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Government Girls Zubaida College, Hyderabad. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-amber-300/80">College Education Department · Govt of Sindh</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#064b36] hover:bg-emerald-700 text-amber-300 transition-colors flex items-center gap-1 px-3"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
