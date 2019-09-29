import React, { Component } from 'react';

import ClothingBubbles from '../organisms/ClothingBubbles.jsx';
import Resource from '../organisms/Resource.jsx';

export default class Clothing extends Component {
    render() {
        const { schoolId, toggleActionButton, toggleLaiban } = this.props;
        return (
            <Resource
                endpoint={`/api/v1/clothing/${schoolId}`}
                render={data => {
                    return (
                        <ClothingBubbles
                            weather={data.weather}
                            onEnd={() => {
                                toggleActionButton('/', 'Vi är klara!', () => {
                                    toggleLaiban('happy', 4000);
                                });
                            }}
                        />
                    );
                }}
                onUnmount={() => {
                    toggleActionButton('');
                }}
            />
        );
    }
}
