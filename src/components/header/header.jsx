import React, { useContext } from 'react';
import StateContext from '../../context';
import './header.css';
import Navbar from '../navbar/navbar';
import UploadModal from '../upload-modal/upload-modal';

const Header = () => {
  const { token } = useContext(StateContext);
  return (
    <div>
      <h1 className='header'>Pickster</h1>
      <Navbar />
      {token ? <UploadModal /> : ''}
    </div>
  );
};

export default Header;
