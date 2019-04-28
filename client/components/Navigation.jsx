import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Scene from './shared/Scene.jsx';

export default class Navigation extends Component {
    render() {
        return (
            <Scene message={{ text: 'Navigation' }}>
                <div className="grid-container">
                    <Grid container spacing={32}>
                        <Grid item xs={6}>
                            <Link to="/lunch">
                                <div className="navigation-icon" />
                                <div className="navigation-content text-center">
                                    Vad blir det för mat?
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to="/weather">
                                <div className="navigation-icon" />
                                <div className="navigation-content text-center">
                                    Vad blir det för väder?
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to="/clothing">
                                <div className="navigation-icon" />
                                <div className="navigation-content text-center">
                                    Vad ska jag klä på mig?
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to="/clock">
                                <div className="navigation-icon" />
                                <div className="navigation-content text-center">
                                    Vad är klockan?
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="navigation-icon" />
                            <div className="navigation-content text-center">
                                Vad är det för dag idag?
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="navigation-icon" />
                            <div className="navigation-content text-center">Open for business</div>
                        </Grid>
                    </Grid>
                </div>
            </Scene>
        );
    }
}
