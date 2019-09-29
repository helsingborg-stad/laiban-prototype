import React from 'react';

const ClockSymbol = props => {
    let degrees = 0;
    degrees = props.hour * 30 + degrees;
    degrees = props.minute * 0.5 + degrees;
    if (typeof props.deg === 'number' && props.deg > 0) {
        degrees = props.deg;
    }
    return (
        <div className="clock-symbol" style={{ transform: `rotateZ(${degrees}deg)` }}>
            <div className="clock-symbol__inner" style={{ transform: `rotateZ(-${degrees}deg)` }}>
                {props.children}
            </div>
        </div>
    );
};

export default ClockSymbol;
