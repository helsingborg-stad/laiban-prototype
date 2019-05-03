import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import dateFns from 'date-fns';
import calendarIcon from '../assets/images/symbols/large-schedule.png';

export default class Calendar extends Component {
    render() {
        const { date } = this.props;
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
                            <div className="text-center">
                                <div className="symbol">
                                    <img className="symbol__icon" src={calendarIcon} />
                                    <div className="symbol__date">{dateFns.format(date, 'DD')}</div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
