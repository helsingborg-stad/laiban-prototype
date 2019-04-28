import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Scene from './shared/Scene.jsx';

export default class Clock extends Component {
    render() {
        const content =
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, praesentium molestiae suscipit ullam error asperiores quos atque voluptas modi nisi veniam maxime eaque doloribus sapiente consectetur. Cumque quidem repudiandae quas.';

        return (
            <Scene message={{ text: content }}>
                <div className="grid-container">
                    <Grid container spacing={32} />
                </div>
            </Scene>
        );
    }
}
