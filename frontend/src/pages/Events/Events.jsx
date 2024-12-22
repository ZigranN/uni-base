import React, { useState } from "react";
import "./Events.css";
import {useNavigate} from "react-router-dom";

const Events = ({ events }) => {
    const navigate = useNavigate();
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseDetails = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="events-page">
            <h1>Предстоящие мероприятия</h1>

            {/* Календарь мероприятий */}
            <div className="events-list">
                {events.map((event, index) => (
                    <div key={index} className="event-card">
                        <h3>{event.name}</h3>
                        <p>Дата: {event.date}</p>
                        <p>Время: {event.time}</p>
                        <button onClick={() => handleSelectEvent(event)}>
                            Подробнее
                        </button>
                    </div>
                ))}
            </div>

            {/* Подробности мероприятия */}
            {selectedEvent && (
                <div className="event-details">
                    <div className="details-content">
                        <button className="close-button" onClick={handleCloseDetails}>
                            &times;
                        </button>
                        <h2>{selectedEvent.name}</h2>
                        <p><strong>Дата:</strong> {selectedEvent.date}</p>
                        <p><strong>Время:</strong> {selectedEvent.time}</p>
                        <p><strong>Место:</strong> {selectedEvent.location}</p>
                        <p>{selectedEvent.description}</p>
                        <button className="register-button" onClick={() => navigate('/booking')}>Записаться</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
