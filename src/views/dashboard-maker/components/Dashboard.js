import React from 'react';
import PropTypes from 'prop-types';

// third-party
import RGL, { WidthProvider } from 'react-grid-layout';
import styled from 'styled-components';

// project-imports
import DashboardItem from './DashboardItem';
import DragBackground from './DragBackground';

const ReactGridLayout = WidthProvider(RGL);

const DragField = styled(ReactGridLayout)`
    margin: 35px 16px 8px 0px;
    ${(props) =>
        props.isDragging
            ? `
          background: url(${DragBackground});
          background-repeat: repeat-y;
          background-position: 0px -4px;
          background-size: 100% 52px;
        `
            : ''}
`;

const defaultLayout = (i) => ({
    x: i.settings.layout.x || 0,
    y: i.settings.layout.y || 0,
    w: i.settings.layout.w || 8,
    h: i.settings.layout.h || 6
});

const Dashboard = (props) => {
    const {
        onDragging,
        onLayoutChange,
        isDragging,
        dashboardItems,
        activeWidget,
        onSetActiveWidget,
        onDeleteDashboardItem,
        onCloneDashboardItem,
        preview
    } = props;

    const modifiedLayout = () => {
        dashboardItems.map((item) => ({ ...item }));
    };

    const dashboardItem = (item) => {
        const classes = `dashboard-item
      ${activeWidget && activeWidget.widgetId === item.widgetId ? 'dashboard-item-active' : ''}
    `;

        return (
            <div className={classes} key={item.widgetId} data-grid={defaultLayout(item)}>
                <DashboardItem
                    item={item}
                    activeWidget={activeWidget}
                    onSetActiveWidget={onSetActiveWidget}
                    onDeleteDashboardItem={onDeleteDashboardItem}
                    onCloneDashboardItem={onCloneDashboardItem}
                    preview={preview}
                />
            </div>
        );
    };

    return (
        <DragField
            margin={[12, 12]}
            containerPadding={[0, 0]}
            onDragStart={() => onDragging(true)}
            onDragStop={() => onDragging(false)}
            onResizeStart={() => onDragging(true)}
            onResizeStop={() => onDragging(false)}
            cols={24}
            rowHeight={40}
            onLayoutChange={onLayoutChange}
            isDragging={isDragging}
            isResizable={false}
            layout={modifiedLayout}
            draggableHandle=".MyDragHandleClassName"
        >
            {dashboardItems.map(dashboardItem)}
        </DragField>
    );
};

Dashboard.propTypes = {
    onDragging: PropTypes.func,
    onLayoutChange: PropTypes.func,
    isDragging: PropTypes.bool,
    dashboardItems: PropTypes.array,
    activeWidget: PropTypes.object,
    onSetActiveWidget: PropTypes.func,
    onDeleteDashboardItem: PropTypes.func,
    onCloneDashboardItem: PropTypes.func,
    preview: PropTypes.bool
};

export default Dashboard;
