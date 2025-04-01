import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Author, BlogPost } from '../types/database';
import { Loader2, Calendar } from 'lucide-react';
import SEO from '../components/SEO';
import AuthorCard from '../components/AuthorCard';

interface AuthorPageProps {
  darkMode: boolean;
}

const AuthorPage: React.FC<AuthorPageProps> = ({ darkMode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthorAndPosts = async () => {
      if (!id) {
        navigate('/404');
        return;
      }

      try {
        // Fetch author details
        const { data: authorData, error: authorError } = await supabase
          .from('authors')
          .select('*')
          .eq('id', id)
          .single();

        if (authorError) throw authorError;
        if (!authorData) {
          navigate('/404');
          return;
        }

        setAuthor(authorData);

        // Fetch author's published posts
        const { data: postsData, error: postsError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('author_id', id)
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        if (postsError) throw postsError;
        setPosts(postsData || []);
      } catch (err) {
        console.error('Error fetching author data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorAndPosts();
  }, [id, navigate]);

  if (loading) {
    return (
      <>
        <SEO title="Loading Author Profile" />
        <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker' : 'bg-white'}`}>
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
            <Loader2 className={`h-8 w-8 animate-spin ${darkMode ? 'text-white' : 'text-gray-900'}`} />
            <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading author profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !author) {
    return (
      <>
        <SEO title="Author Not Found" />
        <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker text-white' : 'bg-white text-gray-900'}`}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              {error || 'Author not found'}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${author.name} - Author Profile`}
        description={author.bio || `Read articles written by ${author.name}`}
        image={author.profile_image || undefined}
        type="profile"
      />
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <AuthorCard author={author} darkMode={darkMode} />
          </div>

          <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Articles by {author.name}
          </h2>

          <div className="grid gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className={`${
                  darkMode ? 'bg-sb-dark border-gray-800' : 'bg-white border-gray-200'
                } border rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]`}
              >
                <a href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.header_image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-sb-dark' : 'bg-gradient-to-t from-white'} opacity-60`}></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm mb-4">
                      <Calendar className="h-4 w-4" />
                      <time className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {post.title}
                    </h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
                      {post.excerpt}
                    </p>
                  </div>
                </a>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No published articles yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthorPage;