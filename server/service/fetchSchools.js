const fetch = require('node-fetch');
const fs = require('fs-extra');
const path = require('path');
const dateFns = require('date-fns');

const schoolsJson = path.resolve(process.cwd(), 'schools.json');

const fetchSchools = async () => {
    if (typeof process.env.CMS_BASE_URL === 'undefined' || process.env.CMS_BASE_URL.length <= 0) {
        return {
            status: 'error',
            message: 'process.env.CMS_BASE_URL is not defined yet.',
        };
    }

    const cacheExists = await fs.pathExists(schoolsJson);

    if (cacheExists) {
        return fs.readJson(schoolsJson).then(async data => {
            const cacheLifetimeInMinutes = 10;

            if (dateFns.differenceInMinutes(new Date(), data.created) >= cacheLifetimeInMinutes) {
                await clearCache();

                return fetchSchools();
            }

            return data.schools;
        });
    }

    return fetch(`${process.env.CMS_BASE_URL}/wp-json/wp/v2/preschool`)
        .then(response => {
            return response.json();
        })
        .then(json => {
            fs.outputJson(schoolsJson, {
                created: new Date(),
                schools: json,
            });
            return json;
        });
};

const clearCache = async () => {
    return fs.remove(schoolsJson).catch(err => {
        console.error(err);
    });
};

module.exports = { fetchSchools, clearCache };
