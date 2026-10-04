# HELL DESK — Technical Documentation & Architecture Specification
**Submission for Round 02: MVP Build + Presentation (Overtures 2026)**  
**Applicant:** TUHIN MONDAL (`pgp42450@iiml.ac.in`)  
**Evaluator:** Team SynapsE — The Tech Committee of IIM Lucknow  

---

## 1. Executive Summary & Problem Conceptualization

### Who Faces the Problem?
Over 1,000+ full-time MBA students (PGP-1, PGP-2, PhD) living on campus at IIM Lucknow (Prabandh Nagar, Pin: 226013).

### How Often?
Daily, multiple times per day. The typical PGP day involves:
- **8:00 AM:** Surprise quizzes and section presentations in Bodhigriha.
- **2:00 PM:** Term submissions and group case discussions.
- **11:59:59 PM:** Hard Moodle portal deadlines where 1 second late = grade drops.
- **1:00 AM – 4:00 AM:** Midnight study sessions, desperate searches for Casio FC-200V calculators, formal ties, or black blazers for morning interviews, and broken hostel ACs/geysers.

### The Breakdown of Past Attempts & Status Quo
- **WhatsApp Group Chaos:** When an AC trips or a geyser dies in Hostel 12, 15 different students message hostel caretakers or post in 500-member groups. Messages get buried, caretakers get overwhelmed, and no one knows who is working on what.
- **Physical Register / Rigid ERPs:** The physical maintenance register at Samadhan Admin office requires walking 800m during class hours, filling forms by hand, and waiting days with 0 status tracking.
- **Fragmented Portals:** Student calendars, club events, mess menus, and maintenance systems exist across 6 disjointed Google Sheets, PDF notices, and emails.

### The Hell Desk Conceptualization
**"Every screen ends in an action — never information."**  
Hell Desk is a campus survival super-app purpose-built for the rigorous, high-pressure IIM Lucknow environment. It collapses campus friction into 4 sharp modules:
1. **SAMADHAN:** One-tap hostel fix-it reporting with AI duplicate aggregation and automatic escalation across the "Circles of Hell".
2. **LEN-DEN:** Hyper-local peer lending for blazers, calculators, and chargers based on campus karma and zero deposits.
3. **AAJ:** Real-time pulse of campus schedules, Bodhigriha rooms, and deadlines with 1-click Google Calendar integration.
4. **DISHA:** Interactive campus map and 24/7 late-night directory (Nescafé, Gyanodaya library, health center).

---

## 2. Technical Stack & Architectural Decisions

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend Framework** | **React 18 + Vite** | Blazing-fast hot reloading, sub-50kB compressed bundle size, instant load times on spotty hostel Wi-Fi. |
| **Styling & Theme** | **Tailwind CSS** | Collegiate brutalism dark-mode aesthetic custom-tuned for night usage; zero runtime CSS overhead. |
| **Icons & UI Assets** | **Lucide React** | Lightweight, tree-shakeable SVG icons. |
| **Interactive Map** | **Leaflet + React-Leaflet** | Open-source, zero API-key dependencies, customizable dark tile-set pinned to IIM Lucknow campus coordinates (`26.9207° N, 80.9396° E`). |
| **Backend API** | **Express.js (Node.js)** | High-throughput, asynchronous non-blocking event loop ideal for concurrent campus requests. |
| **Active Local Database** | **SQLite (`backend/helldesk.db`)** | Production-grade relational database running via `better-sqlite3` with WAL mode, parameterized prepared statements, and ACID durability. |
| **Cloud Production Schema** | **PostgreSQL (Supabase / Neon)** | Pre-configured `backend/schema.sql` with UUIDs, foreign keys, and Row Level Security (RLS) policies for cloud deployment. |
| **Client Resilience** | **Optimistic Offline Storage** | Built-in `localStorage` replication ensures the client functions completely even if the campus LAN drops. |

---

## 3. Core Database Tables & Data Modeling

The schema is defined in `backend/schema.sql` and structured into 6 relational entities:

### 1. `profiles`
Represents verified campus students.
- `id` (UUID, Primary Key)
- `email` (TEXT UNIQUE, e.g. `pgp42450@iiml.ac.in`)
- `full_name` (TEXT, e.g. `TUHIN MONDAL`)
- `program` (TEXT, e.g. `PGP-1`, `PGP-2`)
- `hostel` (TEXT, e.g. `Hostel 12`)
- `room_number` (TEXT, e.g. `214`)
- `karma_score` (INTEGER, Default 10)
- `created_at` (TIMESTAMP)

### 2. `incidents` (Samadhan)
Tracks infrastructure breakdown reports and escalation status.
- `id` (UUID, Primary Key)
- `reporter_id` (UUID, FK -> `profiles.id`)
- `category` (ENUM: `Electrical`, `Plumbing`, `Furniture`, `Internet/LAN`, etc.)
- `problem_title` (TEXT)
- `hostel` (TEXT)
- `room_or_location` (TEXT)
- `note` (TEXT)
- `status` (ENUM: `OPEN`, `IN_PROGRESS`, `RESOLVED`)
- `circle_tier` (ENUM: `FIRST_CIRCLE`, `SECOND_CIRCLE`, `NINTH_CIRCLE`)
- `upvotes_count` (INTEGER)

### 3. `incident_upvotes`
Join table preventing a student from upvoting the same complaint twice while measuring problem severity.
- `incident_id` (UUID, FK -> `incidents.id`)
- `user_id` (UUID, FK -> `profiles.id`)

### 4. `lending_items` (Len-Den)
Peer-to-peer equipment inventory.
- `id` (UUID, Primary Key)
- `owner_id` (UUID, FK -> `profiles.id`)
- `name` (TEXT, e.g. `Casio FC-200V`)
- `category` (ENUM: `CALCULATOR`, `BLAZER & FORMALS`, `BELT & TIE`, `POWERBANK & CHARGERS`, etc.)
- `size_or_variant` (TEXT)
- `emoji` (TEXT)
- `status` (ENUM: `AVAILABLE`, `BORROWED`)
- `contact_phone` (TEXT)

### 5. `campus_events` (Aaj)
Live campus sessions, guest lectures, and deadlines.
- `id` (UUID, Primary Key)
- `organizing_club` (TEXT, e.g. `CREDENCE CAPITAL`, `SYNAPSE`)
- `title` (TEXT)
- `category` (ENUM: `ACADEMIC`, `CLUB`, `SPORTS`, `GUEST LECTURE`, `DEADLINE`)
- `venue` (TEXT, e.g. `Bodhigriha Room 204`)
- `timeframe_label` (TEXT: `LIVE NOW`, `LATER TODAY`, `TOMORROW`)
- `rsvp_count` (INTEGER)

### 6. `campus_places` (Disha)
Spatial directory of campus facilities.
- `id` (UUID, Primary Key)
- `name` (TEXT)
- `category` (ENUM: `HOSTEL`, `ACADEMIC`, `LIBRARY`, `MESS & CAFÉS`, `SPORTS`, etc.)
- `operating_hours` (TEXT)
- `latitude`, `longitude` (DOUBLE PRECISION)
- `description` (TEXT)

---

## 4. Authentication: How Login Works

1. **Google OAuth 2.0 / SSO:**
   - The user clicks **"Sign in with Google"**.
   - The frontend calls the OAuth consent screen with domain restriction: `hd=iiml.ac.in`.
   - Google returns a cryptographically signed JWT `id_token`.
   - The backend validates the JWT against Google's public JWKS keys (`https://www.googleapis.com/oauth2/v3/certs`) to verify:
     1. Signature validity.
     2. Expiry (`exp`).
     3. Email domain ends strictly with `@iiml.ac.in`.
   - The student's PGP roll number is parsed from the email prefix (`pgp42450` -> Year 2024-2026, Section E).
2. **Context Persistence & Demo Mode:**
   - For rapid peer evaluation, Hell Desk includes a 1-tap **"Demo Mode Switcher"** in the sidebar. Judges and evaluators can switch between authenticated student identity (`TUHIN MONDAL · Hostel 12`) and test persona (`Aarav Menon · Hostel 12`) without requiring external Google credentials.

---

## 5. Deployment Guide (Vercel & Netlify)

### Option A: Deploy Frontend to Vercel
1. Fork or push this repository to GitHub.
2. Log into [Vercel](https://vercel.com).
3. Import the repository and set:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your app is live with SSL in 45 seconds!

### Option B: Deploy to Netlify
1. Log into [Netlify](https://netlify.com).
2. Click **Add new site** > **Import an existing project**.
3. Choose your repository:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
4. Click **Deploy Site**.

### Option C: Backend Hosting
- Deploy `backend/` to **Render.com** or **Railway.app** as a Node.js web service.
- Set environment variable: `PORT=5000`.
- In `frontend/vite.config.js`, configure the production API base URL.

---

## 6. System Resilience & Scalability Under Heavy Load

### Scenario: The 11:58 PM Term Deadline Surge
At 11:58 PM before a midnight deadline, 500+ students hit the portal simultaneously. Standard servers crash under this spike. Here is how Hell Desk stays up:
1. **Edge Caching via CDN:**
   - Static assets (Vite bundle, Leaflet map tiles, styles) are served directly from global CDN edge points (Vercel Edge / Cloudflare).
2. **Optimistic Local Replication:**
   - All state reads (schedules, maps, open reports) are served from in-memory / `localStorage` mirrors on the client. UI transitions take 0ms.
3. **Write Queue & Deduplication:**
   - Incident submissions in Samadhan pass through a client-side and server-side debouncing layer. If 10 requests for "AC down in Hostel 12" arrive within 60 seconds, the engine collapses them into a single incident and increments the upvote counter, keeping DB write throughput linear.
4. **Graceful Degradation:**
   - If the remote backend experiences latency > 1500ms, the frontend automatically falls back to local storage without throwing error screens.

---

## 7. Integrity & Edge Cases

| Scenario | Architectural / Policy Defense |
|---|---|
| **Fake or Malicious Reports** | Every report requires verified `@iiml.ac.in` credentials. Reports are publicly attributed to the student's name and hostel room. Students cannot submit anonymously, discouraging malicious pranks. |
| **Unreturned Borrowed Items** | Len-Den tracks transactions with public Campus Karma. If an item is not returned by the designated time, the borrower's karma drops and their profile is flagged for hostel peer review. |
| **Spam Upvoting** | The join table `incident_upvotes` enforces a `UNIQUE(incident_id, user_id)` constraint, preventing bot scripts from inflating ticket urgency. |
