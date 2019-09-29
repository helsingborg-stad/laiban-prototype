import React, { Component } from 'react';

import SpeechBubbles from '../organisms/SpeechBubbles.jsx';
import Resource from '../organisms/Resource.jsx';
import ShowLaiban from '../organisms/ShowLaiban.jsx';
import Navigation from '../molecules/Navigation.jsx';

// Menu Icons
import lunchIcon from '../../assets/images/home/home-plate@2x.png';
import goingOutIcon from '../../assets/images/home/home-going-out@2x.png';
import activityIcon from '../../assets/images/home/home-activity@2x.png';
import clockIcon from '../../assets/images/home/home-time@2x.png';
import dayIcon from '../../assets/images/home/home-schedule@2x.png';

export default class Home extends Component {
    render() {
        const { schoolId } = this.props;
        return (
            <Resource
                endpoint={`/api/v1/activity/${schoolId}`}
                render={todaysActivity => (
                    <div>
                        <SpeechBubbles content={['Vad vill du veta?']} />
                        <ShowLaiban
                            toggleMethod={this.toggleLaiban}
                            expression={'screensaver'}
                            delay={120000 /* 2min */}
                        />
                        <div className="container space-top">
                            <Navigation
                                links={[
                                    {
                                        to: '/going-out',
                                        icon: goingOutIcon,
                                        content: 'Vi ska klä på oss',
                                    },
                                    {
                                        to: '/lunch',
                                        icon: lunchIcon,
                                        content: 'Vad blir det för mat idag?',
                                    },
                                    {
                                        to: '/time',
                                        icon: clockIcon,
                                        content: 'Vad är klockan?',
                                    },
                                    {
                                        to: '/date',
                                        icon: dayIcon,
                                        content: 'Vad är det för dag idag?',
                                    },
                                ].concat(
                                    /* Dyanmic menu items */
                                    typeof todaysActivity.content !== 'undefined' &&
                                        todaysActivity.content.length > 0
                                        ? [
                                              {
                                                  to: '/activity',
                                                  icon: activityIcon,
                                                  content: 'Vad ska vi göra idag?',
                                              },
                                          ]
                                        : []
                                )}
                            />
                        </div>
                    </div>
                )}
            />
        );
    }
}
