import React, { useRef } from 'react';

import { Grid } from '@material-ui/core';
// import { visuallyHidden } from "@material-ui/styles/";
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { gridSpacing } from 'store/constant';
import TableWidget from 'ui-component/cards/TableWidget';
import AverageTableWidget from 'ui-component/cards/AverageTableWidget';

import layoutWidgetServices from '_services/layout.widget.services';
import AnalysisChartCard from '../widget/Chart/AnalysisChartCard';

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

    React.useEffect(() => {
        layoutWidgetServices.getByLayoutId(1).then((layout) => {
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
                return <AnalysisChartCard settings={widget} />;
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const filterByDate = () => {
        if (!fromDateRef.current.value || !toDateRef.current.value) {
            return;
        }

        const fromDate = new Date(fromDateRef.current.value).getTime();
        const toDate = new Date(toDateRef.current.value).getTime();

        if (toDate < fromDate) {
            toast.error('Start Date must be greater than End Date');
            // return false;
        }

        const filtered = rows.filter(
            (obj) => new Date(obj.LocalendTime).getTime() >= fromDate && new Date(obj.LocalendTime).getTime() <= toDate
        );

        setRows(filtered);
    };

    const changeDisplayDateFormat = (e) => {
        const value = e.target.value;

        const newRows = rows.map((row) => ({
            ...row,
            LocalendTime: format(new Date(row.LocalendTime), value)
        }));

        console.log(newRows);

        setDateFormat(value);
        setRows(newRows);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={12} md={6}>
                <Grid container spacing={gridSpacing}>
                    {layoutWidget && layoutWidget.map((widget) => <RenderWidget widget={widget} />)}
                </Grid>
            </Grid>
        </Grid>
    );
}
