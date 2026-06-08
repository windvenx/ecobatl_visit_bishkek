-- Таблица профилей с ролями
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' 
    CHECK (role IN ('user', 'admin', 'moderator')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Автосоздание профиля при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to avoid errors on multiple runs
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS политики
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow user to select their own profile
CREATE POLICY "Пользователь видит свой профиль"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Allow admins to select any profile
CREATE POLICY "Только admins видят всех"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert existing users from auth.users (if any)
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'user' 
FROM auth.users 
ON CONFLICT (id) DO NOTHING;
