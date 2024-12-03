import { Dashboard, AutoGraph, Timeline } from '@material-ui/icons';

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const Analysis = {
    id: 'analysis',
    // title: 'Analysis',
    type: 'group',
    visible: ['superadmin', 'admin', 'manager', 'operator'],
    children: [
        {
            id: 'Dash',
            title: 'Dash',
            type: 'item',
            url: '/analysis/dash',
            icon: Dashboard,
            breadcrumbs: false
        }
        // {
        //     id: 'Calibration',
        //     title: 'Calibration',
        //     type: 'item',
        //     url: '/analysis/calibration',
        //     icon: AutoGraph,
        //     breadcrumbs: false
        // }
    ]
};

export default Analysis;
