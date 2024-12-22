const User = require("../models/User");

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("bookings events");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { name, email, phone }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
