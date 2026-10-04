import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'helldesk.db');

// Connect to SQLite Database
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL'); // High concurrency performance

// 1. Initialize Relational Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    program TEXT NOT NULL,
    hostel TEXT NOT NULL,
    room TEXT NOT NULL,
    karma INTEGER DEFAULT 10,
    isLoggedIn INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    problem TEXT NOT NULL,
    hostel TEXT NOT NULL,
    room TEXT NOT NULL,
    note TEXT,
    status TEXT DEFAULT 'OPEN',
    circle TEXT DEFAULT 'First Circle — Hostel Caretaker',
    upvotes INTEGER DEFAULT 1,
    reportedBy TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    size TEXT,
    emoji TEXT DEFAULT '📦',
    owner TEXT NOT NULL,
    hostel TEXT NOT NULL,
    room TEXT NOT NULL,
    status TEXT DEFAULT 'AVAILABLE',
    karma INTEGER DEFAULT 10,
    phone TEXT,
    note TEXT
  );

  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    club TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    venue TEXT NOT NULL,
    time TEXT NOT NULL,
    timeframe TEXT NOT NULL,
    attendees INTEGER DEFAULT 0,
    description TEXT,
    isAttending INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS places (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    hours TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    desc TEXT
  );
`);

// 2. Auto-Seed Initial Campus Data if empty
const countUsers = db.prepare('SELECT count(*) as count FROM users').get().count;

if (countUsers === 0) {
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, program, hostel, room, karma, isLoggedIn)
    VALUES (@id, @name, @email, @program, @hostel, @room, @karma, @isLoggedIn)
  `);

  const insertReport = db.prepare(`
    INSERT INTO reports (id, category, problem, hostel, room, note, status, circle, upvotes, reportedBy, createdAt)
    VALUES (@id, @category, @problem, @hostel, @room, @note, @status, @circle, @upvotes, @reportedBy, @createdAt)
  `);

  const insertItem = db.prepare(`
    INSERT INTO items (id, name, category, size, emoji, owner, hostel, room, status, karma, phone, note)
    VALUES (@id, @name, @category, @size, @emoji, @owner, @hostel, @room, @status, @karma, @phone, @note)
  `);

  const insertEvent = db.prepare(`
    INSERT INTO events (id, club, title, category, venue, time, timeframe, attendees, description, isAttending)
    VALUES (@id, @club, @title, @category, @venue, @time, @timeframe, @attendees, @description, @isAttending)
  `);

  const insertPlace = db.prepare(`
    INSERT INTO places (id, name, category, hours, lat, lng, desc)
    VALUES (@id, @name, @category, @hours, @lat, @lng, @desc)
  `);

  const seedAll = db.transaction(() => {
    // Seed Users
    insertUser.run({ id: "usr-1", name: "TUHIN MONDAL", email: "pgp42450@iiml.ac.in", program: "PGP-1", hostel: "Hostel 12", room: "214", karma: 14, isLoggedIn: 1 });
    insertUser.run({ id: "usr-2", name: "Aarav Menon", email: "aarav.menon@iiml.ac.in", program: "PGP-1", hostel: "Hostel 12", room: "108", karma: 7, isLoggedIn: 0 });

    // Seed Reports
    insertReport.run({ id: "rep-101", category: "Electrical", problem: "AC not cooling in mid wing", hostel: "Hostel 12", room: "214", note: "Compressor trips every 15 mins. Room temp 32°C.", status: "OPEN", circle: "Second Circle — Hostel Manager", upvotes: 7, reportedBy: "TUHIN MONDAL", createdAt: "4h ago" });
    insertReport.run({ id: "rep-102", category: "Plumbing", problem: "Geyser dead in 2nd floor common washroom", hostel: "Hostel 12", room: "Washroom 2B", note: "No hot water since yesterday morning.", status: "OPEN", circle: "First Circle — Hostel Caretaker", upvotes: 12, reportedBy: "Aarav Menon", createdAt: "1d ago" });
    insertReport.run({ id: "rep-103", category: "Internet/LAN", problem: "LAN port dead in Room 311", hostel: "Hostel 14", room: "311", note: "CC ticket #48921 opened.", status: "RESOLVED", circle: "Resolved by CC Engineer", upvotes: 2, reportedBy: "Rhea Sen", createdAt: "2d ago" });

    // Seed Items
    insertItem.run({ id: "item-1", name: "Navy Blazer (Van Heusen)", category: "BLAZER & FORMALS", size: "Size 40 (Slim Fit)", emoji: "🧥", owner: "Ishita Rao", hostel: "Hostel 8", room: "112", status: "AVAILABLE", karma: 7, phone: "+91 98765 43210", note: "Dry cleaned last week. Return before 11 PM." });
    insertItem.run({ id: "item-2", name: "Casio FC-200V Financial Calculator", category: "CALCULATOR", size: "Standard", emoji: "🔢", owner: "Kabir Mehta", hostel: "Hostel 12", room: "305", status: "AVAILABLE", karma: 15, phone: "+91 98765 43211", note: "Required for Corporate Finance quiz. Don't clear cashflow tables." });
    insertItem.run({ id: "item-3", name: "Silk Formal Tie (Maroon & Navy)", category: "BELT & TIE", size: "Free Size", emoji: "👔", owner: "Devansh Nair", hostel: "Hostel 15", room: "219", status: "BORROWED", karma: 4, phone: "+91 98765 43212", note: "Available again tomorrow morning." });

    // Seed Events
    insertEvent.run({ id: "ev-1", club: "CREDENCE CAPITAL", title: "Weekly Markets Meetup & Valuation Drill", category: "CLUB", venue: "Bodhigriha, Room 204", time: "8:00 AM – 9:30 AM", timeframe: "LIVE NOW", attendees: 38, description: "Deep dive into Nifty earnings season and FMCG valuation multiples.", isAttending: 1 });
    insertEvent.run({ id: "ev-2", club: "ACADEMIC COUNCIL", title: "Economics Mid-Term Case Submission Deadline", category: "DEADLINE", venue: "Moodle Portal", time: "11:59 PM Tonight", timeframe: "LATER TODAY", attendees: 490, description: "Strict 11:59:59 PM cutoff time. 1 letter grade penalty per 15 minutes.", isAttending: 1 });

    // Seed Places
    insertPlace.run({ id: "pl-1", name: "Bodhigriha Academic Block", category: "ACADEMIC", hours: "7:00 AM – 1:00 AM", lat: 26.9212, lng: 80.9392, desc: "Lecture theaters, faculty offices, air-conditioned seminar halls." });
    insertPlace.run({ id: "pl-2", name: "Gyanodaya Central Library", category: "LIBRARY", hours: "8:00 AM – 2:00 AM", lat: 26.9205, lng: 80.9405, desc: "3 floors of study carrels, Bloomberg terminals, quiet reading zones." });
    insertPlace.run({ id: "pl-3", name: "Hostel 12 (PGP-1)", category: "HOSTEL", hours: "24/7 Access", lat: 26.9225, lng: 80.9380, desc: "First-year boys hostel with common room." });
    insertPlace.run({ id: "pl-4", name: "Hostel 14 (PGP-1)", category: "HOSTEL", hours: "24/7 Access", lat: 26.9232, lng: 80.9385, desc: "First-year residence with active night study rooms." });
    insertPlace.run({ id: "pl-5", name: "Hostel 8 (PGP)", category: "HOSTEL", hours: "24/7 Access", lat: 26.9198, lng: 80.9372, desc: "Girls residence near SAC." });
    insertPlace.run({ id: "pl-6", name: "Samadhan Maintenance Office", category: "ADMIN", hours: "9:00 AM – 5:30 PM", lat: 26.9190, lng: 80.9412, desc: "Estate & civil works, electrician desk, sanitation supervisors." });
    insertPlace.run({ id: "pl-7", name: "Nescafé Point (SAC)", category: "MESS & CAFÉS", hours: "9:00 AM – 3:30 AM", lat: 26.9210, lng: 80.9400, desc: "Iced tea, hot coffee, patties, 3 AM survival hub." });
    insertPlace.run({ id: "pl-8", name: "Central Mess 1", category: "MESS & CAFÉS", hours: "Breakfast 7:30-9:30, Lunch 12:30-2:30, Dinner 7:30-9:30", lat: 26.9220, lng: 80.9390, desc: "Daily student mess run by student mess committee." });
  });

  seedAll();
  console.log("💾 SQLite database initialized and seeded at:", DB_PATH);
}

export default db;
