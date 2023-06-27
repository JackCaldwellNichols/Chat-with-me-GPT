import React, {useState, useRef, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { Context } from '../../Context/authContext'
import axios from 'axios'

const Login = () => {

  const userRef = useRef()
  const passwordRef = useRef()
  const {dispatch, isFetching} = useContext(Context)
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({type: "LOGIN_START"})
    try {
      const res = await axios.post(import.meta.env.VITE_SERVER_URL + '/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      console.log(res.data)
      dispatch({type: "LOGIN_SUCCESS", payload: res.data})
      nav('/')
    } catch (error) {
      console.log(error)
      dispatch({type:"LOGIN_FAILURE"})
    }
  }


  return (
    <div className='login'>
        <div className="formWrapper">
          <h1>Login</h1>
            <form className='loginForm' onSubmit={handleSubmit}>
                <input type="text" placeholder='username' ref={userRef}/>
                <input type="password" placeholder='password' ref={passwordRef}/>
                <button type='submit' className='loginBtn'>Login</button>
            </form>
            <p>Don't Have an account? <Link to ='/register' className='link'>Signup here.</Link></p>
        </div>
    </div>
  )
}

export default Login