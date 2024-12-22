import React, { useState } from "react";
import "./Contact.css";

const Contact = ({ contactData }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Проверка на заполненность
        if (!formData.name || !formData.email || !formData.message) {
            setResponseMessage("Пожалуйста, заполните все поля.");
            return;
        }

        // Имитация отправки формы
        console.log("Отправлено сообщение:", formData);
        setResponseMessage("Ваше сообщение отправлено. Спасибо!");

        // Сброс формы
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <div className="contact-page">
            <h1>Свяжитесь с нами</h1>

            {/* Контактная информация */}
            <section className="contact-info">
                <h2>Контактные данные</h2>
                <p>
                    <strong>Адрес:</strong> {contactData.address}
                </p>
                <p>
                    <strong>Телефон:</strong> <a href={`tel:${contactData.phone}`}>{contactData.phone}</a>
                </p>
                <p>
                    <strong>Email:</strong> <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
                </p>
            </section>

            {/* Интерактивная карта */}
            <section className="map">
                <iframe
                    src={contactData.mapUrl}
                    title="Карта местоположения"
                    loading="lazy"
                    style={{ border: 0 }}
                    allowFullScreen
                ></iframe>
            </section>

            {/* Форма обратной связи */}
            <section className="feedback-form">
                <h2>Форма обратной связи</h2>
                <form onSubmit={handleSubmit}>
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

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Введите ваш email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Сообщение</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Введите ваше сообщение"
                        ></textarea>
                    </div>

                    {responseMessage && <p className="response-message">{responseMessage}</p>}

                    <button type="submit" className="submit-button">
                        Отправить
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Contact;
