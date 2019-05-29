import React, { Component } from 'react';

import PropTypes from 'prop-types';
import queryString from 'query-string';

export default class ShowLaiban extends Component {
    static propTypes = {
        toggleMethod: PropTypes.func,
        expression: PropTypes.string,
        delay: PropTypes.number, // In ms
        hideTimerInMs: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]), // in ms
    };

    static defaultProps = {
        toggleMethod: PropTypes.func.isRequired,
        expression: 'screensaver',
        delay: 120000, // 2min
        hideTimerInMs: false,
    };

    state = {
        timeOutVar: null,
    };

    componentWillMount() {
        this.setState((state, props) => {
            const timeOut = setTimeout(() => {
                const { hideTimerInMs } = props;
                props.toggleMethod(
                    props.expression,
                    typeof hideTimerInMs === 'number' ? hideTimerInMs : false
                );
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
