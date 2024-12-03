import React, { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { PeopleAlt } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { IconWoman, IconUserPlus, IconUserMinus } from '@tabler/icons';
import { getStorageData } from 'utils/auth/auth';
// eslint-disable-next-line import/named
import dashboardServices from '_services/dashboard.services';

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const useStyles = makeStyles({
    iconClass: {
        zIndex: '1000',
        position: 'relative'
    }
});
const Dashboard = () => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [role, setRole] = useState('superuser');
    const [resignationData, setResignationData] = useState(false);
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [tobeApproved, setTobeApproved] = useState(0);
    const [totalResigned, setTotalResigned] = useState(0);

    useEffect(() => {
        setLoading(false);
        const userData = getStorageData();
        setRole(userData.user.role);
        dashboardServices
            .getAll()
            .then((res) => {
                // alert(JSON.stringify(res));
                const { resignationData: Rdata } = res.status;
                const month = [];
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < 12; i++) {
                    month.push(0);
                    month[i] = 0;
                }
                Rdata.forEach((rdata) => {
                    console.log(rdata);
                    // eslint-disable-next-line no-underscore-dangle
                    const index = rdata._id.month;
                    month[index - 1] = rdata.totalResignations;
                });
                setResignationData(month);
                setTotalEmployees(res.status.totalEmployees);
                setTobeApproved(res.status.tobeApproved || 0);
                setTotalResigned(res.status.resignationCount || 0);
            })
            .catch((error) => {
                // alert(error);
            });
    }, []);

    return (
        <>
            {role === 'superadmin' && (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <h1>Super Admin</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TotalGrowthBarChart isLoading={isLoading} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <PopularCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}

            {role !== 'superadmin' && (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            {[
                                { name: 'Total Employees', value: totalEmployees, icon: <PeopleAlt className={classes.iconClass} /> },
                                { name: 'Approvals Pending', value: tobeApproved, icon: <IconWoman className={classes.iconClass} /> },
                                {
                                    name: 'Days for Cutoff date',
                                    value: '03',
                                    icon: <IconUserPlus className={classes.iconClass} />
                                },
                                { name: 'Resignations', value: totalResigned, icon: <IconUserMinus className={classes.iconClass} /> }
                            ].map((data, i) => (
                                <Grid key={i} item lg={3} md={3} sm={3} xs={12}>
                                    <EarningCard data={data} isLoading={isLoading} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                {resignationData && <TotalGrowthBarChart isLoading={isLoading} month={resignationData} />}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <PopularCard isLoading={isLoading} />
                                {/* <BajajAreaChartCard /> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default Dashboard;
