import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// material ui
import { makeStyles } from '@material-ui/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Chart from './Chart';
import DashboardItemToolbar from './DashboardItemToolbar';
import Table from './Table';

const useStyles = makeStyles({
    card: {
        height: '100%',
        '& >.MuiCardContent-root': {
            height: '90%'
        }
    }
});

const DashboardItem = (props) => {
    const { item, onSetActiveWidget, onDeleteDashboardItem, onCloneDashboardItem, preview } = props;

    const classes = useStyles();

    const cloneWidgetHandler = () => {
        onCloneDashboardItem(item.widgetId);
    };

    const deleteWidgetHandler = () => {
        onDeleteDashboardItem(item.widgetId);
    };

    const widget = (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <MainCard
            style={{ padding: 0 }}
            title={item.title}
            darkTitle
            className={`${classes.card} dashboard-item-card`}
            onClick={() => onSetActiveWidget(item)}
        >
            {item.type === 'Charts' && <Chart settings={item.settings} preview={preview} />}
            {item.type === 'table' && <Table preview={preview} settings={item.settings} />}
        </MainCard>
    );

    return (
        <>
            <DashboardItemToolbar
                title={item.title}
                type={item.type}
                onClickSettings={() => onSetActiveWidget(item)}
                onClickClone={cloneWidgetHandler}
                onClickDelete={deleteWidgetHandler}
            />
            {widget}
        </>
    );
};

DashboardItem.propTypes = {
    item: PropTypes.object,
    onSetActiveWidget: PropTypes.func,
    onDeleteDashboardItem: PropTypes.func,
    onCloneDashboardItem: PropTypes.func,
    preview: PropTypes.bool
};

export default DashboardItem;
