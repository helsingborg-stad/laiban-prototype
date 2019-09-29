/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MenuItem from '../atoms/MenuItem.jsx';
import MenuContainer from '../atoms/MenuContainer.jsx';

export default class Menu extends Component {
    static propTypes = {
        container: PropTypes.bool,
        item: PropTypes.bool,
        to: PropTypes.string,
        icon: PropTypes.string,
        columnSize: PropTypes.number,
    };

    static defaultProps = {
        item: true,
        columnSize: 4,
    };

    render() {
        {
            const { container, to, icon, children, columnSize } = this.props;
            if (container) {
                return <MenuContainer>{children}</MenuContainer>;
            }

            return (
                <MenuItem icon={icon} to={to} columnSize={columnSize}>
                    {children}
                </MenuItem>
            );
        }
    }
}
