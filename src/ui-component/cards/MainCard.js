import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';
import { Card, CardContent, CardHeader, Divider, Typography, CardActions, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// constant
const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 }
};

// ===========================|| CUSTOM MAIN CARD ||=========================== //

const MainCard = React.forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass,
            contentSX,
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            value,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();
        const darkShadow = theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)';
        const shadowConfig = shadow && boxShadow ? shadow : darkShadow;

        return (
            <Card
                ref={ref}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75,
                    ':hover': {
                        boxShadow: boxShadow ? shadowConfig : 'inherit'
                    },
                    ...sx
                }}
            >
                {/* card header and action */}
                {!darkTitle && title && (
                    <Grid container justifyContent="space-between" alignItems="center" style={{ paddingLeft: '1rem' }} spacing={2}>
                        <CardHeader sx={headerSX} title={title} action={secondary} />
                        <CardActions>
                            <Grid container diretion="row" justifyContent="flex-end" alignItems="flex-start">
                                <IconButton variant="outlined" component="span" onClick={value} name="submit" type="submit">
                                    <ArrowBackIcon />
                                </IconButton>
                            </Grid>
                        </CardActions>
                    </Grid>
                )}
                {darkTitle && title && (
                    <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
                )}

                {/* content & header divider */}
                {title && <Divider />}

                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

MainCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
