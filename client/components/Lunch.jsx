import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import dateFns from 'date-fns';
import LUNCH_MENU from '../storage/LUNCH_MENU';

import Scene from './shared/Scene.jsx';

export default class Lunch extends Component {
    state = {
        menu: '',
    };

    componentDidMount() {
        const todaysMenuKey = Object.keys(LUNCH_MENU).filter(date =>
            dateFns.isSameDay(new Date(), new Date(date))
        );

        let todaysMenu = '';

        if (todaysMenuKey.length === 1) {
            todaysMenu = `Idag blir det ${LUNCH_MENU[todaysMenuKey[0]]}`;
        }

        if (todaysMenu.length <= 0) {
            todaysMenu = 'Idag ska köket överraska oss så jag vet inte vad det blir för mat.';
        }

        this.setState({ menu: todaysMenu });
    }

    render() {
        const { menu } = this.state;
        const { disableSpeech } = this.props;

        return (
            <div>
                {menu.length > 0 ? (
                    <Scene message={menu} disableSpeech={disableSpeech}>
                        <div className="grid-container">
                            <Grid container spacing={32} />
                        </div>
                    </Scene>
                ) : null}
            </div>
        );
    }
}
