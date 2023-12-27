import React, { useEffect, useState } from 'react';
import posts from '../assets/sample';
import Post from './Post';

const Posts = ({ selectedCategory }) => {
  const [obtainedPosts, setObtainedPosts] = useState([]);

  useEffect(() => {
    // Assuming posts is an array of posts
    // Filter posts based on the selected category
    const filteredPosts = posts.filter((post) => post.category === selectedCategory);
    setObtainedPosts(filteredPosts);
  }, [selectedCategory]);

  return (
    <div className="posts-container">
      {obtainedPosts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          datePosted={post.datePosted}
          poster={post.poster}
          subjectSummary={post.subjectSummary}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
};

export default Posts;
