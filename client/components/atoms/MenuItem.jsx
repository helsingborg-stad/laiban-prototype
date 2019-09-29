import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const MenuItem = props => (
    <Grid item xs={props.columnSize}>
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

export default MenuItem;
