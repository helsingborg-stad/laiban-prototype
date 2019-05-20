import React, { Component } from 'react';

import PropTypes from 'prop-types';

import lunchIcon from '../assets/images/home/home-plate@2x.png';
import weatherIcon from '../assets/images/home/home-cloud-sun@2x.png';
import clothingIcon from '../assets/images/home/home-playground@2x.png';
import clockIcon from '../assets/images/home/home-time@2x.png';
import dayIcon from '../assets/images/home/home-schedule@2x.png';

import Menu from './shared/Menu.jsx';

export default class Home extends Component {
    state = {
        timeOutVar: null,
    };

    componentWillMount() {
        this.setState((state, props) => {
            const timeOut = setTimeout(() => {
                props.toggleLaiban();
            }, 120000); // 2min

            return { timeOutVar: timeOut };
        });
    }

    componentWillUnmount() {
        if (typeof this.state.timeOutVar === 'number') {
            clearTimeout(this.state.timeOutVar);
        }
    }

    render() {
        return (
            <div className="container space-top">
                <Menu container>
                    <Menu item to={'/going-out'} icon={clothingIcon}>
                        Vi ska klä på oss
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
