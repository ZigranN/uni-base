import React, { useState } from "react";
import "./Booking.css";

const Booking = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Валидация данных
        if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
            setMessage("Пожалуйста, заполните все поля");
            return;
        }

        // Имитация подтверждения записи
        setMessage(`Запись подтверждена! Подробности отправлены на ${formData.email}`);

        // Здесь вы можете отправить данные на сервер
        console.log("Данные формы:", formData);

        // Сброс формы
        setFormData({
            name: "",
            email: "",
            phone: "",
            date: "",
            time: "",
        });
    };

    return (
        <div className="booking-page">
            <h1>Онлайн-запись</h1>
            <p>Заполните форму, чтобы записаться на занятия</p>

            <form className="booking-form" onSubmit={handleSubmit}>
                {/* Имя */}
                <div className="form-group">
                    <label htmlFor="name">Имя</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Введите ваше имя"
                    />
                </div>

                {/* Электронная почта */}
                <div className="form-group">
                    <label htmlFor="email">Электронная почта</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Введите ваш email"
                    />
                </div>

                {/* Телефон */}
                <div className="form-group">
                    <label htmlFor="phone">Телефон</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Введите ваш телефон"
                    />
                </div>

                {/* Дата */}
                <div className="form-group">
                    <label htmlFor="date">Дата</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>

                {/* Время */}
                <div className="form-group">
                    <label htmlFor="time">Время</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                    />
                </div>

                {/* Сообщение */}
                {message && <p className="message">{message}</p>}

                {/* Кнопка отправки */}
                <button type="submit" className="submit-button">Записаться</button>
            </form>
        </div>
    );
};

export default Booking;
