import React from 'react';

export default function Navbar() {
  const overlay = <div className='overlay socials'>
    <p>Im available via the following social media handles:</p>
    <li><img loading="lazy" className='social' src='ig.jpg'/> <a href='https://www.instagram.com/eliphaz_elephuz/' target="_blank">eliphaz_elephuz</a></li>
    <li><img loading="lazy" className='social' src='fb.jpg'/> <a href='https://web.facebook.com/elephuz.eliphaz' target="_blank">EliphazElephuz</a></li>
    <li><img loading="lazy" className='social' src='whats.jpg'/> <a href='https://wa.me/254722520916' target="_blank">+254722520916</a></li>
    <li><img loading="lazy" className='social' src='gmail.jpg'/><a href='mailto:eliphazelephuz.gmail.com' target="_blank">eliphazelephuz</a></li>
    <li><img loading="lazy" className='social' src='tik.jpg'/><a href='https://www.tiktok.com/@elephuzeliphaz' target="_blank">eliphazelephuz</a></li>
    <li><img loading="lazy" className='social' src='youtube.jpg'/><a href='https://www.youtube.com/@eliphazelephuz4546' target="_blank">Eliphaz Elephuz</a></li>
  </div>;
  const overlay2 = <div className='overlay'>
   <p>Mih ni msee wa mahustles na kujitahidi tuh. Nmesettle shagz na naishi life vipoa.</p>
  </div>;
  const overlay3 = <div className='overlay'>
    I sort of got inspired to share my lifestyle via the new Gen-Z trend of passing information. Its quite popular and effective.
    </div>;

  return (
    <nav>
      <p id='name'>Eliphaz Elephuz</p>  
      <ul>
        <li>
          <a>Contact Me</a>
          {overlay}
        </li>
        <li>
          <a>About</a>
          {overlay2}
        </li>
        <li>
          <a>Inspiration</a>
          {overlay3}
        </li>
      </ul>
    </nav>
  );
}
