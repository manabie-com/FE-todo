import React from "react";
import styles from "./TextField.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  label:string
}

const TextField = (props: IProps): JSX.Element => {
  const {value,  errorMessage, label, onChange, name, placeholder, onKeyDown} = props;
  return (
    <div className={styles.inputComponent}>
      <input
        className={
          [styles.inputField,
            (value && styles.gotValue) || "",
            ((errorMessage && styles.inputError) || styles.inputDefault)
          ].join(" ")}
        {...{onChange,name,placeholder,value,onKeyDown}}/>
      <span className={styles.inputLabel}>{label}</span>
      {(errorMessage &&
          <div className={styles.errorMessage}>
            {errorMessage}
          </div>) || ''}
    </div>)
}

export default TextField;