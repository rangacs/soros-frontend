import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
// material-ui
import { Button, Grid, Stack, TextField, InputAdornment } from '@material-ui/core';
import MonitorWidget from 'ui-component/cards/MonitorWidget';
import TableWidget from 'ui-component/cards/TableWidget';
import TagsSummaryWidget from 'ui-component/cards/TagsSummaryWidget';
import AnalysisChartCard from '../widget/Chart/AnalysisChartCard';
import AverageTableWidget from 'ui-component/cards/AverageTableWidget';

// project imports
import { gridSpacing } from 'store/constant';

import layoutWidgetServices from '_services/layout.widget.services';

// ===========================|| FORM VALIDATION - LOGIN FORMIK  ||=========================== //

const Monitor = () => {
    const [layoutWidget, SetLayoutWidget] = React.useState([]);
    React.useEffect(() => {
        layoutWidgetServices.getByLayoutId(3).then((layout) => {
            const { result } = layout;
            SetLayoutWidget(result);
            // setLayoutWidget(result);
        });
    }, []);
    const RenderWidget = ({ widget }) => {
        switch (widget?.type) {
            case 'table1':
                return <TableWidget settings={widget} />;
            case 'Charts1':
                return <AnalysisChartCard settings={widget} />;
            case 'tag-summary':
                return <TagsSummaryWidget settings={widget} />;
            // return <p />;
            case 'monitor':
                return <MonitorWidget settings={widget} />;
            case 'average':
                return <AverageTableWidget settings={widget} />;
            default:
                return <p />;
        }
    };
    return (
        <Grid container spacing={gridSpacing} alignItems="center">
            {layoutWidget && layoutWidget.map((widget) => <RenderWidget widget={widget} />)}
        </Grid>
    );
    // </MainCard>
};

export default Monitor;
