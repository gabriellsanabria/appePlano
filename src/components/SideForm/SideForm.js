import React from 'react';
import PropTypes from 'prop-types';

// Import different types of SideForm as needed
import SideFormProdutos from './SideFormProdutos'; // Example import

const SideForm = ({ type, closeSideForm, onAdd }) => {
  switch (type) {
    case 'SideFormProdutos':
      return <SideFormProdutos closeSideForm={closeSideForm} onAdd={onAdd} />;
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
  onAdd: PropTypes.func.isRequired, // Ensure onAdd is required and of type function
};

export default SideForm;
