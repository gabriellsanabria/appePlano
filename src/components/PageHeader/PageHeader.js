import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PageHeader.scss'; // Ensure the path is correct for your CSS/Sass file
import { FaPlus } from 'react-icons/fa';
import SideForm from '../SideForm/SideForm';

const PageHeader = ({ title, subtitle, icon, sideType, onAdd }) => {
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

  return (
    <>
      <div className="page-header">
        <div className="header-content">
          <div className="header-icon">
            <IconComponent />
          </div>
          <div>
            <h1>{title}</h1>
          </div>
          <div className="boxSideForm">
            <button onClick={openSideForm}>
              <FaPlus />
            </button>
          </div>
        </div>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
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
  sideType: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired, // Ensure onAdd is required and of type function
};

export default PageHeader;
