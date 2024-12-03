import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Grid } from '@material-ui/core';

import { tagCompletedServices } from '_services';
import { toast } from 'react-toastify';

const TonRemovalForm = ({ id, totalTonsRemoved }) => {
    const [tons, setTons] = useState(totalTonsRemoved);

    React.useEffect(() => {
        if (id) {
            tagCompletedServices
                .getById(id)
                .then((res) => {
                    if (res) {
                        console.log(res);
                        const data = res.data;
                        setTons(data.average?.totalTonsRemoved);
                    }
                })
                .catch((err) => {
                    toast.error('Something went wrong!');
                    console.log(err);
                });
        }
    }, [id]);

    const handleChange = (event) => {
        setTons(event.target.value);
    };

    const handleSubmit = () => {
        // Update server with the 'tons' value
        console.log(totalTonsRemoved);
        const formData = { totalTons: tons };
        tagCompletedServices
            .updateTons(id, formData)
            .then((res) => {
                if (res.message) {
                    toast.success('Saved Successfully!');
                }
            })
            .catch((err) => {
                toast.error('Something went wrong!');
                console.log(err.response);
            });
    };

    return (
        <Grid container spacing={3} sx={{ mt: 0.25 }}>
            <Grid item xs={12}>
                <form>
                    <TextField
                        label="Number of Tons to be Removed"
                        variant="outlined"
                        type="number"
                        value={tons}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Update Tons
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
};

export default TonRemovalForm;
