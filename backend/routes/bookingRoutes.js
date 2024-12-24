const express = require('express');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/authMiddleware');
const nodemailer = require('nodemailer');
const router = express.Router();

// Настройка транспорта для отправки почты
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Ваш email
        pass: process.env.EMAIL_PASS, // Пароль приложения
    },
});

// Создание записи
router.post('/', protect, async (req, res) => {
    const { type, itemId, email } = req.body; // Получаем email из тела запроса

    try {
        // Получаем userId из токена
        const userIdFromToken = req.user.id;


        // Создаем запись
        const booking = await Booking.create({
            userId: userIdFromToken,
            type,
            itemId,
        });

        // Отправка подтверждающего письма
        const mailOptions = {
            from: process.env.EMAIL_USER, // От кого письмо
            to: process.env.EMAIL_USER, // Кому отправить
            subject: 'Подтверждение записи', // Тема письма
            text: `Вы успешно записались на ${type}. Ваш номер записи: ${booking._id}. Спасибо за ваш выбор!`, // Текст письма
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (err) {
            console.error('Ошибка при отправке письма:', err);
            return res.status(500).json({ message: 'Ошибка при отправке подтверждения на email' });
        }

        res.status(201).json({
            message: 'Запись создана и подтверждение отправлено на email.',
            booking,
        });
    } catch (err) {
        console.error('Ошибка при создании записи:', err);
        res.status(400).json({ message: err.message });
    }
});

// Получение записей пользователя
router.get('/:userId', protect, async (req, res) => {
    try {
        // Проверяем, совпадает ли userId из параметра с userId из токена
        if (req.user.id !== req.params.userId) {
            return res.status(403).json({ message: 'Доступ запрещен' });
        }

        const bookings = await Booking.find({ userId: req.params.userId });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
