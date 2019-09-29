const express = require('express');

const { getSchoolResourceByDate } = require('../school/getSchoolResourceByDate');

const routes = () => {
    const router = express.Router();

    router.get('/:schoolId', async (request, response) => {
        const { schoolId } = request.params;
        const activity = await getSchoolResourceByDate(parseInt(schoolId), 'activities');

        response.json(activity);
    });

    return router;
};

module.exports = routes;
