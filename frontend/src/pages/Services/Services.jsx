import React, { useState } from "react";
import "./Services.css";

const Services = ({ services }) => {
    const [filter, setFilter] = useState(""); // Фильтр по категории
    const [sortOrder, setSortOrder] = useState("asc"); // Сортировка (по возрастанию или убыванию)

    const handleFilterChange = (category) => {
        setFilter(category);
    };

    const handleSortChange = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    // Фильтруем услуги по категории
    const filteredServices = services.filter((service) =>
        filter ? service.category === filter : true
    );

    // Сортируем услуги по цене
    const sortedServices = [...filteredServices].sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    return (
        <div className="services-page">
            <h1>Наши услуги</h1>

            {/* Фильтрация */}
            <div className="filter-sort-controls">
                <div className="filter-controls">
                    <button onClick={() => handleFilterChange("")}>Все категории</button>
                    <button onClick={() => handleFilterChange("Категория 1")}>
                        Категория 1
                    </button>
                    <button onClick={() => handleFilterChange("Категория 2")}>
                        Категория 2
                    </button>
                </div>

                {/* Сортировка */}
                <div className="sort-controls">
                    <button onClick={handleSortChange}>
                        Сортировка по цене ({sortOrder === "asc" ? "↑" : "↓"})
                    </button>
                </div>
            </div>

            {/* Список услуг */}
            <div className="services-list">
                {sortedServices.map((service, index) => (
                    <div key={index} className="service-card">
                        <img src={service.image} alt={service.name} />
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                        <p className="price">Цена: {service.price} ₽</p>
                    </div>
                ))}
            </div>

            {/* Галерея */}
            <div className="gallery">
                <h2>Фотогалерея</h2>
                <div className="gallery-grid">
                    {services.map((service, index) => (
                        <div key={index} className="gallery-item">
                            <img src={service.image} alt={service.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
