const express = require('express');
const { googleText2Speech } = require('../../service/googleText2Speech');

const routes = () => {
    const router = express.Router();

    router.post('/', (request, response) => {
        const { text } = request.body;

        if (typeof text !== 'string' || text.length <= 0) {
            response.json({ status: 'failed' });
            return;
        }

        googleText2Speech(text).then(result => {
            response.json(result);
        });
    });

    return router;
};

module.exports = routes;
