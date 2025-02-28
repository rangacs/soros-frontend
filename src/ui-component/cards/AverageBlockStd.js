/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import * as React from 'react';
// import analysisService from '_services/analysis.services';
import analysisServices from '_services/analysis.services';

import { useSelector } from 'react-redux';
import { gridSpacing } from 'store/constant';
import ReactExport from 'react-export-excel';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

// material-ui
import { makeStyles, withStyles } from '@material-ui/styles';
import { alpha, Table, TableBody, TableCell, TableContainer, TableHead, TableSortLabel, TableRow, Grid, Box } from '@material-ui/core';
import { visuallyHidden } from '@material-ui/utils';
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

export default function EnhancedTable({ settings, LocalstartTime, LocalendTime, tag, interval }) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const [stdRow, setStdRow] = React.useState([]);
    const [allRecords, setAllRecords] = React.useState([]);
    const [headCells, setHeadCells] = React.useState([]);
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
        analysisServices
            .averagestd(tag.average.LocalstartTime, tag.average.LocalendTime, interval)
            .then(async (results) => {
                const { data } = results;
                // alert(JSON.stringify(data));
                console.log(data);
                setStdRow(data[1]);
                setRows(data);
            })
            .catch((err) => {
                toast.error('Something went wrong!');
                console.log(err.response);
            });
    }, [tag, interval]);

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

    const getFilteredValue = (ele, value, tagName) => {
        if (ele.columnName === 'LocalstartTime' || ele.columnName === 'LocalendTime') {
            return value; // format(new Date(value), 'Y-MM-d HH:mm');
        }
        if (ele.columnName === 'tagName' || ele.columnName === 'status') {
            return value;
        }
        if (value === null) {
            return '0.00';
        }
        if (tagName === 'Standard Deviation' && ele.columnName === 'totalTons') {
            return '-';
        }
        if (ele.columnName === 'Cl' && value !== null) {
            const floatvar = parseFloat(value);
            return floatvar.toFixed(3);
        }
        const floatv = parseFloat(value);
        return floatv.toFixed(2);

        // return /value;
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page - 1 > 0 ? Math.max(0, (1 + (page - 1)) * rowsPerPage - rows.length) : 0;

    return (
        <Grid item xs={12} sm={6} lg={12} spacing={gridSpacing}>
            <Box sx={{ backgroundColor: '#FFFFFF' }}>
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
                            <StyledTableRow hover role="checkbox" tabIndex={-1}>
                                {headCells.map((headCell) => (
                                    <StyledTableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding={headCell.disablePadding ? 'none' : 'normal'}
                                    >
                                        {getFilteredValue(headCell, tag.average[headCell.columnName], tag.average.tagName)}
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                            <StyledTableRow hover role="checkbox" tabIndex={-1}>
                                {headCells.map((headCell) => (
                                    <StyledTableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        padding={headCell.disablePadding ? 'none' : 'normal'}
                                        sx={{
                                            fontSize: 14,
                                            backgroundColor: 'lightblue'
                                        }}
                                    >
                                        {getFilteredValue(headCell, stdRow[headCell.columnName], tag.std.tagName)}
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Grid>
    );
}
