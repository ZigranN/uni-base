import React, { createContext, useState, useContext } from "react";

// Создаем контекст
const UserContext = createContext();

// Хук для использования контекста
export const useUser = () => useContext(UserContext);

// Провайдер для оборачивания приложения
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Состояние пользователя

    const login = (userData) => {
        setUser(userData); // Устанавливаем данные пользователя
        localStorage.setItem("user", JSON.stringify(userData)); // Сохраняем в localStorage
    };

    const logout = () => {
        setUser(null); // Удаляем данные пользователя
        localStorage.removeItem("user"); // Удаляем из localStorage
    };

    // Проверка данных пользователя в localStorage
    React.useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
