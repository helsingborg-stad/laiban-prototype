/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { withRouter, BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import dateFns from 'date-fns';
import Fab from './shared/Fab.jsx';
import SpeechBubbles from './shared/SpeechBubbles.jsx';
import Resource from './shared/Resource.jsx';

import Intro from './Intro.jsx';
import Home from './Home.jsx';
import Clothing from './Clothing.jsx';
import Time from './Time.jsx';
import Weather from './Weather.jsx';
import Calendar from './Calendar.jsx';

import HomeIcon from '../assets/images/home-white.png';
import playIcon from '../assets/images/play-white.png';

import tinyLaiban from '../assets/images/laiban/laiban-figur-liten.png';

class App extends Component {
    state = {
        disableSpeech: true,
        actionButtonPath: '',
        actionButtonContent: '',
    };

    toggleActionButton = (path = '', text = '') => {
        this.setState((state, props) => ({ actionButtonPath: path, actionButtonContent: text }));
    };

    render() {
        const { location } = this.props;
        const { disableSpeech, actionButtonPath, actionButtonContent } = this.state;

        return (
            <div>
                <div className="screen-size">
                    <header className="header container-small relative">
                        <img className="laiban-tiny" src={tinyLaiban} />
                    </header>
                    <main className="content">
                        <Route
                            path="/"
                            exact
                            render={() => (
                                <div>
                                    <SpeechBubbles content={['Vad vill du veta?']} />
                                    <Home />
                                </div>
                            )}
                        />

                        <Route
                            path="/going-out"
                            render={() => (
                                <div>
                                    <Resource
                                        endpoint="/api/v1/clothing"
                                        render={data => {
                                            return (
                                                <SpeechBubbles
                                                    content={[
                                                        'Jaha ni ska gå ut – vad kul!',
                                                        `${
                                                            data.weatherString
                                                        }.  Låt oss se vad ni ska ha på er.`,
                                                        'Är ni redo?',
                                                    ]}
                                                    onEnd={() => {
                                                        this.toggleActionButton('/clothing');
                                                    }}
                                                />
                                            );
                                        }}
                                        onUnmount={() => {
                                            this.toggleActionButton('');
                                        }}
                                    />
                                </div>
                            )}
                        />

                        <Route
                            path="/clothing"
                            render={() => (
                                <Resource
                                    endpoint="/api/v1/clothing"
                                    render={data => {
                                        return (
                                            <Clothing
                                                weather={data.weather}
                                                onEnd={() => {
                                                    this.toggleActionButton('/', 'Vi är klara!');
                                                }}
                                            />
                                        );
                                    }}
                                    onUnmount={() => {
                                        this.toggleActionButton('');
                                    }}
                                />
                            )}
                        />
                        <Route
                            path="/lunch"
                            render={() => (
                                <Resource
                                    endpoint="/api/v1/lunch"
                                    render={data => <SpeechBubbles content={[data.todaysLunch]} />}
                                />
                            )}
                        />
                        <Route
                            path="/time"
                            render={() => (
                                <div>
                                    <SpeechBubbles
                                        content={[
                                            `Klockan är ${dateFns.format(new Date(), 'HH:mm')}`,
                                        ]}
                                    />
                                    <Time />
                                </div>
                            )}
                        />
                        <Route
                            path="/calendar"
                            render={() => (
                                <div>
                                    <Resource
                                        endpoint="/api/v1/weekday"
                                        render={data => <SpeechBubbles content={[data.weekDay]} />}
                                    />
                                    <Calendar date={new Date()} />
                                </div>
                            )}
                        />
                        <Route
                            path="/weather"
                            render={() => (
                                <div>
                                    <SpeechBubbles content={['Vad blir det för väder?']} />
                                    <Weather />
                                </div>
                            )}
                        />
                    </main>
                    <footer className="footer">
                        <div className="container">
                            <Grid container justify="space-between">
                                <Grid item>
                                    {location.pathname !== '/' && (
                                        <Fab to="/" icon={HomeIcon} color="danger" />
                                    )}
                                </Grid>
                                <Grid item>
                                    {location.pathname !== '/' && actionButtonPath.length > 0 && (
                                        <Fab
                                            to={actionButtonPath}
                                            icon={actionButtonContent.length > 0 ? null : playIcon}
                                            text={
                                                actionButtonContent.length > 0
                                                    ? actionButtonContent
                                                    : ''
                                            }
                                            color="success"
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default hot(module)(withRouter(App));
