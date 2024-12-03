import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { CardContent, Divider, List, ListItemIcon, ListItemText } from '@material-ui/core';
import ListItemButton from '@material-ui/core/ListItemButton';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

// style constant
const useStyles = makeStyles((theme) => ({
    incomingRequestsCard: {
        padding: '0px',
        paddingBottom: '0px !important'
    },
    textSuccess: {
        color: theme.palette.success.dark
    },
    textError: {
        color: theme.palette.error.main
    },
    ScrollHeight: {
        height: '370px',
        '& svg': {
            width: '32px',
            margin: '-6px 6px -6px -6px'
        }
    },
    coinText: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

// ===========================|| DASHBOARD ANALYTICS - TOTAL REVENUE CARD ||=========================== //

const TotalRevenueCard = ({ title }) => {
    const classes = useStyles();

    return (
        <MainCard title={title} content={false}>
            <CardContent className={classes.incomingRequestsCard}>
                <PerfectScrollbar className={classes.ScrollHeight}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropUpIcon className={classes.textSuccess} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Bitcoin</span>
                                        <span className={classes.textSuccess}>+ $145.85</span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropDownIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Ethereum</span>
                                        <span className={classes.textError}>- $6.368</span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropUpIcon className={classes.textSuccess} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Ripple</span>
                                        <span className={classes.textSuccess}>+ $458.63</span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropDownIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Neo</span>
                                        <span className={classes.textError}>- $5.631</span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropDownIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Ethereum</span>
                                        <span className={classes.textError}>- $6.368</span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropUpIcon className={classes.textSuccess} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Ripple</span>
                                        <span className={classes.textSuccess}>+ $458.63</span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropDownIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Neo</span>
                                        <span className={classes.textError}>- $5.631</span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropDownIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Ethereum</span>
                                        <span className={classes.textError}>- $6.368</span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropUpIcon className={classes.textSuccess} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Ripple</span>
                                        <span className={classes.textSuccess}>+ $458.63</span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowDropDownIcon className={classes.textError} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <div className={classes.coinText}>
                                        <span>Neo</span>
                                        <span className={classes.textError}>- $5.631</span>
                                    </div>
                                }
                            />
                        </ListItemButton>
                    </List>
                </PerfectScrollbar>
            </CardContent>
        </MainCard>
    );
};

TotalRevenueCard.propTypes = {
    title: PropTypes.string
};

export default TotalRevenueCard;
