import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../components/HenryDex.png'

import './NavBar.css';

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
                <img id="logoHenry" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" />
            </div>
            <nav>
                <ul className="list">
                    <NavLink to="/home" className="menu">HenryDex</NavLink>
                    <NavLink to="/addNew" className="menu">Agregar Nuevo</NavLink>
                </ul>
            </nav>
        </header>
    )
}