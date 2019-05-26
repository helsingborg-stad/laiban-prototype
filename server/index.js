/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const https = require('https');
const netjet = require('netjet');

const { schoolExists } = require('./lib/schoolExists');
const { getSchoolResourceByDate } = require('./lib/getSchoolResourceByDate');
const { getSchool } = require('./lib/getSchool');

const { googleText2Speech } = require('./service/googleText2Speech');
const { getForecast } = require('./service/getForecast');
const { weekDay } = require('./lib/weekDay');

const packageJson = require(`${process.cwd()}/package.json`);

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static assets
app.use(netjet({ cache: { maxAge: 300000 } }));
app.use(express.static(`${process.cwd()}/public`));

// Static
app.get('/', (request, response) => {
    response.sendFile(path.join(`${process.cwd()}/public/index.html`));
});

// API Endpoints
app.get('/api/v1/version', (request, response) => {
    response.json({ version: packageJson.version });
});

app.get('/api/v1/school/:schoolId', async (request, response) => {
    const { schoolId } = request.params;
    const school = await getSchool(parseInt(schoolId));

    response.json(school);
});

app.get('/api/v1/school/:schoolId/validate', async (request, response) => {
    const { schoolId } = request.params;
    const exists = await schoolExists(parseInt(schoolId));

    response.json({ id: schoolId, exists: exists });
});

app.get('/api/v1/school/:schoolId/activity', async (request, response) => {
    const { schoolId } = request.params;
    const activity = await getSchoolResourceByDate(parseInt(schoolId), 'activities');

    response.json(activity);
});

app.get('/api/v1/school/:schoolId/calendar', async (request, response) => {
    const { schoolId } = request.params;
    const event = await getSchoolResourceByDate(parseInt(schoolId), 'calendar_events');

    const calendarManuscript = [];

    calendarManuscript.push(weekDay());

    if (typeof event.content !== 'undefined') {
        calendarManuscript.push(event.content);
    }

    response.json(calendarManuscript);
});

app.get('/api/v1/school/:schoolId/lunch', async (request, response) => {
    const { schoolId } = request.params;
    const todaysLunch = await getSchoolResourceByDate(parseInt(schoolId), 'lunchMenu');
    const todaysLunchScript = [];

    if (typeof todaysLunch.dishes !== 'undefined' && todaysLunch.dishes.length > 0) {
        todaysLunchScript.push('På matsedeln står det ..');

        todaysLunch.dishes
            .map(dish => {
                // Rename "content" key to "text"
                return { text: dish.content, image: dish.image };
            })
            .forEach(dish => {
                if (typeof dish.image !== 'undefined' && dish.image.length > 0) {
                    todaysLunchScript.push(dish);
                    return;
                }

                todaysLunchScript.push(dish.content);
            });
    }

    if (todaysLunch.error === 'string') {
        todaysLunchScript.push(
            'Idag ska köket överraska oss så jag vet inte vad det blir för mat.'
        );
    }

    response.json(todaysLunchScript);
});

app.get('/api/v1/ga', (request, response) => {
    if (typeof process.env.GOOGLE_ANALYTICS_TRACKING_ID !== 'undefined') {
        response.json({
            status: 'success',
            gaTrackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        });
        return;
    }
    response.json({ status: 'failed', gaTrackingId: false });
});

app.get('/api/v1/weekday', (request, response) => {
    response.json({ weekDay: weekDay() });
});

app.get('/api/v1/clothing', (request, response) => {
    getForecast().then(forecast => {
        // if (forecast) {
        //     response.json(forecast);
        //     return;
        // }
        if (forecast.rain) {
            response.json({ weather: 'rain', weatherString: 'Det verkar vara regnigt ute. 🌧️' });
            return;
        }

        if (forecast.temprature > 15) {
            response.json({ weather: 'hot', weatherString: 'Det verkar vara varmt ute. ☀️' });
        } else if (forecast.temprature > 10) {
            response.json({ weather: 'neutral', weatherString: 'Det verkar vara lite svalt ute.' });
        } else {
            response.json({ weather: 'cold', weatherString: 'Det verkar vara kallt ute. 🥶' });
        }
    });
});

app.post('/api/v1/text2Speech', (request, response) => {
    const { text } = request.body;

    if (typeof text !== 'string' || text.length <= 0) {
        response.json({ status: 'failed' });
        return;
    }

    googleText2Speech(text).then(result => {
        response.json(result);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server listening on port ', PORT);
});

// Prevent Heroku from sleeping
if (typeof process.env.HEROKU_URL !== 'undefined') {
    setInterval(function() {
        if (process.env.HEROKU_URL.startsWith('https')) {
            https.get(process.env.HEROKU_URL);
            return;
        }
        http.get(process.env.HEROKU_URL);
    }, 300000); // every 5 minutes (300000)
}
