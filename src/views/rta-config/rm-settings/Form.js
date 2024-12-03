import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Slide, TextField } from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import config from '../../../config';
import { rmSettingsService } from '_services/rm-settings.services';

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
    category: '',
    varName: '',
    varKey: '',
    varValue: ''
};

const RmSettingsAdd = ({ open, handleCloseDialog, id, getData }) => {
    const classes = useStyles();

    const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);

    React.useEffect(() => {
        if (id) {
            rmSettingsService
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

    const validation = Yup.object().shape({
        category: Yup.string(),
        varName: Yup.string().required('Required'),
        varKey: Yup.string().required('Required'),
        varValue: Yup.string().required('Required')
    });
    const handleSubmit = (values) => {
        const formData = {
            ...values
        };

        if (!id) {
            rmSettingsService
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
            rmSettingsService
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

    // const handleSubmit = (values) => {
    //     let apiUrl;
    //     let method;

    //     if (!id) {
    //         apiUrl = '/rmsettings/create';
    //         method = 'post';
    //     } else {
    //         apiUrl = `/rmsettings/update?id=${id}`;
    //         method = 'post';
    //     }

    //     const formData = {
    //         category: values.category,
    //         varName: values.varName,
    //         varKey: values.varKey,
    //         varValue: values.varValue
    //     };

    //     axios({
    //         url: `${baseURL + apiUrl} `,
    //         method,
    //         data: formData
    //     })
    //         .then((res) => {
    //             if (res.data.message) {
    //                 toast.success('Saved Successfully!');
    //                 getData();
    //                 handleCloseDialog();
    //             }
    //         })
    //         .catch((err) => {
    //             toast.error('Something went wrong!');
    //             console.log(err.response);
    //         });
    // };

    return (
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} className={classes.userAddDialog}>
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validation} onSubmit={handleSubmit}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle>{id ? 'Update' : 'Add'}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3} sx={{ mt: 0.25 }}>
                                {/* <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Select Type *"
                                        fullWidth
                                        id="type"
                                        name="type"
                                        value={formik.values.type}
                                        onChange={formik.handleChange}
                                        error={formik.touched.type && Boolean(formik.errors.type)}
                                        helperText={formik.touched.type && formik.errors.type}
                                    >
                                        <MenuItem value="interval">Interval</MenuItem>
                                        <MenuItem value="tons">Tons</MenuItem>
                                    </TextField>
                                </Grid> */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="category"
                                        name="category"
                                        label="Category"
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        error={formik.touched.category && Boolean(formik.errors.category)}
                                        helperText={formik.touched.category && formik.errors.category}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="varName"
                                        name="varName"
                                        label="Name"
                                        value={formik.values.varName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.varName && Boolean(formik.errors.varName)}
                                        helperText={formik.touched.varName && formik.errors.varName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="varKey"
                                        name="varKey"
                                        label="Key"
                                        value={formik.values.varKey}
                                        onChange={formik.handleChange}
                                        error={formik.touched.varKey && Boolean(formik.errors.varKey)}
                                        helperText={formik.touched.varKey && formik.errors.varKey}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="varValue"
                                        name="varValue"
                                        label="Value"
                                        value={formik.values.varValue}
                                        onChange={formik.handleChange}
                                        error={formik.touched.varValue && Boolean(formik.errors.varValue)}
                                        helperText={formik.touched.varValue && formik.errors.varValue}
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

RmSettingsAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    id: PropTypes.number,
    getData: PropTypes.func
};

export default React.memo(RmSettingsAdd);
