// Images
import raincoat from '../assets/images/clothes/raincoat.png';
import rainpants from '../assets/images/clothes/pants-rain.png';
import rainboots from '../assets/images/clothes/rain-boots.png';
import winterhat from '../assets/images/clothes/winter-hat.png';
import winterjacket from '../assets/images/clothes/jacket-1.png';
import winterpants from '../assets/images/clothes/pants-pullover.png';
import winterboots from '../assets/images/clothes/winter-boots.png';
import hat from '../assets/images/clothes/hat.png';
import sweater from '../assets/images/clothes/sweater-1.png';
import shoes from '../assets/images/clothes/shoes.png';
import sunCream from '../assets/images/clothes/sun-cream.png';

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
        { text: 'Kängor', image: winterboots },
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
