import React, { useContext, useEffect, useState } from 'react'
import './home.scss'
import Typewriter from 'typewriter-effect';
import ApiIcon from '@mui/icons-material/Api';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Context } from '../../Context/authContext';


const Home = () => {
const {user, dispatch} = useContext(Context)
const [value, setValue] = useState('')
const [message, setMessge] = useState(null)
const [loading, setLoading] = useState(false)
const [previousChats, setPreviousChats] = useState([])
const [currentTitle, setCurrentTitle] = useState(null)


const handleSend = async (e) => {
  if(e.key === "Enter"){
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-type": "application/json"
      }
    }
    try {
      setLoading(true)
      const res = await fetch('http://localhost:8080/api/ai/completions', options)
      const data = await res.json()
      setMessge(data.choices[0].message)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
}

useEffect(() => {
  if(!currentTitle && message && value){
    setCurrentTitle(value)
  }
  if(currentTitle && message && value){
    setPreviousChats(prevChats => (
      [...prevChats, 
        {
          title: currentTitle,
          role: <PermIdentityIcon style={{border: '1px solid whitesmoke', borderRadius: '50%', width: '35px', height: '35px'}}/>,
          content: value
        },
        {
          title: currentTitle,
          role: <ApiIcon style={{ width: '35px', height: '35px'}}/>,
          content: 
          <Typewriter
          options={{
          strings: [message.content],
          autoStart: true,
          loop: false,
          delay: 12,
          pauseFor: 1000000000000
            }}
          />
        }
      ]
    ))
  }
}, [message, currentTitle])


const handleNewChat = () => {
  setCurrentTitle(null)
  setMessge(null)
  setValue('')
}

const currentChat = previousChats.filter(preChat => preChat.title === currentTitle)

const titles = Array.from(new Set(previousChats.map(prevChat => prevChat.title)))

const handleClick = (title) => {
  setCurrentTitle(title)
    setMessge(null)
  setValue('')
}


const handleLogout = () => {
  dispatch({type: 'LOGOUT'})
  nav
}

  return (
    <div className="home">
      <div className="left">
        <div className='sidebar'>
          <div className="top">
          <button className='newChatBtn' onClick={handleNewChat}>+ New Chat</button>
              <ul className='chatHistory'>
                  {titles.map((title, index) => (
                      <li className='chatItem' key={index} onClick={()=> handleClick(title)}>{title}</li>
                  ))}
              </ul>
          </div>
          <div className="bottom" onClick={handleLogout}>
              <h4 className='logout'>Logout</h4>
          </div>
      </div>
      </div>
      <div className="right">
        <div className="top">
            <h2 className='title'>Welcome to Chat With Me, {user.username}!</h2>
              <div className="inputWrapper">
                  <input type="search" placeholder='Ask me something...' className='askInput' value={value} onChange={(e) =>setValue(e.target.value)} onKeyDown={handleSend}/>
              </div>
          </div>
          <div className="center">
          {loading ? ( <p>Preparing your answer...</p> ) : (null)}
          <ul className='feed'>
              {currentChat.map((chatMessage, index) =>(
                <li key={index}>
                  <p className='role'>{chatMessage.role}</p>
                  <p>{chatMessage.content}</p>
                </li>
              ))}
            </ul>
            
          </div>
         
      </div>
    </div>
  )
}

export default Home