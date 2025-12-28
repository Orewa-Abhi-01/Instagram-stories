import React from "react";

const Story = ({ story }) => {
  return (
    <>
      <div className="flex flex-col items-center bg-red-">
        <div className={`size-19 border-4 ${story.seen ? "border-gray-500" : "border-pink-700"}  rounded-full overflow-hidden`}>
          <img src={story.profileSrc} alt="" className="w-full object-cover" />
        </div>
        <p className="text-xs text-white  ">{story.userName}</p>
      </div>
    </>
  );
};
const StoryTray = ({ stories, onStoryClick }) => {
  return (
    <div className="story-tray border-b h-26 border-amber-50 overflow-hidden">
      <div className="flex items-center bg-amber- h-full">
        <ul className="flex gap-2.5 bg-red- w-full h-full overflow-scroll ">
          {stories.map((story, index) => (
            <li
              key={story.id}
              onClick={() => onStoryClick(index)}
              className=" h-full bg-green- flex items-center shrink-0"
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
