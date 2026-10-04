# HELL DESK — IIM Lucknow Campus Survival Super-App
### Overtures 2026 · Round 02: MVP Build + Presentation
**Applicant:** TUHIN MONDAL (`pgp42450@iiml.ac.in`)  
**Evaluator:** Team SynapsE — The Tech Committee of IIM Lucknow  
**Live MVP:** [https://helldeskai.lovable.app/](https://helldeskai.lovable.app/)  
**AI Tooling Disclosed:** Google Antigravity IDE (via IIM Lucknow student credentials)  

---

## 🚀 Quick Start (Running Locally)

### Prerequisites
- Node.js (v18+ or v24 LTS)
- npm (v9+)

### 1. Run the Entire Project (Frontend + Backend)
```bash
# In the root repository directory (d:\Code\Synapse)
npm run install:all
```

To run both concurrently or individually:

#### Start Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
# -> Opens http://localhost:5173
```

#### Start Backend API (Express.js)
```bash
cd backend
npm install
node server.js
# -> Listening on http://localhost:5000
```

#### Build for Production
```bash
cd frontend
npm run build
# -> Production bundle created in frontend/dist/ (0 errors, sub-50kB compressed)
```

---

## 📁 Repository Structure

```text
d:\Code\Synapse/
├── frontend/                     # React 18 + Vite + Tailwind CSS + Leaflet
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx       # Brand header, navigation tabs, user session & demo switcher
│   │   │   └── HellDeskAI.jsx    # Campus AI bar with context awareness & smart suggestions
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx     # Greeting, stats, Happening Now banner, highlights carousel
│   │   │   ├── Samadhan.jsx      # Fix-It reporting, Circles of Hell escalation & deduplication
│   │   │   ├── LenDen.jsx        # Peer lending for blazers, calculators & ties + WhatsApp action
│   │   │   ├── Aaj.jsx           # Live events, Bodhigriha schedules & 1-click Google Calendar
│   │   │   ├── Disha.jsx         # Leaflet interactive map (IIML coords) & 24/7 night directory
│   │   │   └── About.jsx         # Product philosophy, "What we ruthlessly cut" & architecture
│   │   ├── services/
│   │   │   └── api.js            # API client with offline local persistence & campus seed data
│   │   ├── App.jsx               # Root router and shared reactive state
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                      # Node.js + Express REST API
│   ├── server.js                 # REST endpoints (/api/samadhan, /api/lenden, /api/aaj, /api/ai)
│   ├── database.js               # Resilient JSON/SQLite data layer
│   ├── schema.sql                # Supabase / PostgreSQL schema with UUIDs, checks & RLS policies
│   └── package.json
│
├── marketing/                    # Marketing artifacts (10 marks)
│   ├── hell_desk_instagram_post.jpg   # 1:1 High-impact feed launch poster
│   ├── hell_desk_instagram_story.jpg  # 9:16 Vertical Instagram story launch poster
│   └── CAMPAIGN.md               # Captions, story rollout strategy, on-ground adoption plan
│
├── docs/                         # Official submission documentation (35% Weightage)
│   ├── DOCUMENTATION.md          # Tech stack, database schema, login mechanism, hosting, scale
│   ├── PITCH_DECK.md             # 10-minute presentation pitch guide + 5-minute Q&A defense
│   └── PROMPTS_USED.md           # Antigravity IDE generation prompts log (as mandated by Rule 3)
│
└── package.json                  # Root orchestration scripts
```

---

## 🏆 Assessment Rubric Alignment (100 Marks Breakdown)

| Evaluation Criteria | Marks | How Hell Desk Satisfies It |
|---|---|---|
| **Submission Quality** | **45** | Fully functional React + Express MVP with 5 interactive screens (Dashboard, Samadhan, Len-Den, Aaj, Disha), responsive sidebar, Leaflet map, and AI command bar. |
| **Idea Feasibility** | **10** | A realistic, hyper-focused PWA. Ruthlessly cut in-app chat, mobile app store downloads, and escrow payments in favor of WhatsApp deep-links and Campus Karma. |
| **Domain Knowledge** | **15** | Grounded in authentic IIM Lucknow pain points: Bodhigriha 8 AM quizzes, Casio FC-200V calculators, Van Heusen blazers for PPO interviews, Nescafé SAC midnight tea, and the "Circles of Hell" escalation. |
| **Technical Knowledge** | **10** | Clear rationale for Vite/React, Supabase PostgreSQL, edge CDN caching, client-side optimistic replication, and failure handling during the 11:58 PM submission surge. |
| **Confidence & Defense** | **10** | Comprehensive Q&A script in `docs/PITCH_DECK.md` covering integrity dilemmas (anonymous complaint requests), unreturned items, and administrative compliance. |
| **Poster / Video** | **10** | 2 high-impact Instagram launch posters created (`marketing/hell_desk_instagram_post.jpg` and `marketing/hell_desk_instagram_story.jpg`) plus complete caption and story roll-out strategy in `marketing/CAMPAIGN.md`. |
| **TOTAL** | **100** | **Ready for Round 2 Presentation to Team SynapsE.** |
