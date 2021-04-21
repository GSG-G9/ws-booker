import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'antd';

import facebook from '../../../assets/icons/facebook.svg';
import instagram from '../../../assets/icons/instagram.svg';
import twitter from '../../../assets/icons/twitter.svg';

import './style.css';

const Footer = () => (
  <footer className="footer-container">
    <div className="icons-container">
      <Link to={{ pathname: 'https://www.instagram.com/' }} target="_blank">
        <Image
          preview={false}
          src={instagram}
          alt="instagram"
          className="icon"
        />
      </Link>
      <Link to={{ pathname: 'https://twitter.com/' }} target="_blank">
        <Image preview={false} src={twitter} alt="twitter" className="icon" />
      </Link>
      <Link to={{ pathname: 'https://www.facebook.com/' }} target="_blank">
        <Image preview={false} src={facebook} alt="facebook" className="icon" />
      </Link>
    </div>
    <div className="copyright">&copy; 2021 WSBooker</div>
  </footer>
);
export default Footer;
