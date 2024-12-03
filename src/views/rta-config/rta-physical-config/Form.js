import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Slide, TextField } from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// services
import { rtaPhysicalConfigService } from '_services/rtaPhysicalConfig.service';

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

// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const DEFAULT_INITIAL_VALUES = {
    rtaMasterID: '',
    IPaddress: '',
    goodDataSecondsWeight_physicalCfg: '',
    massflowWeight_physicalCfg: '',
    analysis_timespan: '',
    averaging_subinterval_secs: '',
    detectorID: ''
};

const Form = ({ open, handleCloseDialog, id, getData }) => {
    const classes = useStyles();

    const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);

    React.useEffect(() => {
        if (id) {
            rtaPhysicalConfigService
                .getById(id)
                .then((res) => {
                    if (res) {
                        const data = res[0];
                        setInitialValues((prevState) => ({
                            ...data
                        }));
                    }
                })
                .catch((err) => {
                    toast.error('Something went wrong!');
                    console.log(err.response);
                });
        }
    }, [id]);

    /* const validation = Yup.object().shape({
        rtaMasterID: Yup.string().required('Required'),
        IPaddress: Yup.string().required('Required'),
        goodDataSecondsWeight_physicalCfg: Yup.string().required('Required'),
        massflowWeight_physicalCfg: Yup.string().required('Required'),
        analysis_timespan: Yup.string().required('Required'),
        averaging_subinterval_secs: Yup.string().required('Required'),
        detectorID: Yup.string().required('Required')
    }); */

    const handleSubmit = (values) => {
        const formData = {
            ...values
        };

        if (!id) {
            rtaPhysicalConfigService
                .save(formData)
                .then((res) => {
                    if (res.message) {
                        toast.success('Saved Successfully!');
                        getData();
                        handleCloseDialog();
                    }
                })
                .catch((err) => {
                    toast.error('Something went wrong!');
                    console.log(err.response);
                });
        } else {
            rtaPhysicalConfigService
                .update(id, formData)
                .then((res) => {
                    if (res.message) {
                        toast.success('Saved Successfully!');
                        getData();
                        handleCloseDialog();
                    }
                })
                .catch((err) => {
                    toast.error('Something went wrong!');
                    console.log(err.response);
                });
        }
    };

    return (
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} className={classes.userAddDialog}>
            <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle>{id ? 'Update Column' : 'Add Column'}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="rtaMasterID"
                                        name="rtaMasterID"
                                        label="Master Id"
                                        value={formik.values.rtaMasterID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.rtaMasterID && Boolean(formik.errors.rtaMasterID)}
                                        helperText={formik.touched.rtaMasterID && formik.errors.rtaMasterID}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="IPaddress"
                                        name="IPaddress"
                                        label="Ip Address"
                                        value={formik.values.IPaddress}
                                        onChange={formik.handleChange}
                                        error={formik.touched.IPaddress && Boolean(formik.errors.IPaddress)}
                                        helperText={formik.touched.IPaddress && formik.errors.IPaddress}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="goodDataSecondsWeight_physicalCfg"
                                        name="goodDataSecondsWeight_physicalCfg"
                                        label="Good Data Seconds Weight"
                                        value={formik.values.goodDataSecondsWeight_physicalCfg}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.goodDataSecondsWeight_physicalCfg &&
                                            Boolean(formik.errors.goodDataSecondsWeight_physicalCfg)
                                        }
                                        helperText={
                                            formik.touched.goodDataSecondsWeight_physicalCfg &&
                                            formik.errors.goodDataSecondsWeight_physicalCfg
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="massflowWeight_physicalCfg"
                                        name="massflowWeight_physicalCfg"
                                        label="Massflow Weight"
                                        value={formik.values.massflowWeight_physicalCfg}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.massflowWeight_physicalCfg && Boolean(formik.errors.massflowWeight_physicalCfg)
                                        }
                                        helperText={formik.touched.massflowWeight_physicalCfg && formik.errors.massflowWeight_physicalCfg}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="analysis_timespan"
                                        name="analysis_timespan"
                                        label="Analysis Timespan"
                                        value={formik.values.analysis_timespan}
                                        onChange={formik.handleChange}
                                        error={formik.touched.analysis_timespan && Boolean(formik.errors.analysis_timespan)}
                                        helperText={formik.touched.analysis_timespan && formik.errors.analysis_timespan}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="averaging_subinterval_secs"
                                        name="averaging_subinterval_secs"
                                        label="Averaging subinterval secs"
                                        value={formik.values.averaging_subinterval_secs}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.averaging_subinterval_secs && Boolean(formik.errors.averaging_subinterval_secs)
                                        }
                                        helperText={formik.touched.averaging_subinterval_secs && formik.errors.averaging_subinterval_secs}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="detectorID"
                                        name="detectorID"
                                        label="Detector ID"
                                        value={formik.values.detectorID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.detectorID && Boolean(formik.errors.detectorID)}
                                        helperText={formik.touched.detectorID && formik.errors.detectorID}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="text" color="error" onClick={handleCloseDialog}>
                                Cancel
                            </Button>
                            <AnimateButton>
                                <Button type="submit" variant="contained">
                                    {id ? 'Update' : 'Add'}
                                </Button>
                            </AnimateButton>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
};

Form.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    id: PropTypes.number,
    getData: PropTypes.func
};

export default React.memo(Form);
