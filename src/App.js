import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/homepage';
import Explore from './pages/explore/explore';
import HomepageFeed from './pages/homepage-feed/homepage-feed';
import ImagePage from './pages/image-page/image-page';
import React, { useState } from 'react';
import StateContext from './context';
import SignUpPage from './pages/signup-page/signup-page';
import ProfilePage from './pages/profile-page/profile-page';
import Header from './components/header/header';
import UploadModal from './components/upload-modal/upload-modal';
import Navbar from './components/navbar/navbar';
import LogoutButton from './components/logout-button/logout-button.component';
import ErrorPage from './pages/errorpage/errorpage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [image, setImage] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [comments, setComments] = useState(null);
  const [token, setToken] = useState(null);
  const [headers, setHeaders] = useState('');
  const [caption, setCaption] = useState(null);

  const stateObj = {
    currentUser,
    setCurrentUser,
    image,
    setImage,
    imageId,
    setImageId,
    otherUser,
    setOtherUser,
    comments,
    setComments,
    token,
    setToken,
    headers,
    setHeaders,
    caption,
    setCaption,
  };

  return (
    <StateContext.Provider value={stateObj}>
      <div className='grid-container'>
        <Router>
          <div className='upload'>{token && <UploadModal />}</div>
          <div className='header'>
            <Header />
          </div>
          <div className='nav'>{token && <Navbar />}</div>
          <div className='content'>
            <Routes>
              <Route
                exact
                path='/'
                element={token ? <HomepageFeed /> : <Homepage />}
              ></Route>
              <Route path='/explore' element={<Explore />}></Route>
              <Route
                path='/image/:imageId'
                element={token ? <ImagePage /> : <ErrorPage />}
              ></Route>
              <Route
                path='/signup'
                element={token ? <HomepageFeed /> : <SignUpPage />}
              ></Route>
              <Route
                path='/users/:username'
                element={token ? <ProfilePage /> : <ErrorPage />}
              ></Route>
            </Routes>
          </div>
          <div className='logout'>{token && <LogoutButton />}</div>
          <div className='ads'>{token ? 'Ads List' : ''}</div>
        </Router>
      </div>
    </StateContext.Provider>
  );
}

export default App;
