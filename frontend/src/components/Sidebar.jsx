import React from 'react';
import { 
  Flame, 
  Home, 
  Wrench, 
  Repeat, 
  CalendarDays, 
  Compass, 
  Info, 
  LogOut, 
  UserCheck, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ currentTab, setTab, user, onToggleAuth }) {
  const navItems = [
    { id: 'home', label: 'HOME', icon: Home, desc: 'Dashboard & Briefing' },
    { id: 'samadhan', label: 'SAMADHAN', icon: Wrench, desc: 'Campus Fix-It', badge: 'Active' },
    { id: 'lenden', label: 'LEN-DEN', icon: Repeat, desc: 'Borrow & Lend', badge: 'Hot' },
    { id: 'aaj', label: 'AAJ', icon: CalendarDays, desc: 'Today & Deadlines' },
    { id: 'disha', label: 'DISHA', icon: Compass, desc: 'Campus Map & 24/7' },
    { id: 'about', label: 'ABOUT', icon: Info, desc: 'Philosophy & Rules' },
  ];

  return (
    <aside className="w-72 bg-[#0e1013] border-r border-[#22262c] flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-[#22262c]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-950/70 border border-red-600/40 flex items-center justify-center text-red-500 shadow-lg shadow-red-950/40">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-white text-lg font-mono">HELL DESK</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-red-900/60 text-red-300 border border-red-700/50">
                  AI v2.0
                </span>
              </div>
              <p className="text-xs text-[#8e98a8] font-mono tracking-tight">IIM LUCKNOW · 226013</p>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-[#717a8a] bg-[#14171c] p-2 rounded border border-[#1f232b]">
            <span className="text-red-400 font-semibold">Campus Survival Protocol:</span> Action over paperwork. 0 bureaucracy.
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-red-950/50 text-white border border-red-600/50 shadow-md shadow-red-950/20'
                    : 'text-[#9fa8b8] hover:bg-[#16181e] hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-red-400' : 'text-[#64748b]'}`} />
                  <div className="text-left">
                    <div className="font-mono tracking-wide">{item.label}</div>
                    <div className="text-[10px] font-normal text-[#64748b]">{item.desc}</div>
                  </div>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isActive ? 'bg-red-500 text-white' : 'bg-[#22262c] text-[#8e98a8]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Session Footer */}
      <div className="p-4 border-t border-[#22262c] bg-[#111317]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-800 to-amber-700 flex items-center justify-center font-bold text-white shadow-inner font-mono text-sm border border-red-500/30">
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate flex items-center gap-1.5">
              {user.name}
              {user.isLoggedIn && (
                <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 inline" />
              )}
            </h4>
            <p className="text-[11px] text-[#717a8a] truncate font-mono">{user.email}</p>
          </div>
        </div>

        <div className="bg-[#171a20] rounded p-2 text-[11px] border border-[#272b34] mb-3 flex items-center justify-between">
          <span className="text-[#8e98a8] font-mono">
            {user.isLoggedIn ? "Viewing as yourself" : "Demo Mode"}
          </span>
          <span className="text-amber-400 font-bold font-mono">⭐ {user.karma} Karma</span>
        </div>

        <button
          onClick={onToggleAuth}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded text-xs font-medium border border-[#2c323d] bg-[#161920] hover:bg-[#20242e] text-[#cbd5e1] transition-colors"
        >
          {user.isLoggedIn ? (
            <>
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Switch to Demo Mode</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Sign in with Google SSO</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
