import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

const Home = ({
  children
}) => {
  const divClasses = classNames('container', 'container-home');

  return (
    <div className={divClasses}>
      {children}
    </div>
  );
};

Home.propTypes = {
  children: PropTypes.node,
};

export default connect(null)(Home);
