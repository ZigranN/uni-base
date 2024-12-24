import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../UserContext"; // Используем UserContext
import "./Booking.css";
import API_BASE_URL from "../../config/api.js";

const Booking = () => {
    const { user } = useUser(); // Получаем текущего пользователя из контекста
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Устанавливаем имя и email из контекста пользователя
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            name: user?.name || "",
            email: user?.email || "",
        }));
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Валидация данных
        if (!formData.name || !formData.phone || !formData.date || !formData.time) {
            setMessage("");
            setError("Пожалуйста, заполните все поля");
            return;
        }

        try {
            // Отправка данных на сервер
            await axios.post(`${API_BASE_URL}/bookings`, {
                email: user?.user.email, // userId из контекста
                phone: formData.phone,
                date: formData.date,
                time: formData.time,
            });

            // Успешное подтверждение записи
            setMessage(`Запись подтверждена! Подробности отправлены на ${formData.email}`);
            setError("");

            // Сброс формы
            setFormData({
                name: user?.name || "",
                phone: "",
                date: "",
                time: "",
            });
        } catch (err) {
            setMessage("");
            setError(err.response?.data?.message || "Произошла ошибка при записи");
        }
    };

    return (
        <div className="booking-page">
            <h1>Онлайн-запись</h1>
            <p>Заполните форму, чтобы записаться на мероприятие или услугу</p>

            <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Имя</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ""} // Убедитесь, что значение не undefined
                        onChange={handleChange}
                        placeholder="Введите ваше имя"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Телефон</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Введите ваш телефон"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Дата</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Время</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                {message && <p className="message success">{message}</p>}
                {error && <p className="message error">{error}</p>}
                <button type="submit" className="submit-button">Записаться</button>
            </form>
        </div>
    );
};

export default Booking;
