import React from 'react';
import styles from '../Button/Button.module.css';

const Button = ({ onClick }) => {
  return (
    <>
      <button type="button" onClick={onClick} className={styles.Button}>
        Load more
      </button>
    </>
  );
};

export default Button;
