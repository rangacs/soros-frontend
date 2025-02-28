import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Collapse, List, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import ListItemButton from '@material-ui/core/ListItemButton';
//  react-router-dom
import { useLocation } from 'react-router-dom';
// project imports
import NavItem from '../NavItem';

// assets
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';

// style constant
const useStyles = makeStyles((theme) => ({
    collapseIcon: {
        fontSize: '1rem',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    collapseIconSub: {
        fontSize: '1rem',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    menuIcon: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    listIcon: {
        minWidth: '18px',
        marginTop: 'auto',
        marginBottom: 'auto'
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
        alignItems: 'flex-start'
    },
    listItemNoBack: {
        marginBottom: '5px',
        backgroundColor: 'transparent !important',
        paddingTop: '8px',
        paddingBottom: '8px',
        alignItems: 'flex-start'
    },
    subMenuCaption: {
        ...theme.typography.subMenuCaption
    },
    collapseWrapper: {
        position: 'relative',
        '&:after': {
            content: "''",
            position: 'absolute',
            left: '32px',
            top: 0,
            height: '100%',
            width: '1px',
            opacity: theme.palette.mode === 'dark' ? 0.2 : 1,
            background: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.primary.light
        }
    }
}));

// ===========================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||=========================== //

const NavCollapse = ({ menu, level }) => {
    const classes = useStyles();
    const location = useLocation();
    const customization = useSelector((state) => state.customization);

    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);
    const [locationChecker, setLocationChecker] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
        setSelected(!selected ? menu.id : null);
    };
    const classNameCheckerHandler = () => {
        if (level > 1 && locationChecker) {
            return classes.listItemNoBack;
        }
        return classes.listItem;
    };
    React.useEffect(() => {
        // console.log(location.pathname);
        if (location.pathname === '/home/default') {
            setLocationChecker(true);
        } else {
            setLocationChecker(false);
        }
    }, [location.pathname]);
    // menu collapse & item
    const menus = menu.children.map((item) => {
        switch (item.type) {
            case 'collapse':
                return <NavCollapse key={item.id} menu={item} level={level + 1} />;
            case 'item':
                return <NavItem key={item.id} item={item} level={level + 1} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    const Icon = menu.icon;
    const menuIcon = menu.icon ? (
        <Icon stroke={1.5} size="1.3rem" className={classes.listCustomIcon} />
    ) : (
        <FiberManualRecordIcon
            className={selected === menu.id ? classes.listCustomIconSubActive : classes.listCustomIconSub}
            fontSize={level > 0 ? 'inherit' : 'default'}
        />
    );

    const menuIconClass = !menu.icon ? classes.listIcon : classes.menuIcon;

    return (
        <>
            <ListItemButton
                className={classNameCheckerHandler()}
                sx={{ borderRadius: `${customization.borderRadius}px` }}
                selected={selected === menu.id}
                onClick={handleClick}
                style={{ padding: `${level * 3}px` }}
            >
                <ListItemIcon className={menuIconClass}>{menuIcon}</ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant={selected === menu.id ? 'h5' : 'body1'} color="inherit" className={classes.listItemTypography}>
                            {menu.title}
                        </Typography>
                    }
                    secondary={
                        menu.caption && (
                            <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
                                {menu.caption}
                            </Typography>
                        )
                    }
                />
                {open ? (
                    <IconChevronUp stroke={1.5} size="1rem" className={level > 1 ? classes.collapseIconSub : classes.collapseIcon} />
                ) : (
                    <IconChevronDown stroke={1.5} size="1rem" className={level > 1 ? classes.collapseIconSub : classes.collapseIcon} />
                )}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={classes.collapseWrapper}>
                    {menus}
                </List>
            </Collapse>
        </>
    );
};

NavCollapse.propTypes = {
    menu: PropTypes.object,
    level: PropTypes.number
};

export default NavCollapse;
