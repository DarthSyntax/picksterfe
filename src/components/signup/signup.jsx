import React, { useState, useContext } from 'react';
import './signup.css';
import StateContext from '../../context';
import { TextField, Button } from '@mui/material';

const Signup = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);

  const { currentUser, setCurrentUser, setToken, setHeaders } =
    useContext(StateContext);

  const handleSubmit = async function (event) {
    event.preventDefault();

    await fetch('http://localhost:9000/api/v1/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`,
          });
        }

        if (data && !currentUser) {
          setCurrentUser(data.user);
        }

        console.log(data);
      })
      .catch((err) => {
        console.log(err, username, email, password, passwordConfirm);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id='username'
        label='Username'
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
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
      <TextField
        id='confirmpassword'
        label='Confirm Password'
        value={passwordConfirm}
        onChange={(event) => setPasswordConfirm(event.target.value)}
      />
      <Button className='signup-button' variant='contained' type='submit'>
        Create Account!
      </Button>
    </form>
  );
};

export default Signup;
