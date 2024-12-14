import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./login.css"
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(null);
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