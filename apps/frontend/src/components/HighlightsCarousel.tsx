import { useState, useRef, useEffect } from 'react';
import type { HighlightsCarouselProps } from '../types/highlights';
import './HighlightsCarousel.css';
import HighlightsSkeleton from './HighlightsSkeleton';

const HighlightsCarousel: React.FC<HighlightsCarouselProps> = ({ items, title, isLoading }) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<string>('');
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items?.length || 0);
  }, [items]);

  const handlePlayClick = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
    setCurrentVideo('');
  };

  const createVideoUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
  };

  const scrollToItem = (index: number) => {
    if (!items?.length) return;

    if (trackRef.current && itemRefs.current[index]) {
      const item = itemRefs.current[index];
      item?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (!items?.length) return;
    const nextIndex = (currentIndex + 1) % items.length;
    scrollToItem(nextIndex);
  };

  const handlePrev = () => {
    if (!items?.length) return;
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    scrollToItem(prevIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const handleScroll = () => {
    if (!trackRef.current || !items?.length) return;

    const container = trackRef.current;
    const containerScroll = container.scrollLeft + container.offsetWidth / 2;

    for (let i = 0; i < itemRefs.current.length; i++) {
      const item = itemRefs.current[i];
      if (item) {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2 - container.getBoundingClientRect().left;

        if (Math.abs(containerScroll - itemCenter) < rect.width / 2) {
          setCurrentIndex(i);
          break;
        }
      }
    }
  };

  if (isLoading) {
    return (
      <section className="highlights-section">
        <div className="highlights-container">
          <h2 className="highlights-title">{title}</h2>
          <HighlightsSkeleton />
        </div>
      </section>
    );
  }

  if (!items?.length) {
    return null; // Or return a message/placeholder
  }

  return (
    <section className="highlights-section">
      <div className="highlights-container">
        <h2 className="highlights-title">{title}</h2>

        <div className="carousel-container">
          <div
            ref={trackRef}
            className="carousel-track"
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            role="region"
            aria-label="Highlights carousel"
            tabIndex={0}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                ref={el => {
                  itemRefs.current[index] = el;
                }}
                className="carousel-item"
                role="group"
                aria-label={`Item ${index + 1} of ${items.length}`}
              >
                <div className="relative group">
                  <div className="thumbnail-container">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="thumbnail"
                      loading="eager"
                      fetchPriority="high"
                    />
                    <button
                      onClick={() => handlePlayClick(createVideoUrl(item.videoId))}
                      className="play-button"
                      aria-label={`Play ${item.title}`}
                    >
                      <div className="play-icon">
                        <svg
                          className="play-svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
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
                  <h3 className="video-title">{item.title}</h3>
                  <p className="video-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {items.length > 1 && (
            <div className="carousel-controls">
              <button className="carousel-prev" onClick={handlePrev} aria-label="Previous item">
                <svg className="carousel-arrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
                </svg>
              </button>
              <button className="carousel-next" onClick={handleNext} aria-label="Next item">
                <svg className="carousel-arrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {showVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <div className="video-container" onClick={e => e.stopPropagation()}>
            <iframe
              src={currentVideo}
              title="Video Player"
              className="video-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              aria-label="Video player"
            />
            <button className="close-button" onClick={closeVideo} aria-label="Close video">
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HighlightsCarousel;
