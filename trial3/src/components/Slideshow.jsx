import React, { useEffect, useState } from 'react';

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    const showSlides = () => {
      setSlideIndex((prevIndex) => (prevIndex % 3) + 1);
    };

    const interval = setInterval(showSlides, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className="slideshow-container">
        {[1, 2, 3].map((index) => (
          <div key={index} className={`mySlides fade ${slideIndex === index ? 'current' : ''}`}>
            <img src={`pic${index}.jpg`} className='slide' alt={`Slide ${index}`} />
          </div>
        ))}

        <a className="prev" onClick={() => setSlideIndex((prevIndex) => prevIndex - 1)}>&#10094;</a>
        <a className="next" onClick={() => setSlideIndex((prevIndex) => prevIndex + 1)}>&#10095;</a>
      </div>
      <br />

      <div className='dotdiv'>
        {[1, 2, 3].map((index) => (
          <span key={index} className={`dot ${slideIndex === index ? 'active' : ''}`} onClick={() => setSlideIndex(index)}></span>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
