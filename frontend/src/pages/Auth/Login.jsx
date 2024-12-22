import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Неверные данные для входа");
            }

            const data = await response.json();
            // Сохраняем токен в localStorage
            localStorage.setItem("token", data.token);
            navigate("/dashboard"); // Перенаправляем на главную страницу
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Вход</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="auth-button">Войти</button>
            </form>
            <p>
                Нет аккаунта?{" "}
                <span onClick={() => navigate("/register")} className="link">
                    Зарегистрируйтесь
                </span>
            </p>
        </div>
    );
};

export default Login;
