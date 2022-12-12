import { ReactNode } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  isShow: boolean;
  modal?: ReactNode;
  children: ReactNode;
  onOutClick?: ()=>void;
}

const Modal = (props: ModalProps) => {
  return (
    <div className={`${styles.modalBackground} ${!props.isShow && styles.modalNone}`} onClick={props.onOutClick}>
      {
        props.modal ? props.modal 
        : <div className={styles.contentContainer}>
        {
          props.children
        }
      </div>
      }
    </div>
  );
};

export default Modal;