import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle, FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Иконки
import "./Navbar.css";

const Navbar = ({ navigation, user }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const filteredNavigation = user
        ? navigation
        : navigation.filter((link) => link.label !== "Профиль");

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <NavLink to="/">Лого</NavLink>
                </div>
                <nav className={`navbar ${menuOpen ? "open" : ""}`}>
                    {filteredNavigation.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.path}
                            className={({isActive}) => (isActive ? "nav-link active" : "nav-link")}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
                {/* Кнопки профиля */}
                <div className="profile-buttons">
                    {user ? (
                        <NavLink to="/profile" className="profile-icon" title="Профиль">
                            <FaUserCircle size={24}/>
                            <span className="icon-text">Профиль</span>
                        </NavLink>
                    ) : (
                        <>
                            <NavLink to="/login" className="profile-icon" title="Войти">
                                <FaSignInAlt size={20}/>
                                <span className="icon-text">Войти</span>
                            </NavLink>
                            <NavLink to="/register" className="profile-icon" title="Регистрация">
                                <FaUserPlus size={20}/>
                                <span className="icon-text">Регистрация</span>
                            </NavLink>
                        </>
                    )}
                </div>
                {/* Бургер-меню */}
                <div className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

        </header>

    );
};

export default Navbar;
