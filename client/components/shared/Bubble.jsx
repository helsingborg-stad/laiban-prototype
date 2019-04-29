import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Bubble extends Component {
    static propTypes = {
        icon: PropTypes.string,
        children: PropTypes.string,
        speechBubble: PropTypes.bool,
    };

    static defaultProps = {
        speechBubble: false,
    };

    render() {
        const { speechBubble, children, icon } = this.props;

        if (speechBubble) {
            return <div className="speech-bubble">{children}</div>;
        }

        return (
            <div className="bubble">
                {icon ? (
                    <div className="bubble__icon">
                        <img src={icon} />
                    </div>
                ) : null}

                <div className="bubble__content">{children}</div>
            </div>
        );
    }
}
