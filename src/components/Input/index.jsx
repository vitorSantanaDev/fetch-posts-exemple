import React from 'react';
import Types from 'prop-types';
import './style.css';

const Input = ({ value, onChange }) => {
  return <input placeholder="Type your search" className="textInput" type="search" value={value} onChange={onChange} />;
};

Input.propTypes = {
  value: Types.string.isRequired,
  onChange: Types.func,
};

export default Input;
