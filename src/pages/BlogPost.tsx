import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types/database';
import { Loader2, Calendar, User } from 'lucide-react';
import AuthorCard from '../components/AuthorCard';
import SEO from '../components/SEO';

interface BlogPostPageProps {
  darkMode: boolean;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ darkMode }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate('/404');
        return;
      }

      try {
        const { data, error: supabaseError } = await supabase
          .from('blog_posts')
          .select(`
            *,
            author:author_id (*)
          `)
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (supabaseError) throw supabaseError;
        if (!data) {
          navigate('/404');
          return;
        }

        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <>
        <SEO title="Loading Post" />
        <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker' : 'bg-white'}`}>
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
            <Loader2 className={`h-8 w-8 animate-spin ${darkMode ? 'text-white' : 'text-gray-900'}`} />
            <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading post...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <SEO title="Post Not Found" />
        <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker text-white' : 'bg-white text-gray-900'}`}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              {error || 'Post not found'}
            </p>
          </div>
        </div>
      </>
    );
  }

  const keywords = [
    'API Gateway',
    'API Management',
    'Developer Tools',
    post.title.split(' '),
    post.author?.name || 'DevAPI',
  ].flat();

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.header_image}
        type="article"
        publishedAt={post.published_at || post.created_at}
        author={post.author?.name}
        keywords={keywords}
        canonicalUrl={`${import.meta.env.VITE_SITE_URL}/blog/${post.slug}`}
      />
      <div className={`min-h-screen ${darkMode ? 'bg-sb-darker' : 'bg-white'}`}>
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px] w-full">
          <img
            src={post.header_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-sb-darker via-sb-darker/80' : 'bg-gradient-to-t from-white via-black/50 to-transparent'}`}></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-white" />
                  <time className="text-white">
                    {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-white" />
                    <Link 
                      to={`/author/${post.author.id}`}
                      className="text-white hover:text-sb-green transition-colors duration-200"
                    >
                      {post.author.name}
                    </Link>
                  </div>
                )}
              </div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {post.title}
              </h1>
              <p className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Author Section */}
          {post.author && (
            <div className={`mt-16 pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                About the Author
              </h2>
              <AuthorCard 
                author={post.author} 
                darkMode={darkMode}
                showLink={true}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;