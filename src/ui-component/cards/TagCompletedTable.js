import PropTypes from 'prop-types';
import * as React from 'react';

import { tagCompletedServices } from '_services';
import { useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import ReactExport from 'react-export-excel';
import { toast } from 'react-toastify';
import AverageBlockStd from './AverageBlockStd';
import ExportCompletedTagData from './ExportCompletedTagData';

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
    TablePagination,
    TableSortLabel,
    TableRow,
    Toolbar,
    Tooltip,
    Typography,
    Grid,
    Box,
    CardContent,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@material-ui/core';
import { visuallyHidden } from '@material-ui/utils';

// third-party
import clsx from 'clsx';

// project imports
import Pagination from '../extended/Pagination';

// import ProductAdd from './ProductAdd';

// assets
import DeleteIcon from '@material-ui/icons/Delete';
import ExplicitOutlined from '@material-ui/icons/ExplicitOutlined';

const intervals = [
    { value: '1', label: '1 minute' },
    { value: '5', label: '5 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '240', label: '4 hour' },
    { value: '480', label: '8 hour' }
];

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
                <Tooltip title="Export to Excel">
                    <IconButton>
                        <ExplicitOutlined />
                    </IconButton>
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

export default function EnhancedTable({ settings, tag }) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [rows, setRows] = React.useState([]);
    const [totalRecords, setTotalRecords] = React.useState(10);
    const [allRecords, setAllRecords] = React.useState([]);
    const [headCells, setHeadCells] = React.useState([]);
    const [interval, setInterval] = React.useState('1');

    const dateRange = useSelector((state) => {
        if (state.commanReducer) {
            return state.commanReducer;
        }

        return null;
    });

    const siteSettings = useSelector((state) => {
        if (state.companyReducer.siteSettings) {
            return state.companyReducer.siteSettings;
        }

        return null;
    });

    React.useEffect(() => {
        // const r = settings;
        try {
            const options = JSON.parse(settings.settings);
            setHeadCells(options.data_columns);
        } catch (e) {
            console.error(e);
        }

        tagCompletedServices
            .getData(tag.average.tagID, page, rowsPerPage, interval)
            .then(async (results) => {
                const { data } = results;
                console.log(data);
                setRows([...data.data]);
                setTotalRecords(data.totalRecords);
            })
            .catch((err) => {
                toast.error('Something went wrong!');
                console.log(err);
            });
    }, [page, dateRange, interval]);
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

    const getFilteredValue = (ele, value) => {
        if (ele.columnName === 'LocalstartTime' || ele.columnName === 'LocalendTime' || ele.columnName === 'tagGroupName') {
            return value; // format(new Date(value), 'Y-MM-d HH:mm');
        }
        if (ele.columnName === 'tagName' || ele.columnName === 'status') {
            return value;
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

    const handleIntervalChange = (event) => {
        setInterval(event.target.value);
    };

    return (
        <Grid item xs={12} sm={6} lg={12} spacing={gridSpacing}>
            <Box sx={{ backgroundColor: '#FFFFFF', paddingTop: '10px' }}>
                <CardContent>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={gridSpacing}>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="subtitle1" component="p">
                                Tag <Chip label={tag.average.tagName} /> Start Time : <Chip label={tag.average.LocalstartTime} /> - End Time
                                : <Chip label={tag.average.LocalendTime} />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                            <FormControl variant="outlined" style={{ width: '100px' }}>
                                <InputLabel id="interval-select-label">Sub Interval</InputLabel>
                                <Select
                                    labelId="interval-select-label"
                                    id="interval-select"
                                    value={interval}
                                    onChange={handleIntervalChange}
                                    label="Interval"
                                >
                                    {intervals.map((interval) => (
                                        <MenuItem key={interval.value} value={interval.value}>
                                            {interval.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <ExportCompletedTagData tagID={tag?.average.tagID} page={page} rowsPerPage={rowsPerPage} interval={interval} />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={12}>
                            <AverageBlockStd
                                settings={settings}
                                LocalendTime={tag.LocalendTime}
                                LocalstartTime={tag.LocalstartTime}
                                tag={tag}
                            />
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
                            {rows &&
                                stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
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
                                                >
                                                    {getFilteredValue(headCell, row[headCell.columnName])}
                                                </StyledTableCell>
                                            ))}
                                        </StyledTableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* table pagination */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <TablePagination
                        rowsPerPageOptions={[50, 75, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Pagination
                        className="pagination-bar"
                        currentPage={page}
                        totalCount={totalRecords}
                        pageSize={rowsPerPage}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </Box>
        </Grid>
    );
}
