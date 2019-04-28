import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

export default class Scene extends Component {
    static propTypes = {
        message: PropTypes.shape({
            text: PropTypes.string.isRequired,
            audio: PropTypes.string,
            children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
        }),
    };

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
                                    <div className="scene__message chat-bubble">{message.text}</div>
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
