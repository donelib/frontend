import { ReactNode } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  isShow: boolean;
  modal?: ReactNode;
  children: ReactNode;
}

const Modal = (props: ModalProps) => {
  // isShow 
  // onOutClick
  return (
    <div className={`${styles.modalBackground} ${!props.isShow && styles.modalNone}`}>
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