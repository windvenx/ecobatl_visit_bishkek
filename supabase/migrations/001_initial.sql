-- UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: profiles (Roles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' 
    CHECK (role IN ('user', 'admin', 'moderator')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles trigger for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Profiles RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Пользователь видит свой профиль" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Только admins видят всех" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Table: places
CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name JSONB NOT NULL,
  category TEXT NOT NULL,
  lat NUMERIC NOT NULL,
  lng NUMERIC NOT NULL,
  desc JSONB,
  hours TEXT,
  phone TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: routes
CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title JSONB NOT NULL,
  steps JSONB NOT NULL,
  difficulty TEXT,
  duration TEXT,
  distance TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: guides
CREATE TABLE guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name JSONB NOT NULL,
  bio JSONB,
  languages TEXT[],
  price TEXT,
  contact_info JSONB,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: guide_applications
CREATE TABLE guide_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  languages TEXT[],
  experience TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Places RLS
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View active places" ON places FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access places" ON places FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Routes RLS
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View active routes" ON routes FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access routes" ON routes FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Guides RLS
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View active guides" ON guides FOR SELECT USING (status = 'approved');
CREATE POLICY "Admin full access guides" ON guides FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Guide Applications RLS
ALTER TABLE guide_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert applications" ON guide_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access apps" ON guide_applications FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
