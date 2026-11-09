-- PostgreSQL schema for the optional authenticated sync service.
create table users (id uuid primary key, email text unique not null, created_at timestamptz not null default now());
create table events (id uuid primary key, user_id uuid not null references users(id) on delete cascade, title text not null, type text not null, payload jsonb not null, archived boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create index events_user_updated_idx on events(user_id, updated_at desc);
create table event_deadlines (id uuid primary key, event_id uuid not null references events(id) on delete cascade, category text not null, due_date date not null, status text not null default 'Pending');
create index event_deadlines_date_idx on event_deadlines(due_date);
create table submissions (id uuid primary key, user_id uuid not null references users(id) on delete cascade, event_id uuid references events(id) on delete set null, title text not null, stage text not null, payload jsonb not null default '{}', updated_at timestamptz not null default now());
create table sync_queue (id uuid primary key, user_id uuid not null references users(id) on delete cascade, entity_type text not null, entity_id uuid not null, operation text not null, payload jsonb, created_at timestamptz not null default now());
create table reminders (id uuid primary key, user_id uuid not null references users(id) on delete cascade, event_deadline_id uuid references event_deadlines(id) on delete cascade, offset_days integer not null, enabled boolean not null default true);
