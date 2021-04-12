import React from 'react';
import { element } from 'prop-types';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import './style.css';

function Layout({ children }) {
  return (
    <>
      <div className="main-container">
        <Header />
        {children}
        <Footer className="footer" />
      </div>
    </>
  );
}

Layout.propTypes = {
  children: element.isRequired,
};

export default Layout;
