import { SEO } from '../components/layout/SEO';
import NewsSection from '../components/NewsSection';
import HighlightsCarousel from '../components/HighlightsCarousel';
import { useAllHighlights } from '../services/highlightsService';

const HomePage: React.FC = () => {
  const { data, isLoading } = useAllHighlights();
  const nba = data?.nba || [];
  const wnba = data?.wnba || [];

  return (
    <>
      <SEO
        title="Latest NBA & WNBA Highlights and News"
        description="Watch the latest NBA and WNBA game highlights, get updated with breaking news, and check out player stats and scores."
        keywords="NBA highlights, WNBA highlights, basketball news, NBA scores, WNBA scores, basketball stats"
      />
      <div className="min-h-screen">
        <div className="min-h-[400px]">
          <HighlightsCarousel
            items={nba}
            league="NBA"
            title="NBA Highlights"
            isLoading={isLoading}
          />
        </div>

        <section className="py-8">
          <div className="rounded-lg overflow-hidden min-h-[300px]">
            <NewsSection />
          </div>
        </section>

        <div className="min-h-[400px]">
          <HighlightsCarousel
            items={wnba}
            league="WNBA"
            title="WNBA Highlights"
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
