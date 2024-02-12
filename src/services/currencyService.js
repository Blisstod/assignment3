const axios = require('axios');
const conversionRequestModel = require('../models/conversionRequest');

class currencyService{
    async convert(fromCurrency, toCurrency, amount){
        const response = await axios.get(`https://api.currencyapi.com/v3/latest`, {
            params: {
                apikey: 'cur_live_B0VShg8zLMZHMURmKR0EcsUDckFPf9bt0d8ICSJ6',
                currencies: `${fromCurrency},${toCurrency}`
            }
        });

        const conversionRate =(1 / response.data.data[fromCurrency].value) * response.data.data[toCurrency].value;
        const conversionAmount = amount * conversionRate;

        const conversionRequest = new conversionRequestModel({
            fromCurrency,
            toCurrency,
            amount,
            result: conversionAmount
        });

        await conversionRequest.save();

        return conversionAmount;
    }
}

module.exports = new currencyService();