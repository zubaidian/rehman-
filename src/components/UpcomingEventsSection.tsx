import React, { useState, useMemo } from 'react';
import { COLLEGE_EVENTS, CollegeEvent } from '../data/eventsData';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  List,
  Grid,
  Sparkles,
  Download,
  X,
  CheckCircle2,
  Bell,
  Users
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/collegeData';

export function UpcomingEventsSection() {
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>('timeline');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<CollegeEvent | null>(null);
  const [calendarMonth, setCalendarMonth] = useState<number>(10); // 0-indexed: 10 = November 2026
  const [calendarYear, setCalendarYear] = useState<number>(2026);
  const [calendarSelectedDate, setCalendarSelectedDate] = useState<string | null>(null);
  const [calendarExportSuccess, setCalendarExportSuccess] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'academic', label: 'Academic & Exams' },
    { id: 'holiday', label: 'Holidays & Vacations' },
    { id: 'cultural', label: 'Cultural & Literary' },
    { id: 'sports', label: 'Sports & Athletics' }
  ];

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return COLLEGE_EVENTS.filter((ev) => {
      const matchCat = selectedCategory === 'all' || ev.category === selectedCategory;
      const matchDate = !calendarSelectedDate || ev.date.startsWith(calendarSelectedDate);
      return matchCat && matchDate;
    });
  }, [selectedCategory, calendarSelectedDate]);

  // Calendar Math
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay(); // 0 = Sun, 1 = Mon...

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
    setCalendarSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
    setCalendarSelectedDate(null);
  };

  // Generate an iCal (.ics) calendar file
  const downloadIcs = (event: CollegeEvent) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Govt Girls Zubaida College//Events//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.summary} Organizer: ${event.organizer}`,
      `LOCATION:${event.venue}, Govt Girls Zubaida College Hyderabad`,
      `DTSTART:${event.date.replace(/-/g, '')}T090000Z`,
      `DTEND:${event.date.replace(/-/g, '')}T140000Z`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCalendarExportSuccess(`Calendar invite (.ics) generated for: ${event.title}`);
    setTimeout(() => setCalendarExportSuccess(null), 4000);
  };

  return (
    <section id="events" className="py-16 sm:py-24 bg-white text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-[#064b36] text-xs font-bold tracking-wider uppercase">
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-800" />
            <span>Collegiate Schedule · 2026–2027</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#064b36]">
            Upcoming College Events
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Stay informed with the official schedule of board examinations, holiday recesses, literary assemblies, science galas, and annual sports week.
          </p>
        </div>

        {/* View Switcher & Category Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCalendarSelectedDate(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#064b36] text-white shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle: Timeline vs Calendar */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-stone-200/80 p-1 rounded-xl">
            <button
              onClick={() => {
                setViewMode('timeline');
                setCalendarSelectedDate(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Timeline View</span>
            </button>

            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Calendar View</span>
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {calendarExportSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-[#064b36] text-white text-xs sm:text-sm flex items-center justify-between shadow-md border border-amber-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{calendarExportSuccess}</span>
            </div>
            <button
              onClick={() => setCalendarExportSuccess(null)}
              className="text-stone-300 hover:text-white text-xs"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* TIMELINE VIEW */}
        {viewMode === 'timeline' && (
          <div className="space-y-4">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer group ${
                  event.featured
                    ? 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-300 shadow-sm hover:shadow-md'
                    : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-emerald-300 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Left: Date Badge + Main Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  {/* Date Badge */}
                  <div className="w-20 h-20 rounded-xl bg-[#064b36] text-white flex flex-col items-center justify-center shrink-0 border-2 border-amber-300 shadow-sm text-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="font-serif font-bold text-2xl leading-none my-0.5 text-white">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-200">
                      {new Date(event.date).getFullYear()}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-1.5 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                        {event.categoryLabel}
                      </span>
                      <span className="text-stone-400 text-xs">·</span>
                      <span className="text-xs text-stone-500 font-medium">
                        {event.organizer}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#064b36] group-hover:text-emerald-800 transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 max-w-3xl leading-relaxed">
                      {event.summary}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{event.time}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{event.venue}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadIcs(event);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 border border-stone-200"
                    title="Add to iCal / Google Calendar"
                  >
                    <Download className="w-3.5 h-3.5 text-[#064b36]" />
                    <span>Save to Calendar</span>
                  </button>

                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="text-xs font-bold text-[#064b36] hover:underline"
                  >
                    View Full Details ↗
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CALENDAR MONTH VIEW */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
            {/* Calendar Month Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#064b36]">
                  {monthNames[calendarMonth]} {calendarYear}
                </h3>
                <span className="text-xs text-stone-500">
                  Select any marked date to inspect events scheduled for that day
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-stone-500 pb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty leading offset days */}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="h-20 sm:h-24 rounded-xl bg-stone-50/50 opacity-40" />
              ))}

              {/* Month Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(
                  dayNum
                ).padStart(2, '0')}`;
                const eventsOnThisDay = COLLEGE_EVENTS.filter((e) => e.date === dateStr);
                const isSelected = calendarSelectedDate === dateStr;

                return (
                  <div
                    key={dayNum}
                    onClick={() => {
                      if (eventsOnThisDay.length > 0) {
                        setCalendarSelectedDate(isSelected ? null : dateStr);
                      }
                    }}
                    className={`h-20 sm:h-24 p-2 rounded-xl border flex flex-col justify-between transition-all ${
                      eventsOnThisDay.length > 0
                        ? isSelected
                          ? 'bg-amber-100 border-amber-400 shadow-md ring-2 ring-amber-400 cursor-pointer'
                          : 'bg-emerald-50/60 border-emerald-300 hover:bg-emerald-100 cursor-pointer'
                        : 'bg-stone-50 border-stone-200 text-stone-400'
                    }`}
                  >
                    <span
                      className={`text-xs font-bold ${
                        eventsOnThisDay.length > 0
                          ? 'text-[#064b36]'
                          : 'text-stone-500'
                      }`}
                    >
                      {dayNum}
                    </span>

                    {eventsOnThisDay.length > 0 && (
                      <div className="space-y-1">
                        {eventsOnThisDay.map((ev) => (
                          <div
                            key={ev.id}
                            className="text-[10px] leading-tight font-semibold text-emerald-950 bg-amber-300/90 px-1.5 py-0.5 rounded truncate"
                            title={ev.title}
                          >
                            {ev.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Filtered events for the selected calendar date */}
            {calendarSelectedDate && (
              <div className="mt-6 pt-6 border-t border-stone-200 text-left">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-serif font-bold text-lg text-[#064b36]">
                    Events on {calendarSelectedDate}:
                  </h4>
                  <button
                    onClick={() => setCalendarSelectedDate(null)}
                    className="text-xs text-stone-500 hover:text-stone-800"
                  >
                    Clear Filter
                  </button>
                </div>

                <div className="space-y-3">
                  {filteredEvents.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className="p-4 rounded-xl bg-stone-50 border border-stone-200 hover:border-emerald-400 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          {ev.categoryLabel} · {ev.time}
                        </span>
                        <h5 className="font-serif font-bold text-base text-stone-900 mt-0.5">
                          {ev.title}
                        </h5>
                        <p className="text-xs text-stone-600 mt-0.5">{ev.venue}</p>
                      </div>
                      <span className="text-xs font-bold text-[#064b36] underline shrink-0 ml-4">
                        View Details
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Academic Calendar Download Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#042f28] text-white border-2 border-amber-300/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Official Collegiate Almanac
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Download Full Academic Calendar (2026–2027)
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
              Approved by the Directorate of College Education Hyderabad, covering admission timelines, practical laboratory exams, winter/summer vacations, and national gazetted holidays.
            </p>
          </div>

          <a
            href="#digital-library"
            className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0 active:scale-95"
          >
            <Download className="w-4 h-4 text-emerald-950" />
            <span>Access Academic Schedule PDF</span>
          </a>
        </div>
      </div>

      {/* Event Details Inspection Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl text-left border border-stone-200 max-h-[90vh] overflow-y-auto space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {selectedEvent.categoryLabel}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#064b36] mt-1">
                  {selectedEvent.title}
                </h3>
                <span className="text-xs font-semibold text-stone-600 block mt-1">
                  {selectedEvent.displayDate}
                </span>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-stone-400 hover:text-stone-800 p-1.5 rounded-lg"
                aria-label="Close event details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Time, Venue & Organizer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Timing</span>
                  <span className="font-semibold text-stone-900">{selectedEvent.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Venue</span>
                  <span className="font-semibold text-stone-900">{selectedEvent.venue}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:col-span-2 pt-2 border-t border-stone-200">
                <Users className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Organizer &amp; Audience</span>
                  <span className="font-semibold text-stone-900">
                    {selectedEvent.organizer} · ({selectedEvent.targetAudience})
                  </span>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-700 mb-1">
                Event Agenda &amp; Overview:
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {selectedEvent.details}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-500 font-serif">
                Govt Girls Zubaida College Hyderabad
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 border border-stone-300 hover:bg-stone-100 rounded-lg font-medium text-stone-700"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    downloadIcs(selectedEvent);
                    setSelectedEvent(null);
                  }}
                  className="px-5 py-2 bg-[#064b36] hover:bg-[#042f28] text-white rounded-lg font-bold flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>Save to Calendar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
