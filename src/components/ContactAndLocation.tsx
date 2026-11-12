import React, { useState } from 'react';
import { COLLEGE_INFO } from '../data/collegeData';
import { useOfficeStatus } from '../hooks/useOfficeStatus';
import { FAQAccordion } from './FAQAccordion';
import {
  MapPin,
  Mail,
  Clock,
  Phone,
  Send,
  QrCode,
  ExternalLink,
  ChevronDown,
  CheckCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface ContactAndLocationProps {
  initialSubject?: string;
  isOpenEnquiryModal?: boolean;
  onCloseEnquiryModal?: () => void;
}

export function ContactAndLocation({
  initialSubject = 'Admissions',
  isOpenEnquiryModal = false,
  onCloseEnquiryModal
}: ContactAndLocationProps) {
  const { isOpen, statusText, subText, karachiTime } = useOfficeStatus();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubmitted(false);
    if (onCloseEnquiryModal) {
      onCloseEnquiryModal();
    }
  };

  const mailtoUrl = `mailto:${COLLEGE_INFO.email}?subject=${encodeURIComponent(
    `[${subject}] Inquiry from ${name}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nTopic: ${subject}\n\nMessage:\n${message}`
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-[#064b36] text-xs font-bold tracking-wider uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Campus Visit &amp; Inquiry</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            Location &amp; Contact Us
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            We welcome students, parents, and visitors to our campus. Reach out to our admission officers or visit us during listed office hours.
          </p>
        </div>

        {/* Top 4 Official Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Official Phone Numbers */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm flex items-start gap-4 hover:border-emerald-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                Official Phone No.
              </span>
              <h3 className="font-serif font-bold text-base text-stone-900 mt-0.5">
                College Landline
              </h3>
              <a
                href={`tel:${COLLEGE_INFO.phoneRaw}`}
                className="inline-block text-sm font-mono font-bold text-[#064b36] hover:underline mt-1"
              >
                {COLLEGE_INFO.phone}
              </a>
              <div className="mt-2 pt-2 border-t border-stone-200 text-xs">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block">Admission Helpline:</span>
                <a
                  href={`tel:${COLLEGE_INFO.helplineRaw}`}
                  className="font-mono font-semibold text-emerald-800 hover:underline"
                >
                  {COLLEGE_INFO.helpline}
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Campus Address */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm flex items-start gap-4 hover:border-emerald-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#064b36] flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#064b36] uppercase tracking-wider block">
                Campus Location
              </span>
              <h3 className="font-serif font-bold text-base text-stone-900 mt-0.5">
                Visit Our Campus
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {COLLEGE_INFO.location}
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Govt+Girls+Zubaida+College+Hyderabad+Sindh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#064b36] hover:underline mt-2"
              >
                <span>Google Maps ↗</span>
              </a>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm flex items-start gap-4 hover:border-emerald-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                Official Email
              </span>
              <h3 className="font-serif font-bold text-base text-stone-900 mt-0.5">
                Send Inquiries
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                For administrative &amp; verification queries:
              </p>
              <a
                href={`mailto:${COLLEGE_INFO.email}`}
                className="inline-block text-xs font-mono font-bold text-[#064b36] hover:underline mt-2 break-all"
              >
                {COLLEGE_INFO.email}
              </a>
            </div>
          </div>

          {/* Card 4: Office Hours & Realtime Status */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm flex items-start gap-4 hover:border-emerald-400 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#064b36] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#064b36] uppercase tracking-wider block">
                Office Hours
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full ${
                    isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                  }`}
                />
                <h3 className="font-serif font-bold text-base text-stone-900">
                  {statusText}
                </h3>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                {subText}
              </p>
              <span className="inline-block text-[11px] font-mono text-stone-500 mt-2 bg-stone-200/70 px-2 py-0.5 rounded">
                PKT: {karachiTime}
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid: Form + Interactive Map & QR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Column */}
          <div id="enquiryFormContainer" className="lg:col-span-6 bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6 space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Direct Contact
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#064b36]">
                Submit an Online Enquiry
              </h3>
              <p className="text-xs text-stone-600">
                Submit your question and our administration desk will review your inquiry.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-emerald-950">
                    Thank You, {name}!
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    Your enquiry regarding <strong>{subject}</strong> has been prepared and logged. You can also send this inquiry directly to our official college inbox:
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white border border-emerald-200 text-left text-xs font-mono text-stone-700 space-y-1">
                  <div><strong>To:</strong> {COLLEGE_INFO.email}</div>
                  <div><strong>From:</strong> {email}</div>
                  <div><strong>Subject:</strong> [{subject}] Inquiry from {name}</div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={mailtoUrl}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#064b36] hover:bg-[#042f28] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <span>Launch in Mail Client</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={handleResetForm}
                    className="w-full sm:w-auto px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={import.meta.env.DEV ? 'e.g. Ayesha Khan' : undefined}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={import.meta.env.DEV ? 'e.g. ayesha@example.com' : undefined}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36] bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={import.meta.env.DEV ? '0300-1234567' : undefined}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Enquiry Category *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36] bg-white"
                    >
                      <option value="Admissions">Intermediate Class XI Admission (SECCAP)</option>
                      <option value="BS Zoology">BS Zoology (4 Years Degree)</option>
                      <option value="AD Commerce">Associate Degree in Commerce (AD Commerce / ADC)</option>
                      <option value="Associate Degree Science/Arts">Associate Degree in Science / Arts (ADS / ADA)</option>
                      <option value="Academic Verification">Marksheet &amp; Document Verification</option>
                      <option value="General Inquiry">General College Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={import.meta.env.DEV ? 'Write your inquiry or question here...' : undefined}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36] bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#064b36] hover:bg-[#042f28] text-white rounded-lg font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Map and QR Code Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Interactive Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-white">
              <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
                <span className="font-bold text-xs text-[#064b36] uppercase tracking-wider">
                  Campus Navigation Map
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Govt+Girls+Zubaida+College+Pathan+Colony+Hirabad+Hyderabad+Sindh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#064b36] hover:underline flex items-center gap-1"
                >
                  <span>Open Full Directions ↗</span>
                </a>
              </div>
              <iframe
                title="Map to Government Girls Zubaida College Hyderabad"
                src="https://maps.google.com/maps?q=Govt%20Girls%20Zubaida%20College%20Pathan%20Colony%20Hirabad%20Hyderabad%20Sindh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen={true}
                className="w-full h-80"
              />
            </div>

            {/* QR Code Navigation Box */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm flex items-center gap-5">
              <img
                src={COLLEGE_INFO.images.qr}
                alt="Scan QR code for Google Maps location"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-xl border-2 border-stone-300 bg-white p-1 shrink-0"
              />
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                  Scan With Smartphone Camera
                </span>
                <h4 className="font-serif font-bold text-base text-stone-900">
                  Instant Google Maps Navigation
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Point your smartphone camera at this QR code to instantly launch GPS turn-by-turn directions directly to Govt Girls Zubaida College located opposite Hyderabad Central Jail in Pathan Colony, Hirabad, Hyderabad.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Accordion Component */}
        <FAQAccordion
          onQuickInquire={(topic) => {
            setSubject(topic);
            const formElem = document.getElementById('enquiryFormContainer');
            if (formElem) {
              formElem.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      </div>
    </section>
  );
}
