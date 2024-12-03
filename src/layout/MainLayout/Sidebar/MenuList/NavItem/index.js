import PropTypes from 'prop-types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import { Avatar, Chip, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@material-ui/core';
import ListItemButton from '@material-ui/core/ListItemButton';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';

// assets
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

// style constant
const useStyles = makeStyles((theme) => ({
    listIcon: {
        minWidth: '18px',
        marginTop: 'auto',
        marginBottom: 'auto',
        color: '#B5B5C3'
    },
    listCustomIconSub: {
        width: '6px',
        height: '6px'
    },
    listCustomIconSubActive: {
        width: '8px',
        height: '8px'
    },
    listItem: {
        alignItems: 'center',
        flexDirection: 'column',
        '&:hover': {
            backgroundColor: 'unset',
            '&> .MuiListItemIcon-root': {
                '&> svg': {
                    color: '#0aa9f8'
                }
            },
            '&> .MuiListItemText-root': {
                '&> p': {
                    color: '#0aa9f8'
                }
            }
        },
        '&.Mui-selected': {
            backgroundColor: 'unset',
            '&> .MuiListItemIcon-root': {
                '&> svg': {
                    color: '#0aa9f8'
                }
            },
            '&> .MuiListItemText-root': {
                '&> h5': {
                    color: '#0aa9f8'
                }
            },
            '&:hover': {
                backgroundColor: 'unset'
            }
        }
    },
    listItemNoBack: {
        backgroundColor: 'transparent !important',
        paddingTop: '8px',
        paddingBottom: '8px',
        alignItems: 'flex-start',
        flexDirection: 'column',
        '&:hover': {
            backgroundColor: 'unset'
        }
    },
    subMenuCaption: {
        ...theme.typography.subMenuCaption
    },
    TypographyColor: {
        color: '#a2a3b7',
        textAlign: 'center'
    },
    icon: {
        minWidth: '24px',
        '&> svg': {
            width: '1.5em',
            height: '1.5em',
            color: '#fff'
        }
    }
}));

// ===========================|| SIDEBAR MENU LIST ITEMS ||=========================== //

const NavItem = ({ item, level }) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const [locationChecker, setLocationChecker] = React.useState(false);

    const Icon = item.icon;
    const itemIcon = item.icon ? (
        <Icon stroke={1.5} size="1.3rem" className={classes.listCustomIcon} sx={{ color: '#009ADD' }} />
    ) : (
        <FiberManualRecordIcon
            className={
                customization.isOpen.findIndex((id) => id === item.id) > -1 ? classes.listCustomIconSubActive : classes.listCustomIconSub
            }
            fontSize={level > 0 ? 'inherit' : 'default'}
        />
    );

    let itemIconClass = !item.icon ? classes.listIcon : classes.menuIcon;
    itemIconClass = customization.navType === 'nav-dark' ? [itemIconClass, classes.listCustomIcon].join(' ') : itemIconClass;

    let itemTarget = '';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = { component: React.forwardRef((props, ref) => <Link {...props} to={item.url} ref={ref} />) };
    if (item.external) {
        listItemProps = { component: 'a', href: item.url };
    }

    const itemHandler = (itemId) => {
        dispatch({ type: MENU_OPEN, id: itemId });
        if (matchesSM) dispatch({ type: SET_MENU, opened: false });
    };
    const classNameCheckerHandler = () => {
        if (level > 1 && locationChecker) {
            return classes.listItemNoBack;
        }
        return classes.listItem;
    };
    React.useEffect(() => {
        console.log(location.pathname);
        if (location.pathname === '/home/default') {
            setLocationChecker(true);
        } else {
            setLocationChecker(false);
        }
    }, [location.pathname]);
    // active menu item on page load
    React.useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch({ type: MENU_OPEN, id: item.id });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            className={classNameCheckerHandler()}
            sx={{ borderRadius: `${customization.borderRadius}px` }}
            selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
            onClick={() => itemHandler(item.id)}
            target={itemTarget}
            style={{ padding: `10px ${level * 3}px` }}
        >
            <ListItemIcon className={`${itemIconClass} ${classes.icon}`}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography
                        className={classes.TypographyColor}
                        variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'}
                        color="inherit"
                    >
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
