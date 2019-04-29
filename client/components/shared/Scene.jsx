import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import sayThis from '../../helper/sayThis';

import tinyLaiban from '../../assets/images/laiban/laiban-figur-liten.png';
import Bubble from './Bubble.jsx';

export default class Scene extends Component {
    static propTypes = {
        message: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    };

    static defaultProps = {
        showMessage: false,
        disableSpeech: false,
    };

    state = {
        showMessage: this.props.showMessage,
    };

    componentDidMount() {
        const { message, disableSpeech } = this.props;

        if (!disableSpeech) {
            sayThis(message).then(() => {
                console.log(message);
            });
        }

        this.setState({ showMessage: true });
    }

    render() {
        const { children, message } = this.props;

        return (
            <div className="screen-size">
                <div className="header container-small relative">
                    <img className="laiban-tiny" src={tinyLaiban} />
                </div>
                <div className="content">
                    <div className="container-small">
                        <Bubble speechBubble>{message}</Bubble>
                    </div>

                    {typeof children !== 'undefined' ? (
                        <div className="container">{children}</div>
                    ) : null}
                </div>
            </div>
        );
    }
}
