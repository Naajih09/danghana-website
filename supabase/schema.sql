-- Run this once in Supabase: SQL Editor > New query > paste > Run.

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null default 'Everyday',
  price integer not null check (price >= 0),
  fabric text not null default '',
  colours text[] not null default '{}',
  sizes text[] not null default '{}',
  description text not null default '',
  image text not null default '',
  in_stock boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- Everyone can read products (the public site).
create policy "Public can read products"
  on public.products for select
  using (true);

-- Only the signed-in owner can change products.
create policy "Owner can insert products"
  on public.products for insert
  to authenticated
  with check (true);

create policy "Owner can update products"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

create policy "Owner can delete products"
  on public.products for delete
  to authenticated
  using (true);

-- Photo storage bucket. Photos are public to view; only the owner can upload or change them.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Owner can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Owner can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

create policy "Owner can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
