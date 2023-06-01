import React, { useContext } from 'react';
import StateContext from '../../context';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { setCurrentUser, setToken } = useContext(StateContext);
  const navigate = useNavigate();

  const handleClick = function (event) {
    event.preventDefault();
    setCurrentUser(null);
    setToken(null);
    navigate('/');
  };

  return (
    <div className='logout-button'>
      <Button variant='contained' onClick={handleClick}>
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
