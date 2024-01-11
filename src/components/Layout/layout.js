// frontend/src/components/Layout/Layout.js
import React from 'react';
import SideNav from '../../structure/SideNav/SideNav';
import Header from '../../structure/Header/Header';

const Layout = ({ children }) => {
  return (
    <div className="dashboard-page">  
      <SideNav />
      <div className="dashboard-content">
        <Header />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
