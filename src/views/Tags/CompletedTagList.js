import PropTypes from 'prop-types';
import * as React from 'react';
// import CRUDController from 'ui-component/CRUDController';
// import StatusRender from 'ui-component/StatusRender';
//  react-redux
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getStorageData } from 'utils/auth/auth';
import { tagCompletedServices, tagGroupService } from '_services';
import ReactExport from 'react-export-excel';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import MergeViewPopup from './MergeViewPopup';

// project imports
import TagResume from './TagResume';

// material-ui
import { makeStyles, useTheme, withStyles } from '@material-ui/styles';
import {
    CardContent,
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
    Checkbox,
    TextField,
    MenuItem
} from '@material-ui/core';

import { visuallyHidden } from '@material-ui/utils';
// third-party
import clsx from 'clsx';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Pagination from '../../ui-component/extended/Pagination';

// assets
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import CallMerge from '@material-ui/icons/CallMerge';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/AddTwoTone';
import ExplicitOutlined from '@material-ui/icons/ExplicitOutlined';

//  icons
import { IconEye, Iconydit } from '@tabler/icons';

import { useState } from 'react';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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

function EnhancedTableHead({
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    theme,
    selected,
    mergeTags,
    setOpenPopup,
    headCells,
    userRole
}) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {numSelected > 1 && (
                    <TableCell padding="none" colSpan={headCells.length + 1}>
                        <EnhancedTableToolbar
                            numSelected={selected.length}
                            mergeTags={mergeTags}
                            setOpenPopup={setOpenPopup}
                            headCells={headCells}
                        />
                    </TableCell>
                )}
                <StyledTableCell />
                {numSelected <= 1 && <StyledTableCell />}
                {numSelected <= 1 &&
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
                {userRole !== 'operator' && numSelected <= 1 && (
                    <StyledTableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'white' }}>
                            Actions
                        </Typography>
                    </StyledTableCell>
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
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

// ===========================|| TABLE HEADER TOOLBAR ||=========================== //

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, mergeTags, setOpenPopup } = props;

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
                <Tooltip title="Merge">
                    <IconButton onClick={setOpenPopup}>
                        <CallMerge fontSize="large" />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

// ===========================|| Completed Queued LIST ||=========================== //

const List = ({ path, onSelectCompleted, mergeTags, selectedCompletedTags, setOpenPopup, settings, onSetRefresh, refresh }) => {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('Tag Name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [originalRows, setoriginalRows] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [totalCount, setTotalCount] = React.useState(0);
    const [userData, setUserData] = React.useState(0);
    const [deleteId, setDeleteId] = React.useState('');
    const [deletetagName, setDeletetagName] = React.useState('');
    const [resumeId, setResumeId] = React.useState('');
    const [importBlock, setImportBlock] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userRole, setUserRole] = React.useState('');
    const [tagGroups, setTagGroups] = React.useState([]);
    const [tagGroupID, setTagGroupID] = React.useState([]);
    const { id } = useParams();
    const [mergeViewOpen, setMergeViewOpen] = React.useState(false);
    const [selectedTag, setSelectedTag] = React.useState(0);

    const [selectedTagID, setSelectedTagID] = React.useState(false);
    const [headCells, setHeadCells] = React.useState([]);

    // show a right sidebar when clicked on new product
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getTagCompleted = async (tagGroupID) => {
        try {
            const loggedUserData = getStorageData();
            setUserRole(loggedUserData.user.role);
            const { data: completedTags, count } = await tagCompletedServices.query(tagGroupID, page, rowsPerPage);
            console.log(completedTags);
            setRows([...completedTags]);
            setTotalCount(count);
            setoriginalRows(completedTags);
        } catch (e) {
            console.error(e);
        }
    };

    React.useEffect(() => {
        try {
            const options = JSON.parse(settings.settings);
            setHeadCells(options.data_columns);
        } catch (e) {
            console.error(e);
        }
        tagGroupService
            .getAllTags()
            .then((res) => {
                console.log(res);
                if (res && res.data) {
                    const data = res.data;
                    setTagGroups(data);
                    const firstTagGroupID = data[0]?.tagGroupID;

                    if (id === 'all') {
                        setTagGroupID(firstTagGroupID);
                        getTagCompleted(firstTagGroupID);
                    } else {
                        setTagGroupID(id);
                        getTagCompleted(id);
                    }
                }
            })
            .catch((err) => {
                toast.error('Something went wrong!');
                console.log(err.response);
            });

        const userData = getStorageData();
        setUserData(userData);
        setSelected([]);
    }, []);

    React.useEffect(() => {
        console.log(tagGroupID);
        if (tagGroupID !== '') {
            getTagCompleted(tagGroupID);
            setSelectedTag(0);
            setSelected([]);
        }
    }, [refresh, page]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    React.useEffect(() => {
        setSelected(selectedCompletedTags);
    }, [selectedCompletedTags]);

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
        await tagCompletedServices.deleteById(id);
        getTagCompleted(tagGroupID);
    };
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmResumeOpen, setResumeConfirmOpen] = useState(false);
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

    const handleChange = (event) => {
        // alert('hhh');
        setTagGroupID(event.target.value);
        getTagCompleted(event.target.value);
    };

    const getFilteredValue = (ele, value) => {
        if (ele.columnName === 'LocalstartTime' || ele.columnName === 'LocalendTime') {
            return format(new Date(value), 'Y-MM-d HH:mm');
        }
        if (ele.columnName === 'tagName') {
            return value;
        }
        if (ele.columnName === 'Cl' && value !== null) {
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
            <MainCard style={{ padding: 0 }} title="Completed Tags" darkTitle=" ">
                <CardContent>
                    {confirmResumeOpen && (
                        <TagResume
                            id={resumeId}
                            open={confirmResumeOpen}
                            handleCloseDialog={() => {
                                setResumeConfirmOpen(!confirmResumeOpen);
                                console.log(confirmResumeOpen);
                            }}
                            getData={() => {
                                getTagCompleted(tagGroupID);
                            }}
                        />
                    )}
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
                                placeholder="Search Tag"
                                size="small"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                            <TextField
                                select
                                label="Select Tag Group "
                                id="tagGroupID"
                                name="tagGroupID"
                                value={tagGroupID}
                                onChange={handleChange}
                                sx={{ width: '150px' }}
                            >
                                {tagGroups.map((tagGroup) => (
                                    <MenuItem value={tagGroup.tagGroupID}>{tagGroup.tagGroupName}</MenuItem>
                                ))}
                            </TextField>

                            <Tooltip title="Export to Excel">
                                <IconButton color="primary" style={{ paddingTop: '4px', paddingBottom: '0px' }}>
                                    {/* <ExplicitOutlined /> */}
                                    {rows && (
                                        <ExcelFile element={<ExplicitOutlined />} filename="Completed Tags List">
                                            <ExcelSheet data={rows} name="Completed Tags List">
                                                {headCells.map((column) => (
                                                    <ExcelColumn label={column.label} value={column.columnName} key={column.id} />
                                                ))}
                                            </ExcelSheet>
                                        </ExcelFile>
                                    )}
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </CardContent>

                <>
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
                                mergeTags={mergeTags}
                                setOpenPopup={setOpenPopup}
                                headCells={headCells}
                                userRole={userRole}
                            />
                            <TableBody>
                                {rows.map((row, index) => {
                                    const isItemSelected = isSelected(row.tagID);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <StyledTableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isItemSelected}
                                        >
                                            <StyledTableCell padding="checkbox">
                                                {userRole !== 'operator' && row.hasMerge !== 'true' && (
                                                    <Checkbox
                                                        color="primary"
                                                        onClick={(event) => onSelectCompleted(event, row.tagID)}
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId
                                                        }}
                                                    />
                                                )}

                                                {userRole !== 'operator' && row.hasMerge === 'true' && (
                                                    <IconButton>
                                                        <AddIcon
                                                            onClick={() => {
                                                                setMergeViewOpen(true);
                                                                setSelectedTagID(row.tagID);
                                                            }}
                                                        />
                                                    </IconButton>
                                                )}
                                            </StyledTableCell>
                                            <StyledTableCell padding="checkbox" />
                                            {headCells.map((col) => (
                                                <StyledTableCell align="left">{getFilteredValue(col, row[col.columnName])}</StyledTableCell>
                                            ))}

                                            {userRole !== 'operator' && (
                                                <StyledTableCell align="center" sx={{ pr: 3 }}>
                                                    <IconButton
                                                        aria-label="edit"
                                                        onClick={() => {
                                                            setResumeConfirmOpen(true);
                                                            setResumeId(row.tagID);
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton component={Link} to={`/soros/tag-completed/view/${row.tagID}`}>
                                                        <IconEye />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => {
                                                            setConfirmOpen(true);
                                                            setDeleteId(row.tagID);
                                                            setDeletetagName(row.tagName);
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </StyledTableCell>
                                            )}
                                        </StyledTableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div>
                        <Dialog
                            style={{ backgroundColor: 'transparent', opacity: 1 }}
                            open={confirmOpen}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">Delete Completed tag</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Do you want to delete the {deletetagName} Tag ?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                        setConfirmOpen(false);
                                        deleteRecord(deleteId);
                                    }}
                                >
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    {mergeViewOpen && <MergeViewPopup showMegeView tagID={selectedTagID} />}
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
                            totalCount={totalCount}
                            pageSize={rowsPerPage}
                            onPageChange={(page) => setPage(page)}
                        />
                    </div>
                </>
            </MainCard>
        </Grid>
    );
};

export default List;
