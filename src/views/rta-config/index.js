import React from 'react';

import { Box, Tabs, Tab, Typography, Grid } from '@material-ui/core';

import MainCard from 'ui-component/cards/MainCard';
import RtaSettingsList from './rta-settings/List';
import RtaPhysicalConfig from './rta-physical-config/List';
import RtaConfigMaster from './rta-config-master/List';
import RmSettings from './rm-settings/List';

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

const RtaConfig = () => {
    const [value, setValue] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid item xs={12} sm={6} lg={12}>
                <MainCard style={{ padding: 0 }} title="Rta Config" darkTitle>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                            <Tab label="Rta Settings" {...a11yProps(0)} />
                            <Tab label="Rta Physical Config" {...a11yProps(1)} />
                            <Tab label="Rta  Config Master" {...a11yProps(2)} />
                            <Tab label="R M Settings" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <RtaSettingsList />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <RtaPhysicalConfig />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <RtaConfigMaster />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <RmSettings />
                    </TabPanel>
                </MainCard>
            </Grid>
        </>
    );
};

export default RtaConfig;
