import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// material-ui
import { Grid, Typography, Box } from '@material-ui/core';

// third-party
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import highChartsExporting from 'highcharts/modules/exporting';
import { format } from 'date-fns';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { chartServices } from '_services';
import { FormatColorReset } from '@material-ui/icons';

highChartsExporting(Highcharts);
// =========================|| SATISFACTION CHART CARD ||========================= //

const OPTIONS = {
    chart: {
        height: '60%',
        zoomType: 'x',
        events: {
            load() {
                this.showLoading();
                setTimeout(this.hideLoading.bind(this), 0);
            }
        }
    },
    legend: {
        enabled: false
    },
    title: {
        text: 'Loading ....'
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            hour: '%H:%M'
        }
    },
    time: {
        timezoneOffset: -5.47 * 60
    },
    yAxis: {
        title: null,
        labels: {
            formatter() {
                return parseInt(this.value, 10) === this.value ? this.value : this.value.toFixed(1);
            },
            step: 1
        },
        opposite: false
    },
    tooltip: {
        shared: true,
        split: true
    },
    exporting: {
        buttons: {
            contextButton: {
                menuItems: ['viewFullscreen', 'separator', 'downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
            }
        }
    },
    rangeSelector: {
        verticalAlign: 'top',
        allButtonsEnabled: true,
        buttons: [
            {
                type: 'hour',
                count: 1,
                text: '1H'
            },
            {
                type: 'hour',
                count: 2,
                text: '2H'
            },
            {
                type: 'hour',
                count: 4,
                text: '4H'
            },
            {
                type: 'hour',
                count: 8,
                text: '8H'
            },
            {
                type: 'all',
                text: 'All',
                title: 'View all'
            }
        ]
    },
    credits: {
        enabled: false
    },
    series: [],
    plotOptions: {
        series: {
            marker: {
                enabled: false
            }
        }
    },
    navigation: {
        bindings: {
            rect: {
                annotationsOptions: {
                    shapeOptions: {
                        fill: 'rgba(255, 0, 0, 0.8)'
                    }
                }
            }
        },
        annotationsOptions: {
            typeOptions: {
                line: {
                    stroke: 'rgba(255, 0, 0, 1)',
                    strokeWidth: 10
                }
            }
        }
    },
    responsive: {
        rules: [
            {
                condition: {
                    minWidth: 1700
                },
                chartOptions: {
                    tooltip: {
                        style: {
                            fontSize: '60px'
                        }
                    },
                    yAxis: {
                        labels: {
                            step: 2
                        }
                    },
                    xAxis: {
                        labels: {
                            step: 2
                        }
                    }
                }
            }
        ]
    }
};

const AnalysisChartCard = ({ settings, rolling }) => {
    const [options, setOptions] = useState(OPTIONS);
    const [isApiCalled, setIsApiCalled] = useState(false);
    const commanData = useSelector((state) => state.commanReducer);

    const { rangeStart, rangeEnd, refreshInterval, deactivateRefresh, historicalData, historicalStart, historicalEnd } = useSelector(
        (state) => {
            if (state.commanReducer) {
                return state.commanReducer;
            }

            return null;
        }
    );
    const getData = () => {
        const { settings: chartSettings, title } = settings;
        const cOPtion = JSON.parse(chartSettings);
        const elements = cOPtion.data_columns.join(',');
        const startTime = historicalData === 'yes' ? format(historicalStart, 'Y-MM-d HH:mm') : format(rangeStart, 'Y-MM-d HH:mm');
        const endTime = historicalData === 'yes' ? format(historicalEnd, 'Y-MM-d HH:mm') : format(rangeEnd, 'Y-MM-d HH:mm');
        chartServices
            .getAll(startTime, endTime, elements, rolling)
            .then(async (response) => {
                const { data } = response;
                const setPoints = response['set points'] || {};

                if (data.length) {
                    // eslint-disable-next-line prefer-const
                    let seriesData = [];
                    // eslint-disable-next-line prefer-const
                    let upperLimit = [];
                    // eslint-disable-next-line prefer-const
                    let lowerLimit = [];
                    // TODO change for multiple columns
                    data.forEach((row) => {
                        if (row[elements]) {
                            seriesData.push([new Date(row.LocalendTime).getTime(), parseFloat(row[elements])]);
                            if (setPoints.U_LIMIT) {
                                upperLimit.push([new Date(row.LocalendTime).getTime(), parseFloat(setPoints.U_LIMIT)]);
                            }
                            if (setPoints.L_LIMIT) {
                                lowerLimit.push([new Date(row.LocalendTime).getTime(), parseFloat(setPoints.L_LIMIT)]);
                            }
                        }
                    });

                    const cloneOptions = {
                        ...options,
                        title: { text: title },
                        series: [
                            { name: title, type: 'spline', data: seriesData },
                            { name: 'U_LIMIT', type: 'spline', data: upperLimit },
                            { name: 'L_LIMIT', type: 'spline', data: lowerLimit }
                        ]
                    };

                    setOptions({ ...cloneOptions });
                }
                setIsApiCalled(true);
            })
            .catch((err) => {
                // alert(JSON.stringify(err));
                // toast.error('Something went wrong!');
                console.log(err.response);
                setIsApiCalled(true);
            });
    };

    useEffect(() => {
        getData();
    }, [rangeStart, rangeEnd]);

    React.useEffect(() => {
        const myRefreshInterval = setInterval(() => {
            if (!deactivateRefresh && historicalData !== 'yes') {
                getData();
            }
        }, Number(`${refreshInterval}000`));

        return () => {
            clearInterval(myRefreshInterval);
        };
    }, [refreshInterval, settings, deactivateRefresh, historicalData]);

    if (isApiCalled && !options.series.length) {
        return (
            <Grid item xs={12} md={6} lg={4}>
                <MainCard content={false} style={{ paddingTop: '5px' }}>
                    <div style={{ height: '250px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        No Data available
                    </div>
                </MainCard>
            </Grid>
        );
    }

    return (
        <Grid item xs={12} md={6} lg={4}>
            <MainCard content={false} style={{ paddingTop: '5px' }}>
                <HighchartsReact highcharts={Highcharts} constructorType="stockChart" options={options} style={{ height: '21.5vh' }} />
            </MainCard>
        </Grid>
    );
};

AnalysisChartCard.propTypes = {
    settings: PropTypes.object
};

export default AnalysisChartCard;
