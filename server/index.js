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
const dateFns = require('date-fns');
const sv = require('date-fns/locale/sv');

const { schoolExists } = require('./lib/schoolExists');
const { getSchoolResourceByDate } = require('./lib/getSchoolResourceByDate');
const { getSchool } = require('./lib/getSchool');

const { fetchSchools, clearCache } = require('./service/fetchSchools');
const { googleText2Speech } = require('./service/googleText2Speech');
const { fetchForecast } = require('./service/fetchForecast');

const packageJson = require(`${process.cwd()}/package.json`);

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static assets
// app.use(netjet(true, { cache: { maxAge: 300000 } }));
app.use(express.static(`${process.cwd()}/public`, { maxage: '2h' }));

// Static
app.get('/', (request, response) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    response.sendFile(path.join(`${process.cwd()}/public/index.html`));
});

// POST
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

// DELETE
app.delete('/api/v1/cache', async (request, response) => {
    await clearCache();

    response.status(204).send('Deleted cache');
});

// GET
app.get('/api/v1/version', (request, response) => {
    response.json({ version: packageJson.version });
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

app.get('/api/v1/school', async (request, response) => {
    const schools = await fetchSchools();

    response.json(schools);
});

app.get('/api/v1/school/:schoolId', async (request, response) => {
    const { schoolId } = request.params;
    const school = await getSchool(parseInt(schoolId));

    response.json(school);
});

app.get('/api/v1/validate/:schoolId', async (request, response) => {
    const { schoolId } = request.params;
    const exists = await schoolExists(parseInt(schoolId));

    response.json({ id: schoolId, exists: exists });
});

app.get('/api/v1/activity/:schoolId', async (request, response) => {
    const { schoolId } = request.params;
    const activity = await getSchoolResourceByDate(parseInt(schoolId), 'activities');

    response.json(activity);
});

app.get('/api/v1/calendar/:schoolId', async (request, response) => {
    const { schoolId } = request.params;
    const event = await getSchoolResourceByDate(parseInt(schoolId), 'calendar_events');
    const dayOfMonth = dateFns.format(new Date(), 'Do', { locale: sv });
    const weekDay = dateFns.format(new Date(), 'dddd', { locale: sv });
    const month = dateFns.format(new Date(), 'MMMM', { locale: sv });

    const calendarManuscript = [];

    calendarManuscript.push(`Idag är det ${weekDay} den ${dayOfMonth} ${month}`);

    if (typeof event.content !== 'undefined') {
        calendarManuscript.push(event.content);
    }

    response.json(calendarManuscript);
});

app.get('/api/v1/clock/:schoolId', async (request, response) => {
    const { schoolId } = request.params;
    const school = await getSchool(parseInt(schoolId));

    response.json(
        typeof school.data.clock_events !== 'undefined' && Array.isArray(school.data.clock_events)
            ? school.data.clock_events
            : []
    );
});

app.get('/api/v1/lunch/:schoolId', async (request, response) => {
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
                    const extension = dish.image.match(/.(png|jpg|jpeg)$/g);
                    const thumbnailSuffix = '-150x150';
                    if (extension[0]) {
                        dish.image = dish.image.replace(
                            extension[0],
                            `${thumbnailSuffix}${extension[0]}`
                        );
                    }
                    todaysLunchScript.push(dish);
                    return;
                }

                todaysLunchScript.push(dish.text);
            });
    }

    if (todaysLunch.error === 'string') {
        todaysLunchScript.push(
            'Idag ska köket överraska oss så jag vet inte vad det blir för mat.'
        );
    }

    response.json(todaysLunchScript);
});

app.get('/api/v1/clothing/:schoolId', async (request, response) => {
    const { schoolId } = request.params;
    const school = await getSchool(parseInt(schoolId));

    const { lat, lon } = school.data;
    const forecast = await fetchForecast(lon, lat);

    response.json(forecast);
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
