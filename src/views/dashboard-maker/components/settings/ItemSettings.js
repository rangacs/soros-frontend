import React, { Fragment } from 'react';

import { TextField, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { CHART_TYPES } from '../../../../_helpers/default-data';
import { getDefaultSize, currentSize, currentChartType } from '../../../../_helpers/item-settings-helper';
import TagSelection from './TagSelection';
import { IconTrash } from '@tabler/icons';

const ItemSettings = (props) => {
    const { onDeleteDashboardItem, updatedWidget, onUpdateWidget, children } = props;

    const onChangeTitle = (e) => {
        const widget = { ...updatedWidget };
        widget.title = e.target.value;
        onUpdateWidget(widget);
    };

    const onChangeWidgetSize = (selectedSize) => {
        const widget = { ...updatedWidget };
        widget.settings.layout.w = selectedSize.value.w;
        widget.settings.layout.h = selectedSize.value.h;
        onUpdateWidget(widget);
    };

    const onChangeChartType = (newChartType) => {
        const widget = { ...updatedWidget };
        widget.settings.chartType = newChartType.value;
        onUpdateWidget(widget);
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '90%' }}>{updatedWidget.title}</div>
                <div style={{ width: '10%' }}>
                    <IconTrash onClick={() => onDeleteDashboardItem(updatedWidget.widgetId)} />
                </div>
            </div>
            <Grid container spacing={3} sx={{ mt: 0.25 }}>
                <Grid item xs={12}>
                    <TextField fullWidth label="Name" value={updatedWidget.title} onChange={onChangeTitle} />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={getDefaultSize(updatedWidget.type)}
                        getOptionLabel={(option) => option.title}
                        id="select-on-focus"
                        selectOnFocus
                        renderInput={(params) => <TextField {...params} label="Size" variant="standard" />}
                        value={currentSize(updatedWidget.type, updatedWidget.settings.layout.w, updatedWidget.settings.layout.h)}
                        onChange={(event, newValue) => {
                            onChangeWidgetSize(newValue);
                        }}
                    />
                </Grid>
                {updatedWidget.type === 'Charts' && (
                    <Grid item xs={12}>
                        <Autocomplete
                            options={CHART_TYPES}
                            getOptionLabel={(option) => option.title}
                            id="select-on-focus"
                            selectOnFocus
                            renderInput={(params) => <TextField {...params} label="Type" variant="standard" />}
                            value={currentChartType(updatedWidget.settings.chartType)}
                            onChange={(event, newValue) => {
                                onChangeChartType(newValue);
                            }}
                        />
                    </Grid>
                )}
                <TagSelection updatedWidget={updatedWidget} onUpdateWidget={onUpdateWidget} />
            </Grid>
        </>
    );
};

export default React.memo(ItemSettings);
