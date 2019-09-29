/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { withRouter, BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import ReactGA from 'react-ga';
import queryString from 'query-string';

import Fab from './molecules/Fab.jsx';
import SpeechBubbles from './organisms/SpeechBubbles.jsx';
import { Laiban, Expressions } from './organisms/Laiban.jsx';

import HomeIcon from '../assets/images/home-white.png';
import playIcon from '../assets/images/play-white.png';
import tinyLaiban from '../assets/images/laiban/tiny.gif';

// Route Components
import GoingOut from './routes/GoingOut.jsx';
import Clothing from './routes/Clothing.jsx';
import Lunch from './routes/Lunch.jsx';
import Time from './routes/Time.jsx';
import Activity from './routes/Activity.jsx';
import CalendarDay from './routes/CalendarDay.jsx';
import Home from './routes/Home.jsx';

// Navigation Icons
import lunchIcon from '../assets/images/home/home-plate@2x.png';
import goingOutIcon from '../assets/images/home/home-going-out@2x.png';
import activityIcon from '../assets/images/home/home-activity@2x.png';
import clockIcon from '../assets/images/home/home-time@2x.png';
import dayIcon from '../assets/images/home/home-schedule@2x.png';

class App extends Component {
    state = {
        appVersion: '',
        loadingScreen: true,
        disableSpeech: false,
        actionButtonPath: '',
        actionButtonContent: '',
        actionButtonCallback: false,
        showLaiban: true,
        laibanExpression: '',
        laibanTimer: false,
        gaTracking: false,
        schoolId: 0,
        schoolIsValid: false,
    };

    componentWillMount() {
        const imagesToPreload = Object.values(Expressions);
        imagesToPreload.push(
            dayIcon,
            clockIcon,
            activityIcon,
            goingOutIcon,
            lunchIcon,
            playIcon,
            tinyLaiban
        );
        Object.values(Expressions).forEach(gif => {
            const img = new Image();
            img.src = gif;
        });

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

    render() {
        const { location, history } = this.props;
        const {
            disableSpeech,
            actionButtonPath,
            actionButtonContent,
            actionButtonCallback,
            showLaiban,
            laibanExpression,
            laibanTimer,
            loadingScreen,
            schoolId,
            schoolIsValid,
        } = this.state;

        const { toggleActionButton, toggleLaiban, hideLaibanTimer } = this;
        const instanceMethods = { toggleActionButton, toggleLaiban, hideLaibanTimer };

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
                            // Clear timeout if we have any
                            if (typeof laibanTimer === 'number') {
                                clearTimeout(laibanTimer);
                            }
                            this.setState({ showLaiban: false, laibanTimer: false });
                        }}
                        history={history}
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
                            render={() => <Home {...this.state} {...instanceMethods} />}
                        />
                        <Route
                            path="/going-out"
                            render={() => <GoingOut {...this.state} {...instanceMethods} />}
                        />
                        <Route
                            path="/clothing"
                            render={() => <Clothing {...this.state} {...instanceMethods} />}
                        />
                        <Route
                            path="/lunch"
                            render={() => <Lunch {...this.state} {...instanceMethods} />}
                        />
                        <Route
                            path="/time"
                            render={() => <Time {...this.state} {...instanceMethods} />}
                        />
                        <Route
                            path="/date"
                            render={() => <CalendarDay {...this.state} {...instanceMethods} />}
                        />
                        <Route
                            path="/activity"
                            render={() => <Activity {...this.state} {...instanceMethods} />}
                        />
                    </main>
                    <Footer
                        location={location}
                        actionButtonPath={actionButtonPath}
                        actionButtonContent={actionButtonContent}
                        actionButtonCallback={actionButtonCallback}
                    />
                </div>
            </div>
        );
    }

    toggleActionButton = (path = '', text = '', callBack = false) => {
        this.setState((state, props) => ({
            actionButtonPath: path,
            actionButtonContent: text,
            actionButtonCallback: callBack,
        }));
    };

    toggleLaiban = (expression = 'screensaver', hideLaibanTimerInMs = false) => {
        this.setState((state, props) => ({
            showLaiban: !state.showLaiban,
            laibanExpression: expression,
        }));

        if (typeof hideLaibanTimerInMs === 'number' && hideLaibanTimerInMs > 0) {
            this.hideLaibanTimer(hideLaibanTimerInMs);
        }
    };

    hideLaibanTimer = (ms = 3000) => {
        this.setState((state, props) => ({
            laibanTimer: setTimeout(() => {
                this.setState({ showLaiban: false });
            }, ms),
        }));
    };
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
                    {props.location.pathname !== '/' &&
                        (props.actionButtonPath.length > 0 ||
                            props.actionButtonCallback !== false) && (
                            <Fab
                                to={props.actionButtonPath}
                                icon={props.actionButtonContent.length > 0 ? null : playIcon}
                                text={
                                    props.actionButtonContent.length > 0
                                        ? props.actionButtonContent
                                        : ''
                                }
                                onClickCallback={props.actionButtonCallback}
                                color="success"
                            />
                        )}
                </Grid>
            </Grid>
        </div>
    </footer>
);

const validateSchool = schoolId => {
    return fetch(`/api/v1/validate/${schoolId}`, {
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
