import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.warning.light,
        marginTop: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            border: '19px solid ',
            borderColor: theme.palette.mode === 'dark' ? theme.palette.warning.main : theme.palette.warning.main,
            borderRadius: '50%',
            top: '65px',
            right: '-150px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            border: '3px solid ',
            borderColor: theme.palette.mode === 'dark' ? theme.palette.warning.main : theme.palette.warning.main,
            borderRadius: '50%',
            top: '145px',
            right: '-70px'
        }
    },
    tagLine: {
        color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : theme.palette.grey[900],
        opacity: theme.palette.mode === 'dark' ? 1 : 0.6
    },
    button: {
        color: theme.palette.grey[800],
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.warning.main : theme.palette.warning.main,
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.warning.dark
        }
    }
}));

// ===========================|| PROFILE MENU - UPGRADE PLAN CARD ||=========================== //

const UpgradePlanCard = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent />
        </Card>
    );
};

export default UpgradePlanCard;
