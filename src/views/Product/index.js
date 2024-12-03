import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { makeStyles, useTheme, withStyles } from '@material-ui/styles';
import {
    CardContent,
    Checkbox,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
    Box
} from '@material-ui/core';
import { visuallyHidden } from '@material-ui/utils';

// third-party
import clsx from 'clsx';

// project imports
import ProductAdd from './ProductAdd';

// assets
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterListTwoTone';
import PrintIcon from '@material-ui/icons/PrintTwoTone';
import FileCopyIcon from '@material-ui/icons/FileCopyTwoTone';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/AddTwoTone';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

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

// table data
function createData(id, name, category, price, date, qty) {
    return { id, name, category, price, date, qty };
}

const rowsInitial = [
    createData('790841', 'Samsung TV 32” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('790842', 'Iphone 11 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('798699', 'Samsung TV 34” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('790752', 'Iphone 12 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('790955', 'Samsung TV 36” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('790785', 'Iphone 13 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('800837', 'Samsung TV 38” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('810365', 'Iphone 14 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('810814', 'Samsung TV 40” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('820385', 'Iphone 15 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('820885', 'Samsung TV 42” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('830390', 'Iphone 16 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('830879', 'Samsung TV 44” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('900111', 'Iphone 17 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('900836', 'Samsung TV 46” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('900112', 'Iphone 18 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('900871', 'Samsung TV 48” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('910232', 'Iphone 19 Pro Max', 'Television', 5000, '12.07.2018', 2),
    createData('910886', 'Samsung TV 50” LED Retina', 'Television', 2500, '12.07.2018', 5),
    createData('910232', 'Iphone 20 Pro Max', 'Television', 5000, '12.07.2018', 2)
];

// table sort
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

// table header options
const headCells = [
    {
        id: 'id',
        numeric: true,
        label: 'ID',
        align: 'center'
    },
    {
        id: 'name',
        numeric: false,
        label: 'Product Name',
        align: 'left'
    },
    {
        id: 'category',
        numeric: false,
        label: 'Category',
        align: 'left'
    },
    {
        id: 'price',
        numeric: true,
        label: 'Price',
        align: 'right'
    },
    {
        id: 'date',
        numeric: true,
        label: 'Date',
        align: 'center'
    },
    {
        id: 'qty',
        numeric: true,
        label: 'QTY',
        align: 'right'
    }
];

// style const
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

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1)
    },
    highlight: {
        color: theme.palette.secondary.main
    },
    title: {
        flex: '1 1 100%'
    }
}));

// ===========================|| TABLE HEADER ||=========================== //

function EnhancedTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theme, selected }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <StyledTableRow>
                {numSelected > 0 && (
                    <StyledTableCell padding="none" colSpan={7}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                    </StyledTableCell>
                )}
                {numSelected <= 0 &&
                    headCells.map((headCell) => (
                        <StyledTableCell
                            key={headCell.id}
                            align={headCell.align}
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
                {numSelected <= 0 && (
                    <StyledTableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                        <Typography variant="subtitle1" sx={{ color: 'white' }}>
                            Action
                        </Typography>
                    </StyledTableCell>
                )}
            </StyledTableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    theme: PropTypes.object,
    selected: PropTypes.array,
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

// ===========================|| TABLE HEADER TOOLBAR ||=========================== //

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
                <Typography className={classes.title} color="inherit" variant="h4" component="div">
                    {numSelected} Selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Nutrition
                </Typography>
            )}

            {numSelected > 0 && (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

// ===========================|| PRODUCT LIST ||=========================== //

const Product = () => {
    const classes = useStyles();
    const theme = useTheme();

    // show a right sidebar when clicked on new product
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState('');
    const [rows, setRows] = React.useState(rowsInitial);

    const handleSearch = (event) => {
        const newString = event.target.value;
        setSearch(newString);

        if (newString) {
            const newRows = rows.filter((row) => {
                let matches = true;

                const properties = ['name', 'category', 'price', 'qty', 'id'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setRows(newRows);
        } else {
            setRows(rowsInitial);
        }
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
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ backgroundColor: '#FFFFFF' }}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                )
                            }}
                            onChange={handleSearch}
                            placeholder="Search Product"
                            value={search}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                        <Tooltip title="Copy">
                            <IconButton>
                                <FileCopyIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Print">
                            <IconButton>
                                <PrintIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter">
                            <IconButton>
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>

                        {/* product add & dialog */}
                        <Tooltip title="Add">
                            <Fab
                                color="primary"
                                size="small"
                                onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: '32px', height: '32px', minHeight: '32px' }}
                            >
                                <AddIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                        <ProductAdd open={open} handleCloseDialog={handleCloseDialog} />
                    </Grid>
                </Grid>
            </CardContent>

            {/* table */}
            <TableContainer>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        theme={theme}
                        selected={selected}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <StyledTableCell
                                            align="center"
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900' }}
                                            >
                                                {' '}
                                                #{row.id}{' '}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.name)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900' }}
                                            >
                                                {' '}
                                                {row.name}{' '}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell>{row.category}</StyledTableCell>
                                        <StyledTableCell align="right">{row.price}$</StyledTableCell>
                                        <StyledTableCell align="center">{row.date}</StyledTableCell>
                                        <StyledTableCell align="right">{row.qty}</StyledTableCell>
                                        <StyledTableCell align="center" sx={{ pr: 3 }}>
                                            <IconButton>
                                                <MoreHorizOutlinedIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                        </StyledTableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows
                                }}
                            >
                                <StyledTableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default Product;
