-- Goon waitlist table
-- Run this on your Supabase project to set up the waitlist data model.

CREATE TABLE IF NOT EXISTS public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text,
  referrer text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  confirmed_at timestamptz
);

-- Unique constraint on email (case-insensitive via lower())
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique
  ON public.waitlist (lower(email));

-- Index for sorting by creation date
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx
  ON public.waitlist (created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: no public reads
-- (Supabase anon role cannot SELECT from this table)

-- Policy: allow inserts via service role only
-- The API route uses the service role key, which bypasses RLS by default.
-- If you want to be explicit, add:
CREATE POLICY "Allow service role inserts"
  ON public.waitlist
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Optional: prevent updates and deletes from non-service roles
CREATE POLICY "No public updates"
  ON public.waitlist
  FOR UPDATE
  USING (false);

CREATE POLICY "No public deletes"
  ON public.waitlist
  FOR DELETE
  USING (false);
