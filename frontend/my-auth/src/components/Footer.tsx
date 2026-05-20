// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Khối bên trái: Bản quyền & Tên dự án */}
        <div className="footer-left">
          <p className="footer-copyright">
            &copy; {currentYear} <span className="brand-neon">VIZALGO</span>. All rights reserved.
          </p>
        </div>

        {/* Khối bên phải: Các liên kết điều hướng */}
        <div className="footer-right">
          <nav className="footer-nav">
            <Link to="/team" className="footer-link">Team</Link>
            <span className="footer-divider">|</span>
            <Link to="/terms" className="footer-link">Terms of Use</Link>
            <span className="footer-divider">|</span>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;