import React from 'react';
import './styles.css';
import Types from 'prop-types';

const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

Container.propTypes = {
  children: Types.node.isRequired,
};

export default Container;
