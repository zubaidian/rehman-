import {
  CheckCircle2,
  ExternalLink,
  Fingerprint,
  Smartphone,
} from 'lucide-react';

const CEMIS_FEATURES = [
  'Biometric-related attendance through GPS and selfie verification',
  'Daily Check-in and Check-out recording',
  'Complete personal Attendance History tracking',
  'Digital Leave and Transfer requests',
];

export function CemisAttendanceSection() {
  return (
    <section
      id="cemis-attendance"
      className="py-16 sm:py-24 bg-white text-stone-900 relative border-t border-stone-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
            College Education Department · Government of Sindh
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            CEMIS Biometric Attendance &amp; Faculty App
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            For Government College Lecturers in Sindh, the biometric attendance system is associated with{' '}
            <strong className="text-[#064b36]">
              CEMIS (College Education Management Information System)
            </strong>
            —the official digital platform of the College Education Department, Government of Sindh.
          </p>
        </div>

        {/* Official CEMIS App Card */}
        <div className="max-w-2xl mx-auto rounded-3xl bg-gradient-to-br from-[#064b36] to-[#042f28] text-white border-2 border-amber-300/40 shadow-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 text-left">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-emerald-800/80 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                  Official College Education Department App
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  CEMIS – College Education
                </h3>
                <p className="text-xs text-emerald-200 mt-1 font-medium">
                  Government of Sindh · College Education Department
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#03241e] border border-amber-300/40 flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6 text-amber-300" />
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200 block">
                Supported Attendance &amp; HR Capabilities:
              </span>
              <div className="space-y-2">
                {CEMIS_FEATURES.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-emerald-800/80">
            <a
              href="https://play.google.com/store/search?q=CEMIS+-+College+Education&c=apps"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Fingerprint className="w-4 h-4 shrink-0" />
              <span>Download CEMIS from Google Play</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>

            <a
              href="https://www.dgcs.gos.pk/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#03241e] hover:bg-[#05362d] text-amber-200 border border-amber-300/40 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>CED / DGCS Sindh Portal</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
