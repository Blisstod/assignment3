// models/nutritionResult.js
const mongoose = require('mongoose');

const nutritionRequestSchema = new mongoose.Schema({
    query: String,
    calories: Number,
    protein: Number,
    fat: Number,
    carbs: Number,
    sugar: Number,
    requestDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NutritionResult', nutritionRequestSchema);
