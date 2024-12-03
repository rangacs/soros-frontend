import React, { useEffect } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

// project imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import MainCard from 'ui-component/cards/MainCard';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// services
import { UserGroupsService } from '_services';

// style constant
const useStyles = makeStyles((theme) => ({
    loginInput: {
        ...theme.typography.customInput
    }
}));

// ========================|| FIREBASE - RESET PASSWORD ||======================== //

const FirebaseResetPassword = ({ ...others }) => {
    const classes = useStyles();
    const scriptedRef = useScriptRef();
    const [showPassword, setShowPassword] = React.useState(false);
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    return (
        <Grid container>
            <Grid item lg={4} spacing={3}>
                &nbsp;
            </Grid>
            <Grid item lg={4} spacing={3}>
                <MainCard style={{ padding: 0 }} title="Reset Password" darkTitle>
                    <Formik
                        initialValues={{
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            currentPassword: Yup.string().max(255).required('Old Password is required'),
                            newPassword: Yup.string().max(255).required('New Password is required'),
                            confirmPassword: Yup.string().when('password', {
                                is: (val) => val && val.length > 0,
                                then: Yup.string().oneOf([Yup.ref('password')], 'Both Password must be match!')
                            })
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                // TODO send id -----const id = JSON.parse(localStorage.getItem('tokenData'));
                                UserGroupsService.changePassword({ ...values })
                                    .then((response) => {
                                        console.log(response);
                                        if (scriptedRef.current) {
                                            setStatus({ success: true });
                                            setSubmitting(false);
                                        }
                                        toast.success('Password changed!');
                                    })
                                    .catch((err) => {
                                        if (err.status === 400) {
                                            toast.error(err.message);
                                        } else {
                                            toast.error('Something went wrong!');
                                        }
                                        console.log(err);
                                    });
                            } catch (err) {
                                console.error(err);
                                if (scriptedRef.current) {
                                    setStatus({ success: false });
                                    setErrors({ submit: err.message });
                                    setSubmitting(false);
                                }
                            }
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} {...others}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.currentPassword && errors.currentPassword)}
                                    className={classes.loginInput}
                                >
                                    <InputLabel htmlFor="outlined-adornment-confirm-password">Current Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-confirm-password"
                                        type="password"
                                        value={values.currentPassword}
                                        name="currentPassword"
                                        label="Confirm Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{
                                            classes: {
                                                notchedOutline: classes.notchedOutline
                                            }
                                        }}
                                    />
                                </FormControl>

                                {touched.currentPassword && errors.currentPassword && (
                                    <FormControl fullWidth>
                                        <FormHelperText error id="standard-weight-helper-text-confirm-password">
                                            {' '}
                                            {errors.currentPassword}{' '}
                                        </FormHelperText>
                                    </FormControl>
                                )}

                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.newPassword && errors.newPassword)}
                                    className={classes.loginInput}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password-reset">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-reset"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.newPassword}
                                        name="newPassword"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
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
                                        inputProps={{
                                            classes: {
                                                notchedOutline: classes.notchedOutline
                                            }
                                        }}
                                    />
                                </FormControl>
                                {touched.newPassword && errors.newPassword && (
                                    <FormControl fullWidth>
                                        <FormHelperText error id="standard-weight-helper-text-reset">
                                            {' '}
                                            {errors.newPassword}{' '}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                                {strength !== 0 && (
                                    <FormControl fullWidth>
                                        <Box
                                            sx={{
                                                mb: 2
                                            }}
                                        >
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Box
                                                        backgroundColor={level.color}
                                                        sx={{
                                                            width: 85,
                                                            height: 8,
                                                            borderRadius: '7px'
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                                        {level.label}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </FormControl>
                                )}

                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                    className={classes.loginInput}
                                >
                                    <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-confirm-password"
                                        type="password"
                                        value={values.confirmPassword}
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{
                                            classes: {
                                                notchedOutline: classes.notchedOutline
                                            }
                                        }}
                                    />
                                </FormControl>

                                {touched.confirmPassword && errors.confirmPassword && (
                                    <FormControl fullWidth>
                                        <FormHelperText error id="standard-weight-helper-text-confirm-password">
                                            {' '}
                                            {errors.confirmPassword}{' '}
                                        </FormHelperText>
                                    </FormControl>
                                )}

                                {errors.submit && (
                                    <Box
                                        sx={{
                                            mt: 3
                                        }}
                                    >
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Box>
                                )}
                                <Box
                                    sx={{
                                        mt: 1
                                    }}
                                >
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Reset Password
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default FirebaseResetPassword;
