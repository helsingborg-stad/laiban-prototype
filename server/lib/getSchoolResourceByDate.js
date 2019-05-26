const dateFns = require('date-fns');
const sv = require('date-fns/locale/sv');

const { getSchool } = require('./getSchool');

const getSchoolResourceByDate = async (schoolId, resourceKey, date = new Date()) => {
    return getSchool(schoolId)
        .then(school => {
            if (
                typeof school.data[resourceKey] === 'undefined' ||
                school.data[resourceKey].length < 1
            ) {
                throw new Error('No entry found in database.');
            }

            if (
                typeof school.data[resourceKey][0].date === 'undefined' ||
                !dateFns.isValid(new Date(school.data[resourceKey][0].date))
            ) {
                throw new Error('All entries must have a date key.');
            }

            const entry = school.data[resourceKey].filter(item =>
                dateFns.isSameDay(item.date, date)
            );

            if (entry.length < 1) {
                throw new Error(
                    `No entry found matching ${dateFns.format(date, 'DD/MM/YY', { locale: sv })}`
                );
            }

            return entry[0];
        })
        .catch(error => {
            return { error: error.toString().split(': ', 2)[1] };
        });
};

module.exports = { getSchoolResourceByDate };
