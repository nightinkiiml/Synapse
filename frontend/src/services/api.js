// Centralized API Client with Offline Resilience & Realistic IIM Lucknow Campus Seed Data

const STORAGE_KEYS = {
  REPORTS: 'helldesk_reports_v1',
  ITEMS: 'helldesk_items_v1',
  EVENTS: 'helldesk_events_v1',
  USER: 'helldesk_user_v1'
};

// Seed Data matching Hell Desk app
const SEED_USER = {
  name: "TUHIN MONDAL",
  email: "pgp42450@iiml.ac.in",
  program: "PGP-1",
  hostel: "Hostel 12",
  room: "214",
  isLoggedIn: true,
  karma: 14
};

const SEED_DEMO_USER = {
  name: "Aarav Menon",
  email: "aarav.menon@iiml.ac.in",
  program: "PGP-1",
  hostel: "Hostel 12",
  room: "108",
  isLoggedIn: false,
  karma: 7
};

const SEED_REPORTS = [
  {
    id: "rep-101",
    category: "Electrical",
    problem: "AC not cooling in mid wing",
    hostel: "Hostel 12",
    room: "214",
    note: "Compressor trips every 15 minutes. Temperature inside room is 32°C. 4th time reporting this week.",
    status: "OPEN",
    circle: "Second Circle — Hostel Manager",
    upvotes: 7,
    createdAt: "4h ago",
    reportedBy: "TUHIN MONDAL"
  },
  {
    id: "rep-102",
    category: "Plumbing",
    problem: "Geyser dead in 2nd floor common washroom",
    hostel: "Hostel 12",
    room: "Washroom 2B",
    note: "No hot water since yesterday 6 AM. PGP-1 morning classes start at 8:00 AM.",
    status: "OPEN",
    circle: "First Circle — Hostel Caretaker",
    upvotes: 12,
    createdAt: "1d ago",
    reportedBy: "Aarav Menon"
  },
  {
    id: "rep-103",
    category: "Internet/LAN",
    problem: "LAN port dead in Room 311",
    hostel: "Hostel 14",
    room: "311",
    note: "CC ticket created (#48921). Still no response, switch light is red.",
    status: "RESOLVED",
    circle: "Resolved by CC Engineer",
    upvotes: 2,
    createdAt: "2d ago",
    reportedBy: "Rhea Sen"
  }
];

const SEED_ITEMS = [
  {
    id: "item-1",
    name: "Navy Blazer (Van Heusen)",
    category: "BLAZER & FORMALS",
    size: "Size 40 (Slim Fit)",
    emoji: "🧥",
    owner: "Ishita Rao",
    hostel: "Hostel 8",
    room: "112",
    status: "AVAILABLE",
    karma: 7,
    phone: "+91 98765 43210",
    note: "Dry cleaned last week. Return before 11 PM."
  },
  {
    id: "item-2",
    name: "Casio FC-200V Financial Calculator",
    category: "CALCULATOR",
    size: "Standard",
    emoji: "🔢",
    owner: "Kabir Mehta",
    hostel: "Hostel 12",
    room: "305",
    status: "AVAILABLE",
    karma: 15,
    phone: "+91 98765 43211",
    note: "Required for Corporate Finance quiz. Please don't erase stored cashflows."
  },
  {
    id: "item-3",
    name: "Silk Formal Tie (Maroon & Navy)",
    category: "BELT & TIE",
    size: "Free Size",
    emoji: "👔",
    owner: "Devansh Nair",
    hostel: "Hostel 15",
    room: "219",
    status: "BORROWED",
    karma: 4,
    phone: "+91 98765 43212",
    note: "Available again tomorrow morning."
  },
  {
    id: "item-4",
    name: "Mi 20000mAh Power Bank (Fast Charging)",
    category: "POWERBANK & CHARGERS",
    size: "20,000 mAh",
    emoji: "🔋",
    owner: "Sneha Mukherjee",
    hostel: "Hostel 11",
    room: "104",
    status: "AVAILABLE",
    karma: 9,
    phone: "+91 98765 43213",
    note: "Comes with Type-C and Lightning cables."
  },
  {
    id: "item-5",
    name: "Financial Management - Prasanna Chandra (10th Ed)",
    category: "BOOKS & CASES",
    size: "Hardcover Book",
    emoji: "📚",
    owner: "Rohit Bansal",
    hostel: "Hostel 16",
    room: "402",
    status: "AVAILABLE",
    karma: 12,
    phone: "+91 98765 43214",
    note: "Chapters 6, 7 and 9 highlighted. Perfect for end terms."
  },
  {
    id: "item-6",
    name: "Formal Leather Belt (Black, Reversible)",
    category: "BELT & TIE",
    size: "Waist 32-36",
    emoji: "🧳",
    owner: "Aditya Verma",
    hostel: "Hostel 12",
    room: "208",
    status: "AVAILABLE",
    karma: 6,
    phone: "+91 98765 43215",
    note: "Clean buckle, suitable for PPO and GD presentations."
  }
];

const SEED_EVENTS = [
  {
    id: "ev-1",
    club: "CREDENCE CAPITAL",
    title: "Weekly Markets Meetup & Valuation Drill",
    category: "CLUB",
    venue: "Bodhigriha, Room 204",
    time: "8:00 AM – 9:30 AM",
    timeframe: "LIVE NOW",
    attendees: 38,
    description: "Deep dive into Nifty earnings season, FMCG multiples, and quick LBO sanity checks before term quiz.",
    isAttending: true
  },
  {
    id: "ev-2",
    club: "ACADEMIC COUNCIL",
    title: "Economics Mid-Term Case Submission Deadline",
    category: "DEADLINE",
    venue: "Portal Upload / Moodle",
    time: "11:59 PM Tonight",
    timeframe: "LATER TODAY",
    attendees: 490,
    description: "Strict 11:59:59 PM deadline. Late submission penalty: 1 grade letter per 15 minutes.",
    isAttending: true
  },
  {
    id: "ev-3",
    club: "SYNAPSE · TECH COMMITTEE",
    title: "Antigravity IDE & Product Hackathon Pitch Prep",
    category: "CLUB",
    venue: "Gyanodaya Auditorium 2",
    time: "4:00 PM – 6:00 PM",
    timeframe: "LATER TODAY",
    attendees: 112,
    description: "Walkthrough of Overtures Round 2 submission rules, architecture best practices, and prototype demos.",
    isAttending: false
  },
  {
    id: "ev-4",
    club: "SPORTS COUNCIL",
    title: "Inter-Hostel Futsal Tournament (Hostel 12 vs 14)",
    category: "SPORTS",
    venue: "Student Sports Complex",
    time: "7:00 PM Tonight",
    timeframe: "LATER TODAY",
    attendees: 85,
    description: "Group stage match under floodlights. High stakes hostel rivalry.",
    isAttending: false
  },
  {
    id: "ev-5",
    club: "INDUSTRY INTERACTION CELL",
    title: "Leadership Talk: Managing Volatility at Scale",
    category: "GUEST LECTURE",
    venue: "Bodhigriha Auditorium",
    time: "10:00 AM Tomorrow",
    timeframe: "TOMORROW",
    attendees: 230,
    description: "Keynote address by Managing Director, Bain & Company. Formal dress code mandatory.",
    isAttending: false
  }
];

const SEED_PLACES = [
  { id: "pl-1", name: "Bodhigriha Academic Block", category: "ACADEMIC", hours: "7:00 AM – 1:00 AM", lat: 26.9212, lng: 80.9392, desc: "Lecture theaters, faculty offices, air-conditioned seminar halls." },
  { id: "pl-2", name: "Gyanodaya Central Library", category: "LIBRARY", hours: "8:00 AM – 2:00 AM", lat: 26.9205, lng: 80.9405, desc: "3 floors of study carrels, Bloomberg terminals, quiet reading zones." },
  { id: "pl-3", name: "Hostel 12 (PGP-1)", category: "HOSTEL", hours: "24/7 Access", lat: 26.9225, lng: 80.9380, desc: "First-year boys hostel with common room and table tennis." },
  { id: "pl-4", name: "Hostel 14 (PGP-1)", category: "HOSTEL", hours: "24/7 Access", lat: 26.9232, lng: 80.9385, desc: "First-year residence with active night study rooms." },
  { id: "pl-5", name: "Hostel 8 (PGP)", category: "HOSTEL", hours: "24/7 Access", lat: 26.9198, lng: 80.9372, desc: "Girls residence near student activity center." },
  { id: "pl-6", name: "Samadhan Maintenance Office", category: "ADMIN", hours: "9:00 AM – 5:30 PM", lat: 26.9190, lng: 80.9412, desc: "Estate & civil works, electrician desk, sanitation supervisors." },
  { id: "pl-7", name: "Nescafé Point (Sac)", category: "MESS & CAFÉS", hours: "9:00 AM – 3:30 AM", lat: 26.9210, lng: 80.9400, desc: "Iced tea, hot coffee, cold coffee, Maggi, patties, 3 AM survival hub." },
  { id: "pl-8", name: "Central Mess 1", category: "MESS & CAFÉS", hours: "Breakfast 7:30-9:30, Lunch 12:30-2:30, Dinner 7:30-9:30", lat: 26.9220, lng: 80.9390, desc: "Daily student mess run by student mess committee." },
  { id: "pl-9", name: "Sports Complex & Gymnasium", category: "SPORTS", hours: "6:00 AM – 10:00 PM", lat: 26.9185, lng: 80.9385, desc: "Badminton courts, gym, squash, swimming pool." },
  { id: "pl-10", name: "Campus Health Centre", category: "MEDICAL", hours: "24/7 Emergency, Doctor 9 AM – 5 PM", lat: 26.9178, lng: 80.9420, desc: "Campus doctor, basic pharmacy, emergency ambulance dispatch." },
  { id: "pl-11", name: "SBI ATM & Cooperative Store", category: "SHOPS & ATM", hours: "ATM 24/7, Store 10 AM – 9 PM", lat: 26.9200, lng: 80.9425, desc: "Stationery, toiletries, snacks, daily provisions." },
  { id: "pl-12", name: "Main Campus Gate (Auto Stand)", category: "GATE & AUTO", hours: "24/7 Gate", lat: 26.9165, lng: 80.9430, desc: "Prabandh Nagar gate, auto rickshaws to Charbagh / Hazratganj." }
];

// Helper to access LocalStorage safely
function getLocal(key, defaultVal) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setLocal(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn("Storage error", e);
  }
}

export const api = {
  // Auth state
  getUser() {
    return getLocal(STORAGE_KEYS.USER, SEED_USER);
  },
  setUser(user) {
    setLocal(STORAGE_KEYS.USER, user);
    return user;
  },
  toggleDemoUser(isDemo) {
    const user = isDemo ? SEED_DEMO_USER : SEED_USER;
    setLocal(STORAGE_KEYS.USER, user);
    return user;
  },

  // Samadhan (Fix-It)
  getReports() {
    return getLocal(STORAGE_KEYS.REPORTS, SEED_REPORTS);
  },
  createReport(reportData) {
    const reports = this.getReports();
    const newReport = {
      id: "rep-" + Date.now().toString().slice(-4),
      category: reportData.category || "General",
      problem: reportData.problem || "Unspecified issue",
      hostel: reportData.hostel || "Hostel 12",
      room: reportData.room || "Room 214",
      note: reportData.note || "",
      status: "OPEN",
      circle: "First Circle — Hostel Caretaker",
      upvotes: 1,
      createdAt: "Just now",
      reportedBy: this.getUser().name
    };
    const updated = [newReport, ...reports];
    setLocal(STORAGE_KEYS.REPORTS, updated);
    return newReport;
  },
  upvoteReport(id) {
    const reports = this.getReports().map(r => {
      if (r.id === id) {
        return { ...r, upvotes: r.upvotes + 1 };
      }
      return r;
    });
    setLocal(STORAGE_KEYS.REPORTS, reports);
    return reports;
  },

  // Len-Den (Borrow)
  getItems() {
    return getLocal(STORAGE_KEYS.ITEMS, SEED_ITEMS);
  },
  createItem(itemData) {
    const items = this.getItems();
    const user = this.getUser();
    const newItem = {
      id: "item-" + Date.now().toString().slice(-4),
      name: itemData.name,
      category: itemData.category || "GENERAL",
      size: itemData.size || "Standard",
      emoji: itemData.emoji || "📦",
      owner: user.name,
      hostel: user.hostel,
      room: user.room,
      status: "AVAILABLE",
      karma: user.karma || 10,
      phone: itemData.phone || "+91 98765 00000",
      note: itemData.note || "Available on request."
    };
    const updated = [newItem, ...items];
    setLocal(STORAGE_KEYS.ITEMS, updated);
    return newItem;
  },
  toggleBorrowItem(id) {
    const items = this.getItems().map(item => {
      if (item.id === id) {
        const nextStatus = item.status === "AVAILABLE" ? "BORROWED" : "AVAILABLE";
        return { ...item, status: nextStatus };
      }
      return item;
    });
    setLocal(STORAGE_KEYS.ITEMS, items);
    return items;
  },

  // Aaj (Events)
  getEvents() {
    return getLocal(STORAGE_KEYS.EVENTS, SEED_EVENTS);
  },
  toggleAttendEvent(id) {
    const events = this.getEvents().map(ev => {
      if (ev.id === id) {
        const isAttending = !ev.isAttending;
        return {
          ...ev,
          isAttending,
          attendees: isAttending ? ev.attendees + 1 : ev.attendees - 1
        };
      }
      return ev;
    });
    setLocal(STORAGE_KEYS.EVENTS, events);
    return events;
  },

  // Disha (Places)
  getPlaces() {
    return SEED_PLACES;
  },

  // AI Assistant Query
  queryAI(prompt, context = {}) {
    const p = prompt.toLowerCase();
    
    if (p.includes("blazer") || p.includes("formal") || p.includes("coat")) {
      return {
        answer: "Found 1 Navy Blazer (Size 40) available in Hostel 8 with Ishita Rao (⭐ 7 Karma). Devansh in Hostel 15 also has a maroon tie if needed for placements.",
        action: "Go to LEN-DEN",
        targetTab: "lenden",
        confidence: 0.98
      };
    }
    
    if (p.includes("calculator") || p.includes("fc-200") || p.includes("casio")) {
      return {
        answer: "Casio FC-200V is available right in your hostel (Hostel 12, Room 305 with Kabir Mehta). Tap below to request.",
        action: "Borrow Calculator",
        targetTab: "lenden",
        confidence: 0.99
      };
    }
    
    if (p.includes("ac") || p.includes("cooling") || p.includes("geyser") || p.includes("plumbing") || p.includes("water") || p.includes("samadhan")) {
      return {
        answer: "7 similar reports logged for AC not cooling in Hostel 12 over the last 48 hours. This has escalated to the 2nd Circle (Hostel Manager). Upvoting your report now.",
        action: "View in SAMADHAN",
        targetTab: "samadhan",
        confidence: 0.95
      };
    }

    if (p.includes("today") || p.includes("bodhigriha") || p.includes("schedule") || p.includes("event") || p.includes("quiz")) {
      return {
        answer: "Credence Capital Markets Meetup is LIVE NOW at Bodhigriha Room 204. Economics Case submission is due at 11:59 PM sharp tonight.",
        action: "Open AAJ Schedule",
        targetTab: "aaj",
        confidence: 0.96
      };
    }

    if (p.includes("coffee") || p.includes("nescafe") || p.includes("maggi") || p.includes("library") || p.includes("atm")) {
      return {
        answer: "Nescafé Point at SAC is open till 3:30 AM tonight. Gyanodaya Library is open till 2:00 AM. SBI ATM is functioning normally.",
        action: "View on DISHA Map",
        targetTab: "disha",
        confidence: 0.97
      };
    }

    return {
      answer: `Analyzing "${prompt}" against IIML campus knowledge base. Best course of action: check SAMADHAN if it's broken, LEN-DEN if you need to borrow it, or AAJ for schedules.`,
      action: "Explore Campus",
      targetTab: "home",
      confidence: 0.85
    };
  }
};
