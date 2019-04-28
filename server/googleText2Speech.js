const fetch = require('node-fetch');

/**
 * Convert text to speech using Google Text to Speech API. Audio is returned as a base64 string.
 * @param {string} text String to be translated
 * @return promise
 */
const googleText2Speech = async text => {
    const baseUrl = 'https://texttospeech.googleapis.com';
    const key = process.env.GOOGLE_TEXT_2_SPEECH_API_KEY;
    const url = `${baseUrl}/v1/text:synthesize?key=${key}`;

    if (typeof key === 'undefined' || key.length <= 0) {
        return {
            status: 'error',
            message: 'process.env.GOOGLE_TEXT_2_SPEECH_API_KEY is not defined yet.',
        };
    }

    const requestBody = {
        input: {
            text: text,
        },
        voice: {
            languageCode: 'sv-SE',
            // name: '',
            // ssmlGender: '',
        },
        audioConfig: {
            audioEncoding: 'OGG_OPUS',
            // speakingRate: 1.0,
            pitch: 16.0,
            // volumeGainDb: '',
            // sampleRateHertz: '',
            effectsProfileId: ['handset-class-device'],
        },
    };

    const params = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    };

    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });
};

module.exports = { googleText2Speech };
