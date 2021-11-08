import { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from '../Modal/Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = e => {
    let condition = e.code === 'Escape';
    if (condition) {
      this.props.onCloseModal();
    }
    console.log(e.code === 'Escape');
  };

  handleClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleClose}>
        <div className={styles.Modal}>
          {children}

          {/* <img src="" alt="" /> */}
        </div>
      </div>,
      document.getElementById('modalRoot'),
    );
  }
}
