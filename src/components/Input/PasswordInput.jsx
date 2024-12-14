import React, { useState } from 'react';
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6"; 

const PasswordInput = ({value,onChange,placeholder}) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };
    return (
        <div className='password'>
            <input 
                value={value} 
                onChange={onChange} 
                type={isShowPassword ? "text" : "password"} 
                placeholder={placeholder || "Password"}
                className='password-box'
            />
            {!isShowPassword ? <FaRegEye size={22} onClick={() => toggleShowPassword()} className='eye'/> 
                : <FaRegEyeSlash size={22} onClick={() => toggleShowPassword()} className='eye'/>
            }
            
        </div>
    )
}

export default PasswordInput