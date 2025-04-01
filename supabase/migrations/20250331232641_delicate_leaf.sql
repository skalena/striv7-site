/*
  # Create blog posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `excerpt` (text)
      - `content` (text)
      - `header_image` (text)
      - `author_id` (uuid, references auth.users)
      - `is_published` (boolean)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policies for:
      - Public can read published posts
      - Authenticated users can manage their own posts
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  header_image text NOT NULL,
  author_id uuid REFERENCES auth.users(id),
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy for public to read published posts
CREATE POLICY "Public can view published posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (is_published = true);

-- Policy for authors to manage their own posts
CREATE POLICY "Authors can manage own posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (author_id = auth.uid());

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE
  ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();