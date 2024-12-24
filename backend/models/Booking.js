const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String, // 'event' или 'service'
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'type', // Указывает на коллекцию 'Event' или 'Service'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
