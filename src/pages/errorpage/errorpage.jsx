import React from 'react';
import './errorpage.css';
import Login from '../../components/login/login';

const ErrorPage = () => {
  return (
    <div className='content'>
      <h4>Must be logged in to access this page!</h4>
      <Login />
    </div>
  );
};

export default ErrorPage;
