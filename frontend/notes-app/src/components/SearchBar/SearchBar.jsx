import React from 'react';
import {FaMagnifyingGlass} from "react-icons/fa6";
import {IoMdClose} from "react-icons/io";

const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
    <div className='search-container'>
        <input
            type='text'
            placeholder='Search Notes'
            className='search-box'
            value={value}
            onChange={onChange}
        />
        {value && (
            <IoMdClose className='close' onClick={onClearSearch}/>
        )}
        <FaMagnifyingGlass className='glass' onClick={handleSearch}/>
    </div>
  )
}

export default SearchBar