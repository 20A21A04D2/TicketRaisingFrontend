import React, { useEffect, useState } from 'react';

import './Image.css';

const WelcomeSection = () => {
  const [welcomeText, setWelcomeText] = useState('');
 
  const handlelogout = () => {
    window.location.href = 'https://www.vtsenterprisesindia.com';
  };

  useEffect(() => {
    animateSequence('Welcome to Ticket Raising System');
  }, []);

  const animateSequence = (text) => {
    let delay = 100;
    const letters = text.split('').map((letter, index) => {
      if (letter !== ' ') {
        const style = {
          animationDelay: `${delay}ms`,
          MozAnimationDelay: `${delay}ms`,
          WebkitAnimationDelay: `${delay}ms`,
        };
        delay += 150;
        return <span key={index} style={style}>{letter}</span>;
      }
      return <span key={index}>&nbsp;</span>; // Ensure spaces are properly rendered
    });
    setWelcomeText(letters);
  };

  return (
    <section className="welcome-section">
      <div className="welcome-image-container">
        <video className="welcome-image" autoPlay muted loop>
          <source src="https://videos.pexels.com/video-files/2963870/2963870-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="welcome-overlay">
          <h1 className="welcome-text cssanimation leFadeInTop">{welcomeText}</h1>
          <p className="text-content--p">A Ticket Raising System manages the issues raised by customers.</p>
          <button className="learn-more-button"onClick={handlelogout}>Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
