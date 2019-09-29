const express = require('express');

const { getSchool } = require('../school/getSchool');

const routes = () => {
    const router = express.Router();

    router.get('/:schoolId', async (request, response) => {
        const { schoolId } = request.params;
        const school = await getSchool(parseInt(schoolId));

        response.json(
            typeof school.data.clock_events !== 'undefined' &&
                Array.isArray(school.data.clock_events)
                ? school.data.clock_events
                : []
        );
    });

    return router;
};

module.exports = routes;
