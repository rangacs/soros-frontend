/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// material-ui
import { makeStyles, styled } from '@material-ui/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    Slide,
    TextField,
    Switch,
    FormGroup,
    Stack,
    Typography
} from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// services
import { rtaSettingsService } from '_services/rtaSettings.service';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)'
        }
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff'
            }
        }
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200
        })
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box'
    }
}));

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
    varKey: '',
    varName: '',
    varValue: '',
    id: ''
};

const Form = ({ open, handleCloseDialog, id, getData }) => {
    const classes = useStyles();

    const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);

    React.useEffect(() => {
        if (id) {
            rtaSettingsService
                .getById(id)
                .then((res) => {
                    if (res) {
                        const data = res[0];
                        setInitialValues((prevState) => ({
                            ...prevState,
                            varKey: data.varKey,
                            varName: data.varName,
                            varValue: data.varValue,
                            id: data.id
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
        varValue: Yup.string().required('Required')
    });

    const handleSubmit = (values) => {
        const formData = { ...values };

        if (!id) {
            rtaSettingsService
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
            rtaSettingsService
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
                        <DialogTitle>{id ? 'Update Config' : 'Add Config'}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="value"
                                        name="varValue"
                                        label="Variable"
                                        value={formik.values.varName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.varName && Boolean(formik.errors.varName)}
                                        helperText={formik.touched.varName && formik.errors.varName}
                                    />
                                </Grid>
                                {initialValues.varKey === 'RUN_MODE' || initialValues.varKey === 'MATERIAL_TYPE' ? (
                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            label="Select Value *"
                                            fullWidth
                                            id="value"
                                            name="varValue"
                                            value={formik.values.varValue}
                                            onChange={formik.handleChange}
                                            error={formik.touched.varValue && Boolean(formik.errors.varValue)}
                                            helperText={formik.touched.varValue && formik.errors.varValue}
                                        >
                                            <MenuItem value="Automatic">Automatic</MenuItem>
                                            <MenuItem value="Dynamic">Dynamic</MenuItem>
                                        </TextField>
                                    </Grid>
                                ) : initialValues.varKey === 'MIN_TPH' ? (
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="value"
                                            name="varValue"
                                            label="Value"
                                            value={formik.values.varValue}
                                            onChange={formik.handleChange}
                                            error={formik.touched.varValue && Boolean(formik.errors.varValue)}
                                            helperText={formik.touched.varValue && formik.errors.varValue}
                                        />
                                    </Grid>
                                ) : initialValues.varKey === 'MASS_FLOW' || initialValues.varKey === 'GDS' ? (
                                    <Grid item xs={12}>
                                        <FormGroup>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography>Off</Typography>
                                                <AntSwitch
                                                    inputProps={{ 'aria-label': 'ant design' }}
                                                    name="varValue"
                                                    value={formik.values.varValue}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.varValue && Boolean(formik.errors.varValue)}
                                                    helperText={formik.touched.varValue && formik.errors.varValue}
                                                />
                                                <Typography>On</Typography>
                                            </Stack>
                                        </FormGroup>
                                    </Grid>
                                ) : (
                                    <></>
                                )}
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
    id: PropTypes.string,
    getData: PropTypes.func
};

export default React.memo(Form);
