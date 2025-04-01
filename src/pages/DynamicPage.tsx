import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '../lib/supabase';
import type { Page } from '../types/database';
import { Loader2 } from 'lucide-react';

interface DynamicPageProps {
  darkMode: boolean;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ darkMode }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) {
        navigate('/404');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error: supabaseError } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle();

        if (supabaseError) {
          throw supabaseError;
        }

        if (!data) {
          navigate('/404');
          return;
        }

        setPage(data);
      } catch (err) {
        console.error('Error fetching page:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        
        if (err instanceof Error && err.message.includes('No rows found')) {
          navigate('/404');
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center">
          <Loader2 className={`h-8 w-8 animate-spin ${darkMode ? 'text-white' : 'text-gray-900'}`} />
          <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading page...</p>
        </div>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            The requested page could not be found. Please check the URL and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-sb-darker' : 'bg-white'}`}>
      <article className="max-w-3xl mx-auto">
        <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {page.title}
        </h1>
        <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''} prose-headings:font-semibold prose-a:text-sb-green hover:prose-a:text-sb-green/90 prose-pre:bg-sb-slate prose-pre:text-white prose-code:text-sb-green`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {page.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default DynamicPage;