import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PageHeader.scss'; // Certifique-se de que o caminho está correto para seu arquivo CSS/Sass
import { FaPlus } from 'react-icons/fa';
import SideForm from '../SideForm/SideForm';

const PageHeader = ({ title, subtitle, icon, sideType, onAdd, hasTotal }) => {
  const IconComponent = icon;

  // States to control the visibility of SideForm and overlay
  const [isSideFormOpen, setIsSideFormOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Function to open the SideForm and overlay
  const openSideForm = () => {
    setIsSideFormOpen(true);
    setIsOverlayOpen(true);
  };

  // Function to close the SideForm and overlay
  const closeSideForm = () => {
    setIsSideFormOpen(false);
    setIsOverlayOpen(false);
  };

  // Check if hasTotal is undefined or null
  const shouldShowTotal = hasTotal != null;

  return (
    <>
      <div className="page-header">
        <div className="header-content">
          <div className='header-infos'>            
            <div className="header-icon">
              <IconComponent />
            </div>
            <div className='header-title'>
              <h1>{title}</h1>
            </div>
            {/* Conditionally render the button based on sideType */}
            {sideType != null && (
              <div className="boxSideForm">
                <button onClick={openSideForm}>
                  <FaPlus />
                </button>
              </div>
            )}
          </div>
          {subtitle && <p className="header-subtitle">{subtitle}</p>}
        </div>
        
        {/* Conditionally render boxTotais based on hasTotal */}
        {shouldShowTotal && (
          <div className="boxTotais">
            <div className='stage-total'>
              <div className='ttlTotal'>Total</div>
              <div className='valor'>{hasTotal}</div>
            </div>
          </div>
        )}

      </div>

      {isOverlayOpen && (
        <div className="overlay" onClick={closeSideForm}></div>
      )}

      {/* SideForm that appears from right to left */}
      <div className={`SideForm ${isSideFormOpen ? 'open' : ''}`}>
        <div className="SideForm-content">
          <SideForm type={sideType} closeSideForm={closeSideForm} onAdd={onAdd} />
        </div>
      </div>
    </>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  sideType: PropTypes.string, // sideType is now optional
  onAdd: PropTypes.func.isRequired, // Ensure onAdd is required and of type function
  hasTotal: PropTypes.number, // Ensure hasTotal is of type number, and now optional
};

export default PageHeader;
