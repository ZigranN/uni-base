const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Получение всех услуг
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Создание услуги
router.post('/', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const service = await Service.create({ name, description, price });
        res.status(201).json(service);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
