import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
// import LoginForm from '../login/Login';
import LoginForm from '../login/JWTLogin';
import Logo from 'ui-component/Logo';

// assets
import AuthBlueCard from 'assets/images/auth/auth-blue-card.svg';
import AuthPurpleCard from 'assets/images/auth/auth-purple-card.svg';
import LoginBg from 'assets/images/Landing/sabia-homeslide-01.webp';
// style constant
const useStyles = makeStyles({
    authPurpleCard: {
        '&:after': {
            content: '""',
            position: 'absolute',
            top: '32%',
            left: '40%',
            width: '313px',
            backgroundSize: '380px',
            height: '280px',
            backgroundImage: `url(${AuthPurpleCard})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: '15s wings ease-in-out infinite'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            top: '23%',
            left: '37%',
            width: '243px',
            height: '210px',
            backgroundSize: '380px',
            backgroundImage: `url(${AuthBlueCard})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            animation: '15s wings ease-in-out infinite',
            animationDelay: '1s'
        }
    }
});
const styles = {
    paperContainer: {
        minHeight: '100vh',
        backgroundImage: `url(${LoginBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
    },
    smokeBg: {
        // backgroundImage: `url(http://localhost:3500/images/bg-white-lock.png) repeat`
    },
    whiteBg: { background: 'white' },
    pieColor: { color: '#ee4036' }
};

// ================================|| AUTH1 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AuthWrapper1>
            <Grid container justifyContent="center" alignItems="center" style={styles.paperContainer}>
                <Grid item container justifyContent="center" md={12} lg={12} sx={{ my: 3 }}>
                    <AuthCardWrapper style={styles.smokeBg}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                    alignItems={matchDownSM && 'center'}
                                    justifyContent={matchDownSM ? 'center' : 'space-between'}
                                >
                                    <Grid item>
                                        <Stack
                                            justifyContent={matchDownSM ? 'center' : 'flex-start'}
                                            textAlign={matchDownSM ? 'center' : ''}
                                        >
                                            <Typography style={styles.pieColor} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                                Sign In
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item sx={{ mb: { xs: 3, sm: 0 } }}>
                                        <RouterLink to="#">
                                            <Logo />
                                        </RouterLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <LoginForm loginIndex={1} />
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
