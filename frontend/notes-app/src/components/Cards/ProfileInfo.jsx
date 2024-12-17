import React from 'react'
import './profile.css'
import { getInitials } from '../../utils/helper'
// import { use } from 'react'

const ProfileInfo = ({userInfo,onLogout}) => {
  return (
    <div className='profile-box'>
        <div className='name'>{getInitials(userInfo?.fullName)}</div>
        <div>
            <p className='profile-text'>{userInfo?.fullName}</p>
            <button className='logout' onClick={onLogout}>Logout</button>
        </div>
    </div>
  )
}

export default ProfileInfo