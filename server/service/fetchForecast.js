/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-destructuring */
const fetch = require('node-fetch');
const dateFns = require('date-fns');
const sv = require('date-fns/locale/sv');

const fetchForecast = async (lon = '12.694454', lat = '56.046411') => {
    return fetchForecastData(lon, lat).then(forecast => {
        if (forecast.rain) {
            return { weather: 'rain', weatherString: 'Det verkar vara regnigt ute. 🌧️' };
        }

        if (forecast.temprature > 15) {
            return { weather: 'hot', weatherString: 'Det verkar vara varmt ute. ☀️' };
        }

        if (forecast.temprature > 10) {
            return { weather: 'neutral', weatherString: 'Det verkar vara lite svalt ute.' };
        }

        return { weather: 'cold', weatherString: 'Det verkar vara kallt ute. 🥶' };
    });
};

/**
 * Fetch latest weather forecast based on a geographical location using SMHI open data API.
 * @param {string} lon Longitude of the geographical location
 * @param {string} lat Latitude of the geographical location
 * @return promise
 */
const fetchForecastData = async (lon, lat) => {
    const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;

    return fetch(url)
        .then(response => {
            if (typeof response.statusText === 'undefined' || response.statusText !== 'OK') {
                console.log(response);
            }
            return response.json();
        })
        .then(json => {
            const currentDate = new Date();
            const currentDateFormatted = dateFns.format(currentDate, 'YYYYMMDDThhmmssZ', {
                locale: sv,
            });
            const timeSeriesDates = json.timeSeries.map(item => item.validTime);

            const closestForecastIndex = dateFns.closestIndexTo(
                currentDateFormatted,
                timeSeriesDates
            );
            const closestForecast = json.timeSeries[closestForecastIndex];
            const targetForecasts = [];

            targetForecasts.push(closestForecast);

            let totalFutureForecastsToInclude = 1;
            while (totalFutureForecastsToInclude > 0) {
                const forecastIndex = totalFutureForecastsToInclude + closestForecastIndex;
                if (typeof json.timeSeries[forecastIndex] !== 'undefined') {
                    targetForecasts.push(json.timeSeries[forecastIndex]);
                }

                totalFutureForecastsToInclude--;
            }

            // Temprature
            const temprature = closestForecast.parameters.filter(
                paramItem => paramItem.name === 't'
            )[0].values[0];

            // Rain
            const rain = targetForecasts.reduce((rain, currentForcast) => {
                if (rain) {
                    return rain;
                }
                // http://opendata.smhi.se/apidocs/metfcst/parameters.html
                // Weather Symbol - Wsymb2, consists of integers, 1 to 27. Every value represents a different kind of weather situation.
                const weatherSymbol = currentForcast.parameters.filter(
                    paramItem => paramItem.name === 'Wsymb2'
                )[0].values[0];

                return typeof weatherSymbol === 'number' && weatherSymbol > 6 && weatherSymbol < 28;
            }, false);

            return { rain: rain, temprature: temprature };
        });
};

module.exports = { fetchForecast };
