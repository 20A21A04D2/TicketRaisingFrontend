import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaGoogle, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer parent">
      <div className="footerContent child">
        <p className="footerText">Copyright &copy; App@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
