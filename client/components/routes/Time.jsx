import React, { Component } from 'react';
import dateFns from 'date-fns';

import SpeechBubbles from '../organisms/SpeechBubbles.jsx';
import Resource from '../organisms/Resource.jsx';
import Clock from '../molecules/Clock.jsx';

export default class Time extends Component {
    state = {
        showClock: false,
    };

    render() {
        const { schoolId } = this.props;
        const { showClock } = this.state;
        return (
            <Resource
                endpoint={`/api/v1/clock/${schoolId}`}
                render={clockEvents => {
                    const manuScript = [`Klockan är ${dateFns.format(new Date(), 'HH:mm')}`];

                    if (clockEvents.length > 0) {
                        const today = new Date();
                        const day = today.getDate();
                        const month = today.getMonth();
                        const year = today.getFullYear();

                        const clockTimeEvents = clockEvents.map(event => {
                            const date = new Date();
                            date.setHours(event.time.split(':')[0]);
                            date.setMinutes(event.time.split(':')[1]);

                            return date;
                        });

                        const closestEventIndex = dateFns.closestIndexTo(today, clockTimeEvents);

                        const differenceInMinutes = dateFns.differenceInMinutes(
                            clockTimeEvents[closestEventIndex],
                            today
                        );

                        const isIntheFuture = dateFns.isFuture(clockTimeEvents[closestEventIndex]);

                        if (
                            isIntheFuture &&
                            differenceInMinutes <= 30 &&
                            typeof clockEvents[closestEventIndex].event === 'string' &&
                            clockEvents[closestEventIndex].event.length > 0
                        ) {
                            manuScript.push(clockEvents[closestEventIndex].event);
                        }
                    }

                    return (
                        <div>
                            <SpeechBubbles
                                content={manuScript}
                                onMount={() => {
                                    this.setState({ showClock: true });
                                }}
                            />
                            {showClock ? <Clock events={clockEvents} /> : null}
                        </div>
                    );
                }}
            />
        );
    }
}
