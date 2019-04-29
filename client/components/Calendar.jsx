import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import calendarIcon from '../assets/images/symbols/large-schedule.png';

export default class Calendar extends Component {
    render() {
        return (
            <div className="text-center">
                <div className="symbol">
                    <img className="symbol__icon" src={calendarIcon} />
                    <div className="symbol__date">24</div>
                </div>
            </div>
        );
    }
}
