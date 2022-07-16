import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/navbar.css";
import NavbarLogout from './NavbarLogout';

export default function Navbar() {
    const location = useLocation()
    const [url, setUrl] = useState(null)
    
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]); 

    const CustomLink = ({to, children, ...props}) => {
        return (
            <li>
                <Link className={url === to ? "link-navbar active" : "link-navbar"} to={to} {...props}>{children}</Link>
            </li>
        )
    }

    const ChekLocalStorage = () => {
        const userName = localStorage.getItem('Nama User');
        return userName === null ? <button className="login-navbar"><Link to="/login" className="login-navbar">Login</Link></button> : <NavbarLogout />
    }
    
    return (
        <div className='navbar-container'>
            <nav className="Navbar group">
                <Link className = "link-navbar" to="/">K' Mas Coffee</Link>
                <ul className='navbar-right'>
                    <CustomLink to="/">Home</CustomLink>
                    <CustomLink to="/products">Shop</CustomLink>
                    <CustomLink to="/coffeebar">Coffee Bar</CustomLink>
                </ul>
                <div>
                    <ChekLocalStorage />
                </div>
            </nav>
        </div>
    )  
}
