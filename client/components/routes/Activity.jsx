import React, { Component } from 'react';

import SpeechBubbles from '../organisms/SpeechBubbles.jsx';
import Resource from '../organisms/Resource.jsx';
import ShowLaiban from '../organisms/ShowLaiban.jsx';

export default class Activity extends Component {
    render() {
        const { schoolId, toggleLaiban } = this.props;
        return (
            <Resource
                endpoint={`/api/v1/activity/${schoolId}`}
                render={data => (
                    <SpeechBubbles content={data.content}>
                        <ShowLaiban
                            toggleMethod={toggleLaiban}
                            expression={'happy'}
                            delay={2500}
                            hideTimerInMs={3500}
                        />
                    </SpeechBubbles>
                )}
            />
        );
    }
}
