const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./server/models/User");
const Event = require("./server/models/Event");
const Booking = require("./server/models/Booking");
const { users, events, bookings } = require("./fixtures");
require("dotenv").config();

const seedDatabase = async () => {
    try {
        // Подключаемся к базе данных
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Подключено к MongoDB");

        // Очищаем коллекции
        await User.deleteMany();
        await Event.deleteMany();
        await Booking.deleteMany();
        console.log("Данные очищены");

        // Добавляем пользователей
        const createdUsers = [];
        for (const user of users) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            const newUser = await User.create({ ...user, password: hashedPassword });
            createdUsers.push(newUser);
        }
        console.log("Пользователи добавлены");

        // Добавляем мероприятия
        const createdEvents = await Event.insertMany(events);
        console.log("Мероприятия добавлены");

        // Добавляем записи
        for (const booking of bookings) {
            const user = createdUsers.find((u) => u.email === booking.userEmail);
            if (user) {
                await Booking.create({ ...booking, user: user._id });
            }
        }
        console.log("Записи добавлены");

        process.exit();
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error.message);
        process.exit(1);
    }
};

seedDatabase();
