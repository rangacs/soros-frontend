// assets
import {
    IconArtboard,
    IconCalendarEvent,
    IconCalendarOff,
    IconUsers,
    IconSettings,
    IconTarget,
    IconLayoutDashboard,
    IconCalculator,
    IconCircle
} from '@tabler/icons';
import { Money } from '@material-ui/icons';

// constant
const icons = { IconArtboard, IconCalendarEvent, IconCalendarOff, IconUsers };

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const Settings = {
    id: 'settings',
    // title: 'Soros',
    type: 'group',
    visible: ['admin'],
    children: [
        {
            id: 'Monitor',
            title: 'Monitor',
            type: 'item',
            url: '/settings/monitor-management',
            icon: Money,
            breadcrumbs: false
        },
        {
            id: 'Setpoints',
            title: 'Setpoints',
            type: 'item',
            url: '/settings/setpoints',
            icon: IconTarget,
            breadcrumbs: false
        },
        {
            id: 'General Settings',
            title: 'General Settings',
            type: 'item',
            url: '/settings/general-settings',
            icon: IconSettings,
            breadcrumbs: false
        },
        {
            id: 'Dashboard Maker',
            title: 'Dashboard Maker',
            type: 'item',
            url: '/settings/dashboard-maker',
            icon: IconLayoutDashboard,
            breadcrumbs: false
        },
        {
            id: 'Formula Builder',
            title: 'Formula Builder',
            type: 'item',
            url: '/settings/formula-builder',
            icon: IconCalculator,
            breadcrumbs: false
        },
        {
            id: 'User Management',
            title: 'User Management',
            type: 'item',
            url: '/settings/user-management',
            icon: IconUsers,
            breadcrumbs: false
        },
        {
            id: 'Data Boundries',
            title: 'Data Boundries',
            type: 'item',
            url: '/settings/data-boundries',
            icon: IconCircle,
            breadcrumbs: false
        }
    ]
};

export default Settings;
