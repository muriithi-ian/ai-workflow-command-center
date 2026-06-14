create extension if not exists vector with schema extensions;

create type public.app_role as enum ('admin', 'reviewer');
create type public.document_status as enum ('queued', 'processing', 'ready', 'failed');
create type public.document_source_type as enum ('seed', 'upload');
create type public.ai_run_status as enum ('completed', 'needs_review', 'failed', 'no_context');
create type public.review_status as enum ('pending', 'approved', 'rejected', 'changes_requested');
create type public.review_priority as enum ('low', 'medium', 'high');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text not null,
  roles public.app_role[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status public.document_status not null default 'queued',
  source_type public.document_source_type not null default 'upload',
  file_name text not null,
  mime_type text not null,
  size_bytes integer not null check (size_bytes >= 0),
  storage_path text,
  summary text not null default '',
  uploaded_by uuid references public.profiles(id) on delete set null,
  uploaded_by_email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  ordinal integer not null check (ordinal > 0),
  heading text not null,
  content text not null,
  token_count integer not null check (token_count >= 0),
  embedding vector(1536),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (document_id, ordinal)
);

create table public.ai_runs (
  id uuid primary key default gen_random_uuid(),
  workflow text not null,
  status public.ai_run_status not null,
  provider text not null,
  model text not null,
  input_summary text not null,
  output text not null default '',
  error_message text,
  created_by uuid references public.profiles(id) on delete set null,
  created_by_email text not null,
  created_at timestamptz not null default now()
);

create table public.ai_run_sources (
  ai_run_id uuid not null references public.ai_runs(id) on delete cascade,
  chunk_id uuid not null references public.document_chunks(id) on delete cascade,
  score real not null check (score >= 0),
  created_at timestamptz not null default now(),
  primary key (ai_run_id, chunk_id)
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status public.review_status not null default 'pending',
  priority public.review_priority not null default 'medium',
  source_document_id uuid references public.documents(id) on delete set null,
  ai_run_id uuid references public.ai_runs(id) on delete set null,
  reviewer_id uuid references public.profiles(id) on delete set null,
  reviewer_email text,
  reviewer_note text,
  decided_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  actor_id uuid references public.profiles(id) on delete set null,
  actor_email text not null,
  target_type text not null,
  target_id text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index documents_status_idx on public.documents(status);
create index document_chunks_document_id_idx on public.document_chunks(document_id);
create index document_chunks_embedding_idx on public.document_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index ai_runs_created_at_idx on public.ai_runs(created_at desc);
create index reviews_status_priority_idx on public.reviews(status, priority);
create index audit_logs_created_at_idx on public.audit_logs(created_at desc);

create or replace function public.has_role(required_role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and required_role = any(roles)
  );
$$;

alter table public.profiles enable row level security;
alter table public.documents enable row level security;
alter table public.document_chunks enable row level security;
alter table public.ai_runs enable row level security;
alter table public.ai_run_sources enable row level security;
alter table public.reviews enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles_select_own_or_admin"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.has_role('admin'));

create policy "documents_select_authenticated"
on public.documents for select
to authenticated
using (true);

create policy "documents_insert_admin"
on public.documents for insert
to authenticated
with check (public.has_role('admin'));

create policy "documents_update_admin"
on public.documents for update
to authenticated
using (public.has_role('admin'))
with check (public.has_role('admin'));

create policy "document_chunks_select_authenticated"
on public.document_chunks for select
to authenticated
using (true);

create policy "document_chunks_write_admin"
on public.document_chunks for all
to authenticated
using (public.has_role('admin'))
with check (public.has_role('admin'));

create policy "ai_runs_select_authenticated"
on public.ai_runs for select
to authenticated
using (true);

create policy "ai_runs_insert_authenticated"
on public.ai_runs for insert
to authenticated
with check (auth.uid() is not null);

create policy "ai_run_sources_select_authenticated"
on public.ai_run_sources for select
to authenticated
using (true);

create policy "ai_run_sources_insert_authenticated"
on public.ai_run_sources for insert
to authenticated
with check (auth.uid() is not null);

create policy "reviews_select_reviewer_or_admin"
on public.reviews for select
to authenticated
using (public.has_role('reviewer') or public.has_role('admin'));

create policy "reviews_insert_authenticated"
on public.reviews for insert
to authenticated
with check (auth.uid() is not null);

create policy "reviews_update_reviewer_or_admin"
on public.reviews for update
to authenticated
using (public.has_role('reviewer') or public.has_role('admin'))
with check (public.has_role('reviewer') or public.has_role('admin'));

create policy "audit_logs_select_admin"
on public.audit_logs for select
to authenticated
using (public.has_role('admin'));

create policy "audit_logs_insert_authenticated"
on public.audit_logs for insert
to authenticated
with check (auth.uid() is not null);
