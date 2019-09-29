import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import FabButtonContent from '../atoms/FabButtonContent.jsx';

export default class Fab extends Component {
    static propTypes = {
        to: PropTypes.string,
        icon: PropTypes.string,
        color: PropTypes.oneOf(['default', 'danger', 'success']),
        text: PropTypes.string,
        onClickCallback: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    };

    static defaultProps = {
        color: 'default',
    };

    render() {
        const { icon, color, text, to, onClickCallback } = this.props;

        if (typeof icon === 'undefined' && typeof text === 'undefined') {
            return null;
        }

        if (typeof onClickCallback === 'function') {
            return (
                <Link
                    to={to}
                    onClick={e => {
                        e.preventDefault();
                        onClickCallback(e);
                    }}
                >
                    <FabButtonContent color={color} text={text} icon={icon} />
                </Link>
            );
        }

        return (
            <Link to={to}>
                <FabButtonContent color={color} text={text} icon={icon} />
            </Link>
        );
    }
}
