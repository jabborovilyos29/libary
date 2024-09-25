import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: IProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal_overlay} onClick={onClose}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
