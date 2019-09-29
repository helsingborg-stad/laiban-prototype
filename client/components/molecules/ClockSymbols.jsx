import React from 'react';
import dateFns from 'date-fns';
import ClockSymbol from '../atoms/ClockSymbol.jsx';

const ClockSymbols = props => {
    const { events } = props;
    return (
        <div className="clock-symbols">
            {typeof events !== 'undefined' && events.length > 0
                ? events.map(event => {
                      const today = new Date();
                      today.setHours(event.time.split(':')[0]);
                      today.setMinutes(event.time.split(':')[1]);
                      const hour = dateFns.format(today, 'h');
                      const minute = dateFns.format(today, 'm');
                      return (
                          <ClockSymbol
                              key={`${event}-${hour}-${minute}`}
                              hour={hour}
                              minute={minute}
                          >
                              {event.emoji}
                          </ClockSymbol>
                      );
                  })
                : null}
        </div>
    );
};

export default ClockSymbols;
