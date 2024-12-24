import API_BASE_URL from "../../config/api.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });

            // Сохранение токена и профиля пользователя
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            // Перенаправление на страницу профиля
            navigate("/profile");
        } catch (err) {
            setError(err.response?.data?.message || "Ошибка входа");
        }
    };

    return (
        <div className="auth-container">
            <h2>Вход</h2>
            <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Введите email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Введите пароль"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="auth-button">Войти</button>
            </form>
            <p className="auth-footer">
                Нет аккаунта?{' '}
                <span onClick={() => navigate("/register")} className="link">
                    Зарегистрируйтесь
                </span>
            </p>
        </div>
    );
};

export default Login;
