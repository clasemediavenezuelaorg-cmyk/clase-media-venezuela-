-- Table for user profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  profession TEXT,
  skills TEXT[],
  points INTEGER DEFAULT 0,
  medals TEXT[],
  is_verified BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for citizen reports (incidencias)
CREATE TABLE citizen_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL, -- 'water', 'electricity', 'road', etc.
  description TEXT NOT NULL,
  location_address TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  image_url TEXT, -- Link from ImgBB
  status TEXT DEFAULT 'pending', -- 'pending', 'in-progress', 'resolved'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for talent needs (Banco de Horas)
CREATE TABLE talent_needs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  required_skills TEXT[],
  status TEXT DEFAULT 'open', -- 'open', 'in-progress', 'resolved'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for service offers (Red de Apoyo Mutuo)
CREATE TABLE service_offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  profession TEXT NOT NULL,
  offer_description TEXT NOT NULL,
  need_description TEXT NOT NULL,
  logo_url TEXT, -- Link from ImgBB
  rating DOUBLE PRECISION DEFAULT 5.0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for proposals (Think Tank)
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT, -- Markdown content
  category TEXT NOT NULL,
  status TEXT DEFAULT 'draft', -- 'draft', 'under-review', 'approved'
  votes INTEGER DEFAULT 0,
  video_url TEXT,
  video_thumbnail TEXT, -- Link from YouTube thumbnail helper
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for deals (Hacer un Trato)
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposer_id UUID REFERENCES profiles(id),
  receiver_id UUID REFERENCES profiles(id),
  proposal_text TEXT NOT NULL,
  exchange_text TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for applications (Postularme)
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_id UUID REFERENCES profiles(id),
  need_id UUID REFERENCES talent_needs(id),
  motivation TEXT NOT NULL,
  skills_offered TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'shortlisted', 'accepted', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reference Data
INSERT INTO profiles (name, profession, skills, points, medals, is_verified)
VALUES 
('Carlos Ruiz', 'Contador Público', ARRAY['Contabilidad', 'Finanzas'], 150, ARRAY['Fundador'], TRUE),
('Elena Blanco', 'Diseñadora Gráfica', ARRAY['Branding', 'UI/UX'], 200, ARRAY['Experto Técnico'], TRUE);

INSERT INTO service_offers (user_id, profession, offer_description, need_description, rating, is_verified)
SELECT id, 'Contador Público', 'Asesoría contable y tributaria', 'Diseño de logo para mi firma', 4.9, TRUE 
FROM profiles WHERE name = 'Carlos Ruiz';
