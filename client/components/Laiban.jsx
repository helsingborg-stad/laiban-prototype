import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import LAIBAN_AHA from '../assets/images/laiban/aha.gif';
import LAIBAN_OK from '../assets/images/laiban/ok.gif';
import LAIBAN_HAPPY from '../assets/images/laiban/happy.gif';
import LAIBAN_SCREENSAVER from '../assets/images/laiban/screensaver.gif';
import LAIBAN_SLEEPY from '../assets/images/laiban/sleepy.gif';
import LAIBAN_SLURP from '../assets/images/laiban/slurp.gif';

export default class Laiban extends Component {
    static propTypes = {
        expression: PropTypes.string,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        expression: 'screensaver',
    };

    render() {
        const { onClick } = this.props;
        return (
            <div className="screen-float z-top" onClick={onClick}>
                <div
                    className="screen-size laiban laiban-large"
                    style={{ backgroundImage: `url(${LAIBAN_SCREENSAVER})` }}
                >
                    <span />
                </div>
            </div>
        );
    }
}

const Expressions = {
    aha: LAIBAN_AHA,
    ok: LAIBAN_OK,
    happy: LAIBAN_HAPPY,
    screensaver: LAIBAN_SCREENSAVER,
    sleepy: LAIBAN_SLEEPY,
    slurp: LAIBAN_SLURP,
};