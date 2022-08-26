import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/")
  };

  return (
    <>
      <button onClick={openMenu} className="profileButton">
        <i className="fa-solid fa-bars menu-prof"></i>
        <i className="fa-solid fa-circle-user menu-prof" ></i>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="listing-container">
            <NavLink exact to='/listings' className="navLink listings">Your Listings</NavLink>
          </div>
          <div className="logout-container">
            <button onClick={logout} className="logoutButton">Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;