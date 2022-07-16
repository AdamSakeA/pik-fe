import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/ErrorForm.css';

function ErrorLogin() {
  return (
    <div className='error-form group'>
        <h1>Please Login to chek our Products</h1>
        <h2>Dont have an account?</h2>
        <Link className="link-errorlogin" to={"/register"}>Register</Link>
        <Link className="link-errorlogin" to={"/login"}> or Login</Link>
    </div>
  )
}

export default ErrorLogin