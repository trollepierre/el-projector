import React from 'react';
import styles from './Button.css';

const Button = ({
    text,
    onClick,
    isDisabled,
    color,
    backgroundColor
  }) => (
  <button
    className='button'
    onClick={onClick}
    color={color}
    disabled={isDisabled}
    // style={backgroundColor: 'backgroundColor', color: color}
  >
    {text}
  </button>
);

export default Button;
