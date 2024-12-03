import PropTypes from 'prop-types';
import React from 'react';

import { styled } from '@material-ui/styles';
import { InputLabel as MuiInputLabel } from '@material-ui/core';

const BInputLabel = styled((props) => <MuiInputLabel {...props} />, { shouldForwardProp: (prop) => prop !== 'horizontal' })(
    ({ theme, horizontal }) => ({
        color: theme.palette.text.primary,
        fontWeight: 500,
        marginBottom: horizontal ? 0 : 8
    })
);

const InputLabel = ({ children, horizontal, ...others }) => (
    <BInputLabel horizontal={horizontal} {...others}>
        {children}
    </BInputLabel>
);

InputLabel.propTypes = {
    children: PropTypes.node,
    horizontal: PropTypes.bool
};

InputLabel.defaultProps = {
    horizontal: false
};

export default InputLabel;
