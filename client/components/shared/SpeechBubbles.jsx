import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Manuscript from './Manuscript.jsx';
import Bubble from './Bubble.jsx';

export default class SpeechBubbles extends Component {
    static propTypes = {
        content: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
        onEnd: PropTypes.func,
    };

    state = {
        showChildren: false,
    };

    onEndCallback = () => {
        const { content, onEnd, children } = this.props;

        if (typeof onEnd === 'function') {
            onEnd();
        }
        this.setState({ showChildren: true });
    };

    render() {
        const { content, children } = this.props;
        const { showChildren } = this.state;
        return (
            <div className="container-small">
                <Manuscript
                    content={content}
                    onEnd={this.onEndCallback}
                    render={data =>
                        data.pieces.length > 0
                            ? data.pieces.map(piece => {
                                  return (
                                      <Bubble
                                          speechBubble
                                          image={
                                              typeof piece === 'object' &&
                                              typeof piece.image === 'string' &&
                                              piece.image.length > 0
                                                  ? piece.image
                                                  : null
                                          }
                                      >
                                          {typeof piece === 'object' ? piece.text : piece}
                                      </Bubble>
                                  );
                              })
                            : null
                    }
                />
                {showChildren && children}
            </div>
        );
    }
}
