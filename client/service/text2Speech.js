/**
 * Convert text to speech through backend service
 * @param {string} text
 * @return promise
 */
const text2Speech = async text => {
    const url = '/api/v1/text2speech';
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,
        }),
    };

    return fetch(url, params)
        .then(response => {
            // console.log(response);
            return response.json();
        })
        .then(json => {
            // console.log(json);

            return json;
        });
};

export default text2Speech;
