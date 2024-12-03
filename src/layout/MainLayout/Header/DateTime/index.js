import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box } from '@material-ui/core';

import { format } from 'date-fns';

import { DATE_INTERVAL } from 'store/actions';

const DateTime = () => {
    const dispatch = useDispatch();
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const secTimer = setInterval(() => {
            setDateTime(new Date());

            if (format(new Date(), 'ss').includes('00')) {
                const endDate = new Date();
                const startDate = new Date();
                startDate.setHours(startDate.getHours() - 8);
                /* dispatch({
                    type: DATE_INTERVAL,
                    rangeStart: new Date(startDate),
                    rangeEnd: new Date(endDate)
                }); */
            }
        }, 1000);

        return () => clearInterval(secTimer);
    }, [dispatch]);

    return (
        <Box sx={{ display: { xs: 'none', sm: 'block' } }} style={{ width: '150px' }}>
            {format(dateTime, 'yyyy-MM-d HH:mm:ss')}
        </Box>
    );
};

export default DateTime;
