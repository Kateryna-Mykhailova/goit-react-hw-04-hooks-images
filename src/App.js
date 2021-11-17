import './App.css';
import styles from './App.css';

import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar/Searchbar';
import Loader from 'react-loader-spinner';
import searchApi from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

export default function App() {
  const [searchName, setSearchName] = useState('');
  const [searchInfo, setSearchInfo] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [searchPage, setSearchPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImgUrl, setLargeImgUrl] = useState('');

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    setStatus('pending');
    searchApi
      .fetchImage(searchName, searchPage)
      .then(data => {
        setSearchInfo(prevState => [...prevState, ...data.hits]);
        setStatus('resolved');
        scrollFunction();
        // console.log(searchPage);
      })
      .catch(error => setError(error.message));
    return;
  }, [searchName, searchPage]);

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
    setSearchPage(1);
    setSearchInfo([]);
  };

  const scrollFunction = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleClick = () => {
    loadMoreFunction();
  };

  const loadMoreFunction = () => {
    setSearchPage(prevState => prevState + 1);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onOpenModal = () => {
    setShowModal(true);
  };

  const onImgClick = e => {
    // console.log(e.target.dataset);
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    setLargeImgUrl(e.target.dataset.url);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {showModal && (
        <Modal onCloseModal={onCloseModal}>
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
      {status === 'rejected' && <h1>{error}</h1>}
      <ImageGallery
        images={searchInfo}
        onClick={onOpenModal}
        onImgClick={onImgClick}
      />
      {status === 'resolved' && searchInfo.length > 0 && (
        <Button onClick={handleClick} />
      )}
    </div>
  );
}
