/**
 * Initiates and plays audio from a base64 string
 * @param {string} bas64String
 * @return promise
 */
const playBase64Audio = bas64String => {
    return new Promise(resolve => {
        const speech = new Audio(`data:audio/ogg;base64,${bas64String}`);

        speech.onended = () => {
            resolve(speech);
        };
        speech.play();
    });
};

export default playBase64Audio;
