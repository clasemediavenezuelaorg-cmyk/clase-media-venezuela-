-- MASTER RESET SCRIPT FOR CLASE MEDIA VENEZUELA
-- This script drops everything and creates a fresh, clean structure.

-- 1. DROP EVERYTHING (Careful!)
DROP TABLE IF EXISTS app_settings CASCADE;
DROP TABLE IF EXISTS plans CASCADE;
DROP TABLE IF EXISTS assemblies CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS organization_members CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS deals CASCADE;
DROP TABLE IF EXISTS proposals CASCADE;
DROP TABLE IF EXISTS service_offers CASCADE;
DROP TABLE IF EXISTS talent_needs CASCADE;
DROP TABLE IF EXISTS citizen_reports CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. CREATE TABLES

-- Profiles (Linked to Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY, -- This will match auth.users.id
  name TEXT NOT NULL,
  phone TEXT,
  profession TEXT,
  skills TEXT[] DEFAULT '{}',
  points INTEGER DEFAULT 0,
  medals TEXT[] DEFAULT '{}',
  is_verified BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  role TEXT DEFAULT 'user', -- 'user', 'admin', 'super_admin'
  department TEXT, -- 'economy', 'education', etc.
  bio TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Citizen Reports (Incidencias)
CREATE TABLE citizen_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  location_address TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  image_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Talent Needs (Banco de Horas)
CREATE TABLE talent_needs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  required_skills TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Offers (Red de Apoyo Mutuo)
CREATE TABLE service_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  profession TEXT NOT NULL,
  offer_description TEXT NOT NULL,
  need_description TEXT NOT NULL,
  logo_url TEXT,
  rating DOUBLE PRECISION DEFAULT 5.0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Proposals (Think Tank)
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  votes INTEGER DEFAULT 0,
  video_url TEXT,
  video_thumbnail TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organization Structure
CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  level TEXT NOT NULL, -- 'national', 'state'
  state TEXT,
  photo_url TEXT,
  bio TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements (Logros)
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assemblies (Asambleas)
CREATE TABLE assemblies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Plans (Planes)
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_date DATE,
  status TEXT DEFAULT 'planned',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- App Settings
CREATE TABLE app_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  logo_url TEXT,
  app_name TEXT DEFAULT 'Clase Media Venezuela',
  primary_color TEXT,
  secondary_color TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. INITIAL DATA
INSERT INTO app_settings (id, app_name) VALUES ('global', 'Clase Media Venezuela') ON CONFLICT DO NOTHING;

INSERT INTO organization_members (name, role, level, photo_url, order_index)
VALUES 
('Dirección Nacional', 'Presidente', 'national', 'https://picsum.photos/seed/pres/400/400', 1),
('Coordinación General', 'Secretario', 'national', 'https://picsum.photos/seed/sec/400/400', 2);

-- 4. PERMISSIONS & REFRESH
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

-- REFRESH CACHE
NOTIFY pgrst, 'reload schema';
