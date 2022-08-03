import { useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {FaTasks, FaSignOutAlt} from 'react-icons/fa';
import UserContext from '../context/store/UserStore';
import authService from '../features/authService';
import UserAvatar from './UserAvatar';
import '../css/Header.css';

const Header = () => {
  const {user, dispatch} = useContext(UserContext);
  const navigate = useNavigate();
  
  const onLogout = () => {
    authService.logout();
    dispatch({type: 'LOGOUT'});
    navigate('/');
  }

  return (
    <header className="header">
      <div className="header-title">
        <FaTasks size="30px"></FaTasks>
        <h1>React app</h1>
      </div>
      <div className="user-data">
        <UserAvatar user={user}></UserAvatar>
        <p>{user.first_name} {user.last_name}</p>
        <FaSignOutAlt onClick={onLogout} className="logout-btn"></FaSignOutAlt>
      </div>
    </header>
  )
}

export default Header;