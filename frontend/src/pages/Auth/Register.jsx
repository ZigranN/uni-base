import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css'
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при регистрации");
            }

            navigate("/login"); // Перенаправляем на страницу входа
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="name"
                        value={name}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label>Подтвердите пароль</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="auth-button">Зарегистрироваться</button>
            </form>
            <p>
                Уже есть аккаунт?{" "}
                <span onClick={() => navigate("/login")} className="link">
                    Войдите
                </span>
            </p>
        </div>
    );
};

export default Register;
