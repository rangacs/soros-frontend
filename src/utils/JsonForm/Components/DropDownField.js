import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const DropDownField = (props) => (
    <FormControl fullWidth>
        {/* eslint-disable-next-line */}
        <InputLabel id="simple-select-label">{props.label}</InputLabel>
        <Select labelId="simple-select-label" id="simple-select" {...props}>
            {/* eslint-disable-next-line */}
            {props.dropDownItems.map((element, index) => (
                <MenuItem key={element + index} value={element}>
                    {element}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default DropDownField;
