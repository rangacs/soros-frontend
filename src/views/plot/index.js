import React, { useRef } from 'react';

import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper,
    FormControlLabel,
    Grid,
    CardContent,
    FormGroup,
    Switch
} from '@material-ui/core';
// import { visuallyHidden } from "@material-ui/styles/";
import { makeStyles } from '@material-ui/styles/';
import ReactExport from 'react-export-excel';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { gridSpacing } from 'store/constant';
import TableWidget from 'ui-component/cards/TableWidget';
import AverageTableWidget from 'ui-component/cards/AverageTableWidget';

import layoutWidgetServices from '_services/layout.widget.services';
import AnalysisChartCard from '../widget/Chart/AnalysisChartCard';

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('LocalendTime');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const [layoutId, setLayoutId] = React.useState(1);
    const [dateFormat, setDateFormat] = React.useState('yyyy-MM-dd HH:mm:ss');
    const [layoutWidget, setLayoutWidget] = React.useState([]);
    const [rolling, setRolling] = React.useState(0);

    React.useEffect(() => {
        layoutWidgetServices.getByLayoutId(2).then((layout) => {
            const { result } = layout;
            setLayoutWidget(result);
        });
    }, []);

    const fromDateRef = useRef();
    const toDateRef = useRef();

    const RenderWidget = ({ widget }) => {
        const i = 0;
        switch (widget?.type) {
            case 'table':
                return <TableWidget settings={widget} />;
            case 'Charts':
                return <AnalysisChartCard settings={widget} rolling={rolling} />;
            case 'average':
                return <AverageTableWidget settings={widget} />;
            // return <p />;
            case 'monitor':
                return <p />;
            default:
                return <p />;
        }
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
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

    const changeRollingMin = (event, flag) => {
        // alert(flag);
        // console.log(event.target.value);
        setRolling(rolling === 1 ? 0 : 1);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12} md={6}>
                <CardContent sx={{ backgroundColor: 'white' }}>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h3" id="tableTitle" component="h3">
                                Plot
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                            <FormControlLabel
                                control={<Switch onClick={(event, flag) => changeRollingMin(event, flag)} />}
                                label="Rolling Minute"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Grid>
            <Grid item xs={12} lg={12} md={6}>
                <Grid container spacing={gridSpacing}>
                    {layoutWidget && layoutWidget.map((widget) => <RenderWidget widget={widget} rolling={rolling} />)}
                </Grid>
            </Grid>
        </Grid>
    );
}
