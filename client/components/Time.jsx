import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

// eslint-disable-next-line import/no-named-default
import { default as VendorClock } from './shared/Clock.jsx';

export default class Time extends Component {
    render() {
        return (
            <div className="container">
                <div className="grid-container">
                    <Grid
                        container
                        spacing={32}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <VendorClock />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
