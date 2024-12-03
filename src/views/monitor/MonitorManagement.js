import React from 'react';

import { Box, Tabs, Tab, Typography, Grid } from '@material-ui/core';

import MonitorDropdownManagement from './MonitorDropdownManagement';
import MonitorColumnManagement from './MonitorColumnManagement';
import MainCard from 'ui-component/cards/MainCard';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const MonitorManagement = () => {
    const [value, setValue] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid item xs={12} sm={6} lg={12}>
                <MainCard style={{ padding: 0 }} title="Monitor Column Settings" darkTitle=" ">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                            <Tab label="Data Columns" {...a11yProps(0)} />
                            <Tab label="Interval drop down" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={1}>
                        <MonitorDropdownManagement />
                    </TabPanel>
                    <TabPanel value={value} index={0}>
                        <MonitorColumnManagement />
                    </TabPanel>
                </MainCard>
            </Grid>
        </>
    );
};

export default MonitorManagement;
