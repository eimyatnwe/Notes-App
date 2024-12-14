import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "../Login/login.css"
import PasswordInput from "../../components/Input/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
const SignUp = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        if(!name){
            setError("Please enter your name");
            return;
        }
        if(!validateEmail(email)){
            setError("Please enter a valid email address");
            return;
        }
        if(!password){
            setError("Please enter the password");
            return;
        }
        setError("");

        //sign up api call

    }
    return(
        <>
            <Navbar/>
            <div className="outer">
                <div className="form-box">
                    <form onSubmit={handleSignUp}>
                        <h4 className="login-title">Sign Up</h4>
                        <input 
                            type="text" 
                            placeholder="name" 
                            className="input-box" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="email" 
                            className="input-box" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PasswordInput 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        {error && <p className="error-text">{error}</p>}
                        <button type="submit" className="btn-primary">Create Account</button>
                        <p className="register"> 
                            Already have an account?{" "} 
                            <Link to="/login" className="links">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;