/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-destructuring */
const fetch = require('node-fetch');
const dateFns = require('date-fns');
const sv = require('date-fns/locale/sv');

/**
 * Get latest weather forecast based on a geographical location using SMHI open data API.
 * @param {string} lon Longitude of the geographical location
 * @param {string} lat Latitude of the geographical location
 * @return promise
 */
const getForecast = async (lon = '12.694454', lat = '56.046411') => {
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
            const timeSeries = json.timeSeries.map(item => item.validTime);
            const closestForecast = json.timeSeries.filter(item =>
                dateFns.isEqual(dateFns.closestTo(currentDateFormatted, timeSeries), item.validTime)
            );

            let rain = false;
            let temprature = 0;

            if (closestForecast.length === 1) {
                // http://opendata.smhi.se/apidocs/metfcst/parameters.html
                // Weather Symbol - Wsymb2, consists of integers, 1 to 27. Every value represents a different kind of weather situation.
                const Wsymb2 = closestForecast[0].parameters.filter(
                    paramItem => paramItem.name === 'Wsymb2'
                )[0];

                // Air Temprature
                const t = closestForecast[0].parameters.filter(
                    paramItem => paramItem.name === 't'
                )[0];

                if (
                    typeof Wsymb2.values !== 'undefined' &&
                    Array.isArray(Wsymb2.values) &&
                    Wsymb2.values.length > 0
                ) {
                    rain = Wsymb2.values[0] > 7 && Wsymb2.values[0] < 28;
                }

                temprature = t.values[0];
            }

            return { rain: rain, temprature: temprature };
        });
};

module.exports = { getForecast };
