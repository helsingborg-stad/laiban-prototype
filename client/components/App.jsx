import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { withRouter, BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Scene from './shared/Scene.jsx';
import Fab from './shared/Fab.jsx';

import Intro from './Intro.jsx';
import Navigation from './Navigation.jsx';
import Clothing from './Clothing.jsx';
import Clock from './Clock.jsx';
import Lunch from './Lunch.jsx';
import Weather from './Weather.jsx';
import Calendar from './Calendar.jsx';

import HomeIcon from '../assets/images/home-white.png';
import playIcon from '../assets/images/play-white.png';

class App extends Component {
    state = { disableSpeech: false };

    render() {
        const { location } = this.props;
        const { disableSpeech } = this.state;

        return (
            <div>
                <Route path="/" exact component={Intro} />
                <Route
                    path="/navigation"
                    render={() => (
                        <Scene
                            message={'Vad vill du veta?'}
                            showMessage={true}
                            disableSpeech={disableSpeech}
                        >
                            <Navigation />
                        </Scene>
                    )}
                />
                <Route
                    path="/clothing"
                    render={() => (
                        <Scene message={'Vad ska jag ha på mig?'} disableSpeech={disableSpeech}>
                            <Clothing />
                        </Scene>
                    )}
                />
                <Route
                    path="/weather"
                    render={() => (
                        <Scene message={'Vad blir det för väder?'} disableSpeech={disableSpeech}>
                            <Weather />
                        </Scene>
                    )}
                />
                <Route
                    path="/lunch"
                    render={() => (
                        <Scene message={'Vad blir det för mat?'} disableSpeech={disableSpeech}>
                            <Lunch />
                        </Scene>
                    )}
                />
                <Route
                    path="/clock"
                    render={() => (
                        <Scene message={'Vad är klockan?'} disableSpeech={disableSpeech}>
                            <Clock />
                        </Scene>
                    )}
                />
                <Route
                    path="/calendar"
                    render={() => (
                        <Scene message={'Vilken dag är det?'} disableSpeech={disableSpeech}>
                            <Calendar />
                        </Scene>
                    )}
                />

                <div className="footer">
                    <div className="container">
                        {typeof location.pathname !== 'undefined' &&
                        !['/', '/navigation'].includes(location.pathname) ? (
                            <Fab to="/navigation" icon={HomeIcon} color="danger" />
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(module)(withRouter(App));
