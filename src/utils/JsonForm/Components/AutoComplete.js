import React from 'react';
import { Autocomplete, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    container: {
        '& .css-oweljr-MuiAutocomplete-popper': {
            boxShadow: '0px 8px 10px -5px rgb(0 0 0 / 11%), 0px 16px 24px 2px rgb(0 0 0 / 0%), 0px 6px 30px 5px rgb(0 0 0 / 12%) !important'
        }
    }
});
const AutoComplete = ({ label, ...rest }) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                // sx={{ width: 300 }}
                {...rest}
                renderInput={(rest) => <TextField {...rest} label={label} />}
            />
        </div>
    );
};

export default AutoComplete;
