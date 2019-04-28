/* eslint-disable global-require */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { googleText2Speech } = require('./googleText2Speech');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static assets
app.use(express.static(`${process.cwd()}/public`));

// Endpoints
app.get('/', (request, response) => {
    response.sendFile(path.join(`${process.cwd()}/public/index.html`));
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
