import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// import { visuallyHidden } from "@material-ui/styles/";

import { gridSpacing } from 'store/constant';
import TableWidget from 'ui-component/cards/TableWidget';
import TableQueuedTable from 'ui-component/cards/TagQueuedTable';
import AverageTableWidget from 'ui-component/cards/TagAverageTableWidget';

import layoutWidgetServices from '_services/layout.widget.services';
import { tagQueuedServices } from '_services';
import AnalysisChartCard from '../widget/Chart/AnalysisChartCard';
import { DATE_INTERVAL, HISTORICAL_DATA, DISABLE_REFRESH_INTERVAL } from 'store/actions';

export default function EnhancedTable() {
    const dispatch = useDispatch();
    const [layoutId, setLayoutId] = React.useState(4);
    const [layoutWidget, setLayoutWidget] = React.useState([]);
    const [tag, setTag] = React.useState([]);
    const { id: tagId } = useParams();

    const apiHistorical = (tag) => {
        dispatch({
            type: HISTORICAL_DATA,
            historicalData: 'no'
        });
        // format(parsedDate, 'MMMM dd, yyyy hh:mm a');
        dispatch({
            type: DATE_INTERVAL,
            rangeStart: new Date(tag.average?.LocalstartTime),
            rangeEnd: new Date(tag.average?.LocalendTime)
        });
        dispatch({ type: DISABLE_REFRESH_INTERVAL, deactivateRefresh: true });
    };
    React.useEffect(() => {
        layoutWidgetServices.getByLayoutId(layoutId).then(async (layout) => {
            const { data } = await tagQueuedServices.getById(tagId);
            setTag(data);
            const { result } = layout;
            setLayoutWidget(result);
            apiHistorical(data);
        });
    }, []);

    const RenderWidget = ({ widget }) => {
        const i = 0;
        switch (widget?.type) {
            case 'table':
                return <TableWidget settings={widget} />;
            case 'Charts':
                return <AnalysisChartCard settings={widget} />;
            case 'average':
                return tag?.LocalendTime ? (
                    <AverageTableWidget
                        settings={widget}
                        tagStartTime={tag.average?.LocalstartTime}
                        tagEndTime={tag.average?.LocalendTime}
                    />
                ) : (
                    <></>
                );
            // return <p />;
            case 'tag-view-table':
                return <TableQueuedTable settings={widget} tag={tag} />;
            // return <>rjj</>;
            default:
                return <p />;
        }
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12} md={6}>
                <Grid container spacing={gridSpacing}>
                    {layoutWidget && layoutWidget.map((widget) => <RenderWidget widget={widget} />)}
                </Grid>
            </Grid>
        </Grid>
    );
}
