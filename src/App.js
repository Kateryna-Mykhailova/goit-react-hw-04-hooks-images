import './App.css';
import styles from './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar/Searchbar';
import Loader from 'react-loader-spinner';
import searchApi from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import { Modal } from './components/Modal/Modal';

class App extends React.Component {
  state = {
    searchName: '',
    searchInfo: [],
    error: null,
    status: 'idle',
    searchPage: 1,
    showModal: false,
    largeImgUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchInfo.length > 12) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    if (prevState.searchName !== this.state.searchName) {
      this.setState({ searchPage: 1 });
      this.setState({ status: 'pending' });
      this.setState({ searchInfo: [] });
      this.fetchFunction();
    }
    return;
  }

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  };

  handleClick = () => {
    this.fetchFunction();
    // console.log(this.state.searchInfo.length);
  };

  fetchFunction = () => {
    return searchApi
      .fetchImage(this.state.searchName, this.state.searchPage)
      .then(searchInfo => {
        this.setState({
          searchInfo: [...this.state.searchInfo, ...searchInfo.hits],
          status: 'resolved',
        });
        this.setState(prevState => ({ searchPage: prevState.searchPage + 1 }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  onOpenModal = () => {
    this.setState({ showModal: true });
  };

  onImgClick = e => {
    console.log(e.target.dataset);
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    this.setState({ largeImgUrl: e.target.dataset.url });
  };

  render() {
    const { searchInfo, error, status, showModal, largeImgUrl } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {showModal && (
          <Modal onCloseModal={this.onCloseModal}>
            <img src={largeImgUrl} alt="" />
          </Modal>
        )}
        <ToastContainer position="top-center" autoClose={2000} />
        {status === 'idle' && <div>Enter something</div>}
        {status === 'pending' && (
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        {status === 'rejected' && <h1>{error.message}</h1>}
        {status === 'resolved' && searchInfo.length > 0 && (
          <>
            <ImageGallery
              images={searchInfo}
              onClick={this.onOpenModal}
              onImgClick={this.onImgClick}
            />
            <Button onClick={this.handleClick} />
          </>
        )}
      </div>
    );
  }
}

export default App;
