import React, { useState } from 'react';
import { Sparkles, ArrowRight, CornerDownLeft, Bot, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function HellDeskAI({ user, onNavigate }) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const chips = [
    "Is anyone else facing the same AC problem?",
    "I need a black/navy blazer tomorrow",
    "Casio FC-200V calculator needed for quiz",
    "Where is Bodhigriha Room 204?",
    "Is Nescafé SAC open right now?"
  ];

  const handleQuery = (queryText) => {
    const q = queryText || input;
    if (!q.trim()) return;

    setLoading(true);
    setInput(q);
    setTimeout(() => {
      const res = api.queryAI(q, { hostel: user.hostel, program: user.program });
      setResponse(res);
      setLoading(false);
    }, 350);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleQuery();
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#181a20] to-[#121418] border border-[#2b303c] rounded-xl p-5 shadow-xl relative overflow-hidden mb-8">
      <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Context Indicator */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-red-400 font-mono font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HELL DESK AI</span>
          </div>
          <span className="text-[#49505f]">•</span>
          <span className="text-[#8e98a8] font-mono text-[11px]">
            ACTIVE CONTEXT: {user.program} · {user.hostel.toUpperCase()} · ROOM {user.room}
          </span>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded font-mono">
          REAL-TIME AGENT READY
        </span>
      </div>

      {/* Search Input Box */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything (e.g. 'AC dead', 'blazer size 40', 'Bodhigriha session', 'geyser issue')..."
          className="w-full bg-[#0b0d10] border border-[#272b34] rounded-lg px-4 py-3.5 text-sm text-white placeholder-[#5d6778] focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500 transition-all font-sans pr-24"
        />
        <button
          onClick={() => handleQuery()}
          disabled={loading}
          className="absolute right-2 px-3 py-2 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <span className="animate-spin text-xs">⏳</span>
          ) : (
            <>
              <span>Resolve</span>
              <CornerDownLeft className="w-3 h-3" />
            </>
          )}
        </button>
      </div>

      {/* Quick Action Chips */}
      <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-[11px] text-[#64748b] font-mono shrink-0">Try:</span>
        {chips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleQuery(chip)}
            className="text-[11px] bg-[#1a1d24] hover:bg-[#252a35] text-[#cbd5e1] border border-[#2e3340] px-2.5 py-1 rounded-full whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <span>{chip}</span>
          </button>
        ))}
      </div>

      {/* AI Response Card */}
      {response && (
        <div className="mt-4 p-4 bg-[#141820] border border-red-900/40 rounded-lg animate-fadeIn text-sm text-[#e2e8f0]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-950/80 border border-red-700/60 rounded-md text-red-400 shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="leading-relaxed font-sans text-sm">{response.answer}</p>
                <div className="mt-2 text-[11px] text-[#8e98a8] font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cross-verified with {user.hostel} reports & active inventories</span>
                </div>
              </div>
            </div>
            {response.action && (
              <button
                onClick={() => onNavigate(response.targetTab)}
                className="shrink-0 bg-red-600/90 hover:bg-red-500 text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-colors font-mono"
              >
                <span>{response.action}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
