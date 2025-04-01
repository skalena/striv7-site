/*
  # Create pages table for dynamic content management

  1. New Tables
    - `pages`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - URL-friendly identifier
      - `title` (text) - Page title
      - `content` (text) - Markdown content
      - `is_published` (boolean) - Publication status
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `pages` table
    - Add policies for public read access to published pages
    - Add policies for authenticated users to manage pages
*/

CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published pages
CREATE POLICY "Public can view published pages"
  ON pages
  FOR SELECT
  TO public
  USING (is_published = true);

-- Allow authenticated users to manage pages
CREATE POLICY "Authenticated users can manage pages"
  ON pages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);