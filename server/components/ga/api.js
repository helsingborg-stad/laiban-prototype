const express = require('express');

const routes = () => {
    const router = express.Router();

    router.get('/', (request, response) => {
        if (typeof process.env.GOOGLE_ANALYTICS_TRACKING_ID !== 'undefined') {
            response.json({
                status: 'success',
                gaTrackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
            });
            return;
        }
        response.json({ status: 'failed', gaTrackingId: false });
    });

    return router;
};

module.exports = routes;
