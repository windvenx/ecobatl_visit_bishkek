# Локальный запуск

## Требования
- Node.js 18+
- Docker Desktop

## Первый запуск

1. Клонируй репо и установи зависимости:
   `npm install`

2. Установи Supabase CLI:
   `npm install -g supabase`

3. Запусти локальный Supabase (нужен Docker):
   `supabase start`
   
   После запуска получишь:
   - API URL: `http://localhost:54321`
   - Anon key: `eyJ...`
   - Dashboard: `http://localhost:54323`

4. Создай `.env.local`:
   `NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321`
   `NEXT_PUBLIC_SUPABASE_ANON_KEY=<твой anon key из шага 3>`

5. Примени миграции БД:
   `supabase db reset`
   
6. Создай первого admin пользователя:
   Открой `http://localhost:54323` (Supabase Dashboard)
   → **Authentication** → **Users** → **Add user**
   Email: `admin@visitbishkek.kg`
   Password: `(придумай сложный)`
   
   Затем в SQL Editor выполни:
   ```sql
   UPDATE profiles SET role = 'admin' 
   WHERE email = 'admin@visitbishkek.kg';
   ```

7. Запусти Next.js:
   `npm run dev`

## Продакшн (Vercel)
`.env.local` для Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=<из Supabase Cloud>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<из Supabase Cloud>
```
