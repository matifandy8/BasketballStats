import { Helmet, HelmetProvider } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'NBA & WNBA Highlights and News',
  description = 'Latest NBA and WNBA highlights, news, and stats in one place.',
  keywords = 'NBA, WNBA, basketball, highlights, scores, stats, news',
  image = '/preview-image.jpg',
  url = 'https://yourwebsite.com',
  type = 'website',
}) => {
  const fullTitle = title === 'NBA & WNBA Highlights and News' 
    ? title 
    : `${title} | NBA & WNBA Highlights and News`;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <link rel="canonical" href={url} />
      </Helmet>
    </HelmetProvider>
  );
};

export default SEO;
