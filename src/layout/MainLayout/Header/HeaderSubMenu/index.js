import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/styles';
import { Button, Chip, Popper, CardContent, ClickAwayListener, Grid, TextField, Paper, Typography } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

import { SITE_SETTINGS, DATE_INTERVAL, HISTORICAL_DATA, DISABLE_REFRESH_INTERVAL } from 'store/actions';

// project imports
import { settingsServices } from '_services';

import { format } from 'date-fns';

const useStyles = makeStyles(() => ({
    headerSubMenu: {
        marginLeft: '130px',
        padding: '5px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid #EFF2F5',
        boxShadow: '0px 10px 30px 0px rgb(82 63 105 / 5%)'
    },
    button: {
        margin: '0 3px',
        padding: '3px 8px',
        backgroundColor: '#F5F8FA',
        color: '#009EF7',
        '&:hover': {
            color: '#fff'
        }
    },
    chip: {
        borderRadius: '5px',
        border: 'unset',
        backgroundColor: '#F5F8FA',
        color: '#009EF7',
        '&:hover': {
            color: '#e8eaf6',
            background: '#2fb7fc !important'
        },
        margin: '0 3px'
    }
}));

const HeaderSubMenu = () => {
    const commonData = useSelector((state) => state.commanReducer);
    const { rangeStart, rangeEnd } = commonData;
    const classes = useStyles();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const [startDate, setStartDate] = useState(rangeStart);
    const [endDate, setEndDate] = useState(rangeEnd);
    const [siteSettings, setSiteSettings] = useState({});
    const [startTime, setStartTime] = useState(format(rangeStart, 'HH:mm'));
    const [endTime, setEndTime] = useState(format(rangeEnd, 'HH:mm'));

    const handleToggle = () => setOpen((prevOpen) => !prevOpen);
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const enableLiveData = () => {
        dispatch({
            type: HISTORICAL_DATA,
            historicalData: 'no'
        });
        const endDate = new Date();
        const startDate = new Date();
        startDate.setHours(startDate.getHours() - 8);
        dispatch({
            type: DATE_INTERVAL,
            rangeStart: new Date(startDate),
            rangeEnd: new Date(endDate)
        });
        dispatch({ type: DISABLE_REFRESH_INTERVAL, deactivateRefresh: false });
    };

    const prevOpen = useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    React.useEffect(() => {
        settingsServices
            .getAll()
            .then(({ data: settings }) => {
                setSiteSettings(settings);
                dispatch({ type: SITE_SETTINGS, siteSettings: settings });
                dispatch({
                    type: DATE_INTERVAL,
                    rangeStart: '200',
                    rangeEnd: '300'
                });
                // dispatch({ type: LOGGED_USER, payload: { loggedUser: user } });
            })
            .catch((err) => {
                console.log(JSON.stringify(err));
            });
    }, []);
    const handleDateRange = () => {
        if (!/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(startTime)) {
            toast.error('Start time must be in HH:mm format');
            return;
        }

        if (!/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(endTime)) {
            toast.error('End time must be HH:mm format');
            return;
        }

        let fromDate = new Date(startDate).getTime();
        let toDate = new Date(endDate).getTime();

        if (toDate < fromDate) {
            toast.error('Start Date must greater than End Date');
            return;
        }

        fromDate = `${format(startDate, 'Y-MM-d')} ${startTime}`;
        toDate = `${format(endDate, 'Y-MM-d')} ${endTime}`;

        dispatch({
            type: DATE_INTERVAL,
            rangeStart: new Date(fromDate),
            rangeEnd: new Date(toDate)
        });
        dispatch({
            type: HISTORICAL_DATA,
            historicalStart: new Date(fromDate),
            historicalEnd: new Date(toDate),
            historicalData: 'yes'
        });
        dispatch({ type: DISABLE_REFRESH_INTERVAL, deactivateRefresh: true });
        handleToggle();
    };

    return (
        <div
            className={classes.headerSubMenu}
            style={{ display: pathname.includes('analysis/dash') || pathname.includes('soros/plot') ? '' : 'none' }}
        >
            <div style={{ margin: 'auto 0' }}>
                <span
                    style={{
                        margin: 'auto 0',
                        display: pathname.includes('analysis/dash') || pathname.includes('soros/plot') ? 'block' : 'none'
                    }}
                >
                    <Typography variant="subtitle1" component="p">
                        Showing Analysis Results From
                        <Chip label={format(rangeStart, 'Y-MM-d HH:mm')} /> {' - '}
                        <Chip label={format(rangeEnd, 'Y-MM-d HH:mm')} />
                    </Typography>
                </span>
            </div>
            <div>
                <span
                    style={{
                        margin: 'auto 0',
                        display: pathname.includes('analysis/dash') || pathname.includes('soros/plot') ? 'block' : 'none'
                    }}
                >
                    <Chip
                        classes={{ label: classes.profileLabel }}
                        className={`${classes.profileChip} ${classes.chip}`}
                        label="Interval"
                        variant="outlined"
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="primary"
                    />
                    <Chip
                        classes={{ label: classes.profileLabel }}
                        className={`${classes.profileChip} ${classes.chip}`}
                        label="Live Data"
                        variant="outlined"
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={enableLiveData}
                        color="error"
                    />
                    <Popper
                        placement="bottom-end"
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                        popperOptions={{
                            modifiers: [
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, 14]
                                    }
                                }
                            ]
                        }}
                        style={{ zIndex: '1' }}
                    >
                        {({ TransitionProps }) => (
                            <Transitions position="top-right" in={open} {...TransitionProps}>
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                            <CardContent className={classes.cardContent}>
                                                <Grid container direction="column" spacing={0}>
                                                    <Grid item className={classes.flex}>
                                                        <Typography component="span" variant="h4" className={classes.name}>
                                                            Date Range
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <br />
                                                            <div style={{ display: 'flex' }}>
                                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                                    <DatePicker
                                                                        renderInput={(props) => <TextField {...props} />}
                                                                        label="Start Time"
                                                                        value={startDate}
                                                                        onChange={(newValue) => {
                                                                            setStartDate(newValue);
                                                                        }}
                                                                    />
                                                                </LocalizationProvider>
                                                                <input
                                                                    type="text"
                                                                    value={startTime}
                                                                    onChange={(e) => setStartTime(e.target.value)}
                                                                    // style={{ width: '50px' }}
                                                                />
                                                            </div>
                                                            <br />
                                                            <div style={{ display: 'flex' }}>
                                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                                    <DatePicker
                                                                        renderInput={(props) => <TextField {...props} />}
                                                                        label="End Time"
                                                                        value={endDate}
                                                                        onChange={(newValue) => {
                                                                            setEndDate(newValue);
                                                                        }}
                                                                    />
                                                                </LocalizationProvider>
                                                                <input
                                                                    type="text"
                                                                    value={endTime}
                                                                    onChange={(e) => setEndTime(e.target.value)}
                                                                    // style={{ width: '50px' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <Button onClick={handleDateRange} style={{ float: 'right' }}>
                                                            Submit
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </MainCard>
                                    </ClickAwayListener>
                                </Paper>
                            </Transitions>
                        )}
                    </Popper>
                </span>
            </div>
        </div>
    );
};

export default HeaderSubMenu;
