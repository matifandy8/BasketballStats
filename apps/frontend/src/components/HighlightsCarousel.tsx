import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export interface HighlightItem {
  id: string;
  title: string;
  thumbnail: string;
  league: 'NBA' | 'WNBA';
  description: string;
  date: string;
  url: string;
}

interface HighlightsCarouselProps {
  items: HighlightItem[];
  league: 'NBA' | 'WNBA';
  title: string;
}

const HighlightsCarousel: React.FC<HighlightsCarouselProps> = ({ items, title }) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<string>('');

  const handlePlayClick = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
    setCurrentVideo('');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="px-4 py-18 bg-gradient-to-t from-black to-transparent">
      <div className='container mx-auto'>
      <h2 className="text-4xl font-bold font-druk mb-6">{title}</h2>
      
      <div className="px-2">
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id} className="px-2">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button 
                    onClick={() => handlePlayClick(item.url)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-75 transition-opacity"
                    aria-label="Play video"
                  >
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <svg 
                        className="w-8 h-8 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                  </button>
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
      {showVideo && (
        <div className="fixed inset-0 bg-black/75 bg-opacity-55 flex items-center justify-center z-50 p-4" onClick={closeVideo}>
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <button 
              onClick={closeVideo}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
              aria-label="Close video"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src={currentVideo} 
                className="w-full h-[70vh] rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default HighlightsCarousel;
