import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Services from "./pages/Services/Services.jsx";
import About from "./pages/About/About.jsx";
import Booking from "./pages/Booking/Booking.jsx";
import Events from "./pages/Events/Events.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";

const App = () => {
    const [config, setConfig] = useState(null);
    const [user, setUser] = useState(null); // Состояние пользователя

    useEffect(() => {
        fetch("/config.json")
            .then((response) => response.json())
            .then((data) => setConfig(data))
            .catch((error) => console.error("Ошибка загрузки конфигурации:", error));

        // Пример: заглушка для пользователя
        setUser(null); // Установите пользователя для тестирования
    }, []);

    if (!config) return <div>Загрузка...</div>;

    return (
        <div>
            <Navbar navigation={config.navigation} />
            <div className="home-page">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home mainContent={config.mainContent["/"]} />} />
                    <Route path="/services" element={<Services services={config.services} />}/>
                    <Route path="/about" element={<About aboutData={config.about} />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/events" element={<Events events={config.events} />} />
                    <Route path="/contact" element={<Contact contactData={config.contact} />} />
                    <Route path="/profile" element={<Profile />} />

                </Routes>
            </div>
            <Footer footerData={config.footer} />
        </div>
    );
};

export default App;
