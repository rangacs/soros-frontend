import PropTypes from 'prop-types';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import analysisService from '_services/analysis.services';
import ReactExport from 'react-export-excel';
import { toast } from 'react-toastify';
// material-ui
import { makeStyles, withStyles } from '@material-ui/styles';
import { format, subHours } from 'date-fns';
import { HISTORICAL_DATA } from 'store/actions';
import Export from './Export';

import {
    alpha,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableSortLabel,
    TableRow,
    Toolbar,
    Tooltip,
    Typography,
    Grid,
    Chip,
    Popper,
    Box,
    CardContent,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    Paper,
    ClickAwayListener,
    Button,
    TextField
} from '@material-ui/core';
import { visuallyHidden } from '@material-ui/utils';

// third-party
import clsx from 'clsx';

import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
// project imports
import Pagination from '../extended/Pagination';

// import ProductAdd from './ProductAdd';

// assets
import DeleteIcon from '@material-ui/icons/Delete';
import ExplicitOutlined from '@material-ui/icons/ExplicitOutlined';

// table data
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
    sortSpan: visuallyHidden
}));

// ===========================|| TABLE - HEADER ||=========================== //

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.sortSpan}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
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
    rowCount: PropTypes.number.isRequired,
    headCells: PropTypes.number.isRequired
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
                <Tooltip title="Export to Excel">
                    <IconButton color="primary" />
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};
// style constant
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: `#2287CC`,
        color: `${theme.palette.common.white} !important`
    },
    body: {
        fontSize: 14,
        paddingTop: `10px`,
        paddingBottom: `10px`
    }
}))(TableCell);

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
    const [page, setPage] = React.useState(1);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [rows, setRows] = React.useState([]);
    const [totalCount, setTotalCount] = React.useState([]);
    const dispatch = useDispatch();
    const [headCells, setHeadCells] = React.useState([]);
    const [intervalHour, setIntervalHour] = React.useState(1);
    const [cumulativeDialogOpen, setCumulativeOpen] = React.useState(false);
    const [intervalDialogOpen, setIntervalDialogOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState('2022-06-28');
    const [startTime, setStartTime] = React.useState('10:00');
    const [endDate, setEndDate] = React.useState('2022-06-28');
    const [endTime, setEndTime] = React.useState('10:00');
    const anchorRef = React.useRef(null);

    const [intervalStartDate, setIntervalStartDate] = React.useState('2022-06-28');
    const [intervalStartTime, setIntervalStartTime] = React.useState('10:00');

    const [intervalEndDate, setIntervalEndDate] = React.useState('2022-06-28');
    const [intervalEndTime, setIntervalEndTime] = React.useState('10:00');
    const { rangeStart, rangeEnd, refreshInterval, deactivateRefresh, historicalData, historicalStart, historicalEnd } = useSelector(
        (state) => {
            if (state.commanReducer) {
                return state.commanReducer;
            }

            return null;
        }
    );
    const handleToggle = () => {
        setCumulativeOpen(true);
    };
    const handleIntervalDialogToggle = () => setIntervalDialogOpen((prevOpen) => !prevOpen);
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setIntervalDialogOpen(false);
    };

    const siteSettings = useSelector((state) => {
        if (state.companyReducer.siteSettings) {
            return state.companyReducer.siteSettings;
        }

        return null;
    });
    const getColor = (ele, value) => {
        const { setPoints } = siteSettings;
        const cSetpoint = setPoints.find((sp) => sp.sp_name === ele);
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
        if (ele.columnName === 'LocalendTime') {
            return format(new Date(value), 'Y-MM-d HH:mm');
        }
        if (value === null) {
            return '0.00';
        }
        if (ele.columnName === 'Cl' && value !== null) {
            const floatvar = parseFloat(value);
            return floatvar.toFixed(3);
        }
        const floatv = parseFloat(value);
        return floatv.toFixed(2);

        // return /value;
    };

    React.useEffect(() => {
        // const r = settings;
        setStartDate(format(subHours(new Date(), 2), 'yyyy-MM-dd'));
        setStartTime(format(subHours(new Date(), 2), 'HH:mm'));

        setIntervalStartDate(format(subHours(new Date(), 8), 'yyyy-MM-dd'));
        setIntervalStartTime(format(subHours(new Date(), 8), 'HH:mm'));

        setIntervalEndDate(format(new Date(), 'yyyy-MM-dd'));
        setIntervalEndTime(format(new Date(), 'HH:mm'));
        try {
            const options = JSON.parse(settings.settings);
            setHeadCells(options.data_columns);
        } catch (e) {
            console.error(e);
        }

        const startTime = historicalData === 'yes' ? format(historicalStart, 'Y-MM-d HH:mm') : format(rangeStart, 'Y-MM-d HH:mm');
        const endTime = historicalData === 'yes' ? format(historicalEnd, 'Y-MM-d HH:mm') : format(rangeEnd, 'Y-MM-d HH:mm');
        analysisService
            .hourlyAverage(startTime, endTime, intervalHour, page, rowsPerPage)
            .then((results) => {
                console.log(results);
                // alert(JSON.stringify(results));
                const { data, totalCount } = results;
                setRows(data);
                setTotalCount(totalCount);
            })
            .catch((err) => {
                toast.error('Error in loading average page ');
            });
    }, [
        page,
        rangeStart,
        rangeEnd,
        refreshInterval,
        deactivateRefresh,
        historicalData,
        historicalStart,
        historicalEnd,
        intervalHour,
        rowsPerPage,
        settings.settings
    ]);

    const onSubmitInterval = async (value, intervalHour) => {
        // console.log(value);
        dispatch({
            type: HISTORICAL_DATA,
            historicalStart: new Date(value.start),
            historicalEnd: new Date(value.end),
            historicalData: 'yes'
        });
        analysisService
            .hourlyAverage(value.start, value.end, intervalHour, page, rowsPerPage)
            .then((results) => {
                const { data, totalCount } = results;
                setRows(data);
                setTotalCount(totalCount);
            })
            .catch(() => {
                toast.error('Error in loading average page ');
            });
    };

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const intervalStartDateTime = `${intervalStartDate} ${intervalStartTime}:00`;

    const intervalEndDateTime = `${intervalEndDate} ${intervalEndTime}:00`;

    const handleAverageHourChange = (event) => {
        setIntervalHour(event.target.value);
        analysisService
            .hourlyAverage(intervalStartDateTime || startTime, intervalEndDateTime || endTime, event.target.value)
            .then((results) => {
                const { data } = results;
                setRows(data);
            })
            .catch(() => {
                toast.error('Error in loading average page ');
            });
    };

    return (
        <Grid item xs={12} sm={6} lg={12}>
            <Box sx={{ backgroundColor: '#FFFFFF' }}>
                <CardContent>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h3" component="h3">
                                Analysis Hourly Average
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }} justify="space-around" spacing={4}>
                            <Box sx={{ m: 0.5 }}>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label"> Interval</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={intervalHour}
                                        label="Average Interval"
                                        onChange={handleAverageHourChange}
                                        sx={{ height: '40px' }}
                                    >
                                        <MenuItem value={1}>1 H</MenuItem>
                                        <MenuItem value={2}>2 H</MenuItem>
                                        <MenuItem value={3}>3 H</MenuItem>
                                        <MenuItem value={4}>4 H</MenuItem>
                                    </Select>
                                </FormControl>
                                <Chip
                                    sx={{ m: 1 }}
                                    classes={{ label: classes.profileLabel }}
                                    className={`${classes.profileChip} ${classes.chip}`}
                                    label="Data Interval"
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
                                                                    <Typography component="span" variant="h4" className={classes.name}>
                                                                        Date Interval
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                        <br />
                                                                        <div style={{ display: 'flex' }}>
                                                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                                                <DatePicker
                                                                                    renderInput={(props) => <TextField {...props} />}
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
                                                                                onChange={(e) => setIntervalStartTime(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        <div style={{ display: 'flex' }}>
                                                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                                                <DatePicker
                                                                                    renderInput={(props) => <TextField {...props} />}
                                                                                    label="End Time"
                                                                                    value={intervalEndDate}
                                                                                    onChange={(newValue) => {
                                                                                        setIntervalEndDate(format(newValue, 'yyyy-MM-dd'));
                                                                                    }}
                                                                                />
                                                                            </LocalizationProvider>
                                                                            <input
                                                                                type="text"
                                                                                value={intervalEndTime}
                                                                                onChange={(e) => setIntervalEndTime(e.target.value)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <Button
                                                                        onClick={() => {
                                                                            setCumulativeOpen(false);
                                                                            onSubmitInterval(
                                                                                {
                                                                                    start: `${intervalStartDate} ${intervalStartTime}:00`,
                                                                                    end: `${intervalEndDate} ${intervalEndTime}:00`
                                                                                },
                                                                                intervalHour
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

                                <Tooltip title="Export to Excel">
                                    <IconButton color="primary" style={{ paddingTop: '4px', paddingBottom: '0px' }}>
                                        {/* <ExplicitOutlined /> */}
                                        <Export
                                            startTime={
                                                historicalData === 'yes'
                                                    ? format(historicalStart, 'Y-MM-d HH:mm')
                                                    : format(rangeStart, 'Y-MM-d HH:mm')
                                            }
                                            endTime={
                                                historicalData === 'yes'
                                                    ? format(historicalEnd, 'Y-MM-d HH:mm')
                                                    : format(rangeEnd, 'Y-MM-d HH:mm')
                                            }
                                            intervalHour={intervalHour}
                                            page={1}
                                            rowsPerPage={1000}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>

                <TableContainer>
                    <Table className={classes.table} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                // .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    const isItemSelected = isSelected(row.name);

                                    return (
                                        <StyledTableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            {headCells.map((headCell) => (
                                                <StyledTableCell
                                                    key={headCell.id}
                                                    align={headCell.numeric ? 'right' : 'left'}
                                                    padding={headCell.disablePadding ? 'none' : 'normal'}
                                                    sx={{
                                                        color: false && getColor(headCell.columnName, row[headCell.columnName]),
                                                        fontSize: 14
                                                    }}
                                                >
                                                    {getFilteredValue(headCell, row[headCell.columnName])}
                                                </StyledTableCell>
                                            ))}
                                        </StyledTableRow>
                                    );
                                })}
                            {/* {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )} */}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* table pagination */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Pagination
                        className="pagination-bar"
                        currentPage={page}
                        totalCount={totalCount}
                        pageSize={rowsPerPage}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </Box>
        </Grid>
    );
}
