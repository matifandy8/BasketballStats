import React from 'react';
import { SEO } from '../components/SEO';
import NewsSection from '../components/NewsSection';
import HighlightsCarousel from '../components/HighlightsCarousel';
import type { HighlightItem } from '../components/HighlightsCarousel';

// Mock data - replace with actual API data
const nbaHighlights: HighlightItem[] = [
  {
    id: '1',
    title: 'NBA Highlights 1',
    thumbnail: 'https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250826170229719-null.png',
    league: 'NBA',
    description: 'Check out the best plays from last night',
    date: '2 hours ago',
    url: 'https://www.youtube.com/embed/RMNjT2CSibc' // Replace with actual video embed URL
  },
  {
    id: '2',
    title: 'NBA Highlights 2',
    thumbnail: 'https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250826170229719-null.png',
    league: 'NBA',
    description: 'Check out the best plays from last night',
    date: '2 hours ago',
    url: 'https://www.youtube.com/embed/RMNjT2CSibc' // Replace with actual video embed URL
  },
  {
    id: '3',
    title: 'NBA Highlights 3',
    thumbnail: 'https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250826170229719-null.png',
    league: 'NBA',
    description: 'Check out the best plays from last night',
    date: '2 hours ago',
    url: 'https://www.youtube.com/embed/RMNjT2CSibc' // Replace with actual video embed URL
  },
  {
    id: '4',
    title: 'NBA Highlights 4',
    thumbnail: 'https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250826170229719-null.png',
    league: 'NBA',
    description: 'Check out the best plays from last night',
    date: '2 hours ago',
    url: 'https://www.youtube.com/embed/RMNjT2CSibc' // Replace with actual video embed URL
  },
  {
    id: '5',
    title: 'NBA Highlights 5',
    thumbnail: 'https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250826170229719-null.png',
    league: 'NBA',
    description: 'Check out the best plays from last night',
    date: '2 hours ago',
    url: 'https://www.youtube.com/embed/RMNjT2CSibc' // Replace with actual video embed URL
  }
];

const wnbaHighlights: HighlightItem[] = [
  {
    id: '13',
    title: 'WNBA Highlights 1',
    thumbnail: 'https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250826170229719-null.png',
    league: 'WNBA',
    description: 'Check out the best plays from last night',
    date: '2 hours ago',
    url: 'https://www.youtube.com/embed/RMNjT2CSibc' // Replace with actual video embed URL
  },
  {
    id: '14',
    title: 'WNBA Highlights 2',
    thumbnail: 'https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250826170229719-null.png',
    league: 'WNBA',
    description: 'Check out the best plays from last night',
    date: '2 hours ago',
    url: 'https://www.youtube.com/embed/RMNjT2CSibc' // Replace with actual video embed URL
  },
  {
    id: '15',
    title: 'WNBA Highlights 3',
    thumbnail: 'https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250826170229719-null.png',
    league: 'WNBA',
    description: 'Check out the best plays from last night',
    date: '2 hours ago',
    url: 'https://www.youtube.com/embed/RMNjT2CSibc' // Replace with actual video embed URL
  },
  {
    id: '16',
    title: 'WNBA Highlights 4',
    thumbnail: 'https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250826170229719-null.png',
    league: 'WNBA',
    description: 'Check out the best plays from last night',
    date: '2 hours ago',
    url: 'https://www.youtube.com/embed/RMNjT2CSibc' // Replace with actual video embed URL
  },
  {
    id: '17',
    title: 'WNBA Highlights 5',
    thumbnail: 'https://media.sportsplatform.io/bleacher-report/pt/images/2025-08/20250826170229719-null.png',
    league: 'WNBA',
    description: 'Check out the best plays from last night',
    date: '2 hours ago',
    url: 'https://www.youtube.com/embed/RMNjT2CSibc' // Replace with actual video embed URL
  }
];

const HomePage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Latest NBA & WNBA Highlights and News"
        description="Watch the latest NBA and WNBA game highlights, get updated with breaking news, and check out player stats and scores."
        keywords="NBA highlights, WNBA highlights, basketball news, NBA scores, WNBA scores, basketball stats"
      />
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 max-w-screen-2xl mx-auto">
        <HighlightsCarousel
          items={nbaHighlights}
          league="NBA"
          title="NBA Highlights"
        />

        <section className="mt-8 sm:mt-12">
          <div className="rounded-lg overflow-hidden">
            <NewsSection />
          </div>
        </section>

        <HighlightsCarousel
          items={wnbaHighlights}
          league="WNBA"
          title="WNBA Highlights"
        />
      </div>
    </>
  );
};

export default HomePage;