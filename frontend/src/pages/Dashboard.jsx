import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Wrench, 
  Repeat, 
  Calendar, 
  MapPin, 
  ArrowUpRight, 
  Clock, 
  ShieldCheck, 
  TrendingUp,
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import HellDeskAI from '../components/HellDeskAI';

export default function Dashboard({ user, onNavigate, reports, items, events }) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselItems = [
    {
      tag: "CAMPUS LORE",
      title: "Welcome to Hell — Survival 101",
      subtitle: "Where PGP lives on caffeine, 8:00 AM quizzes, and midnight case dilemmas.",
      badge: "TRADITION",
      gradient: "from-red-950/80 via-[#1c1214] to-[#121417]"
    },
    {
      tag: "MERI HOSTEL",
      title: "Hostel 12 Maintenance Dispatch",
      subtitle: "Water motor serviced today. 2nd floor geyser escalation in progress.",
      badge: "ESTATE NOTICE",
      gradient: "from-amber-950/80 via-[#1c1712] to-[#121417]"
    },
    {
      tag: "OVERTURES 2026",
      title: "Round 2 MVP Build Active",
      subtitle: "Team SynapsE evaluation portal ready. Pitch deck and live demo synchronized.",
      badge: "HACKATHON",
      gradient: "from-blue-950/80 via-[#12161f] to-[#121417]"
    }
  ];

  const openReportsCount = reports.filter(r => r.status === 'OPEN').length;
  const lentCount = items.filter(i => i.status === 'BORROWED' && i.owner === user.name).length;
  const borrowedCount = 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner & Greeting */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#242832] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-mono text-emerald-400 tracking-wider font-semibold">
              CONNECTED TO IIM LUCKNOW NETWORK
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-sans">
            Good morning, <span className="text-red-500 uppercase">{user.name}</span>.
          </h1>
          <p className="text-sm text-[#8e98a8] mt-1 font-mono">
            {user.program} · {user.hostel} · Room {user.room} · Still here.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-lg bg-[#15181f] border border-[#272b35] text-xs font-mono text-[#cbd5e1] flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Term 3 · Week 6</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-lg bg-red-950/40 border border-red-800/40 text-xs font-mono text-red-300 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>Circles of Hell: Active</span>
          </div>
        </div>
      </div>

      {/* Hell Desk AI Command Bar */}
      <HellDeskAI user={user} onNavigate={onNavigate} />

      {/* Carousel / Campus Highlights */}
      <div className="relative overflow-hidden rounded-xl border border-[#2b303c] bg-[#121418] p-6 shadow-xl">
        <div className={`p-6 rounded-lg bg-gradient-to-r ${carouselItems[carouselIndex].gradient} border border-[#2c3240]`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-red-400 uppercase">
              {carouselItems[carouselIndex].tag}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-[#cbd5e1] border border-white/10">
              {carouselItems[carouselIndex].badge}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1 font-sans">
            {carouselItems[carouselIndex].title}
          </h3>
          <p className="text-sm text-[#cbd5e1] max-w-2xl font-sans">
            {carouselItems[carouselIndex].subtitle}
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-between mt-3 text-xs text-[#64748b] font-mono">
          <div className="flex gap-1.5">
            {carouselItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCarouselIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  carouselIndex === idx ? 'bg-red-500 w-6' : 'bg-[#2b303c]'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : carouselItems.length - 1))}
              className="p-1.5 rounded bg-[#1c2028] hover:bg-[#282e3a] text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCarouselIndex((prev) => (prev < carouselItems.length - 1 ? prev + 1 : 0))}
              className="p-1.5 rounded bg-[#1c2028] hover:bg-[#282e3a] text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Happening Now Banner */}
      <div className="bg-[#13161c] border border-amber-900/40 rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-950/60 border border-amber-600/40 flex items-center justify-center text-amber-400 shrink-0">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-amber-900/50 text-amber-300 border border-amber-700/50">
                LIVE NOW ON CAMPUS
              </span>
              <span className="text-xs text-[#8e98a8] font-mono">Bodhigriha, Room 204</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Weekly Markets Meetup & Corporate Valuation Drill
            </h3>
            <p className="text-xs text-[#94a3b8] mt-0.5">
              Organized by Credence Capital · 38 PGP attendees checked in
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('aaj')}
          className="shrink-0 px-4 py-2 bg-amber-600/90 hover:bg-amber-500 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
        >
          <span>View Aaj Schedule</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* My Stuff: Status Counters */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white font-mono uppercase tracking-wide">
            My Stuff & Activity
          </h2>
          <span className="text-xs text-[#64748b] font-mono">Real-time status</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Open reports */}
          <div
            onClick={() => onNavigate('samadhan')}
            className="cursor-pointer bg-[#14161b] hover:bg-[#1a1e25] border border-[#272b35] hover:border-red-600/50 p-5 rounded-xl transition-all shadow-md group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-[#8e98a8]">OPEN REPORTS</span>
              <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-700/40 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <Wrench className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{openReportsCount}</div>
            <p className="text-xs text-red-400/90 mt-2 flex items-center gap-1">
              <span>{openReportsCount > 0 ? "Issues currently escalating" : "All issues resolved"}</span>
              <ArrowUpRight className="w-3 h-3" />
            </p>
          </div>

          {/* Card 2: Items Lent */}
          <div
            onClick={() => onNavigate('lenden')}
            className="cursor-pointer bg-[#14161b] hover:bg-[#1a1e25] border border-[#272b35] hover:border-amber-600/50 p-5 rounded-xl transition-all shadow-md group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-[#8e98a8]">ITEMS I'VE LENT OUT</span>
              <div className="w-8 h-8 rounded-lg bg-amber-950/60 border border-amber-700/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Repeat className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{lentCount}</div>
            <p className="text-xs text-amber-400/90 mt-2 flex items-center gap-1">
              <span>Peer lending karma building</span>
              <ArrowUpRight className="w-3 h-3" />
            </p>
          </div>

          {/* Card 3: Items Borrowed */}
          <div
            onClick={() => onNavigate('lenden')}
            className="cursor-pointer bg-[#14161b] hover:bg-[#1a1e25] border border-[#272b35] hover:border-blue-600/50 p-5 rounded-xl transition-all shadow-md group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-[#8e98a8]">ITEMS BORROWED</span>
              <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-700/40 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{borrowedCount}</div>
            <p className="text-xs text-blue-400/90 mt-2 flex items-center gap-1">
              <span>0 overdue items</span>
              <ArrowUpRight className="w-3 h-3" />
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate('samadhan')}
          className="p-4 rounded-xl bg-[#14161b] hover:bg-[#1c2027] border border-[#272b35] text-left transition-all"
        >
          <div className="text-red-400 mb-2">
            <Wrench className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-white font-mono">SAMADHAN</div>
          <div className="text-[11px] text-[#717a8a] mt-0.5">File hostel fix-it complaint</div>
        </button>

        <button
          onClick={() => onNavigate('lenden')}
          className="p-4 rounded-xl bg-[#14161b] hover:bg-[#1c2027] border border-[#272b35] text-left transition-all"
        >
          <div className="text-amber-400 mb-2">
            <Repeat className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-white font-mono">LEN-DEN</div>
          <div className="text-[11px] text-[#717a8a] mt-0.5">Borrow blazers & calculators</div>
        </button>

        <button
          onClick={() => onNavigate('aaj')}
          className="p-4 rounded-xl bg-[#14161b] hover:bg-[#1c2027] border border-[#272b35] text-left transition-all"
        >
          <div className="text-emerald-400 mb-2">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-white font-mono">AAJ</div>
          <div className="text-[11px] text-[#717a8a] mt-0.5">Campus schedules & deadlines</div>
        </button>

        <button
          onClick={() => onNavigate('disha')}
          className="p-4 rounded-xl bg-[#14161b] hover:bg-[#1c2027] border border-[#272b35] text-left transition-all"
        >
          <div className="text-sky-400 mb-2">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-white font-mono">DISHA</div>
          <div className="text-[11px] text-[#717a8a] mt-0.5">Interactive campus map</div>
        </button>
      </div>
    </div>
  );
}
