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
import Menu from './shared/Menu.jsx';
import ShowLaiban from './shared/ShowLaiban.jsx';
import { Laiban, Expressions } from './Laiban.jsx';

import Clothing from './Clothing.jsx';
import Clock from './Clock.jsx';
import Weather from './Weather.jsx';
import Calendar from './Calendar.jsx';

import HomeIcon from '../assets/images/home-white.png';
import playIcon from '../assets/images/play-white.png';
import tinyLaiban from '../assets/images/laiban/tiny.gif';

// Menu Icons
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
            console.log(gif);
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
                            render={() => (
                                <div>
                                    <Resource
                                        endpoint={`/api/v1/activity/${schoolId}`}
                                        render={todaysActivity => (
                                            <div>
                                                <SpeechBubbles content={['Vad vill du veta?']} />
                                                <ShowLaiban
                                                    toggleMethod={this.toggleLaiban}
                                                    expression={'screensaver'}
                                                    delay={120000 /* 2min */}
                                                />
                                                <div className="container space-top">
                                                    <Navigation
                                                        links={[
                                                            {
                                                                to: '/going-out',
                                                                icon: goingOutIcon,
                                                                content: 'Vi ska klä på oss',
                                                            },
                                                            {
                                                                to: '/lunch',
                                                                icon: lunchIcon,
                                                                content:
                                                                    'Vad blir det för mat idag?',
                                                            },
                                                            {
                                                                to: '/time',
                                                                icon: clockIcon,
                                                                content: 'Vad är klockan?',
                                                            },
                                                            {
                                                                to: '/calendar',
                                                                icon: dayIcon,
                                                                content: 'Vad är det för dag idag?',
                                                            },
                                                        ].concat(
                                                            /* Dyanmic menu items */
                                                            typeof todaysActivity.content !==
                                                                'undefined' &&
                                                                todaysActivity.content.length > 0
                                                                ? [
                                                                      {
                                                                          to: '/activity',
                                                                          icon: activityIcon,
                                                                          content:
                                                                              'Vad ska vi göra idag?',
                                                                      },
                                                                  ]
                                                                : []
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                            )}
                        />

                        <Route
                            path="/going-out"
                            render={() => (
                                <div>
                                    <Resource
                                        endpoint={`/api/v1/clothing/${schoolId}`}
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
                                    endpoint={`/api/v1/clothing/${schoolId}`}
                                    render={data => {
                                        return (
                                            <Clothing
                                                weather={data.weather}
                                                onEnd={() => {
                                                    this.toggleActionButton(
                                                        '/',
                                                        'Vi är klara!',
                                                        () => {
                                                            this.toggleLaiban('happy', 4000);
                                                        }
                                                    );
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
                                    endpoint={`/api/v1/lunch/${schoolId}`}
                                    render={todaysLunchScript => (
                                        <SpeechBubbles content={todaysLunchScript}>
                                            <ShowLaiban
                                                toggleMethod={this.toggleLaiban}
                                                expression={'slurp'}
                                                delay={2000}
                                                hideTimerInMs={3000}
                                            />
                                        </SpeechBubbles>
                                    )}
                                />
                            )}
                        />

                        <Route
                            path="/time"
                            render={() => (
                                <Resource
                                    endpoint={`/api/v1/clock/${schoolId}`}
                                    render={clockEvents => {
                                        const manuScript = [
                                            `Klockan är ${dateFns.format(new Date(), 'HH:mm')}`,
                                        ];

                                        if (clockEvents.length > 0) {
                                            const today = new Date();
                                            const day = today.getDate();
                                            const month = today.getMonth();
                                            const year = today.getFullYear();

                                            const clockTimeEvents = clockEvents.map(event => {
                                                const date = new Date();
                                                date.setHours(event.time.split(':')[0]);
                                                date.setMinutes(event.time.split(':')[1]);

                                                return date;
                                            });

                                            const closestEventIndex = dateFns.closestIndexTo(
                                                today,
                                                clockTimeEvents
                                            );

                                            const differenceInMinutes = dateFns.differenceInMinutes(
                                                clockTimeEvents[closestEventIndex],
                                                today
                                            );

                                            const isIntheFuture = dateFns.isFuture(
                                                clockTimeEvents[closestEventIndex]
                                            );

                                            if (
                                                isIntheFuture &&
                                                differenceInMinutes <= 30 &&
                                                typeof clockEvents[closestEventIndex].event ===
                                                    'string' &&
                                                clockEvents[closestEventIndex].event.length > 0
                                            ) {
                                                manuScript.push(
                                                    clockEvents[closestEventIndex].event
                                                );
                                            }
                                        }

                                        return (
                                            <div>
                                                <SpeechBubbles content={manuScript} />
                                                <Clock events={clockEvents} />
                                            </div>
                                        );
                                    }}
                                />
                            )}
                        />

                        <Route
                            path="/calendar"
                            render={() => (
                                <div>
                                    <Resource
                                        endpoint={`/api/v1/calendar/${schoolId}`}
                                        render={calendarManuscript => (
                                            <SpeechBubbles content={calendarManuscript}>
                                                <ShowLaiban
                                                    toggleMethod={this.toggleLaiban}
                                                    expression={'ok'}
                                                    delay={2500}
                                                    hideTimerInMs={3500}
                                                />
                                            </SpeechBubbles>
                                        )}
                                    />
                                    <Calendar date={new Date()} />
                                </div>
                            )}
                        />

                        <Route
                            path="/activity"
                            render={() => (
                                <div>
                                    <Resource
                                        endpoint={`/api/v1/activity/${schoolId}`}
                                        render={data => (
                                            <SpeechBubbles content={data.content}>
                                                <ShowLaiban
                                                    toggleMethod={this.toggleLaiban}
                                                    expression={'happy'}
                                                    delay={2500}
                                                    hideTimerInMs={3500}
                                                />
                                            </SpeechBubbles>
                                        )}
                                    />
                                </div>
                            )}
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

const Navigation = props => (
    <Menu container>
        {props.links.map(link => (
            <Menu item to={link.to} icon={link.icon} columnSize={props.links.length > 4 ? 4 : 6}>
                {link.content}
            </Menu>
        ))}
    </Menu>
);

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
