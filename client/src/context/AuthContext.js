import { createContext,useState,useEffect } from 'react';
import Cookies from 'js-cookie';

export const store = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const[error,setError] = useState(false);

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
        console.log("kkkkkk")
        setToken(data.token)
        Cookies.set("token", data.token);
        setError(false)
      } else {
        console.log("noooo")
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
        Cookies.set("token", data.token);
        setError(false)
        console.log("user registered successfully")
      } else {
       setError(true)
      }
    }catch(err){
      console.log(err)

    }
  }


  const logout = () => {
    setToken(null);
    Cookies.remove('token');
    
  };

  useEffect(() => {
    if (token) {
      Cookies.set('token', token, { expires: 7 });
    } else {
      Cookies.remove('token');
    }
  }, [setToken]);

  return (
    <store.Provider value={{ token,setToken, login, logout, register,error }}>
      {children}
    </store.Provider>
  );
};

// export function useUserAuth() {
//   return useContext(store);
// }