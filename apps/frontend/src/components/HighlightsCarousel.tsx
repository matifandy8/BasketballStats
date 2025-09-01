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
    <section className="px-8 sm:px-4 py-8 sm:py-19 bg-gradient-to-t from-black to-transparent">
      <div className='container mx-auto'>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-druk mb-4 sm:mb-6 px-2">{title}</h2>
        
        <div className="px-1">
          <Slider {...settings}>
            {items.map((item) => (
              <div key={item.id} className="px-1 sm:px-2">
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-lg aspect-video">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <button 
                      onClick={() => handlePlayClick(item.url)}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-all duration-300"
                      aria-label="Play video"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                        <svg 
                          className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" 
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
                  <h3 className="mt-2 text-xs sm:text-sm font-medium text-white line-clamp-1 px-1">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-300 line-clamp-2 px-1">
                    {item.description}
                  </p>
                  <p className="mt-1 text-xs text-gray-400 px-1">{item.date}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-2 sm:p-4" onClick={closeVideo}>
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <button 
              onClick={closeVideo}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 p-2"
              aria-label="Close video"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full">
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src={currentVideo} 
                  className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HighlightsCarousel;
