import React, { useState } from "react";
import "./Home.css";

const Home = ({ mainContent }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    if (!mainContent) return <div>Контент временно недоступен</div>;

    const { welcomeMessage, description, slider, events } = mainContent;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slider.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slider.length) % slider.length);
    };

    return (
        <div className="home-page">
            {/* Приветственное сообщение */}
            <section className="welcome">
                <h1>{welcomeMessage}</h1>
                <p>{description}</p>
            </section>

            {/* Слайдер */}
            <section className="slider-container">
                <button className="slider-button prev" onClick={prevSlide}>
                    &#10094;
                </button>
                <div className="slider">
                    <div
                        className="slider-wrapper"
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                    >
                        {slider.map((image, index) => (
                            <div key={index} className="slide">
                                <img src={image} alt={`Слайд ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <button className="slider-button next" onClick={nextSlide}>
                    &#10095;
                </button>
            </section>

            {/* Анонсы событий */}
            <section className="events">
                <h2>Предстоящие события</h2>
                <ul>
                    {events.map((event, index) => (
                        <li key={index}>
                            <strong>{event.name}</strong> — {event.date}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Home;
