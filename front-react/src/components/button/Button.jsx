import React from 'react';
import styles from './Button.css';

function ProjectTable({
    text,
    onClick,
    isDisabled,
    color,
    backgroundColor
  }) {

  return (
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
}

export default ProjectTable;
