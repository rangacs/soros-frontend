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
import { SetpointsService } from '_services';

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
    sp_name: '',
    sp_value_num: '',
    sp_tolerance_ulevel: '',
    sp_status: '',
    sp_priority: ''
};

const SetpointsAdd = ({ open, handleCloseDialog, id, getData }) => {
    const classes = useStyles();

    const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);

    React.useEffect(() => {
        if (id) {
            SetpointsService.getSetpointsById(id)
                .then((res) => {
                    if (res) {
                        const data = res[0];
                        setInitialValues((prevState) => ({
                            ...prevState,
                            sp_name: data.sp_name,
                            sp_value_num: data.sp_value_num,
                            sp_tolerance_ulevel: data.sp_tolerance_ulevel,
                            sp_status: data.sp_status,
                            sp_priority: data.sp_priority
                        }));
                    }
                })
                .catch((err) => {
                    toast.error('Something went wrong!');
                    console.log(err.response);
                });
        }
    }, [id]);

    const validation = Yup.object().shape({
        sp_name: Yup.string().required('Required'),
        sp_value_num: Yup.number().required('Required'),
        sp_tolerance_ulevel: Yup.number().required('Required')
    });

    const handleSubmit = (values) => {
        if (!id) {
            SetpointsService.saveSetpoints(values)
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
            SetpointsService.updateSetpoints(id, values)
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
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validation} onSubmit={handleSubmit}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle>{id ? 'Update Setpoint' : 'Add Setpoint'}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        id="sp_name"
                                        name="sp_name"
                                        label="Sp Name"
                                        value={formik.values.sp_name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.sp_name && Boolean(formik.errors.sp_name)}
                                        helperText={formik.touched.sp_name && formik.errors.sp_name}
                                    >
                                        <MenuItem value="SiO2">SiO2</MenuItem>
                                        <MenuItem value="Al2O3">Al2O3</MenuItem>
                                        <MenuItem value="Fe2O3">Fe2O3</MenuItem>
                                        <MenuItem value="CaO">CaO</MenuItem>
                                        <MenuItem value="MgO">MgO</MenuItem>
                                        <MenuItem value="SO3">SO3</MenuItem>
                                        <MenuItem value="K2O">K2O</MenuItem>
                                        <MenuItem value="CL">CL</MenuItem>
                                        <MenuItem value="P2O5">P2O5</MenuItem>
                                        <MenuItem value="TiO2">TiO2</MenuItem>
                                        <MenuItem value="SM">SM</MenuItem>
                                        <MenuItem value="AM">AM</MenuItem>
                                        <MenuItem value="LSF">LSF</MenuItem>
                                        <MenuItem value="TPH">TPH</MenuItem>
                                        <MenuItem value="tons">tons</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="sp_value_num"
                                        name="sp_value_num"
                                        label="Sp Value "
                                        value={formik.values.sp_value_num}
                                        onChange={formik.handleChange}
                                        error={formik.touched.sp_value_num && Boolean(formik.errors.sp_value_num)}
                                        helperText={formik.touched.sp_value_num && formik.errors.sp_value_num}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="sp_tolerance_ulevel"
                                        name="sp_tolerance_ulevel"
                                        label="Sp Tolerance"
                                        value={formik.values.sp_tolerance_ulevel}
                                        onChange={formik.handleChange}
                                        error={formik.touched.sp_tolerance_ulevel && Boolean(formik.errors.sp_tolerance_ulevel)}
                                        helperText={formik.touched.sp_tolerance_ulevel && formik.errors.sp_tolerance_ulevel}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Sp Status *"
                                        fullWidth
                                        id="sp_status"
                                        name="sp_status"
                                        value={formik.values.sp_status}
                                        onChange={formik.handleChange}
                                        error={formik.touched.sp_status && Boolean(formik.errors.sp_status)}
                                        helperText={formik.touched.sp_status && formik.errors.sp_status}
                                    >
                                        <MenuItem value="1">On</MenuItem>
                                        <MenuItem value="0">Off</MenuItem>
                                    </TextField>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Sp Priority *"
                                        fullWidth
                                        id="sp_priority"
                                        name="sp_priority"
                                        value={formik.values.sp_priority}
                                        onChange={formik.handleChange}
                                        error={formik.touched.sp_priority && Boolean(formik.errors.sp_priority)}
                                        helperText={formik.touched.sp_priority && formik.errors.sp_priority}
                                    >
                                        <MenuItem value="1">1</MenuItem>
                                        <MenuItem value="2">2</MenuItem>
                                        <MenuItem value="3">3</MenuItem>
                                        <MenuItem value="4">4</MenuItem>
                                        <MenuItem value="5">5</MenuItem>
                                    </TextField>
                                </Grid> */}
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

SetpointsAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    id: PropTypes.number,
    getData: PropTypes.func
};

export default React.memo(SetpointsAdd);
