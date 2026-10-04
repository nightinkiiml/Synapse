import React, { useState } from 'react';
import { 
  Repeat, 
  Plus, 
  MessageCircle, 
  Star, 
  Check, 
  Search, 
  ShieldCheck, 
  Clock, 
  X,
  ExternalLink
} from 'lucide-react';
import HellDeskAI from '../components/HellDeskAI';

export default function LenDen({ user, items, onAddItem, onToggleStatus, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('BROWSE');
  const [showModal, setShowModal] = useState(false);

  // Form state for lending an item
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('BLAZER & FORMALS');
  const [size, setSize] = useState('');
  const [emoji, setEmoji] = useState('🧥');
  const [note, setNote] = useState('');
  const [phone, setPhone] = useState('+91 98765 ');

  const categories = [
    'ALL',
    'CALCULATOR',
    'BLAZER & FORMALS',
    'BELT & TIE',
    'POWERBANK & CHARGERS',
    'BOOKS & CASES'
  ];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    onAddItem({
      name: itemName,
      category,
      size: size || 'Standard',
      emoji,
      note,
      phone
    });

    setItemName('');
    setSize('');
    setNote('');
    setShowModal(false);
  };

  const filteredItems = items.filter(item => {
    const matchCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.note.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTab = activeTab === 'BROWSE' 
      ? true 
      : activeTab === 'MY STUFF'
      ? item.owner === user.name
      : item.category === 'CALCULATOR' || item.category === 'BLAZER & FORMALS'; // Urgent items for quizzes & placements

    return matchCategory && matchSearch && matchTab;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#242832] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-950/70 border border-amber-600/40 flex items-center justify-center text-amber-500">
              <Repeat className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight font-sans">
              LEN-DEN <span className="text-[#8e98a8] font-normal text-base">· Peer-to-Peer Campus Lending</span>
            </h1>
          </div>
          <p className="text-xs text-[#8e98a8] mt-1 font-mono">
            Borrow blazers, ties, and Casio financial calculators in 10 minutes. Zero security deposit — guaranteed by Campus Karma.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-colors shadow-md shadow-red-950/40 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Lend an Item (+Karma)</span>
        </button>
      </div>

      {/* AI Assistant for LenDen */}
      <HellDeskAI user={user} onNavigate={onNavigate} />

      {/* Top Controls: Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Main Tabs */}
        <div className="flex bg-[#121418] p-1 rounded-lg border border-[#232731]">
          {['BROWSE', 'URGENT (EXAMS/PPO)', 'MY STUFF'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
                activeTab === tab
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-[#8e98a8] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items, sizes, or owners..."
            className="w-full bg-[#121418] border border-[#232731] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-[#505869] focus:outline-none focus:border-red-500"
          />
          <Search className="w-4 h-4 text-[#505869] absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-[#2a303c] text-white border border-red-500/50 font-bold'
                : 'bg-[#14161b] text-[#8e98a8] hover:text-white border border-[#232731]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#14161b] border border-[#272b35] hover:border-[#383e4c] rounded-xl p-5 shadow-lg flex flex-col justify-between transition-all group"
          >
            <div>
              {/* Item Card Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="text-2xl p-2.5 rounded-xl bg-[#0f1115] border border-[#22262e]">
                  {item.emoji}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-amber-400 font-bold flex items-center gap-1 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/30">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{item.karma} Karma</span>
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    item.status === 'AVAILABLE'
                      ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/40'
                      : 'bg-red-950/70 text-red-300 border border-red-800/40'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Title & Category */}
              <div className="text-[10px] font-mono text-red-400 uppercase tracking-wider mb-0.5">
                {item.category}
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-[#8e98a8] mb-3">
                {item.size} · {item.note}
              </p>

              {/* Owner details */}
              <div className="p-2.5 rounded-lg bg-[#0e1014] border border-[#20242c] text-xs text-[#cbd5e1] font-mono mb-4 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold">{item.owner}</span>
                  <div className="text-[11px] text-[#717a8a]">{item.hostel} · Room {item.room}</div>
                </div>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#22262e]">
              <a
                href={`https://wa.me/919876543210?text=Hi%20${encodeURIComponent(item.owner)},%20saw%20your%20${encodeURIComponent(item.name)}%20on%20Hell%20Desk.%20Is%20it%20available%20to%20borrow?`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Contact Owner</span>
              </a>

              {/* Toggle status for demo purposes */}
              <button
                onClick={() => onToggleStatus(item.id)}
                title="Toggle Available/Borrowed state"
                className="p-2 rounded-lg bg-[#1a1d24] hover:bg-[#252a34] text-[#8e98a8] hover:text-white border border-[#2a303c] transition-colors"
              >
                <Repeat className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Lend an item */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#14161b] border border-[#2e3340] rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-[#8e98a8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white font-mono uppercase mb-1">
              Lend an Item to Campus Peers
            </h3>
            <p className="text-xs text-[#8e98a8] mb-4">
              Help a batchmate with an urgent placement interview or end-term quiz.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#8e98a8] mb-1">Item Title *</label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Navy Blue Blazer (Park Avenue), Casio FC-200V"
                  className="w-full bg-[#0d0e12] border border-[#262a34] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#8e98a8] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0d0e12] border border-[#262a34] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 font-sans"
                  >
                    <option value="BLAZER & FORMALS">BLAZER & FORMALS</option>
                    <option value="CALCULATOR">CALCULATOR</option>
                    <option value="BELT & TIE">BELT & TIE</option>
                    <option value="POWERBANK & CHARGERS">POWERBANK & CHARGERS</option>
                    <option value="BOOKS & CASES">BOOKS & CASES</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8e98a8] mb-1">Size / Variant</label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="e.g. 40 Slim Fit / 20k mAh"
                    className="w-full bg-[#0d0e12] border border-[#262a34] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8e98a8] mb-1">Borrowing Note / Return rules</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Return before 11 PM tonight, dry cleaned"
                  className="w-full bg-[#0d0e12] border border-[#262a34] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded text-xs font-mono text-[#8e98a8] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-mono font-bold"
                >
                  Post to Len-Den
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
