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
        <div className='test'>

          <div className='cs-container'>
            <CreateSpotModal />
          </div>
          <div className='pb-container'>
            <ProfileButton user={sessionUser} />
          </div>
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        {/* <LandingProfileButton /> */}
        <div className="logSign">
          <div className='login'>
            <LoginFormModal />
          </div>
          <div>
            <SignupFormModal />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='nav-container'>
      <div className='main-nav'>
        <div>
          <NavLink exact to="/" className="navLink" id="homeLogo"><i className="fa-solid fa-house"></i> aircnc</NavLink>
        </div>
        {isLoaded && sessionLinks}
      </div>

    </div>
  );
}

export default Navigation;