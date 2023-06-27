import React from 'react'
import './sidebar.scss'

const Sidebar = ({titles}) => {

  return (
    <div className='sidebar'>
        <div className="top">
            <ul className='chatHistory'>
                {titles.map((title, index) => (
                     <li className='chatItem' key={index}>{title}</li>
                ))}
            </ul>
        </div>
        <div className="bottom">
            <h5>Jack GPT</h5>
        </div>
    </div>
  )
}

export default Sidebar