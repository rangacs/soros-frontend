import React from 'react';

//  Date Imports
import { LocalizationProvider } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';
import { TextField } from '@material-ui/core';
// import { useFormikContext, useField } from 'formik';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    container: {
        '& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root': {
            display: 'flex !important'
        }
    }
});
const DateField = (props) => {
    const classes = useStyles();
    const { future, name, helper, dateFlag } = props;
    if (name === 'Date of Joining') {
        return (
            <div className={classes.container}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        fullWidth
                        inputFormat="dd/MM/yyyy"
                        // value={registeredDate}
                        disableFuture
                        {...props}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
        );
    }
    if (future) {
        return (
            <div className={classes.container}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        fullWidth
                        inputFormat="dd/MM/yyyy"
                        // value={registeredDate}
                        disableFuture
                        {...props}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
        );
        // eslint-disable-next-line no-else-return
    } else {
        return (
            <div className={classes.container}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        fullWidth
                        inputFormat="dd/MM/yyyy"
                        // value={registeredDate}
                        {...props}
                        renderInput={(params) => <TextField {...params} helperText={dateFlag && helper} />}
                    />
                </LocalizationProvider>
            </div>
        );
    }
};

export default DateField;
