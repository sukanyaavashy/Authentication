import React from 'react';
import { Routes,Route } from 'react-router-dom';
import {AuthContextProvider} from './context/AuthContext';
import Login from './authentication/Login';
import Register from './authentication/Register'
import Home from './components/Home'
// import { store } from './context/AuthContext';

function App() {
  // const { token } = useContext(store);
  return (
    
     <AuthContextProvider>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </AuthContextProvider>
    
  );
}

export default App;
