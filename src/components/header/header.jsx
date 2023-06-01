import React, { useContext } from 'react';
import StateContext from '../../context';
import './header.css';
import Navbar from '../navbar/navbar';
import UploadModal from '../upload-modal/upload-modal';

const Header = () => {
  const {} = useContext(StateContext);
  return (
    <div className='header'>
      <h1>Pickster</h1>
    </div>
  );
};

export default Header;
