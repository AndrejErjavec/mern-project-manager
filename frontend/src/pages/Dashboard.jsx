import { useState, useEffect, useContext } from "react";
import UserContext from '../context/store/UserStore';
import {useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import ProjectList from '../components/ProjectList';

const Dashboard = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    
  }, [navigate, user]);


  if (!user) {
    return (
      <p>loading...</p>
    );
  }

  return (
    <>
      <Header user={user}></Header>
      <ProjectList></ProjectList>
    </>
  )
}

export default Dashboard