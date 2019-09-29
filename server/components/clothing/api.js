const express = require('express');
const { fetchForecast } = require('../../service/fetchForecast');
const { getSchool } = require('../school/getSchool');

const routes = () => {
    const router = express.Router();

    router.get('/:schoolId', async (request, response) => {
        const { schoolId } = request.params;
        const school = await getSchool(parseInt(schoolId));

        if (!school.data && !school.data.coordinates) {
            console.error('Failed get coordinates');
        }

        let forecast = {};

        try {
            forecast = await fetchForecast(
                school.data.coordinates.lng,
                school.data.coordinates.lat
            );
        } catch (e) {
            console.error(
                `Cannot fetch forecast using coordinates of ${school.data.title} (${
                    school.data.coordinates.lng
                } ${school.data.coordinates.lat})`
            );
            forecast = await fetchForecast();
        }

        if (forecast.rain && forecast.temprature > 15) {
            return response.json({
                weather: 'rain',
                weatherString: 'Det verkar vara regnigt ute. 🌧️',
            });
        }

        if (forecast.rain) {
            return response.json({
                weather: 'rainCold',
                weatherString: 'Det verkar vara kallt och regnigt ute. 🥶 🌧️',
            });
        }

        if (forecast.temprature >= 20) {
            return response.json({
                weather: 'hot',
                weatherString: 'Det verkar vara varmt ute. ☀️',
            });
        }

        if (forecast.temprature >= 16) {
            return response.json({
                weather: 'neutral',
                weatherString: 'Det verkar vara lite svalt ute.',
            });
        }

        return response.json({
            weather: 'cold',
            weatherString: 'Det verkar vara kallt ute. 🥶',
        });
    });

    return router;
};

module.exports = routes;
