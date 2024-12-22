const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);
