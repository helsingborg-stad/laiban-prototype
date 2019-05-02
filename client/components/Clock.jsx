import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import AnalogClock, { Themes } from 'react-analog-clock';
import { Clock as ReactClock } from 'react-clock';

export default class Clock extends Component {
    state = {
        // date: new Date(),
    };

    componentDidMount() {
        // setInterval(() => this.setState({ date: new Date() }), 1000);
    }

    render() {
        return (
            <div className="grid-container">
                <Grid container spacing={32} direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <AnalogClock theme={Themes.light} width={408} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
