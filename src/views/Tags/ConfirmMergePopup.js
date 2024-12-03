import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Slide,
    TextField,
    List,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import CheckBox from '@material-ui/icons/CheckBox';

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
                maxWidth: '650px',
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
    role: ''
};

const Form = ({ open, handleCloseDialog, selectedCompletedTags, selectedQueuedTags, setRefresh, onResetMerge, setQueuedList }) => {
    const classes = useStyles();

    const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        const getData = async () => {
            // eslint-disable-next-line prefer-const

            const systemURL = `${window.location.protocol}//${window.location.host}`;

            // systemURL.replace('3000', '80');
            // const host = systemURL.replace('82', '8081');

            const host = systemURL.replace('3000', '80');

            const baseURL = `${host}/${config.apiUrl}/`;
            const promises = [];
            // eslint-disable-next-line prefer-const
            let rows = [];

            selectedCompletedTags.forEach((id) => {
                const call = axios.get(`${baseURL}/tagcompleted/view?id=${id}`);
                promises.push(call);
            });

            selectedQueuedTags.forEach((id) => {
                const call = axios.get(`${baseURL}/tagqueued/view?id=${id}`);
                promises.push(call);
            });

            const res = await axios.all(promises);

            res.forEach((response) => {
                if (response && response.data) {
                    rows.push(response.data.data);
                }
            });

            setRows(rows);
        };
        getData();
    }, [selectedCompletedTags, selectedQueuedTags]);

    const validation = Yup.object().shape({
        role: Yup.string().required('Required')
    });

    const handleSubmit = (values) => {
        const formData = {
            queued: selectedQueuedTags,
            completed: selectedCompletedTags,
            mergeName: values.name
        };

        const systemURL = `${window.location.protocol}//${window.location.host}`;

        // systemURL.replace('3000', '80');
        // const host = systemURL.replace('82', '8081');

        const host = systemURL.replace('3000', '80');

        const baseURL = `${host}/${config.apiUrl}/`;
        console.log(`base url ${baseURL}`);
        axios({
            url: `${baseURL}/merge/merge`,
            method: 'post',
            data: formData
        })
            .then((res) => {
                if (res.data.data) {
                    toast.success(res.data.data);
                    handleCloseDialog();
                    setRefresh(true);
                    setTimeout(() => {
                        onResetMerge();
                    }, 1000);
                }
            })
            .catch((err) => {
                toast.error('Something went wrong!');
                console.log(err.response);
            });
    };

    return (
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} className={classes.userAddDialog}>
            <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle>Merge Tag</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="tagName"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
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
                                    Merge
                                </Button>
                            </AnimateButton>
                            {/* <button type="submit">Submit</button> */}
                        </DialogActions>
                    </form>
                )}
            </Formik>
            <Grid item xs={12} md={6} />
        </Dialog>
    );
};

Form.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default React.memo(Form);
