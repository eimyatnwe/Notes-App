import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "../Login/login.css"
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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
        try{
            const response = await axiosInstance.post("/create-account", {
                fullName : name,
                email : email,
                password : password,
            });

            //handle successful signup response
            if(response.data && response.data.error){
                // localStorage.setItem("token", response.data.accessToken);
                setError(response.data.message);
                return
                
            }
            if(response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        }catch(error){
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }else{
                setError("An unexpected error occurred. Please try again")
            }
        }

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