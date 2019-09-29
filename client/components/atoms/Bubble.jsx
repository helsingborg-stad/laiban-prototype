import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Bubble extends Component {
    static propTypes = {
        icon: PropTypes.string,
        image: PropTypes.string,
        children: PropTypes.string,
        speechBubble: PropTypes.bool,
    };

    static defaultProps = {
        speechBubble: false,
    };

    render() {
        const { speechBubble, children, icon, image } = this.props;

        return (
            <div className={speechBubble ? 'speech-bubble' : 'bubble'}>
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
