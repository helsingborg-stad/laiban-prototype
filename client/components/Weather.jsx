import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import weatherIcon from '../assets/images/symbols/large-cloud.png';

export default class Weather extends Component {
    render() {
        return (
            <div className="text-center">
                <div className="symbol">
                    <img className="symbol__icon" src={weatherIcon} />
                </div>
            </div>
        );
    }
}
