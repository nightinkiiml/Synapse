# HELL DESK — AI Development Prompts & Engineering Log
**Tooling Disclosed:** Google Antigravity IDE (Provided under IIM Lucknow Student Account)  
**Project:** HELL DESK — IIM Lucknow Campus Survival Super-App  
**Author:** TUHIN MONDAL (`pgp42450@iiml.ac.in`)  
**Evaluator:** Team SynapsE (Round 02: MVP Build + Presentation)  

---

## 1. Product Discovery & Requirements Extraction Prompt
```text
Role: Principal Product Designer & Campus Systems Architect.
Context: IIM Lucknow MBA campus ("Hell" nickname, rigorous curriculum, 8 AM quizzes, midnight deadlines, 16 hostels).
Task: Analyze https://helldeskai.lovable.app/ and design an action-first campus survival platform called "HELL DESK".
Requirements:
- Emphasize the core philosophy: "Every screen ends in an action — never information."
- Identify 4 core modules: SAMADHAN (Fix-it complaints with Circles of Hell escalation), LEN-DEN (peer lending for blazers/calculators), AAJ (Bodhigriha schedules & deadlines), DISHA (interactive Leaflet map of campus).
- Incorporate campus identity: Verified Google SSO with @iiml.ac.in email, personalized greeting, campus context (PGP-1, Hostel 12, Room 214).
```

---

## 2. Frontend UI Architecture & Dark Theme Prompt
```text
Framework: React 18 + Vite + Tailwind CSS + Lucide Icons + Leaflet
Design System: Collegiate Brutalism Dark Mode.
Palette: Deep charcoal (#0b0c0e, #14161b), Crimson Red (#e53e3e, #9b2c2c), Amber accents (#dd6b20), crisp typography (Space Grotesk + JetBrains Mono).
Components to generate:
- Sidebar with brand logo, live campus connectivity badge, tab navigation with hot indicators, active user profile pill with 1-click Demo/Real user switch.
- HellDeskAI command bar with context awareness (PGP-1 · Hostel 12 · Room 214), prompt input, and quick chips ("Is anyone else facing this AC issue?", "Need a blazer tomorrow").
- Dashboard with personalized greeting, Circles of Hell active status, highlights carousel, Happening Now banner (Bodhigriha live session), and My Stuff counter cards.
- Samadhan page with issue category combobox, hostel selector, room input, live duplicate detector, Circles of Hell explanation ladder, and interactive upvoting.
- LenDen page with category tabs, search filter, item cards with emoji, Karma score, status toggle, and 1-tap WhatsApp deep-link button.
- Aaj page with event timeframe groups (LIVE NOW, LATER TODAY, TOMORROW), attendee count, and 1-click Google Calendar URL generator.
- Disha page with interactive Leaflet map pinned to IIM Lucknow (26.9207° N, 80.9396° E) and searchable 24/7 campus directory.
- About page covering the pitch rationale, "What we built vs what we ruthlessly cut", scalability under the 11:58 PM deadline rush, and tech choices.
```

---

## 3. Backend REST API & Database Schema Prompt
```text
Stack: Node.js + Express.js + SQLite / PostgreSQL (Supabase compatible).
Requirements:
- Clean RESTful endpoints:
  - GET /api/user and POST /api/user/toggle
  - GET/POST /api/samadhan/reports, POST /api/samadhan/reports/:id/upvote with automatic tier escalation
  - GET/POST /api/lenden/items, PATCH /api/lenden/items/:id/status
  - GET /api/aaj/events, POST /api/aaj/events/:id/attend
  - GET /api/disha/places
  - POST /api/ai/query (Campus query engine with semantic matching)
- Zero-dependency local persistence with JSON fallback so it runs out-of-the-box.
- PostgreSQL schema with foreign keys, ENUM checks, indexes for hostel deduplication, and Row Level Security (RLS) policies.
```

---

## 4. Visual Marketing & Launch Posters Prompt (Antigravity Image Engine)
```text
Poster 1 (Feed Post - 1:1 Aspect Ratio):
"High-impact Instagram launch poster for HELL DESK — the IIM Lucknow Campus Survival Super-App. Bold gritty editorial design with sharp modern typography. Deep dark charcoal and crimson red accents. Headlines: 'SURVIVE THE HELL. HELL DESK IS LIVE.' Featuring sleek UI cards for SAMADHAN, LEN-DEN, AAJ, DISHA. Tagline: 'Built by PGP, for PGP · IIM Lucknow 226013 · SynapsE'."

Poster 2 (Story Post - 9:16 Aspect Ratio):
"Vertical Instagram Story poster (9:16 aspect ratio) for HELL DESK — IIM Lucknow campus survival super-app. High impact dark mode aesthetic with crimson red and amber accents. Top bold typography: '3:00 AM CRISIS? BLAZER NEEDED? GEYSER DEAD?'. Middle features four modern glassmorphic mobile cards: Samadhan, Len-Den, Aaj, Disha. Bottom section: 'HELL DESK IS LIVE · Built by PGP, for PGP · Swipe up or tap link in bio · Team SynapsE'."
```

---

## 5. Defense & Edge Case Scripting Prompt
```text
Task: Prepare comprehensive responses for the 5-minute Round 2 Q&A panel covering:
1. Handling unreturned items and trust breakdown in peer lending.
2. Preventing caretakers and administration from ignoring digital tickets.
3. System behavior and edge caching during the 11:58 PM deadline rush.
4. Ethical and integrity response to anonymous complaint requests.
```
