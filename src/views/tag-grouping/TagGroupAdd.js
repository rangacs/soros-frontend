import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// services
import { tagGroupService } from '_services';

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
    tagGroupName: ''
    // rtaMasterID: '15',
    // massflowWeight: '1',
    // goodDataSecondsWeight: '1'
};

const TagGroupAdd = ({ open, handleCloseDialog, id, getData }) => {
    const classes = useStyles();

    const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);

    React.useEffect(() => {
        if (id) {
            tagGroupService
                .getById(id)
                .then((res) => {
                    if (res && res.data) {
                        const data = res.data;
                        setInitialValues((prevState) => ({
                            ...prevState,
                            tagGroupName: data.tagGroupName
                            // rtaMasterID: data.rtaMasterID,
                            // massflowWeight: data.massflowWeight,
                            // goodDataSecondsWeight: data.goodDataSecondsWeight
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
        tagGroupName: Yup.string().required('Required')
        // rtaMasterID: Yup.string().required('Required'),
        // massflowWeight: Yup.string().required('Required'),
        // goodDataSecondsWeight: Yup.string().required('Required')
    });

    const handleSubmit = (values) => {
        const formData = {
            ...values,
            rtaMasterID: '15',
            massflowWeight: '1',
            goodDataSecondsWeight: '1'
        };

        if (!id) {
            tagGroupService
                .create(formData)
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
            tagGroupService
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
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validation} onSubmit={handleSubmit}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle>{id ? 'Update Tag Group' : 'Add Tag Group'}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="tagGroupName"
                                        name="tagGroupName"
                                        label="Tag Group Name"
                                        value={formik.values.tagGroupName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.tagGroupName && Boolean(formik.errors.tagGroupName)}
                                        helperText={formik.touched.tagGroupName && formik.errors.tagGroupName}
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="rtaMasterID"
                                        name="rtaMasterID"
                                        label="RTA Master ID"
                                        defaultValue={15}
                                        value={formik.values.rtaMasterID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.rtaMasterID && Boolean(formik.errors.rtaMasterID)}
                                        helperText={formik.touched.rtaMasterID && formik.errors.rtaMasterID}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="massflowWeight"
                                        name="massflowWeight"
                                        label="Mass Flow Weight"
                                        value={formik.values.massflowWeight}
                                        defaultValue={1}
                                        onChange={formik.handleChange}
                                        error={formik.touched.massflowWeight && Boolean(formik.errors.massflowWeight)}
                                        helperText={formik.touched.massflowWeight && formik.errors.massflowWeight}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="goodDataSecondsWeight"
                                        name="goodDataSecondsWeight"
                                        label="Good Data Seconds Weight"
                                        value={formik.values.goodDataSecondsWeight}
                                        defaultValue={1}
                                        onChange={formik.handleChange}
                                        error={formik.touched.goodDataSecondsWeight && Boolean(formik.errors.goodDataSecondsWeight)}
                                        helperText={formik.touched.goodDataSecondsWeight && formik.errors.goodDataSecondsWeight}
                                    />
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

TagGroupAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    id: PropTypes.number,
    getData: PropTypes.func
};

export default React.memo(TagGroupAdd);
