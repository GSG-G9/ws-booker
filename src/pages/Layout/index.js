import React from 'react';
import { useLocation } from 'react-router-dom';
import { element } from 'prop-types';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import './style.css';

function Layout({ children }) {
  const location = useLocation().pathname;
  return (
    <>
      <div className="layout-main-container">
        <Header />
        <div className="content-wrap">{children}</div>
        {location !== '/dashboard/add' && location !== '/dashboard/all' && (
          <Footer className="footer" />
        )}
      </div>
    </>
  );
}

Layout.propTypes = {
  children: element.isRequired,
};

export default Layout;
