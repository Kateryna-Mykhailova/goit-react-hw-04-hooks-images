import React from 'react';
import styles from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, src, largeImg, onClick, onImgClick }) => {
  return (
    <li className={styles.ImageGalleryItem} key={id} onClick={onClick}>
      <img
        onClick={onImgClick}
        className={styles.ImageGalleryItem_image}
        src={src}
        alt=""
        data-url={largeImg}
      />
    </li>
  );
};

export default ImageGalleryItem;
