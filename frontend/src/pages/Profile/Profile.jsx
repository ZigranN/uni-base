import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Авторизация пользователя
    const [userData, setUserData] = useState(null); // Данные пользователя
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" }); // Данные формы
    const [isLoading, setIsLoading] = useState(true); // Индикатор загрузки

    const API_BASE_URL = "http://localhost:5000/api"; // URL вашего бэкенда

    // Получение профиля пользователя
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Вы не авторизованы");

                const response = await axios.get(`${API_BASE_URL}/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const profile = response.data;
                setUserData(profile);
                setFormData({ name: profile.name, email: profile.email, phone: profile.phone });
                setIsLoggedIn(true);
                setIsLoading(false);
            } catch (error) {
                console.error("Ошибка получения профиля:", error.message);
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Обработка изменений в форме
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Сохранение изменений профиля
    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`${API_BASE_URL}/user/profile`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUserData(response.data.user);
            alert("Данные успешно сохранены!");
        } catch (error) {
            console.error("Ошибка сохранения данных:", error.message);
            alert("Не удалось сохранить данные.");
        }
    };

    // Выход из аккаунта
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserData(null);
    };

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (!isLoggedIn) {
        return (
            <div className="profile-page">
                <h1>Личный кабинет</h1>
                <p>Войдите, чтобы управлять аккаунтом</p>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <h1>Личный кабинет</h1>
            <button className="logout-button" onClick={handleLogout}>
                Выйти
            </button>

            {/* Управление личными данными */}
            <section className="user-data">
                <h2>Личные данные</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Имя</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
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
                            disabled // Email нельзя редактировать
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="button" className="save-button" onClick={handleSave}>
                        Сохранить изменения
                    </button>
                </form>
            </section>

            {/* История записей */}
            <section className="history">
                <h2>История записей и мероприятий</h2>
                <ul>
                    {userData.history && userData.history.length > 0 ? (
                        userData.history.map((item, index) => (
                            <li key={index}>
                                <strong>{item.type}:</strong> {item.description} ({item.date})
                            </li>
                        ))
                    ) : (
                        <p>Нет записей</p>
                    )}
                </ul>
            </section>
        </div>
    );
};

export default Profile;
