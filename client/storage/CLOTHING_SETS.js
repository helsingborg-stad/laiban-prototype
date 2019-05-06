// Images
import raincoat from '../assets/images/clothes/raincoat@2x.png';
import rainpants from '../assets/images/clothes/pants-rain@2x.png';
import rainboots from '../assets/images/clothes/rain-boots@2x.png';
import winterhat from '../assets/images/clothes/winter-hat@2x.png';
import winterjacket from '../assets/images/clothes/jacket-1@2x.png';
import winterpants from '../assets/images/clothes/pants-pullover@2x.png';
import winterboots from '../assets/images/clothes/winter-boots@2x.png';
import hat from '../assets/images/clothes/hat@2x.png';
import sweater from '../assets/images/clothes/sweater-1@2x.png';
import shoes from '../assets/images/clothes/shoes@2x.png';
import sunCream from '../assets/images/clothes/sun-cream@2x.png';

const CLOTHING_SETS = {
    rain: [
        { text: 'Regnjacka', image: raincoat },
        { text: 'Regnbyxor', image: rainpants },
        { text: 'Regnstövlar', image: rainboots },
    ],
    cold: [
        { text: 'Mössa', image: winterhat },
        { text: 'Jacka', image: winterjacket },
        { text: 'Överdragsbyxor', image: winterpants },
        { text: 'Skor', image: winterboots },
    ],
    neutral: [
        { text: 'Keps', image: hat },
        { text: 'Varm tröja', image: sweater },
        { text: 'Skor', image: shoes },
        { text: 'Solkräm kanske?', image: sunCream },
    ],
    hot: [
        { text: 'Keps', image: hat },
        { text: 'Skor', image: shoes },
        { text: 'Solkräm kanske?', image: sunCream },
    ],
};

export default CLOTHING_SETS;
