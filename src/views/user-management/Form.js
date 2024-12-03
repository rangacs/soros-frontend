import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// material-ui
import { makeStyles } from '@material-ui/styles';
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
    InputAdornment,
    IconButton,
    OutlinedInput,
    InputLabel
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// services
import { UserGroupsService, RoleService } from '_services';

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
    customInputLabel: {
        visibility: 'visible'
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
    },
    passwordInput: {
        visibility: 'visible'
    }
}));

// animation
const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const DEFAULT_INITIAL_VALUES = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    role: ''
};

const Form = ({ open, handleCloseDialog, id, getData }) => {
    const classes = useStyles();

    const [initialValues, setInitialValues] = React.useState(DEFAULT_INITIAL_VALUES);
    const [roles, setRoles] = React.useState([]);
    const [showPassword, setShowPassword] = React.useState(false);

    React.useEffect(() => {
        if (id) {
            UserGroupsService.getUserById(id)
                .then((res) => {
                    if (res && res.data) {
                        const data = res.data[0];
                        setInitialValues((prevState) => ({
                            ...prevState,
                            fullname: data.fullname,
                            username: data.username,
                            email: data.email,
                            role: data.role
                        }));
                    }
                })
                .catch((err) => {
                    toast.error('Something went wrong!');
                    console.log(err.response);
                });
        }
    }, [id]);

    React.useEffect(() => {
        RoleService.getAllRole()
            .then((res) => {
                if (res && res.data) {
                    const data = res.data;
                    setRoles(data);
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    // eslint-disable-next-line prefer-const
    let validationSchima = {
        username: Yup.string().required('Required'),
        password: Yup.string(),
        email: Yup.string().email().required('Required'),
        role: Yup.string().required('Required')
    };
    if (!id !== '0') {
        validationSchima.password = Yup.string().required('Required');
        validationSchima.confirmPassword = Yup.string()
            .when('password', {
                is: (val) => val && val.length > 0,
                then: Yup.string().oneOf([Yup.ref('password')], 'Both Password must match!')
            })
            .required('This field is required');
    }

    const validation = Yup.object().shape(validationSchima);

    const handleSubmit = (values) => {
        if (!id) {
            UserGroupsService.saveUser(values)
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
            UserGroupsService.updateUser(id, values)
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} className={classes.userAddDialog}>
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validation} onSubmit={handleSubmit}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle>{id ? 'Update User' : 'Add User'}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3} sx={{ mt: 0.25 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="fullname"
                                        name="fullname"
                                        label="Name"
                                        value={formik.values.fullname}
                                        onChange={formik.handleChange}
                                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                                        helperText={formik.touched.fullname && formik.errors.fullname}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="username"
                                        name="username"
                                        label="User Name"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        error={formik.touched.username && Boolean(formik.errors.username)}
                                        helperText={formik.touched.username && formik.errors.username}
                                        inputProps={{
                                            autocomplete: 'username',
                                            form: {
                                                autocomplete: 'off'
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        inputProps={{
                                            autocomplete: 'email',
                                            form: {
                                                autocomplete: 'off'
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} variant="outlined">
                                    <div style={{ display: 'flex' }}>
                                        <TextField
                                            fullWidth
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                            inputProps={{
                                                autocomplete: 'password',
                                                form: {
                                                    autocomplete: 'off'
                                                }
                                            }}
                                        />
                                        <InputAdornment position="end" style={{ margin: 'auto 0' }}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    </div>
                                    {/* <OutlinedInput
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        className="passwordInput"
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    /> */}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="confirmPassword"
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        label="Role"
                                        fullWidth
                                        id="role"
                                        name="role"
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                        error={formik.touched.role && Boolean(formik.errors.role)}
                                        helperText={formik.touched.role && formik.errors.role}
                                    >
                                        {roles.map((role) => (
                                            <MenuItem value={role.role} key={role.role}>
                                                {role.role}
                                            </MenuItem>
                                        ))}
                                    </TextField>
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
