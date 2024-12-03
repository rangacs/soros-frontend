import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
// import { visuallyHidden } from "@material-ui/styles/";
import { format } from 'date-fns';
import { gridSpacing } from 'store/constant';
import TableWidget from 'ui-component/cards/TableWidget';
import TableQueuedTable from 'ui-component/cards/TagQueuedTable';

import TagCompletedTable from 'ui-component/cards/TagCompletedTable';
import AverageTableWidget from 'ui-component/cards/TagAverageTableWidget';

import layoutWidgetServices from '_services/layout.widget.services';
import { tagCompletedServices } from '_services';
import AnalysisChartCard from '../widget/Chart/AnalysisChartCard';

export default function EnhancedTable() {
    const [layoutId, setLayoutId] = React.useState(4);
    const [layoutWidget, setLayoutWidget] = React.useState([]);
    const [tag, setTag] = React.useState([]);
    const { id: tagId } = useParams();
    React.useEffect(() => {
        layoutWidgetServices.getByLayoutId(layoutId).then(async (layout) => {
            const { data } = await tagCompletedServices.getById(tagId);
            setTag(data);
            const { result } = layout;
            setLayoutWidget(result);
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
                return <AverageTableWidget settings={widget} tagStartTime={tag?.LocalstartTime} tagEndTime={tag?.LocalendTime} />;
            // return <p />;
            case 'tag-view-table':
                return <TagCompletedTable settings={widget} tag={tag} />;
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
