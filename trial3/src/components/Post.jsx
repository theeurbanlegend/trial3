import React from 'react';

const Post = ({ id, datePosted, poster, subjectSummary, imageUrl }) => {
  return (
    <div className="post">
      <div className="post-header">
        <span className="post-date">{datePosted}</span>
      </div>
      <div className="post-content">
        {imageUrl && (
          <img loading="lazy" src={`https://posts-back.onrender.com/api/image/${imageUrl.filename}`} alt={`Post ${id}`} className="post-image" />
        )}
        <h3 className="post-title">{subjectSummary}</h3>
        <p className="post-author">Posted by {poster}</p>
      </div>
    </div>
  );
};

export default Post;
