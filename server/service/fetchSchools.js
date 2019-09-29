const fetch = require('node-fetch');
const fs = require('fs-extra');
const path = require('path');
const dateFns = require('date-fns');

const schoolsJson = path.resolve(process.cwd(), 'schools.json');

const fetchSchools = async () => {
    try {
        if (
            typeof process.env.CMS_BASE_URL === 'undefined' ||
            process.env.CMS_BASE_URL.length <= 0
        ) {
            return {
                status: 'error',
                message: 'process.env.CMS_BASE_URL is not defined yet.',
            };
        }

        const cacheExists = await fs.pathExists(schoolsJson);

        if (cacheExists) {
            const { schools } = await fs.readJson(schoolsJson);
            return schools;
        }

        const response = await fetch(`${process.env.CMS_BASE_URL}/wp-json/wp/v2/preschool`);
        const json = await response.json();

        fs.outputJson(schoolsJson, {
            created: new Date(),
            schools: json,
        });

        return json;
    } catch (e) {
        return {
            status: 'error',
            message: e,
        };
    }
};

const clearCache = async () => {
    try {
        const response = await fetch(`${process.env.CMS_BASE_URL}/wp-json/wp/v2/preschool`);
        const json = await response.json();

        fs.outputJson(schoolsJson, {
            created: new Date(),
            schools: json,
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = { fetchSchools, clearCache };
