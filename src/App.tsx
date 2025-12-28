import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import StoryTray from "./components/StoryTray";
import StoryViewer from "./components/StoryViewer";
import type { Story } from "./types";

const App: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/src/data/stories.json")
      .then((res) => res.json())
      .then((data: Story[]) => setStories(data))
      .catch((error) => console.error("Error loading stories:", error));
  }, []);

  const handleStoryClick = (index: number) => {
    setActiveIndex(index);
    // mark as seen
    setStories((prev) =>
      prev.map((s, i) => (i === index ? { ...s, seen: true } : s))
    );
  };

  return (
    <div className="bg-[#0C1014] h-screen max-w-sm mx-auto">
      <Nav />
      <StoryTray stories={stories} onStoryClick={handleStoryClick} />

      {activeIndex !== null && (
        <StoryViewer
          stories={stories}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setStories={setStories}
        />
      )}
    </div>
  );
};

export default App;