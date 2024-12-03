import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */
import logo from 'assets/images/Logo_Sabia.png';

// ===========================|| LOGO SVG ||=========================== //

const Logo = () => {
    const theme = useTheme();

    return <img src={theme.palette.mode === 'dark' ? logo : logo} alt="Sabia Inc" width="60" />;
};

export default Logo;
