import playBase64Audio from './playBase64Audio';
import text2Speech from '../service/text2Speech';

/**
 * Convert text to speech and plays it
 * @param {string} text
 * @return promise
 */
const sayThis = async text => {
    return text2Speech(text).then(response => {
        const { audioContent } = response;
        return playBase64Audio(audioContent);
    });
};

export default sayThis;
