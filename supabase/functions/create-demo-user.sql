-- =============================================================================
-- Comerciando Emprendedores — Crear usuario demo
-- Ejecutá este script DESPUÉS de setup.sql
-- =============================================================================

insert into public.users (email, name, provider)
values ('demo@comerciando.com', 'Usuario Demo', 'demo')
on conflict (email) do update
  set name     = excluded.name,
      provider = excluded.provider,
      updated_at = now();
