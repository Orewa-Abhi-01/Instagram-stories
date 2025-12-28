import React, { useEffect } from "react";
import Nav from "./components/Nav.jsx";
import StoryTray from "./components/StoryTray.jsx";
import StoryViewer from "./components/StoryViewer.jsx";

const App = () => {
  const [stories, setStories] = React.useState([]);
  const [activeIdx, setActiveIdx] = React.useState(null);

  useEffect(() => {
    fetch("/src/data/stories.json")
      .then((res) => res.json())
      // .then((data) => console.log(data));
      .then((data) => setStories(data));
  }, []);


  const handleStoryCLick = (index) => {
    setActiveIdx(index);
    // mark as seen
    setStories((prev) => {
      prev.map((s,i)=> (i ===index ? {...s, seen: true} : s));
    })
  }
  return (
    <div className="bg-[#0C1014] h-screen max-w-9xl ">
      <Nav />
      <StoryTray stories={stories} onStoryClick={setActiveIdx} />

      {activeIdx !== null && (
        <StoryViewer
          stories={stories}
          activeIndex={activeIdx}
          setActiveIndex={setActiveIdx}
          setStories={setStories}
        />
      )}
    </div>
  );
};

export default App;
