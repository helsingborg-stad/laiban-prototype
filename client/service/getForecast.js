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

            // console.log('TCL: getForecast -> currentDate', currentDate);

            const currentDateFormatted = dateFns.format(currentDate, 'YYYYMMDDThhmmssZ', {
                locale: sv,
            });

            // console.log('TCL: getForecast -> currentDateFormatted', currentDateFormatted);

            const timeSeries = json.timeSeries.map(item => item.validTime);
            // console.log('TCL: getForecast -> timeSeries', timeSeries);

            const closestTime = dateFns.closestTo(currentDateFormatted, timeSeries);
            // console.log('TCL: getForecast -> closestTime', closestTime);

            let rain = false;
            let degrees = 0;

            json.timeSeries.forEach(item => {
                if (dateFns.isEqual(closestTime, item.validTime)) {
                    rain = item.parameters[15].values[0] === 3;
                    // console.log('TCL: getForecast -> rain', rain);

                    degrees = item.parameters[1].values[0];
                    // console.log('TCL: getForecast -> degrees', degrees);
                    degrees = Math.round(degrees);
                    // console.log('TCL: getForecast -> degreesRounded', degreesRounded);
                }
            });

            return { rain: rain, degrees: degrees };
        });
};

export default getForecast;
