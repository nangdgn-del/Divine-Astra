-- Run in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  email text,
  created_at timestamptz not null default now(),
  is_banned boolean not null default false
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references auth.users(id) on delete cascade,
  customer_email text not null,
  product_id text not null,
  product_name text not null,
  quantity integer not null check (quantity between 1 and 10),
  total numeric(10,2) not null check (total >= 0),
  status text not null default 'pending' check (status in ('pending','paid','cancelled','fulfilled')),
  created_at timestamptz not null default now()
);

create table if not exists public.security_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  detail text not null default '',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.security_events enable row level security;

-- Customers may read/update only their own safe profile fields; sensitive moderation fields are server-admin only.
create policy "profile owner can read" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "profile owner can update display name" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "customer reads own orders" on public.orders for select to authenticated using (auth.uid() = customer_id);
-- No client insert/update policy on orders: server route uses service-role key after validating the session.
-- No client policies on security_events: server-only access.

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name',''), new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();
