import React, { useState } from 'react';
import Slideshow from './Slideshow';
import ScrollBar from './ScrollBar';
import Posts from './Posts';

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState('NEW');
  return (
    <div className='main'>
      <div className='top'>
      <div className='banner'>
        <p className='intro'>Hi, I'm Eliphaz and this is my space.</p>
        <img src='main.jpg' alt='Eliphuz image' loading="lazy"/>
      </div>
      <p>I post things of what I love doing! </p>
      <Slideshow />
      </div>
      <ScrollBar setSelectedCategory={setSelectedCategory} />
      <Posts selectedCategory={selectedCategory} />
    </div>
  );
};

export default Main;
