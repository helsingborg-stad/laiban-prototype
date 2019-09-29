import React, { Component } from 'react';

import SpeechBubbles from '../organisms/SpeechBubbles.jsx';
import Resource from '../organisms/Resource.jsx';
import ShowLaiban from '../organisms/ShowLaiban.jsx';

export default class Lunch extends Component {
    render() {
        const { schoolId, toggleLaiban } = this.props;
        return (
            <Resource
                endpoint={`/api/v1/lunch/${schoolId}`}
                render={todaysLunchScript => (
                    <SpeechBubbles content={todaysLunchScript}>
                        <ShowLaiban
                            toggleMethod={toggleLaiban}
                            expression={'slurp'}
                            delay={2000}
                            hideTimerInMs={3000}
                        />
                    </SpeechBubbles>
                )}
            />
        );
    }
}
