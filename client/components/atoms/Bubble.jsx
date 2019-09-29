import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Bubble extends Component {
    static propTypes = {
        icon: PropTypes.string,
        image: PropTypes.string,
        children: PropTypes.string,
        speechBubble: PropTypes.bool,
        compact: PropTypes.bool,
    };

    static defaultProps = {
        speechBubble: false,
        compact: false,
    };

    render() {
        const { compact, speechBubble, children, icon, image } = this.props;

        const classes = [];

        classes.push(speechBubble ? 'speech-bubble' : 'bubble');

        if (compact) {
            classes.push('bubble--compact');
        }

        return (
            <div className={classes.join(' ')}>
                {icon ? (
                    <div className="bubble__icon">
                        <img src={icon} />
                    </div>
                ) : null}

                <div className="bubble__content">{children}</div>

                {image ? (
                    <div className="bubble__image">
                        <img src={image} />
                    </div>
                ) : null}
            </div>
        );
    }
}
