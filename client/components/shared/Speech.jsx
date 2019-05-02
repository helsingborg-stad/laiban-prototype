import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Speech extends Component {
    state = {
        audio: new Audio(),
    };

    static propTypes = {
        text: PropTypes.string.isRequired,
        onEnd: PropTypes.func,
    };

    componentDidMount() {
        const { text, onEnd } = this.props;

        text2Speech(text).then(response => {
            const { audioContent } = response;
            const { audio } = this.state;

            if (typeof onEnd !== 'undefined') {
                audio.onended = onEnd;
            }

            audio.src = `data:audio/ogg;base64,${audioContent}`;
            audio.play();
        });
    }

    componentWillUnmount() {
        const { audio } = this.state;

        // Pause audio
        audio.pause();
        audio.currentTime = 0;

        // Remove Audio object
        this.setState({ audio: '' });
    }

    render() {
        return <div />;
    }
}

const text2Speech = async text => {
    const url = '/api/v1/text2speech';
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,
        }),
    };

    return fetch(url, params)
        .then(response => {
            // console.log(response);
            return response.json();
        })
        .then(json => {
            // console.log(json);

            return json;
        });
};
