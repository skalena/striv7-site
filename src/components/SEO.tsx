import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedAt?: string;
  author?: string;
  keywords?: string[];
  canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = 'Modern API Gateway for Developer Teams. Build, secure, and monitor your APIs with our powerful gateway platform.',
  image = 'https://skls3.cloud.skalena.com.br/-aLNH4vJQ59',
  type = 'website',
  publishedAt,
  author,
  keywords = ['API Gateway', 'API Management', 'Developer Tools', 'API Security'],
  canonicalUrl,
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://devapi.com';
  const fullUrl = canonicalUrl || siteUrl;
  const fullTitle = `${title} | DevAPI`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* OpenGraph meta tags for Facebook */}
      <meta property="og:site_name" content="DevAPI" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      {author && <meta property="og:author" content={author} />}
      {publishedAt && <meta property="og:published_time" content={publishedAt} />}

      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@devapi" />
      <meta name="twitter:creator" content="@devapi" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:domain" content={siteUrl} />

      {/* LinkedIn meta tags */}
      <meta property="linkedin:title" content={fullTitle} />
      <meta property="linkedin:description" content={description} />
      <meta property="linkedin:image" content={image} />
      <meta property="linkedin:author" content={author || 'DevAPI'} />

      {/* WhatsApp meta tags */}
      <meta property="og:site_name" content="DevAPI" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />

      {/* Article specific meta tags */}
      {type === 'article' && publishedAt && (
        <>
          <meta property="article:published_time" content={publishedAt} />
          {author && <meta property="article:author" content={author} />}
          <meta property="article:section" content="Technology" />
          <meta property="article:tag" content={keywords.join(', ')} />
          <meta property="article:publisher" content={siteUrl} />
          <meta property="article:modified_time" content={publishedAt} />
        </>
      )}

      {/* Profile specific meta tags */}
      {type === 'profile' && author && (
        <>
          <meta property="profile:first_name" content={author.split(' ')[0]} />
          <meta property="profile:last_name" content={author.split(' ').slice(1).join(' ')} />
          <meta property="profile:username" content={author.toLowerCase().replace(/\s+/g, '')} />
        </>
      )}

      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Mobile meta tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#3ECF8E" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Schema.org markup for Google */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "image": image,
            "author": {
              "@type": "Person",
              "name": author
            },
            "publisher": {
              "@type": "Organization",
              "name": "DevAPI",
              "logo": {
                "@type": "ImageObject",
                "url": "https://skls3.cloud.skalena.com.br/-aLNH4vJQ59"
              }
            },
            "datePublished": publishedAt,
            "dateModified": publishedAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": fullUrl
            },
            "description": description
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;