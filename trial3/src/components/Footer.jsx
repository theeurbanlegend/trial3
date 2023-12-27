import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p className='main-footer'>&copy; All Rights Reserved, {currentYear}</p>
      <p className='appreciation'>Made with &hearts; by Bewton Maina</p>
      
    </footer>
  );
};

export default Footer;
