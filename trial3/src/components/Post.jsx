import React from 'react';

const Post = ({ id, datePosted, poster, subjectSummary, imageUrl }) => {
  return (
    <div className="post">
      <div className="post-header">
        <span className="post-date">{datePosted}</span>
      </div>
      <div className="post-content">
        <img loading="lazy" src={imageUrl} alt={`Post ${id}`} className="post-image" />
        <h3 className="post-title">{subjectSummary}</h3>
        <p className="post-author">Posted by {poster}</p>
      </div>
    </div>
  );
};

export default Post;
