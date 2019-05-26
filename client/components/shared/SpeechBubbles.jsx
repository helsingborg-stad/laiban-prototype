import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Manuscript from './Manuscript.jsx';
import Bubble from './Bubble.jsx';

export default class SpeechBubbles extends Component {
    static propTypes = {
        content: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
        onEnd: PropTypes.func,
    };

    render() {
        const { content, onEnd } = this.props;
        console.log(content);
        return (
            <div className="container-small">
                <Manuscript
                    content={content}
                    onEnd={onEnd}
                    render={data =>
                        data.pieces.length > 0
                            ? data.pieces.map(piece => (
                                <Bubble speechBubble>
                                    {typeof piece === 'object' ? piece.text : piece}
                                </Bubble>
                            ))
                            : null
                    }
                />
            </div>
        );
    }
}
