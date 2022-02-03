import React from 'react';
import './styles.css';
import Types from 'prop-types';

const Button = ({ text, onClick, disabled }) => {
  return (
    <div className="buttonContainer">
      <button disabled={disabled} className="button" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

Button.propTypes = {
  text: Types.string.isRequired,
  onClick: Types.func.isRequired,
  disabled: Types.bool.isRequired,
};
export default Button;
