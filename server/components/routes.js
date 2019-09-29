const express = require('express');

const activity = require('./activity/api');
const cache = require('./cache/api');
const calendar = require('./calendar/api');
const clock = require('./clock/api');
const clothing = require('./clothing/api');
const ga = require('./ga/api');
const lunch = require('./lunch/api');
const school = require('./school/api');
const text2speech = require('./text2speech/api');
const validate = require('./validate/api');
const version = require('./version/api');

const routes = () => {
    const router = express.Router();

    // Register route to api-layer.
    router.use('/activity', activity());
    router.use('/cache', cache());
    router.use('/calendar', calendar());
    router.use('/clock', clock());
    router.use('/clothing', clothing());
    router.use('/ga', ga());
    router.use('/lunch', lunch());
    router.use('/school', school());
    router.use('/text2speech', text2speech());
    router.use('/validate', validate());
    router.use('/version', version());

    return router;
};

module.exports = routes;
