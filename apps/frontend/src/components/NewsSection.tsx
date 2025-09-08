import type { NewsArticle } from '../types/News';
import { useNews } from '../services/newsService';

function NewsSection() {
  const { data, isLoading, error } = useNews('nba');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="text-white font-druk bg-gradient-to-t from-black to-transparent py-8 sm:py-19">
      <div className="container mx-auto px-2 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 px-2">
          Latest News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="md:col-span-1 lg:col-span-1 w-full relative mx-auto h-auto overflow-hidden rounded-lg transform transition-transform hover:scale-[1.02]">
            <a href={data?.articles[0].url} target="_blank" rel="noopener noreferrer">
              <img
                src={data?.articles[0].urlToImage || ''}
                alt={data?.articles[0].title}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover relative z-0 rounded-lg"
              />

              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 to-transparent">
                <p className="font-druk font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
                  {data?.articles[0].title}
                </p>
              </div>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:col-span-1">
            {data?.articles.slice(1).map((article: NewsArticle) => (
              <div
                key={article.url}
                className="w-full relative mx-auto h-full min-h-[100px] sm:min-h-[120px] overflow-hidden rounded-lg transform transition-transform hover:scale-[1.03]"
              >
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={article.urlToImage || ''}
                    alt={article.title}
                    className="w-full h-full object-cover relative z-0"
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="font-druk font-bold text-xs sm:text-sm md:text-base leading-tight">
                      {article.title}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
