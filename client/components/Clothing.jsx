import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import getForecast from '../service/getForecast';
import Bubble from './shared/Bubble.jsx';
import CLOTHING_SETS from '../storage/CLOTHING_SETS';

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
                                  <Bubble icon={garment.image}>{garment.text}</Bubble>
                              </Grid>
                          ))
                        : null}
                </Grid>
            </div>
        );
    }
}

export default Clothing;
