import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiBadgeCheck } from 'react-icons/bi'
import '../styles/RegisterUser.css'

function RegisterUser() {
    const [ namalengkap, setNamaLengkap ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword] = useState("");
    const [ alamat, setAlamat ] = useState("");
    const [ nomorhp, setNomorhp ] = useState("");
    const [ submit, setSubmit] = useState(false)
    const [msg, setMsg] = useState("")

    const registerUser = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:5000/register", {
                namalengkap,
                email,
                password,
                alamat,
                nomorhp
            })
            setSubmit(true);
        } catch (error) {
            if(error.response) {
                setMsg(error.response.data.message)
            }
        }
    }
 
    if(submit === false) {
        return (
            <div className='form-register group'>
                <div className='form-container'>
                    <h1>REGISTER</h1>
                    <form onSubmit={registerUser}>
                        <p className='error-message'>{msg}</p>
                        <div className='form'>
                            <p>Name</p>
                            <input type="text" className="input" value={namalengkap} onChange={(e) => setNamaLengkap(e.target.value)} placeholder="Input your name.."/>
                        </div>

                        <div className='form'>
                            <p>Email</p>
                            <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Input your email.."/>
                        </div>

                        <div className='form'>
                            <p>Password</p>
                            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Input your password.."/>
                        </div>

                        <div className='form'>
                            <p>Address</p>
                            <input type="text" className="input" value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Input your address.."/>
                        </div>

                        <div className='form'>
                            <p>Phone Number</p>
                            <input type="text" className="input" value={nomorhp} onChange={(e) => setNomorhp(e.target.value)} placeholder="Input your phone number.."/>
                        </div>

                        <div className='form'>
                            <button type='submit' className='btn-primary'>Sign Up</button>
                        </div>

                        <Link className="link-register" to="/login">Have an account? Log in</Link>
                    </form>
                </div>
            </div>
        
        )
    }
    if(submit === true) {
        return (
            <div className='form-register group'>
                <BiBadgeCheck className='register-icons' />
                <h1>Data berhasil di daftar!</h1>
                <label>Harap melakukan </label><Link to="/login">Log in</Link>
            </div>
        )
    }
}

export default RegisterUser