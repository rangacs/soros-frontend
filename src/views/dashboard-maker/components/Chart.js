import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// material-ui
import { Grid } from '@material-ui/core';

// third-party
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import highChartsExporting from 'highcharts/modules/exporting';
import highchartsMore from 'highcharts/highcharts-more';
import highChartsHeatmap from 'highcharts/modules/heatmap';
import { cloneDeep } from 'lodash';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { LINE_AREA_BAR, BUBBLE, HEATMAP, GAUGE } from './ChartOptions';
import { chartServices } from '_services';

highChartsExporting(Highcharts);
highchartsMore(Highcharts);
highChartsHeatmap(Highcharts);

// =========================|| SATISFACTION CHART CARD ||========================= //

const AnalysisChartCard = (props) => {
    const { settings, preview } = props;
    const tags = settings.data_columns;
    const layoutSize = settings.layout;
    const chartType = settings.chartType;
    const xSize = layoutSize.x;

    const [options, setOptions] = useState({});
    const [isApiCalled] = useState(false);
    const chartRef = React.createRef();

    const [chart, setChart] = useState();

    const { rangeStart, rangeEnd } = useSelector((state) => {
        if (state.commanReducer) {
            return state.commanReducer;
        }

        return null;
    });

    React.useEffect(() => {
        if (chartType === 'spline' || chartType === 'column' || chartType === 'area') {
            LINE_AREA_BAR.series[0].type = chartType;
            setOptions(cloneDeep(LINE_AREA_BAR));
        } else if (chartType === 'bubble') {
            setOptions(BUBBLE);
        } else if (chartType === 'heatmap') {
            setOptions(HEATMAP);
        } else if (chartType === 'gauge') {
            setOptions(GAUGE);
        }

        if (preview) {
            chartServices
                .getAll(format(rangeStart, 'Y-MM-d HH:mm:ss'), format(rangeEnd, 'Y-MM-d HH:mm:ss'), tags, false)
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
                            if (row[tags]) {
                                seriesData.push([new Date(row.LocalendTime).getTime(), parseFloat(row[tags])]);
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
                            // title: { text: tags.toString() },
                            series: [
                                { name: tags.toString(), type: 'spline', data: seriesData },
                                { name: 'U_LIMIT', type: 'spline', data: upperLimit },
                                { name: 'L_LIMIT', type: 'spline', data: lowerLimit }
                            ]
                        };

                        setOptions({ ...cloneOptions });
                    }
                    // setIsApiCalled(true);
                })
                .catch((err) => {
                    // alert(JSON.stringify(err));
                    // toast.error('Something went wrong!');
                    console.log(err.response);
                    // setIsApiCalled(true);
                });
        }
    }, [preview, tags, chartType]);

    useEffect(() => {
        if (chart !== undefined && chart.chartHeight) {
            chart.reflow();
        }
        const current = chartRef.current;
        if (current) {
            const container = current.container;
            if (container) {
                const currentChart = container.current;
                if (currentChart) {
                    currentChart.style.height = '100%';
                    currentChart.style.width = '100%';
                }
            }
        }
    }, [xSize, chart, chartRef]);

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
        <HighchartsReact
            ref={chartRef}
            highcharts={Highcharts}
            constructorType="stockChart"
            options={options}
            style={{ height: '24.5vh' }}
            callback={(chart) => setChart(chart)}
        />
    );
};

AnalysisChartCard.propTypes = {
    settings: PropTypes.object,
    preview: PropTypes.bool
};

export default AnalysisChartCard;
