import React, { useState, useEffect, useRef } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import type { StoryViewerProps } from "../types";

const STORY_DURATION = 5000;

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  activeIndex,
  setActiveIndex,
  setStories,
}) => {
  if (activeIndex === null) return null;

  const story = stories[activeIndex];

  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const startX = useRef<number>(0);

  // Auto Progress
  useEffect(() => {
    setProgress(0);
    setLoading(true);

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / STORY_DURATION) * 100, 100));
    }, 50);

    const timer = setTimeout(() => {
      nextStory();
    }, STORY_DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [activeIndex]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const prevStory = (): void => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const nextStory = (): void => {
    if (activeIndex < stories.length - 1) {
      setActiveIndex(activeIndex + 1);
      // mark as seen
      setStories((prev) =>
        prev.map((s, i) => (i === activeIndex + 1 ? { ...s, seen: true } : s))
      );
    } else {
      setActiveIndex(null);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>): void => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX.current > 50) {
      prevStory();
    } else if (startX.current - endX > 50) {
      nextStory();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black z-50"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* progress bars */}
      <div className="absolute top-2 left-2 right-2 flex gap-1 z-50">
        {stories.map((_, i) => (
          <div key={i} className="flex-1 h-1 bg-gray-600 rounded">
            <div
              className="h-full bg-white rounded transition-all"
              style={{
                width:
                  i < activeIndex
                    ? "100%"
                    : i === activeIndex
                    ? `${progress}%`
                    : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Left tap */}
      <div className="absolute left-0 top-0 w-1/2 h-full" onClick={prevStory} />

      {/* Right tap */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full"
        onClick={nextStory}
      />

      {/* Loading Skeleton */}
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-gray-800 pointer-events-none" />
      )}

      <img
        src={story.story}
        onLoad={() => setLoading(false)}
        className="w-full h-[90%] object-cover transition-opacity duration-300"
        alt="Story content"
      />

      <div className="story-data overflow-hidden">
        <div className="text-white text-md absolute top-3 font-semibold left-2 flex gap-3">
          <img
            src={story.profileSrc}
            className="w-8 h-8 rounded-full"
            alt={`${story.userName}'s profile`}
          />
          <p>{story.userName}</p>
        </div>

        <div className="input-container h-16 overflow-hidden flex items-center justify-between px-3">
          <input
            type="text"
            className="h-10 w-72 border-2 border-white rounded-full text-white placeholder-white bg-transparent px-3"
            placeholder="send message"
          />
          <button
            onClick={() => setLiked(!liked)}
            className="active:scale-95 transition-transform z-50"
            aria-label="like"
          >
            {liked ? (
              <FaHeart
                onClick={() => setLiked(false)}
                className="text-red-500 text-xl"
              />
            ) : (
              <FaRegHeart
                onClick={() => setLiked(true)}
                className="text-white text-xl"
              />
            )}
          </button>
        </div>
      </div>

      <button
        className="absolute top-3 right-3 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
        onClick={() => setActiveIndex(null)}
      >
        ✕
      </button>
    </div>
  );
};

export default StoryViewer;