import PropTypes from 'prop-types';
import * as React from 'react';

import { gridSpacing } from 'store/constant';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import {
    InputAdornment,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Tooltip,
    Typography,
    DialogContentText,
    TextField,
    Fab,
    Box,
    CardContent
} from '@material-ui/core';

import { visuallyHidden } from '@material-ui/utils';

// third-party
import clsx from 'clsx';
import { toast } from 'react-toastify';

// project imports
import Pagination from '../../ui-component/extended/Pagination';
// assets
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/AddTwoTone';
import MainCard from 'ui-component/cards/MainCard';

//  icons
import { IconEdit } from '@tabler/icons';
import { useState } from 'react';
import Form from './Form';

// services
import { FormulaBuilderService } from '_services';

const useStyles = makeStyles({
    tableContainer: {
        marginTop: '15px',
        '& .css-17pmaar-MuiCardContent-root': {
            padding: '16px !important'
        }
    },
    root: {
        width: '100%'
    },
    paper: {
        width: '100%'
        // marginBottom: thee.spacing(2)
    },
    table: {
        minWidth: 750
    },
    sortSpan: visuallyHidden,
    boxContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flexEnd: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchClass: {
        display: 'block',
        margin: 'auto 0px 0px 0px',
        width: '100px',
        boxSizing: 'border-box',

        borderRadius: '4px',
        fontSize: '16px',
        padding: '6.5px',
        transition: 'all 0.4s ease-in-out',
        outline: 'none'
    },
    searchFocusClass: {
        flex: '0.45 1 auto !important'
    },
    TableCell: {
        backgroundColor: '#2287CC',
        color: '#fff !important',
        '&> h6': {
            color: '#fff !important'
        }
    }
});

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

// table header
const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
        columnName: 'name'
    },
    {
        id: 'formula',
        numeric: false,
        disablePadding: false,
        label: 'Formula',
        columnName: 'formula'
    }
];

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

function EnhancedTableHead({ classes, order, orderBy, numSelected, onRequestSort, theme, selected }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {numSelected > 0 && (
                    <TableCell padding="none" colSpan={7}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                    </TableCell>
                )}
                {numSelected <= 0 &&
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                            className={classes.TableCell}
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
                        </TableCell>
                    ))}
                {numSelected <= 0 && (
                    <TableCell sortDirection={false} align="center" sx={{ pr: 3 }} className={classes.TableCell}>
                        <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : 'grey.900' }}
                        >
                            Action
                        </Typography>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    theme: PropTypes.object,
    selected: PropTypes.array,
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired
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

// ===========================|| Lop days LIST ||=========================== //

const FormulaBuilder = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('Employee Number');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [originalRows, setoriginalRows] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [deleteId, setDeleteId] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState(0);

    const getData = React.useCallback(() => {
        FormulaBuilderService.getAllFormulaBuilder()
            .then((res) => {
                if (res && res.data) {
                    const data = res.data;
                    setRows(data);
                    setoriginalRows(data);
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    React.useEffect(() => {
        getData();
    }, [getData]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const RenderCell = ({ cellSetting, value }) => <p>{value}</p>;
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedId = rows.map((n) => n.name);
            setSelected(newSelectedId);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const emptyRows = page - 1 > 0 ? Math.max(0, (1 + page - 1) * rowsPerPage - rows.length) : 0;

    const deleteRecord = async (id) => {
        FormulaBuilderService.deleteFormulaBuilder(id)
            .then((res) => {
                if (res.message) {
                    toast.success('Deleted successfully!');
                    getData();
                }
            })
            .catch((err) => {
                toast.error("Sorry!. Couldn't delete, please try again!");
                console.log(err.response);
            });
    };

    const editHandler = (id) => {
        setId(id);
        setOpen(!open);
    };

    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleSearch = (event) => {
        const newString = event.target.value;
        // setSearch(newString);

        if (newString) {
            const newRows = originalRows.filter((row) => {
                let matches = true;

                const properties = headCells.map((obj) => obj.columnName);
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property] && row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
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
            setRows(originalRows);
        }
    };

    return (
        <Grid item xs={12} sm={6} lg={12} spacing={gridSpacing}>
            <MainCard style={{ padding: 0 }} title="Formula Builder" darkTitle=" ">
                <Box sx={{ backgroundColor: '#FFFFFF', paddingTop: '10px' }}>
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
                                    placeholder="Search"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                                <Tooltip title="Add Formula">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        onClick={() => {
                                            setId(0);
                                            setOpen(!open);
                                        }}
                                        sx={{ boxShadow: 'none', ml: 1, width: '32px', height: '32px', minHeight: '32px' }}
                                    >
                                        <AddIcon fontSize="small" style={{ color: '#fff' }} />
                                    </Fab>
                                </Tooltip>
                                {open && <Form id={id} open={open} handleCloseDialog={() => setOpen(!open)} getData={getData} />}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Box>
                <>
                    {/* table */}
                    <TableContainer className={classes.mainContainer}>
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
                                    .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.name);

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={index}
                                                selected={isItemSelected}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                {headCells.map((col) => (
                                                    <TableCell align="left">
                                                        <RenderCell cellSetting={col} value={row[col.columnName]} />
                                                    </TableCell>
                                                ))}

                                                <TableCell align="center" sx={{ pr: 3 }}>
                                                    <IconButton component={Button}>
                                                        <IconEdit onClick={() => editHandler(row.id)} />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => {
                                                            setConfirmOpen(true);
                                                            setDeleteId(row.id);
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <div>
                                                        <Dialog
                                                            style={{ backgroundColor: 'transparent', opacity: 0.4 }}
                                                            open={confirmOpen}
                                                            // onClose={handleClose}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                        >
                                                            <DialogTitle id="alert-dialog-title">Delete Formula</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    Do you want to delete the Formula ?
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={() => setConfirmOpen(!confirmOpen)}>Cancel</Button>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="error"
                                                                    onClick={() => {
                                                                        setConfirmOpen(!confirmOpen);
                                                                        deleteRecord(deleteId);
                                                                    }}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* table pagination */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
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
                            totalCount={rows.length}
                            pageSize={rowsPerPage}
                            onPageChange={(page) => setPage(page)}
                        />
                    </div>
                </>
            </MainCard>
        </Grid>
    );
};

export default FormulaBuilder;
