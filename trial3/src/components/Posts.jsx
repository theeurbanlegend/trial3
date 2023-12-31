import React, { useEffect, useState } from 'react';
import Post from './Post';

const Posts = ({ selectedCategory }) => {
  const url=import.meta.env.VITE_BACKEND_SERVER_URL
  const [obtainedPosts, setObtainedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log("Fetching posts");
        const response = await fetch(`${url}/api/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        
        // Filter posts based on the selected category
        const filteredPosts = data.filter((post) => post.category === selectedCategory);
        setObtainedPosts(filteredPosts);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  return (
    <div className="posts-container">
      {loading && <p>Fetching posts...</p>}
      {!loading && obtainedPosts.length === 0 && <p>No posts yet.</p>}
      {!loading && obtainedPosts.map((post) => (
        <Post
          key={post._id}
          id={post.postTitle}
          datePosted={post.createdAt}
          poster={post.poster}
          subjectSummary={post.postSummary}
          imageUrl={post.file}
        />
      ))}
    </div>
  );
};

export default Posts;
