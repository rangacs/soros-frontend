import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getStorageData } from 'utils/auth/auth';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Avatar,
    Box,
    ButtonBase,
    Card,
    CardContent,
    Grid,
    InputAdornment,
    OutlinedInput,
    Popper,
    Button,
    ButtonGroup
} from '@material-ui/core';

import AnalyticsOutlined from '@material-ui/icons/AnalyticsOutlined';
import LandscapeSharp from '@material-ui/icons/LandscapeSharp';
import Settings from '@material-ui/icons/Settings';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';

// style constant
const useStyles = makeStyles((theme) => ({
    searchControl: {
        width: '434px',
        marginLeft: '16px',
        paddingRight: '16px',
        paddingLeft: '16px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important',
            height: '0.5em'
        },
        [theme.breakpoints.down('lg')]: {
            width: '250px'
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
        }
    },
    startAdornment: {
        fontSize: '1rem',
        color: theme.palette.grey[500]
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
        color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
        '&:hover': {
            background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
            color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
        },
        height: '30px',
        width: '30px'
    },
    closeAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.orange.light,
        color: theme.palette.orange.dark,
        '&:hover': {
            background: theme.palette.orange.dark,
            color: theme.palette.orange.light
        }
    },
    popperContainer: {
        zIndex: 1100,
        width: '99%',
        top: '-55px !important',
        padding: '0 12px',
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px'
        }
    },
    cardContent: {
        padding: '12px !important'
    },
    card: {
        background: theme.palette.mode === 'dark' ? theme.palette.dark[900] : '#fff',
        [theme.breakpoints.down('sm')]: {
            border: 0,
            boxShadow: 'none'
        }
    },
    buttonActive: {
        backgroundColor: 'rgba(10, 169, 248, 0.04)'
    }
}));

// ===========================|| SEARCH INPUT ||=========================== //

const SearchSection = () => {
    const classes = useStyles();
    const [value, setValue] = useState('');
    const location = useLocation();
    const { pathname } = location;
    const userData = getStorageData();

    return (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <>
                            <Box
                                sx={{
                                    ml: 2
                                }}
                            >
                                <ButtonBase sx={{ borderRadius: '12px' }}>
                                    <Avatar variant="rounded" className={classes.headerAvatar} {...bindToggle(popupState)}>
                                        <IconSearch stroke={1.5} size="1.2rem" />
                                    </Avatar>
                                </ButtonBase>
                            </Box>
                            <Popper {...bindPopper(popupState)} transition className={classes.popperContainer}>
                                {({ TransitionProps }) => (
                                    <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                                        <Card className={classes.card}>
                                            <CardContent className={classes.cardContent}>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item xs>
                                                        <OutlinedInput
                                                            className={classes.searchControl}
                                                            id="input-search-header"
                                                            value={value}
                                                            onChange={(e) => setValue(e.target.value)}
                                                            placeholder="Search"
                                                            startAdornment={
                                                                <InputAdornment position="start">
                                                                    <IconSearch
                                                                        stroke={1.5}
                                                                        size="1rem"
                                                                        className={classes.startAdornment}
                                                                    />
                                                                </InputAdornment>
                                                            }
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <ButtonBase sx={{ borderRadius: '12px' }}>
                                                                        <Avatar variant="rounded" className={classes.headerAvatar}>
                                                                            <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                                                                        </Avatar>
                                                                    </ButtonBase>
                                                                    <Box
                                                                        sx={{
                                                                            ml: 2
                                                                        }}
                                                                    >
                                                                        <ButtonBase sx={{ borderRadius: '12px' }}>
                                                                            <Avatar
                                                                                variant="rounded"
                                                                                className={classes.closeAvatar}
                                                                                {...bindToggle(popupState)}
                                                                            >
                                                                                <IconX stroke={1.5} size="1.3rem" />
                                                                            </Avatar>
                                                                        </ButtonBase>
                                                                    </Box>
                                                                </InputAdornment>
                                                            }
                                                            aria-describedby="search-helper-text"
                                                            inputProps={{
                                                                'aria-label': 'weight'
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Transitions>
                                )}
                            </Popper>
                        </>
                    )}
                </PopupState>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }} pl={2}>
                {userData && userData.user.role === 'admin' && (
                    <Button
                        variant="text"
                        endIcon={<AnalyticsOutlined />}
                        className={pathname.includes('analysis') ? classes.buttonActive : ''}
                    >
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            ANALYZER
                        </Link>
                    </Button>
                )}
                <Button variant="text" endIcon={<LandscapeSharp />} className={pathname.includes('soros') ? classes.buttonActive : ''}>
                    <Link to="soros" style={{ textDecoration: 'none', color: 'inherit' }}>
                        SOROS
                    </Link>
                </Button>
                {userData && userData.user.role === 'admin' && (
                    <Button variant="text" endIcon={<Settings />} className={pathname.includes('settings') ? classes.buttonActive : ''}>
                        <Link to="settings" style={{ textDecoration: 'none', color: 'inherit' }}>
                            CONFIGURATION
                        </Link>
                    </Button>
                )}
            </Box>
        </>
    );
};

export default SearchSection;
