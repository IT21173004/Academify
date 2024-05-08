import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import AuthModal from '../../auth/authModal/AuthModal';
import { userLogout } from '../../../actions/authActions/authActions';

const Navbar = () => {

  const dispatch = useDispatch();
  const user_Login = useSelector((state) => state.user_Login);
	const { userInfo } = user_Login;

  const handleLogout = () => {
    dispatch(userLogout(userInfo));
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid mx-3">

        <a className="navbar-brand" href="/">ACADEMIFY</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Explore
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Take a free course</a></li>
              <li><a class="dropdown-item" href="#">Subjects</a></li>
            </ul>
            </li>

          </ul>

          <ul className="navbar-nav mb-2 mb-lg-0 d-flex">
            {userInfo ? (
              <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-person-fill-check"></i>
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/user-profile">Profile</a></li>
                <li><a class="dropdown-item" href="/user-dashboard">Dashboard</a></li>
                <li><a class="dropdown-item text-danger" onClick={handleLogout}>Logout</a></li>
              </ul>
              </li>
            ) : (
              <AuthModal />
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
