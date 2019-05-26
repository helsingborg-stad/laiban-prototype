import React, { Component } from 'react';

import PropTypes from 'prop-types';
import queryString from 'query-string';

export default class ToggleLaiban extends Component {
    static propTypes = {
        toggleMethod: PropTypes.func,
        expression: PropTypes.string,
        delay: PropTypes.number, // In ms
    };

    static defaultProps = {
        toggleMethod: PropTypes.func.isRequired,
        expression: 'screensaver',
        delay: 120000, // 2min
    };

    state = {
        timeOutVar: null,
    };

    componentWillMount() {
        this.setState((state, props) => {
            const timeOut = setTimeout(() => {
                props.toggleMethod(props.expression);
            }, props.delay);

            return { timeOutVar: timeOut };
        });
    }

    componentWillUnmount() {
        if (typeof this.state.timeOutVar === 'number') {
            clearTimeout(this.state.timeOutVar);
        }
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}
