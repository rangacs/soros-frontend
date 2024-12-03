export const DEFAULT_DASHBOARDITEMS = [
    {
        widgetId: 1,
        title: 'SiO2',
        type: 'Charts',
        size: '',
        settings: {
            chartType: 'spline',
            layout: { x: 0, y: 0, w: 8, h: 5.8 },
            data_columns: ['SiO2']
        }
    },
    {
        widgetId: 2,
        title: 'CaO',
        type: 'Charts',
        size: '',
        settings: {
            chartType: 'spline',
            layout: { x: 8, y: 0, w: 8, h: 5.8 },
            data_columns: ['CaO']
        }
    },
    {
        widgetId: 3,
        title: 'LSF',
        type: 'Charts',
        size: '',
        settings: {
            chartType: 'spline',
            layout: { x: 16, y: 0, w: 8, h: 5.8 },
            data_columns: ['LSF']
        }
    },
    {
        widgetId: 4,
        title: 'Table',
        type: 'table',
        size: '',
        settings: {
            layout: { x: 0, y: 5.8, w: 24, h: 12.5 },
            data_columns: [
                { id: 'LocalstartTime', type: 'datetime', format: 'YYYY', label: 'LocalstartTime', columnName: 'LocalstartTime' },
                { id: 'LocalendTime', type: 'datetime', format: 'YYYY', label: 'LocalendTime', columnName: 'LocalendTime' },
                { id: 'SiO2', type: 'number', format: 'YYYY', label: 'SiO2', columnName: 'SiO2' },
                { id: 'CaO', type: 'number', format: 'YYYY', label: 'CaO', columnName: 'CaO' },
                { id: 'LSF', type: 'number', format: 'YYYY', label: 'LSF', columnName: 'LSF' }
            ]
        }
    }
];

export const CHART = {
    widgetId: Math.random(),
    title: 'Chart',
    type: 'Charts',
    size: '',
    settings: {
        chartType: 'spline',
        layout: { x: 0, y: Infinity, w: 8, h: 5.8 },
        data_columns: ['SiO2']
    }
};

export const TABLE = {
    widgetId: Math.random(),
    title: 'Table',
    type: 'table',
    size: '',
    settings: {
        layout: { x: 0, y: Infinity, w: 24, h: 9.3 },
        data_columns: [
            { id: 'LocalstartTime', type: 'datetime', format: 'YYYY', label: 'LocalstartTime', columnName: 'LocalstartTime' },
            { id: 'LocalendTime', type: 'datetime', format: 'YYYY', label: 'LocalendTime', columnName: 'LocalendTime' },
            { id: 'SiO2', type: 'number', format: 'YYYY', label: 'SiO2', columnName: 'SiO2' },
            { id: 'CaO', type: 'number', format: 'YYYY', label: 'CaO', columnName: 'CaO' },
            { id: 'LSF', type: 'number', format: 'YYYY', label: 'LSF', columnName: 'LSF' }
        ]
    }
};

export const CHART_SIZE = [
    { title: 'Small', value: { w: 8, h: 5.8 } },
    { title: 'Medium', value: { w: 12, h: 5.8 } },
    { title: 'Large', value: { w: 24, h: 5.8 } }
];

export const TABLE_SIZE = [
    { title: 'Small', value: { w: 8, h: 12.5 } },
    { title: 'Medium', value: { w: 12, h: 12.5 } },
    { title: 'Large', value: { w: 24, h: 12.5 } }
];

export const CHART_TYPES = [
    { title: 'Line', value: 'spline' },
    { title: 'Area', value: 'area' },
    { title: 'Bar', value: 'column' },
    { title: 'Bubble', value: 'bubble' },
    { title: 'Hetmap', value: 'heatmap' },
    { title: 'Gauge', value: 'gauge' }
];

export const DEFAULT_COLUMNS = [
    {
        id: 'LocalstartTime',
        numeric: false,
        disablePadding: false,
        label: 'LocalstartTime',
        columnName: 'LocalstartTime'
    },
    {
        id: 'LocalendTime',
        numeric: false,
        disablePadding: false,
        label: 'LocalendTime',
        columnName: 'LocalendTime'
    },
    {
        id: 'SiO2',
        numeric: false,
        disablePadding: false,
        label: 'SiO2',
        columnName: 'SiO2'
    },
    {
        id: 'CaO',
        numeric: false,
        disablePadding: false,
        label: 'CaO',
        columnName: 'CaO'
    },
    {
        id: 'LSF',
        numeric: false,
        disablePadding: false,
        label: 'LSF',
        columnName: 'LSF'
    }
];

export const DEFAULT_ROWS = [
    {
        TimeStamp: '2021-12-08 18:11:58',
        SiO2: '0.00',
        CaO: '0.00',
        LSF: '0.00'
    },
    {
        TimeStamp: '2021-12-08 18:11:59',
        SiO2: '0.00',
        CaO: '0.00',
        LSF: '0.00'
    },
    {
        TimeStamp: '2021-12-08 18:12:00',
        SiO2: '0.00',
        CaO: '0.00',
        LSF: '0.00'
    },
    {
        TimeStamp: '2021-12-08 18:12:01',
        SiO2: '0.00',
        CaO: '0.00',
        LSF: '0.00'
    },
    {
        TimeStamp: '2021-12-08 18:12:02',
        SiO2: '0.00',
        CaO: '0.00',
        LSF: '0.00'
    },
    {
        TimeStamp: '2021-12-08 18:12:02',
        SiO2: '0.00',
        CaO: '0.00',
        LSF: '0.00'
    },
    {
        TimeStamp: '2021-12-08 18:12:02',
        SiO2: '0.00',
        CaO: '0.00',
        LSF: '0.00'
    },
    {
        TimeStamp: '2021-12-08 18:12:02',
        SiO2: '0.00',
        CaO: '0.00',
        LSF: '0.00'
    },
    {
        TimeStamp: '2021-12-08 18:12:02',
        SiO2: '0.00',
        CaO: '0.00',
        LSF: '0.00'
    },
    {
        TimeStamp: '2021-12-08 18:12:02',
        SiO2: '0.00',
        CaO: '0.00',
        LSF: '0.00'
    }
];

export const DEFAULT_PREDICTION_COLUMNS = [
    {
        id: 'TimeStamp',
        name: 'TimeStamp',
        selector: (row) => row.TimeStamp
    },
    {
        id: 'Tag',
        name: 'Tag',
        selector: (row) => row.Tag
    },
    {
        id: 'Value',
        name: 'Value',
        selector: (row) => row.Value
    }
];

export const DEFAULT_PREDICTION_ROWS = [
    { TimeStamp: '2021-10-08 02:07:00', Tag: 'Kiln_Feed_MPCSP', Value: '231.00' },
    {
        TimeStamp: '2021-10-08 02:07:00',
        Tag: 'Kiln_Speed_MPCSP',
        Value: '230.00'
    },
    { TimeStamp: '2021-10-08 02:07:00', Tag: 'Kiln_Coal_MPCSP', Value: '7.50' },
    {
        TimeStamp: '2021-10-08 02:07:00',
        Tag: 'Calciner_Coal_MPCSP',
        Value: '9.00'
    },
    {
        TimeStamp: '2021-10-08 02:07:00',
        Tag: 'IDFan_Speed_MPCSP',
        Value: '63.00'
    },
    { TimeStamp: '2021-10-08 02:07:00', Tag: 'Kiln_TAT_MPCSP', Value: '0.00' }
];

export const DEFAULT_AVERAGE_COLUMNS = [
    { id: 'TimeStamp', name: 'SP', selector: (row) => row.element },
    { id: 'TimeStamp', name: '15', selector: (row) => row.data1 },
    { id: 'TimeStamp', name: '30', selector: (row) => row.data2 },
    { id: 'TimeStamp', name: '90', selector: (row) => row.data3 }
];

export const DEFAULT_STD_DEVIATION_COLUMNS = [
    { id: 'TimeStamp', name: 'Element', selector: (row) => row.element },
    { id: 'TimeStamp', name: '8 H', selector: (row) => row.data1 },
    { id: 'TimeStamp', name: '12 H', selector: (row) => row.data2 },
    { id: 'TimeStamp', name: '24 H', selector: (row) => row.data3 }
];
