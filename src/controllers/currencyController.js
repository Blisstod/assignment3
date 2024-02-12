const currencyService = require('../services/currencyService')

class currencyController {
    async convertCurrency(req, res){
        const { fromCurrency, toCurrency, amount} = req.body;

        const newFromCurrency = fromCurrency.toUpperCase();
        const newCurrency = toCurrency.toUpperCase();

        try{
            const convertedAmount = await currencyService.convert(newFromCurrency, newCurrency, amount);
            // console.log(convertedAmount);
            res.render('currency-converter', {
                req: req,
                result: `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`,
                fromCurrency,
                toCurrency,
                amount
            });
        } catch (error) {
            res.status(500).render('currency-converter', { req: req, message: 'Error converting currency. Currency should be written in format like: USD, EUR'})
        }
    }
}

module.exports = new currencyController();