import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const fetchTopStories = async () => {
  const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  const storyIds = await response.json();
  const top100Ids = storyIds.slice(0, 100);
  
  const storyPromises = top100Ids.map(id =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
  );
  
  return Promise.all(storyPromises);
};

const StoryItem = ({ title, score, url }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {title}
        </a>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>Upvotes: {score}</p>
    </CardContent>
  </Card>
);

const SkeletonLoader = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <Card key={i} className="mb-4">
        <CardHeader>
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-1/4" />
        </CardContent>
      </Card>
    ))}
  </div>
);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories
  });

  const filteredStories = stories?.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hacker News Top Stories</h1>
      <Input
        type="text"
        placeholder="Search stories..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-6"
      />
      {isLoading ? (
        <SkeletonLoader />
      ) : error ? (
        <p>Error loading stories: {error.message}</p>
      ) : (
        filteredStories?.map(story => (
          <StoryItem key={story.id} title={story.title} score={story.score} url={story.url} />
        ))
      )}
    </div>
  );
};

export default Index;