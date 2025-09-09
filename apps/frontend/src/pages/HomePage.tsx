import { SEO } from '../components/layout/SEO';
import NewsSection from '../components/NewsSection';
import HighlightsCarousel from '../components/HighlightsCarousel';
import { useHighlights } from '../services/highlightsService';


const HomePage: React.FC = () => {
  const { data: nbaHighlights } = useHighlights('nba');
  const { data: wnbaHighlights } = useHighlights('wnba');

  return (
    <>
      <SEO
        title="Latest NBA & WNBA Highlights and News"
        description="Watch the latest NBA and WNBA game highlights, get updated with breaking news, and check out player stats and scores."
        keywords="NBA highlights, WNBA highlights, basketball news, NBA scores, WNBA scores, basketball stats"
      />
      <div className="min-h-screen">
        <div className="min-h-[400px]">
          <HighlightsCarousel items={nbaHighlights || []} league="NBA" title="NBA Highlights" />
        </div>

        <section className="py-8">
          <div className="rounded-lg overflow-hidden min-h-[300px]">
            <NewsSection />
          </div>
        </section>

        <div className="min-h-[400px]">
          <HighlightsCarousel items={wnbaHighlights || []} league="WNBA" title="WNBA Highlights" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
