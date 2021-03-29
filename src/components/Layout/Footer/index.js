import React from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookFilled,
  TwitterCircleFilled,
  InstagramFilled,
} from '@ant-design/icons';

import './style.css';

const Footer = () => (
  <footer className="footer">
    <div className="icons-list">
      <Link to="https://www.facebook.com/">
        <FacebookFilled className="fb" />
      </Link>
      <Link to="https://www.twitter.com/">
        <TwitterCircleFilled className="tw" />
      </Link>
      <Link to="https://www.instagram.com/">
        <InstagramFilled className="ins" />
      </Link>
    </div>
    <div className="copyright">&copy; 2021 WSBooker</div>
  </footer>
);
export default Footer;
