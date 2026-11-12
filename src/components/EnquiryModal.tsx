import React, { useState } from 'react';
import { COLLEGE_INFO } from '../data/collegeData';
import { X, Send, CheckCircle, ExternalLink, GraduationCap, Phone } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Intermediate Admissions');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSent(true);
  };

  const handleClose = () => {
    setIsSent(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  const mailtoUrl = `mailto:${COLLEGE_INFO.email}?subject=${encodeURIComponent(
    `[${subject}] Inquiry from ${name}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nTopic: ${subject}\n\nMessage:\n${message}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-left border border-stone-200 relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#064b36]">
          <GraduationCap className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Govt Girls Zubaida College Hyderabad
          </span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#064b36] mb-1">
          Admission &amp; Student Enquiry
        </h3>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-600 mb-6 pb-3 border-b border-stone-200">
          <span>Direct communication with college administration:</span>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`tel:${COLLEGE_INFO.phoneRaw}`}
              className="px-2.5 py-1 rounded bg-emerald-50 text-[#064b36] border border-emerald-300 font-mono font-bold hover:bg-emerald-100 flex items-center gap-1"
              title="Call College Office Landline"
            >
              <Phone className="w-3 h-3 text-emerald-700" />
              <span>Office: {COLLEGE_INFO.phone}</span>
            </a>
            <a
              href={`tel:${COLLEGE_INFO.helplineRaw}`}
              className="px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-300 font-mono font-bold hover:bg-amber-100 flex items-center gap-1"
              title="Call Admission Helpline"
            >
              <Phone className="w-3 h-3 text-amber-700" />
              <span>Helpline: {COLLEGE_INFO.helpline}</span>
            </a>
          </div>
        </div>

        {isSent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-xl font-bold text-stone-900">
              Enquiry Form Ready!
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
              Your message for <strong>{COLLEGE_INFO.name}</strong> regarding <strong>{subject}</strong> has been prepared.
            </p>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={mailtoUrl}
                className="w-full py-3 bg-[#064b36] hover:bg-[#042f28] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow"
              >
                <span>Send via Email App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={handleClose}
                className="w-full py-2.5 border border-stone-300 hover:bg-stone-100 rounded-lg text-xs font-semibold text-stone-700"
              >
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={import.meta.env.DEV ? 'e.g. Fatima Zahra' : undefined}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={import.meta.env.DEV ? 'name@example.com' : undefined}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={import.meta.env.DEV ? '0300-XXXXXXX' : undefined}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Enquiry Subject *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36] bg-white"
              >
                <option value="Intermediate Admissions">Intermediate Class XI Admission (SECCAP)</option>
                <option value="BS Zoology">BS Zoology (4 Years Degree)</option>
                <option value="AD Commerce">Associate Degree in Commerce (AD Commerce / ADC)</option>
                <option value="Associate Degree Science/Arts">Associate Degree in Science / Arts (ADS / ADA)</option>
                <option value="Marksheet Verification">Document / Marksheet Verification</option>
                <option value="General Inquiry">General College Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Your Message / Question *
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={import.meta.env.DEV ? 'State your query clearly...' : undefined}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#064b36]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#064b36] hover:bg-[#042f28] text-white rounded-lg font-bold text-sm shadow transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Submit Enquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
