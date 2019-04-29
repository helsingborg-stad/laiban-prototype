import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import lunchIcon from '../assets/images/home/home-plate.png';
import weatherIcon from '../assets/images/home/home-cloud-sun.png';
import clothingIcon from '../assets/images/home/home-playground.png';
import clockIcon from '../assets/images/home/home-time.png';
import dayIcon from '../assets/images/home/home-schedule.png';

export default class Navigation extends Component {
    render() {
        return (
            <div className="grid-container">
                <Grid container spacing={32} justify={'center'}>
                    <Grid item xs={4}>
                        <Link to="/clothing">
                            <div className="text-center">
                                <div className="navigation-icon">
                                    <img src={clothingIcon} />
                                </div>
                                <div className="navigation-content">Vad ska jag klä på mig?</div>
                            </div>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to="/lunch">
                            <div className="text-center">
                                <div className="navigation-icon">
                                    <img src={lunchIcon} />
                                </div>
                                <div className="navigation-content">Vad blir det för mat?</div>
                            </div>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to="/weather">
                            <div className="text-center">
                                <div className="navigation-icon">
                                    <img src={weatherIcon} />
                                </div>
                                <div className="navigation-content">Vad blir det för väder?</div>
                            </div>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to="/clock">
                            <div className="text-center">
                                <div className="navigation-icon">
                                    <img src={clockIcon} />
                                </div>
                                <div className="navigation-content">Vad är klockan?</div>
                            </div>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to="/clock">
                            <div className="text-center">
                                <div className="navigation-icon">
                                    <img src={dayIcon} />
                                </div>
                                <div className="navigation-content">Vad är det för dag idag?</div>
                            </div>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
