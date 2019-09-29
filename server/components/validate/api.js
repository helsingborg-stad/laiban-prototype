const express = require('express');
const { schoolExists } = require('../school/schoolExists');

const routes = () => {
    const router = express.Router();

    router.get('/:schoolId', async (request, response) => {
        const { schoolId } = request.params;
        const exists = await schoolExists(parseInt(schoolId));

        response.json({ id: schoolId, exists: exists });
    });

    return router;
};

module.exports = routes;
