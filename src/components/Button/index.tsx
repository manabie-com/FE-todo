import React from 'react';

import Styles from './button.module.css';

type IButtonProps = {
  type: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  children?: any;
  className?: any;
  disabled?: boolean;
  onClick?: any;
};

const Button = ({
  type,
  style,
  children,
  className,
  disabled,
  onClick,
}: IButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`${Styles.button} ${className} ${disabled && Styles.disabled}`}
      type={type}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
