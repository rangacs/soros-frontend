import React, { lazy } from 'react';

//  Router Dom imports
import { Navigate } from 'react-router-dom';
// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import TagGrouping from 'views/tag-grouping';
import MonitorManagement from 'views/monitor/MonitorManagement';
import RmSetpointsManagement from 'views/setpoints/SetpointsManagement';
import DashboardMaker from 'views/dashboard-maker/DashboardMaker';
import FormulaBuilder from 'views/formula-builder';
import DashboardManagement from 'views/dashboard-maker/DashboardManagement';
import UserManagement from 'views/user-management';
import RoleManagement from 'views/role';
import CalibrationManagement from 'views/calibration';
import { getStorageData } from 'utils/auth/auth';
import DataBoundriesManagement from 'views/data-boundries';
import ResetPassword from 'views/authentication/authentication1/forms/ResetPassword';
import GeneralSettings from 'views/rta-config';

// dashboard routing
const Monitor = Loadable(lazy(() => import('views/monitor')));

const UserList = Loadable(lazy(() => import('views/user')));
const Analysis = Loadable(lazy(() => import('views/analysis')));
const PlotDashboard = Loadable(lazy(() => import('views/plot')));
const TablesCustomized = Loadable(lazy(() => import('views/user/TablesCustomized')));
const TagsDashboard = Loadable(lazy(() => import('views/Tags')));

const TagGroupView = Loadable(lazy(() => import('views/Tags/tags-group-view')));

const TagQueuedView = Loadable(lazy(() => import('views/Tags/tagQueuedView')));
const TagCompletedView = Loadable(lazy(() => import('views/Tags/tagCompletedView')));

const Product = Loadable(lazy(() => import('views/Product')));

const Sample = Loadable(lazy(() => import('views/sample-page')));

const CalibrationFile = Loadable(lazy(() => import('views/calibration-file')));

const Widget = Loadable(lazy(() => import('views/widget/Chart')));

const userData = getStorageData();

const SETTINGS = [
    {
        path: '/settings',
        element: <Navigate exact path="/settings" to="/settings/monitor-management" />
    },
    {
        path: '/settings/monitor-management',
        element: <MonitorManagement />
    },
    {
        path: '/settings/setpoints',
        element: <RmSetpointsManagement />
    },
    {
        path: '/settings/general-settings',
        element: <GeneralSettings />
    },
    {
        path: '/settings/dashboard-maker',
        element: <DashboardManagement />
    },
    {
        path: '/settings/dashboard-maker-layout',
        element: <DashboardMaker />
    },
    {
        path: '/settings/dashboard-maker-layout/:id',
        element: <DashboardMaker />
    },
    {
        path: '/settings/formula-builder',
        element: <FormulaBuilder />
    },
    {
        path: '/settings/user-management',
        element: <UserManagement />
    },
    {
        path: '/settings/role-management',
        element: <RoleManagement />
    },
    {
        path: '/settings/data-boundries',
        element: <DataBoundriesManagement />
    },
    {
        path: '/analysis/calibration',
        element: <CalibrationManagement />
    },
    {
        path: '/calib/file',
        element: <CalibrationFile />
    }
];

// ===========================|| MAIN ROUTING ||=========================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <Navigate exact path="/home/default" to="/analysis/dash" />
        },
        {
            path: '/home/default',
            element: <Navigate exact path="/home/default" to="/analysis/dash" />
        },
        {
            path: '/soros',
            element: <Navigate exact path="/soros" to="/soros/monitor" />
        },
        {
            path: '/user',
            element: <UserList />
        },
        {
            path: '/analysis/dash',
            element: <Analysis />
        },
        {
            path: '/soros/plot',
            element: <PlotDashboard />
        },
        {
            path: '/soros/monitor',
            element: <Monitor />
        },
        {
            path: '/soros/setpoints',
            element: <RmSetpointsManagement />
        },
        {
            path: '/soros/tag/:id',
            element: <TagsDashboard />
        },
        {
            path: '/soros/tag-queued/view/:id',
            element: <TagQueuedView />
        },
        {
            path: '/soros/tag-completed/view/:id',
            element: <TagCompletedView />
        },
        {
            path: '/soros/tag-group/:id',
            element: <TagGroupView />
        },

        {
            path: '/soros/tagGroup',
            element: <TagGrouping />
        },
        {
            path: 'product',
            element: <Product />
        },
        {
            path: 'table',
            element: <TablesCustomized />
        },
        {
            path: '/sample',
            element: <Sample />
        },
        {
            path: '/reset-password',
            element: <ResetPassword />
        }
    ]
};

if (userData) {
    if (userData.user.role === 'admin') {
        MainRoutes.children.push(...SETTINGS);
    }
}

export default MainRoutes;
