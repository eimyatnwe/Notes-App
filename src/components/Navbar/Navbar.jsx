import React from 'react'
import './navStyles.css';
import ProfileInfo from '../Cards/ProfileInfo';

const Navbar = () => {
  return (
    <div className='shadow-custom'>
        <h2 className='title'>Notes</h2>
        <ProfileInfo className="profile"/>
    </div>

  )
}

export default Navbar