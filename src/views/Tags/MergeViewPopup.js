import PropTypes from 'prop-types';
import React from 'react';

// third-party imports
import { toast } from 'react-toastify';
// import axios from 'axios';

import { tagGroupService } from '_services/tagGroup.services';
import SUbTagTable from 'ui-component/cards/SubTagTable';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField, DialogContentText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    userAddDialog: {
        '&>div:nth-child(3)': {
            justifyContent: 'flex-end',
            '&>div': {
                margin: '0px',
                borderRadius: '0px',
                maxWidth: '1050px',
                maxHeight: '100%'
            }
        }
    }
}));
export default function FormDialog({ showMegeView, tagID }) {
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const getData = async () => {
        const { data } = await tagGroupService.getSubTags(tagID);
        setRows(data);
    };
    React.useEffect(() => {
        setOpen(showMegeView);
        getData();
    }, []);

    return (
        <div>
            {/* <Dialog open={open} onClose={handleClose} className={classes.userAddDialog}> */}
            <Dialog open={open} onClose={handleClose} fullWidth="lg" maxWidth="lg">
                <DialogTitle>Merged Tags</DialogTitle>
                <DialogContent>{rows.length > 0 && <SUbTagTable rows={rows} />}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
