-- ═══════════════════════════════════════════════════════════════
--  LuxDrive — Schéma Supabase complet
--  Instructions : Supabase Dashboard → SQL Editor → New Query
--  Collez tout ce fichier et cliquez Run.
-- ═══════════════════════════════════════════════════════════════


-- ───────────────────────────────────────────────────────────────
-- 0. HELPER : fonction is_admin() pour les policies RLS
-- ───────────────────────────────────────────────────────────────
create or replace function is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select coalesce(
    (select role = 'admin' from profiles where id = auth.uid()),
    false
  );
$$;


-- ───────────────────────────────────────────────────────────────
-- 1. TABLE PROFILES (comptes agences & admins)
-- ───────────────────────────────────────────────────────────────
create table if not exists profiles (
  id          uuid        references auth.users on delete cascade primary key,
  email       text,
  agency_name text,
  city        text        default 'lyon',
  role        text        default 'annonceur',   -- 'annonceur' | 'admin'
  plan        text        default 'starter',      -- 'starter' | 'pro' | 'elite'
  created_at  timestamptz default now()
);

alter table profiles enable row level security;

drop policy if exists "Users read own profile"       on profiles;
drop policy if exists "Users update own profile"     on profiles;
drop policy if exists "Service role insert profile"  on profiles;

create policy "Users read own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Service role insert profile"
  on profiles for insert
  with check (true);

-- Trigger : crée automatiquement le profil dès qu'un utilisateur s'inscrit
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into profiles (id, email, agency_name, city, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'agency_name', 'Mon Agence'),
    coalesce(new.raw_user_meta_data->>'city', 'lyon'),
    coalesce(new.raw_user_meta_data->>'role', 'annonceur')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();


-- ───────────────────────────────────────────────────────────────
-- 2. TABLE ANNONCES (listings de véhicules)
-- ───────────────────────────────────────────────────────────────
create table if not exists annonces (
  id                uuid        default gen_random_uuid() primary key,
  user_id           uuid        references auth.users on delete cascade not null,
  slug              text        unique not null,
  brand             text        not null default '',
  model             text        not null default '',
  category          text        default 'sport',
  city              text        not null default 'lyon',
  price             integer     not null default 0,
  price_week        integer,
  year              integer,
  fuel              text,
  transmission      text,
  seats             integer,
  power             integer,
  description       text,
  caution           integer,
  km_par_jour       integer,
  assurance_incluse boolean     not null default false,
  permis_requis     text        default 'B',
  carburant_inclus  boolean     not null default false,
  image_url         text,
  image_urls        text[]      default '{}',
  agency_name       text,
  status            text        not null default 'pending',   -- pending | published | rejected
  rejection_reason  text,
  views             integer     not null default 0,
  leads             integer     not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table annonces enable row level security;

drop policy if exists "Public read published annonces" on annonces;
drop policy if exists "Agency read own annonces"       on annonces;
drop policy if exists "Agency insert annonces"         on annonces;
drop policy if exists "Agency update own annonces"     on annonces;
drop policy if exists "Agency delete own annonces"     on annonces;
drop policy if exists "Admin read all annonces"        on annonces;
drop policy if exists "Admin update all annonces"      on annonces;

create policy "Public read published annonces"
  on annonces for select
  using (status = 'published');

create policy "Agency read own annonces"
  on annonces for select
  using (auth.uid() = user_id);

create policy "Agency insert annonces"
  on annonces for insert
  with check (auth.uid() = user_id);

create policy "Agency update own annonces"
  on annonces for update
  using (auth.uid() = user_id);

create policy "Agency delete own annonces"
  on annonces for delete
  using (auth.uid() = user_id);

create policy "Admin read all annonces"
  on annonces for select
  using (is_admin());

create policy "Admin update all annonces"
  on annonces for update
  using (is_admin());

create or replace function update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists annonces_updated_at on annonces;
create trigger annonces_updated_at
  before update on annonces
  for each row execute procedure update_updated_at();


-- ───────────────────────────────────────────────────────────────
-- 3. TABLE LEADS (demandes de location envoyées par les visiteurs)
-- ───────────────────────────────────────────────────────────────
create table if not exists leads (
  id           uuid        default gen_random_uuid() primary key,
  user_id      uuid        references auth.users,
  annonce_id   uuid        references annonces on delete set null,
  name         text,
  phone        text,
  email        text,
  date_from    date,
  date_to      date,
  message      text,
  rental_type  text        default 'Demande devis',
  status       text        not null default 'new',
  city         text,
  created_at   timestamptz not null default now()
);

alter table leads enable row level security;

drop policy if exists "Anyone can create a lead"  on leads;
drop policy if exists "Agency read own leads"     on leads;
drop policy if exists "Agency update own leads"   on leads;

create policy "Anyone can create a lead"
  on leads for insert
  with check (true);

create policy "Agency read own leads"
  on leads for select
  using (auth.uid() = user_id);

create policy "Agency update own leads"
  on leads for update
  using (auth.uid() = user_id);


-- ───────────────────────────────────────────────────────────────
-- 4. STORAGE — Bucket pour les photos de véhicules
-- ───────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('annonces-photos', 'annonces-photos', true)
on conflict (id) do nothing;

drop policy if exists "Annonceurs peuvent uploader des photos"   on storage.objects;
drop policy if exists "Photos publiquement lisibles"             on storage.objects;
drop policy if exists "Annonceurs peuvent supprimer leurs photos" on storage.objects;

create policy "Annonceurs peuvent uploader des photos"
  on storage.objects for insert
  with check (
    bucket_id = 'annonces-photos'
    and auth.role() = 'authenticated'
  );

create policy "Photos publiquement lisibles"
  on storage.objects for select
  using (bucket_id = 'annonces-photos');

create policy "Annonceurs peuvent supprimer leurs photos"
  on storage.objects for delete
  using (
    bucket_id = 'annonces-photos'
    and auth.uid()::text = (storage.foldername(name))[1]
  );


-- ───────────────────────────────────────────────────────────────
-- 5. DROITS D'EXÉCUTION de la fonction is_admin()
-- ───────────────────────────────────────────────────────────────
grant execute on function is_admin() to authenticated, anon;
