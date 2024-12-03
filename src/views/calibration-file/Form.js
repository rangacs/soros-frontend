import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import config from '../../config';

const baseURL = config.apiUrl;

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
    cal: '',
    offset: ''
};

const Form = ({ open, handleCloseDialog, id, getData }) => {
    const classes = useStyles();

    const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);

    React.useEffect(() => {
        if (id) {
            axios({
                url: `${baseURL}/calibration/view?id=${id}`,
                method: 'get'
            })
                .then((res) => {
                    if (res && res.data) {
                        const data = res.data[0];
                        setInitialValues((prevState) => ({
                            ...prevState,
                            cal: data.cal,
                            offset: data.offset
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
        cal: Yup.string().required('Required'),
        offset: Yup.string()
            .matches(/^(0|[1-9]\d*)(\.\d+)?$/, 'Only number allowed')
            .required('Required')
    });

    const handleSubmit = (values) => {
        let apiUrl;
        let method;

        if (!id) {
            apiUrl = '/calibration/create';
            method = 'post';
        } else {
            apiUrl = `/calibration/update?id=${id}`;
            method = 'put';
        }

        const formData = {
            ...values
        };

        axios({
            url: `${baseURL + apiUrl} `,
            method,
            data: formData
        })
            .then((res) => {
                if (res.data.message) {
                    toast.success('Saved Successfully!');
                    getData();
                    handleCloseDialog();
                }
            })
            .catch((err) => {
                toast.error('Something went wrong!');
                console.log(err.response);
            });
    };

    return (
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} className={classes.userAddDialog}>
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validation} onSubmit={handleSubmit}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle>{id ? 'Update Calibration' : 'Add Calibration'}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="cal"
                                        name="cal"
                                        label="Output Parameter"
                                        value={formik.values.cal}
                                        onChange={formik.handleChange}
                                        error={formik.touched.cal && Boolean(formik.errors.cal)}
                                        helperText={formik.touched.cal && formik.errors.cal}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="offset"
                                        name="offset"
                                        label="Offset"
                                        value={formik.values.offset}
                                        onChange={formik.handleChange}
                                        error={formik.touched.offset && Boolean(formik.errors.offset)}
                                        helperText={formik.touched.offset && formik.errors.offset}
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
