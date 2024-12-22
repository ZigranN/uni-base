import React, { useState } from "react";
import "./Home.css";
import {NavLink} from "react-router-dom";

const Home = ({ mainContent, services, about, events }) => {
    if (!mainContent) return <div>Контент временно недоступен</div>;

    const [currentSlide, setCurrentSlide] = useState(0);
    const { welcomeMessage, description, slider } = mainContent;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slider.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slider.length) % slider.length);
    };

    const newSections = [
        {
            title: "О нас",
            image: about?.team?.[0]?.photo || "./assets/images/2.jpg",
            name: about?.history || "Информация о нас пока недоступна.",
            path: "/about"
        },
        {
            title: "Услуги",
            image: services?.[0]?.image || "./assets/images/2.jpg",
            name: services?.[0]?.name || "Услуги временно недоступны.",
            path: "/services"
        },
        {
            title: "Мероприятия",
            image: "./assets/images/2.jpg", // Замените на подходящее изображение, если есть.
            name: events?.[0]?.name || "Мероприятия пока недоступны.",
            path: "/events"
        }
    ];

    return (
        <div className="home-page">
            {/* Приветственное сообщение */}
            <section className="welcome">
                <h1>{welcomeMessage || "Добро пожаловать!"}</h1>
                <p>{description || "Это универсальный шаблон сайта."}</p>
            </section>

            {/* Слайдер */}
            {slider && slider.length > 0 && (
                <section className="slider-container">
                    <button className="slider-button prev" onClick={prevSlide}>
                        &#10094;
                    </button>
                    <div className="slider">
                        <div
                            className="slider-wrapper"
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                                display: "flex",
                                transition: "transform 0.5s ease-in-out",
                            }}
                        >
                            {slider.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Слайд ${index + 1}`}
                                    className="slide"
                                    style={{
                                        width: "100%",
                                        flexShrink: 0,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <button className="slider-button next" onClick={nextSlide}>
                        &#10095;
                    </button>
                </section>
            )}

            {/* Секции */}
            <section className="info-sections">
                {newSections.map((section, index) => (
                    <div key={index} className="info-section">
                        <img src={section.image} alt={section.title} />
                        <h2>{section.title}</h2>
                        <p>{section.name}</p>
                        <NavLink to={section.path} className="info-button">
                            Подробнее
                        </NavLink>
                    </div>
                ))}

                {/* Блок для записи */}
                <div className="info-section">
                    <h2>Вы можете записаться</h2>
                    <p>Запишитесь на подходящее время и получите качественный сервис.</p>
                    <NavLink to="/booking" className="info-button">
                        Записаться
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default Home;
