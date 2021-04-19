import React from 'react';
import { element } from 'prop-types';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import './style.css';

function Layout({ children }) {
  return (
    <>
      <div className="layout-main-container">
        <Header />
        <div className="content-wrap">{children}</div>
        <Footer className="footer" />
      </div>
    </>
  );
}

Layout.propTypes = {
  children: element.isRequired,
};

export default Layout;
