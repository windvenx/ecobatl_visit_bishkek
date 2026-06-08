-- Enable Row Level Security
-- DROP TABLE IF EXISTS places;
-- DROP TABLE IF EXISTS routes;
-- DROP TABLE IF EXISTS guides;
-- DROP TABLE IF EXISTS guide_applications;

-- Places Table
CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name JSONB NOT NULL, -- {en: "...", ru: "...", ky: "..."}
  description JSONB,
  category TEXT NOT NULL,
  coordinates POINT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Routes Table
CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title JSONB NOT NULL,
  description JSONB,
  difficulty TEXT,
  duration TEXT,
  stops JSONB NOT NULL, -- Array of place IDs or names
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guides Table
CREATE TABLE guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  age INTEGER,
  specialty JSONB NOT NULL,
  bio JSONB,
  color TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guide Applications Table
CREATE TABLE guide_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_applications ENABLE ROW LEVEL SECURITY;

-- Public Access
CREATE POLICY "Public read for places" ON places FOR SELECT USING (true);
CREATE POLICY "Public read for routes" ON routes FOR SELECT USING (true);
CREATE POLICY "Public read for guides" ON guides FOR SELECT USING (true);

-- Admin Access (Auth required)
CREATE POLICY "Admin full access for places" ON places FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for routes" ON routes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for guides" ON guides FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin read for applications" ON guide_applications FOR SELECT USING (auth.role() = 'authenticated');

-- Public can insert applications
CREATE POLICY "Public insert applications" ON guide_applications FOR INSERT WITH CHECK (true);
