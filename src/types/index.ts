// src/types/index.ts
export interface Story {
  id: number;
  userName: string;
  story: string;
  profileSrc: string;
  likes: number;
  seen: boolean;
}

export interface StoryTrayProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
}

export interface StoryViewerProps {
  stories: Story[];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
}