import React from 'react';
import Grid from '@material-ui/core/Grid';

const MenuContainer = props => (
    <div className="grid-container">
        <Grid container spacing={32} justify={'center'}>
            {typeof props.children !== 'undefined' ? props.children : null}
        </Grid>
    </div>
);

export default MenuContainer;
