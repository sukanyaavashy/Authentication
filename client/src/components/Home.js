import React, { useContext,useEffect } from 'react';
import { store } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const { token, logout } = useContext(store);
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
 
  useEffect(() => {
    if(!token){
      navigate('/login');
    }
  }, [navigate, token]);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Authenticated with token: {token}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
