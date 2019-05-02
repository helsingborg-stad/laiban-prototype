import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Fab extends Component {
    static propTypes = {
        to: PropTypes.string.isRequired,
        icon: PropTypes.string,
        color: PropTypes.oneOf(['default', 'danger', 'success']),
        text: PropTypes.string,
    };

    static defaultProps = {
        color: 'default',
    };

    render() {
        const { icon, color, text, to } = this.props;

        if (typeof icon === 'undefined' && typeof text === 'undefined') {
            return null;
        }

        return (
            <Link to={to}>
                <div
                    className={classNames('fab', {
                        'fab--extended': typeof text !== 'undefined' && text.length > 0,
                        'fab--success': color === 'success',
                        'fab--danger': color === 'danger',
                    })}
                >
                    {text || <FabIcon icon={icon} />}
                </div>
            </Link>
        );
    }
}

const FabIcon = props => (
    <div className="fab__icon">
        <img src={props.icon} />
    </div>
);
