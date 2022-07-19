import React from "react";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const NavbarLogout = () => {
    const navigate = useNavigate()
    const userName = localStorage.getItem('Nama User');

    const Logout = async() => {
        try {
            await axios.delete("https://pikbe.herokuapp.com/logout");
            window.localStorage.clear()
            navigate("/login");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="dropdown">
            <p className="dropbtn">Halo, {userName}</p>
            <div className="dropdown-content">
                <button className='menu-dropdown'><Link className="link-dropdown" to={"/settings"}>Settings</Link></button>
                <button className='menu-dropdown' onClick={() => Logout()}>Log Out</button>
            </div>
        </div>
    )
}

export default NavbarLogout