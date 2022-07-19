import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginForm.css';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();


    const loginUser = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://pikbe.herokuapp.com/login", {
                email,
                password,
            })
            let str = JSON.stringify(email)
            setId(response.data.userId)
            window.localStorage.setItem("Nama User", str)
            setTimeout(() => navigate("/products"), 500);
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.message)
            }
        }
    }

    window.localStorage.setItem("id", id)

    return (
        <form className="login-container group" onSubmit={loginUser}>
            <p className='error-msg'>{msg}</p>
            <div className='form-login'>
                <div className='email-login'>
                    <p className='email-label'>Email</p>
                    <input type="text" placeholder='Input your email...' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='email-login'>
                    <p className='password-label'>Password</p>
                    <input type="password" placeholder='Input your password...' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <button className='login-btn' type='submit'>Log in</button>
            <Link className='link-accounts' to="/register">Dont have an account?</Link>
        </form>
    )
}


export default LoginForm