import React from "react";
import styles from "./Button.module.css";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}


const Button = (props:IProps):JSX.Element => {
  return (
    <button {...props} className={[styles.customButton, props.className].join(" ")}/>
  )
}

export default Button;