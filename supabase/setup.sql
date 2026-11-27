-- =============================================================================
-- Comerciando Emprendedores — Supabase Setup
-- Ejecutá este script en el SQL Editor de tu proyecto Supabase:
--   https://supabase.com/dashboard → SQL Editor → New Query
-- =============================================================================

-- 1. Tabla de usuarios del catálogo (clientes)
create table if not exists public.users (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  name        text,
  picture     text,
  provider    text default 'google',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- 2. Política pública de lectura (para el modo demo)
alter table public.users enable row level security;

drop policy if exists "Lectura pública en demo" on public.users;
create policy "Lectura pública en demo"
  on public.users for select
  using (true);

drop policy if exists "El usuario puede actualizar su propio perfil" on public.users;
create policy "El usuario puede actualizar su propio perfil"
  on public.users for update
  using (auth.uid()::text = id::text);

-- 3. Trigger para actualizar updated_at automáticamente
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists users_updated_at on public.users;
create trigger users_updated_at
  before update on public.users
  for each row execute procedure public.set_updated_at();
