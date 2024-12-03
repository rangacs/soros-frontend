import React from 'react';

// material-ui
import { Card, Grid, Typography } from '@material-ui/core';

// assets
import WbSunnyTwoToneIcon from '@material-ui/icons/WbSunnyTwoTone';

// ===========================|| WIDGET STATISTICS - WEATHER CARD ||=========================== //

const WeatherCard = () => (
    <Card>
        <Grid container alignItems="center">
            <Grid item xs={6} sx={{ p: 3 }}>
                <Typography variant="h2" align="center">
                    19<sup>°</sup>
                </Typography>
                <Typography variant="subtitle2" align="center">
                    Sunny
                </Typography>
            </Grid>
            <Grid item xs={6} sx={{ p: 3, bgcolor: 'primary.dark', color: 'primary.light' }}>
                <Typography align="center" color="inherit">
                    <WbSunnyTwoToneIcon color="inherit" sx={{ fontSize: 40 }} />
                </Typography>
                <Typography variant="subtitle2" align="center" color="inherit">
                    New York , NY
                </Typography>
            </Grid>
        </Grid>
    </Card>
);

export default WeatherCard;
