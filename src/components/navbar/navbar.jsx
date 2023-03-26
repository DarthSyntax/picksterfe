import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to='/' className='link'>
        Home
      </Link>
      <Link to='/explore' className='link'>
        Explore
      </Link>
    </div>
  );
};

export default Navbar;
