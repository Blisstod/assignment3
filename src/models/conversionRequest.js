const mongoose = require('mongoose');

const conversionRequestSchema = new mongoose.Schema({
    fromCurrency: String,
    toCurrency: String,
    amount: Number,
    result: Number,
    requestDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ConversionRequest', conversionRequestSchema);
