-- ========================================================
-- HELL DESK — IIM LUCKNOW CAMPUS SURVIVAL APP
-- DATABASE SCHEMA (PostgreSQL / Supabase / Neon compatible)
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    program TEXT NOT NULL DEFAULT 'PGP-1', -- PGP-1, PGP-2, IPMX, FPM
    hostel TEXT NOT NULL,                  -- Hostel 1 to 16
    room_number TEXT NOT NULL,
    phone_number TEXT,
    karma_score INTEGER DEFAULT 10,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SAMADHAN (HOSTEL INCIDENTS & FIX-IT)
CREATE TABLE IF NOT EXISTS public.incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN (
        'Electrical', 'Plumbing', 'Furniture', 'Internet/LAN', 
        'Housekeeping', 'Mess/Food', 'Laundry', 'Security/Lost key', 
        'Medical', 'Other'
    )),
    problem_title TEXT NOT NULL,
    hostel TEXT NOT NULL,
    room_or_location TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
    circle_tier TEXT NOT NULL DEFAULT 'FIRST_CIRCLE' CHECK (circle_tier IN ('FIRST_CIRCLE', 'SECOND_CIRCLE', 'NINTH_CIRCLE')),
    upvotes_count INTEGER DEFAULT 1,
    assigned_technician TEXT,
    resolution_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Index for rapid hostel deduplication & querying
CREATE INDEX IF NOT EXISTS idx_incidents_hostel_category ON public.incidents(hostel, category, status);

-- 3. INCIDENT UPVOTES (Deduplication Join Table)
CREATE TABLE IF NOT EXISTS public.incident_upvotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID REFERENCES public.incidents(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(incident_id, user_id)
);

-- 4. LEN-DEN (PEER-TO-PEER LENDING)
CREATE TABLE IF NOT EXISTS public.lending_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'CALCULATOR', 'BLAZER & FORMALS', 'BELT & TIE', 
        'POWERBANK & CHARGERS', 'BOOKS & CASES', 'GENERAL'
    )),
    size_or_variant TEXT,
    emoji TEXT DEFAULT '📦',
    note TEXT,
    contact_phone TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'BORROWED', 'RETIRED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_lending_category_status ON public.lending_items(category, status);

-- 5. AAJ (CAMPUS EVENTS & DEADLINES)
CREATE TABLE IF NOT EXISTS public.campus_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organizing_club TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('ACADEMIC', 'CLUB', 'SPORTS', 'GUEST LECTURE', 'DEADLINE')),
    venue TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    timeframe_label TEXT NOT NULL DEFAULT 'LATER TODAY', -- 'LIVE NOW', 'LATER TODAY', 'TOMORROW'
    description TEXT,
    rsvp_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. DISHA (CAMPUS GEOGRAPHIC LOCATIONS)
CREATE TABLE IF NOT EXISTS public.campus_places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'HOSTEL', 'ACADEMIC', 'LIBRARY', 'MESS & CAFÉS', 
        'SPORTS', 'SHOPS & ATM', 'MEDICAL', 'ADMIN', 'GATE & AUTO'
    )),
    operating_hours TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    description TEXT,
    contact_info TEXT
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_upvotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lending_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campus_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campus_places ENABLE ROW LEVEL SECURITY;

-- Allow authenticated students to read all campus records
CREATE POLICY "Public read campus records" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public read incidents" ON public.incidents FOR SELECT USING (true);
CREATE POLICY "Public read lending items" ON public.lending_items FOR SELECT USING (true);
CREATE POLICY "Public read campus events" ON public.campus_events FOR SELECT USING (true);
CREATE POLICY "Public read places" ON public.campus_places FOR SELECT USING (true);
