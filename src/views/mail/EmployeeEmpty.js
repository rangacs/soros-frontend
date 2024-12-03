import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { CardMedia, Grid, Typography } from '@material-ui/core';

import imageEmpty from 'assets/images/maintenance/empty.svg';
// project imports
import { gridSpacing } from 'store/constant';

// style constant
const useStyles = makeStyles({
    emailEmptyContent: {
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center'
    }
});

// ===========================|| NO/EMPTY MAIL ||=========================== //

const EmployeeEmpty = () => {
    const classes = useStyles();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <div className={classes.emailEmptyContent}>
                    <Grid container justifyContent="center" spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <CardMedia component="img" image={imageEmpty} title="Slider5 image" />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Typography variant="h1" color="inherit" component="div">
                                        There is no Mail
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">When You have message that will Display here</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
};

export default EmployeeEmpty;
