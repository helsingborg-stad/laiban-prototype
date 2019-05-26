/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { withRouter, BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import dateFns from 'date-fns';
import ReactGA from 'react-ga';
import queryString from 'query-string';

import Fab from './shared/Fab.jsx';
import SpeechBubbles from './shared/SpeechBubbles.jsx';
import Resource from './shared/Resource.jsx';

import Laiban from './Laiban.jsx';
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
        appVersion: '',
        loadingScreen: true,
        disableSpeech: false,
        actionButtonPath: '',
        actionButtonContent: '',
        showLaiban: true,
        laibanExpression: '',
        gaTracking: false,
        schoolId: 0,
        schoolIsValid: false,
    };

    componentWillReceiveProps(nextProps, prevState) {
        const { gaTracking } = this.state;
        if (nextProps.location !== this.props.location && gaTracking) {
            const { pathname } = nextProps.location;
            ReactGA.event({
                category: 'User',
                action: 'Navigated',
                label: pathname,
            });
        }
    }

    componentDidMount() {
        // Get query string
        const queryStringObject = queryString.parse(window.location.search);

        // Validate school by ID
        if (typeof queryStringObject.school !== 'undefined') {
            const { school } = queryStringObject;

            validateSchool(school).then(school => {
                if (typeof school.exists !== 'undefined' && school.exists) {
                    this.setState({ schoolId: school.id, schoolIsValid: true });
                }
            });
        }

        // GA Tracking
        getAnalyticsId().then(json => {
            if (json.status !== 'success') {
                return;
            }

            this.setState((state, props) => {
                ReactGA.initialize(json.gaTrackingId, {});
                ReactGA.event({
                    category: 'User',
                    action: 'Navigated',
                    label: '/',
                });
                return { gaTracking: true };
            });
        });

        // Set APP version
        getCurrentVersion().then(json => {
            this.setState({ appVersion: json.version, loadingScreen: false });
            // Check if new app version
            setInterval(() => {
                getCurrentVersion().then(json => {
                    if (json.version !== this.state.appVersion) {
                        // Reload client
                        window.location.reload(true);
                    }
                });
            }, 300000); // every 5 minutes (300000)
        });
    }


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
            loadingScreen,
            schoolId,
            schoolIsValid,
        } = this.state;

        if (loadingScreen || !schoolIsValid) {
            return <Laiban expression={'sleepy'} />;
        }

        if (showLaiban) {
            return (
                <div>
                    <SpeechBubbles content={[' ']} />
                    <Laiban
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
                                    <Home toggleLaiban={this.toggleLaiban} />
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

const validateSchool = schoolId => {
    return fetch(`/api/v1/school/${schoolId}/validate`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
};

const getAnalyticsId = () => {
    return fetch('/api/v1/ga', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
};

const getCurrentVersion = () => {
    return fetch('/api/v1/version', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json());
};

export default hot(module)(withRouter(App));
