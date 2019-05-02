import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { withRouter, BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import dateFns from 'date-fns';
import Scene from './shared/Scene.jsx';
import Fab from './shared/Fab.jsx';

import Intro from './Intro.jsx';
import Home from './Home.jsx';
import Clothing from './Clothing.jsx';
import Clock from './Clock.jsx';
import Lunch from './Lunch.jsx';
import Weather from './Weather.jsx';
import Calendar from './Calendar.jsx';

import HomeIcon from '../assets/images/home-white.png';
import playIcon from '../assets/images/play-white.png';

import tinyLaiban from '../assets/images/laiban/laiban-figur-liten.png';

class App extends Component {
    state = { disableSpeech: false };

    render() {
        const { location } = this.props;
        const { disableSpeech } = this.state;

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
                                <Scene
                                    message={'Vad vill du veta?'}
                                    showMessage={true}
                                    disableSpeech={disableSpeech}
                                >
                                    <Home />
                                </Scene>
                            )}
                        />
                        <Route
                            path="/clothing"
                            render={() => (
                                <Scene
                                    message={'Vad ska jag ha på mig?'}
                                    disableSpeech={disableSpeech}
                                >
                                    <Clothing />
                                </Scene>
                            )}
                        />
                        <Route
                            path="/weather"
                            render={() => (
                                <Scene
                                    message={'Vad blir det för väder?'}
                                    disableSpeech={disableSpeech}
                                >
                                    <Weather />
                                </Scene>
                            )}
                        />
                        <Route
                            path="/lunch"
                            render={() => (
                                <div>
                                    <Lunch disableSpeech={disableSpeech} />
                                </div>
                            )}
                        />
                        <Route
                            path="/clock"
                            render={() => (
                                <Scene
                                    message={`Klockan är ${dateFns.format(new Date(), 'HH:mm')}`}
                                    disableSpeech={disableSpeech}
                                >
                                    <Clock />
                                </Scene>
                            )}
                        />
                        <Route
                            path="/calendar"
                            render={() => (
                                <div>
                                    <Calendar disableSpeech={disableSpeech} />
                                </div>
                            )}
                        />
                    </main>
                    <footer className="footer">
                        <div className="container">
                            {typeof location.pathname !== 'undefined' &&
                            !['/', '/'].includes(location.pathname) ? (
                                <Fab to="/" icon={HomeIcon} color="danger" />
                            ) : null}
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default hot(module)(withRouter(App));
