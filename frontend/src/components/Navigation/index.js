import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" className="navigation">Log In</NavLink>
        <NavLink to="/signup" className="navigation">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/" className="homeLogo"><i className="fa-solid fa-house"></i> aircnc</NavLink>
        <NavLink exact to='/' className="navigation">Home</NavLink>
        <NavLink exact to='/listings' className="navigation">Listings</NavLink>
        {/* NEED TO REVISIT -- ADD SEARCH FEATURE WHEN SPOTS COMPONENTS READY*/}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;