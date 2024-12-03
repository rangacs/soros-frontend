import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import { Avatar, Box, ButtonBase, Button, useMediaQuery } from '@material-ui/core';

// assets
const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: '100%',
        minWidth: '200px',
        maxWidth: '280px',
        backgroundColor: 'theme.palette.background.paper',
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '250px'
        }
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        border: '1px solid',
        borderColor: '#fff',
        background: '#fff',
        color: theme.palette.primary.dark,
        transition: 'all .2s ease-in-out'
    },
    box: {
        marginLeft: '16px',
        color: theme.palette.primary.dark,
        [theme.breakpoints.down('sm')]: {
            marginLeft: '8px'
        }
    }
}));

// ===========================|| LOCALIZATION ||=========================== //

const LocalizationSection = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [role, setRole] = React.useState('');
    const anchorRef = React.useRef(null);
    const [clientName, setClientName] = React.useState('');
    const navigate = useNavigate();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <>
            {role === 'payrolladmin' && (
                <Box component="span" className={classes.box}>
                    <ButtonBase sx={{ borderRadius: '12px', border: '1px solid', borderColor: '#dfeef0', marginRight: '6px' }}>
                        <Button> {clientName} </Button>

                        <Avatar
                            variant="rounded"
                            className={classes.headerAvatar}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            color="inherit"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-caret-down"
                                width="44"
                                height="44"
                                viewBox="0 0 24 24"
                                strokeWidth="0.5"
                                stroke="#2c3e50"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M18 15l-6 -6l-6 6h12" transform="rotate(180 12 12)" />
                            </svg>
                        </Avatar>
                    </ButtonBase>
                </Box>
            )}
        </>
    );
};

export default LocalizationSection;
