import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const Post = ({ id,vidId, datePosted, poster, subjectSummary, imageUrl }) => {
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

  useEffect(() => {
    // Initialize video.js for video elements
    if (isVideo) {
      
      const videoNode = document.createElement('video');
      const newVidID=document.createAttribute('id')
      newVidID.value=`video-${vidId}`
      videoNode.setAttributeNode(newVidID)
      const player = videojs(videoNode);
      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [id, isVideo]);

  return (
    <div className="post">
      <div className="post-header">
        <span className="post-date">Posted {timeAgo}</span>
      </div>
      <div className="post-content">
        {isVideo ? (
          <video
            id={`video-${vidId}`}
            className="video-js vjs-default-skin"
            controls
            width="100%"
            data-setup="{}"
          >
            <source src={`${url}/api/image/${imageUrl.filename}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : isAudio ? (
          <div className="audio-container">
            <ReactAudioPlayer
              src={`${url}/api/image/${imageUrl.filename}`}
              autoPlay={false}
              controls
              className="react-audio-player"
            />
            <div className="audio-controls">
              <div style={{cursor:'pointer'}} onClick={() => handleRewind()}>&lt;&lt;</div>
              <div style={{cursor:'pointer'}} onClick={() => handleFastForward()}>&gt;&gt;</div>
            </div>
          </div>
        ) : (
          <img
            loading="lazy"
            src={`${url}/api/image/${imageUrl.filename}`}
            alt={`Post ${vidId}`}
            className="post-image"
          />
        )}
        <h3 className="post-title">{subjectSummary}</h3>
        <p className="post-author">Posted by {poster}</p>
      </div>
    </div>
  );

  function handleFastForward() {
    console.log('forward')
    const audio = document.querySelector('.react-audio-player');
    if (audio) {
      audio.currentTime += 10;
    }
  }

  function handleRewind() {
    console.log('backward')
    const audio = document.querySelector('.react-audio-player');
    if (audio) {
      audio.currentTime -= 10;
    }
  }
};

export default Post;
