import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import axiosBaseUrl from 'baseUrl/axiosBaseUrl';

// style constant
const useStyles = makeStyles((theme) => ({
    loginInput: {
        ...theme.typography.customInput
    }
}));

// ========================|| FIREBASE - FORGOT PASSWORD ||======================== //

const FirebaseForgotPassword = ({ ...others }) => {
    const classes = useStyles();
    const scriptedRef = useScriptRef();

    return (
        <Formik
            initialValues={{
                email: 'info@codedthemes.com',
                password: '123456',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    const { data } = await axiosBaseUrl.post('/auth/forgot-password', { email: values.email });
                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                    }
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
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
                        <InputLabel htmlFor="outlined-adornment-email-forgot">Email Address / Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-forgot"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Email Address / Username"
                            inputProps={{
                                classes: {
                                    notchedOutline: classes.notchedOutline
                                }
                            }}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email-forgot">
                                {' '}
                                {errors.email}{' '}
                            </FormHelperText>
                        )}
                    </FormControl>

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
                            mt: 2
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
                                style={{ color: 'white' }}
                            >
                                Send Mail
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default FirebaseForgotPassword;
