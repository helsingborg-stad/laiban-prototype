import React, { Component } from 'react';

import SpeechBubbles from '../organisms/SpeechBubbles.jsx';
import Resource from '../organisms/Resource.jsx';

export default class GoingOut extends Component {
    render() {
        const { schoolId, toggleActionButton } = this.props;
        return (
            <div>
                <Resource
                    endpoint={`/api/v1/clothing/${schoolId}`}
                    render={data => {
                        return (
                            <SpeechBubbles
                                content={[
                                    `${data.weatherString}  Låt oss se vad ni ska ha på er.`,
                                    'Är ni redo?',
                                ]}
                                onEnd={() => {
                                    toggleActionButton('/clothing');
                                }}
                            />
                        );
                    }}
                    onUnmount={() => {
                        toggleActionButton('');
                    }}
                />
            </div>
        );
    }
}
