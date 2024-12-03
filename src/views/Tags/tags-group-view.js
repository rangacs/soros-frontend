import React, { useEffect, useState } from 'react';

import { Grid, Button } from '@material-ui/core';
import CompletedTagList from './CompletedTagList';
import QueuedTagList from './QueuedTagList';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import ConfirmMergePopup from './ConfirmMergePopup';

import TableWidget from 'ui-component/cards/TableWidget';
import AverageGroupBlock from 'ui-component/cards/AverageGroupBlock';

import layoutWidgetServices from '_services/layout.widget.services';
import AnalysisChartCard from '../widget/Chart/AnalysisChartCard';

import { tagCompletedServices } from '_services';

// ===========================|| Tag List  ||=========================== //

const TagList = () => {
    const [completed, setCompleted] = React.useState([]);
    const [queuedList, setQueuedList] = React.useState([]);
    const [isQueuedTagStopped, setIsQueuedTagStopped] = React.useState();
    const [mergeViewOpen, setMergeViewOpen] = React.useState(true);
    const [openPopup, setOpenPopup] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [layoutWidget, setLayoutWidget] = React.useState([]);

    //
    const onSetRefresh = (refresh) => {
        setRefresh(refresh);

        if (refresh) {
            setTimeout(() => {
                setRefresh(false);
            }, 1000);
        }
    };

    React.useEffect(() => {
        layoutWidgetServices.getByLayoutId(18).then((layout) => {
            const { result } = layout;
            setLayoutWidget(result);
        });
    }, []);
    const queuedSelected = (event, id) => {
        if (event.target.checked) {
            setQueuedList((prevState) => [...prevState, id]);
        } else {
            setQueuedList((prevState) => prevState.filter((ids) => ids !== id));
        }
    };
    const completedSelected = (event, id) => {
        if (event.target.checked) {
            setCompleted((prevState) => [...prevState, id]);
        } else {
            setCompleted((prevState) => prevState.filter((ids) => ids !== id));
        }
    };
    const resetMerge = () => {
        setQueuedList([]);
        setCompleted([]);
    };

    const mergeTags = () => {
        // alert('merge');
        const ids = completed.join(',');
        tagCompletedServices.mergeTags(ids, 0);
    };

    const queuedTagStopHandler = React.useCallback(() => {
        setIsQueuedTagStopped(true);
        setRefresh(!refresh);
    }, []);
    React.useEffect(() => {
        setCompleted([]);
        setQueuedList([]);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            {completed.length > 1 || (completed.length > 0 && queuedList.length > 0) ? (
                <Grid item xs={12} sm={6} lg={12}>
                    <MainCard style={{ padding: 0 }} darkTitle>
                        <Button onClick={() => setOpenPopup(true)}>Merge Tags</Button>
                        {openPopup && (
                            <ConfirmMergePopup
                                open={openPopup}
                                handleCloseDialog={() => setOpenPopup(!openPopup)}
                                selectedCompletedTags={completed}
                                selectedQueuedTags={queuedList}
                                setRefresh={setRefresh}
                                onResetMerge={resetMerge}
                            />
                        )}
                    </MainCard>
                </Grid>
            ) : (
                <></>
            )}
            {layoutWidget &&
                layoutWidget.map((widget) => {
                    switch (widget?.type) {
                        case 'tag-group-average':
                            return <AverageGroupBlock settings={widget} />;
                        case 'tag-completed':
                            return (
                                <CompletedTagList
                                    onSelectCompleted={completedSelected}
                                    mergeTags={mergeTags}
                                    isQueuedTagStopped={isQueuedTagStopped}
                                    selectedCompletedTags={completed}
                                    setOpenPopup={setOpenPopup}
                                    setMergeViewOpen={setMergeViewOpen}
                                    refresh={refresh}
                                    onSetRefresh={onSetRefresh}
                                    settings={widget}
                                />
                            );
                        default:
                            return <p />;
                    }
                })}
        </Grid>
    );
};

export default TagList;
