import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import sayThis from '../../helper/sayThis';

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
            <div className="screen-size scene">
                <div className="scene__header" />
                <div className="scene__body">
                    <div className="container">
                        <div className="grid-container">
                            <Grid container spacing={32}>
                                <Grid item xs={12}>
                                    <div className="scene__message chat-bubble">{message}</div>
                                </Grid>
                            </Grid>
                        </div>
                        {typeof children !== 'undefined' ? children : null}
                    </div>
                </div>
            </div>
        );
    }
}
