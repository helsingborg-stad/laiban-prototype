import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import AnalogClock from './AnalogClock.jsx';

export default class Clock extends Component {
    render() {
        return (
            <div className="container space-top">
                <div className="grid-container">
                    <Grid
                        container
                        spacing={32}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <AnalogClock events={this.props.events} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
