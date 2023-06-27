import React, {useRef} from 'react'
import './register.scss'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Regsiter = () => {

const nav = useNavigate()
const userRef = useRef()
const emailRef = useRef()
const passwordRef = useRef()
const checkRef = useRef()


const handleReg = async (e) => {
  e.preventDefault()

  try {
    const res = await axios.post(import.meta.env.VITE_SERVER_URL + '/auth/register', {
      username: userRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    })
    console.log(res.data)
    nav('/login')
  } catch (error) {
    console.log(error)
  }
}


  return (
    <div className='register'>
        <div className="regWrapper">
        <h1>Chat With Me GPT</h1>
        <h4>From Chat GPT</h4>
            <form className='regForm' onSubmit={handleReg}>
                <input type="text" placeholder='username' ref={userRef}  />
                <input type="email" placeholder='email' ref={emailRef} />
                <input type="password" placeholder='password' ref={passwordRef}  />
                <input type="password" placeholder='repeat password' ref={checkRef}  />
                <button type='submit' className='regBtn'>Register</button>
            </form>
            <Link to='/login' className='link'>
              <p>Have an account? Login.</p>
            </Link>
        </div>
    </div>
  )
}

export default Regsiter