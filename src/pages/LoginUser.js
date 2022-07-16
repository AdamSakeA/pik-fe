import React from 'react'
import LoginForm from '../components/LoginForm';
import '../styles/LoginForm.css'

function LoginUser() {

    return (
        <div className='login-form group'>
            <h1>LOG IN</h1>
            <div className='login-container'>
            <LoginForm />
            </div>
        </div>
    )
}

export default LoginUser;