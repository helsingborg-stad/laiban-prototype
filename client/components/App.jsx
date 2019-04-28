import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { withRouter, BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Intro from './Intro.jsx';
import Navigation from './Navigation.jsx';
import Clothing from './Clothing.jsx';
import Clock from './Clock.jsx';
import Lunch from './Lunch.jsx';
import Weather from './Weather.jsx';

class App extends Component {
    render() {
        const { location } = this.props;

        return (
            <div>
                <Route path="/" exact component={Intro} />
                <Route path="/navigation" component={Navigation} />
                <Route path="/clothing" component={Clothing} />
                <Route path="/weather" component={Weather} />
                <Route path="/lunch" component={Lunch} />
                <Route path="/clock" component={Clock} />

                {typeof location.pathname !== 'undefined' &&
                !['/', '/navigation'].includes(location.pathname) ? (
                    <div className="home-button">
                        <Link to="/navigation">Home</Link>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default hot(module)(withRouter(App));
