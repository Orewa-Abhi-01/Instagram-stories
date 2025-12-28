import React from "react";
import type { Story, StoryTrayProps } from "../types";

interface StoryProps {
  story: Story;
}

const Story: React.FC<StoryProps> = ({ story }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-16 h-16 border-4 ${
          story.seen ? "border-gray-500" : "border-pink-700"
        } rounded-full overflow-hidden`}
      >
        <img
          src={story.profileSrc}
          alt={`${story.userName}'s profile`}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-xs text-white mt-1">{story.userName}</p>
    </div>
  );
};

const StoryTray: React.FC<StoryTrayProps> = ({ stories, onStoryClick }) => {
  return (
    <div className="story-tray border-b border-gray-700 h-24 overflow-hidden">
      <div className="flex items-center h-full">
        <ul className="flex gap-3 w-full h-full overflow-x-auto px-4">
          {stories.map((story, index) => (
            <li
              key={story.id}
              onClick={() => onStoryClick(index)}
              className="flex items-center shrink-0 cursor-pointer"
            >
              <Story story={story} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StoryTray;