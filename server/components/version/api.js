/* eslint-disable import/no-dynamic-require */
const express = require('express');

const packageJson = require(`${process.cwd()}/package.json`);

const routes = () => {
    const router = express.Router();

    router.get('/', (request, response) => {
        response.json({ version: packageJson.version });
    });

    return router;
};

module.exports = routes;
