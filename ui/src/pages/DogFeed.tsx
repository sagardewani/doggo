import React, { useEffect, useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { getDogFeed } from '../api/feed';
import HighlightButton from '../components/Highlight/Button';

interface DogHighlight {
  id: string;
  video_url: string;
  caption: string;
  dog_profile?: {
    photo_url?: string;
    name?: string;
  };
}

const DogFeed: React.FC = () => {
  const [feed, setFeed] = useState<DogHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;
  const feedRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const backoffRef = useRef<number>(15000); // 15s initial backoff

  // Infinite scroll fetch (simulate pagination) with debounce and exponential backoff
  const fetchFeed = React.useCallback(async (offset = 0, isRetry = false) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setIsFetching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await getDogFeed(offset, 10);
        setFeed(prev => offset === 0 ? data : [...prev, ...data]);
        setLoading(false);
        setIsFetching(false);
        setError(null);
        setRetryCount(0);
        backoffRef.current = 15000; // reset backoff on success
        if (!data.length || data.length < 10) setHasMore(false);
      } catch (err) {
        setLoading(false);
        setIsFetching(false);
        setError('Failed to load feed. Please try again later.');
        setRetryCount(prev => prev + 1);
        // Exponential backoff for network errors
        if (
          err &&
          (err instanceof TypeError ||
            (typeof err === 'object' && err !== null && 'message' in err && typeof (err as { message?: unknown }).message === 'string' && (err as { message: string }).message === 'Failed to fetch'))
        ) {
          debounceRef.current = setTimeout(() => {
            fetchFeed(offset, true);
          }, backoffRef.current);
          backoffRef.current = Math.min(backoffRef.current * 2, 5 * 60 * 1000); // max 5min
        }
      }
    }, isRetry ? 0 : 400);
  }, []);

  useEffect(() => {
    if (retryCount > MAX_RETRIES) return;
    fetchFeed(0);
  }, [retryCount, fetchFeed]);

  // Preload next/previous videos
  useEffect(() => {
    if (feed.length > 0) {
      [current - 1, current + 1].forEach(idx => {
        if (feed[idx] && feed[idx].video_url) {
          const v = document.createElement('video');
          v.src = feed[idx].video_url;
        }
      });
    }
  }, [current, feed]);

  // TikTok/Instagram Reels style: vertical swipe navigation
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && current < feed.length - 1) setCurrent(current + 1);
    if (e.deltaY < 0 && current > 0) setCurrent(current - 1);
  };

  // Touch/swipe gesture support
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => current < feed.length - 1 && setCurrent(current + 1),
    onSwipedDown: () => current > 0 && setCurrent(current - 1),
    trackMouse: true,
    delta: 40,
  });

  // Merge ref and swipeHandlers
  const mergedRef = (node: HTMLDivElement | null) => {
    feedRef.current = node;
    if (swipeHandlers.ref) swipeHandlers.ref(node);
  };

  // Infinite scroll: load more when near end
  // useEffect(() => {
  //   if (feed.length - current < 3 && hasMore && !isFetching) {
  //     fetchFeed(feed.length);
  //   }
  // }, [current, feed, hasMore, isFetching, fetchFeed]);

  return (
    <div className='flex flex-1 items-center justify-center'>
      <div className="grid w-md min-h-full bg-black relative overflow-hidden">
        {/* Floating Action Button for Add Highlight */}
        <HighlightButton />
        {error ? (
          <div className="flex-1 flex items-center justify-center text-red-400 text-xl w-full h-full">
            {error}
          </div>
        ) : loading ? (
          <div className="flex-1 flex items-center justify-center text-white text-xl w-full h-full">
            <div className="animate-pulse w-full h-[70vh] bg-gray-800 rounded-xl max-w-md mx-auto" />
          </div>
        ) : feed.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-white text-xl">No highlights yet. Be the first to share!</div>
        ) : (
          <div
            ref={mergedRef}
            className="flex-1 w-full h-full overflow-hidden relative"
            tabIndex={0}
            onWheel={handleWheel}
            style={{ scrollSnapType: 'y mandatory' }}
            {...Object.fromEntries(Object.entries(swipeHandlers).filter(([k]) => k !== 'ref'))}
          >
            {feed.map((item, idx) => (
              <div
                key={item.id}
                className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-all duration-700 ${idx === current ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}
                style={{ scrollSnapAlign: 'start', background: '#000', transition: 'opacity 0.5s, transform 0.7s' }}
              >
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <div className="relative w-full flex flex-col items-center">
                    {/* {videoLoading && idx === current && (
                      <div className="absolute top-0 left-0 w-full h-[70vh] flex items-center justify-center z-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400 border-opacity-50" />
                      </div>
                    )} */}
                    <video
                      src={item.video_url}
                      controls
                      autoPlay={idx === current}
                      loop
                      muted
                      className="w-full h-[70vh] object-cover rounded-xl shadow-lg border-4 border-yellow-400"
                      // style={{ maxWidth: 400, filter: videoLoading ? 'blur(8px)' : 'none' }}
                      // onLoadedData={() => setVideoLoading(false)}
                      // onWaiting={() => setVideoLoading(true)}
                    />
                    {/* Floating Action Buttons */}
                    {idx === current && (
                      <div className="absolute right-6 bottom-36 flex flex-col gap-4 z-30">
                        <button className="bg-white/80 hover:bg-yellow-400 text-yellow-700 rounded-full p-3 shadow-lg transition flex flex-col items-center">
                          <span role="img" aria-label="like" className="text-2xl">🐾</span>
                          <span className="text-xs mt-1">Like</span>
                        </button>
                        <button className="bg-white/80 hover:bg-yellow-400 text-yellow-700 rounded-full p-3 shadow-lg transition flex flex-col items-center">
                          <span role="img" aria-label="share" className="text-2xl">🔗</span>
                          <span className="text-xs mt-1">Share</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-4 text-white text-center">
                    <div className="flex items-center gap-3 mb-2 justify-center">
                      <img src={item.dog_profile?.photo_url} alt={item.dog_profile?.name} className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400" />
                      <div className="text-lg font-bold text-yellow-300">{item.dog_profile?.name}</div>
                    </div>
                    <div className="bg-black/60 rounded-lg px-3 py-2 mb-2 inline-block text-base font-medium">{item.caption}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DogFeed;
