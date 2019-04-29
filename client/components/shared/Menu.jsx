/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Menu extends Component {
    static propTypes = {
        container: PropTypes.bool,
        item: PropTypes.bool,
        to: PropTypes.string,
        icon: PropTypes.string,
    };

    static defaultProps = {
        item: true,
    };

    render() {
        {
            const { container, to, icon, children } = this.props;

            if (container) {
                return <MenuContainer>{children}</MenuContainer>;
            }

            return (
                <MenuItem icon={icon} to={to}>
                    {children}
                </MenuItem>
            );
        }
    }
}

const MenuItem = props => (
    <Grid item xs={4}>
        <Link to={props.to}>
            <div className="text-center">
                <div className="menu-icon">
                    <img src={props.icon} />
                </div>
                <div className="menu-content">{props.children}</div>
            </div>
        </Link>
    </Grid>
);

const MenuContainer = props => (
    <div className="grid-container">
        <Grid container spacing={32} justify={'center'}>
            {typeof props.children !== 'undefined' ? props.children : null}
        </Grid>
    </div>
);
