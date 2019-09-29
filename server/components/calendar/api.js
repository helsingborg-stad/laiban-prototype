const express = require('express');
const dateFns = require('date-fns');
const sv = require('date-fns/locale/sv');
const { getSchoolResourceByDate } = require('../school/getSchoolResourceByDate');

const routes = () => {
    const router = express.Router();

    router.get('/:schoolId', async (request, response) => {
        const { schoolId } = request.params;
        const event = await getSchoolResourceByDate(parseInt(schoolId), 'calendar_events');
        const dayOfMonth = dateFns.format(new Date(), 'Do', { locale: sv });
        const weekDay = dateFns.format(new Date(), 'dddd', { locale: sv });
        const month = dateFns.format(new Date(), 'MMMM', { locale: sv });

        const calendarManuscript = [];

        calendarManuscript.push(`Idag är det ${weekDay} den ${dayOfMonth} ${month}`);

        if (typeof event.content !== 'undefined') {
            calendarManuscript.push(event.content);
        }

        response.json(calendarManuscript);
    });
    return router;
};

module.exports = routes;
