import React from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

// third party
import ApexCharts from 'apexcharts';

// project imports
import MarketSaleChartCard from './MarketSaleChartCard';
import RevenueChartCard from './RevenueChartCard';
import ConversionsChartCard from './ConversionsChartCard';
import SatisfactionChartCard from './SatisfactionChartCard';
import TotalLineChartCard from 'ui-component/cards/TotalLineChartCard';
import SeoChartCard from 'ui-component/cards/SeoChartCard';
import SalesLineChartCard from 'ui-component/cards/SalesLineChartCard';
import AnalyticsChartCard from 'ui-component/cards/AnalyticsChartCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './chart-data';

// assets
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import PhonelinkLockIcon from '@material-ui/icons/PhonelinkLock';
import TabletAndroidIcon from '@material-ui/icons/TabletAndroid';
import LaptopIcon from '@material-ui/icons/Laptop';

// ================================|| CHART ||================================ //

const Chart = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { navType } = customization;

    const backColor = theme.palette.background.paper;
    const secondary = theme.palette.secondary.main;
    const error = theme.palette.error.main;
    const primary = theme.palette.primary.main;
    const successDark = theme.palette.success.dark;
    const orange = theme.palette.orange.main;
    const orangeDark = theme.palette.orange.dark;

    React.useEffect(() => {
        const newChartData = {
            ...chartData.MarketChartCardData.options,
            colors: [secondary, error, primary],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };

        const newRevenueChartCardData = {
            ...chartData.RevenueChartCardData.options,
            colors: [error, primary, secondary],
            stroke: {
                colors: [backColor]
            }
        };

        const newSeoChartCardData1 = {
            ...chartData.SeoChartCardData1.options,
            colors: [primary],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };

        const newSeoChartCardData2 = {
            ...chartData.SeoChartCardData2.options,
            colors: [successDark],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };

        const newSeoChartCardData3 = {
            ...chartData.SeoChartCardData3.options,
            colors: [error],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };

        const newSeoChartCardData4 = {
            ...chartData.SeoChartCardData4.options,
            colors: [orange],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };

        const newSeoChartCardData5 = {
            ...chartData.SeoChartCardData5.options,
            colors: [secondary],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };

        const newSeoChartCardData6 = {
            ...chartData.SeoChartCardData6.options,
            colors: [error],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };

        const newSeoChartCardData7 = {
            ...chartData.SeoChartCardData7.options,
            colors: [secondary],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };

        const newSeoChartCardData8 = {
            ...chartData.SeoChartCardData8.options,
            colors: [primary],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };

        const newSeoChartCardData9 = {
            ...chartData.SeoChartCardData9.options,
            colors: [successDark],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };

        const newAnalyticsChartCardData = {
            ...chartData.AnalyticsChartCardData.options,
            colors: [primary, successDark, error, orangeDark],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };

        const newConversionsChartCardData = {
            ...chartData.ConversionsChartCardData.options,
            colors: [secondary],
            tooltip: {
                theme: navType === 'dark' ? 'dark' : 'light'
            }
        };

        const newSatisfactionChartCardData = {
            ...chartData.SatisfactionChartCardData.options,
            theme: {
                monochrome: {
                    color: orangeDark
                }
            },
            stroke: {
                colors: [backColor]
            }
        };

        ApexCharts.exec(`market-sale-chart`, 'updateOptions', newChartData);
        ApexCharts.exec(`revenue-chart`, 'updateOptions', newRevenueChartCardData);

        ApexCharts.exec(`visit-chart`, 'updateOptions', newSeoChartCardData1);
        ApexCharts.exec(`bounce-bar-chart`, 'updateOptions', newSeoChartCardData2);
        ApexCharts.exec(`product-chart`, 'updateOptions', newSeoChartCardData3);

        ApexCharts.exec(`user-analytics-chart`, 'updateOptions', newSeoChartCardData4);
        ApexCharts.exec(`session-timeout-chart`, 'updateOptions', newSeoChartCardData5);
        ApexCharts.exec(`page-view-chart`, 'updateOptions', newSeoChartCardData6);
        ApexCharts.exec(`page-session-chart`, 'updateOptions', newSeoChartCardData7);
        ApexCharts.exec(`avg-session-chart`, 'updateOptions', newSeoChartCardData8);
        ApexCharts.exec(`bounce-rate-chart`, 'updateOptions', newSeoChartCardData9);

        ApexCharts.exec(`percentage-chart`, 'updateOptions', newAnalyticsChartCardData);
        ApexCharts.exec(`new-stack-chart`, 'updateOptions', newConversionsChartCardData);
        ApexCharts.exec(`satisfaction-chart`, 'updateOptions', newSatisfactionChartCardData);
    }, [navType, backColor, secondary, error, primary, successDark, orange, orangeDark]);

    return (
        <Grid container spacing={gridSpacing} alignItems="center">
            <Grid item xs={12} md={6} lg={6}>
                <ConversionsChartCard chartData={chartData.ConversionsChartCardData} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <SatisfactionChartCard chartData={chartData.SatisfactionChartCardData} />
            </Grid>
        </Grid>
    );
};

export default Chart;
