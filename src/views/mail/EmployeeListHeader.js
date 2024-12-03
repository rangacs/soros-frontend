import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Grid, IconButton, InputAdornment, Menu, MenuItem, Stack, TablePagination, TextField, useMediaQuery } from '@material-ui/core';

// assets
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import HeightIcon from '@material-ui/icons/Height';
import MoreHorizTwoToneIcon from '@material-ui/icons/MoreHorizTwoTone';
import SearchIcon from '@material-ui/icons/Search';

// ===========================|| MAIL LIST HEADER ||=========================== //

const MailListHeader = ({
    search,
    handleSearch,
    length,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    handleDrawerOpen,
    handleDenseTable
}) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClickSort = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseSort = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs>
                <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1.5}>
                    <IconButton onClick={handleDrawerOpen} size="small">
                        <MenuRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={handleDenseTable} size="small">
                        <HeightIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={handleClickSort} size="small">
                        <MoreHorizTwoToneIcon fontSize="small" />
                    </IconButton>
                    <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseSort}>
                        <MenuItem onClick={handleCloseSort}>Name</MenuItem>
                        <MenuItem onClick={handleCloseSort}>Date</MenuItem>
                        <MenuItem onClick={handleCloseSort}>Ratting</MenuItem>
                        <MenuItem onClick={handleCloseSort}>Unread</MenuItem>
                    </Menu>
                    <TextField
                        sx={{ display: { xs: 'block', sm: 'none' } }}
                        fullWidth={matchDownSM}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                        placeholder="Search Mail"
                        value={search}
                        size="small"
                    />
                </Stack>
            </Grid>
            <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1.5}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                        placeholder="Search Mail"
                        value={search}
                        size="small"
                    />
                    {/* table pagination */}
                    <TablePagination
                        sx={{ '& .MuiToolbar-root': { pl: 1 } }}
                        rowsPerPageOptions={[]}
                        component="div"
                        count={length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Stack>
            </Grid>
        </Grid>
    );
};

MailListHeader.propTypes = {
    search: PropTypes.string,
    length: PropTypes.number,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    handleSearch: PropTypes.func,
    handleChangeRowsPerPage: PropTypes.func,
    handleChangePage: PropTypes.func,
    handleDrawerOpen: PropTypes.func,
    handleDenseTable: PropTypes.func
};

export default MailListHeader;
