// TwoColumnLayout.js
import React from 'react';
import './TwoColumnLayout.scss';

const TwoColumnLayout = ({ children }) => {
  return (
    <div className="two-column-layout">
      {children}
    </div>
  );
};

export default TwoColumnLayout;
