import React from 'react';
import PropTypes from 'prop-types';

// Import different types of SideForm as needed
import SideFormProdutos from './SideFormProdutos'; // Example import

const SideForm = ({ type, closeSideForm }) => {
  switch (type) {
    case 'SideFormProdutos':
      return <SideFormProdutos closeSideForm={closeSideForm} />;
    // Add more cases as needed for other types of SideForm
    default:
      return (
        <div>
          SideForm for '{type}' not found.
        </div>
      );
  }
};

SideForm.propTypes = {
  type: PropTypes.string.isRequired,
  closeSideForm: PropTypes.func.isRequired,
};

export default SideForm;
