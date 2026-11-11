import { ExternalLink, CheckSquare, FileText, Smartphone, HelpCircle, ShieldCheck } from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

export function AdmissionsSection() {
  const steps = [
    {
      num: "01",
      title: "Online SECCAP Application",
      desc: "Visit the official portal at seccap.dgcs.gos.pk. Choose 'New Application' for First Year Intermediate Class XI admission."
    },
    {
      num: "02",
      title: "Enter Roll Number & B-Form",
      desc: "Input your Class IX / SSC Matriculation Roll Number, Passing Year, and candidate's NADRA B-Form or CNIC number."
    },
    {
      num: "03",
      title: "Select College & Preferred Group",
      desc: "Select Govt Girls Zubaida College Hyderabad as your priority preference and choose your group (Pre-Medical, Pre-Engineering, Computer Science, Commerce, Arts)."
    },
    {
      num: "04",
      title: "Merit Verification & Free Enrolment",
      desc: "Check placement results online. Visit the college admission desk with original documents for instant verification and zero-fee enrollment."
    }
  ];

  const documents = [
    "Class IX / X (Matriculation) Marks Certificate (Original & Photocopies)",
    "Candidate's NADRA B-Form or CNIC copy",
    "Father's / Guardian's CNIC photocopy",
    "Recent passport-sized passport photographs (White or Blue background)",
    "School Leaving Certificate (SLC) / Character Certificate",
    "SECCAP Online Placement Form printout"
  ];

  return (
    <section id="admissions" className="py-16 sm:py-24 bg-[#042f28] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#064b36] border border-amber-300/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Sindh College Education Department</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            SECCAP Centralized Admissions
          </h2>
          <p className="text-stone-300 text-base sm:text-lg">
            Complete guidelines for admission into Intermediate Class XI (First Year) and Degree Programs at Government Girls Zubaida College Hyderabad.
          </p>
        </div>

        {/* Free Admission Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 text-emerald-950 shadow-xl border-2 border-amber-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-black uppercase tracking-widest bg-emerald-950 text-amber-300 px-2.5 py-0.5 rounded">
                Free Education Initiative
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                100% Free Intermediate Admission for Qualified Students
              </h3>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium">
                Under the policy of the Government of Sindh, admission to Class XI is free of tuition fee on the basis of Class IX/X results through SECCAP.
              </p>
            </div>

            <a
              href={COLLEGE_INFO.seccapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 shrink-0 active:scale-95"
            >
              <span>Apply Online at SECCAP</span>
              <ExternalLink className="w-4 h-4 text-amber-300" />
            </a>
          </div>
        </div>

        {/* Step by Step Application Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Steps List */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-amber-300 mb-6">
              How to Apply through SECCAP
            </h3>

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="p-5 rounded-xl bg-[#063f35] border border-emerald-700/60 flex items-start gap-4"
                >
                  <div className="font-serif text-2xl font-bold text-amber-300 bg-[#042f28] w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border border-amber-300/30">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* SECCAP Direct Features */}
            <div className="mt-8 p-6 rounded-xl bg-[#021f19] border border-amber-300/30">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                Official SECCAP Portal Services
              </span>
              <p className="text-xs text-stone-300 mb-4">
                The Sindh Electronic Centralized College Admission Program provides direct online services for all prospective Zubeidians:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <a
                  href={COLLEGE_INFO.seccapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded bg-[#064b36] hover:bg-emerald-800 text-amber-200 border border-emerald-700 font-semibold"
                >
                  Apply Online ↗
                </a>
                <a
                  href={COLLEGE_INFO.seccapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded bg-[#064b36] hover:bg-emerald-800 text-amber-200 border border-emerald-700 font-semibold"
                >
                  Check Result ↗
                </a>
                <a
                  href={COLLEGE_INFO.seccapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded bg-[#064b36] hover:bg-emerald-800 text-amber-200 border border-emerald-700 font-semibold"
                >
                  Digital ID Card ↗
                </a>
                <a
                  href={COLLEGE_INFO.seccapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded bg-[#064b36] hover:bg-emerald-800 text-amber-200 border border-emerald-700 font-semibold"
                >
                  Complaint Box ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Required Documents Checklist & Degree Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#063f35] border-2 border-amber-300/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-300" />
                <h3 className="font-serif text-xl font-bold text-white">
                  Document Checklist for Final Verification
                </h3>
              </div>
              <p className="text-xs text-stone-300">
                Please bring the following original documents and photocopies to the college admission desk after receiving your SECCAP placement notification:
              </p>

              <div className="space-y-2.5 pt-2">
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-200">
                    <CheckSquare className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-emerald-700/80 text-xs text-amber-200">
                <strong>Admission Office Timing:</strong> Monday to Saturday, 8:00 AM – 1:30 PM (Pakistan Time).
              </div>
            </div>

            {/* University Degree Admissions Box */}
            <div className="p-6 rounded-2xl bg-[#03241e] border border-amber-300/30 text-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider">
                <Smartphone className="w-4 h-4" />
                <span>BS Zoology &amp; ADP Admissions</span>
              </div>
              <h4 className="font-serif font-bold text-lg text-white">
                Undergraduate Degree &amp; ADP Admissions
              </h4>
              <p className="text-stone-300 leading-relaxed">
                Admissions for the 4-Year BS Zoology and 2-Year Associate Degree Programs (AD Commerce, AD Science, AD Arts) are conducted in affiliation with the <strong className="text-white">University of Sindh, Jamshoro</strong>. Application forms and merit lists are issued according to the university calendar.
              </p>
              <a
                href="#contact"
                className="inline-block text-amber-300 font-semibold hover:underline"
              >
                Inquire with Degree Admission Cell ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
