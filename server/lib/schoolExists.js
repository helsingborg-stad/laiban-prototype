/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-destructuring */
const fetch = require('node-fetch');
const dateFns = require('date-fns');
const sv = require('date-fns/locale/sv');

const { fetchSchools } = require('../service/fetchSchools');
const { getSchool } = require('./getSchool');

const schoolExists = async schoolId => {
    return getSchool(schoolId)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

module.exports = { schoolExists };
