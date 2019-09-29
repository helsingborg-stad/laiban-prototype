const express = require('express');
const { clearCache } = require('../../service/fetchSchools');
const { fetchSchools } = require('../../service/fetchSchools');

const routes = () => {
    const router = express.Router();

    router.delete('/', async (request, response) => {
        clearCache();
        response.status(204).send('Deleted cache');
    });

    return router;
};

module.exports = routes;
