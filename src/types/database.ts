export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Author {
  id: string;
  user_id: string;
  name: string;
  bio: string | null;
  profile_image: string | null;
  linkedin_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  header_image: string;
  author_id: string;
  author?: Author;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}