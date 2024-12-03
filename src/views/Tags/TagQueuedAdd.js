import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Slide, TextField } from '@material-ui/core';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

// style constant
const useStyles = makeStyles((theme) => ({
    userAddDialog: {
        '&>div:nth-child(3)': {
            justifyContent: 'flex-end',
            '&>div': {
                margin: '0px',
                borderRadius: '0px',
                maxWidth: '450px',
                maxHeight: '100%'
            }
        }
    },
    fileInput: {
        display: 'none'
    },
    fileContainer: {
        background: theme.palette.background.default,
        padding: '30px 0',
        textAlign: 'center',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '24px',
        '& > svg': {
            verticalAlign: 'sub',
            marginRight: '5px'
        }
    },
    uploadImage: {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '55px',
        height: '55px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
        '& > svg': {
            verticalAlign: 'sub',
            marginRight: '5px'
        }
    },
    productProgress: {
        position: 'absolute',
        left: '0',
        top: '0',
        background: 'rgba(255, 255, 255, .8)',
        width: '100% !important',
        height: '100% !important',
        padding: '12px'
    }
}));

// product category options
const tagGroups = [
    {
        value: '1',
        label: 'Stock Pile'
    },
    {
        value: '2',
        label: 'April Tag Group'
    },
    {
        value: '3',
        label: 'March Tag Group'
    }
];

// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

// ===========================|| PRODUCT ADD DIALOG ||=========================== //

const ProductAdd = ({ open, handleCloseDialog }) => {
    const classes = useStyles();

    // handle category change dropdown
    const [currency, setCurrency] = React.useState('2');
    const handleSelectChange = (event) => {
        setCurrency(event.target.value);
    };
    // set image upload progress
    const [progress, setProgress] = React.useState(0);
    const progressRef = React.useRef(() => {});
    React.useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
            } else {
                const diff = Math.random() * 10;
                setProgress(progress + diff);
            }
        };
    });

    React.useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} className={classes.userAddDialog}>
            <DialogTitle>Add Tag</DialogTitle>
            <DialogContent>
                <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic1" fullWidth label="Enter Tag Name*" defaultValue="" />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="standard-select-currency"
                            select
                            label="Select Tag Group*"
                            value={currency}
                            fullWidth
                            onChange={handleSelectChange}
                            helperText="Please select Tag Group"
                        >
                            {tagGroups.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic3" fullWidth label="Start Time*" defaultValue="2022-05-09 13:00:00" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic4" fullWidth label="End Time*" defaultValue="2022-05-09 14:00:00" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <AnimateButton>
                    <Button variant="contained">Save</Button>
                </AnimateButton>
                <Button variant="text" color="error" onClick={handleCloseDialog}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ProductAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default ProductAdd;
