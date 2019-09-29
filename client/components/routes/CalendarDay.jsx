import React, { Component } from 'react';

import SpeechBubbles from '../organisms/SpeechBubbles.jsx';
import Resource from '../organisms/Resource.jsx';
import ShowLaiban from '../organisms/ShowLaiban.jsx';
import Calendar from '../molecules/Calendar.jsx';

export default class CalendarDay extends Component {
    state = {
        showCalendar: false,
    };

    render() {
        const { schoolId, toggleLaiban } = this.props;
        const { showCalendar } = this.state;
        return (
            <div>
                <Resource
                    endpoint={`/api/v1/calendar/${schoolId}`}
                    render={calendarManuscript => (
                        <SpeechBubbles
                            onMount={() => {
                                this.setState({ showCalendar: true });
                            }}
                            content={calendarManuscript}
                        >
                            <ShowLaiban
                                toggleMethod={toggleLaiban}
                                expression={'ok'}
                                delay={2500}
                                hideTimerInMs={3500}
                            />
                        </SpeechBubbles>
                    )}
                />
                {showCalendar ? <Calendar date={new Date()} /> : null}
            </div>
        );
    }
}
