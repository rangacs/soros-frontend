import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { format, addHours } from 'date-fns';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Slide, TextField } from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// services
import { tagQueuedServices, tagCompletedServices, tagGroupService } from '_services';

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
    LocalendDate: format(new Date(), 'Y-MM-dd'),
    LocalendTime: format(addHours(new Date(), 1), 'HH:mm'),
    LocalstartDate: format(new Date(), 'Y-MM-dd'),
    LocalstartTime: format(new Date(), 'HH:mm'),
    tagID: '',
    tagGroupID: '',
    tagName: ''
};

const TagQueuedAdd = ({ open, handleCloseDialog, id, getData }) => {
    const classes = useStyles();

    const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);
    const [tagGroups, setTagGroups] = React.useState([]);

    React.useEffect(() => {
        tagGroupService
            .getAllTags()
            .then((res) => {
                if (res && res.data) {
                    const data = res.data;
                    setTagGroups(data);
                }
            })
            .catch((err) => {
                toast.error('Something went wrong!');
                console.log(err.response);
            });

        if (id) {
            tagQueuedServices
                .getAll(id)
                .then((res) => {
                    if (res) {
                        const data = res.data[0];
                        setInitialValues((prevState) => ({
                            ...prevState,
                            LocalendDate: format(new Date(data.LocalendTime), 'Y-MM-dd'),
                            LocalendTime: format(new Date(data.LocalendTime), 'HH:mm'),
                            LocalstartDate: format(new Date(data.LocalstartTime), 'Y-MM-dd'),
                            LocalstartTime: format(new Date(data.LocalstartTime), 'HH:mm'),
                            tagID: data.tagID,
                            tagGroupID: data.tagGroupID,
                            tagName: data.tagName
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
        LocalendDate: Yup.string().required('Required'),
        LocalendTime: Yup.string()
            .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:mm format')
            .required('Required'),
        LocalstartDate: Yup.string().required('Required'),
        LocalstartTime: Yup.string()
            .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:mm format')
            .required('Required'),
        tagName: Yup.string().required('Required'),
        tagGroupID: Yup.string().required('Required')
    });

    const handleSubmit = (values) => {
        const formData = {
            tagGroupID: values.tagGroupID,
            tagName: values.tagName,
            LocalstartTime: `${values.LocalstartDate} ${values.LocalstartTime}:00`,
            LocalendTime: `${values.LocalendDate} ${values.LocalendTime}:00`,
            rtaMasterID: '15',
            status: 'Queued'
        };

        if (!id) {
            tagCompletedServices
                .tagUniqueName(formData.tagName)
                .then((res) => {
                    console.log(res);

                    if (res.nameExits === 'no') {
                        tagQueuedServices
                            .create(formData)
                            .then((res) => {
                                if (res.message) {
                                    toast.success('Saved Successfully!');
                                    getData();
                                    handleCloseDialog();
                                }
                            })
                            .catch((err) => {
                                toast.error(err);
                                console.log(err);
                            });
                    } else {
                        toast.error(`Tag  name ${formData.tagName} already exists please chose different name`);
                    }
                })
                .catch((err) => {});
        } else {
            tagQueuedServices
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
                        <DialogTitle>{id ? 'Update' : 'Add'}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Select Tag Group *"
                                        fullWidth
                                        id="tagGroupID"
                                        name="tagGroupID"
                                        value={formik.values.tagGroupID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.tagGroupID && Boolean(formik.errors.tagGroupID)}
                                        helperText={formik.touched.tagGroupID && formik.errors.tagGroupID}
                                    >
                                        {tagGroups.map((tagGroup) => (
                                            <MenuItem value={tagGroup.tagGroupID}>{tagGroup.tagGroupName}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="tagName"
                                        name="tagName"
                                        label="Tag Name"
                                        value={formik.values.tagName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.tagName && Boolean(formik.errors.tagName)}
                                        helperText={formik.touched.tagName && formik.errors.tagName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        type="date"
                                        fullWidth
                                        id="LocalstartDate"
                                        name="LocalstartDate"
                                        label="Start Date"
                                        value={formik.values.LocalstartDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.LocalstartDate && Boolean(formik.errors.LocalstartDate)}
                                        helperText={formik.touched.LocalstartDate && formik.errors.LocalstartDate}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="LocalstartTime"
                                        name="LocalstartTime"
                                        label="Start Time"
                                        value={formik.values.LocalstartTime}
                                        onChange={formik.handleChange}
                                        error={formik.touched.LocalstartTime && Boolean(formik.errors.LocalstartTime)}
                                        helperText={formik.touched.LocalstartTime && formik.errors.LocalstartTime}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        type="date"
                                        fullWidth
                                        id="LocalendDate"
                                        name="LocalendDate"
                                        label="End Date"
                                        value={formik.values.LocalendDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.LocalendDate && Boolean(formik.errors.LocalendDate)}
                                        helperText={formik.touched.LocalendDate && formik.errors.LocalendDate}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        id="LocalendTime"
                                        name="LocalendTime"
                                        label="End Time"
                                        value={formik.values.LocalendTime}
                                        onChange={formik.handleChange}
                                        error={formik.touched.LocalendTime && Boolean(formik.errors.LocalendTime)}
                                        helperText={formik.touched.LocalendTime && formik.errors.LocalendTime}
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

TagQueuedAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    id: PropTypes.number,
    getData: PropTypes.func
};

export default React.memo(TagQueuedAdd);
