import Button from "../../button/Button";
import Modal from "../Modal";
import styles from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
  title:string;
  description: string;
  positiveOnClick?: ()=>void;
  negativeOnClick?: ()=>void;
  isShow: boolean;
}

const ConfirmModal = ({isShow, title, description, positiveOnClick, negativeOnClick}: ConfirmModalProps) => {
  return (
    <Modal isShow={isShow}>
        <div className={styles.modalContainer}>
          <div className={styles.modalTitle}>{title}</div>
          <div className={styles.modalDescription}>{description}</div>
          <div className={styles.modalActionContainer}>
            {
              positiveOnClick && <Button className={styles.modalActionButton} onClick={positiveOnClick}>확인</Button>
            }
            {
              negativeOnClick && <Button className={styles.modalActionButton} onClick={negativeOnClick}>취소</Button>
            }
          </div>
        </div>
      </Modal>
  );
}

export default ConfirmModal;