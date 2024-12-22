import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import axios from "axios";
import API_BASE_URL from "../../config/api.js";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Обработчик изменения полей формы
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Обработчик отправки формы
    const handleRegister = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/register`, {
                name,
                email,
                password,
            });

            navigate("/login"); // Перенаправляем на страницу входа
        } catch (err) {
            const message =
                err.response?.data?.message || "Ошибка при регистрации";
            setError(message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister} className="auth-form">
                <div className="form-group">
                    <label htmlFor="name">Имя</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Введите имя"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Введите email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Введите пароль"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Подтвердите пароль</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        placeholder="Повторите пароль"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="auth-button">
                    Зарегистрироваться
                </button>
            </form>
            <p className="auth-footer">
                Уже есть аккаунт?{" "}
                <span onClick={() => navigate("/login")} className="link">
                    Войдите
                </span>
            </p>
        </div>
    );
};

export default Register;
