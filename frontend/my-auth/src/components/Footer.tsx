import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='main-footer'>
      <div className='footer-container'>
        <div className='footer-brand'>
          <h2 className='footer-logo'>VIZALGO</h2>
          <p className='footer-slogan'>Visualizer Algorithm Platform</p>
          <p className='footer-description'>
            Learn algorithms through interactive visualization, coding practice,
            and step-by-step execution.
          </p>
        </div>

        <div className='footer-content-right'>
          <div className='footer-links-group'>
            <h3>Platform</h3>
            <nav className='footer-nav'>
              <Link to='/home' className='footer-link'>Home</Link>
              <Link to='/algorithms' className='footer-link'>Algorithms</Link>
              <Link to='/practice' className='footer-link'>Practice</Link>
              <Link to='/profile' className='footer-link'>Profile</Link>
            </nav>
          </div>

          <div className='footer-info'>
            <h3>Project</h3>
            <p>Tay Nguyen University</p>
            <p>Information Technology Students</p>
            <p>Built for learning algorithms visually.</p>
          </div>
        </div>

        {/* <div className='footer-info'>
          <h3>Project</h3>

          <p>Tay Nguyen University</p>
          <p>Information Technology Students</p>
          <p>Built for learning algorithms visually.</p>
        </div> */}
      </div>

      <div className='footer-bottom'>
        <p>
          &copy; {currentYear} <span className='brand-neon'>VIZALGO</span>. All
          rights reserved.
        </p>

        <p>Designed for modern algorithm learning.</p>
      </div>

      {/* <div className='footer-bottom'>
        <p>
          &copy; {currentYear} <span className='brand-neon'>VIZALGO</span>. All rights reserved.
        </p>
        <p>Designed for modern algorithm learning.</p>
      </div> */}
    </footer>
  );
};

export default Footer;
