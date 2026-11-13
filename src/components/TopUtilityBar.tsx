import { useOfficeStatus } from '../hooks/useOfficeStatus';
import { COLLEGE_INFO } from '../data/collegeData';
import { Clock, ExternalLink, Phone } from 'lucide-react';

export function TopUtilityBar() {
  const { isOpen, karachiTime } = useOfficeStatus();

  return (
    <div className="bg-[#042f28] text-[#d4af37] text-xs font-medium border-b border-[#064b36] py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-center md:text-left">
          <span className="font-semibold tracking-wider uppercase text-[11px] sm:text-xs text-amber-200">
            Government Girls Zubaida College · Hyderabad, Sindh
          </span>
          <span className="hidden lg:inline text-emerald-600">|</span>
          <span className="hidden lg:inline text-amber-100/80 font-serif italic tracking-wide">
            &ldquo;Service Above Self&rdquo; · Estd. 1953
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
          {/* Live Phone Link */}
          <a
            href={`tel:${COLLEGE_INFO.phoneRaw}`}
            className="text-amber-300 hover:text-white transition-colors flex items-center gap-1 font-semibold"
            title="Call Govt Girls Zubaida College Office"
          >
            <Phone className="w-3 h-3 text-amber-300" />
            <span>{COLLEGE_INFO.phone}</span>
          </a>

          {/* Live PKT Clock */}
          <div className="flex items-center gap-1.5 text-stone-200">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-mono tabular-nums">{karachiTime || 'Loading...'}</span>
            <span className="text-[10px] text-amber-200 font-semibold">PKT</span>
          </div>

          {/* Office Status Badge */}
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                isOpen ? 'bg-emerald-400' : 'bg-rose-400'
              }`}
            />
            <span className="text-stone-200">
              {isOpen ? 'Office Open' : 'Office Closed'}
            </span>
          </div>

          <span className="text-emerald-700 hidden sm:inline">|</span>

          {/* Quick links */}
          <a
            href={COLLEGE_INFO.seccapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-300 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>SECCAP</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href={COLLEGE_INFO.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-300 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Facebook Page</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
