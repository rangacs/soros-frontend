import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme, styled } from '@material-ui/styles';
import {
    Box,
    Avatar,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Switch,
    Button,
    Typography,
    lighten,
    ListItem,
    Hidden,
    Popover
} from '@material-ui/core';

import InboxTwoToneIcon from '@material-ui/icons/InboxTwoTone';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@material-ui/icons/AccountTreeTwoTone';
import { getStorageData } from 'utils/auth/auth';

const UserBoxButton = styled(Button)(
    ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);
const userData = getStorageData();

const MenuUserBox = styled(Box)(
    ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
    ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserName = styled(Typography)(
    ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
        text-align: left;
`
);

const UserBoxEmail = styled(Typography)(
    ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

const useStyles = makeStyles((theme) => ({
    UserBoxButtonStyle: {
        padding: '0px 8px'
    }
}));

const HeaderUserbox = ({ user }) => {
    const classes = useStyles();
    // const user = {
    //     name: 'Catherine Pike',
    //     avatar: '/static/images/avatars/2.jpg',
    //     jobtitle: 'Project Manager'
    // };#3FB0AC

    return (
        <>
            <UserBoxButton color="secondary" align="left" className={classes.UserBoxButtonStyle}>
                <Hidden mdDown>
                    <UserBoxText align="left">
                        <UserName variant="subtitle1 " align="left" style={{ color: '#EE4036' }}>
                            {userData.user.username}
                        </UserName>
                    </UserBoxText>
                </Hidden>
            </UserBoxButton>
        </>
    );
};
export default HeaderUserbox;
