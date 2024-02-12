const nutritionService = require('../services/nutritionService');

class NutritionController {

    async analyzeNutrition(req, res) {
        const query = req.body.query;

        try {
            const nutritionData = await nutritionService.analyze(query);
            res.render('nutrition-analysis', { req: req, nutritionData });
        } catch (error) {
            res.status(500).render('nutrition-analysis', { req: req, message: 'Error retrieving nutrition data', nutritionData: null });
        }
    }
}

module.exports = new NutritionController();
