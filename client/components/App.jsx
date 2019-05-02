import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { withRouter, BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import dateFns from 'date-fns';
import Scene from './shared/Scene.jsx';
import Fab from './shared/Fab.jsx';
import Speech from './shared/Speech.jsx';
import SpeechBubbles from './shared/SpeechBubbles.jsx';
import Manuscript from './shared/Manuscript.jsx';
import Bubble from './shared/Bubble.jsx';
import Resource from './shared/Resource.jsx';

import Intro from './Intro.jsx';
import Home from './Home.jsx';
import Clothing from './Clothing.jsx';
import Time from './Time.jsx';
import Lunch from './Lunch.jsx';
import Weather from './Weather.jsx';
import Calendar from './Calendar.jsx';

import HomeIcon from '../assets/images/home-white.png';
import playIcon from '../assets/images/play-white.png';

import tinyLaiban from '../assets/images/laiban/laiban-figur-liten.png';

class App extends Component {
    state = { disableSpeech: true };

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
                                <div>
                                    <SpeechBubbles content={['Vad vill du veta?']} />
                                    <div className="container">
                                        <Home />
                                    </div>
                                </div>
                            )}
                        />
                        <Route
                            path="/clothing"
                            render={() => (
                                <div>
                                    <SpeechBubbles content={['Vad ska jag ha på mig?']} />
                                    <div className="container">
                                        <Clothing />
                                    </div>
                                </div>
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
                            path="/time"
                            render={() => (
                                <div>
                                    <SpeechBubbles
                                        content={[
                                            `Klockan är ${dateFns.format(new Date(), 'HH:mm')}`,
                                        ]}
                                    />
                                    <div className="container">
                                        <Time />
                                    </div>
                                </div>
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
                        <Route
                            path="/weather"
                            render={() => (
                                <div>
                                    <SpeechBubbles content={['Vad blir det för väder?']} />
                                    <div className="container">
                                        <Weather />
                                    </div>
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
