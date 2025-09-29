export interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
}

export interface YouTubeResponse {
  items: Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
        high: { url: string };
      };
      publishedAt: string;
      channelTitle: string;
    };
  }>;
}

export interface HighlightItem {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
}

export interface HighlightsCarouselProps {
  items: HighlightItem[];
  league: 'NBA' | 'WNBA';
  title: string;
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}
