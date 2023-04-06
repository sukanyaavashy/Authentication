import React, { useContext,useEffect } from 'react';
import { store } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import Cookies from 'js-cookie';

const Home = () => {
  const {  token,logout,user,home,error} = useContext(store);
  const navigate = useNavigate()
  
  const tokenCookie = Cookies.get('token');
 
  useEffect(() => {
    if (token || tokenCookie) {
      home();
    } else {
      navigate('/login');
    }
  }, []);


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // if (error) {
  //   return <div>Error fetching user data. Please try again later.</div>;
  // }


  return (
    <div className="home-container">
    <div className='user-details-card'>
    <h1>Welcome to the Home page!</h1>
      {user ? (
        <div>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ):
       (
        <p>Loading user data...</p>
      )}
      
      <button className='logout-btn' onClick={handleLogout}>Logout</button>
    </div>
    </div>
  );
};

export default Home;
