const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Пользователь уже существует' });
        }

        const user = await User.create({ name, email, password });

        if (user) {
            res.status(201).json({
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: 'Ошибка при регистрации' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Авторизация
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Неверный email или пароль' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получение данных текущего пользователя
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404).json({ message: 'Пользователь не найден' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
