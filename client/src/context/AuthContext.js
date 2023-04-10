import { createContext,useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import { TokenExpiredError } from 'jsonwebtoken';


export const store = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const[error,setError] = useState(false);
  const[user,setUser] = useState(null)
  

  const login = async({email, password}) => {
    try{
      const url = 'http://localhost:5000/login'
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      })
      const data = await response.json()
      if (response.ok === true) {
        setToken(data.token)
        Cookies.set("token", data.token, {expires:30});
        setError(false)
      } else {
       setError(true)
      }
    }catch(err){
      console.log(err)

    }
  }


  const register = async (username,email,password,confirmPassword) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username,email,password,confirmPassword }),
      });
      const data = await response.json()
      if (response.ok === true) {
        setToken(data.token)
        Cookies.set('token', data.token, { expires: 30 });
        setError(false)
        console.log("user registered successfully")
      } else {
       setError(true)
      }
    }catch(err){
      console.log(err)

    }
  }

const home = async() => {
  try {
    const response = await fetch('http://localhost:5000/home', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    const data = await response.json();
    if (response.ok === true) {
      setUser(data);
    } else {
      setError(true);
      console.log('Error fetching user data');
    }
  } catch (error) {
    setError(true);
    console.log(error);
  }
}

const logout = () => {
  setToken(null);
  Cookies.remove('token');  
  setUser(null) 
};

useEffect(() => {
  if (token) {
    Cookies.set('token', token, { expires: 30 });
    
  } else {
    Cookies.remove('token');
  }
}, []);

  return (
    <store.Provider value={{ token,setToken, login, logout, register,error,home,user }}>
      {children}
    </store.Provider>
  );
};
