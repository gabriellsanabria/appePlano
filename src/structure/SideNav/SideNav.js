// SideNav.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './SideNav.scss';

const SideNav = () => {

  return (
    <>
    <div className='sidenav'>
      <div className='header-sidenav'>
        <img src='https://eplano.s3.sa-east-1.amazonaws.com/logo_E_eplano.webp' />
      </div>
    </div>
    </>
  );
};

export default SideNav;
