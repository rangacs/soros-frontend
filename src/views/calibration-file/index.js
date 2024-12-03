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
    CardContent,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@material-ui/core';

import { visuallyHidden } from '@material-ui/utils';
// third-party
import clsx from 'clsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// project imports
import Pagination from '../../ui-component/extended/Pagination';
import config from '../../config';
// assets
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/AddTwoTone';
import MainCard from 'ui-component/cards/MainCard';

//  icons
import { IconEdit } from '@tabler/icons';
import { useState } from 'react';
import Form from './Form';

const baseURL = config.apiUrl;

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
        id: 'cal',
        numeric: false,
        disablePadding: false,
        label: 'Output Parameter',
        columnName: 'cal'
    },
    {
        id: 'offset',
        numeric: false,
        disablePadding: false,
        label: 'Offset',
        columnName: 'offset'
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

const CalibrationFile = () => {
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
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleSendToAPI = () => {
        // Replace 'your-api-endpoint' with your actual API endpoint
        const apiUrl = 'https://your-api-endpoint';

        // Make a POST request to your API with the selected option
        /*
        axios
            .post(apiUrl, { selectedOption })
            .then((response) => {
                // Handle the API response if needed
                console.log(response.data);
            })
            .catch((error) => {
                // Handle errors
                console.error('Error sending data to API:', error);
            });

            */
    };

    const getData = React.useCallback(() => {
        axios({
            url: `${baseURL}/calibration`,
            method: 'get'
        })
            .then((res) => {
                if (res && res.data) {
                    const data = res.data.data;
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
        axios({
            url: `${baseURL}/calibration/delete?id=${id} `,
            method: 'delete'
        })
            .then((res) => {
                if (res.data.message) {
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
            <MainCard style={{ padding: 0 }} title="Calibration File" darkTitle=" ">
                <>
                    <div>
                        <FormControl>
                            <InputLabel id="dropdown-label">Select an Option</InputLabel>
                            <Select labelId="dropdown-label" id="dropdown" value={selectedOption} onChange={handleChange}>
                                <MenuItem value="option1">Option 1</MenuItem>
                                <MenuItem value="option2">Option 2</MenuItem>
                                <MenuItem value="option3">Option 3</MenuItem>
                                {/* Add more MenuItem components as needed */}
                            </Select>
                        </FormControl>

                        <div style={{ marginTop: '20px' }}>
                            {selectedOption && <p>Selected Option: {selectedOption}</p>}

                            <Button variant="contained" color="primary" onClick={handleSendToAPI} disabled={!selectedOption}>
                                Send to API
                            </Button>
                        </div>
                    </div>
                </>
            </MainCard>
        </Grid>
    );
};

export default CalibrationFile;
