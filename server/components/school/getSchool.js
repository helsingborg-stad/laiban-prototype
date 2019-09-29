/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-destructuring */
const fetch = require('node-fetch');
const dateFns = require('date-fns');
const sv = require('date-fns/locale/sv');

const { fetchSchools } = require('../../service/fetchSchools');

const getSchool = async schoolId => {
    try {
        const schools = await fetchSchools();
        if (!Array.isArray(schools) || schools.length < 1) {
            throw new Error('No schools in database');
        }

        const school = schools.filter(school => {
            return school.id === schoolId;
        });

        if (school.length !== 1) {
            throw new Error('School does not exists');
        }

        return school[0];
    } catch (e) {
        return e;
    }
};

module.exports = { getSchool };
