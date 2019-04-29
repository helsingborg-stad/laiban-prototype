import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import getForecast from '../service/getForecast';

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

class Clothing extends Component {
    state = { clothingSet: '' };

    componentDidMount() {
        getForecast().then(forecast => {
            if (forecast.rain) {
                this.setState({ clothingSet: 'rain' });
                return;
            }

            if (forecast.temprature > 15) {
                this.setState({ clothingSet: 'hot' });
            } else if (forecast.temprature > 10) {
                this.setState({ clothingSet: 'neutral' });
            } else {
                this.setState({ clothingSet: 'cold' });
            }
        });
    }

    render() {
        const { clothingSet } = this.state;
        const clothes =
            typeof CLOTHING_SETS[clothingSet] !== 'undefined' ? CLOTHING_SETS[clothingSet] : false;

        return (
            <div className="grid-container">
                <Grid container spacing={32}>
                    {clothes.length > 0
                        ? clothes.map(garment => (
                              <Grid item xs={12} key={garment.text}>
                                  <img src={garment.image} />
                                  {garment.text}
                              </Grid>
                          ))
                        : null}
                </Grid>
            </div>
        );
    }
}

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

export default Clothing;
