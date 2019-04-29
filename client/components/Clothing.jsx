import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import getForecast from '../service/getForecast';

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
    rain: [{ text: 'Regnjacka' }, { text: 'Regnbyxor' }, { text: 'Regnstövlar' }],
    cold: [{ text: 'Mössa' }, { text: 'Jacka' }, { text: 'Överdragsbyxor' }, { text: 'Kängor' }],
    neutral: [
        { text: 'Keps' },
        { text: 'Varm tröja' },
        { text: 'Skor' },
        { text: 'Solkräm kanske?' },
    ],
    hot: [{ text: 'Keps' }, { text: 'Skor' }, { text: 'Solkräm kanske?' }],
};

export default Clothing;
