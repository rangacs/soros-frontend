import React from 'react';
import { TextField } from '@material-ui/core';

const TextFieldElement = (props) => {
    const { name } = props;
    if (name === 'Employee Name') {
        return (
            <div>
                {' '}
                <TextField
                    fullWidth
                    id="outlined-basic"
                    variant="outlined"
                    {...props}
                    autoComplete="off"
                    InputProps={{
                        readOnly: true
                    }}
                />
            </div>
        );
        // eslint-disable-next-line no-else-return
    } else {
        return (
            <div>
                <TextField fullWidth id="outlined-basic" variant="outlined" {...props} autoComplete="off" />
            </div>
        );
    }
};
export default TextFieldElement;
