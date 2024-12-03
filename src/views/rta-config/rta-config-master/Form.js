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
import { rtaConfigMasterService } from '_services/rtaConfigMaster.service';

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
    accessLevel: '',
    detectorID: ''
};

const Form = ({ open, handleCloseDialog, id, getData }) => {
    const classes = useStyles();

    const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);

    React.useEffect(() => {
        if (id) {
            rtaConfigMasterService
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
        accessLevel: Yup.string().required('Required'),
        detectorID: Yup.string().required('Required')
    }); */

    const handleSubmit = (values) => {
        const formData = {
            ...values
        };

        if (!id) {
            rtaConfigMasterService
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
            rtaConfigMasterService
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
                                        id="DB_ID_string"
                                        name="DB_ID_string"
                                        label="DB ID string"
                                        value={formik.values.DB_ID_string}
                                        onChange={formik.handleChange}
                                        error={formik.touched.DB_ID_string && Boolean(formik.errors.DB_ID_string)}
                                        helperText={formik.touched.DB_ID_string && formik.errors.DB_ID_string}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="rtaConfigTable"
                                        name="rtaConfigTable"
                                        label="Rta Config Table"
                                        value={formik.values.rtaConfigTable}
                                        onChange={formik.handleChange}
                                        error={formik.touched.rtaConfigTable && Boolean(formik.errors.rtaConfigTable)}
                                        helperText={formik.touched.rtaConfigTable && formik.errors.rtaConfigTable}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="DBwriteActive"
                                        name="DBwriteActive"
                                        label="DBwriteActive"
                                        value={formik.values.DBwriteActive}
                                        onChange={formik.handleChange}
                                        error={formik.touched.DBwriteActive && Boolean(formik.errors.DBwriteActive)}
                                        helperText={formik.touched.DBwriteActive && formik.errors.DBwriteActive}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="data_type"
                                        name="data_type"
                                        label="Data Type"
                                        value={formik.values.data_type}
                                        onChange={formik.handleChange}
                                        error={formik.touched.data_type && Boolean(formik.errors.data_type)}
                                        helperText={formik.touched.data_type && formik.errors.data_type}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="accessLevel"
                                        name="accessLevel"
                                        label="Access Level"
                                        value={formik.values.accessLevel}
                                        onChange={formik.handleChange}
                                        error={formik.touched.accessLevel && Boolean(formik.errors.accessLevel)}
                                        helperText={formik.touched.accessLevel && formik.errors.accessLevel}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="write_frequency"
                                        name="write_frequency"
                                        label="Write Frequency"
                                        value={formik.values.write_frequency}
                                        onChange={formik.handleChange}
                                        error={formik.touched.write_frequency && Boolean(formik.errors.write_frequency)}
                                        helperText={formik.touched.write_frequency && formik.errors.write_frequency}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="DB_counter"
                                        name="DB_counter"
                                        label="DB counter"
                                        value={formik.values.DB_counter}
                                        onChange={formik.handleChange}
                                        error={formik.touched.DB_counter && Boolean(formik.errors.DB_counter)}
                                        helperText={formik.touched.DB_counter && formik.errors.DB_counter}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="timeConversionMassflowWeight"
                                        name="timeConversionMassflowWeight"
                                        label="Time Conversion MassflowWeight"
                                        value={formik.values.timeConversionMassflowWeight}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.timeConversionMassflowWeight &&
                                            Boolean(formik.errors.timeConversionMassflowWeight)
                                        }
                                        helperText={
                                            formik.touched.timeConversionMassflowWeight && formik.errors.timeConversionMassflowWeight
                                        }
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
