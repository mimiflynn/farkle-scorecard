import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Navbar from './navbar';

const Wrapper = ({
  children
}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node
};

export default connect(null)(Wrapper);
