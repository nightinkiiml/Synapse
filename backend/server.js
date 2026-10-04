import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend build files in production
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Health check
app.get('/api/health', (req, res) => {
  const dbCheck = db.prepare('SELECT count(*) as userCount FROM users').get();
  res.json({
    status: 'ONLINE',
    app: 'HELL DESK API',
    database: 'SQLite (helldesk.db)',
    totalUsers: dbCheck.userCount,
    institution: 'IIM Lucknow',
    timestamp: new Date().toISOString()
  });
});

// Current user profile
app.get('/api/user', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE isLoggedIn = 1').get() ||
               db.prepare('SELECT * FROM users LIMIT 1').get();
  res.json({ ...user, isLoggedIn: Boolean(user.isLoggedIn) });
});

// Toggle between authenticated student and demo persona
app.post('/api/user/toggle', (req, res) => {
  const current = db.prepare('SELECT * FROM users WHERE isLoggedIn = 1').get();
  const next = db.prepare('SELECT * FROM users WHERE id != ? LIMIT 1').get(current?.id || '');

  if (next) {
    db.prepare('UPDATE users SET isLoggedIn = 0').run();
    db.prepare('UPDATE users SET isLoggedIn = 1 WHERE id = ?').run(next.id);
    res.json({ ...next, isLoggedIn: true });
  } else {
    res.json(current);
  }
});

// SAMADHAN: Reports with SQL filters
app.get('/api/samadhan/reports', (req, res) => {
  const { hostel, category, status } = req.query;
  let query = 'SELECT * FROM reports WHERE 1=1';
  const params = [];

  if (hostel) {
    query += ' AND hostel = ?';
    params.push(hostel);
  }
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  query += ' ORDER BY rowid DESC';
  const reports = db.prepare(query).all(...params);
  res.json(reports);
});

app.post('/api/samadhan/reports', (req, res) => {
  const { category, problem, hostel, room, note, reportedBy } = req.body;
  if (!problem) {
    return res.status(400).json({ error: 'Problem description is required.' });
  }

  const id = `rep-${Date.now().toString().slice(-4)}`;
  const newReport = {
    id,
    category: category || 'General',
    problem,
    hostel: hostel || 'Hostel 12',
    room: room || '214',
    note: note || '',
    status: 'OPEN',
    circle: 'First Circle — Hostel Caretaker',
    upvotes: 1,
    reportedBy: reportedBy || 'TUHIN MONDAL',
    createdAt: 'Just now'
  };

  const insert = db.prepare(`
    INSERT INTO reports (id, category, problem, hostel, room, note, status, circle, upvotes, reportedBy, createdAt)
    VALUES (@id, @category, @problem, @hostel, @room, @note, @status, @circle, @upvotes, @reportedBy, @createdAt)
  `);

  insert.run(newReport);
  res.status(201).json(newReport);
});

app.post('/api/samadhan/reports/:id/upvote', (req, res) => {
  const { id } = req.params;
  const report = db.prepare('SELECT * FROM reports WHERE id = ?').get(id);

  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  const newUpvotes = report.upvotes + 1;
  let newCircle = report.circle;

  // Auto-escalate Circle
  if (newUpvotes >= 10 && report.circle.includes('First Circle')) {
    newCircle = 'Second Circle — Hostel Manager (High Priority)';
  } else if (newUpvotes >= 20) {
    newCircle = 'Ninth Circle — Chief Warden / Estate Office Alert';
  }

  db.prepare('UPDATE reports SET upvotes = ?, circle = ? WHERE id = ?').run(newUpvotes, newCircle, id);
  const updated = db.prepare('SELECT * FROM reports WHERE id = ?').get(id);
  res.json(updated);
});

// LEN-DEN: Peer lending items
app.get('/api/lenden/items', (req, res) => {
  const { category, status } = req.query;
  let query = 'SELECT * FROM items WHERE 1=1';
  const params = [];

  if (category && category !== 'ALL') {
    query += ' AND category = ?';
    params.push(category);
  }
  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  query += ' ORDER BY rowid DESC';
  const items = db.prepare(query).all(...params);
  res.json(items);
});

app.post('/api/lenden/items', (req, res) => {
  const { name, category, size, emoji, note, phone, owner, hostel, room } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Item name is required.' });
  }

  const id = `item-${Date.now().toString().slice(-4)}`;
  const newItem = {
    id,
    name,
    category: category || 'GENERAL',
    size: size || 'Standard',
    emoji: emoji || '📦',
    owner: owner || 'TUHIN MONDAL',
    hostel: hostel || 'Hostel 12',
    room: room || '214',
    status: 'AVAILABLE',
    karma: 10,
    phone: phone || '+91 98765 00000',
    note: note || 'Available on request'
  };

  const insert = db.prepare(`
    INSERT INTO items (id, name, category, size, emoji, owner, hostel, room, status, karma, phone, note)
    VALUES (@id, @name, @category, @size, @emoji, @owner, @hostel, @room, @status, @karma, @phone, @note)
  `);

  insert.run(newItem);
  res.status(201).json(newItem);
});

app.patch('/api/lenden/items/:id/status', (req, res) => {
  const { id } = req.params;
  const item = db.prepare('SELECT * FROM items WHERE id = ?').get(id);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const nextStatus = item.status === 'AVAILABLE' ? 'BORROWED' : 'AVAILABLE';
  db.prepare('UPDATE items SET status = ? WHERE id = ?').run(nextStatus, id);
  const updated = db.prepare('SELECT * FROM items WHERE id = ?').get(id);
  res.json(updated);
});

// AAJ: Events
app.get('/api/aaj/events', (req, res) => {
  const events = db.prepare('SELECT * FROM events').all();
  res.json(events.map(e => ({ ...e, isAttending: Boolean(e.isAttending) })));
});

app.post('/api/aaj/events/:id/attend', (req, res) => {
  const { id } = req.params;
  const event = db.prepare('SELECT * FROM events WHERE id = ?').get(id);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const isAttending = event.isAttending ? 0 : 1;
  const attendees = isAttending ? event.attendees + 1 : event.attendees - 1;

  db.prepare('UPDATE events SET isAttending = ?, attendees = ? WHERE id = ?').run(isAttending, attendees, id);
  const updated = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
  res.json({ ...updated, isAttending: Boolean(updated.isAttending) });
});

// DISHA: Places
app.get('/api/disha/places', (req, res) => {
  const places = db.prepare('SELECT * FROM places').all();
  res.json(places);
});

// HELL DESK AI: Intelligent Query Matcher
app.post('/api/ai/query', (req, res) => {
  const { prompt, hostel } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

  const p = prompt.toLowerCase();
  
  if (p.includes("blazer") || p.includes("formal")) {
    const item = db.prepare("SELECT * FROM items WHERE category = 'BLAZER & FORMALS' AND status = 'AVAILABLE' LIMIT 1").get();
    return res.json({
      answer: item 
        ? `Found ${item.name} (${item.size}) available in ${item.hostel} with ${item.owner} (⭐ ${item.karma} Karma). Tap to borrow.`
        : "Checking hostel wings for formal blazers.",
      action: "Go to LEN-DEN",
      targetTab: "lenden",
      confidence: 0.98
    });
  }
  
  if (p.includes("calculator") || p.includes("fc-200") || p.includes("casio")) {
    const item = db.prepare("SELECT * FROM items WHERE category = 'CALCULATOR' LIMIT 1").get();
    return res.json({
      answer: item
        ? `Casio FC-200V is available in ${item.hostel}, Room ${item.room} with ${item.owner}.`
        : "Casio FC-200V available on request.",
      action: "Borrow Calculator",
      targetTab: "lenden",
      confidence: 0.99
    });
  }
  
  if (p.includes("ac") || p.includes("cooling") || p.includes("geyser") || p.includes("plumbing")) {
    const similar = db.prepare("SELECT count(*) as count FROM reports WHERE problem LIKE '%AC%' OR problem LIKE '%geyser%'").get();
    return res.json({
      answer: `${similar.count} similar reports logged for AC/geyser in ${hostel || 'Hostel 12'} in the last 48 hours. Aggregating into Second Circle escalation.`,
      action: "View in SAMADHAN",
      targetTab: "samadhan",
      confidence: 0.95
    });
  }

  if (p.includes("today") || p.includes("bodhigriha") || p.includes("schedule")) {
    return res.json({
      answer: "Weekly Markets Meetup is LIVE NOW at Bodhigriha Room 204. Economics Case submission is due at 11:59 PM tonight.",
      action: "Open AAJ Schedule",
      targetTab: "aaj",
      confidence: 0.96
    });
  }

  return res.json({
    answer: `Analyzed "${prompt}" against IIM Lucknow SQLite database records. Suggested action: Check Samadhan for maintenance, Len-Den for items, or Aaj for schedules.`,
    action: "Explore Campus",
    targetTab: "home",
    confidence: 0.88
  });
});

// SPA Fallback: Serve frontend index.html for non-API routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🔥 Hell Desk API Server listening on http://localhost:${PORT}`);
  console.log(`💾 Database: SQLite file (${path.join(__dirname, 'helldesk.db')})`);
});
