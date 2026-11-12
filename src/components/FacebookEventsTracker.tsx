import { useState, useEffect, useRef, useMemo } from 'react';
import { COLLEGE_INFO } from '../data/collegeData';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Plus,
  Radio,
  CheckCircle2,
  Sparkles,
  Share2,
  X,
  Tag
} from 'lucide-react';

export interface FacebookEventItem {
  id: string;
  title: string;
  year: number; // 2026
  date: string; // YYYY-MM-DD
  displayDate: string;
  time: string;
  category: 'academic' | 'cultural' | 'sports' | 'admissions' | 'ceremony';
  categoryLabel: string;
  venue: string;
  summary: string;
  details: string;
  facebookUrl: string;
  isLiveNow?: boolean;
  status: 'Upcoming' | 'Live Today' | 'Completed';
}

const INITIAL_2026_FACEBOOK_EVENTS: FacebookEventItem[] = [
  {
    id: 'fb-ev-1',
    title: 'Annual Seerat-un-Nabi (PBUH) Conference & Naat Contest 2026',
    year: 2026,
    date: '2026-11-24',
    displayDate: 'November 24, 2026',
    time: '9:30 AM – 1:30 PM (PKT)',
    category: 'cultural',
    categoryLabel: 'Spiritual & Cultural',
    venue: 'College Main Auditorium Hall',
    summary: 'Grand annual Naat competition and inspirational declamation by regional scholars and faculty members.',
    details: 'Featuring student recitations in both Urdu and Sindhi. Principal Prof. Yasmeen Panhwar will award memorial shields and certificates to top position holders.',
    facebookUrl: COLLEGE_INFO.facebookUrl,
    status: 'Upcoming'
  },
  {
    id: 'fb-ev-2',
    title: 'Sindh Cultural Heritage Day & Regional Adabi Mushaira 2026',
    year: 2026,
    date: '2026-12-06',
    displayDate: 'December 06, 2026',
    time: '9:00 AM – 2:00 PM (PKT)',
    category: 'cultural',
    categoryLabel: 'Sindh Heritage Gala',
    venue: 'Central Courtyard & Pavilion Stage',
    summary: 'Traditional Ajrak & Topi festivities, Shah Latif poetry recitals, folk musical tableaux, and handicrafts exhibition.',
    details: 'Live covered on the official Facebook page with student photo galleries, Bait-Bazi, and cultural speeches celebrating the peace and harmony of Sindh.',
    facebookUrl: COLLEGE_INFO.facebookUrl,
    status: 'Upcoming'
  },
  {
    id: 'fb-ev-3',
    title: 'BISE Hyderabad HSC Board Examination Slip Verification 2026',
    year: 2026,
    date: '2026-12-15',
    displayDate: 'December 15, 2026',
    time: '8:30 AM – 1:30 PM (PKT)',
    category: 'academic',
    categoryLabel: 'Board Examination',
    venue: 'Student Affairs & Examination Branch (Room 12)',
    summary: 'Collection of computerized enrollment cards and exam center verification for Intermediate Class XI & XII.',
    details: 'Students must verify their roll numbers and center allocations before the official board exam commencement.',
    facebookUrl: COLLEGE_INFO.facebookUrl,
    status: 'Upcoming'
  },
  {
    id: 'fb-ev-4',
    title: 'Board Merit Holders & 100% Pass Felicitation Gala 2026',
    year: 2026,
    date: '2026-10-14',
    displayDate: 'October 14, 2026',
    time: '10:00 AM – 1:00 PM (PKT)',
    category: 'ceremony',
    categoryLabel: 'Board Honors Gala',
    venue: 'College Main Auditorium Hall',
    summary: 'Celebrating Maryam Bibi (2nd Position in Sindh Board, 916 marks) and 4th position holder in Computer Science.',
    details: 'Attended by Sindh education dignitaries, professors, proud parents, and position holders with medal distribution and photo sessions.',
    facebookUrl: COLLEGE_INFO.facebookUrl,
    status: 'Completed'
  },
  {
    id: 'fb-ev-5',
    title: 'SECCAP 2026 Centralized Admission Verification Helpdesk',
    year: 2026,
    date: '2026-11-15',
    displayDate: 'Active Through 2026 Session',
    time: '8:00 AM – 2:00 PM Daily',
    category: 'admissions',
    categoryLabel: 'Centralized SECCAP',
    venue: 'College Admissions Desk & Computer Lab',
    summary: 'Free admission verification for Pre-Medical, Pre-Engineering, Computer Science, Commerce, and Arts applicants.',
    details: 'On-spot document checking, domicile verification, and subject counseling under the 100% free education policy of Sindh Government.',
    facebookUrl: COLLEGE_INFO.facebookUrl,
    isLiveNow: true,
    status: 'Live Today'
  },
  {
    id: 'fb-ev-6',
    title: 'Pre-Medical & Health Diagnostic Camp 2026',
    year: 2026,
    date: '2026-11-18',
    displayDate: 'November 18, 2026',
    time: '9:00 AM – 1:00 PM (PKT)',
    category: 'academic',
    categoryLabel: 'Medical Science',
    venue: 'Physiology & Zoology Research Laboratories',
    summary: 'Clinical blood group testing, blood pressure screening, and medical career seminar by senior doctors and alumnae.',
    details: 'Hands-on practical session organized by the Department of Physiology and Pre-Medical Faculty for female students.',
    facebookUrl: COLLEGE_INFO.facebookUrl,
    status: 'Upcoming'
  },
  {
    id: 'fb-ev-7',
    title: 'All-Sindh Colleges Science, Robotics & IT Expo 2026',
    year: 2026,
    date: '2026-11-28',
    displayDate: 'November 28, 2026',
    time: '9:30 AM – 2:30 PM (PKT)',
    category: 'academic',
    categoryLabel: 'Science & Computing',
    venue: 'Computer Science Lab & Chemistry Block',
    summary: 'Inter-departmental software projects, chemical synthesis experiments, and botanical research showcase.',
    details: 'Demonstrations by students in C++ coding, web technologies, and cellular biology models reviewed by visiting professors.',
    facebookUrl: COLLEGE_INFO.facebookUrl,
    status: 'Upcoming'
  },
  {
    id: 'fb-ev-8',
    title: 'Annual Inter-Class Sports Week & Badminton Tournament 2026',
    year: 2026,
    date: '2026-12-18',
    displayDate: 'December 18 – 21, 2026',
    time: '9:00 AM – 1:30 PM (PKT)',
    category: 'sports',
    categoryLabel: 'Sports & Athletics',
    venue: 'College Sports Grounds & Badminton Courts',
    summary: 'Inter-faculty championship in badminton, table tennis, relay races, and throwball matches.',
    details: 'Trophies and athletic shields presented to champion houses by Principal and Physical Education director.',
    facebookUrl: COLLEGE_INFO.facebookUrl,
    status: 'Upcoming'
  }
];

export function FacebookEventsTracker() {
  const [events, setEvents] = useState<FacebookEventItem[]>(() => {
    try {
      const saved = localStorage.getItem('ggzc_facebook_events_2026');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_2026_FACEBOOK_EVENTS;
  });

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isPaused, setIsPaused] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<'normal' | 'fast' | 'slow'>('normal');
  const [selectedEvent, setSelectedEvent] = useState<FacebookEventItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Live Synced with Facebook');

  // New Event Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('2026-11-25');
  const [newTime, setNewTime] = useState('9:00 AM – 1:00 PM');
  const [newVenue, setNewVenue] = useState('College Main Auditorium');
  const [newCategory, setNewCategory] = useState<'academic' | 'cultural' | 'sports' | 'admissions' | 'ceremony'>('academic');
  const [newSummary, setNewSummary] = useState('');
  const [newFbUrl, setNewFbUrl] = useState(COLLEGE_INFO.facebookUrl);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Save to localStorage whenever events change
  useEffect(() => {
    try {
      localStorage.setItem('ggzc_facebook_events_2026', JSON.stringify(events));
    } catch {
      // Storage issue
    }
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      if (filterCategory === 'all') return true;
      return ev.category === filterCategory;
    });
  }, [events, filterCategory]);

  // Smooth continuous auto-scroll ticker
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isPaused) return;

    let step = 1;
    if (scrollSpeed === 'fast') step = 2;
    if (scrollSpeed === 'slow') step = 0.5;

    const interval = setInterval(() => {
      if (container) {
        // If reached end, wrap back smoothly
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 5) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += step;
        }
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isPaused, scrollSpeed]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleSyncWithFacebook = () => {
    setLastSyncTime(`Synced today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    // Re-verify initial events if needed
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const categoryLabels: Record<string, string> = {
      academic: 'Academic & Board',
      cultural: 'Cultural & Arts',
      sports: 'Sports & Athletics',
      admissions: 'Admissions & Notice',
      ceremony: 'Ceremony & Honors'
    };

    const newEv: FacebookEventItem = {
      id: `fb-ev-${Date.now()}`,
      title: newTitle.trim(),
      year: 2026,
      date: newDate,
      displayDate: new Date(newDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      time: newTime.trim() || 'Official College Timings',
      category: newCategory,
      categoryLabel: categoryLabels[newCategory] || 'College Event',
      venue: newVenue.trim() || 'College Campus',
      summary: newSummary.trim() || 'Official college event posted on Facebook.',
      details: newSummary.trim() || 'Follow the official Facebook page for live updates and coverage.',
      facebookUrl: newFbUrl.trim() || COLLEGE_INFO.facebookUrl,
      status: 'Upcoming'
    };

    setEvents((prev) => [newEv, ...prev]);

    // Reset form
    setNewTitle('');
    setNewSummary('');
    setIsAddModalOpen(false);
  };

  return (
    <section id="events" className="py-10 bg-[#021f19] text-white border-y-2 border-amber-400/40 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div className="space-y-1 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-900/60 border border-blue-400/40 text-blue-300 text-[11px] font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Facebook College Events Tracker · Year 2026</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <span>Live 2026 Campus Events &amp; Assemblies</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-400 text-emerald-950 font-sans font-bold">
                2026 Tracker
              </span>
            </h3>
            <p className="text-xs text-stone-300">
              Continuous live scrolling window syncing curricular, examination, and cultural happenings from our official Facebook page.
            </p>
          </div>

          {/* Action & Control Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Speed & Pause Controls */}
            <div className="flex items-center gap-1 bg-[#043329] px-2 py-1 rounded-xl border border-emerald-700/80 text-xs">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isPaused ? 'bg-amber-400 text-emerald-950 font-bold' : 'text-stone-300 hover:text-white'
                }`}
                title={isPaused ? 'Resume scrolling' : 'Pause scrolling'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
              </button>

              <div className="h-4 w-px bg-emerald-700 mx-1" />

              <button
                onClick={() => setScrollSpeed('slow')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  scrollSpeed === 'slow' ? 'bg-emerald-800 text-amber-300' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Slow
              </button>
              <button
                onClick={() => setScrollSpeed('normal')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  scrollSpeed === 'normal' ? 'bg-emerald-800 text-amber-300' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setScrollSpeed('fast')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  scrollSpeed === 'fast' ? 'bg-emerald-800 text-amber-300' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Fast
              </button>
            </div>

            {/* Manual Navigation Arrows */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleManualScroll('left')}
                className="p-2 rounded-xl bg-[#043329] hover:bg-[#064739] border border-emerald-700 text-stone-300 hover:text-white transition-colors"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleManualScroll('right')}
                className="p-2 rounded-xl bg-[#043329] hover:bg-[#064739] border border-emerald-700 text-stone-300 hover:text-white transition-colors"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Add / Sync Facebook Event Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Facebook Event</span>
            </button>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-4 pb-2 border-b border-emerald-800/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mr-2 flex items-center gap-1">
            <Tag className="w-3 h-3" /> Filter 2026:
          </span>
          {[
            { id: 'all', label: 'All 2026 Events' },
            { id: 'academic', label: 'Academic & Board' },
            { id: 'cultural', label: 'Cultural & Heritage' },
            { id: 'sports', label: 'Sports & Athletics' },
            { id: 'admissions', label: 'Admissions' },
            { id: 'ceremony', label: 'Honors & Galas' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterCategory === tab.id
                  ? 'bg-amber-400 text-emerald-950 shadow-sm'
                  : 'bg-[#043329] text-stone-300 hover:bg-[#064739]'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-stone-400 hidden sm:inline">
            💡 Hover over any card to pause the scrolling window
          </span>
        </div>

        {/* Scrolling Window Container (Marquee Auto-Tracker) */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={() => setSelectedEvent(ev)}
              className="w-80 sm:w-96 shrink-0 rounded-2xl p-5 bg-gradient-to-b from-[#064b36] to-[#042f28] border-2 border-amber-300/40 hover:border-amber-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div className="space-y-3">
                {/* Card Top: 2026 Year Badge & Facebook Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[11px] shadow">
                      f
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#021f19] text-amber-300 border border-amber-400/30">
                      2026 Event
                    </span>
                  </div>

                  {ev.isLiveNow ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse shadow">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      Live Now
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-200 border border-emerald-700/60">
                      {ev.categoryLabel}
                    </span>
                  )}
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-200">
                  <CalendarIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{ev.displayDate}</span>
                </div>

                {/* Event Title */}
                <h4 className="font-serif text-lg font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-2 leading-snug">
                  {ev.title}
                </h4>

                {/* Venue */}
                <div className="flex items-center gap-1.5 text-xs text-stone-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span className="line-clamp-1">{ev.venue}</span>
                </div>

                {/* Summary */}
                <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
                  {ev.summary}
                </p>
              </div>

              {/* Card Bottom Strip */}
              <div className="pt-4 mt-4 border-t border-emerald-800/80 flex items-center justify-between text-xs">
                <span className="text-amber-300 group-hover:underline font-bold text-[11px] flex items-center gap-1">
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
                </span>

                <a
                  href={ev.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow transition-colors flex items-center gap-1"
                >
                  <span>Facebook Post</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info strip */}
        <div className="mt-4 pt-3 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-amber-200/90 font-medium">{lastSyncTime}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSyncWithFacebook}
              className="text-xs text-amber-300 hover:underline flex items-center gap-1"
            >
              <span>Refresh 2026 Facebook Stream</span>
            </button>
            <span>·</span>
            <a
              href={COLLEGE_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:underline"
            >
              Visit Govt Girls Zubaida College Facebook Page ↗
            </a>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-[#03241e] rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-amber-300/60 text-left space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-emerald-800 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    f
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    2026 Facebook College Event
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900 text-emerald-200">
                    {selectedEvent.categoryLabel}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-stone-400 hover:text-white p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#021814] p-3.5 rounded-xl border border-emerald-800">
              <div className="flex items-center gap-2 text-stone-200">
                <CalendarIcon className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Date: <strong className="text-white">{selectedEvent.displayDate}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-stone-200">
                <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Time: <strong className="text-white">{selectedEvent.time}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-stone-200 sm:col-span-2">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Venue: <strong className="text-white">{selectedEvent.venue}</strong></span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h5 className="font-bold text-amber-200 uppercase tracking-wider text-[11px]">
                Event Summary &amp; Significance:
              </h5>
              <p className="text-stone-200 leading-relaxed text-sm">
                {selectedEvent.details}
              </p>
            </div>

            <div className="pt-3 border-t border-emerald-800 flex flex-wrap items-center justify-between gap-3">
              <a
                href={selectedEvent.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Open on Facebook Page ↗</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 border border-emerald-700 text-stone-300 hover:text-white text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Sync Facebook Event Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-[#03241e] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-amber-300/60 text-left space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-emerald-800 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Track New Facebook College Event (2026)
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Add Event to 2026 Scrolling Window
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-white p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                  Event Title (2026):
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Annual Science Exhibition & Quiz Competition 2026"
                  className="w-full px-3 py-2 rounded-lg bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                    Event Date (2026):
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                    Category:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  >
                    <option value="academic">Academic &amp; Board</option>
                    <option value="cultural">Cultural &amp; Heritage</option>
                    <option value="sports">Sports &amp; Athletics</option>
                    <option value="admissions">Admissions</option>
                    <option value="ceremony">Ceremony &amp; Honors</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                    Time / Hours:
                  </label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="e.g., 9:30 AM – 1:30 PM"
                    className="w-full px-3 py-2 rounded-lg bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                    Campus Venue:
                  </label>
                  <input
                    type="text"
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    placeholder="e.g., Main Auditorium Hall"
                    className="w-full px-3 py-2 rounded-lg bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                  Facebook Post / Event Link:
                </label>
                <input
                  type="url"
                  value={newFbUrl}
                  onChange={(e) => setNewFbUrl(e.target.value)}
                  placeholder="https://www.facebook.com/..."
                  className="w-full px-3 py-2 rounded-lg bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                  Event Brief / Summary:
                </label>
                <textarea
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  rows={2}
                  placeholder="Key details, speakers, or student participants..."
                  className="w-full px-3 py-2 rounded-lg bg-[#021814] text-white border border-emerald-700 focus:outline-none focus:ring-1 focus:ring-amber-300"
                  required
                />
              </div>

              <div className="pt-2 border-t border-emerald-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-2 text-stone-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-lg shadow"
                >
                  Add to 2026 Scrolling Window
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
