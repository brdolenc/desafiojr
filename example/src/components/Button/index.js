import React from 'react';

import './style.css';

const Button = ({ onClick, disabled, children }) => {
  return (
    <>
      {!disabled ? (
        <button type="button" onClick={onClick} className="Button">
        {children}
      </button>
      ) : (
        <button type="button" className="Button Button-disabled" disabled>
        {children}
      </button>
      )}
    </>
  );
}

export default Button;
