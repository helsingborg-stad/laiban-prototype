import React, { Component } from 'react';

import PropTypes from 'prop-types';

import lunchIcon from '../assets/images/home/home-plate.png';
import weatherIcon from '../assets/images/home/home-cloud-sun.png';
import clothingIcon from '../assets/images/home/home-playground.png';
import clockIcon from '../assets/images/home/home-time.png';
import dayIcon from '../assets/images/home/home-schedule.png';

import Menu from './shared/Menu.jsx';

export default class Home extends Component {
    render() {
        return (
            <div className="container space-top">
                <Menu container>
                    <Menu item to={'/going-out'} icon={clothingIcon}>
                        Vi ska gå ut
                    </Menu>
                    <Menu item to={'/lunch'} icon={lunchIcon}>
                        Vad blir det för mat idag?
                    </Menu>
                    <Menu item to={'/time'} icon={clockIcon}>
                        Vad är klockan?
                    </Menu>
                    <Menu item to={'/calendar'} icon={dayIcon}>
                        Vad är det för dag idag?
                    </Menu>
                    {/* <Menu item to={'/weather'} icon={weatherIcon}>
                        Vad är det för väder ute?
                    </Menu> */}
                </Menu>
            </div>
        );
    }
}
