import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import type { Author } from '../types/database';

interface AuthorCardProps {
  author: Author;
  darkMode: boolean;
  showLink?: boolean;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, darkMode, showLink = true }) => {
  return (
    <div className={`${darkMode ? 'bg-sb-dark border-gray-800' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
      <div className="flex items-center gap-4">
        {author.profile_image && (
          <img
            src={author.profile_image}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div>
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {showLink ? (
              <Link to={`/author/${author.id}`} className="hover:text-sb-green">
                {author.name}
              </Link>
            ) : (
              author.name
            )}
          </h3>
          {author.linkedin_url && (
            <a
              href={author.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sb-green hover:text-sb-green/90 mt-1"
            >
              <Linkedin className="h-4 w-4" />
              <span className="text-sm">LinkedIn Profile</span>
            </a>
          )}
        </div>
      </div>
      {author.bio && (
        <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {author.bio}
        </p>
      )}
    </div>
  );
};

export default AuthorCard;