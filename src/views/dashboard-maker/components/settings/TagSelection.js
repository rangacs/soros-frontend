import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { TextField, Grid, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { IconTrash } from '@tabler/icons';

const ELEMENTS = [
    { title: 'SiO2', value: 'SiO2' },
    { title: 'Al2O3', value: 'Al2O3' },
    { title: 'Fe2O3', value: 'Fe2O3' },
    { title: 'CaO', value: 'CaO' },
    { title: 'MgO', value: 'MgO' },
    { title: 'SO3', value: 'SO3' },
    { title: 'Na2O', value: 'Na2O' },
    { title: 'LSF', value: 'LSF' },
    { title: 'SM', value: 'SM' },
    { title: 'K2O', value: 'K2O' },
    { title: 'Cl', value: 'Cl' },
    { title: 'P2O5', value: 'P2O5' },
    { title: 'TiO2', value: 'TiO2' },
    { title: 'LOI', value: 'LOI' },
    { title: 'AM', value: 'AM' },
    { title: 'IM', value: 'IM' },
    { title: 'SM', value: 'SM' },
    { title: 'TPH', value: 'TPH' },
    { title: 'totalTons', value: 'totalTons' }
];

const TYPE_FORMATS = [
    { title: 'datetime', value: 'datetime' },
    { title: 'number', value: 'number' },
    { title: 'string', value: 'string' }
];

const TagSelection = (props) => {
    const { updatedWidget, onUpdateWidget } = props;

    const [nodes] = useState(ELEMENTS);
    const [selectedElement, setSelectedElement] = useState(null);

    const onSetNode = (value) => {
        if (updatedWidget.type === 'Charts') {
            const widget = { ...updatedWidget };
            widget.settings.data_columns = [value.title];
            widget.title = value.title;
            onUpdateWidget(widget);
        } else {
            const columns = updatedWidget.settings.data_columns;
            const index = columns.findIndex((obj) => obj.columnName === value.title);
            const element = { id: value.title, type: null, label: null, columnName: value.title };
            if (index !== -1) {
                element.type = columns[index].type;
                element.label = columns[index].label;
            }
            setSelectedElement(element);
        }
    };

    const onSetType = (value) => {
        const selectedElementCopy = { ...selectedElement, type: value.title };
        if (value.title === 'datetime') {
            selectedElementCopy.format = 'YYYY';
            delete selectedElementCopy.round;
        } else if (value.title === 'number') {
            selectedElementCopy.round = '2';
            delete selectedElementCopy.format;
        } else {
            delete selectedElementCopy.round;
            delete selectedElementCopy.format;
        }
        setSelectedElement(selectedElementCopy);
    };

    const onChangeLabel = (e) => {
        setSelectedElement({ ...selectedElement, label: e.target.value });
    };

    const onUpdateElementsHandler = () => {
        const columns = updatedWidget.settings.data_columns;
        const index = columns.findIndex((obj) => obj.columnName === selectedElement.columnName);
        if (index !== -1) {
            columns[index] = selectedElement;
        } else {
            columns.push(selectedElement);
        }
        onUpdateWidget({ ...updatedWidget, settings: { ...updatedWidget.settings, data_columns: columns } });
        setSelectedElement(null);
    };
    const onDeleteElement = () => {
        const columns = updatedWidget.settings.data_columns;
        const index = columns.findIndex((obj) => obj.columnName === selectedElement.columnName);
        if (index !== -1) {
            columns.splice(index, 1);
            onUpdateWidget({ ...updatedWidget, settings: { ...updatedWidget.settings, data_columns: columns } });
            setSelectedElement(null);
        }
    };

    return (
        <>
            <Grid item xs={12}>
                <Autocomplete
                    options={nodes}
                    getOptionLabel={(option) => option.title}
                    id="select-on-focus"
                    selectOnFocus
                    renderInput={(params) => <TextField {...params} label="Element" variant="standard" />}
                    onChange={(event, newValue) => {
                        onSetNode(newValue);
                    }}
                    value={selectedElement?.columnName ? { title: selectedElement?.columnName, value: selectedElement?.columnName } : null}
                />
            </Grid>
            {selectedElement && (
                <>
                    <Grid item xs={12}>
                        <Autocomplete
                            options={TYPE_FORMATS}
                            getOptionLabel={(option) => option.title}
                            id="select-on-focus"
                            selectOnFocus
                            renderInput={(params) => <TextField {...params} label="Type" variant="standard" />}
                            onChange={(event, newValue) => {
                                onSetType(newValue);
                            }}
                            value={selectedElement?.type ? { title: selectedElement?.type, value: selectedElement?.type } : null}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Label" value={selectedElement.label} onChange={onChangeLabel} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={onDeleteElement} color="error">
                            Remove
                        </Button>
                        <Button onClick={onUpdateElementsHandler}>Save</Button>
                    </Grid>
                </>
            )}
        </>
    );
};

TagSelection.propTypes = {
    updatedWidget: PropTypes.object,
    onUpdateWidget: PropTypes.func
};

export default React.memo(TagSelection);
