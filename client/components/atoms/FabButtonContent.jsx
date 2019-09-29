import React from 'react';
import classNames from 'classnames';
import FabIcon from './FabIcon.jsx';

const FabButtonContent = props => (
    <div
        className={classNames('fab', {
            'fab--extended': typeof props.text !== 'undefined' && props.text.length > 0,
            'fab--success': props.color === 'success',
            'fab--danger': props.color === 'danger',
        })}
    >
        {props.text || <FabIcon icon={props.icon} />}
    </div>
);

export default FabButtonContent;
