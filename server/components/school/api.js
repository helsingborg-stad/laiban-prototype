/* eslint-disable import/no-dynamic-require */
const express = require('express');
const { fetchSchools, clearCache } = require('../../service/fetchSchools');
const { getSchool } = require('./getSchool');

const packageJson = require(`${process.cwd()}/package.json`);

const routes = () => {
    const router = express.Router();

    router.get('/', async (request, response) => {
        const schools = await fetchSchools();

        response.json(schools);
    });

    router.get('/:schoolId', async (request, response) => {
        const { schoolId } = request.params;
        const school = await getSchool(parseInt(schoolId));

        response.json(school);
    });

    return router;
};

module.exports = routes;
