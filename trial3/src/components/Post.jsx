import React, { useEffect, useState } from 'react';

const Post = ({ id, datePosted, poster, subjectSummary, imageUrl }) => {
  const [timeAgo, setTimeAgo] = useState('');
  const url = import.meta.env.VITE_BACKEND_SERVER_URL;

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const postedTime = new Date(datePosted);
      const timeDifference = now - postedTime;

      // Convert milliseconds to seconds
      const seconds = Math.floor(timeDifference / 1000);

      if (seconds < 60) {
        setTimeAgo('a few seconds ago');
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setTimeAgo(`${minutes} minute${minutes > 1 ? 's' : ''} ago`);
      } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        setTimeAgo(`${hours} hour${hours > 1 ? 's' : ''} ago`);
      } else {
        const days = Math.floor(seconds / 86400);
        setTimeAgo(`${days} day${days > 1 ? 's' : ''} ago`);
      }
    };

    calculateTimeAgo();

    // Refresh the time difference every minute
    const intervalId = setInterval(calculateTimeAgo, 60000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [datePosted]);

  const isVideo = imageUrl && imageUrl.filename.match(/\.(mp4|webm|ogg|m4a|mkv)$/);
  const isAudio = imageUrl && imageUrl.filename.match(/\.(mp3|wav|ogg)$/);

  return (
    <div className="post">
      <div className="post-header">
        <span className="post-date">Posted {timeAgo}</span>
      </div>
      <div className="post-content">
        {isVideo ? (
          <video controls width="100%">
            <source src={`${url}/api/image/${imageUrl.filename}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : isAudio ? (
          <audio controls>
            <source src={`${url}/api/image/${imageUrl.filename}`} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        ) : (
          <img
            loading="lazy"
            src={`${url}/api/image/${imageUrl.filename}`}
            alt={`Post ${id}`}
            className="post-image"
          />
        )}
        <h3 className="post-title">{subjectSummary}</h3>
        <p className="post-author">Posted by {poster}</p>
      </div>
    </div>
  );
};

export default Post;
