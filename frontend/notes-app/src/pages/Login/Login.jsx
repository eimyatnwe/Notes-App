import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./login.css"
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }
        setError("")
        if(!password){
            setError("Please enter the password");
            return;
        }
        setError("")

        //Login API call
        try{
            const response = await axiosInstance.post("/login", {
                email : email,
                password : password,
            });

            //handle successful login response
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
                    <form onSubmit={handleLogin}>
                        <h4 className="login-title">Login</h4>
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
                        <button type="submit" className="btn-primary">Login</button>
                        <p className="register"> 
                            Not registered yet?{" "} 
                            <Link to="/signup" className="links">Create an Account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;