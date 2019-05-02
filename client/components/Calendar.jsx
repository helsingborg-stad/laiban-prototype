import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import dateFns from 'date-fns';
import sv from 'date-fns/locale/sv';
import Scene from './shared/Scene.jsx';
import calendarIcon from '../assets/images/symbols/large-schedule.png';

export default class Calendar extends Component {
    state = {
        message: '',
        date: new Date(),
    };

    componentDidMount() {
        const dayOfMonth = dateFns.format(new Date(), 'Do', { locale: sv });
        const weekDay = dateFns.format(new Date(), 'dddd', { locale: sv });
        const month = dateFns.format(new Date(), 'MMMM', { locale: sv });

        this.setState({ message: `Idag är det ${weekDay} den ${dayOfMonth} ${month}` });
    }

    render() {
        const { message, date } = this.state;
        const { disableSpeech } = this.props;
        return (
            <div>
                {message.length > 0 ? (
                    <Scene message={message} disableSpeech={disableSpeech}>
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
                                            <div className="symbol__date">
                                                {dateFns.format(date, 'DD')}
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Scene>
                ) : null}
            </div>
        );
    }
}
