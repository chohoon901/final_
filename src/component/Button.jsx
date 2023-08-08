import React from 'react';
import style from '../component/style/Button.scss';

export default function Button({ name, onClick, type, disabled, isPurple, display, width, id }) {
  return (
    <button
      type={type ?? 'button'}
      className={`button ${isPurple ? 'purple' : 'white'} ${
        display ? 'displayNone' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
      id={id}
      style={{ width: width }}
    >
      <span>{name}</span>
    </button>
  );
}