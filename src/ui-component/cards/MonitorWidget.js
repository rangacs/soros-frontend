import PropTypes from 'prop-types';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import analysisService from '_services/analysis.services';
import monitorServices from '_services/monitor.services';
import { tagQueuedServices } from '_services/tagQueued.services';
import { format, differenceInMinutes, formatRelative, subDays, subHours } from 'date-fns';
import { DATE_INTERVAL, HISTORICAL_DATA, DISABLE_REFRESH_INTERVAL } from 'store/actions';

// material-ui
import { makeStyles, withStyles } from '@material-ui/styles';
import {
    alpha,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Tooltip,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Popper,
    CardContent,
    ClickAwayListener,
    TextField,
    Paper,
    Button
} from '@material-ui/core';
import { visuallyHidden } from '@material-ui/utils';

// third-party
import clsx from 'clsx';

import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

// assets
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

// table data

// table filter
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    },
    sortSpan: visuallyHidden,
    TableContainer: {
        padding: '0 14px'
    },
    TableCell: {
        padding: '8px'
    },
    select: {
        '&> .MuiSelect-select': {
            padding: '5px'
        }
    }
}));

// ===========================|| TABLE - HEADER ||=========================== //

function EnhancedTableHead(props) {
    const { columns, dropDown, classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, dropDownChange } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const [cumulativeDialogOpen, setCumulativeOpen] = React.useState(false);
    const [intervalDialogOpen, setIntervalDialogOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState('2022-06-28');
    const [startTime, setStartTime] = React.useState('10:00');
    const dispatch = useDispatch();

    const [intervalStartDate, setIntervalStartDate] = React.useState('2022-06-28');
    const [intervalStartTime, setIntervalStartTime] = React.useState('10:00');

    const [intervalEndDate, setIntervalEndDate] = React.useState('2022-06-28');
    const [intervalEndTime, setIntervalEndTime] = React.useState('10:00');

    const anchorRef = React.useRef(null);
    const handleToggle = () => setCumulativeOpen((prevOpen) => !prevOpen);
    const handleIntervalDialogToggle = () => setIntervalDialogOpen((prevOpen) => !prevOpen);
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setIntervalDialogOpen(false);
    };

    React.useEffect(() => {
        setStartDate(format(subHours(new Date(), 2), 'yyyy-MM-dd'));
        setStartTime(format(subHours(new Date(), 2), 'HH:mm'));

        setIntervalStartDate(format(subHours(new Date(), 8), 'yyyy-MM-dd'));
        setIntervalStartTime(format(subHours(new Date(), 8), 'HH:mm'));

        setIntervalEndDate(format(new Date(), 'yyyy-MM-dd'));
        setIntervalEndTime(format(new Date(), 'HH:mm'));
    }, []);

    return (
        <TableHead>
            <TableRow>
                <TableCell
                    align="left"
                    padding="normal"
                    sx={{
                        backgroundColor: '#AFE3FD',
                        fontSize: 14
                    }}
                >
                    {/* {JSON.stringify(dropDown)} */}
                </TableCell>
                {columns &&
                    columns.map((headCell, i) => (
                        <TableCell key={i} align="left" padding="normal" sortDirection={false} className={classes.TableCell}>
                            {(() => {
                                switch (headCell.type) {
                                    case 'custom_interval':
                                        return (
                                            <div>
                                                <Chip
                                                    classes={{ label: classes.profileLabel }}
                                                    className={`${classes.profileChip} ${classes.chip}`}
                                                    label="Cumulative"
                                                    variant="outlined"
                                                    ref={anchorRef}
                                                    aria-controls={cumulativeDialogOpen ? 'menu-list-grow' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleToggle}
                                                    color="primary"
                                                />
                                                <Popper
                                                    placement="bottom-end"
                                                    open={cumulativeDialogOpen}
                                                    anchorEl={anchorRef.current}
                                                    role={undefined}
                                                    transition
                                                    disablePortal
                                                    popperOptions={{
                                                        modifiers: [
                                                            {
                                                                name: 'offset',
                                                                options: {
                                                                    offset: [0, 14]
                                                                }
                                                            }
                                                        ]
                                                    }}
                                                    style={{ zIndex: '1' }}
                                                >
                                                    {({ TransitionProps }) => (
                                                        <Transitions position="top-right" in={cumulativeDialogOpen} {...TransitionProps}>
                                                            <Paper>
                                                                <ClickAwayListener onClickAway={handleClose}>
                                                                    <MainCard
                                                                        border={false}
                                                                        elevation={16}
                                                                        content={false}
                                                                        boxShadow
                                                                        // shadow={theme.shadows[16]}
                                                                    >
                                                                        <CardContent className={classes.cardContent}>
                                                                            <Grid container direction="column" spacing={0}>
                                                                                <Grid item className={classes.flex}>
                                                                                    <Typography
                                                                                        component="span"
                                                                                        variant="h4"
                                                                                        className={classes.name}
                                                                                    >
                                                                                        Cumulative
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <div
                                                                                        style={{ display: 'flex', flexDirection: 'column' }}
                                                                                    >
                                                                                        <br />
                                                                                        <div style={{ display: 'flex' }}>
                                                                                            <LocalizationProvider
                                                                                                dateAdapter={AdapterDateFns}
                                                                                            >
                                                                                                <DatePicker
                                                                                                    renderInput={(props) => (
                                                                                                        <TextField {...props} />
                                                                                                    )}
                                                                                                    label="Start Time"
                                                                                                    value={startDate}
                                                                                                    onChange={(newValue) => {
                                                                                                        setStartDate(
                                                                                                            format(newValue, 'yyyy-MM-dd')
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </LocalizationProvider>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={startTime}
                                                                                                onChange={(e) =>
                                                                                                    setStartTime(e.target.value)
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <Button
                                                                                        onClick={(event) => {
                                                                                            setCumulativeOpen(false);
                                                                                            dropDownChange(
                                                                                                `${startDate} ${startTime}:00`,
                                                                                                headCell
                                                                                            );
                                                                                        }}
                                                                                        style={{ float: 'right' }}
                                                                                    >
                                                                                        Submit
                                                                                    </Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </CardContent>
                                                                    </MainCard>
                                                                </ClickAwayListener>
                                                            </Paper>
                                                        </Transitions>
                                                    )}
                                                </Popper>
                                            </div>
                                        );
                                    case 'no_filter_tons':
                                        return (
                                            <div>
                                                <Chip
                                                    classes={{ label: classes.profileLabel }}
                                                    className={`${classes.profileChip} ${classes.chip}`}
                                                    label="No Filter Tons"
                                                    variant="outlined"
                                                    ref={anchorRef}
                                                    aria-controls={cumulativeDialogOpen ? 'menu-list-grow' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleToggle}
                                                    color="primary"
                                                />
                                                <Popper
                                                    placement="bottom-end"
                                                    open={cumulativeDialogOpen}
                                                    anchorEl={anchorRef.current}
                                                    role={undefined}
                                                    transition
                                                    disablePortal
                                                    popperOptions={{
                                                        modifiers: [
                                                            {
                                                                name: 'offset',
                                                                options: {
                                                                    offset: [0, 14]
                                                                }
                                                            }
                                                        ]
                                                    }}
                                                    style={{ zIndex: '1' }}
                                                >
                                                    {({ TransitionProps }) => (
                                                        <Transitions position="top-right" in={cumulativeDialogOpen} {...TransitionProps}>
                                                            <Paper>
                                                                <ClickAwayListener onClickAway={handleClose}>
                                                                    <MainCard
                                                                        border={false}
                                                                        elevation={16}
                                                                        content={false}
                                                                        boxShadow
                                                                        // shadow={theme.shadows[16]}
                                                                    >
                                                                        <CardContent className={classes.cardContent}>
                                                                            <Grid container direction="column" spacing={0}>
                                                                                <Grid item className={classes.flex}>
                                                                                    <Typography
                                                                                        component="span"
                                                                                        variant="h4"
                                                                                        className={classes.name}
                                                                                    >
                                                                                        No Filter Tons
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <div
                                                                                        style={{ display: 'flex', flexDirection: 'column' }}
                                                                                    >
                                                                                        <br />
                                                                                        <div style={{ display: 'flex' }}>
                                                                                            <LocalizationProvider
                                                                                                dateAdapter={AdapterDateFns}
                                                                                            >
                                                                                                <DatePicker
                                                                                                    renderInput={(props) => (
                                                                                                        <TextField {...props} />
                                                                                                    )}
                                                                                                    label="Start Time"
                                                                                                    value={startDate}
                                                                                                    onChange={(newValue) => {
                                                                                                        setStartDate(
                                                                                                            format(newValue, 'yyyy-MM-dd')
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </LocalizationProvider>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={startTime}
                                                                                                onChange={(e) =>
                                                                                                    setStartTime(e.target.value)
                                                                                                }
                                                                                                // style={{ width: '50px' }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <Button
                                                                                        onClick={(event) => {
                                                                                            // alert('ggg');
                                                                                            setCumulativeOpen(false);
                                                                                            dropDownChange(
                                                                                                `${startDate} ${startTime}:00`,
                                                                                                headCell
                                                                                            );
                                                                                        }}
                                                                                        style={{ float: 'right' }}
                                                                                    >
                                                                                        Submit
                                                                                    </Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </CardContent>
                                                                    </MainCard>
                                                                </ClickAwayListener>
                                                            </Paper>
                                                        </Transitions>
                                                    )}
                                                </Popper>
                                            </div>
                                        );
                                    case 'interval_range':
                                        return (
                                            <div>
                                                <Chip
                                                    classes={{ label: classes.profileLabel }}
                                                    className={`${classes.profileChip} ${classes.chip}`}
                                                    label="Interval"
                                                    variant="outlined"
                                                    ref={anchorRef}
                                                    aria-controls={intervalDialogOpen ? 'menu-list-grow' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleIntervalDialogToggle}
                                                    color="primary"
                                                />
                                                <Popper
                                                    placement="bottom-end"
                                                    open={intervalDialogOpen}
                                                    anchorEl={anchorRef.current}
                                                    role={undefined}
                                                    transition
                                                    disablePortal
                                                    popperOptions={{
                                                        modifiers: [
                                                            {
                                                                name: 'offset',
                                                                options: {
                                                                    offset: [0, 14]
                                                                }
                                                            }
                                                        ]
                                                    }}
                                                    style={{ zIndex: '1' }}
                                                >
                                                    {({ TransitionProps }) => (
                                                        <Transitions position="top-right" in={intervalDialogOpen} {...TransitionProps}>
                                                            <Paper>
                                                                <ClickAwayListener onClickAway={handleClose}>
                                                                    <MainCard
                                                                        border={false}
                                                                        elevation={16}
                                                                        content={false}
                                                                        boxShadow
                                                                        // shadow={theme.shadows[16]}
                                                                    >
                                                                        <CardContent className={classes.cardContent}>
                                                                            <Grid container direction="column" spacing={0}>
                                                                                <Grid item className={classes.flex}>
                                                                                    <Typography
                                                                                        component="span"
                                                                                        variant="h4"
                                                                                        className={classes.name}
                                                                                    >
                                                                                        Interval Time
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item>
                                                                                    <div
                                                                                        style={{ display: 'flex', flexDirection: 'column' }}
                                                                                    >
                                                                                        <br />
                                                                                        <div style={{ display: 'flex' }}>
                                                                                            <LocalizationProvider
                                                                                                dateAdapter={AdapterDateFns}
                                                                                            >
                                                                                                <DatePicker
                                                                                                    renderInput={(props) => (
                                                                                                        <TextField {...props} />
                                                                                                    )}
                                                                                                    label="Start Time"
                                                                                                    value={intervalStartDate}
                                                                                                    onChange={(newValue) => {
                                                                                                        setIntervalStartDate(
                                                                                                            format(newValue, 'yyyy-MM-dd')
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </LocalizationProvider>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={intervalStartTime}
                                                                                                onChange={(e) =>
                                                                                                    setIntervalStartTime(e.target.value)
                                                                                                }
                                                                                                // style={{ width: '50px' }}
                                                                                            />
                                                                                        </div>
                                                                                        <div style={{ display: 'flex' }}>
                                                                                            <LocalizationProvider
                                                                                                dateAdapter={AdapterDateFns}
                                                                                            >
                                                                                                <DatePicker
                                                                                                    renderInput={(props) => (
                                                                                                        <TextField {...props} />
                                                                                                    )}
                                                                                                    label="End Time"
                                                                                                    value={intervalEndDate}
                                                                                                    onChange={(newValue) => {
                                                                                                        setIntervalEndDate(
                                                                                                            format(newValue, 'yyyy-MM-dd')
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </LocalizationProvider>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={intervalEndTime}
                                                                                                onChange={(e) =>
                                                                                                    setIntervalEndTime(e.target.value)
                                                                                                }
                                                                                                // style={{ width: '50px' }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <Button
                                                                                        onClick={(event) => {
                                                                                            // alert('ggg');
                                                                                            setIntervalDialogOpen(false);
                                                                                            dropDownChange(
                                                                                                {
                                                                                                    start: `${intervalStartDate} ${intervalStartTime}:00`,
                                                                                                    end: `${intervalEndDate} ${intervalEndTime}:00`
                                                                                                },
                                                                                                headCell
                                                                                            );
                                                                                        }}
                                                                                        style={{ float: 'right' }}
                                                                                    >
                                                                                        Submit
                                                                                    </Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </CardContent>
                                                                    </MainCard>
                                                                </ClickAwayListener>
                                                            </Paper>
                                                        </Transitions>
                                                    )}
                                                </Popper>
                                            </div>
                                        );
                                    default:
                                        return (
                                            <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
                                                <InputLabel id="age-select">
                                                    {headCell.type === 'queued_tag'
                                                        ? 'In Progress'
                                                        : headCell.type.charAt(0).toUpperCase() + headCell.type.slice(1)}
                                                </InputLabel>
                                                <Select
                                                    labelId="age-select"
                                                    id=""
                                                    defaultValue={headCell.value}
                                                    onChange={(event) => {
                                                        dropDownChange(event.target.value, headCell);
                                                    }}
                                                    className={classes.select}
                                                    // label={headCell.type.charAt(0).toUpperCase() + headCell.type.slice(1)}
                                                    label={
                                                        headCell.type === 'queued_tag'
                                                            ? 'In Progress'
                                                            : headCell.type.charAt(0).toUpperCase() + headCell.type.slice(1)
                                                    }
                                                >
                                                    {dropDown[headCell.type] &&
                                                        dropDown[headCell.type].map((option) => (
                                                            <MenuItem value={option.dropdown_values}>{option.display_name}</MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        );
                                }
                            })()}
                        </TableCell>
                    ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight: {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
    },
    title: {
        flex: '1 1 100%'
    }
}));

// ===========================|| TABLE - TOOLBAR ||=========================== //

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
                    Nutrition
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow);
// ===========================|| TABLE - ENHANCED ||=========================== //

export default function EnhancedTable({ settings }) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [rows, setRows] = React.useState([]);
    const [monitorData, setMonitorData] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    const [dropDown, setDropdown] = React.useState([]);
    const [elements, setElements] = React.useState(['LocalendTime', 'LocalstartTime', 'SiO2', 'Al2O3', 'Fe2O3', 'CaO', 'TPH', 'totalTons']);

    // const [intervalStartDate, setIntervalStartDate] = React.useState('2022-06-28');
    const [intervalStartTime, setIntervalStartTime] = React.useState(format(subHours(new Date(), 8), 'yyyy-MM-dd HH:mm'));
    const [intervalEndTime, setIntervalEndTime] = React.useState(format(new Date(), 'yyyy-MM-dd HH:mm'));
    const [cumulativeIntervalMinutes, setCumulativeIntervalMinutes] = React.useState(120);

    const siteSettings = useSelector((state) => {
        if (state.companyReducer.siteSettings) {
            return state.companyReducer.siteSettings;
        }

        return null;
    });
    const { rangeStart, rangeEnd } = useSelector((state) => {
        if (state.commanReducer) {
            return state.commanReducer;
        }

        return null;
    });
    const getSettings = async (refresh = false, cumulativeIntervalMinutes1 = cumulativeIntervalMinutes) => {
        const { settings: option } = settings;
        const settinsOtion = JSON.parse(option);
        setElements(settinsOtion.data_columns);
        const { data: queuedData } = await tagQueuedServices.getAll();
        monitorServices.getColumns().then(async (response) => {
            const { data } = response;
            const dataColumns = [];
            data.forEach(async (item) => {
                if (item.type === 'interval') {
                    const { data } = await analysisService.averageByInterval(item.value);

                    const h = monitorData;
                    h[item.value] = data;
                    setMonitorData([...h]);
                } else if (item.type === 'tons') {
                    const { data } = await analysisService.averageByTon(item.value);
                    const h = monitorData;
                    h[item.value] = data;
                    setMonitorData([...h]);
                } else if (item.type === 'custom_interval') {
                    const { data } = await analysisService.average(
                        format(new Date(item.start_time), 'yyyy-MM-dd HH:mm'),
                        format(new Date(), 'yyyy-MM-dd HH:mm')
                    );

                    const h = monitorData;
                    h[99] = data[0];
                    setMonitorData([...h]);
                } else if (item.type === 'no_filter_tons') {
                    const { data } = await analysisService.averageByInterval(cumulativeIntervalMinutes1);
                    const h = monitorData;
                    h[100] = data;
                    setMonitorData([...h]);
                } else if (item.type === 'interval_range') {
                    const { data } = await analysisService.average(item.start_time, item.end_time);
                    // data[0].LocalendTime = intervalEndTime1;
                    // data[0].LocalstartTime = intervalStartTime1;

                    const h = monitorData; //
                    h[88] = data[0];
                    setMonitorData([...h]);
                } else if (item.type === 'queued_tag') {
                    data.forEach((entity) => {
                        if (entity.type === 'queued_tag' && queuedData.length > 0) {
                            entity.value = queuedData[0].tagID;
                            dataColumns.push(entity);
                        } else if (
                            entity.type === 'interval' ||
                            entity.type === 'tons' ||
                            entity.type === 'custom_interval' ||
                            entity.type === 'interval_range' ||
                            entity.type === 'no_filter_tons'
                        ) {
                            dataColumns.push(entity);
                        }
                    });
                    const h = monitorData;
                    h[queuedData[0]?.tagID] = queuedData[0];
                    setMonitorData([...h]);
                }
            });

            setColumns(dataColumns || data);
        });
        const dropDownsOption = {};
        const { data: tempDropDowns } = await monitorServices.dropdowns();
        tempDropDowns.forEach((item) => {
            dropDownsOption[item.type] = [];
        });
        tempDropDowns.forEach((item) => {
            dropDownsOption[item.type].push(item);
        });
        dropDownsOption.queued_tag = [];
        queuedData.forEach((item) => {
            dropDownsOption.queued_tag.push({ display_name: item.tagName, dropdown_values: item.tagID, type: 'queued_tag' });
        });
        setDropdown(dropDownsOption);

        analysisService
            .getAll()
            .then((results) => {
                // alert(JSON.stringify(results));
                const { data } = results;
                setRows(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(() => {
        getSettings(false);
    }, []);

    React.useEffect(() => {
        const refreshInterval = setInterval(() => {
            getSettings(true, intervalStartTime, intervalEndTime, cumulativeIntervalMinutes);
        }, 30000);
        return () => {
            clearInterval(refreshInterval);
        };
    }, [rangeStart, rangeEnd, intervalStartTime, intervalEndTime, cumulativeIntervalMinutes]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedId = rows.map((n) => n.name);
            setSelected(newSelectedId);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const dropDownChange = async (value, col) => {
        monitorServices.updateCol(col?.id, { value, col }).then(async (response) => {});
        if (col.type === 'interval') {
            console.log(value, col);
            const { data } = await analysisService.averageByInterval(value);

            const h = monitorData;
            h[col.value] = data;
            setMonitorData({ ...monitorData });
        } else if (col.type === 'tons') {
            const { data } = await analysisService.averageByTon(value);
            const h = monitorData;
            h[col.value] = data;
            setMonitorData({ ...monitorData });
        } else if (col.type === 'queued_tag') {
            const { data } = await analysisService.averageByTon(value);
            const h = monitorData;
            h[col.value] = data;
            setMonitorData({ ...monitorData });
        } else if (col.type === 'custom_interval') {
            // alert(value);
            const diff = differenceInMinutes(new Date(), new Date(value));
            console.log('magic');
            const { data } = await analysisService.average(
                format(new Date(value), 'yyyy-MM-dd HH:mm'),
                format(new Date(), 'yyyy-MM-dd HH:mm')
            );
            console.log('magic data1', data);
            setCumulativeIntervalMinutes(diff);

            const h = monitorData;
            h[99] = data[0];
            setMonitorData({ ...monitorData });
        } else if (col.type === 'interval_range') {
            const { data } = await analysisService.average(value.start, value.end);
            const h = monitorData; // interval_range
            data[0].LocalendTime = value.end;
            data[0].LocalstartTime = value.start;
            setIntervalStartTime(value.start);
            setIntervalEndTime(value.end);
            h[88] = data[0];
            setMonitorData({ ...monitorData });
        } else {
            analysisService.averageByInterval(8);
        }
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const getColor = (ele, value) => {
        const { setPoints } = siteSettings;
        const cSetpoint = setPoints.find((sp) => sp.sp_name === ele.columnName);
        if (cSetpoint !== undefined) {
            const spValue = parseFloat(cSetpoint.sp_value_num);
            const tolarence = parseFloat(cSetpoint.sp_tolerance_ulevel);
            const lLimit = spValue - tolarence;
            const uLimit = tolarence + spValue;
            // if (lLimit <= value && uLimit <= value) {
            if (value >= lLimit && value <= uLimit) {
                return 'success.dark';
            }
            return 'error.dark';
        }
        return 'dark';
    };
    const getFilteredValue = (ele, value) => {
        if (ele === 'LocalendTime' || ele === 'LocalstartTime') {
            return format(new Date(value), 'Y-MM-d HH:mm');
        }
        if (ele === 'Cl' && value !== null) {
            const floatvar = parseFloat(value);
            return floatvar.toFixed(3);
        }
        if (value === null) {
            return '0.00';
        }
        const floatv = parseFloat(value);
        return floatv.toFixed(2);

        // return /value;
    };

    return (
        <Grid item xs={12} sm={6} lg={12}>
            <MainCard content={false} title="Real-time Analysis Results" darkTitle="123">
                <TableContainer className={classes.TableContainer}>
                    <Table className={classes.table} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        {dropDown && (
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                                columns={columns}
                                dropDown={dropDown}
                                dropDownChange={dropDownChange}
                            />
                        )}
                        <TableBody>
                            {stableSort(elements, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);

                                    return (
                                        <StyledTableRow
                                            hover
                                            onClick={(event) => handleClick(event, row)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isItemSelected}
                                        >
                                            {monitorData && columns && (
                                                <TableCell
                                                    align="left"
                                                    padding="normal"
                                                    className={classes.TableCell}
                                                    sx={{
                                                        backgroundColor: '#AFE3FD',
                                                        fontSize: 16
                                                        // fontWeight: 'bold'
                                                    }}
                                                >
                                                    {row.label}
                                                </TableCell>
                                            )}
                                            {monitorData &&
                                                columns &&
                                                columns.map(
                                                    (headCell) =>
                                                        monitorData[headCell.value] && (
                                                            <TableCell
                                                                key={headCell.id}
                                                                align="right"
                                                                padding="normal"
                                                                className={classes.TableCell}
                                                                sx={{
                                                                    color: getColor(row, monitorData[headCell.value][row.columnName]),
                                                                    fontSize: 17,
                                                                    fontWeight: 'bold'
                                                                }}
                                                            >
                                                                {monitorData[headCell.value] &&
                                                                    getFilteredValue(
                                                                        row.columnName,
                                                                        monitorData[headCell.value][row.columnName]
                                                                    )}
                                                            </TableCell>
                                                        )
                                                )}
                                        </StyledTableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>
        </Grid>
    );
}
