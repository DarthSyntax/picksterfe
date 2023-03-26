import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StateContext from '../../context';
import './login.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { currentUser, setCurrentUser, setToken, setHeaders } =
    useContext(StateContext);

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      let res = await fetch('http://localhost:9000/api/v1/users/login', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      let resJson = await res.json();
      if (resJson.token) {
        setToken(resJson.token);
        setHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resJson.token}`,
        });
      }
      if (resJson && !currentUser) setCurrentUser(resJson.user);
      console.log(res.status, resJson);
      if (res.status === 200) {
        console.log('Success');
      }
    } catch (err) {
      console.log(err, err.message);
    }
  };

  const sendToSignup = function (e) {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id='email'
        label='Email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <TextField
        id='password'
        label='Password'
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button className='login-button' variant='contained' type='submit'>
        Log In
      </Button>
      <Button
        className='login-to-signup'
        variant='outlined'
        onClick={sendToSignup}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default Login;
