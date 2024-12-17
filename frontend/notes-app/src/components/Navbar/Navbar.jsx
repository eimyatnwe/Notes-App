import React, {useState} from 'react'
import './navStyles.css';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({userInfo, onSearchNote, handleClearSearch}) => {
  //when user click logout button, it will navigate back to login page
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  }

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = ()=>{
    if(searchQuery){
      onSearchNote(searchQuery);
    }
  }

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  }

  return (
    <div className='shadow-custom'>
        <h2 className='title'>Notes</h2>
        <SearchBar 
          value={searchQuery}
          onChange={({target}) => {
            setSearchQuery(target.value);
          }}
          handleSearch = {handleSearch}
          onClearSearch = {onClearSearch}
          
        />
        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>

  )
}

export default Navbar