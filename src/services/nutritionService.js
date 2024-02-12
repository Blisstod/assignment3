const axios = require('axios');
const NutritionRequestModel = require('../models/nutritionRequest');

class nutritionService {
    async analyze(query) {
        const headers = { 'X-Api-Key': 'O0/DxWvj8IWd6FYk/mZwgg==9kltIk7IkBeTBzmE' };
        const response = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, { headers });

        const resultData = response.data[0];

        console.log(resultData)
        const nutritionResult = new NutritionRequestModel({
            query: query,
            calories: resultData.calories,
            protein: resultData.protein_g,
            fat: resultData.fat_total_g,
            carbs: resultData.carbohydrates_total_g,
            sugar: resultData.sugar_g
        });

        await nutritionResult.save();

        return resultData;
    }
}

module.exports = new nutritionService();
