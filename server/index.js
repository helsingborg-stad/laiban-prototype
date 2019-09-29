/* eslint-disable global-require */
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

const routes = require('./components/routes');

const app = express();
const API_BASE = '/api/v1';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static assets
// app.use(netjet(true, { cache: { maxAge: 300000 } }));
app.use(express.static(`${process.cwd()}/public`, { maxage: '2h' }));

// Static
app.get('/', (request, response) => {
    response.set('Cache-Control', 'public, max-age=31557600');
    response.sendFile(path.join(`${process.cwd()}/public/index.html`));
});

// Endpoints
app.use(API_BASE, routes());

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
