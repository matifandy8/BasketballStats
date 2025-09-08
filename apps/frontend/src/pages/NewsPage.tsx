import React from 'react';
import { useNews } from '../services/newsService';
import type { NewsArticle } from '../types/News';
import { PageLoading } from '../components/LoadingSpinner';
import { PageError } from '../components/ErrorComponent';

const NewsPage: React.FC = () => {
  console.log('render news page');

  const { data, isLoading, error } = useNews('nba');

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <div className="container mx-auto p-6 rounded-lg shadow-md text-left ">
      <h2 className="text-2xl font-bold font-druk mb-6 text-center py-8">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {data?.articles.map((article: NewsArticle) => (
          <div key={article.url} className="px-8 sm:px-4 py-8 sm:py-19">
            <img
              src={article.urlToImage || ''}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="flex flex-col items-start justify-between">
              <h2 className="text-2xl font-bold font-druk py-2">{article.title}</h2>
              <p className="text-gray-300 font-proxima-nova py-2">{article.description}</p>
              <p className="text-gray-300 font-proxima-nova py-2">Source: {article.source.name}</p>
              <a
                href={article.url}
                className="text-white hover:underline mt-2 font-proxima-nova font-bold py-2"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
