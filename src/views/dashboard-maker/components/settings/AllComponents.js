import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { TextField, Button, Grid } from '@material-ui/core';
import { IconChartLine, IconTable } from '@tabler/icons';

const AllComponents = (props) => {
    const { onAddDashboardItem, layoutTitle, onChangeLayoutTitle } = props;

    const addChart = () => {
        onAddDashboardItem('chart');
    };

    const addTable = () => {
        onAddDashboardItem('table');
    };

    return (
        <>
            <Grid container style={{ marginTop: '15px' }}>
                <Grid item className="col-md-6 mt-2 mb-1">
                    <TextField fullWidth label="Dashboard Title" value={layoutTitle} onChange={onChangeLayoutTitle} />
                </Grid>
            </Grid>

            <h4>Add Widgets</h4>

            <Grid container>
                <Grid item className="col-md-6 mt-2 mb-1">
                    <Button
                        type="button"
                        onClick={addChart}
                        className="btn btn-outline-primary d-flex flex-column align-items-center w-100"
                    >
                        <IconChartLine />
                        <span>Chart</span>
                    </Button>
                </Grid>
                <Grid item className="col-md-6 mt-2 mb-1">
                    <Button
                        type="button"
                        onClick={addTable}
                        className="btn btn-outline-primary d-flex flex-column align-items-center w-100"
                    >
                        <IconTable />
                        Table
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

AllComponents.propTypes = {
    onAddDashboardItem: PropTypes.func,
    layoutTitle: PropTypes.string,
    onChangeLayoutTitle: PropTypes.func
};

export default React.memo(AllComponents);
