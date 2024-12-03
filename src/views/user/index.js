import React from 'react';

// material-ui
import { useTheme, makeStyles } from '@material-ui/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

// project imports
// import MarketShareAreaChartCard from './MarketShareAreaChartCard';
// import TotalRevenueCard from './TotalRevenueCard';
// import LatestCustomerTableCard from './LatestCustomerTableCard';
import MainCard from 'ui-component/cards/MainCard';
import RevenueCard from 'ui-component/cards/RevenueCard';
import UserCountCard from 'ui-component/cards/UserCountCard';
import { gridSpacing } from 'store/constant';

// assets
import { IconShare, IconAccessPoint, IconCircles, IconCreditCard } from '@tabler/icons';
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import AccountCircleTwoTone from '@material-ui/icons/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';

// style constant
const useStyles = makeStyles((theme) => ({
    flatCardBody: {
        '& >div': {
            padding: '0px !important'
        },
        '& svg': {
            width: '50px',
            height: '50px',
            color: theme.palette.secondary.main,
            borderRadius: '14px',
            padding: '10px',
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light
        }
    },
    flatCardBlock: {
        padding: '20px',
        borderLeft: '1px solid ',
        borderBottom: '1px solid ',
        borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    }
}));

// ===========================|| ANALYTICS DASHBOARD ||=========================== //

const Analytics = () => {
    const theme = useTheme();
    const classes = useStyles();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12} md={6}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        {/* <MarketShareAreaChartCard /> */}
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <RevenueCard
                            primary="Revenue"
                            secondary="$42,562"
                            content="$50,032 Last Month"
                            iconPrimary={MonetizationOnTwoToneIcon}
                            color={theme.palette.secondary.main}
                        />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <RevenueCard
                            primary="Orders Received"
                            secondary="486"
                            content="20% Increase"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.primary.main}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* <LatestCustomerTableCard title="Latest Customers" /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Analytics;
