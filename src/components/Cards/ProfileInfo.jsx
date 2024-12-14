import React from 'react'
import './profile.css'

const ProfileInfo = ({onLogout}) => {
  return (
    <div className='profile-box'>
        <div className='name'>TU</div>
        <div>
            <p className='profile-text'>William</p>
            <button className='logout' onClick={onLogout}>Logout</button>
        </div>
    </div>
  )
}

export default ProfileInfo