/*
  # Create authors table and update blog posts

  1. New Tables
    - `authors`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `bio` (text)
      - `profile_image` (text)
      - `linkedin_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Changes
    - Update blog_posts table to reference authors instead of auth.users
    - Add foreign key constraint

  3. Security
    - Enable RLS on authors table
    - Add policies for:
      - Public can read author profiles
      - Authors can manage their own profile
*/

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) UNIQUE NOT NULL,
  name text NOT NULL,
  bio text,
  profile_image text,
  linkedin_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

-- Public can view author profiles
CREATE POLICY "Public can view author profiles"
  ON authors
  FOR SELECT
  TO public
  USING (true);

-- Authors can manage their own profile
CREATE POLICY "Authors can manage own profile"
  ON authors
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Update blog_posts table
ALTER TABLE blog_posts
  DROP CONSTRAINT IF EXISTS blog_posts_author_id_fkey,
  ADD CONSTRAINT blog_posts_author_id_fkey 
  FOREIGN KEY (author_id) 
  REFERENCES authors(id)
  ON DELETE SET NULL;

-- Add trigger for updated_at
CREATE TRIGGER update_authors_updated_at
  BEFORE UPDATE
  ON authors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();