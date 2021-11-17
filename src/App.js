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
import { Modal } from './components/Modal/Modal';

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
        console.log(searchPage);
      })
      .catch(error => setError(error.message));
    return;

    // return () => {setSearchPage(1)}
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

    // setStatus('pending');
    //   searchApi
    //     .fetchImage(searchName, searchPage)
    //     .then(data => {
    //       setSearchInfo(prevState => [...prevState, data.hits]);
    //       console.log(searchInfo);
    //       setStatus('resolved');

    //        setSearchPage(prevState=>prevState + 1)
    //       console.log(searchPage);
    //       console.log('лм фетч');
    //     })
    //     .catch(error => console.log(error))
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {/* {showModal && (
          <Modal onCloseModal={this.onCloseModal}>
            <img src={largeImgUrl} alt="" />
          </Modal>
        )} */}
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
      {/* {status === 'rejected' && <h1>{error.message}</h1>} */}
      {status === 'rejected' && <h1>{error}</h1>}
      {status === 'resolved' && searchInfo.length > 0 && (
        <>
          <ImageGallery
            images={searchInfo}
            // onClick={this.onOpenModal}
            // onImgClick={this.onImgClick}
          />
          <Button onClick={handleClick} />
        </>
      )}
    </div>
  );
}

// const fetchFunction = () => {
//  console.log('fetch');
//  return searchApi
//    .fetchImage(searchName, searchPage)
//    .then(searchInfo => {
//      setSearchInfo([...searchInfo, ...searchInfo.hits]);
//      setStatus('resolved');
//      setSearchPage(prevState => prevState + 1)
//    })
//    .catch(error =>
//      setError(error),
//      setStatus('rejected')
//     );
//       // return()=>{console.log('stop')
// };

//  .then(searchInfo => {
//    setSearchInfo([...searchInfo, ...searchInfo.hits]);
//    setStatus('resolved');
//    setSearchPage(prevState => prevState + 1)
//  })
// .catch(error => {
//   console.log(error);
//  setError(error),
//  setStatus('rejected')});

// return()=>{console.log('stop');}
// }
// },
//     [searchName, searchPage]))
// useEffect(() => {
//   if (searchName === '') {
//     return

//   setSearchPage(1);
//   setStatus('pending');
//   setSearchInfo([]);
//   fetchFunction(searchName, searchPage);

//   // return()=>{console.log('stop');}
//    },
//     [searchName, searchPage])

// class App extends React.Component {
//   state = {
//     searchName: '',
//     searchInfo: [],
//     error: null,
//     status: 'idle',
//     searchPage: 1,
//     showModal: false,
//     largeImgUrl: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.searchInfo.length > 12) {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: 'smooth',
//       });
//     }

//     if (prevState.searchName !== this.state.searchName) {
//       this.setState({ searchPage: 1 });
//       this.setState({ status: 'pending' });
//       this.setState({ searchInfo: [] });
//       this.fetchFunction();
//     }
//     return;
//   }

//   handleFormSubmit = searchName => {
//     this.setState({ searchName });
//   };

//   handleClick = () => {
//     this.fetchFunction();
//     // console.log(this.state.searchInfo.length);
//   };

//   fetchFunction = () => {
//     return searchApi
//       .fetchImage(this.state.searchName, this.state.searchPage)
//       .then(searchInfo => {
//         this.setState({
//           searchInfo: [...this.state.searchInfo, ...searchInfo.hits],
//           status: 'resolved',
//         });
//         this.setState(prevState => ({ searchPage: prevState.searchPage + 1 }));
//       })
//       .catch(error => this.setState({ error, status: 'rejected' }));
//   };

//   onCloseModal = () => {
//     this.setState({ showModal: false });
//   };

//   onOpenModal = () => {
//     this.setState({ showModal: true });
//   };

//   onImgClick = e => {
//     console.log(e.target.dataset);
//     if (e.target.nodeName !== 'IMG') {
//       return;
//     }
//     this.setState({ largeImgUrl: e.target.dataset.url });
//   };

//   render() {
//     const { searchInfo, error, status, showModal, largeImgUrl } = this.state;

//     return (
//       <div className={styles.App}>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {showModal && (
//           <Modal onCloseModal={this.onCloseModal}>
//             <img src={largeImgUrl} alt="" />
//           </Modal>
//         )}
//         <ToastContainer position="top-center" autoClose={2000} />
//         {status === 'idle' && <div>Enter something</div>}
//         {status === 'pending' && (
//           <Loader
//             type="BallTriangle"
//             color="#00BFFF"
//             height={100}
//             width={100}
//             timeout={3000}
//           />
//         )}
//         {status === 'rejected' && <h1>{error.message}</h1>}
//         {status === 'resolved' && searchInfo.length > 0 && (
//           <>
//             <ImageGallery
//               images={searchInfo}
//               onClick={this.onOpenModal}
//               onImgClick={this.onImgClick}
//             />
//             <Button onClick={this.handleClick} />
//           </>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
