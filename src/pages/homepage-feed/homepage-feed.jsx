import React, { useContext } from 'react';
import './homepage-feed.css';
import Header from '../../components/header/header';
import ImageContainerFeed from '../../components/image-container-feed/image-container-feed';
import StateContext from '../../context';
import UploadModal from '../../components/upload-modal/upload-modal';

const HomepageFeed = () => {
  const { currentUser, token } = useContext(StateContext);
  console.log(currentUser);
  return (
    <>
      <div>
        <ImageContainerFeed />
      </div>
    </>
  );
};

export default HomepageFeed;
