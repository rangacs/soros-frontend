import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Box, Card, Grid, Typography } from '@material-ui/core';

// third party
import Chart from 'react-apexcharts';

// ============================|| TOTAL LINE CHART CARD ||============================ //

const TotalLineChartCard = ({ bgColor, chartData, title, percentage, value }) => {
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={6} lg={12}>
            <Card>
                <Box
                    sx={{
                        color: '#fff',
                        bgcolor: !bgColor ? theme.palette.primary.dark : bgColor
                    }}
                >
                    <Box sx={{ p: 2.5 }}>
                        <Grid container direction="column">
                            <Grid item container justifyContent="space-between" alignItems="center">
                                {value && (
                                    <Grid item>
                                        <Typography variant="h3" color="inherit">
                                            {value}
                                        </Typography>
                                    </Grid>
                                )}
                                {percentage && (
                                    <Grid item>
                                        <Typography variant="body2" color="inherit">
                                            {percentage}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                            {title && (
                                <Grid item>
                                    <Typography variant="body2" color="inherit">
                                        {' '}
                                        {title}{' '}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                    {chartData && <Chart {...chartData} />}
                </Box>
            </Card>
        </Grid>
    );
};

TotalLineChartCard.propTypes = {
    bgColor: PropTypes.string,
    chartData: PropTypes.object,
    title: PropTypes.string,
    percentage: PropTypes.string,
    value: PropTypes.number
};

export default TotalLineChartCard;
