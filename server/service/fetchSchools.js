const fetch = require('node-fetch');

const fetchSchools = async () => {
    if (typeof process.env.CMS_BASE_URL === 'undefined' || process.env.CMS_BASE_URL.length <= 0) {
        return {
            status: 'error',
            message: 'process.env.CMS_BASE_URL is not defined yet.',
        };
    }

    const baseUrl = process.env.CMS_BASE_URL;
    const url = `${baseUrl}/wp-json/wp/v2/preschool`;

    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};

module.exports = { fetchSchools };
