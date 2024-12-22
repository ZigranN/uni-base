import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        name: "Иван Иванов",
        email: "ivan@example.com",
        phone: "+7 (123) 456-78-90",
        history: [
            { type: "Запись", description: "Урок верховой езды", date: "2024-09-15" },
            { type: "Мероприятие", description: "День открытых дверей", date: "2024-09-20" },
        ],
    });

    const [formData, setFormData] = useState({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleSave = () => {
        setUserData((prev) => ({ ...prev, ...formData }));
        alert("Данные успешно сохранены!");
    };

    if (!isLoggedIn) {
        return (
            <div className="profile-page">
                <h1>Личный кабинет</h1>
                <p>Войдите или зарегистрируйтесь, чтобы управлять аккаунтом</p>
                <button className="login-button" onClick={handleLogin}>
                    Войти
                </button>
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
                    {userData.history.map((item, index) => (
                        <li key={index}>
                            <strong>{item.type}:</strong> {item.description} ({item.date})
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Profile;
