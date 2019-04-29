import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Intro extends Component {
    render() {
        return (
            <Link to="/navigation">
                <div className="screen-size laiban labian-idle">
                    <span />
                </div>
            </Link>
        );
    }
}
