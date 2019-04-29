/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-destructuring */
import dateFns from 'date-fns';
import sv from 'date-fns/locale/sv';

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
                const pcat = closestForecast[0].parameters.filter(
                    paramItem => paramItem.name === 'pcat'
                )[0];

                const t = closestForecast[0].parameters.filter(
                    paramItem => paramItem.name === 't'
                )[0];

                if (pcat.level === 3) {
                    rain = true;
                }

                temprature = t.values[0];
            }

            return { rain: rain, temprature: temprature };
        });
};

export default getForecast;
