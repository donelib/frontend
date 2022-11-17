import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void | undefined;
}

const Button = (props: ButtonProps) => {
  return (
    <div className={styles.button} onClick={props.onClick}>
      {
        props.children
      }
    </div>
  )
}

export default Button;