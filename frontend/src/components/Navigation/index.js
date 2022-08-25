import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpotModal from '../CreateSpotModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink exact to='/listings' className="navLink listings">Listings</NavLink>
        <CreateSpotModal />
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <div className='logSign'>
        <LoginFormModal />
        <SignupFormModal />
      </div>
    );
  }

  return (
    <ul className='main-nav'>
      <li>
        <NavLink exact to="/" className="navLink homeLogo"><i className="fa-solid fa-house"></i> aircnc</NavLink>
        {/* <NavLink exact to='/' className="homeLink">Home</NavLink> */}
      </li>
      <li>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;