import React, { useState } from 'react';

const ScrollBar = ({ setSelectedCategory }) => {
  const [activeCategory, setActiveCategory] = useState('NEW');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveCategory(category)
  };

  return (
    <div className='scrollbar'>
      <div className={`scroll-item ${activeCategory === 'NEW' ? 'active' : ''}`} onClick={() => handleCategoryClick('NEW')}>
      <a>NEW 🔥</a>

      </div>
      <div className={`scroll-item ${activeCategory === 'MY FAMILY' ? 'active' : ''}`} onClick={() => handleCategoryClick('MY FAMILY')}>
        <a>MY FAMILY</a>
      </div>
      <div className={`scroll-item ${activeCategory === 'SPORTS' ? 'active' : ''}`} onClick={() => handleCategoryClick('SPORTS')}>
        <a>SPORTS</a>
      </div>
      <div className={`scroll-item ${activeCategory === 'HOBBIES' ? 'active' : ''}`} onClick={() => handleCategoryClick('HOBBIES')}>
        <a>HOBBIES</a>
      </div>
      <div className={`scroll-item ${activeCategory === 'SONGS' ? 'active' : ''}`} onClick={() => handleCategoryClick('SONGS')}>
        <a>SONGS</a>
      </div>
      <div className={`scroll-item ${activeCategory === 'VIDEOS' ? 'active' : ''}`} onClick={() => handleCategoryClick('VIDEOS')}>
        <a>VIDEOS</a>
      </div>
    </div>
  );
};

export default ScrollBar;
