import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Samadhan from './pages/Samadhan';
import LenDen from './pages/LenDen';
import Aaj from './pages/Aaj';
import Disha from './pages/Disha';
import About from './pages/About';
import { api } from './services/api';
import { Menu, X, Flame } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [user, setUser] = useState(api.getUser());
  const [reports, setReports] = useState(api.getReports());
  const [items, setItems] = useState(api.getItems());
  const [events, setEvents] = useState(api.getEvents());
  const [places, setPlaces] = useState(api.getPlaces());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync state if user changes
  const handleToggleAuth = () => {
    const isCurrentlyLoggedIn = user.isLoggedIn;
    const nextUser = api.toggleDemoUser(isCurrentlyLoggedIn);
    setUser(nextUser);
  };

  const handleAddReport = (reportData) => {
    const newReport = api.createReport(reportData);
    setReports([newReport, ...reports]);
  };

  const handleUpvote = (id) => {
    const updated = api.upvoteReport(id);
    setReports(updated);
  };

  const handleAddItem = (itemData) => {
    const newItem = api.createItem(itemData);
    setItems([newItem, ...items]);
  };

  const handleToggleStatus = (id) => {
    const updated = api.toggleBorrowItem(id);
    setItems(updated);
  };

  const handleToggleAttend = (id) => {
    const updated = api.toggleAttendEvent(id);
    setEvents(updated);
  };

  const handleNavigate = (tab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#f1f5f9] flex flex-col md:flex-row font-sans selection:bg-red-900 selection:text-white">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#0e1013] border-b border-[#22262c] p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-500 animate-pulse" />
          <span className="font-extrabold text-white font-mono tracking-wider">HELL DESK</span>
          <span className="text-[10px] bg-red-950 text-red-400 border border-red-800/40 px-1.5 py-0.5 rounded font-mono">
            IIML
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg bg-[#181a1f] text-[#8e98a8] border border-[#272b34]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="w-72 h-full bg-[#0e1013]">
            <Sidebar
              currentTab={currentTab}
              setTab={handleNavigate}
              user={user}
              onToggleAuth={handleToggleAuth}
            />
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          currentTab={currentTab}
          setTab={handleNavigate}
          user={user}
          onToggleAuth={handleToggleAuth}
        />
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
        {currentTab === 'home' && (
          <Dashboard
            user={user}
            onNavigate={handleNavigate}
            reports={reports}
            items={items}
            events={events}
          />
        )}

        {currentTab === 'samadhan' && (
          <Samadhan
            user={user}
            reports={reports}
            onAddReport={handleAddReport}
            onUpvote={handleUpvote}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'lenden' && (
          <LenDen
            user={user}
            items={items}
            onAddItem={handleAddItem}
            onToggleStatus={handleToggleStatus}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'aaj' && (
          <Aaj
            user={user}
            events={events}
            onToggleAttend={handleToggleAttend}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'disha' && (
          <Disha
            user={user}
            places={places}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'about' && (
          <About user={user} />
        )}
      </main>
    </div>
  );
}
