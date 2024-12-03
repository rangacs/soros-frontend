import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Box, Grid, Stack, Tab, Tabs, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

// project imports
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

// assets
import CheckCircleRounded from '@material-ui/icons/CheckCircleRounded';
import CancelOutlined from '@material-ui/icons/CancelOutlined';

const dcolumns = [
    { field: 'Employee Number', headerName: 'Employee Number', width: 220 },
    { field: 'Employee Name', headerName: 'Employee Name', width: 200 },
    { field: 'PAN Number', headerName: 'PAN Number', width: 220 },
    {
        field: 'Gender',
        headerName: 'Gender',
        type: 'string',
        width: 150
    },
    {
        field: 'Aadhaar Number',
        headerName: 'Aadhaar Number',
        width: 150
    },

    {
        field: 'WorkflowStatus',
        headerName: 'Status',
        width: 150
    }
];
const ecolumns = [
    { field: 'Employee Number', headerName: 'Employee Number' },
    { field: 'Employee Name', headerName: 'Employee Name' },
    { field: 'PAN Number', headerName: 'PAN Number' },
    {
        field: 'Gender',
        headerName: 'Gender'
    },
    {
        field: 'Aadhaar Number',
        headerName: 'Aadhaar Number'
    },

    {
        field: 'WorkflowStatus',
        headerName: 'Status'
    }
];

// tab content
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box
                    sx={{
                        p: 0
                    }}
                >
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`
    };
}

// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 'auto'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        minWidth: 160
    },
    profileTab: {
        '& .MuiTabs-flexContainer': {
            borderBottom: 'none'
        },
        '& button': {
            color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[600],
            minHeight: 'auto',
            minWidth: '100%',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            textAlign: 'left',
            justifyContent: 'flex-start'
        },
        '& button.Mui-selected': {
            color: theme.palette.primary.main,
            background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
        },
        '& button > svg': {
            marginBottom: '0px !important',
            marginRight: '10px',
            marginTop: '10px',
            height: '20px',
            width: '20px'
        },
        '& button > div > span': {
            display: 'block'
        },
        '& > div > span': {
            display: 'none'
        }
    }
}));

// ================================|| UI TABS - VERTICAL ||================================ //

export default function ImportResultSummery({ employeImportedData }) {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);

    const [value, setValue] = React.useState(0);
    const [successRecords, setSuccessRecord] = useState([]);
    const [failureRecords, setFailureRecords] = useState([]);
    const [successColumns, setSuccessColumns] = useState([]);
    const [failureColumns, setFailureColumns] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        // const log = JSON.parse(employeImportedData.Data);
        const { success, rejected } = employeImportedData;

        const sRecords = success !== undefined ? success.map((record) => record) : [];
        console.log(success, rejected);
        const scol = [];
        const fcol = [];
        if (sRecords.length > 0) {
            const idSRecords = sRecords.map((record, index) => {
                record.id = index;

                return record;
            });
            const srow = sRecords.pop();
            Object.keys(srow).forEach((record, index) => {
                scol.push({ field: record, headerName: record, width: 220 });
            });
            setSuccessRecord([...idSRecords]);
            setSuccessColumns([...scol]);
        }
        const fRecords = rejected !== undefined ? rejected.map((record) => record) : [];
        if (fRecords.length > 0) {
            const idFRecords = fRecords.map((record, index) => {
                record.id = index;
                return record;
            });
            const frow = idFRecords.pop();
            Object.keys(frow).forEach((record) => {
                fcol.push({ field: record, headerName: record, width: 220 });
            });
            setFailureColumns([...fcol]);
            setFailureRecords([...idFRecords]);
        }

        // const {}
    }, [employeImportedData]);

    return (
        <div className={classes.root}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={4} md={2}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        orientation="vertical"
                        className={classes.profileTab}
                        variant="scrollable"
                        sx={{
                            '& button': {
                                borderRadius: `${customization.borderRadius}px`
                            }
                        }}
                    >
                        <Tab
                            icon={<CheckCircleRounded color="success" />}
                            label={
                                <Grid container direction="column">
                                    <Typography variant="subtitle1" color="inherit">
                                        Accepted Records
                                    </Typography>
                                    <Typography component="div" variant="caption" sx={{ textTransform: 'capitalize' }}>
                                        Employees
                                    </Typography>
                                </Grid>
                            }
                            // {...a11yProps(0)}
                        />
                        <Tab
                            icon={<CancelOutlined color="error" />}
                            label={
                                <Grid container direction="column">
                                    <Typography variant="subtitle1" color="inherit">
                                        Rejected Records
                                    </Typography>
                                    <Typography component="div" variant="caption" sx={{ textTransform: 'capitalize' }}>
                                        Employees
                                    </Typography>
                                </Grid>
                            }
                            // {...a11yProps(1)}
                        />
                    </Tabs>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                    <TabPanel value={value} index={0}>
                        <SubCard>
                            <Stack spacing={gridSpacing}>
                                <Typography variant="body2">Accepted Records List</Typography>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={successRecords}
                                        columns={successColumns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection
                                        disableSelectionOnClick
                                    />
                                </div>
                            </Stack>
                        </SubCard>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SubCard>
                            <Stack spacing={gridSpacing}>
                                <Typography>Rejected Record List</Typography>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={failureRecords}
                                        columns={failureColumns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection
                                        disableSelectionOnClick
                                    />
                                </div>
                            </Stack>
                        </SubCard>
                    </TabPanel>
                </Grid>
            </Grid>
        </div>
    );
}
