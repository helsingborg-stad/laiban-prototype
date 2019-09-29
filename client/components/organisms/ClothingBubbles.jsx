import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import Manuscript from './Manuscript.jsx';
import Bubble from '../atoms/Bubble.jsx';
import CLOTHING_SETS from '../../storage/CLOTHING_SETS';

class ClothingBubbles extends Component {
    static propTypes = {
        weather: PropTypes.string,
        onEnd: PropTypes.func,
    };

    render() {
        const { weather, onEnd } = this.props;
        return (
            <div className="container-small">
                <Manuscript
                    content={CLOTHING_SETS[weather]}
                    onEnd={onEnd}
                    render={data =>
                        data.pieces.length > 0
                            ? data.pieces.map((garment, index) => (
                                  <Bubble key={`${index}-${garment}`} icon={garment.image}>
                                      {garment.text}
                                  </Bubble>
                              ))
                            : null
                    }
                />
            </div>
        );
    }
}

export default ClothingBubbles;
