import React, { useState,useContext } from 'react'
import '../App.css'
import {store} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const {register, error} = useContext(store)
  const[username,setUsername] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[confirmPassword,setConfirmPassword] = useState('')
  // const[passwordErr,setPasswordErr] = useState(false)

  const navigate = useNavigate()

  
  const handleSubmit = async(e) => {
    e.preventDefault()
    // if (password !== confirmPassword) {
    //   setPasswordErr(true);
    // }
    
    await register(username,email,password,confirmPassword)
    if(!error){
      navigate('/login')
    }

  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1 className='heading'>Sign Up Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
        <div className="field">
          <div className='label'>
            <label>Username</label>
            </div>
            <input
              className='input'
              required
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>  
          <div className="field">
            <div className='label'>
            <label>Email</label>
            </div>
            <input
              className='input'
              required
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="field">
          <div className='label'>
            <label>Password</label>
            </div>
            <input
              className='input'
              required
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="field">
          <div className='label'>
            <label>Password</label>
            </div>
            <input
              className='input'
              required
              type="password"
              name="confirmPassword"
              placeholder="ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <div className='btn-field'>
          <button className="button">Sign Up</button>
          </div>
        </div>
      
      </form>
    </div>
  )
}

export default Register
