import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import Clock from './shared/Clock.jsx';

export default class Time extends Component {
    render() {
        return (
            <div className="grid-container">
                <Grid container spacing={32} direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <Clock />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
