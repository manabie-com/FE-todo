import React from 'react';

import Styles from './input.module.css';

type IInputProps = {
  value?: string;
  id?: string;
  onChange?: any;
  style?: React.CSSProperties;
  name?: string;
  labelName?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  onKeyDown?: any;
  checked?: boolean;
  classNameLabel?: string;
  classNameContainerInput?: string;
};

const Input = (props: IInputProps, ref: any) => {
  const {
    id,
    value,
    onChange,
    labelName,
    name,
    style,
    type,
    className,
    placeholder,
    onKeyDown,
    checked,
    classNameLabel,
    classNameContainerInput,
  } = props;
  return (
    <label className={classNameContainerInput} htmlFor={id}>
      {labelName && (
        <span className={`${Styles.labelName} ${classNameLabel}`}>
          {labelName}
        </span>
      )}
      <input
        ref={ref}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        style={style}
        onChange={onChange}
        type={type}
        className={className}
        onKeyDown={onKeyDown}
        checked={checked}
      />
    </label>
  );
};

export default React.forwardRef(Input);
