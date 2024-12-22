const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Event", eventSchema);
