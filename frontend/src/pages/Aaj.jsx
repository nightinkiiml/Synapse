import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Users, 
  CalendarPlus, 
  Check, 
  Sparkles,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import HellDeskAI from '../components/HellDeskAI';

export default function Aaj({ user, events, onToggleAttend, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = [
    'ALL',
    'ACADEMIC',
    'CLUB',
    'SPORTS',
    'GUEST LECTURE',
    'DEADLINE'
  ];

  const filteredEvents = activeCategory === 'ALL'
    ? events
    : events.filter(e => e.category === activeCategory);

  // Group events by timeframe
  const liveNow = filteredEvents.filter(e => e.timeframe === 'LIVE NOW');
  const laterToday = filteredEvents.filter(e => e.timeframe === 'LATER TODAY');
  const tomorrow = filteredEvents.filter(e => e.timeframe === 'TOMORROW');

  // Google Calendar deep link generator
  const getGoogleCalendarUrl = (ev) => {
    const title = encodeURIComponent(ev.title + " - IIM Lucknow");
    const details = encodeURIComponent(ev.description + "\n\nOrganized by: " + ev.club + " via Hell Desk");
    const location = encodeURIComponent(ev.venue + ", IIM Lucknow");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  const renderEventCard = (ev) => (
    <div
      key={ev.id}
      className={`p-5 rounded-xl border transition-all ${
        ev.timeframe === 'LIVE NOW'
          ? 'bg-[#181514] border-red-700/60 shadow-lg shadow-red-950/20'
          : ev.category === 'DEADLINE'
          ? 'bg-[#181418] border-amber-800/50'
          : 'bg-[#14161b] border-[#272b35] hover:border-[#383e4c]'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#202530] text-[#cbd5e1] border border-[#2d3342] uppercase tracking-wider">
            {ev.club}
          </span>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
            ev.category === 'DEADLINE'
              ? 'bg-red-950/80 text-red-300 border border-red-700/50'
              : 'bg-blue-950/70 text-blue-300 border border-blue-800/40'
          }`}>
            {ev.category}
          </span>
          {ev.timeframe === 'LIVE NOW' && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 animate-pulse">
              ● LIVE
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-[#8e98a8]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-white font-semibold">{ev.time}</span>
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>{ev.venue}</span>
          </span>
        </div>
      </div>

      <h3 className="text-base font-bold text-white mb-1.5 font-sans">
        {ev.title}
      </h3>
      <p className="text-xs text-[#8e98a8] mb-4 leading-relaxed font-sans">
        {ev.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-[#22262e] text-xs font-mono">
        <div className="text-[#717a8a] flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          <span>{ev.attendees} PGP students going</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Calendar Deep Link */}
          <a
            href={getGoogleCalendarUrl(ev)}
            target="_blank"
            rel="noreferrer"
            className="px-2.5 py-1.5 rounded-lg bg-[#1a1d24] hover:bg-[#262c37] border border-[#2b313e] text-[#cbd5e1] hover:text-white flex items-center gap-1 transition-colors"
            title="Add to Google Calendar"
          >
            <CalendarPlus className="w-3.5 h-3.5 text-amber-400" />
            <span>GCal</span>
          </a>

          {/* Attend RSVP button */}
          <button
            onClick={() => onToggleAttend(ev.id)}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
              ev.isAttending
                ? 'bg-emerald-600/90 text-white'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-sm'
            }`}
          >
            {ev.isAttending ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>I'm Going</span>
              </>
            ) : (
              <span>RSVP</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[#242832] pb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950/70 border border-emerald-600/40 flex items-center justify-center text-emerald-500">
            <CalendarDays className="w-4 h-4" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-sans">
            AAJ <span className="text-[#8e98a8] font-normal text-base">· Today on Campus & Deadlines</span>
          </h1>
        </div>
        <p className="text-xs text-[#8e98a8] mt-1 font-mono">
          Single synchronized dashboard for Bodhigriha room schedules, club meetings, and midnight term deadlines.
        </p>
      </div>

      {/* Hell Desk AI */}
      <HellDeskAI user={user} onNavigate={onNavigate} />

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-red-600 text-white font-bold'
                : 'bg-[#14161b] text-[#8e98a8] hover:text-white border border-[#232731]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Section 1: Live Now */}
      {liveNow.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>Happening Right Now</span>
          </div>
          <div className="space-y-3">
            {liveNow.map(renderEventCard)}
          </div>
        </div>
      )}

      {/* Section 2: Later Today */}
      {laterToday.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Later Today & Deadlines</span>
          </div>
          <div className="space-y-3">
            {laterToday.map(renderEventCard)}
          </div>
        </div>
      )}

      {/* Section 3: Tomorrow */}
      {tomorrow.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8e98a8] uppercase tracking-wider">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Scheduled for Tomorrow</span>
          </div>
          <div className="space-y-3">
            {tomorrow.map(renderEventCard)}
          </div>
        </div>
      )}
    </div>
  );
}
