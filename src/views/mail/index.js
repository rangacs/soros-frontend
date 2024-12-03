import React from 'react';
//  react-redux
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { styled, useTheme } from '@material-ui/styles';
import { Box, Grid, useMediaQuery } from '@material-ui/core';

import { employeeServices } from '_services';

// project imports
import EmployeeDrawer from './EmployeeDrawer';
import EmployeeDetails from './EmployeeDetails';
import EmployeeList from './EmployeeList';
import axios from 'utils/axios';
import { SET_MENU } from 'store/actions';
import { appDrawerWidth as drawerWidth, gridSpacing } from 'store/constant';

// drawer content element
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: 'calc(100% - 320px)',
    flexGrow: 1,
    paddingLeft: open ? theme.spacing(3) : 0,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('lg')]: {
        paddingLeft: 0,
        marginLeft: 0
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

// ===========================|| MAIL MAIN PAGE ||=========================== //

const EmployeePage = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('lg'));

    const [data, setData] = React.useState([]);
    const [unreadCounts, setUnreadCounts] = React.useState({});

    const state = useSelector((state) => {
        if (state.companyReducer.companyData) {
            return state.companyReducer.companyData;
        }

        return null;
    });

    const getData = async () => {
        const { id } = state;

        const employee = await employeeServices.getEmployeesByStatus(id);
        // const response = await axios.get('/api/mails/list');
        setData(employee);
        // setUnreadCounts(response.data.unreadCount);
    };
    const [emailDetails, setEmailDetailsValue] = React.useState(false);
    const [selectedMail, setSelectedMail] = React.useState(null);
    const handleUserChange = async (event, dataRead) => {
        if (dataRead) {
            await axios.post('/api/mails/setRead', { id: dataRead.id });
            await getData();
        }
        setSelectedMail(dataRead);
        setEmailDetailsValue((prev) => !prev);
    };

    const [openMailSidebar, setOpenMailSidebar] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpenMailSidebar((prevState) => !prevState);
    };

    React.useEffect(() => {
        if (matchDownSM) {
            setOpenMailSidebar(false);
        } else {
            setOpenMailSidebar(true);
        }
    }, [matchDownSM]);

    React.useEffect(() => {
        // hide left drawer when email app opens
        dispatch({ type: SET_MENU, opened: false });
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [filter, setFilter] = React.useState('all');
    const handleFilter = async (string) => {
        setEmailDetailsValue(false);
        setFilter(string);
        const response = await axios.post('/api/mails/filter', {
            filter: string
        });
        setData(response.data);
    };

    const handleImportantChange = async (event, dataImportant) => {
        if (dataImportant) {
            await axios.post('/api/mails/setImportant', { id: dataImportant.id });
            handleFilter(filter);
        }
    };

    const handleStarredChange = async (event, dataStarred) => {
        if (dataStarred) {
            await axios.post('/api/mails/setStarred', { id: dataStarred.id });
            handleFilter(filter);
        }
    };

    // search email using name
    const [search, setSearch] = React.useState('');
    const handleSearch = (event) => {
        const newString = event.target.value;
        setSearch(newString);

        if (newString) {
            const newRows = data.filter((row) => {
                let matches = true;

                const properties = ['name'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row.profile[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setData(newRows);
        } else {
            handleFilter(filter);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <EmployeeDrawer
                openMailSidebar={openMailSidebar}
                handleDrawerOpen={handleDrawerOpen}
                filter={filter}
                handleFilter={handleFilter}
                unreadCounts={unreadCounts}
            />
            <Main open={openMailSidebar}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        {/* mail details & list */}
                        {emailDetails ? (
                            <EmployeeDetails
                                data={selectedMail}
                                handleUserDetails={handleUserChange}
                                handleImportantChange={handleImportantChange}
                                handleStarredChange={handleStarredChange}
                            />
                        ) : (
                            <EmployeeList
                                handleUserDetails={handleUserChange}
                                handleDrawerOpen={handleDrawerOpen}
                                handleImportantChange={handleImportantChange}
                                handleStarredChange={handleStarredChange}
                                data={data}
                                search={search}
                                handleSearch={handleSearch}
                            />
                        )}
                    </Grid>
                </Grid>
            </Main>
        </Box>
    );
};

export default EmployeePage;
