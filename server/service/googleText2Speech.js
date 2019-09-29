const fetch = require('node-fetch');

/**
 * Convert text to speech using Google Text to Speech API. Audio is returned as a base64 string.
 * @param {string} text String to be translated
 * @return promise
 */
const googleText2Speech = async text => {
    try {
        const baseUrl = 'https://texttospeech.googleapis.com';
        const key = process.env.GOOGLE_TEXT_2_SPEECH_API_KEY;
        const url = `${baseUrl}/v1/text:synthesize?key=${key}`;

        if (typeof key === 'undefined' || key.length <= 0) {
            return {
                status: 'error',
                message: 'process.env.GOOGLE_TEXT_2_SPEECH_API_KEY is not defined yet.',
            };
        }

        // Remove emojis
        text = text.replace(
            /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
            ''
        );

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
                audioEncoding: 'MP3',
                // speakingRate: 1.0,
                pitch: -6,
                speakingRate: 0.93,
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

        const response = await fetch(url, params);

        const json = await response.json();
        json.status = 'success';

        return json;
    } catch (e) {
        return e;
    }
};

module.exports = { googleText2Speech };
