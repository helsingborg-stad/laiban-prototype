/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { withRouter, BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import dateFns from 'date-fns';

import Fab from './shared/Fab.jsx';
import SpeechBubbles from './shared/SpeechBubbles.jsx';
import Resource from './shared/Resource.jsx';

import Intro from './Laiban.jsx';
import Home from './Home.jsx';
import Clothing from './Clothing.jsx';
import Clock from './Clock.jsx';
import Weather from './Weather.jsx';
import Calendar from './Calendar.jsx';

import HomeIcon from '../assets/images/home-white.png';
import playIcon from '../assets/images/play-white.png';
import tinyLaiban from '../assets/images/laiban/tiny.gif';

class App extends Component {
    state = {
        disableSpeech: true,
        appVersion: '',
        actionButtonPath: '',
        actionButtonContent: '',
        showLaiban: true,
        laibanExpression: '',
    };

    componentDidMount() {
        // Set APP version
        this.getCurrentVersion().then(json => {
            this.setState({ appVersion: json.version, loadingScreen: false });
            // Check if new app version
            setInterval(() => {
                this.getCurrentVersion().then(json => {
                    if (json.version !== this.state.appVersion) {
                        // Reload client
                        window.location.reload(true);
                    }
                });
            }, 300000); // every 5 minutes (300000)
        });
    }

    getCurrentVersion = () => {
        return fetch('/api/v1/version', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());
    };

    toggleActionButton = (path = '', text = '') => {
        this.setState((state, props) => ({ actionButtonPath: path, actionButtonContent: text }));
    };

    toggleLaiban = (expression = 'screensaver') => {
        this.setState((state, props) => ({
            showLaiban: !state.showLaiban,
            laibanExpression: expression,
        }));
    };

    render() {
        const { location } = this.props;
        const {
            disableSpeech,
            actionButtonPath,
            actionButtonContent,
            showLaiban,
            laibanExpression,
        } = this.state;

        if (showLaiban) {
            return (
                <div>
                    <SpeechBubbles content={[' ']} />
                    <Intro
                        expression={laibanExpression.length > 0 ? laibanExpression : 'screensaver'}
                        onClick={() => {
                            this.setState({ showLaiban: false });
                        }}
                    />
                </div>
            );
        }

        return (
            <div>
                <div className="screen-size">
                    <Header tinyLaiban={tinyLaiban} />
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
                                                        }  Låt oss se vad ni ska ha på er.`,
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
                                    render={data => (
                                        <SpeechBubbles
                                            content={
                                                data.todaysLunch === 'string'
                                                    ? [data.todaysLunch]
                                                    : data.todaysLunch
                                            }
                                        />
                                    )}
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
                                    <Clock />
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

                        {/* <Route
                            path="/weather"
                            render={() => (
                                <div>
                                    <SpeechBubbles content={['Vad blir det för väder?']} />
                                    <Weather />
                                </div>
                            )}
                        /> */}
                    </main>
                    <Footer
                        location={location}
                        actionButtonPath={actionButtonPath}
                        actionButtonContent={actionButtonContent}
                    />
                </div>
            </div>
        );
    }
}

const Header = props => (
    <header className="header container-small relative">
        <img className="laiban-tiny" src={props.tinyLaiban} />
    </header>
);

const Footer = props => (
    <footer className="footer">
        <div className="container">
            <Grid container justify="space-between">
                <Grid item>
                    {props.location.pathname !== '/' && (
                        <Fab to="/" icon={HomeIcon} color="danger" />
                    )}
                </Grid>
                <Grid item>
                    {props.location.pathname !== '/' && props.actionButtonPath.length > 0 && (
                        <Fab
                            to={props.actionButtonPath}
                            icon={props.actionButtonContent.length > 0 ? null : playIcon}
                            text={
                                props.actionButtonContent.length > 0
                                    ? props.actionButtonContent
                                    : ''
                            }
                            color="success"
                        />
                    )}
                </Grid>
            </Grid>
        </div>
    </footer>
);

export default hot(module)(withRouter(App));
