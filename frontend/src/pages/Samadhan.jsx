import React, { useState } from 'react';
import { 
  Wrench, 
  AlertCircle, 
  Send, 
  ThumbsUp, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Layers,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import HellDeskAI from '../components/HellDeskAI';

export default function Samadhan({ user, reports, onAddReport, onUpvote, onNavigate }) {
  const [category, setCategory] = useState('Electrical');
  const [problem, setProblem] = useState('');
  const [hostel, setHostel] = useState(user.hostel || 'Hostel 12');
  const [room, setRoom] = useState(user.room || '214');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState('ALL');

  const categories = [
    'Electrical',
    'Plumbing',
    'Furniture',
    'Internet/LAN',
    'Housekeeping',
    'Mess/Food',
    'Laundry',
    'Security/Lost key',
    'Medical',
    'Other'
  ];

  const hostels = Array.from({ length: 16 }, (_, i) => `Hostel ${i + 1}`);

  // Duplicate detector
  const isDuplicateLikely = problem.toLowerCase().includes('ac') || problem.toLowerCase().includes('cooling') || problem.toLowerCase().includes('geyser');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!problem.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onAddReport({
        category,
        problem,
        hostel,
        room,
        note
      });
      setProblem('');
      setNote('');
      setIsSubmitting(false);
    }, 300);
  };

  const filteredReports = filter === 'ALL' 
    ? reports 
    : reports.filter(r => r.status === filter);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[#242832] pb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-950/70 border border-red-600/40 flex items-center justify-center text-red-500">
            <Wrench className="w-4 h-4" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-sans">
            SAMADHAN <span className="text-[#8e98a8] font-normal text-base">· Campus Fix-It & Escalation</span>
          </h1>
        </div>
        <p className="text-xs text-[#8e98a8] mt-1 font-mono">
          Report hostel infrastructure issues. Aggregated reports trigger automatic escalation to the Circles of Hell.
        </p>
      </div>

      {/* AI Assistance for Samadhan */}
      <HellDeskAI user={user} onNavigate={onNavigate} />

      {/* Main Grid: Form + Escalation Ladder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Report Filing Form */}
        <div className="lg:col-span-2 bg-[#14161b] border border-[#272b35] rounded-xl p-6 shadow-xl">
          <h2 className="text-base font-bold text-white font-mono uppercase mb-4 flex items-center gap-2">
            <span>Report a New Problem</span>
            <span className="text-xs font-normal text-red-400">· Fast Track</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#8e98a8] mb-1.5 uppercase tracking-wider">
                What's the problem? *
              </label>
              <input
                type="text"
                required
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="e.g. AC compressor not cooling, Geyser dead, LAN port broken..."
                className="w-full bg-[#0d0e12] border border-[#262a34] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#505869] focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Smart deduplication alert */}
            {isDuplicateLikely && (
              <div className="p-3 bg-red-950/30 border border-red-700/40 rounded-lg text-xs text-red-200 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">HELL DESK AI Pattern Match:</span> 7 similar reports for this category in {hostel} in the last 48 hours. Joining an existing report increases urgency without cluttering the maintenance log!
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#8e98a8] mb-1.5 uppercase">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0d0e12] border border-[#262a34] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 font-sans"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8e98a8] mb-1.5 uppercase">
                  Hostel
                </label>
                <select
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  className="w-full bg-[#0d0e12] border border-[#262a34] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 font-sans"
                >
                  {hostels.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8e98a8] mb-1.5 uppercase">
                  Room / Location
                </label>
                <input
                  type="text"
                  required
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="e.g. Room 214 or 2nd Fl Washroom"
                  className="w-full bg-[#0d0e12] border border-[#262a34] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#505869] focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8e98a8] mb-1.5 uppercase">
                Additional Details (Optional)
              </label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Give context (e.g. water temperature, tripping frequency, exam schedule urgency)..."
                className="w-full bg-[#0d0e12] border border-[#262a34] rounded-lg p-3 text-sm text-white placeholder-[#505869] focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-colors disabled:opacity-50 shadow-md shadow-red-950/40"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Transmitting..." : "Submit Incident Report"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Circles of Hell Escalation Philosophy */}
        <div className="bg-[#14161b] border border-[#272b35] rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold font-mono tracking-wider uppercase text-red-400 mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span>THE CIRCLES OF HELL (ESCALATION)</span>
            </h3>
            <p className="text-xs text-[#8e98a8] mb-4 leading-relaxed font-sans">
              No ticket gets buried in administrative bureaucracy. Tickets automatically climb the ladder:
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#0d0e12] border border-[#262a34] rounded-lg">
                <div className="flex items-center justify-between text-white font-bold mb-1">
                  <span>First Circle</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">0 - 24 Hours</span>
                </div>
                <div className="text-[#8e98a8] text-[11px]">Hostel Caretaker & On-duty Electrician / Plumber.</div>
              </div>

              <div className="p-3 bg-[#0d0e12] border border-amber-900/40 rounded-lg">
                <div className="flex items-center justify-between text-amber-300 font-bold mb-1">
                  <span>Second Circle</span>
                  <span className="text-[10px] text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded">After 24 Hours</span>
                </div>
                <div className="text-[#8e98a8] text-[11px]">Hostel Manager & Estate Maintenance Supervisor.</div>
              </div>

              <div className="p-3 bg-[#0d0e12] border border-red-900/40 rounded-lg">
                <div className="flex items-center justify-between text-red-400 font-bold mb-1">
                  <span>Ninth Circle</span>
                  <span className="text-[10px] text-red-300 bg-red-950/70 px-1.5 py-0.5 rounded">After 48 Hours</span>
                </div>
                <div className="text-[#8e98a8] text-[11px]">Chief Warden & Administrative Officer direct alert.</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#111317] rounded border border-[#20242d] text-[11px] text-[#6d7788]">
            Rule: Upvoting increases priority weighting in daily morning estate briefing.
          </div>
        </div>
      </div>

      {/* Reports Feed */}
      <div className="bg-[#14161b] border border-[#272b35] rounded-xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#232731]">
          <div>
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wide">
              Live Campus Incident Feed
            </h2>
            <p className="text-xs text-[#8e98a8] font-mono mt-0.5">
              Active tickets submitted by students across all hostels
            </p>
          </div>

          <div className="flex gap-2">
            {['ALL', 'OPEN', 'RESOLVED'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  filter === f
                    ? 'bg-red-600 text-white'
                    : 'bg-[#1e222a] text-[#8e98a8] hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="p-4 bg-[#0d0e12] border border-[#22262e] rounded-xl hover:border-[#383e4c] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded bg-[#1e232c] text-red-400 border border-[#2f3542]">
                    {report.category}
                  </span>
                  <span className="text-xs font-mono text-[#8e98a8]">
                    {report.hostel} · {report.room}
                  </span>
                  <span className="text-xs text-[#525b6a] font-mono">• {report.createdAt}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    report.status === 'OPEN' 
                      ? 'bg-amber-950/70 text-amber-300 border border-amber-800/40' 
                      : 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/40'
                  }`}>
                    {report.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white font-sans">
                  {report.problem}
                </h3>

                {report.note && (
                  <p className="text-xs text-[#8e98a8] font-sans">
                    {report.note}
                  </p>
                )}

                <div className="text-[11px] text-[#6d7788] font-mono pt-1">
                  Escalation Tier: <span className="text-[#a0aec0]">{report.circle}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => onUpvote(report.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#181c24] hover:bg-[#232936] border border-[#2c3240] text-xs font-mono font-bold text-[#cbd5e1] hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-red-400" />
                  <span>Facing this too ({report.upvotes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
