/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const https = require('https');
const netjet = require('netjet');

const { googleText2Speech } = require('./service/googleText2Speech');
const { getForecast } = require('./service/getForecast');
const { todaysLunch } = require('./lib/todaysLunch');
const { weekDay } = require('./lib/weekDay');

const packageJson = require(`${process.cwd()}/package.json`);

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static assets
app.use(netjet({cache: {maxAge: 300000}}));
app.use(express.static(`${process.cwd()}/public`));

// Static
app.get('/', (request, response) => {
    response.sendFile(path.join(`${process.cwd()}/public/index.html`));
});

// API Endpoints
app.get('/api/v1/version', (request, response) => {
    response.json({ version: packageJson.version });
});

app.get('/api/v1/lunch', (request, response) => {
    response.json({ todaysLunch: todaysLunch() });
});

app.get('/api/v1/weekday', (request, response) => {
    response.json({ weekDay: weekDay() });
});

app.get('/api/v1/clothing', (request, response) => {
    getForecast().then(forecast => {
        if (forecast.rain) {
            response.json({ weather: 'rain', weatherString: 'Det verkar vara regnigt ute. 🌧️' });
            return;
        }

        if (forecast.temprature > 15) {
            response.json({ weather: 'hot', weatherString: 'Det verkar vara varmt ute. ☀️' });
        } else if (forecast.temprature > 10) {
            response.json({ weather: 'neutral', weatherString: 'Det verkar vara lite svalt ute.' });
        } else {
            response.json({ weather: 'cold', weatherString: 'Det verkar vara kallt ute. ❄️' });
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
