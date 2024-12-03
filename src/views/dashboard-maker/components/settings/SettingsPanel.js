import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Switch, Button } from '@material-ui/core';

import ItemSettings from './ItemSettings';
import AllComponents from './AllComponents';
import MainCard from 'ui-component/cards/MainCard';

import { IconArrowNarrowLeft } from '@tabler/icons';

const SettingsPanel = (props) => {
    const {
        activeWidget,
        onSaveLayout,
        onAddDashboardItem,
        onDeleteDashboardItem,
        onSaveDashboardItemSetting,
        layoutTitle,
        onChangeLayoutTitle,
        isLoading,
        layoutId,
        preview,
        onPreview
    } = props;

    const [updatedWidget, setUpdateWidget] = useState(null);

    const updateWidgetHandler = useCallback((widget) => {
        setUpdateWidget(widget);
    }, []);

    const saveActiveWidgetSettingHandler = () => {
        onSaveDashboardItemSetting(updatedWidget);
    };

    const showWidgetsHandler = () => {
        onSaveDashboardItemSetting(null);
        setUpdateWidget(null);
    };

    let displaySettings;
    let cardHeaderToolbar;

    if (!activeWidget) {
        displaySettings = (
            <AllComponents onAddDashboardItem={onAddDashboardItem} layoutTitle={layoutTitle} onChangeLayoutTitle={onChangeLayoutTitle} />
        );

        cardHeaderToolbar = (
            <Button isLoading={isLoading} onClick={onSaveLayout}>
                {layoutId ? 'Update' : 'Save'}
            </Button>
        );
    } else {
        if (updatedWidget) {
            displaySettings = (
                <ItemSettings
                    onDeleteDashboardItem={onDeleteDashboardItem}
                    updatedWidget={updatedWidget}
                    onUpdateWidget={updateWidgetHandler}
                />
            );
        }
        cardHeaderToolbar = <Button onClick={saveActiveWidgetSettingHandler}>Update</Button>;
    }

    useEffect(() => {
        updateWidgetHandler(activeWidget);
    }, [activeWidget, updateWidgetHandler]);

    return (
        <MainCard darkTitle title="Layout Settings" secondary={cardHeaderToolbar} style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
                {activeWidget ? <IconArrowNarrowLeft onClick={showWidgetsHandler} /> : <span>&nbsp;</span>}
                <label htmlFor="none">
                    <Switch checked={preview} onChange={onPreview} inputProps={{ 'aria-label': 'controlled' }} size="small" />
                    Live Mode
                </label>
            </div>
            {displaySettings}
        </MainCard>
    );
};

SettingsPanel.propTypes = {
    activeWidget: PropTypes.object,
    onSaveLayout: PropTypes.func,
    onAddDashboardItem: PropTypes.func,
    onDeleteDashboardItem: PropTypes.func,
    onSaveDashboardItemSetting: PropTypes.func,
    layoutTitle: PropTypes.string,
    onChangeLayoutTitle: PropTypes.func,
    isLoading: PropTypes.bool,
    layoutId: PropTypes.number,
    preview: PropTypes.bool,
    onPreview: PropTypes.func
};

export default SettingsPanel;
