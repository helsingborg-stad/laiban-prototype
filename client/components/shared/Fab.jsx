import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
                    <ButtonContent color={color} text={text} icon={icon} />
                </Link>
            );
        }

        return (
            <Link to={to}>
                <ButtonContent color={color} text={text} icon={icon} />
            </Link>
        );
    }
}

const FabIcon = props => (
    <div className="fab__icon">
        <img src={props.icon} />
    </div>
);

const ButtonContent = props => (
    <div
        className={classNames('fab', {
            'fab--extended': typeof props.text !== 'undefined' && props.text.length > 0,
            'fab--success': props.color === 'success',
            'fab--danger': props.color === 'danger',
        })}
    >
        {props.text || <FabIcon icon={props.icon} />}
    </div>
);
