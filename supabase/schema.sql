-- Supabase Schema for Sashaa Boutiques

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- ==========================
-- TABLES
-- ==========================

-- Customers table (extends Supabase auth.users)
create table if not exists public.customers (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  phone text,
  address_line1 text,
  city text,
  state text,
  pincode text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Categories table
create table if not exists public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Products table
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references public.categories on delete set null,
  name text not null,
  slug text unique not null,
  description text,
  short_description text,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  images text[] not null default '{}',
  sizes text[] not null default '{}',
  colors text[] not null default '{}',
  is_featured boolean default false,
  is_new boolean default true,
  in_stock boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders table
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references public.customers on delete set null,
  -- Storing snapshot of customer data in case account changes/deletes
  customer_email text not null,
  customer_phone text,
  shipping_address jsonb not null,
  subtotal numeric(10,2) not null,
  shipping_fee numeric(10,2) not null,
  total text not null, -- storing as text or numeric, keeping numeric(10,2) is better but followed your structure
  status text not null default 'PROCESSING', -- PROCESSING, SHIPPED, DELIVERED, CANCELLED
  payment_status text not null default 'PENDING',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order Items table
create table if not exists public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders on delete cascade not null,
  product_id uuid references public.products on delete set null,
  product_name text not null,
  product_size text not null,
  quantity integer not null check (quantity > 0),
  price_at_time numeric(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Contact Submissions table
create table if not exists public.contact_submissions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text default 'UNREAD',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================
-- ROW LEVEL SECURITY (RLS)
-- ==========================

-- Enable RLS
alter table public.customers enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.contact_submissions enable row level security;

-- Policies

-- Products & Categories: Anyone can read, only anon/authenticated can read 
-- (Assuming admin panel uses service role to bypass RLS for inserts/updates)
create policy "Products are viewable by everyone" on public.products for select using (true);
create policy "Categories are viewable by everyone" on public.categories for select using (true);

-- Customers: Users can only see/edit their own data
create policy "Users can view own profile" on public.customers for select using (auth.uid() = id);
create policy "Users can update own profile" on public.customers for update using (auth.uid() = id);

-- Orders: Users can see their own orders. Anon users can insert (guest checkout)
create policy "Users can view own orders" on public.orders for select using (auth.uid() = customer_id);
create policy "Anyone can insert an order" on public.orders for insert with check (true);

-- Order Items: Viewable if order is viewable
create policy "Users can view own order items" on public.order_items for select using (
  order_id in (select id from public.orders where customer_id = auth.uid())
);
create policy "Anyone can insert order items" on public.order_items for insert with check (true);

-- Contact Submissions: Anyone can insert, only admins can view (bypassed via service role)
create policy "Anyone can submit contact form" on public.contact_submissions for insert with check (true);
