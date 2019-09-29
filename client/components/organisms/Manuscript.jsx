import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Speech from './Speech.jsx';
import Bubble from '../atoms/Bubble.jsx';

export default class Manuscript extends Component {
    state = {
        queue: Object.create(this.props.content),
        audioPiece: '',
        pieces: [],
    };

    static propTypes = {
        content: PropTypes.array,
        render: PropTypes.func,
        onEnd: PropTypes.func,
        disableSpeech: PropTypes.bool,
    };

    componentDidMount() {
        this.nextPiece();
    }

    nextPiece = () => {
        const { queue } = this.state;
        const { onEnd } = this.props;

        // Unmount audio
        this.setState({ audioPiece: '' });

        if (queue.length <= 0) {
            if (typeof onEnd !== 'undefined') {
                onEnd();
            }

            return;
        }

        this.setState((state, props) => {
            const { queue, pieces } = state;
            const currentPiece = queue.shift();
            pieces.push(currentPiece);

            return {
                queue: queue,
                audioPiece:
                    typeof currentPiece === 'object' && typeof currentPiece.text === 'string'
                        ? currentPiece.text
                        : currentPiece,
                pieces: pieces,
            };
        });
    };

    render() {
        const { audioPiece, pieces } = this.state;
        const { render } = this.props;
        return (
            <>
                {typeof render === 'function' ? render(this.state) : null}

                {audioPiece.length > 0 ? <Speech text={audioPiece} onEnd={this.nextPiece} /> : null}
            </>
        );
    }
}
