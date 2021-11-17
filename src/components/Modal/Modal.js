import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '../Modal/Modal.module.css';

export default function Modal({ onCloseModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleEscape = e => {
    let condition = e.code === 'Escape';
    if (condition) {
      onCloseModal();
    }
    console.log(e.code === 'Escape');
  };

  const handleClose = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleClose}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    document.getElementById('modalRoot'),
  );
}
